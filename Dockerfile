# ----------------------------------------------------------------------------
# (C) Copyright IBM Corp. 2021
#
# SPDX-License-Identifier: Apache-2.0
# ----------------------------------------------------------------------------

FROM maven:3-eclipse-temurin-17 AS maven-base

FROM node:22 AS theme-build
COPY --from=maven-base /opt/java/openjdk /opt/java/openjdk
COPY --from=maven-base /usr/share/maven /usr/share/maven
ENV JAVA_HOME=/opt/java/openjdk
ENV PATH="${JAVA_HOME}/bin:/usr/share/maven/bin:${PATH}"
WORKDIR /workspace/keycloak-theme

# Copy full theme so postinstall (keycloakify sync-extensions) can find src/
COPY keycloak-theme ./
RUN npm ci
RUN npm run build-keycloak-theme


FROM maven:3-eclipse-temurin-17 AS build
WORKDIR /workspace

COPY pom.xml ./
COPY keycloak-config ./keycloak-config
COPY keycloak-extensions ./keycloak-extensions

RUN mvn -B clean package -DskipTests


FROM quay.io/keycloak/keycloak:26.0.8

ENV KC_DB=dev-file

# Copy the shaded JAR with all dependencies to the providers directory
COPY --from=build /workspace/keycloak-extensions/target/keycloak-extensions-*-shaded.jar /opt/keycloak/providers/

# Copy the Keycloakify boolbyte theme JAR(s) built in the theme stage
COPY --from=theme-build /workspace/keycloak-theme/dist_keycloak/*.jar /opt/keycloak/providers/

# Bundle the keycloak-config CLI and its default config into the same image.
USER root
RUN mkdir -p /opt/keycloak-config/jars /opt/keycloak-config/config

COPY --from=build /workspace/keycloak-config/target/keycloak-config-*.jar /opt/keycloak-config/jars/
COPY --from=build /workspace/keycloak-config/target/dependency/* /opt/keycloak-config/jars/
COPY --from=build /workspace/keycloak-config/src/main/resources/config/boolbyte-config.json /opt/keycloak-config/config/
COPY --from=build /workspace/keycloak-config/run.sh /opt/keycloak-config/run.sh
COPY docker-entrypoint.sh /opt/keycloak-config/docker-entrypoint.sh
RUN chmod +x /opt/keycloak-config/docker-entrypoint.sh /opt/keycloak-config/run.sh
USER keycloak
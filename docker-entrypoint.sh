#!/usr/bin/env bash
set -euo pipefail

# Start Keycloak in the background
/opt/keycloak/bin/kc.sh start-dev &
KC_PID=$!

# Wait for Keycloak to accept connections (bash built-in, no curl needed)
echo "Waiting for Keycloak to start..."
while ! (echo > /dev/tcp/localhost/8080) 2>/dev/null; do
  sleep 2
done
sleep 5
echo "Keycloak is ready — applying configuration..."

# Run the config tool
cd /opt/keycloak-config
CONFIG_FILE="${KEYCLOAK_CONFIG_FILE:-config/boolbyte-config.json}"
if /opt/keycloak-config/run.sh -configFile "${CONFIG_FILE}"; then
  echo "Configuration applied successfully."
else
  echo "WARNING: Configuration tool exited with errors (see above). Keycloak continues running."
fi

# Keep Keycloak in the foreground
wait $KC_PID

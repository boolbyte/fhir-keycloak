import * as React from "react";
import type {
  GetSubject,
  GetTemplate,
  GetTemplateProps,
} from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { Text, render } from "jsx-email";
import { Layout, paragraph } from "../layout";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "email-test.ftl";

const { exp } = createVariablesHelper("email-test.ftl");

// Ensure React is available both in this module and as the global JSX factory
(globalThis as any).React = React;

export const Template = ({ locale }: TemplateProps) => (
  <Layout locale={locale} preview={`Test message from ${exp("realmName")}`}>
    <Text style={paragraph}>
      This is a test email from {exp("realmName")}. If you received this
      message, your email settings are working correctly.
    </Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, {
    plainText: props.plainText,
  });
};

export const getSubject: GetSubject = async () => {
  return "[KEYCLOAK] - SMTP test message";
};


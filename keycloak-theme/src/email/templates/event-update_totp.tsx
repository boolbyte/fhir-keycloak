import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { Text, render } from "jsx-email";
import { Layout, paragraph } from "../layout";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "event-update_totp.ftl";

const { exp } = createVariablesHelper("event-update_totp.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <Layout
    locale={locale}
    preview="TOTP configuration changed for your account"
  >
    <Text style={paragraph}>
      The time-based one-time password (TOTP) configuration for your{" "}
      {exp("realmName")} account was recently updated.
    </Text>
    <Text style={paragraph}>Details: {exp("event.details.summary")}.</Text>
    <Text style={paragraph}>
      If you did not perform this action, please secure your account
      immediately.
    </Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, {
    plainText: props.plainText,
  });
};

export const getSubject: GetSubject = async () => {
  return "Your TOTP configuration has changed";
};


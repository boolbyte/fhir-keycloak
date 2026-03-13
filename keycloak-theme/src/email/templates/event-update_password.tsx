import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { Text, render } from "jsx-email";
import { Layout, paragraph } from "../layout";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "event-update_password.ftl";

const { exp } = createVariablesHelper("event-update_password.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <Layout locale={locale} preview="Your account password was changed">
    <Text style={paragraph}>
      The password for your {exp("realmName")} account was recently changed.
    </Text>
    <Text style={paragraph}>Details: {exp("event.details.summary")}.</Text>
    <Text style={paragraph}>
      If you did not perform this action, please reset your password
      immediately and review your account activity.
    </Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, {
    plainText: props.plainText,
  });
};

export const getSubject: GetSubject = async () => {
  return "Your account password was changed";
};


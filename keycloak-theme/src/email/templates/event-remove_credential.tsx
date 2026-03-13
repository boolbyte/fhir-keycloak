import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { Text, render } from "jsx-email";
import { Layout, paragraph } from "../layout";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "event-remove_credential.ftl";

const { exp } = createVariablesHelper("event-remove_credential.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <Layout
    locale={locale}
    preview="A credential was removed from your account"
  >
    <Text style={paragraph}>
      A credential was removed from your {exp("realmName")} account.
    </Text>
    <Text style={paragraph}>Details: {exp("event.details.summary")}.</Text>
    <Text style={paragraph}>
      If you did not perform this action, please review your account security
      and update your password.
    </Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, {
    plainText: props.plainText,
  });
};

export const getSubject: GetSubject = async () => {
  return "A credential was removed from your account";
};


import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { Text, render } from "jsx-email";
import { Layout, paragraph } from "../layout";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "email-update-confirmation.ftl";

const { exp } = createVariablesHelper("email-update-confirmation.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <Layout
    locale={locale}
    preview={`Email address updated for ${exp("realmName")}`}
  >
    <Text style={paragraph}>
      The email address associated with your {exp("realmName")} account has
      been successfully updated.
    </Text>
    <Text style={paragraph}>
      If you did not request this change, please reset your password and
      contact support immediately.
    </Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, {
    plainText: props.plainText,
  });
};

export const getSubject: GetSubject = async () => {
  return "Your email address has been updated";
};


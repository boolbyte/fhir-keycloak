import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { Text, render } from "jsx-email";
import { Layout, paragraph } from "../layout";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "password-reset.ftl";

const { exp } = createVariablesHelper("password-reset.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <Layout
    locale={locale}
    preview={`Password reset for ${exp("realmName")}`}
  >
    <Text style={paragraph}>
      A request has been made to reset the password for your{" "}
      {exp("realmName")} account.
    </Text>
    <Text style={paragraph}>
      If you made this request, click the link below to set a new password:
    </Text>
    <Text style={paragraph}>
      <a href={exp("link")}>Reset your password</a>
    </Text>
    <Text style={paragraph}>
      This link will expire within{" "}
      {exp("linkExpirationFormatter(linkExpiration)")}.
    </Text>
    <Text style={paragraph}>
      If you did not request a password reset, you can ignore this message.
    </Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, {
    plainText: props.plainText,
  });
};

export const getSubject: GetSubject = async () => {
  return "Reset your password";
};


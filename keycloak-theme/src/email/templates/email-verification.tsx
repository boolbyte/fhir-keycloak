import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { Text, render } from "jsx-email";
import { Layout, paragraph } from "../layout";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

// Used by jsx-email preview (if you wire it up separately)
export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

// This should match the Keycloak FTL template name
export const templateName = "email-verification.ftl";

const { exp } = createVariablesHelper("email-verification.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <Layout
    locale={locale}
    preview={`Verification link from ${exp("realmName")}`}
  >
    <Text style={paragraph}>
      Someone has created a {exp("realmName")} account with this email address.
      If this was you, click the link below to verify your email address.
    </Text>
    <Text style={paragraph}>
      <a href={exp("link")}>Link to e-mail address verification</a>
    </Text>
    <Text style={paragraph}>
      This link will expire within{" "}
      {exp("linkExpirationFormatter(linkExpiration)")}.
    </Text>
    <Text style={paragraph}>
      If you did not create this account, you can safely ignore this message.
    </Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) => {
  // keycloakify-emails will call this twice: once for HTML and once for plain text
  return await render(<Template {...props} />, {
    plainText: props.plainText,
  });
};

export const getSubject: GetSubject = async () => {
  return "Verify your email address";
};


import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { Text, render } from "jsx-email";
import { Layout, paragraph } from "../layout";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "executeActions.ftl";

const { exp } = createVariablesHelper("executeActions.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <Layout
    locale={locale}
    preview={`Action required on your ${exp("realmName")} account`}
  >
    <Text style={paragraph}>
      Your {exp("realmName")} account requires your attention. Please complete
      the required actions using the link below.
    </Text>
    <Text style={paragraph}>
      <a href={exp("link")}>Review and complete required actions</a>
    </Text>
    <Text style={paragraph}>
      This link will expire within{" "}
      {exp("linkExpirationFormatter(linkExpiration)")}.
    </Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, {
    plainText: props.plainText,
  });
};

export const getSubject: GetSubject = async () => {
  return "Action required for your account";
};


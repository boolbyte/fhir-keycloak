import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { Text, render } from "jsx-email";
import { Layout, paragraph } from "../layout";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "identity-provider-link.ftl";

const { exp } = createVariablesHelper("identity-provider-link.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <Layout
    locale={locale}
    preview={`Link external identity to ${exp("realmName")}`}
  >
    <Text style={paragraph}>
      You requested to link an external identity provider to your{" "}
      {exp("realmName")} account.
    </Text>
    <Text style={paragraph}>
      To complete this process, click the link below:
    </Text>
    <Text style={paragraph}>
      <a href={exp("link")}>Link your external identity</a>
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
  return "Link your external identity";
};


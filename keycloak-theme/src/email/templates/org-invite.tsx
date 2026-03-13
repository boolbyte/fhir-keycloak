import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { Text, render } from "jsx-email";
import { Layout, paragraph } from "../layout";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "org-invite.ftl";

const { exp } = createVariablesHelper("org-invite.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <Layout
    locale={locale}
    preview={`Invitation to join ${exp("organization.name")}`}
  >
    <Text style={paragraph}>
      You have been invited to join {exp("organization.name")} on {exp("realmName")}.
    </Text>
    <Text style={paragraph}>
      To accept this invitation and access the organization, click the link
      below:
    </Text>
    <Text style={paragraph}>
      <a href={exp("link")}>Accept organization invitation</a>
    </Text>
    <Text style={paragraph}>
      This invitation will expire within{" "}
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
  return "Organization invitation";
};


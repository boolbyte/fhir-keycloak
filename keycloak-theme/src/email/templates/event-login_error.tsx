import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { Text, render } from "jsx-email";
import { Layout, paragraph } from "../layout";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "event-login_error.ftl";

const { exp } = createVariablesHelper("event-login_error.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <Layout
    locale={locale}
    preview="Unsuccessful login attempt on your account"
  >
    <Text style={paragraph}>
      There was an unsuccessful login attempt to your {exp("realmName")}{" "}
      account.
    </Text>
    <Text style={paragraph}>Details: {exp("event.details.summary")}.</Text>
    <Text style={paragraph}>
      If this was not you, we recommend reviewing your recent activity and
      updating your password.
    </Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, {
    plainText: props.plainText,
  });
};

export const getSubject: GetSubject = async () => {
  return "Unsuccessful login attempt detected";
};


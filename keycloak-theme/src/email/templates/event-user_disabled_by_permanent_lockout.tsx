import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { Text, render } from "jsx-email";
import { Layout, paragraph } from "../layout";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "event-user_disabled_by_permanent_lockout.ftl";

const { exp } = createVariablesHelper(
  "event-user_disabled_by_permanent_lockout.ftl",
);

export const Template = ({ locale }: TemplateProps) => (
  <Layout
    locale={locale}
    preview="Your account has been permanently locked"
  >
    <Text style={paragraph}>
      Due to multiple unsuccessful login attempts or suspicious activity, your{" "}
      {exp("realmName")} account has been permanently locked.
    </Text>
    <Text style={paragraph}>Details: {exp("event.details.summary")}.</Text>
    <Text style={paragraph}>
      Please contact your administrator or support team to restore access to
      your account.
    </Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, {
    plainText: props.plainText,
  });
};

export const getSubject: GetSubject = async () => {
  return "Your account has been permanently locked";
};


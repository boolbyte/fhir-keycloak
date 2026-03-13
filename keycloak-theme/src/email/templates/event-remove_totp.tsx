import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { Text, render } from "jsx-email";
import { Layout, paragraph } from "../layout";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "event-remove_totp.ftl";

const { exp } = createVariablesHelper("event-remove_totp.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <Layout locale={locale} preview="TOTP removed from your account">
    <Text style={paragraph}>
      Time-based one-time password (TOTP) has been removed from your{" "}
      {exp("realmName")} account.
    </Text>
    <Text style={paragraph}>Details: {exp("event.details.summary")}.</Text>
    <Text style={paragraph}>
      If you did not perform this action, we strongly recommend securing your
      account immediately.
    </Text>
  </Layout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, {
    plainText: props.plainText,
  });
};

export const getSubject: GetSubject = async () => {
  return "TOTP has been removed from your account";
};


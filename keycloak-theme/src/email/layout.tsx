import type { GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
} from "jsx-email";

interface LayoutProps extends Pick<GetTemplateProps, "locale"> {
  preview: string;
  // Use a broad type here to avoid React type incompatibilities
  children: any;
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  marginBottom: "64px",
  padding: "24px 0 48px",
  maxWidth: "600px",
};

const logoSection = {
  padding: "0 48px 24px 48px",
  textAlign: "left" as const,
};

const box = {
  padding: "0 48px",
};

export const paragraph = {
  color: "#444",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const { exp } = createVariablesHelper("email-verification.ftl");

export const Layout = ({ locale, preview, children }: LayoutProps) => {
  const baseUrl = (import.meta as any).isJsxEmailPreview
    ? "/assets"
    : "${url.resourcesUrl}";

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src={`${baseUrl}/boolbyte-logo.png`}
              width="160"
              alt={`${exp("realmName")} logo`}
              style={{
                height: "auto",
                display: "block",
              }}
            />
          </Section>
          <Section style={box}>{children}</Section>
        </Container>
      </Body>
    </Html>
  );
};

// For jsx-email preview: treat this file itself as a simple template
export const Template = (props: LayoutProps) => <Layout {...props} />;



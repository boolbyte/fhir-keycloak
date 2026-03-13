import { keycloakify } from "keycloakify/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { buildEmailTheme } from "keycloakify-emails";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    keycloakify({
      themeName: "boolbyte",
      accountThemeImplementation: "none",
      postBuild: async (buildContext) => {
        await buildEmailTheme({
          templatesSrcDirPath: path.join(
            buildContext.themeSrcDirPath,
            "email",
            "templates",
          ),
          i18nSourceFile: path.join(
            buildContext.themeSrcDirPath,
            "email",
            "i18n.ts",
          ),
          assetsDirPath: path.join(
            buildContext.themeSrcDirPath,
            "email",
            "templates",
            "assets",
          ),
          themeNames: buildContext.themeNames,
          keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
          locales: ["en", "fr", "ar"],
          cwd: import.meta.dirname,
          environmentVariables: buildContext.environmentVariables,
          esbuild: {},
        });
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
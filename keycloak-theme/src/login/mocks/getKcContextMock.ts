/**
 * This file has been claimed for ownership from @oussemasahbeni/keycloakify-login-shadcn version 250004.0.17.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/mocks/getKcContextMock.ts" --revert
 */

import { createGetKcContextMock } from "@keycloakify/login-ui/KcContext/getKcContextMock";
import { kcEnvDefaults, themeNames } from "../../kc.gen";
import type { KcContextExtension, KcContextExtensionPerPage } from "../KcContext";

const kcContextExtension: KcContextExtension = {
    themeName: themeNames[0],
    client: {
        baseUrl: "https://my-theme.keycloakify.dev"
    },
    darkMode: true,
    properties: {
        ...kcEnvDefaults
    }
};
const kcContextExtensionPerPage: KcContextExtensionPerPage = {
    "patient-select-form.ftl": {
        patients: [
            { id: "1", name: "John Doe", dob: "1980-01-01" },
            { id: "2", name: "Jane Smith", dob: "1990-05-15" }
        ]
    }
};

export const { getKcContextMock } = createGetKcContextMock({
    kcContextExtension,
    kcContextExtensionPerPage,
    overrides: {},
    overridesPerPage: {}
});

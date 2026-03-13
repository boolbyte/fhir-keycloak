/**
 * This file has been claimed for ownership from @oussemasahbeni/keycloakify-login-shadcn version 250004.0.17.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/KcContext.ts" --revert
 */

import {
    type ExtendKcContext,
    createUseKcContext
} from "@keycloakify/login-ui/KcContext";
import type { KcEnvName, ThemeName } from "../kc.gen";

export type KcContextExtension = {
    themeName: ThemeName;
    properties: Record<KcEnvName, string> & {};
    // NOTE: Here you can declare more properties to extend the KcContext
    // See: https://docs.keycloakify.dev/faq-and-help/some-values-you-need-are-missing-from-in-kccontext
    client: {
        baseUrl?: string;
    };
    darkMode?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type KcContextExtensionPerPage = {
    "patient-select-form.ftl": {
        patients: {
            id: string;
            name: string;
            dob: string;
        }[];
    };
};

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;

export const { useKcContext, KcContextProvider } = createUseKcContext<KcContext>();

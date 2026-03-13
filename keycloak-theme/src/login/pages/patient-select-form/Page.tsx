import { useI18n } from "@/login/i18n";
import { useKcContext } from "@/login/KcContext";
import { assert } from "tsafe/assert";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "patient-select-form.ftl");

    const { msg } = useI18n();

    const patients = kcContext.patients ?? [];

    return (
        <Template headerNode={msg("patientSelectTitle") ?? "Patient selection"}>
            <form
                id="patient-selection"
                action={kcContext.url.loginAction}
                className="space-y-4"
                method="post"
            >
                <p className="text-sm text-muted-foreground">
                    Which patient record would you like to access?
                </p>
                <div className="space-y-2">
                    {patients.map((patient) => (
                        <label
                            key={patient.id}
                            htmlFor={patient.id}
                            className="flex items-center gap-2 cursor-pointer rounded-md border p-3 hover:bg-accent"
                        >
                            <input
                                type="radio"
                                name="patient"
                                id={patient.id}
                                value={patient.id}
                                className="cursor-pointer"
                            />
                            <span className="text-sm">
                                {patient.name} (DOB: {patient.dob})
                            </span>
                        </label>
                    ))}
                </div>

                <button
                    id="submit"
                    type="submit"
                    className="w-full mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    {msg("doSubmit")}
                </button>
            </form>
        </Template>
    );
}


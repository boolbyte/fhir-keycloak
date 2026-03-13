import type { GetMessages } from "keycloakify-emails";

const messagesByLocale: Record<string, Record<string, string>> = {
  en: {
    "requiredAction.CONFIGURE_TOTP": "Configure OTP",
    "requiredAction.TERMS_AND_CONDITIONS": "Terms and Conditions",
    "requiredAction.UPDATE_PASSWORD": "Update Password",
    "requiredAction.UPDATE_PROFILE": "Update Profile",
    "requiredAction.VERIFY_EMAIL": "Verify Email",
    "requiredAction.CONFIGURE_RECOVERY_AUTHN_CODES": "Generate Recovery Codes",
    "linkExpirationFormatter.timePeriodUnit.seconds":
      "{0,choice,0#seconds|1#second|1<seconds}",
    "linkExpirationFormatter.timePeriodUnit.minutes":
      "{0,choice,0#minutes|1#minute|1<minutes}",
    "linkExpirationFormatter.timePeriodUnit.hours":
      "{0,choice,0#hours|1#hour|1<hours}",
    "linkExpirationFormatter.timePeriodUnit.days":
      "{0,choice,0#days|1#day|1<days}",
  },
  fr: {
    "requiredAction.CONFIGURE_TOTP": "Configurer l’OTP",
    "requiredAction.TERMS_AND_CONDITIONS": "Conditions générales",
    "requiredAction.UPDATE_PASSWORD": "Mettre à jour le mot de passe",
    "requiredAction.UPDATE_PROFILE": "Mettre à jour le profil",
    "requiredAction.VERIFY_EMAIL": "Vérifier l’adresse e-mail",
    "requiredAction.CONFIGURE_RECOVERY_AUTHN_CODES":
      "Générer des codes de récupération",
    "linkExpirationFormatter.timePeriodUnit.seconds":
      "{0,choice,0#secondes|1#seconde|1<secondes}",
    "linkExpirationFormatter.timePeriodUnit.minutes":
      "{0,choice,0#minutes|1#minute|1<minutes}",
    "linkExpirationFormatter.timePeriodUnit.hours":
      "{0,choice,0#heures|1#heure|1<heures}",
    "linkExpirationFormatter.timePeriodUnit.days":
      "{0,choice,0#jours|1#jour|1<jours}",
  },
  ar: {
    "requiredAction.CONFIGURE_TOTP": "إعداد رمز التحقق",
    "requiredAction.TERMS_AND_CONDITIONS": "الشروط والأحكام",
    "requiredAction.UPDATE_PASSWORD": "تحديث كلمة المرور",
    "requiredAction.UPDATE_PROFILE": "تحديث الملف الشخصي",
    "requiredAction.VERIFY_EMAIL": "تأكيد البريد الإلكتروني",
    "requiredAction.CONFIGURE_RECOVERY_AUTHN_CODES": "إنشاء رموز استرداد",
    "linkExpirationFormatter.timePeriodUnit.seconds":
      "{0,choice,0#ثوانٍ|1#ثانية|1<ثوانٍ}",
    "linkExpirationFormatter.timePeriodUnit.minutes":
      "{0,choice,0#دقائق|1#دقيقة|1<دقائق}",
    "linkExpirationFormatter.timePeriodUnit.hours":
      "{0,choice,0#ساعات|1#ساعة|1<ساعات}",
    "linkExpirationFormatter.timePeriodUnit.days":
      "{0,choice,0#أيام|1#يوم|1<أيام}",
  },
};

export const getMessages: GetMessages = (props) => {
  // All properties are optional. If omitted, base theme defaults are used.
  return messagesByLocale[props.locale] ?? messagesByLocale.en;
};



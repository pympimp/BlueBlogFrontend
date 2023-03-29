import { watch } from "vue";
import { LocalStorage } from "quasar";
import { useI18n } from "vue-i18n";
import { appLocaleKey } from "src/utils/config";
export const useLang = () => {
  const { t, locale } = useI18n();
  const localeList = [
    { text: t("thaiLanguage"), locale: "th" },
    { text: t("engLanguage"), locale: "en" },
  ];

  watch(locale, async (newVal, oldVal) => {
    console.log("local change from", oldVal, newVal);
    LocalStorage.set(appLocaleKey, newVal);
  });

  return {
    localeList,
    t,
    locale,
  };
};

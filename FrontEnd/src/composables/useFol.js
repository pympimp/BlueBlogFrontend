import { watch } from "vue";
import { LocalStorage } from "quasar";
import { useI18n } from "vue-i18n";
import { appLocaleKey } from "src/utils/config";
export const useFol = () => {
  const { t, locale } = useI18n();
  const localeList = [
    { text: Follow, locale: "follow" },
    { text: Unfollow, locale: "unfollow" },
  ];

  watch(locale, async (newVal, oldVal) => {
    console.log("local status from", oldVal, newVal);
    LocalStorage.set(appLocaleKey, newVal);
  });

  return {
    localeList,
    t,
    locale,
  };
};

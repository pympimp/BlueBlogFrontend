import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import { LocalStorage } from "quasar";
import messages from "src/i18n";
import { appLocaleKey } from "src/utils/config";

// ทุกครั้งที่โหลดหน้าใหม่ จะมาหน้านี้ก่อน
export default boot(({ app }) => {
  const appLocale = LocalStorage.getItem(appLocaleKey);
  const i18n = createI18n({
    // locale: "th",
    // เช็คว่ามีค่าไหม ? set ค่า default
    locale: appLocale ? appLocale : "th",
    globalInjection: true,
    messages,
    legacy: false,
  });

  // Set i18n instance on app
  app.use(i18n);
});

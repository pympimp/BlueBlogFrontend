import { api } from "boot/axios";
import { LocalStorage } from "quasar";
import { appLocaleKey } from "src/utils/config";
export const useAxios = () => {
  const appLocale = LocalStorage.getItem(appLocaleKey);
  const callApi = (
    req = {
      method: undefined, //POST GET PUT DELETE
      url: undefined,
      body: undefined, //ส่งเป็น Object ไป
      baseUrl: undefined,
      contentType: "application/json", //ถ้าเป็นรูปจะเป็น multi path
    }
  ) => {
    return new Promise((resolve, reject) => {
      console.log(`api ${api.defaults.baseURL}${req.url}`);

      api.defaults.headers["apiClient"] = "default";
      api.defaults.headers["X-Locale"] = appLocale ? appLocale : "th";
      api.defaults.headers.Authorization = `Bearer `;
      if (req.baseUrl) {
        api.defaults.baseURL = req.baseUrl;
      }
      if (req.contentType) {
        api.defaults.headers["Content-Type"] = req.contentType;
      } else {
        api.defaults.headers["Content-Type"] = "application/json";
      }
      api({
        method: req.method,
        url: req.url,
        data: req.body ? req.body : undefined,
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  };
  return {
    callApi,
  };
};

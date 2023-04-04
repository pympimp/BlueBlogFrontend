<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
    <q-header elevated style="background-color: #1d366f" class="fullscreen">
      <!-- ส่วนของ nav bar -->
      <div class="navbar">
        <q-toolbar
          class="fixed"
          style="display: flex; justify-content: space-around"
        >
          <!-- ส่วนของแถบสามขีด เมนู MainPage, MyFeed -->
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />

          <!-- ส่วนของโลโก้ คลิกกลับหน้าหลัก -->
          <router-link to="/">
            <q-avatar class="q-ml-md">
              <img src="/public/blueblog-logo.png" />
            </q-avatar>
            <q-tooltip transition-show="scale" transition-hide="scale">
              {{ t("BacktoMain") }}
            </q-tooltip>
          </router-link>

          <!-- serch user -->
          <div class="q-pa-md">
            <div class="q-gutter-xl">
              <q-select
                v-model="model"
                use-input
                rounded
                outlined
                hide-selected
                fill-input
                bg-color="white"
                q-icon="search"
                dense
                input-debounce="0"
                :label="t('SearchBar')"
                :options="options"
                @filter="filterFn"
                @filter-abort="abortFilterFn"
                style="width: 300px; margin-left: 370px; margin-right: 370px"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      ไม่พบข้อมูล
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:option="{ opt }">
                  <router-link
                    :to="'/myprofile/' + opt.id"
                    style="text-decoration: none"
                  >
                    <div
                      class="q-pa-md q-gutter-md"
                      style="display: flex; align-items: center"
                    >
                      <q-avatar class="q-mr-sm">
                        <img :src="opt.picture.x" />
                      </q-avatar>
                      <div
                        style="
                          display: flex;
                          flex-direction: column;
                          margin-left: 10px;
                        "
                      >
                        <div style="font-weight: bolder; color: #1a237e">
                          {{ opt.id }} - {{ opt.username }}
                        </div>
                        <div style="color: gray">{{ opt.email }}</div>
                        <div style="color: gray">{{ opt.bio }}</div>
                      </div>
                    </div>
                  </router-link>
                </template>

                <template v-slot:selected="{ opt }">
                  <router-link
                    :to="'/myprofile/' + opt.id"
                    style="text-decoration: none"
                  >
                    <div
                      class="q-pa-md q-gutter-md"
                      style="display: flex; align-items: center"
                    >
                      <q-avatar class="q-mr-auto">
                        <img :src="opt.picture.x" />
                      </q-avatar>
                      <div
                        style="
                          display: flex;
                          flex-direction: column;
                          margin-left: 5px;
                        "
                      >
                        <div style="font-weight: bolder; color: #1a237e">
                          {{ opt.id }} - {{ opt.username }}
                        </div>
                        <div style="color: gray">{{ opt.email }}</div>
                        <div style="color: gray">{{ opt.bio }}</div>
                      </div>
                    </div>
                  </router-link>
                  <div class="q-pa-md q-gutter-sm">
                    <div style="display: inline">
                      {{ opt.id }} - {{ opt.username }}
                    </div>
                    {{ opt.email }}
                  </div>
                </template>
              </q-select>
            </div>
          </div>
          <!-- search user -->

          <!-- ปุ่มเปลี่ยนภาษา -->
          <div style="cursor: pointer">
            <q-icon :name="biTranslate"></q-icon> &nbsp;{{ locale
            }}<q-menu>
              <q-list style="min-width: 100px">
                <q-item
                  v-for="(item, index) in localeList"
                  :key="index"
                  clickable
                  v-close-popup
                  @click="locale = item.locale"
                >
                  <q-item-section>{{ item.text }}</q-item-section>
                  <!-- ไอคอน Check -->
                  <q-item-section v-if="item.locale == locale" avatar>
                    <q-icon color="indigo-12" :name="biCheck" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <q-tooltip transition-show="scale" transition-hide="scale">
              {{ $t("Translate") }}
            </q-tooltip>
          </div>

          <!-- ส่วนของปุ่มเพิ่มโพส -->
          <router-link to="addpost">
            <img
              src="/public/add-white.png"
              alt=""
              style="width: 30px; height: 30px; margin-left: 12px"
            />
            <q-tooltip transition-show="scale" transition-hide="scale">
              {{ $t("AddPost") }}
            </q-tooltip>
          </router-link>

          <!-- ส่วนของปุ่มล็อกอิน -->
          <div class="q-pa-md">
            <q-btn-dropdown
              class="glossy"
              color="white"
              text-color="indigo-10"
              :label="t('Account')"
              style="padding: 7px 7px 7px 7px; width: 110px; font-weight: bold"
            >
              <div class="row no-wrap q-pa-md">
                <q-list style="min-width: 100px">
                  <!-- เมนู MyProfile -->
                  <q-item clickable to="myprofile">
                    <i
                      class="fa-solid fa-user"
                      style="margin-top: 10px; color: #406882"
                    ></i>
                    <q-item-section style="color: #1d366f"
                      >&nbsp; &nbsp;{{ $t("MyAccount") }}</q-item-section
                    >
                  </q-item>
                  <q-separator />

                  <!-- เมนู ManageProfile -->
                  <q-item clickable to="manageprofile">
                    <i
                      class="fa-solid fa-pen"
                      style="margin-top: 10px; color: #406882"
                    ></i>
                    <q-item-section style="color: #1d366f"
                      >&nbsp; &nbsp;{{ $t("ManageProfile") }}</q-item-section
                    >
                  </q-item>
                  <q-separator />

                  <!-- เมนู Setting -->
                  <q-item clickable to="setting">
                    <i
                      class="fa-solid fa-gear"
                      style="margin-top: 10px; color: #406882"
                    ></i>
                    <q-item-section style="color: #1d366f"
                      >&nbsp; &nbsp;{{ $t("Setting") }}</q-item-section
                    >
                  </q-item>
                </q-list>

                <!-- เส้นกั้นแนวตั้ง -->
                <q-separator vertical inset class="q-mx-lg" />

                <!-- ส่วนของฝั่งขวา รูปโปรไฟล์, username และปุ่ม Logout -->
                <div class="column items-center">
                  <q-avatar
                    v-if="authenStore.auth.picture"
                    size="65px"
                    class="shadow-5"
                  >
                    <q-img :src="authenStore.auth.picture.path" />
                  </q-avatar>
                  <div
                    class="text-subtitle1 q-mt-md q-mb-xs"
                    style="color: #c2185b; font-weight: bold"
                  >
                    {{ authenStore.auth.email }}
                  </div>

                  <q-btn
                    color="pink-4"
                    clickable
                    v-close-popup
                    @click="logoutConfirm"
                    push
                    size="m"
                    style="height: 30px; font-weight: lighter"
                  >
                    {{ t("Logout") }}
                  </q-btn>
                </div>
              </div>
            </q-btn-dropdown>
          </div>
        </q-toolbar>
      </div>
    </q-header>
    <!-- </div> -->

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="text-indigo-10"
    >
      <q-list>
        <q-item-label
          header
          style="color: #1d366f; font-weight: bolder; font-size: 20px"
        >
          {{ t("Menu") }}
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { fabYoutube } from "@quasar/extras/fontawesome-v6";
import { biTranslate, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";
import { useAuthenStore } from "src/stores/authen";
import { AuthenApi } from "src/api/AuthenApi";
import { useQuasar } from "quasar";
// const $q = useQuasar();
// const { userLogout } = AuthenApi();
// const authenStore = useAuthenStore();
// const { localeList, t, locale } = useLang();

/* Search user */
// นำเข้าฟังก์ชัน useAxios จากไฟล์ useAxios.js เพื่อใช้ในการเรียกใช้ API
import { useAxios } from "src/composables/useAxios";
// นำเข้า class UserApi จากไฟล์ UserApi.js เพื่อใช้ในการเรียกใช้ API
import { UserApi } from "src/api/UserApi";
// เรียกใช้เมธอด getUserList จาก class UserApi และเก็บไว้ในตัวแปร getUserList
const { getUserList } = UserApi();
// const userList = ref([]);
// สร้างตัวแปร stringUserOption เป็น reactive variable และกำหนดค่าเริ่มต้นเป็น []
const stringUserOption = ref([]);

const leftDrawerOpen = ref(false);
const search = ref("");
import EssentialLink from "components/EssentialLink.vue";

export default {
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const $q = useQuasar();
    const { userLogout } = AuthenApi();
    const authenStore = useAuthenStore();
    const { localeList, t, locale } = useLang();

    const logoutConfirm = async () => {
      $q.dialog({
        title: t("appName"),
        message: t("logoutCf"),
        cancel: true,
        ok: {
          label: t("k"),
          flat: true,
          outline: true,
          color: "positive",
        },
        cancel: {
          label: t("n"),
          flat: true,
          color: "negative",
        },
      })
        .onOk(() => {
          console.log("OK");
          logoutProcess();
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    };

    const logoutProcess = async () => {
      const response = await userLogout();
      console.log("userLogout", response);
      if (response && response.status) {
        //clear aut key on localStorage
        authenStore.logout();
        $q.notify({
          message: response.message,
        });

        //redirect to login page
        setTimeout(() => {
          authenStore.logout();
          window.location.replace("/");
        }, 500);
      }
    };

    const linksList = [
      {
        title: t("MainPage"),
        caption: t("MainDes"),
        icon: "home",
        name: "/mainpage",
      },
      {
        title: t("FolPage"),
        caption: t("FolDes"),
        icon: "group",
        link: "https://github.com/quasarframework",
      },
    ];

    /* Search user */
    // สร้าง async function fetch สำหรับเรียก API และเก็บผลลัพธ์ในตัวแปร stringUserOption
    const fetch = async () => {
      const response = await getUserList({});
      if (response) {
        stringUserOption.value = response.dataList;
      }
      console.log("response", response);
    };
    // เรียกใช้ฟังก์ชัน fetch เมื่อ component ถูกสร้าง
    fetch();

    // สร้าง reactive variable options โดยกำหนดค่าเริ่มต้นเป็นค่าของ stringUserOption
    const options = ref(stringUserOption.value);

    return {
      useAuthenStore,
      authenStore,
      AuthenApi,
      useQuasar,
      logoutConfirm,
      logoutProcess,
      localeList,
      t,
      locale,
      biCheck,
      essentialLinks: linksList,
      biTranslate,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

/* search user */
model: ref(null), //reactive variable ที่เก็บค่าที่เลือกจาก dropdown menu
      options, //reactive variable ที่เก็บค่า options สำหรับ dropdown menu
      fetch, //function สำหรับเรียก API และอัปเดตค่าใน options

      // function สำหรับ filter options ใน dropdown menu โดยใช้คำค้นหา val
      filterFn(val, update, abort) {
        // call abort() at any time if you can't retrieve data somehow

        setTimeout(() => {
          update(() => {
            if (val === "") {
              options.value = stringUserOption.value;
            } else {
              const needle = val.toLowerCase();
              options.value = stringUserOption.value.filter((v) => {
                return (
                  v.username.toLowerCase().indexOf(needle) > -1 ||
                  v.email.toLowerCase().indexOf(needle) > -1 ||
                  v.id.toString().toLowerCase().indexOf(needle) > -1 // เพิ่มเงื่อนไขการกรองข้อมูลตาม id
                );
              });
            }
          });
        }, 1500);
      },

      //function สำหรับยกเลิกการ filter options ใน dropdown menu ที่มีการ delay
      abortFilterFn() {
        console.log("delayed filter aborted");
      },
    };
  },
};
</script>

<style>
header {
  height: 70px;
}
</style>

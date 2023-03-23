<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
    <!-- <div class="row justify-around"> -->
    <q-header elevated style="background-color: #1d366f" class="fullscreen">
      <div class="navbar">
        <q-toolbar
          class="fixed"
          style="display: flex; justify-content: space-around"
        >
          <!-- แถบสามขีด เมนู MainPage, MyFeed -->
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />

          <!-- โลโก้ คลิกกลับหน้าหลัก -->
          <router-link to="/">
            <q-avatar class="q-ml-md">
              <img src="/public/blueblog-logo.png" />
            </q-avatar>
            <q-tooltip transition-show="scale" transition-hide="scale">
              กลับเมนูหลัก
            </q-tooltip>
          </router-link>

          <!-- แถบเสิร์ชบาร์ -->
          <q-input
            rounded
            outlined
            v-model="text"
            label="ช่องค้นหา"
            bg-color="white"
            q-icon="search"
            dense
            style="width: 300px; margin-left: 370px; margin-right: 370px"
          />

          <!-- ปุ่มเพิ่มโพส -->
          <router-link to="addpost">
            <img
              src="/public/add-white.png"
              alt=""
              style="width: 30px; height: 30px; margin-right: 15px"
            />
            <q-tooltip transition-show="scale" transition-hide="scale">
              เพิ่มโพสต์ใหม่
            </q-tooltip>
          </router-link>

          <!-- ปุ่มล็อกอิน -->
          <div class="q-pa-md">
            <q-btn-dropdown
              class="glossy"
              color="white"
              text-color="indigo-10"
              label="บัญชี"
              style="padding: 7px 7px 7px 7px; width: 90px; font-weight: bold"
            >
              <div class="row no-wrap q-pa-md">
                <q-list style="min-width: 100px">
                  <!-- เมนู MyProfile -->
                  <q-item clickable to="myprofile">
                    <i
                      class="fa-solid fa-user"
                      style="margin-top: 10px; color: #406882"
                    ></i>
                    <q-item-section>&nbsp; &nbsp;บัญชีของฉัน</q-item-section>
                  </q-item>
                  <q-separator />
                  <!-- เมนู ManageProfile -->
                  <q-item clickable to="manageprofile">
                    <i
                      class="fa-solid fa-pen"
                      style="margin-top: 10px; color: #406882"
                    ></i>
                    <q-item-section>&nbsp; &nbsp;แก้ไขโปรไฟล์</q-item-section>
                  </q-item>
                  <q-separator />
                  <!-- เมนู Setting -->
                  <q-item clickable to="setting">
                    <i
                      class="fa-solid fa-gear"
                      style="margin-top: 10px; color: #406882"
                    ></i>
                    <q-item-section>&nbsp; &nbsp;การตั้งค่า</q-item-section>
                  </q-item>
                </q-list>

                <!-- เส้นกั้นแนวตั้ง -->
                <q-separator vertical inset class="q-mx-lg" />

                <div class="column items-center">
                  <q-avatar size="65px">
                    <img src="/public/pf1.png" />
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    Username00009
                  </div>
                  <q-btn
                    to="login"
                    color="primary"
                    label="กลับหน้าเข้าสู่ระบบ "
                    push
                    size="m"
                    v-close-popup
                    style="height: 30px"
                  />
                </div>
              </div>
            </q-btn-dropdown>
          </div>
        </q-toolbar>
      </div>
    </q-header>
    <!-- </div> -->

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label
          header
          style="color: black; font-weight: bolder; font-size: 20px"
        >
          เมนู
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
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "หน้าหลัก",
    caption: "แสดงทุกโพสต์บนเว็บไซต์",
    icon: "home",
    name: "/mainpage",
  },
  {
    title: "คนที่ฉันติดตาม",
    caption: "แสดงโพสต์จากคนที่ติดตาม",
    icon: "group",
    link: "https://github.com/quasarframework",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style>
header {
  height: 70px;
}
</style>

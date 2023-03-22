<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
    <!-- <div class="row justify-around"> -->
    <q-header elevated style="background-color: #1d366f" class="fullscreen">
      <div class="navbar" style="margin-top: 7px">
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
              Back to Main page
            </q-tooltip>
          </router-link>

          <!-- แถบเสิร์ชบาร์ -->
          <q-input
            rounded
            outlined
            v-model="text"
            label="Search bar"
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
              Add New Post
            </q-tooltip>
          </router-link>

          <!-- ปุ่มล็อกอิน -->
          <q-btn
            to="login"
            class="glossy"
            color="white"
            text-color="indigo-10"
            label="Login / Sign Up"
          />
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
          Menu Bar
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
import { biHouseFill } from "@quasar/extras/bootstrap-icons";

const linksList = [
  {
    title: "Main Menu",
    caption: "for all content",
    icon: "home",
    name: "/mainpage",
  },
  {
    title: "My Page",
    caption: "see content from who you follow",
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

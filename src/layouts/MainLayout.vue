<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
    <!-- <div class="row justify-around"> -->
    <q-header elevated style="background-color: #1d366f" class="fullscreen">
      <div class="navbar" style="margin-top: 7px">
        <q-toolbar
          class="fixed"
          style="display: flex; justify-content: space-around"
        >
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
          <router-link to="/">
            <q-avatar class="q-ml-md">
              <img src="/public/blueblog-logo.png" />
            </q-avatar>
            <q-tooltip transition-show="scale" transition-hide="scale">
              Back to Main page
            </q-tooltip>
          </router-link>

          <q-input
            rounded
            outlined
            v-model="text"
            label="Search bar"
            bg-color="white"
            q-icon="search"
            style="width: 300px; margin-left: 370px; margin-right: 370px"
          />

          <!-- <q-icon name="add" color="white" style="margin-left: 300px" /> -->
          <router-link to="addpost">
            <img
              src="/public/add-white.png"
              alt=""
              style="width: 30px; height: 30px"
            />
            <q-tooltip transition-show="scale" transition-hide="scale">
              Add New Post
            </q-tooltip>
          </router-link>

          <div class="dropdown">
            <q-btn-dropdown
              class="glossy"
              color="white"
              text-color="indigo-10"
              label="Account"
            >
              <div class="row no-wrap q-pa-md">
                <q-list style="min-width: 100px">
                  <q-item clickable>
                    <i
                      class="fa-solid fa-user"
                      style="margin-top: 7px; color: #406882"
                    ></i>
                    <q-item-section>&nbsp; &nbsp;My Profile</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable>
                    <i
                      class="fa-solid fa-pen"
                      style="margin-top: 7px; color: #406882"
                    ></i>
                    <q-item-section>&nbsp; &nbsp;Manage Profile</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable>
                    <i
                      class="fa-solid fa-gear"
                      style="margin-top: 7px; color: #406882"
                    ></i>
                    <q-item-section>&nbsp; &nbsp;Settings</q-item-section>
                  </q-item>
                </q-list>

                <!-- เส้นขีดกั้นระหว่างโปรไฟล์กับเมนู -->
                <q-separator vertical inset class="q-mx-lg" />

                <div class="column items-center">
                  <q-avatar size="72px">
                    <img src="/public/profile-icon.png" />
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    Firstname Lastname
                  </div>

                  <q-btn
                    color="deep-purple-5"
                    label="Logout"
                    push
                    size="sm"
                    v-close-popup
                  >
                  </q-btn>
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
        <q-item-label header> Menu Bar </q-item-label>

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
    name: "/addpost",
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
#icon {
  color: red;
}
</style>

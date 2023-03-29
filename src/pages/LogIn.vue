<template>
  <q-page class="flex flex-center">
    <div class="container">
      <h5 style="">{{ t("Login") }}</h5>
      <q-input
        v-model="email"
        filled
        type="email"
        :label="t('Email')"
        style="width: 250px; color: #1a237e"
      />
      <br />
      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        :label="t('Password')"
        style="width: 250px"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <br />
      <section>
        <p style="display: inline">{{ t("NoAccount") }}</p>
        <router-link to="/signup">&nbsp; {{ t("Click") }}</router-link>
      </section>
      <br />
      <q-btn push color="grey-7" :label="t('Submit')" to="mainpage" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { biTranslate, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";

export default {
  name: "LogIn",
  setup() {
    const { localeList, t, locale } = useLang();
    const leftDrawerOpen = ref(false);
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    return {
      localeList,
      t,
      locale,
      text: ref(""),
      third: ref(false),
      isPwd: ref(true),
      password: ref(""),
      email: ref(""),
      search: ref(""),
      tel: ref(""),
      url: ref(""),
      time: ref(""),
      date: ref(""),

      toggleLeftDrawer,
      links1: [{ icon: biTranslate, text: "Translate", link: "/locale-page" }],
    };
  },
};
</script>

<style scoped>
.flex {
  background-image: url(./public/background.jpg);
  background-size: cover;
  width: 100%;
  height: auto;
}
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0.8;
  width: 350px;
  height: 390px;
  padding: 50px 50px 50px 50px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 10px;
  background: white;
}
.container:hover {
  transform: scale(1.02);
}

a {
  color: indigo;
  text-decoration: none;
}
</style>

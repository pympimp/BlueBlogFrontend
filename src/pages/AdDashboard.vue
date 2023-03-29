<template>
  <q-page class="flex flex-center" style="display: flex">
    <div style="margin-right: 20px">
      <!-- ส่วนของ Total User -->
      <div
        class="container"
        style="width: 250px; height: 250px; margin-bottom: 20px"
      >
        <p
          style="
            font-size: 20px;
            font-weight: bolder;
            margin-bottom: -10px;
            display: flex;
            justify-content: center;
          "
        >
          Total User
        </p>
      </div>

      <!-- ส่วนของ Total Post -->
      <div class="container" style="width: 250px; height: 250px">
        <p
          style="
            font-size: 20px;
            font-weight: bolder;
            margin-bottom: -10px;
            display: flex;
            justify-content: center;
          "
        >
          Total Post
        </p>
      </div>
    </div>

    <!-- ส่วนของ User Statistics -->
    <div class="container" style="width: 600px; height: 520px">
      <p
        style="
          font-size: 20px;
          font-weight: bolder;
          margin-bottom: -10px;
          display: flex;
          justify-content: center;
        "
      >
        User Statistics
      </p>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { biTranslate, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";

export default {
  name: "DashBoard",
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

      toggleLeftDrawer,
      links1: [{ icon: biTranslate, text: "Translate", link: "/locale-page" }],
    };
  },
};
</script>

<style scoped>
.flex {
  background-color: #d6e3ea;
  background-image: url(./public/background.jpg);
  background-size: cover;
  width: 100%;
  height: auto;
}

.container {
  opacity: 0.8;
  margin-bottom: 10px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 25px 50px 25px 50px;
  background: white;
}
</style>

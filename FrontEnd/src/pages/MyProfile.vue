<template>
  <q-page class="flex flex-center column">
    <!-- ส่วนข้อมูลหลักของผู้ใช้ -->
    <div class="container-header">
      <!-- รูปโปรไฟล์ -->
      <q-avatar v-if="authenStore.auth.picture" size="65px" class="shadow-5">
        <q-img :src="authenStore.auth.picture.path" />
      </q-avatar>
      <!-- username และ bio -->
      <div
        class="details"
        style="display: inline; margin-left: -150px; margin-top: 10px"
      >
        <b style="color: #1a237e"> {{ authenStore.auth.username }}</b>
        <p style="color: #5c6bc0">{{ authenStore.auth.bio }}</p>
      </div>
      <q-btn
        to="manageprofile"
        glossy
        push
        color="pink"
        :label="t('Manage')"
        style="height: 20px"
      />
    </div>

    <!-- ส่วนข้อมูลเพิ่มเติมของผู้ใช้ -->
    <div
      class="container-content"
      style="padding: 20px 20px 20px 20px; width: 500px"
    >
      <div
        style="
          display: flex;
          justify-content: space-around;
          font-weight: bolder;
          color: #880e4f;
        "
      >
        <div>{{ t("Posted") }}</div>
        <div>{{ t("Replied") }}</div>
        <div>{{ t("Liked") }}</div>
      </div>
      <hr
        style="
          border: 1px thin gray;
          margin: 15px 15px 15px 15px;
          color: #880e4f;
        "
      />

      <!-- ส่วนของโพสต์ต่างๆของผู้ใช้ -->
      <div class="post">
        <router-link
          to="postncomment"
          style="
            text-decoration: none;
            color: black;
            font-weight: bolder;
            color: #1a237e;
          "
          >ร้านค้าที่รับแต่เงินสด ไม่เสียดายลูกค้าบ้างหรอครับ
        </router-link>
        <p style="color: #5c6bc0">28 กุมภาพันธ์ 2566</p>
        <!-- <hr style="border: 0.5px thin gray" /> -->

        <router-link
          to="postncomment"
          style="
            text-decoration: none;
            color: black;
            font-weight: bolder;
            color: #1a237e;
          "
          >ไปเที่ยวเกาะหมากนอนรีสอร์ตไหนดี?</router-link
        >
        <p style="color: #5c6bc0">5 มีนาคม 2566</p>

        <!-- <hr style="border: 0.5px thin gray" /> -->

        <router-link
          to="postncomment"
          style="
            text-decoration: none;
            color: black;
            font-weight: bolder;
            color: #1a237e;
          "
          >โอนเงินจากทรูมันนี่ไปธนาคารเลขบัญชีผิดทำอย่างไรดี</router-link
        >
        <p style="color: #5c6bc0">18 สิงหาคม 2566</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { biTranslate, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";
import { useAuthenStore } from "src/stores/authen";
import { AuthenApi } from "src/api/AuthenApi";

export default {
  name: "MyProfile",
  setup() {
    const { localeList, t, locale } = useLang();
    const leftDrawerOpen = ref(false);
    const authenStore = useAuthenStore();
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    return {
      authenStore,
      useAuthenStore,
      AuthenApi,
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
.container-header {
  display: flex;
  justify-content: space-between;
  opacity: 0.8;
  width: 500px;
  margin-bottom: 10px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 20px 20px 20px 20px;
  background: white;
}

.container-content {
  opacity: 0.8;
  width: 700px;
  margin-bottom: 10px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 10px;
  background: white;
}

/* set up รูปโปรไฟล์ */
</style>

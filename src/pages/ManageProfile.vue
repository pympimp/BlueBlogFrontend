<template>
  <q-page class="flex flex-center">
    <div class="container">
      <!-- หัวข้อ Edit Profile -->
      <p style="font-size: 25px; font-weight: bolder; color: #880e4f">
        {{ t("ManageProfile") }}
      </p>

      <!-- รูปโปรไฟล์ -->
      <div class="top" style="display: inline">
        <ion-avatar class="profile" style="">
          <img
            src="/public/pf1.png"
            style="width: 50px; height: 50px; margin-bottom: 10px"
          />
        </ion-avatar>

        <!-- ส่วนของการแทรกไฟล์รูปภาพ -->
        <div
          style="position: absolute; right: 600px; top: 135px;color: color: #3949ab ;"
        >
          <q-input
            @update:model-value="
              (val) => {
                files = val;
              }
            "
            multiple
            type="file"
            style="width: 200px,height: 0px;"
            borderless
          />
        </div>
        <br />
        <!-- ส่วนของการเปลี่ยนอีเมล -->
        <i style="color: #3949ab">{{ t("Email") }} :</i>
        <q-input
          filled
          v-model="text"
          :dense="dense"
          style="width: 350px; margin-bottom: 7px"
        />

        <!-- ส่วนของการแก้ไข username -->
        <i style="color: #3949ab">{{ t("Password") }} :</i>
        <q-input
          filled
          v-model="text"
          :dense="dense"
          style="width: 350px; margin-bottom: 7px"
        />

        <!-- ส่วนของการแก้ไข bio -->
        <i style="color: #3949ab">{{ t("Bio") }} :</i>
        <!-- <div class="q-pa-md" style="max-width: 1000px; width: 350px"> -->
        <q-input v-model="text" filled type="textarea" style="width: 359px" />
        <!-- </div> -->

        <!-- ส่วนของปุ่ม Submit -->
        <q-btn
          glossy
          push
          color="pink"
          :label="t('Save')"
          style="margin-top: 20px; margin-left: 300px"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { biTranslate, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";

export default {
  name: "ManageProfile",
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

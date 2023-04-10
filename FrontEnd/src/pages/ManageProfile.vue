<template>
  <q-page class="flex flex-center">
    <div class="container">
      <!-- หัวข้อ Edit Profile -->
      <p style="font-size: 25px; font-weight: bolder; color: #880e4f">
        {{ t("ManageProfile") }}
      </p>

      <!-- รูปโปรไฟล์ -->
      <div class="top" style="display: inline">
        <q-avatar v-if="authenStore.auth.picture" size="60px" class="shadow-5">
          <q-img :src="authenStore.auth.picture.path" />
        </q-avatar>

        <!-- ส่วนของการแทรกไฟล์รูปภาพ -->
        <div style="margin-top: 10px; color: #3949ab">
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
        <!-- ส่วนของการเปลี่ยนอีเมล -->
        <i style="color: #3949ab">{{ t("Email") }} :</i>
        <q-input
          filled
          v-model="text"
          :dense="dense"
          style="width: 350px; margin-bottom: 7px"
        />

        <!-- ส่วนของการแก้ไข username -->
        <i style="color: #3949ab">{{ t("Username") }} :</i>
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

<script setup>
import { ref } from "vue";
import { biTranslate, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";
import { useAuthenStore } from "src/stores/authen";
import { AuthenApi } from "src/api/AuthenApi";
import { UserApi } from "src/api/UserApi";

const { getOne } = UserApi();

const { localeList, t, locale } = useLang();
const authenStore = useAuthenStore();
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

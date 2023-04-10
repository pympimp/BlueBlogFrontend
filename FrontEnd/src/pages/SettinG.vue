<template>
  <q-page class="flex flex-center">
    <div class="container">
      <!-- หัวข้อ Edit Profile -->
      <p style="font-size: 25px; font-weight: bolder; color: #880e4f">
        {{ t("Setting") }}
      </p>

      <!-- ส่วนของการแก้ไข password เก่า-->
      <i style="margin-right: 220px; color: #3949ab"
        >{{ t("OldPassword") }} :</i
      >
      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        style="width: 300px"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <!-- ส่วนของการแก้ไข password ใหม่-->
      <i style="margin-right: 220px; margin-top: 10px; color: #3949ab"
        >{{ t("NewPassword") }} :</i
      >
      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        style="width: 300px"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <!-- ส่วนของปุ่ม Submit -->
      <q-btn
        glossy
        push
        color="pink"
        :label="t('Save')"
        style="margin-top: 20px; margin-left: 230px"
      />
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { biTranslate, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";

const { localeList, t, locale } = useLang();
const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const isPwd = ref(true);
const password = ref("");
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
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0.8;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 25px 30px 25px 30px;
  background: white;
}
</style>

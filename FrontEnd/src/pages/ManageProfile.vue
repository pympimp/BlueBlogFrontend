<template>
  <q-page class="flex flex-center">
    <div class="container">
      <q-spinner v-if="loading == true" color="indigo-12" size="3em" />
      <template v-else>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <!-- หัวข้อ Edit Profile -->
          <p style="font-size: 25px; font-weight: bolder; color: #880e4f">
            {{ t("ManageProfile") }}
          </p>

          <!-- รูปโปรไฟล์ -->
          <div class="top" style="display: inline">
            <q-avatar
              v-if="authenStore.auth.picture"
              size="60px"
              class="shadow-5"
            >
              <q-img :src="authenStore.auth.picture.path" />
            </q-avatar>

            <!-- ส่วนของการแทรกไฟล์รูปภาพ -->
            <div style="margin-top: 10px; color: #3949ab">
              <!-- <q-input
            @update:model-value="
              (val) => {
                files = val;
              }
            "
            multiple
            type="file"
            style="width: 200px,height: 0px;"
            borderless
          /> -->
              <q-file outlined v-model="imageFile" label="Image"></q-file>
            </div>
            <!-- ส่วนของการเปลี่ยนอีเมล -->
            <i style="color: #3949ab">{{ t("Email") }} :</i>
            <q-input
              filled
              v-model="entityItem.email"
              style="width: 350px; margin-bottom: 7px"
            />

            <!-- ส่วนของการแก้ไข username -->
            <i style="color: #3949ab">{{ t("Username") }} :</i>
            <q-input
              filled
              v-model="entityItem.username"
              style="width: 350px; margin-bottom: 7px"
            />

            <!-- ส่วนของการแก้ไข bio -->
            <i style="color: #3949ab">{{ t("Bio") }} :</i>
            <!-- <div class="q-pa-md" style="max-width: 1000px; width: 350px"> -->
            <q-input
              v-model="entityItem.bio"
              filled
              type="textarea"
              style="width: 359px"
            />
            <!-- </div> -->

            <!-- ส่วนของปุ่ม Submit -->
            <q-btn
              glossy
              push
              color="pink"
              type="submit"
              :label="t('Save')"
              style="margin-top: 20px; margin-left: 300px"
            />
          </div>
        </q-form>
      </template>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { biTranslate, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";
import { useAuthenStore } from "src/stores/authen";
import { AuthenApi } from "src/api/AuthenApi";
import { UserApi } from "src/api/UserApi";
import { FileApi } from "src/api/FileApi";
import { useRoute, useRouter } from "vue-router";

const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const { uploadImageApi, updateAvatar } = FileApi();
const { getOne, updateUser } = UserApi();

const loading = ref(false);
const userId = ref();
const imageFile = ref();
const entityItem = ref({
  user_id: null,
  email: "",
  username: "",
  bio: "",
  picture: "",
  haveNewImage: false,
});

onMounted(() => {
  if (route.params.userId) {
    userId.value = route.params.userId;
    entityItem.value.user_id = route.params.userId;
  }

  if (imageFile.value) {
    fetchData();
  }

  console.log("get usertId ", userId.value);
});

const fetchData = async () => {
  loading.value = true;
  const response = await getOne(userId.value);
  loading.value = false;
  console.log("fetchData", response);
  if (response) {
    entityItem.value = response.entity;
  }
};

const onSubmit = async () => {
  // if (!entityItem.value.username) {
  //   $q.notify({
  //     message: "Please fill username",
  //     type: "negative",
  //   });
  //   return;
  // }

  if (imageFile.value) {
    const fileNameResponse = await updateAvatar(imageFile.value);
    console.log("updateAvatar", fileNameResponse);
    if (fileNameResponse && fileNameResponse.imageName) {
      entityItem.value.image = fileNameResponse.imageName;
      entityItem.value.haveNewImage = true;
    }
    console.log("onSubmit", entityItem.value);
    updateProcess();
    console.log(entityItem);
  }
};

const updateProcess = async () => {
  loading.value = true;
  const response = await updateUser(entityItem.value);
  console.log("updateUser", response);
  if (response) {
    $q.notify({
      message: response.message,
      type: "positive",
    });
  }
  loading.value = false;
  router.push("/");
};

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

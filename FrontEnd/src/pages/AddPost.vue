<template>
  <q-page class="flex flex-center">
    <q-form @submit="onSubmit">
      <div class="container">
        <!-- ส่วนของหัวข้อ 'เพิ่มโพสต์ใหม่' -->
        <p style="font-size: 25px; font-weight: bolder; color: #1a237e">
          °˖ ✧◝
          {{ action == "edit" ? t("EditPost") : t("AddPost") }} ◜✧˖ °
        </p>

        <!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  -->

        <!-- ส่วนของการใส่หัวข้อโพสต์ -->
        <q-input
          outlined
          v-model="entityItem.title"
          :label="t('PostHead')"
          color="indigo-10"
          stack-label
          style="width: 600px; color: #1a237e"
          :rules="[(val) => !!val || 'Field is required']"
        />

        <!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  -->

        <!-- ส่วนของการจัดรูปแบบเนื้อหาโพสต์ -->

        <div class="q-pa-md" style="max-width: 800px; margin-top: -10px">
          <q-input
            outlined
            v-model="entityItem.content"
            :label="t('ContentPost')"
            color="indigo-10"
            stack-label
            style="width: 600px; color: #1a237e"
            :rules="[(val) => !!val || 'Field is required']"
            type="textarea"
          />

          <!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  -->

          <!-- ส่วนของรูปภาพของโพสต์ -->
          <div class="q-col-gutter-md row items-start q-mb-md">
            <div
              class="col-4"
              v-for="(postImg, index) in entityItem?.postImg"
              :key="index"
            >
              <q-img :src="postImg.postimg.path" class="img" :ratio="4 / 3" />
            </div>
          </div>

          <!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  -->

          <!-- ส่วนของการแทรกไฟล์รูปภาพ -->
          <div style="display: flex; justify-content: space-between">
            <!-- ปุ่มเลือกไฟล์ -->
            <q-file
              color="pink"
              v-model="imageFileList"
              :label="t('ChooseFile')"
              borderless
              multiple
              style="padding-right: 50px; text-decoration: none"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>

            <!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  --><!--  -->

            <!-- ส่วนของปุ่มโพสต์ -->
            <q-btn
              push
              color="indigo-5"
              :label="t('Postbtn')"
              style="height: 35px; width: 50px; margin-top: 20px"
              type="submit"
            />
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { biTranslate, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";
import { useQuasar } from "quasar";
import { useAxios } from "src/composables/useAxios";
import { PostApi } from "src/api/PostApi";
import { FileApi } from "src/api/FileApi";
import { useRoute, useRouter } from "vue-router";
// Add Post
const { addPost, detailPost, updateTextPost } = PostApi();
// File Upload
const { uploadImageApi } = FileApi();

const $q = useQuasar();
const route = useRoute();
const router = useRouter();

const { localeList, t, locale } = useLang();
const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
const postId = ref();
const action = ref();
const loading = ref();
const titlePost = ref("");
const contentPost = ref("");
const imageFile = ref();
const imageFileList = ref([]);
const entityItem = ref({
  id: null,
  user_id: "",
  title: "",
  content: "",
  haveNewImage: false,
  imageNameList: [],
});

onMounted(() => {
  // fethMajor();
  if (route.params.postId) {
    postId.value = route.params.postId;
  }
  if (route.params.action) {
    action.value = route.params.action;
  }
  if (postId.value && action.value == "edit") {
    fethData();
    // console.log("get postId ", postId.value);
  }
  console.log("get postId ", postId.value);
  console.log("get Action ", action.value);
});

const fethData = async () => {
  loading.value = true;
  const respone = await detailPost(postId.value);
  loading.value = false;
  console.log("fethData", respone);
  if (respone) {
    entityItem.value = respone.entity;
  }
};

const onSubmit = async () => {
  entityItem.value.imageNameList = await uploadMulipleFile();
  if (imageFile.value) {
    const fileNameResponse = await uploadImageApi(imageFile.value);
    console.log("uploadImageApi", fileNameResponse);
    if (fileNameResponse && fileNameResponse.imageName) {
      entityItem.value.img_name = fileNameResponse.imageName;
      entityItem.value.haveNewImage = true;
    }
  }
  console.log("onSubmit", entityItem.value);
  // createProcess();
  if (action.value == "edit") {
    updateProcess();
  } else {
    createProcess();
  }
};

const uploadMulipleFile = async () => {
  return new Promise(async (resolve) => {
    let fileNameFromServer = [];
    if (imageFileList.value.length > 0) {
      for (const f of imageFileList.value) {
        const fileNameResponse = await uploadImageApi(f);
        console.log("uploadImageApi", fileNameResponse);
        if (fileNameResponse && fileNameResponse.imageName) {
          fileNameFromServer.push(fileNameResponse.imageName);
        }
      }
    }
    resolve(fileNameFromServer);
  });
};
const createProcess = async () => {
  const response = await addPost(entityItem.value);
  console.log("addPost", response);
  if (response) {
    $q.notify({
      message: "Success!",
      type: "positive",
    });
  }
  router.push("/");
};

const updateProcess = async () => {
  loading.value = true;
  const response = await updateTextPost(entityItem.value);
  console.log("updateTextPost", response);
  if (response) {
    $q.notify({
      message: response.message,
      type: "positive",
    });
  }
  loading.value = false;
  router.push("/");
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
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0.8;
<<<<<<< HEAD
  padding: 50px 50px 50px 50px;
=======
  height: 400px;
  padding: 20px 20px 20px 20px;
>>>>>>> f9cb14c265bac6ca220fb45adf52aeeb00017d8e
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  background: white;
}
</style>

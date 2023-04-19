<template>
  <q-page class="flex flex-center">
    <q-form @submit="onSubmit">
      <div class="container">
        <!-- ส่วนของหัวข้อ 'เพิ่มโพสต์ใหม่' -->
        <p style="font-size: 25px; font-weight: bolder; color: #1a237e">
          °˖ ✧◝ {{ t("AddPost") }} ◜✧˖ °
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

        <div class="q-pa-md" style="max-width: 800px">
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
              style="height: 35px; width: 50px"
              type="submit"
            />
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { biTranslate, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";
import { useQuasar } from "quasar";
import { useAxios } from "src/composables/useAxios";
import { PostApi } from "src/api/PostApi";
import { FileApi } from "src/api/FileApi";
import { useRoute, useRouter } from "vue-router";
// Add Post
const { addPost } = PostApi();
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

/* const onSubmit = async () => {
  // createProcess();
  // // entityItem.value.imageNameList = await uploadMulipleFile();
  // // if (imageFile.value) {
  // //   const fileNameResponse = await uploadImageApi(imageFile.value);
  // //   console.log("uploadImageApi", fileNameResponse);
  // //   if (fileNameResponse && fileNameResponse.imageName) {
  // //     entityItem.value.image_name = fileNameResponse.imageName;
  // //     entityItem.value.haveNewImage = true;
  // //   }
  // // }
  // console.log("onSubmit", entityItem.value);

  createProcess();
  console.log("onSubmit", entityItem.value);
  const response = await postMultipleUploadImage(
    titlePost.value,
    contentPost.value
  );
  console.log("response", response);
}; */

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
  createProcess();
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
  height: 400px;
  padding: 50px 50px 50px 50px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 10px;
  background: white;
}
</style>

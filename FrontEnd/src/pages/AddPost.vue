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
              <q-btn
                label="Delete Image"
                color="dark"
                icon="mdi-delete"
                class="q-mt-sm"
                @click="hideImage(postImg.id, index)"
              />
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
import { PostImgApi } from "src/api/PostImgApi";
import { useRoute, useRouter } from "vue-router";
// Add Post
const { addPost, detailPost, updateTextPost, postImgAddMore } = PostApi();
// File Upload
const { uploadImageApi } = FileApi();
// Post Img
const { delPostImg } = PostImgApi();

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
const myImage = ref("");
const entityItem = ref({
  id: null,
  user_id: "",
  title: "",
  content: "",
  haveNewImage: false,
  imageNameList: [],
});

const entityItemPostImg = ref({
  id: null,
  post_id: postId.value, // ให้กำหนดค่า post_id ด้วย postId.value ที่ถูกกำหนดไว้ก่อนหน้า
  // img_name: "",
  imageNameList: [],
});

// const entityItemPostImg = ref({
//   id: null,
//   post_id: "",
//   img_name: "",
//   haveNewImage: false,
// });

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

// const onSubmit = async () => {
//   entityItem.value.imageNameList = await uploadMulipleFile();
//   if (imageFile.value) {
//     const fileNameResponse = await uploadImageApi(imageFile.value);
//     console.log("uploadImageApi", fileNameResponse);
//     if (fileNameResponse && fileNameResponse.imageName) {
//       entityItem.value.img_name = fileNameResponse.imageName;
//       entityItem.value.haveNewImage = true;
//     }
//   }
//   console.log("onSubmit", entityItem.value);
//   // createProcess();
//   if (action.value == "edit") {
//     updateProcess();
//     createImgProcess();
//     deletePostImg();
//   } else {
//     createProcess();
//   }
// };

const onSubmit = async () => {
  if (route.params.action == "edit") {
    console.log("edit Action");
    entityItemPostImg.value.imageNameList = await uploadMulipleFile();
  } else {
    console.log("new Action");
    entityItem.value.imageNameList = await uploadMulipleFile();
  }

  if (imageFile.value) {
    const fileNameResponse = await uploadImageApi(imageFile.value);
    console.log("uploadImageApi", fileNameResponse);
    if (fileNameResponse && fileNameResponse.imageName) {
      if (route.params.action == "edit") {
        entityItemPostImg.value.img_name = fileNameResponse.imageName;
      } else {
        entityItem.value.img_name = fileNameResponse.imageName;
        entityItem.value.haveNewImage = true;
      }
    }
  }
  console.log("onSubmit", entityItem.value);
  // createProcess();
  if (action.value == "edit") {
    updateProcess();
    createImgProcess();
    for (let i = 0; i < entityItem.value.postImg.length; i++) {
      await deletePostImg(entityItem.value.postImg[i].postimg.id);
    }
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
      message: response.message,
      type: "positive",
    });
  }
  router.push("/");
};

const createImgProcess = async () => {
  const id = parseInt(postId.value); // แปลงค่า postId เป็นตัวเลข
  entityItemPostImg.value.post_id = id; // กำหนดค่า post_id ให้เป็นตัวเลข
  // ส่ง entityItemPostImg.value ไปที่ postImgAddMore ที่มีการเพิ่ม post_id เข้าไปใน body
  const response = await postImgAddMore(entityItemPostImg.value);
  // entityItemPostImg.value.post_id = postId.value;
  console.log("Post Id form addmore", postId.value);
  console.log("Post Id form item post_id", entityItemPostImg.value.post_id);
  console.log("postImgAddMore", response);
  if (response) {
    $q.notify({
      message: response.message,
      type: "positive",
    });
  }
  // router.push("/");
};

const updateProcess = async () => {
  loading.value = true;
  const response = await updateTextPost(entityItem.value);
  console.log("Post Id form update", postId.value);
  console.log("updateTextPost", response);
  if (response) {
    $q.notify({
      message: response.message,
      type: "positive",
    });
  }
  // loading.value = false;
  // router.push("/");
  router.push(`/postncomment/${postId.value}`);
};

function hideImage(id, index) {
  // myImage.value = "";
  $q.dialog({
    title: t("QdelPostImg"),
    message: t("QconPostImg"),
    cancel: true,
    ok: {
      label: t("Qok"),
      color: "negative",
    },
    cancel: {
      label: t("Qno"),
      flat: true,
      color: "grey",
    },
  }).onOk(() => {
    console.log("OK");
    $q.notify({
      message: "Success!",
      type: "positive",
    });
    entityItem.value.postImg.splice(index, 1);
    deletePostImg(id, index);
  });

  // const confirmed = window.confirm("คุณต้องการลบรูปภาพนี้ใช่หรือไม่?");
  // if (confirmed) {
  //   entityItem.value.postImg.splice(index, 1);
  //   deletePostImg(id, index);
  // }
}

// Del Post Img
// const deletePostImg = async (id, index) => {
//   // const item = entityItem.value[index];
//   const item = entityItem.value.postImg[index];
//   if (item) {
//     const response = await delPostImg(item.postimg.id);
//     console.log("delete Post Img", response);
//     console.log("Post Img Id", item.postimg.id);
//   }
// };
const deletePostImg = async (id) => {
  const response = await delPostImg(id);
  console.log("delete Post Img", response);
  console.log("Post Img Id", id);
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
  padding: 50px 50px 50px 50px;
  padding: 20px 20px 20px 20px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  background: white;
}
</style>

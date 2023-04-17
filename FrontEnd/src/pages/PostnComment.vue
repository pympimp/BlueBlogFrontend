<template>
  <q-page
    class="flex flex-center"
    style="display: flex; flex-direction: column"
  >
    <!-- Part Post -->
    <div class="container-post">
      <p
        style="
          font-size: 25px;
          font-weight: bolder;
          margin-top: 10px;
          color: #1a237e;
        "
      >
        <!-- {{ entityItem ? entityItem["id"] : "" }} -->
        <!-- {{ entityItem ? entityItem["user_id"] : "" }} -->
        {{ entityItem ? entityItem["title"] : "" }}
      </p>
      <Content style="color: #5c6bc0">
        {{ entityItem ? entityItem["content"] : "" }}
      </Content>

      <!-- ส่วนจัดการโพสต์ -->

      <div
        class="q-mt-md"
        style="position: absolute"
        v-if="
          (entityItem && entityItem.user_id === authenStore.auth.id) ||
          authenStore.auth.rolesText === 'Dev'
        "
      >
        <q-fab
          glossy
          v-model="fab2"
          label=""
          external-label
          vertical-actions-align="left"
          color="pink"
          icon="keyboard_arrow_down"
          direction="down"
          style="margin-left: 735px; transform: scale(0.8) translate(90%, -40%)"
        >
          <q-fab-action
            to="addpost"
            external-label
            color="pink-10"
            @click="onClick"
            icon="edit"
            :label="t('EditPost')"
            v-if="entityItem && entityItem.user_id === authenStore.auth.id"
          />
          <q-fab-action
            external-label
            color="pink-10"
            @click="onDeletePost(entityItem)"
            icon="delete"
            :label="t('DeletePost')"
            v-if="
              (entityItem && entityItem.user_id === authenStore.auth.id) ||
              authenStore.auth.rolesText === 'Dev'
            "
          />
        </q-fab>
      </div>

      <!-- ส่วนของรูปภาพของโพสต์ -->

      <template v-for="(postImg, index) in entityItem?.postImg" :key="index">
        <q-img :src="postImg.postimg.path" class="img"></q-img>
        <br />
      </template>

      <br />

      <div class="details-user">
        <ion-avatar class="profile" style="display: inline">
          <img
            :src="entityItem ? entityItem.picture.path : ''"
            style="width: 30px; height: 30px"
          />
        </ion-avatar>
        &nbsp;&nbsp;&nbsp;
        <b style="color: #1a237e">{{
          entityItem ? entityItem["username"] : ""
        }}</b>
        <i style="color: #5c6bc0"
          ><br />{{ entityItem ? entityItem["create_date"] : "" }}</i
        >

        <!-- ปุ่มไลก์โพส -->
        <div class="comment-like" style="display: flex; margin-left: 450px">
          <div style="display: inline">
            <q-btn
              class="likePost"
              style="
                background-color: #b46f8f;
                font-size: 15px;
                border-radius: 50px;
                border: none;
              "
            >
              <span id="icon"
                ><i
                  class="fa-regular fa-thumbs-up"
                  style="color: white; height: -20px; color: white"
                ></i>
              </span>
            </q-btn>
            &nbsp;
            <span
              id="count"
              style="display: inline; color: #b46f8f; text-weight: bolder"
              >{{ entityItem ? entityItem["like_count"] : "" }}
              {{ t("Like") }}</span
            >
          </div>

          <br />
        </div>
        <br />

        <!-- จำนวนยอดไลก์โพสต์ -->
        <b
          style="
            color: #b03367;
            margin-left: 10px;
            margin-top: 10px;
            font-size: 15px;
          "
        >
        </b>
      </div>
    </div>

    <!-- Part Add Comment -->
    <div class="container-add-comment">
      <q-form @submit="onSubmit">
        <!-- หัวข้อใหญ่ว่า "Add Comment" -->
        <p
          style="
            font-size: 25px;
            font-weight: bolder;
            margin-bottom: -10px;
            color: #b03367;
          "
        >
          {{ t("AddComment") }}
        </p>
        <br />
        <!-- ช่องจัดรูปแบบของการเขียนคอมเมนต์ -->
        <div class="q-pa-md q-gutter-sm">
          <q-editor
            v-model="entitycomment.content"
            min-height="5rem"
            style="width: 600px"
          />
        </div>

        <div style="display: flex">
          <!-- ปุ่มเลือกไฟล์ -->
          <q-file
            color="pink"
            v-model="imageFile"
            :label="t('ChooseFile')"
            borderless
            style="padding-right: 400px; text-decoration: none"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          <!-- ปุ่มโพสต์ -->
          <q-btn
            color="pink"
            glossy
            type="submit"
            :label="t('Submit')"
            style="height: 5px; margin-top: 15px"
          />
        </div>
      </q-form>
    </div>

    <!-- Part Comment All -->
    <div
      class="container-comment"
      v-for="(item, index) in entityItemComment"
      :key="index"
      :style="item.status === '0' ? 'background: white' : 'background: black'"
    >
      <div
        class="q-mt-md"
        style="position: absolute"
        v-if="
          item.userId === authenStore.auth.id ||
          (entityItem && entityItem.user_id === authenStore.auth.id) ||
          authenStore.auth.rolesText === 'Dev'
        "
      >
        <q-fab
          glossy
          v-model="fab2"
          label=""
          external-label
          vertical-actions-align="left"
          color="pink"
          icon="keyboard_arrow_down"
          direction="down"
          style="margin-left: 650px; transform: scale(0.6) translate(60%, -80%)"
        >
          <!-- Edit -->
          <q-fab-action
            to="addpost"
            external-label
            color="pink-10"
            @click="onClick"
            icon="edit"
            :label="t('EditComment')"
            v-if="item.userId === authenStore.auth.id"
          />
          <!-- Delete -->
          <q-fab-action
            external-label
            color="pink-10"
            @click="onDelete(index)"
            icon="delete"
            :label="t('DeleteComment')"
            v-if="
              item.userId === authenStore.auth.id ||
              authenStore.auth.rolesText === 'Dev'
            "
          />
          <!-- Hide -->
          <q-fab-action
            external-label
            color="pink-10"
            @click="onHide(index)"
            :icon="biEyeSlash"
            :label="t('HideComment')"
            v-if="
              entityItem &&
              entityItem.user_id === authenStore.auth.id &&
              item.status === '0'
            "
          />
          <!-- unhide -->
          <q-fab-action
            external-label
            color="pink-10"
            @click="onUnhide(index)"
            :icon="biEye"
            :label="t('UnHideComment')"
            v-if="
              entityItem &&
              entityItem.user_id === authenStore.auth.id &&
              item.status === '1'
            "
          />
        </q-fab>
      </div>
      <!-- หัวข้อคอมเมนต์ -->
      <div class="comment">
        <p
          style="
            font-size: 15px;
            font-weight: bolder;
            margin-top: 10px;
            color: #1a237e;
          "
        >
          <!-- ID : {{ item.commentId }} status: {{ item.status }}  -->
          ความคิดเห็นที่ {{ index + 1 }}
        </p>
        <!-- เนื้อหาคอมเมนต์ -->
        <Content
          style="margin-inline-end: auto; margin-left: 20px; color: #5c6bc0"
        >
          {{ item.content }}
        </Content>
        <br />
        <q-img
          class="img"
          :src="item.commentimg.path ? item.commentimg.path : ''"
          style="width: 200px; height: 200px"
        >
        </q-img>
        <br /><br />
        <!-- ปุ่มไลก์คอมเมนต์ -->
        <div class="comment-like2" style="display: flex">
          <div style="display: inline">
            <q-btn
              class="like__btn2"
              style="
                background-color: #b46f8f;
                font-size: 15px;
                border-radius: 50px;
                border: none;
              "
            >
              <span id="icon2"
                ><i
                  class="fa-regular fa-thumbs-up"
                  style="color: white; height: -20px; color: white"
                ></i>
              </span>
            </q-btn>
            &nbsp;
            <span
              id="count2"
              style="display: inline; color: #b46f8f; text-weight: bolder"
            >
              {{ item.like_count }}
            </span>
            <!-- จำนวนยอดไลก์โพสต์ -->
            <b
              style="
                color: #b46f8f;
                margin-left: 10px;
                margin-top: 10px;
                font-size: 15px;
              "
            >
              {{ t("Like") }}
            </b>
          </div>

          <!-- ข้อมูลผู้คอมเมนต์ -->
          <ion-avatar class="profile">
            <img
              :src="item.picture.path"
              style="width: 30px; height: 30px; margin-left: 369px"
            />
          </ion-avatar>
          <router-link :to="'/myprofile/' + item.userId">
            <b
              style="
                margin-top: -5px;
                margin-left: 10px;
                margin-right: -10px;
                color: #1a237e;
              "
              >{{ item.username }}
            </b>
          </router-link>
          <br />
          <i style="margin-top: 12px; margin-left: -60px; color: #5c6bc0">
            {{ item.create_date }}
          </i>

          <br />
        </div>
        <br />
      </div>
    </div>

    <!-- Part Comment Status 0 -->
    <div
      class="container-comment"
      v-for="(item, index) in entityItemCommentStatus"
      :key="index"
      :style="item.status === '0' ? 'background: white' : 'background: black'"
    >
      <div
        class="q-mt-md"
        style="position: absolute"
        v-if="
          item.userId === authenStore.auth.id ||
          (entityItem && entityItem.user_id === authenStore.auth.id) ||
          authenStore.auth.rolesText === 'Dev'
        "
      >
        <q-fab
          glossy
          v-model="fab2"
          label=""
          external-label
          vertical-actions-align="left"
          color="pink"
          icon="keyboard_arrow_down"
          direction="down"
          style="margin-left: 650px; transform: scale(0.6) translate(60%, -80%)"
        >
          <!-- Edit -->
          <q-fab-action
            to="addpost"
            external-label
            color="pink-10"
            @click="onClick"
            icon="edit"
            :label="t('EditComment')"
            v-if="item.userId === authenStore.auth.id"
          />
          <!-- Delete -->
          <q-fab-action
            external-label
            color="pink-10"
            @click="onDelete(index)"
            icon="delete"
            :label="t('DeleteComment')"
            v-if="
              item.userId === authenStore.auth.id ||
              authenStore.auth.rolesText === 'Dev'
            "
          />
          <!-- Hide -->
          <q-fab-action
            external-label
            color="pink-10"
            @click="onHide(index)"
            :icon="biEyeSlash"
            :label="t('HideComment')"
            v-if="
              entityItem &&
              entityItem.user_id === authenStore.auth.id &&
              item.status === '0'
            "
          />
          <!-- unhide -->
          <q-fab-action
            external-label
            color="pink-10"
            @click="onUnhide(index)"
            :icon="biEye"
            :label="t('UnHideComment')"
            v-if="
              entityItem &&
              entityItem.user_id === authenStore.auth.id &&
              item.status === '1'
            "
          />
        </q-fab>
      </div>
      <!-- หัวข้อคอมเมนต์ -->
      <div class="comment">
        <p
          style="
            font-size: 15px;
            font-weight: bolder;
            margin-top: 10px;
            color: #1a237e;
          "
        >
          <!-- ID : {{ item.commentId }} status: {{ item.status }}  -->
          ความคิดเห็นที่ {{ index + 1 }}
        </p>
        <!-- เนื้อหาคอมเมนต์ -->
        <Content
          style="margin-inline-end: auto; margin-left: 20px; color: #5c6bc0"
        >
          {{ item.content }}
        </Content>
        <br />
        <q-img
          class="img"
          :src="item.commentimg.path ? item.commentimg.path : ''"
          style="width: 200px; height: 200px"
        >
        </q-img>
        <br /><br />
        <!-- ปุ่มไลก์คอมเมนต์ -->
        <div class="comment-like2" style="display: flex">
          <div style="display: inline">
            <q-btn
              class="like__btn2"
              style="
                background-color: #b46f8f;
                font-size: 15px;
                border-radius: 50px;
                border: none;
              "
            >
              <span id="icon2"
                ><i
                  class="fa-regular fa-thumbs-up"
                  style="color: white; height: -20px; color: white"
                ></i>
              </span>
            </q-btn>
            &nbsp;
            <span
              id="count2"
              style="display: inline; color: #b46f8f; text-weight: bolder"
            >
              {{ item.like_count }}
            </span>
            <!-- จำนวนยอดไลก์โพสต์ -->
            <b
              style="
                color: #b46f8f;
                margin-left: 10px;
                margin-top: 10px;
                font-size: 15px;
              "
            >
              {{ t("Like") }}
            </b>
          </div>

          <!-- ข้อมูลผู้คอมเมนต์ -->
          <ion-avatar class="profile">
            <img
              :src="item.picture.path"
              style="width: 30px; height: 30px; margin-left: 369px"
            />
          </ion-avatar>
          <router-link :to="'/myprofile/' + item.userId">
            <b
              style="
                margin-top: -5px;
                margin-left: 10px;
                margin-right: -10px;
                color: #1a237e;
              "
              >{{ item.username }}
            </b>
          </router-link>
          <br />
          <i style="margin-top: 12px; margin-left: -60px; color: #5c6bc0">
            {{ item.create_date }}
          </i>

          <br />
        </div>
        <br />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// import icon bootstrap
import {
  biTranslate,
  biCheck,
  biEye,
  biEyeSlash,
} from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";
import { AuthenApi } from "src/api/AuthenApi";
import { useQuasar } from "quasar";

import { useAxios } from "src/composables/useAxios";
// เรียกใช้ Post API
import { PostApi } from "src/api/PostApi";
// เรียกใช้ Comment API
import { CommentApi } from "src/api/CommentApi";
import { FileApi } from "src/api/FileApi";

// เรียใช้ค่าการ login API KEY
import { useAuthenStore } from "src/stores/authen";
const authenStore = useAuthenStore();

const route = useRoute();
const router = useRouter();
const $q = useQuasar();

const likeBtn = document.querySelector(".like__btn");
let likeIcon = document.querySelector("#icon");
let count = document.querySelector("#count");
const likeBtn2 = document.querySelector(".like__btn2");
let likeIcon2 = document.querySelector("#icon2");
let count2 = document.querySelector("#count2");

//btn clicked test
let clicked = false;
let clicked2 = false;

// post id
const { detailPost, deletePost } = PostApi();
// comment
const {
  detailComment,
  addComment,
  deleteComment,
  detailCommentStatus,
  hideComment,
  unHideComment,
} = CommentApi();
// File Upload
const { uploadImageApi } = FileApi();
const postId = ref();
// Post
const entityItem = ref();
// ตัวแปรแสดงข้อมูลคอมเมนต์ทั้งหมด
const entityItemComment = ref([]);
// ตัวแปรแสดงข้อมูลคอมเมนต์ทั้งหมด status =0
const entityItemCommentStatus = ref([]);
// User Post
let userPostId = "";

// document.addEventListener("DOMContentLoaded", function () {
//   // ตรวจสอบว่า element ที่ต้องการมีอยู่จริงหรือไม่
//   const element = document.querySelector("#my-element");
//   if (element) {
//     // ใส่โค้ดที่ต้องการทำงานกับ element นี้ต่อไป
//     element.addEventListener("click", function () {
//       console.log("Element clicked!");
//     });
//   }
// });

// likeBtn.addEventListener("click", () => {
//   if (!clicked) {
//     clicked = true;
//     likeIcon.innerHTML = `<i class="fa-solid fa-thumbs-up" style="color: #ffffff;"></i>`;
//     count.textContent++;
//   } else {
//     clicked = false;
//     likeIcon.innerHTML = `<i class="fa-regular fa-thumbs-up" style="color: #ffffff;"></i>`;
//     count.textContent--;
//   }
// });

// likeBtn2.addEventListener("click", () => {
//   if (!clicked2) {
//     clicked2 = true;
//     likeIcon2.innerHTML = `<i class="fa-solid fa-thumbs-up" style="color: #ffffff;"></i>`;
//     count2.textContent++;
//   } else {
//     clicked2 = false;
//     likeIcon2.innerHTML = `<i class="fa-regular fa-thumbs-up" style="color: #ffffff;"></i>`;
//     count2.textContent--;
//   }
// });

// add comment
const content = ref("");
const imageFile = ref("");
const entitycomment = ref({
  id: null,
  post_id: "",
  user_id: "",
  content: "",
  img_name: "",
  create_date: "",
  update_date: "",
  status: "0",
});

const { localeList, t, locale } = useLang();

onMounted(() => {
  if (route.params.postId) {
    postId.value = route.params.postId;
    entitycomment.value.post_id = route.params.postId;
  }

  // Detail Post
  const fethData = async () => {
    const respone = await detailPost(postId.value);
    console.log("fethData", respone);
    if (respone) {
      entityItem.value = respone.entity;
      userPostId = entityItem.value.user_id;
      console.log("User Post ID", userPostId);
    }
  };

  // เรียกใช้งาน fethData ก่อน
  fethData().then(() => {
    // สามารถใช้งาน userPostId ได้ที่นี่หลังจาก fethData ได้รับค่าเรียบร้อยแล้ว
    console.log("User Post Then fetchData :", userPostId);

    // Check comment
    if (
      (postId.value && authenStore.auth.rolesText === "Dev") ||
      (postId.value && authenStore.auth.id === userPostId)
    ) {
      fethData();
      fethDataComment();
      console.log("Comment All");
      console.log("userPostID in Comment :", userPostId);
    } else {
      fethData();
      fethDataCommentStatus();
      console.log("Comment Status 0");
      console.log("userPostID in Comment :", userPostId);
    }
    console.log("get postId ", postId.value);
  });

  // Detail List Comment
  const fethDataComment = async () => {
    const respone = await detailComment(postId.value);
    console.log("fethDataComment", respone);
    if (respone) {
      entityItemComment.value = respone.entity;
    }
  };

  // Detail List Comment Status = 0
  const fethDataCommentStatus = async () => {
    const respone = await detailCommentStatus(postId.value);
    console.log("fethDataCommentStatus", respone);
    if (respone) {
      entityItemCommentStatus.value = respone.entity;
    }
  };
});

// Add Comment
const onSubmit = async () => {
  if (imageFile.value) {
    const fileNameResponse = await uploadImageApi(imageFile.value);
    console.log("uploadImageApi", fileNameResponse);
    if (fileNameResponse && fileNameResponse.imageName) {
      entitycomment.value.img_name = fileNameResponse.imageName;
      entitycomment.value.haveNewImage = true;
    }
  }
  console.log("onSubmit", entitycomment.value);
  if (entitycomment.value) {
    createProcess(entitycomment.value.post_id);
  }
};

// Function Add Comment
const createProcess = async (postId) => {
  const response = await addComment(postId, entitycomment.value);
  console.log("addComment", response);
  if (response) {
    $q.notify({
      message: "Success!",
      type: "positive",
    });
    // refresh page to display the latest data
    location.reload();
  }
  router.push(`/postncomment/${postId.value}`);
};

// Delete Comment
const onDelete = (index) => {
  $q.dialog({
    title: t("QdelComment"),
    message: t("QconComment"),
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
    deleteProcess(index);
  });
};

const deleteProcess = async (index) => {
  const item = entityItemComment.value[index];
  // console.log(entityItemComment.value[index]);
  if (item) {
    const respone = await deleteComment(item.commentId);
    console.log("deleteComment", respone);
    console.log(item.commentId);
    // refresh page to display the latest data
    location.reload();
    // refreshData();
  }
};

// const refreshData = () => {
//   entityItemComment.value = [];
//   fethDataComment();
// };

// Delete Post
const onDeletePost = (entityItem) => {
  $q.dialog({
    title: t("QdelPost"),
    message: t("QconPost"),
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
    console.log(entityItem);
    deleteProcessPost(entityItem);
  });
};

const deleteProcessPost = async (entityItem) => {
  const item = entityItem.id;
  console.log(entityItem.id);
  if (item) {
    const respone = await deletePost(item);
    console.log("deletePost", respone);
    console.log("postId", item);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    router.push("/");
  }
};

// Hide Comment
const onHide = (index) => {
  $q.dialog({
    title: t("QhideComment"),
    message: t("QconhideComment"),
    cancel: true,
    ok: {
      label: t("Qhide"),
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
    hideProcess(index);
  });
};

const hideProcess = async (index) => {
  const item = entityItemComment.value[index];
  // console.log(entityItemComment.value[index]);
  if (item) {
    const respone = await hideComment(item.commentId);
    console.log("hideComment", respone);
    console.log(item.commentId);
    // refresh page to display the latest data
    location.reload();
    // await refreshideData(); // เรียกใช้งานฟังก์ชัน refreshHideData() เพื่อดึงข้อมูลใหม่จากแหล่งข้อมูล
    // router.push(`/postncomment/${postId.value}`);
  }
};

// const refreshideData = async () => {
//   entityItemComment.value = []; // ล้างข้อมูลในตัวแปร entityItemComment
//   await fetchDataComment();
//   await fetchDataCommentStatus();
// };

// UnHide Comment
const onUnhide = (index) => {
  $q.dialog({
    title: t("QunhideComment"),
    message: t("QconunhideComment"),
    cancel: true,
    ok: {
      label: t("Qunhide"),
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
    unhideProcess(index);
  });
};

const unhideProcess = async (index) => {
  const item = entityItemComment.value[index];
  if (item) {
    const response = await unHideComment(item.commentId);
    console.log("unhideComment", response);
    console.log(item.commentId);
    location.reload();
    // await refresUnhideData(); // เรียกใช้งานฟังก์ชัน refreshHideData() เพื่อดึงข้อมูลใหม่จากแหล่งข้อมูล
    // router.push(`/postncomment/${postId.value}`);
  }
};

// const refresUnhideData = async () => {
//   entityItemComment.value = []; // ล้างข้อมูลในตัวแปร entityItemComment
//   await fetchDataComment();
//   await fetchDataCommentStatus();
// };

const text = ref("");
const third = ref(false);
const isPwd = ref(true);
const editor = ref("What you see is <b>what</b> you get.");
</script>

<style scoped>
.flex {
  background-color: #d6e3ea;
  background-image: url(./public/background.jpg);
  background-size: cover;
  width: 100%;
  height: auto;
}
.container-post {
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0.8;
  width: 900px;
  padding: 50px 50px 50px 50px;
  margin-top: 40px;
  margin-bottom: 30px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 10px;
  background: white;
}

.container-add-comment {
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0.8;
  width: 750px;
  padding: 50px 50px 50px 50px;
  margin-bottom: 30px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 10px;
  background: white;
}

.container-comment {
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0.8;
  width: 750px;
  padding: 50px 50px 50px 50px;
  margin-bottom: 30px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 10px;
}

/* Title หัวข้อโพสต์ */
p {
  display: flex;
  align-self: flex-start;
  margin-left: 15px;
}

/* content เนื้อหาของโพสต์ */
.flex .container-post content {
  display: flex;
  align-self: flex-start;
  margin-left: 30px;
}

/* ขนาดรูปภาพที่แนบ */
.flex .container-post .img {
  width: 250px;
  height: 250px;
}

/* set up รูปโปรไฟล์ */
.flex .container-post .profile {
  display: flex;
  align-self: flex-start;
  margin-left: 15px;
}

/* ข้อมูลผู้โพสต์ */
.flex .container-post .details-user {
  display: flex;
  align-self: flex-start;
  margin-left: 20px;
  margin-top: 10px;
}

/* ขยับวันเวลา */
.flex .container-post .details-user i {
  transform: translate(-40%, 0%);
}
/*
ขยับรูปโปรไฟล์ */
.flex .container-post .details-user .profile {
  transform: translate(0%, 7%);
}

/* ตกแต่งปุ่มไลก์โพสต์ */
.like__btn {
  padding: 10px 15px;
  background: #be6e8d;
  font-size: 18px;
  color: #d6e3ea;
  cursor: pointer;
}
</style>

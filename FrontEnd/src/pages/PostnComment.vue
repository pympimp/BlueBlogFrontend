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
              ref="followBtn"
              glossy
              push
              color="pink-9"
              :icon="LikePostIcon"
              @click="toggleLikePost(entityItem)"
              style="height: 20px; margin-top: 5px; width: 40px"
            />

            &nbsp;
            <span
              id="count"
              style="display: inline; color: #b46f8f; text-weight: bolder"
              >{{ entityLikePost ? entityLikePost["TotalLikePost"] : "" }}
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
            click=""
            :icon="biEyeSlash"
            :label="t('HideComment')"
            v-if="entityItem && entityItem.user_id === authenStore.auth.id"
          />
          <!-- unhide -->
          <q-fab-action
            external-label
            color="pink-10"
            click=""
            :icon="biEye"
            :label="t('UnHideComment')"
            v-if="entityItem && entityItem.user_id === authenStore.auth.id"
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
              ref="followBtn"
              glossy
              push
              color="pink-9"
              :icon="LikeCommentIcon"
              @click="toggleLikeComment(item.commentId, item.postId)"
              style="height: 20px; margin-top: 5px; width: 40px"
            />
            &nbsp;
            <span
              id="count2"
              style="display: inline; color: #b46f8f; text-weight: bolder"
            >
              {{
                entityLikeComment ? entityLikeComment["TotalLikeComment"] : ""
              }}
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
            click=""
            :icon="biEyeSlash"
            :label="t('HideComment')"
            v-if="entityItem && entityItem.user_id === authenStore.auth.id"
          />
          <!-- unhide -->
          <q-fab-action
            external-label
            color="pink-10"
            click=""
            :icon="biEye"
            :label="t('UnHideComment')"
            v-if="entityItem && entityItem.user_id === authenStore.auth.id"
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
              ref="followBtn"
              glossy
              push
              color="pink-9"
              :icon="(LikeCommentIcon = biHeart ? 'biHeartFill' : 'biHeart')"
              @click="toggleLikeComment"
              style="
                height: 20px;
                margin-top: 5px;
                width: 40px;
                border-radius: 70px;
              "
            />
            &nbsp;
            <span
              id="count2"
              style="display: inline; color: #b46f8f; text-weight: bolder"
            >
              {{
                entityLikeComment ? entityLikeComment["TotalLikeComment"] : ""
              }}
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
  biHeart,
  biHeartFill,
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

import { LikeApi } from "src/api/LikeApi";

// เรียใช้ค่าการ login API KEY
import { useAuthenStore } from "src/stores/authen";
const authenStore = useAuthenStore();

const {
  LikePost,
  UnlikePost,
  LikeComment,
  UnlikeComment,
  CheckLikePost,
  CheckLikeComment,
  ListLikePost,
  CountPost,
  CountComment,
} = LikeApi();
const route = useRoute();
const router = useRouter();
const $q = useQuasar();

// post id
const { detailPost, deletePost } = PostApi();
// comment
const { detailComment, addComment, deleteComment, detailCommentStatus } =
  CommentApi();
// File Upload
const { uploadImageApi } = FileApi();
const postId = ref();
const commentId = ref([]);
// Post
const entityItem = ref();
// ตัวแปรแสดงข้อมูลคอมเมนต์ทั้งหมด
const entityItemComment = ref([]);
// ตัวแปรแสดงข้อมูลคอมเมนต์ทั้งหมด status =0
const entityItemCommentStatus = ref([]);

// User Post
let userPostId = "";

// add comment
const content = ref("");
const imageFile = ref("");
const entitycomment = ref({
  id: "",
  post_id: "",
  user_id: "",
  content: "",
  img_name: "",
  create_date: "",
  update_date: "",
  status: "0",
});

const id = ref();
const { localeList, t, locale } = useLang();

onMounted(() => {
  if (route.params.postId) {
    postId.value = route.params.postId;
    entitycomment.value.post_id = route.params.postId;
    commentId.value = route.params.commentId;
    id.value = route.params.user_id;
  }

  if (
    (postId.value && authenStore.auth.rolesText === "Dev") ||
    entityItemComment.value.userId === authenStore.auth.id
  ) {
    fethData();
    fethDataComment();
    CheckPost();
    CheckComment();
    fetchCountPost();
    fetchCountComment();
    console.log("Comment All");
  }

  if (postId.value) {
    fethData();
    fethDataComment();
    CheckPost();
    CheckComment();
    fetchCountPost();
    fetchCountComment();
  } else {
    fethData();
    fethDataCommentStatus();
    CheckPost();
    CheckComment();
    fetchCountPost();
    fetchCountComment();
    console.log("Comment Status 0");
  }
  console.log("get postId ", postId.value);
});
// Detail Post
const fethData = async () => {
  const respone = await detailPost(postId.value);
  console.log("fethData", respone);
  if (respone) {
    entityItem.value = respone.entity;
    CheckPost();
    CheckComment();
    fetchCountPost();
    fetchCountComment();
  }
};

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

//เป็นการประกาศค่าตั้งต้นของไอคอน Toggle
const LikePostIcon = ref("");
const LikeCommentIcon = ref("");

//ฟังก์ชั่นของการกดไลก์โพสต์
function toggleLikePost(entityItem) {
  if (LikePostIcon.value === biHeart) {
    LikePostBtn(entityItem);
    LikePostIcon.value = biHeartFill;
    // followColor.value = "secondary";
    // count.value += 1;
  } else {
    UnlikePostBtn(entityItem);
    LikePostIcon.value = biHeart;
    // followColor.value = "primary";
    // count.value -= 1;
  }
}

//ฟังก์ชั่นของการกดไลก์คอมเมนต์
function toggleLikeComment(id, id1) {
  if (LikeCommentIcon.value === biHeart) {
    LikeCommentBtn(id, id1);
    LikeCommentIcon.value = biHeartFill;
    // followColor.value = "secondary";
    // count.value += 1;
  } else {
    UnlikeCommentBtn(id, id1);
    LikeCommentIcon.value = biHeart;
    // followColor.value = "primary";
    // count.value -= 1;
  }
}

const entityLikePost = ref();
const entityLikeComment = ref();
const entityLike = ref();
//ฟังก์ชั่นของการเช็คว่ามีการกดไลก์ไหม
const CheckPost = async () => {
  const response = await CheckLikePost(postId.value);
  if (response) {
    entityLikePost.value = response;
    console.log("Check Like Post", entityLikePost);
  }
  if (entityLikePost.value.status === true) {
    console.log("Like Post Status :", entityLikePost.value.status);
    LikePostIcon.value = biHeartFill;
  } else {
    console.log("Unlike Post Status :", entityLikePost);
    LikePostIcon.value = biHeart;
  }
};

const CheckComment = async () => {
  const response = await CheckLikeComment(commentId.value);
  if (response) {
    entityLikeComment.value = response;
    console.log("Check Like Comment", entityLikeComment);
  }
  if (entityLikeComment.value.status === true) {
    console.log("Like Comment Status :", entityLikeComment.value.status);
    LikeCommentIcon.value = biHeartFill;
  } else {
    console.log("Unlike Comment Status :", entityLikeComment.value.status);
    LikeCommentIcon.value = biHeart;
  }
};

//ฟังก์ชั่นของการนับยอดไลก์โพสต์
const fetchCountPost = async () => {
  const response = await CountPost(postId.value);
  console.log("CountPost", response);
  if (response) {
    // entityLike.value = response.entity;
    entityLikePost.value = response;
  }
  console.log("TTTTTTTTTTTTTTTT", entityLikePost.value.TotalLikePost);
};

//ฟังก์ชั่นของการนับยอดไลก์คอมเมนต์
const fetchCountComment = async () => {
  const response = await CountComment(commentId.value);
  console.log("CountComment", response);
  if (response) {
    // entityLike.value = response.entity;
    entityLikeComment.value = response;
  }
  console.log("GGGGGGG", entityLikeComment.value.TotalLikeComment);
};

//ฟังก์ชั่นกดไลก์โพสต์
const LikePostBtn = async (entityItem) => {
  const $item = entityItem.id;
  if ($item) {
    const response = await LikePost($item);
    if (response) {
      console.log(entityItem.id);
      console.log("Like", response.message);
      fetchCountPost();
    }
  }
};

//ฟังก์ชั่นกดยกเลิกไลก์โพสต์
const UnlikePostBtn = async (entityItem) => {
  const $item = entityItem.id;
  if ($item) {
    const response = await UnlikePost($item);
    if (response) {
      console.log("Unlike", response.message);
      fetchCountPost();
    }
  }
};

//ฟังก์ชั่นกดไลก์คอมเมนต์
const LikeCommentBtn = async (id, id1) => {
  const $id = id;
  const $id1 = id1;
  if ($id && $id1) {
    const response = await LikeComment($id, $id1);
    if (response) {
      console.log("LikeComment", response.message);
      fetchCountComment();
    }
  }
};

//ฟังก์ชั่นกดยกเลิกไลก์คอมเมนต์
const UnlikeCommentBtn = async (id, id1) => {
  const $id = id;
  const $id1 = id1;
  if ($id && $id1) {
    const response = await UnlikeComment($id, $id1);
    if (response) {
      console.log("UnlikeComment", response.message);
      fetchCountComment();
    }
  }
};

//ฟังก์ชั่นลิสต์รายชื่อคนที่ถูกใจโพสต์, คอมเมนต์
// const ListLike = async () => {
//   const response = await ListLikePost(id.value);
//   if (response) {
//     console.log("ListLikePost", response.message);
//   }
// };

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

const refreshUnHideData = async () => {
  await fetchDataComment();
  await fetchDataCommentStatus();
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

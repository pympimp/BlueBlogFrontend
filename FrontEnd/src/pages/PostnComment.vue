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
        {{ entityItem ? entityItem["title"] : "" }}
      </p>
      <Content style="color: #5c6bc0">
        {{ entityItem ? entityItem["content"] : "" }}
      </Content>

      <!-- ส่วนจัดการโพสต์ -->

      <div class="q-mt-md" style="position: absolute">
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
          />
          <q-fab-action
            external-label
            color="pink-10"
            @click="onClick"
            icon="delete"
            :label="t('DeletePost')"
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
        <q-btn
          round
          color="pink"
          glossy
          icon="fa-solid fa-heart"
          style="margin-left: 420px"
        />
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
          {{ entityItem ? entityItem["like_count"] : "" }} {{ t("Like") }}</b
        >
      </div>
    </div>

    <!-- Part Add Comment -->
    <div class="container-add-comment">
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
        <q-editor :v-model="editor" min-height="5rem" style="width: 600px" />
      </div>

      <div style="display: flex">
        <!-- ปุ่มเลือกไฟล์ -->
        <q-file
          color="pink"
          v-model="model"
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
          :label="t('Submit')"
          style="height: 5px; margin-top: 15px"
        />
      </div>
    </div>

    <!-- Part Comment -->
    <div class="container-comment">
      <div class="q-mt-md" style="position: absolute">
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
          <q-fab-action
            to="addpost"
            external-label
            color="pink-10"
            @click="onClick"
            icon="edit"
            :label="t('EditPost')"
          />
          <q-fab-action
            external-label
            color="pink-10"
            @click="onClick"
            icon="delete"
            :label="t('DeletePost')"
          />
        </q-fab>
      </div>
      <!-- หัวข้อคอมเมนต์ -->
      <div
        class="comment"
        v-for="(item, index) in entityItemComment"
        :key="index"
      >
        <p
          style="
            font-size: 15px;
            font-weight: bolder;
            margin-top: 10px;
            color: #1a237e;
          "
        >
          ความคิดเห็นที่ {{ item.commentId }}
        </p>
        <!-- เนื้อหาคอมเมนต์ -->
        <Content
          style="margin-inline-end: auto; margin-left: 20px; color: #5c6bc0"
        >
          {{ item.content }}</Content
        >
        <br />
        <q-img
          class="img"
          :src="item.commentimg.path ? item.commentimg.path : ''"
        >
        </q-img>
        <br />
        <!-- ปุ่มไลก์คอมเมนต์ -->
        <div class="comment-like" style="display: flex">
          <q-btn
            style="
              margin-left: -40px;
              padding-top: 7px;
              font-size: 10px;
              width: 10px;
              height: 10px;
              display: inline;
            "
            round
            color="pink"
            glossy
            icon="fa-solid fa-heart"
          />

          <!-- จำนวนยอดไลก์คอมเมนต์ -->
          <b
            style="
              display: inline;
              color: #b03367;
              font-size: 15px;
              margin-left: 5px;
              margin-right: 350px;
              margin-top: 4px;
            "
          >
            {{ item.like_count }} {{ t("Like") }}</b
          >

          <!-- ข้อมูลผู้คอมเมนต์ -->
          <ion-avatar class="profile" style="display: inline">
            <img :src="item.picture.path" style="width: 30px; height: 30px" />
          </ion-avatar>
          <b
            style="
              margin-top: -5px;
              margin-left: 10px;
              margin-right: -10px;
              color: #1a237e;
            "
            >{{ item.username }}</b
          >
          <br />
          <i style="margin-top: 12px; margin-left: -60px; color: #5c6bc0">{{
            item.create_date
          }}</i>
        </div>
        <br />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { biTranslate, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";
import { AuthenApi } from "src/api/AuthenApi";

import { useAxios } from "src/composables/useAxios";
// เรียกใช้ Post API
import { PostApi } from "src/api/PostApi";
// เรียกใช้ Comment API
import { CommentApi } from "src/api/CommentApi";

const likeBtn = document.querySelector(".like__btn");
let likeIcon = document.querySelector("#icon");
let count = document.querySelector("#count");
const likeBtn2 = document.querySelector(".like__btn2");
let likeIcon2 = document.querySelector("#icon2");
let count2 = document.querySelector("#count2");

//btn clicked test
let clicked = false;
let clicked2 = false;

const route = useRoute();

// post id
const { detailPost } = PostApi();
// comment
const { detailComment } = CommentApi();
const postId = ref();
// Post
const entityItem = ref();
// ตัวแปรแสดงข้อมูลคอมเมนต์
const entityItemComment = ref([]);

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

const { localeList, t, locale } = useLang();
const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

onMounted(() => {
  if (route.params.postId) {
    postId.value = route.params.postId;
  }

  if (postId.value) {
    fethData();
    fethDataComment();
  }
  console.log("get postId ", postId.value);
});

const fethData = async () => {
  const respone = await detailPost(postId.value);
  console.log("fethData", respone);
  if (respone) {
    entityItem.value = respone.entity;
  }
};

const fethDataComment = async () => {
  const respone = await detailComment(postId.value);
  console.log("fethDataComment", respone);
  if (respone) {
    entityItemComment.value = respone.entity;
  }
};

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
  background: white;
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

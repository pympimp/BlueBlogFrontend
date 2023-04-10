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
        ทำไมนรกต้องใช้กระทะทองแดง
      </p>
      <Content style="color: #5c6bc0">
        ทำไมนรกต้องใช้กระทะทองแดง ทำไมไม่ใช้กระทะเงิน
        ซึ่งนำความร้อนได้ดีกว่า</Content
      >

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
      <q-img src="/public/img.png" class="img"></q-img> <br />

      <div class="details-user">
        <ion-avatar class="profile" style="display: inline">
          <img src="/public/pf1.png" style="width: 30px; height: 30px" />
        </ion-avatar>
        &nbsp;&nbsp;&nbsp;
        <b style="color: #1a237e">User00001</b>
        <i style="color: #5c6bc0"><br />วันเสาร์ 3 มีนาคม 2566 15:30</i>

        <!-- ปุ่มไลก์โพส -->
        <div class="comment-like" style="display: flex; margin-left: 450px">
          <div style="display: inline">
            <q-btn
              class="like__btn"
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
              >0</span
            >
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

          <br />
        </div>
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
        <q-editor
          :v-model="editor"
          min-height="5rem"
          style="width: 600px"
          :model-value="null"
        />
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
      <p
        style="
          font-size: 15px;
          font-weight: bolder;
          margin-top: 10px;
          color: #1a237e;
        "
      >
        ความคิดเห็นที่ 1
      </p>
      <!-- เนื้อหาคอมเมนต์ -->
      <Content
        style="margin-inline-end: auto; margin-left: 20px; color: #5c6bc0"
      >
        ด้วยราคาของเงินที่สูงกว่าทองแดงมาก แต่สมบัติการนำความร้อนไม่ต่างกันมาก
        การเลือกทองแดงเป็นกระทะจึงเป็นทางเลือกที่ดีกว่าเนื่องจากประหยัดกว่า</Content
      >
      <br />

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
            >0</span
          >
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
            src="/public/pf2.png"
            style="width: 30px; height: 30px; margin-left: 369px"
          />
        </ion-avatar>
        <b
          style="
            margin-top: -5px;
            margin-left: 10px;
            margin-right: -10px;
            color: #1a237e;
          "
          >User00002</b
        >
        <br />
        <i style="margin-top: 12px; margin-left: -60px; color: #5c6bc0"
          >อาทิตย์ 4 มีนาคม 2566 10:12</i
        >

        <br />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { biTranslate, biCheck } from "@quasar/extras/bootstrap-icons";
import { useLang } from "src/composables/useLang";
import { AuthenApi } from "src/api/AuthenApi";
import { PostApi } from "src/api/PostApi";

const likeBtn = document.querySelector(".like__btn");
let likeIcon = document.querySelector("#icon");
let count = document.querySelector("#count");
const likeBtn2 = document.querySelector(".like__btn2");
let likeIcon2 = document.querySelector("#icon2");
let count2 = document.querySelector("#count2");

//btn clicked
let clicked = false;
let clicked2 = false;

likeBtn.addEventListener("click", () => {
  if (!clicked) {
    clicked = true;
    likeIcon.innerHTML = `<i class="fa-solid fa-thumbs-up" style="color: #ffffff;"></i>`;
    count.textContent++;
  } else {
    clicked = false;
    likeIcon.innerHTML = `<i class="fa-regular fa-thumbs-up" style="color: #ffffff;"></i>`;
    count.textContent--;
  }
});

likeBtn2.addEventListener("click", () => {
  if (!clicked2) {
    clicked2 = true;
    likeIcon2.innerHTML = `<i class="fa-solid fa-thumbs-up" style="color: #ffffff;"></i>`;
    count2.textContent++;
  } else {
    clicked2 = false;
    likeIcon2.innerHTML = `<i class="fa-regular fa-thumbs-up" style="color: #ffffff;"></i>`;
    count2.textContent--;
  }
});

const { localeList, t, locale } = useLang();
const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

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

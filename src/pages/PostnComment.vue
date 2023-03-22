<template>
  <q-page class="flex flex-center">
    <!-- Part Post -->
    <div class="container-post">
      <p style="font-size: 25px; font-weight: bolder; margin-top: 10px">
        ทำไมนรกต้องใช้กระทะทองแดง
      </p>
      <Content
        >ทำไมนรกต้องใช้กระทะทองแดง ทำไมไม่ใช้กระทะเงิน
        ซึ่งนำความร้อนได้ดีกว่า</Content
      >

      <q-img src="/public/img.png" class="img"></q-img> <br />

      <div class="details-user">
        <ion-avatar class="profile" style="display: inline">
          <img src="/public/pf1.png" style="width: 30px; height: 30px" />
        </ion-avatar>
        &nbsp;&nbsp;&nbsp;
        <b>User00001</b>
        <i><br />Saturday 3 March 2023 15:30</i>
        <q-btn
          round
          color="pink"
          glossy
          icon="fa-solid fa-heart"
          style="margin-left: 420px"
        />
        <br />
        <b
          style="
            color: #b03367;
            margin-left: 10px;
            margin-top: 10px;
            font-size: 15px;
          "
        >
          24k Likes</b
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
        Add Comment
      </p>
      <!-- ช่องจัดรูปแบบของการเขียนคอมเมนต์ -->
      <div class="q-pa-md q-gutter-sm">
        <q-editor :v-model="editor" min-height="5rem" style="width: 600px" />
      </div>

      <div style="display: flex">
        <!-- ปุ่มเลือกไฟล์ -->
        <q-file
          color="pink"
          v-model="model"
          label="Choose Image"
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
          label="Submit"
          style="height: 5px; margin-top: 15px"
        />
      </div>
    </div>

    <!-- Part Comment -->
    <div class="container-comment"></div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default {
  name: "PostnComment ",
  setup() {
    return {
      editor: ref("What you see is <b>what</b> you get."),
    };
  },
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
  width: 1000px;
  height: 150px;
  padding: 50px 50px 50px 50px;
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

/* .flex .container-add-comment{
  wid
} */
</style>

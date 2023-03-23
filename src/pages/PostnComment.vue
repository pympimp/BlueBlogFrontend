<template>
  <q-page
    class="flex flex-center"
    style="display: flex; flex-direction: column"
  >
    <!-- Part Post -->
    <div class="container-post">
      <p style="font-size: 25px; font-weight: bolder; margin-top: 10px">
        ทำไมนรกต้องใช้กระทะทองแดง
      </p>
      <Content>
        ทำไมนรกต้องใช้กระทะทองแดง ทำไมไม่ใช้กระทะเงิน
        ซึ่งนำความร้อนได้ดีกว่า</Content
      >
      <div class="q-mt-md" style="position: absolute">
        <q-fab
          glossy
          v-model="fab2"
          label="จัดการเพิ่มเติม"
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
            label="แก้ไขโพสต์"
          />
          <q-fab-action
            external-label
            color="pink-10"
            @click="onClick"
            icon="delete"
            label="ลบโพสต์"
          />
        </q-fab>
      </div>
      <q-img src="/public/img.png" class="img"></q-img> <br />

      <div class="details-user">
        <ion-avatar class="profile" style="display: inline">
          <img src="/public/pf1.png" style="width: 30px; height: 30px" />
        </ion-avatar>
        &nbsp;&nbsp;&nbsp;
        <b>User00001</b>
        <i><br />วันเสาร์ 3 มีนาคม 2566 15:30</i>
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
          24k ถูกใจ</b
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
        แสดงความคิดเห็น
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
          label="เลือกไฟล์รูปภาพ"
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
          label="ยืนยัน"
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
          label="จัดการเพิ่มเติม"
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
            label="แก้ไขโพสต์"
          />
          <q-fab-action
            external-label
            color="pink-10"
            @click="onClick"
            icon="delete"
            label="ลบโพสต์"
          />
        </q-fab>
      </div>
      <!-- หัวข้อคอมเมนต์ -->
      <p style="font-size: 15px; font-weight: bolder; margin-top: 10px">
        ความคิดเห็นที่ 1
      </p>
      <!-- เนื้อหาคอมเมนต์ -->
      <Content style="margin-inline-end: auto; margin-left: 20px">
        ด้วยราคาของเงินที่สูงกว่าทองแดงมาก แต่สมบัติการนำความร้อนไม่ต่างกันมาก
        การเลือกทองแดงเป็นกระทะจึงเป็นทางเลือกที่ดีกว่าเนื่องจากประหยัดกว่า</Content
      >
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
          10 Likes</b
        >

        <!-- ข้อมูลผู้คอมเมนต์ -->
        <ion-avatar class="profile" style="display: inline">
          <img src="/public/pf2.png" style="width: 30px; height: 30px" />
        </ion-avatar>
        <b style="margin-top: -5px; margin-left: 10px; margin-right: -10px"
          >User00002</b
        >
        <br />
        <i style="margin-top: 12px; margin-left: -60px"
          >อาทิตย์ 4 มีนาคม 2566 10:12</i
        >

        <br />
      </div>
    </div>
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

/* .flex .container-add-comment{
  wid
} */
</style>

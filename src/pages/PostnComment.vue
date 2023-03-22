<template>
  <q-page class="flex flex-center">
    <div class="container-post">
      <p style="font-size: 25px; font-weight: bolder; margin-right: 850px">
        ทำไมนรกต้องใช้กระทะทองแดง
      </p>
      <Content
        >ทำไมนรกต้องใช้กระทะทองแดง ทำไมไม่ใช้กระทะเงิน
        ซึ่งนำความร้อนได้ดีกว่า</Content
      ><br />

      <q-img src="/public/img.png" class="img"></q-img> <br />

      <div class="details-user">
        <ion-avatar class="profile" style="display: inline">
          <img src="/public/pf1.png" style="width: 30px; height: 30px" />
        </ion-avatar>
        &nbsp;&nbsp;&nbsp;
        <b>User00001</b>
        <i><br />3 March 2023</i>
      </div>
    </div>
    <div class="container-add-comment"></div>
    <div class="container-comment"></div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PostnComment ",

  // submitPost() {
  //   alert("Success!");
  // },
});
</script>

<style scoped>
.flex {
  background-color: #d6e3ea;
  background-image: url(./public/background.jpg);
  background-size: cover;
  opacity: 0.9;
  width: 100%;
  height: auto;
}
.container-post {
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0.7;
  width: 1250px;
  height: 500px;
  padding: 50px 50px 50px 50px;
  margin-top: 40px;
  margin-bottom: 15px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 10px;
  background: white;
}

.container-add-comment {
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0.7;
  width: 1200px;
  height: 150px;
  padding: 50px 50px 50px 50px;
  margin-bottom: 15px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 10px;
  background: white;
}

.container-comment {
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0.7;
  width: 1200px;
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

.flex .container-post .img {
  width: 300px;
  height: 300px;
}
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
  transform: translate(-83%, -8%);
}

.flex .container-post .details-user .profile {
  transform: translate(0%, 7%);
}
</style>

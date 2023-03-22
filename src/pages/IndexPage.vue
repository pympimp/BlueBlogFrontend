<template>
  <q-page class="flex flex-center">
    <div class="container">
      <div class="q-pa-md">
        <p style="font-size: 30px; display: inline">หน้าหลัก</p>
        <q-btn-dropdown
          split
          color="blue-10"
          rounded
          label="คัดกรองโพสต์"
          style="display: inline; margin-bottom: 20px; margin-left: 680px"
        >
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>โพสต์เก่า - ใหม่</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>โพสต์ใหม่ - เก่า</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>ความนิยมน้อย - มาก</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>ความนิยมมาก - น้อย</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <section class="post">
          <router-link
            to="/postncomment"
            style="text-decoration: none; color: black; font-weight: bolder"
            >? ทำไมนรกต้องใช้กระทะทองแดง</router-link
          >
          <br />
          <Content
            >ทำไมนรกต้องใช้กระทะทองแดง ทำไมไม่ใช้กระทะเงิน
            ซึ่งนำความร้อนได้ดีกว่า</Content
          ><br />
          <ion-avatar>
            <img src="/public/pf1.png" style="width: 30px; height: 30px" />
          </ion-avatar>
          &nbsp;
          <p style="display: inline">User00001</p>
          &nbsp;
          <p style="display: inline">3 March 2023</p>
          <hr style="width: 900px" />
        </section>

        <!-- ----------------------------------------------------------------------------------------------------------- -->

        <section class="post">
          <router-link
            to="/postncomment"
            style="text-decoration: none; color: black; font-weight: bolder"
            >? ต้นมะนาวบนหลุมศพหมาที่โดนงูเห่ากัด</router-link
          >
          <br />
          <Content
            >ปลูกต้นมะนาวไว้บนหลุมศพหมาที่โดนงูเห่ากัด กินได้ไหมคะ
            มีอันตรายจากพิษงูไหม</Content
          ><br />
          <ion-avatar>
            <img src="/public/pf2.png" style="width: 30px; height: 30px" />
          </ion-avatar>
          &nbsp;
          <p style="display: inline">User00002</p>
          &nbsp;
          <p style="display: inline">9 May 2023</p>
          <hr style="width: 900px" />
        </section>

        <!-- ----------------------------------------------------------------------------------------------------------- -->

        <section class="post">
          <router-link
            to="/postncomment"
            class="post"
            style="text-decoration: none; color: black; font-weight: bolder"
            >?
            พ่อขุนรามนี่ถือว่าได้เป็นอัจฉริยะทางภาษาหรือเปล่าครับ</router-link
          >
          <br />
          <Content
            >หลักการสร้างตัวอักษรและการสะกดคำ ท่านได้แนวคิดมาจากไหน
            มีเหตุจำเป็นอะไรที่ต้องสร้างอักษรไทย</Content
          ><br />
          <ion-avatar>
            <img src="/public/pf3.png" style="width: 30px; height: 30px" />
          </ion-avatar>
          &nbsp;
          <p style="display: inline">User00003</p>
          &nbsp;
          <p style="display: inline">17 August 2023</p>
          <hr style="width: 900px" />
        </section>

        <!-- ----------------------------------------------------------------------------------------------------------- -->
        <section class="post">
          <router-link
            to="/postncomment"
            style="text-decoration: none; color: black; font-weight: bolder"
            >แบ่งปัน 7 ไอเทมเด็ดที่ควรมีติดกระเป๋า!</router-link
          >
          <br />
          <Content
            >สวัสดีชาวบลูทุกท่านค่ะ
            วันนี้เราจะมาแบ่งปันไอเทมที่มีติดกระเป๋าแล้วชีวิตง่ายขึ้นแบบ
            200%</Content
          ><br />
          <ion-avatar>
            <img src="/public/pf4.png" style="width: 30px; height: 30px" />
          </ion-avatar>
          &nbsp;
          <p style="display: inline">User00004</p>
          &nbsp;
          <p style="display: inline">24 December 2023</p>
        </section>

        <!-- ----------------------------------------------------------------------------------------------------------- -->
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>

<style scoped>
.flex {
  background-image: url(./public/background.jpg);
  background-size: cover;
  opacity: 0.9;
  width: 100%;
  height: auto;
}
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0.7;
  width: 1000px;
  height: 500px;
  padding: 50px 50px 50px 50px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 10px;
  background: white;
}
</style>

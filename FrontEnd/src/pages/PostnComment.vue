<template>
  <q-page
    class="background flex flex-center"
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
      <Content style="color: #5c6bc0" class="q-mb-md">
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
          label=""
          external-label
          vertical-actions-align="left"
          color="pink"
          icon="keyboard_arrow_down"
          direction="down"
          style="margin-left: 735px; transform: scale(0.8) translate(90%, -40%)"
        >
          <q-fab-action
            :to="`/addpost/edit/${entityItem.id}`"
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
      <!-- v-for="(postImg, index) in entityItem?.postImg" :key="index" -->

      <!-- <q-img
          :src="postImg.postimg.path"
          class="img q-mt-lg"
          style="border-radius: 20px"
        ></q-img> -->

      <div
        class=""
        style="width: 700px; height: 400px"
        v-if="entityItem?.postImg[0]"
      >
        <q-carousel
          swipeable
          animated
          v-model="slide"
          thumbnails
          infinite
          padding
          :fit="cover"
          style="border-radius: 20px"
        >
          <!-- :src="item.commentimg.path ? item.commentimg.path : ''" -->
          <q-carousel-slide
            :name="index"
            :img-src="postImg.postimg.path"
            v-for="(postImg, index) in entityItem?.postImg"
            :key="index"
            img-width="60"
            img-height="40"
          />
        </q-carousel>
      </div>

      <br />

      <!-- ข้อมูลของผู้โพสต์ -->
      <div class="details-user">
        <!-- Profile User Post -->
        <router-link
          :to="'/myprofile/' + (entityItem ? entityItem['user_id'] : '')"
        >
          <ion-avatar class="profile" style="display: inline">
            <img
              :src="entityItem ? entityItem.picture.path : ''"
              style="width: 30px; height: 30px"
            />
          </ion-avatar>
        </router-link>
        &nbsp;&nbsp;&nbsp;

        <div>
          <router-link
            :to="'/myprofile/' + (entityItem ? entityItem['user_id'] : '')"
          >
            <b style="color: #1a237e">{{
              entityItem ? entityItem["username"] : ""
            }}</b>
          </router-link>
          <i
            style="color: #5c6bc0"
            v-if="entityItem && entityItem.update_date == null"
            ><br />{{ t("CreatOn") }}
            {{ entityItem ? entityItem["create_date"] : "" }}</i
          >
          <i style="color: #5c6bc0" v-else
            ><br />{{ t("UpdateOn") }}
            {{ entityItem ? entityItem["update_date"] : "" }}</i
          >
        </div>

        <!-- ปุ่มไลก์โพส -->
        <div class="comment-like" style="display: flex; margin-left: 550px">
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
              @click="alertPost = true"
              style="
                display: inline;
                color: #b46f8f;
                text-weight: bolder;
                cursor: pointer;
              "
              >{{ entityLikePost ? entityLikePost["TotalLikePost"] : "" }}

              {{ t("Like") }}</span
            >
            <!-- Pop up รายชื่อคนกดถูกใจ -->
            <q-dialog v-model="alertPost">
              <q-card
                style="
                  max-height: 400px;
                  width: 300px;
                  border-radius: 20px;
                  padding: 10px 10px 10px 10px;
                "
              >
                <q-card-section>
                  <div
                    class="text-h6"
                    style="font-weight: bold; color: #1a237e"
                  >
                    {{ t("ListLikePost") }}
                  </div>
                </q-card-section>

                <q-card-section
                  class="q-pt-none text-red"
                  v-for="(item, index) in entityListLikePost"
                  :key="index"
                >
                  <div v-if="entityLikePost.TotalLikePost > 0">
                    <ion-avatar>
                      <img
                        :src="item.picture.path"
                        style="width: 30px; height: 30px"
                      />
                    </ion-avatar>
                    &nbsp;
                    <router-link
                      :to="'/myprofile/' + item.user_id"
                      style="text-decoration: none; color: #1d1917"
                    >
                      {{ item.username }}
                    </router-link>
                  </div>
                </q-card-section>
                <q-card-section
                  v-if="entityLikePost.TotalLikePost == 0"
                  class="q-pb-xl text-center"
                  style="color: #1a237e; font-size: large"
                >
                  <q-item-label> {{ t("NotFound") }}</q-item-label>
                </q-card-section>
                <!-- ปุ่มโอเคของ Dialog -->
              </q-card>
            </q-dialog>
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
          class="q-pt-md"
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
        <div class="q-pa-md justify-center" style="width: 680px">
          <q-input
            v-model="entityAdd.content"
            :label="t('ContentComment')"
            filled
            type="textarea"
          />
        </div>

        <div class="row q-mb-md">
          <div class="col">
            <!-- ปุ่มเลือกไฟล์ -->
            <q-file
              color="pink"
              v-model="imageFile"
              :label="t('ChooseFile')"
              borderless
              use-chips
              accept=".png, .jpg, .jpeg"
              style="padding-right: 300px; text-decoration: none"
              @change="previewImage"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>

          <div v-if="previewUrl">
            <img :src="previewUrl" alt="preview image" />
          </div>

          <div class="col flex justify-end">
            <!-- ปุ่มโพสต์ -->
            <q-btn
              color="pink"
              glossy
              type="submit"
              :label="t('Submit')"
              style="height: 5px; margin-top: 15px"
            />
          </div>
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
            external-label
            color="pink-10"
            @click="alertEdit(item.commentId)"
            icon="edit"
            :label="t('EditComment')"
            v-if="item.userId === authenStore.auth.id"
          />
          <!-- ส่วนของการ Pop up แจ้งเตือน -->
          <q-dialog v-model="alertEdit1">
            <q-card
              style="
                padding: 20px 20px 20px 20px;
                border-radius: 20px;
                height: 310px;
              "
            >
              <!-- หัวข้อใหญ่ว่า "Add Comment" -->
              <p
                class="q-mb-md"
                style="
                  font-size: 25px;
                  font-weight: bolder;
                  margin-bottom: -10px;
                  color: #b03367;
                "
              >
                {{ t("EditComment") }}
              </p>
              <div class="q-pa-md justify-center" style="width: 480px">
                <q-input
                  v-model="entitycomment.content"
                  :label="t('ContentComment')"
                  filled
                  type="textarea"
                />
              </div>

              <div class="row">
                <div class="col">
                  <!-- ปุ่มเลือกไฟล์ -->
                  <q-file
                    color="pink"
                    v-model="imageFile1"
                    :label="t('ChooseFile')"
                    borderless
                    use-chips
                    accept=".png, .jpg, .jpeg"
                    style="padding-right: 300px; text-decoration: none"
                  >
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                </div>

                <div class="col flex justify-end">
                  <!-- ปุ่มยืนยัน -->
                  <q-btn
                    color="pink"
                    glossy
                    push
                    type="submit"
                    @click="onSubmit('edit')"
                    :label="t('Submit')"
                    style="height: 15px; margin-top: 15px"
                  />
                </div>
              </div>
            </q-card>
          </q-dialog>

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

      <p
        style="
          font-size: 15px;
          font-weight: bolder;
          margin-top: 10px;
          color: #1a237e;
        "
      >
        <!-- ID : {{ item.commentId }} status: {{ item.status }}  -->
        {{ t("orderComment") }} {{ index + 1 }}
      </p>
      <!-- เนื้อหาคอมเมนต์ -->
      <Content
        style="margin-inline-end: auto; margin-left: 20px; color: #5c6bc0"
      >
        {{ item.content }}
      </Content>

      <!-- ส่วนของรูปภาพคอมเมนต์ -->
      <div class="row justify-center q-my-md">
        <p
          v-if="
            item.commentimg.path ==
            'http://localhost/php-rest-api/data/img/no_picture.jpg'
          "
        >
          <!-- no picture -->
        </p>
        <q-img
          class="q-mt-md"
          :src="item.commentimg.path ? item.commentimg.path : ''"
          style="width: 200px; height: 200px; border-radius: 15px"
          v-else
        >
        </q-img>
      </div>

      <!-- ปุ่มไลก์คอมเมนต์1 -->
      <div class="row details-user fit q-pa-md">
        <div class="col-8 row">
          <router-link
            :to="'/myprofile/' + (entityItem ? entityItem['user_id'] : '')"
          >
            <ion-avatar class="profile" style="display: inline">
              <img
                :src="entityItem ? entityItem.picture.path : ''"
                style="width: 30px; height: 30px"
              />
            </ion-avatar>
          </router-link>
          &nbsp;&nbsp;&nbsp;

          <div>
            <router-link
              :to="'/myprofile/' + (entityItem ? entityItem['user_id'] : '')"
            >
              <b style="color: #1a237e">{{
                entityItem ? entityItem["username"] : ""
              }}</b>
            </router-link>
            <i style="color: #5c6bc0"
              ><br />{{ entityItem ? entityItem["create_date"] : "" }}</i
            >
          </div>
        </div>

        <!-- ปุ่มไลก์โพส -->
        <div class="col row comment-like flex justify-end">
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
              @click="alertPost = true"
              style="
                display: inline;
                color: #b46f8f;
                text-weight: bolder;
                cursor: pointer;
              "
              >{{ entityLikePost ? entityLikePost["TotalLikePost"] : "" }}

              {{ t("Like") }}</span
            >
            <!-- Pop up รายชื่อคนกดถูกใจ -->
            <q-dialog v-model="alertPost">
              <q-card
                style="
                  max-height: 400px;
                  width: 300px;
                  border-radius: 20px;
                  padding: 10px 10px 10px 10px;
                "
              >
                <q-card-section>
                  <div
                    class="text-h6"
                    style="font-weight: bold; color: #1a237e"
                  >
                    {{ t("ListLikePost") }}
                  </div>
                </q-card-section>

                <q-card-section
                  class="q-pt-none text-red"
                  v-for="(item, index) in entityListLikePost"
                  :key="index"
                >
                  <div v-if="entityLikePost.TotalLikePost > 0">
                    <ion-avatar>
                      <img
                        :src="item.picture.path"
                        style="width: 30px; height: 30px"
                      />
                    </ion-avatar>
                    &nbsp;
                    <router-link
                      :to="'/myprofile/' + item.user_id"
                      style="text-decoration: none; color: #1d1917"
                    >
                      {{ item.username }}
                    </router-link>
                  </div>
                </q-card-section>
                <q-card-section
                  v-if="entityLikePost.TotalLikePost == 0"
                  class="q-pb-xl text-center"
                  style="color: #1a237e; font-size: large"
                >
                  <q-item-label> {{ t("NotFound") }}</q-item-label>
                </q-card-section>
                <!-- ปุ่มโอเคของ Dialog -->
              </q-card>
            </q-dialog>
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

    <br />

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
            external-label
            color="pink-10"
            @click="alertEdit(item.commentId)"
            icon="edit"
            :label="t('EditComment')"
            v-if="item.userId === authenStore.auth.id"
          />
          <!-- ส่วนของการ Pop up แจ้งเตือน -->
          <q-dialog v-model="alertEdit1">
            <q-card
              style="
                padding: 20px 20px 20px 20px;
                border-radius: 20px;
                height: 310px;
              "
            >
              <!-- หัวข้อใหญ่ว่า "Add Comment" -->
              <p
                class="q-mb-md"
                style="
                  font-size: 25px;
                  font-weight: bolder;
                  margin-bottom: -10px;
                  color: #b03367;
                "
              >
                {{ t("EditComment") }}
              </p>
              <div class="q-pa-md justify-center" style="width: 480px">
                <q-input
                  v-model="entitycomment.content"
                  :label="t('ContentComment')"
                  filled
                  type="textarea"
                />
              </div>

              <div class="row">
                <div class="col">
                  <!-- ปุ่มเลือกไฟล์ -->
                  <q-file
                    color="pink"
                    v-model="imageFile1"
                    :label="t('ChooseFile')"
                    borderless
                    use-chips
                    accept=".png, .jpg, .jpeg"
                    style="padding-right: 300px; text-decoration: none"
                  >
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                </div>

                <div class="col flex justify-end">
                  <!-- ปุ่มยืนยัน -->
                  <q-btn
                    color="pink"
                    glossy
                    push
                    type="submit"
                    @click="onSubmit('edit')"
                    :label="t('Submit')"
                    style="height: 15px; margin-top: 15px"
                  />
                </div>
              </div>
            </q-card>
          </q-dialog>

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
          {{ t("orderComment") }} {{ index + 1 }}
        </p>
        <!-- เนื้อหาคอมเมนต์ -->
        <Content
          style="margin-inline-end: auto; margin-left: 20px; color: #5c6bc0"
        >
          {{ item.content }}
        </Content>
        <br />
        <div class="row justify-center">
          <p
            v-if="
              item.commentimg.path ==
              'http://localhost/php-rest-api/data/img/no_picture.jpg'
            "
          >
            <!-- no picture -->
          </p>
          <q-img
            class="q-mt-md"
            :src="item.commentimg.path ? item.commentimg.path : ''"
            style="width: 200px; height: 200px; border-radius: 15px"
            v-else
          >
          </q-img>
        </div>
        <br /><br />
        <!-- ปุ่มไลก์คอมเมนต์0 -->
        <div class="comment-like2" style="display: flex">
          <div style="display: inline">
            <q-btn
              ref="followBtn"
              glossy
              push
              color="pink-9"
              :icon="
                item.check === true
                  ? (LikeCommentIcon = biHeartFill)
                  : (LikeCommentIcon = biHeart)
              "
              @click="
                toggleLikeComment(item.commentId, item.postId, item.check)
              "
              style="height: 20px; margin-top: 5px; width: 40px"
            />
            &nbsp;
            <span
              id="count2"
              @click="fethLikeComment(item.commentId)"
              style="display: inline; color: #b46f8f; cursor: pointer"
            >
              {{ item.CountLikeComment }}
            </span>
            <!-- Pop up รายชื่อคนกดถูกใจ -->
            <q-dialog v-model="alertComment">
              <q-card
                style="
                  max-height: 400px;
                  width: 300px;
                  border-radius: 20px;
                  padding: 10px 10px 10px 10px;
                "
              >
                <q-card-section>
                  <div
                    class="text-h6"
                    style="font-weight: bold; color: #1a237e"
                  >
                    {{ t("ListLikeComment") }}
                  </div>
                </q-card-section>

                <q-card-section
                  class="q-pt-none text-red"
                  v-for="(item, index) in entityListLikeComment"
                  :key="index"
                >
                  <div v-if="entityListLikeComment[0]">
                    <ion-avatar>
                      <img
                        :src="item.picture.path"
                        style="width: 30px; height: 30px"
                      />
                    </ion-avatar>
                    &nbsp;
                    <router-link
                      :to="'/myprofile/' + item.user_id"
                      style="text-decoration: none; color: #1d1917"
                    >
                      {{ item.username }}
                    </router-link>
                  </div>
                </q-card-section>
                <q-card-section
                  class="q-pb-xl text-center"
                  style="color: #1a237e; font-size: large"
                  v-if="!entityListLikeComment[0]"
                >
                  <q-item-label> {{ t("NotFound") }}</q-item-label>
                </q-card-section>
              </q-card>
            </q-dialog>
            <!-- จำนวนยอดไลก์คอมเมนต์0 -->
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
          <i
            style="margin-top: 12px; margin-left: -60px; color: #5c6bc0"
            v-if="item.update_date == null"
          >
            {{ t("CreatOn") }} {{ item.create_date }}
          </i>
          <i
            style="margin-top: 12px; margin-left: -60px; color: #5c6bc0"
            v-else
          >
            {{ t("UpdateOn") }} {{ item.update_date }}
          </i>

          <br />
        </div>
        <br />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// import icon bootstrap
import {
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

const alertPost = ref(false);
const alertComment = ref(false);

const {
  LikePost,
  UnlikePost,
  LikeComment,
  UnlikeComment,
  CheckLikePost,
  CheckLikeComment,
  ListLikePost,
  ListLikeComment,
  CountPost,
  CountComment,
} = LikeApi();
const { SingleComment, EditComment } = CommentApi();
const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const action = ref();

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
const commentId = ref([]);
// Post
const entityItem = ref();
// ตัวแปรแสดงข้อมูลคอมเมนต์ทั้งหมด
const entityItemComment = ref([]);
// ตัวแปรแสดงข้อมูลคอมเมนต์ทั้งหมด status =0
const entityItemCommentStatus = ref([]);

const slide = ref(0);

// User Post
let userPostId = "";

// add comment
const content = ref("");
const imageFile = ref("");
const imageFile1 = ref("");
const previewUrl = ref("");
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

// V-Model ที่สร้างขึ้นเพื่อไม่ให้เนื้อความคิดเห็นซ้ำกับกระบวนการเพิ่มคอมเมนต์
const entityAdd = ref({
  post_id: "",
  user_id: "",
  content: "",
  img_name: "",
  create_date: "",
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

  if (route.params.action) {
    action.value = route.params.action;
  }

  if (postId.value && action.value == "edit") {
    console.log("Edit Post");
  }

  // เรียกใช้งาน fethData ก่อน
  fethData().then(() => {
    // สามารถใช้งาน userPostId ได้ที่นี่หลังจาก fethData ได้รับค่าเรียบร้อยแล้ว
    console.log("User Post Then fetchData :", userPostId);
    if (
      (postId.value && authenStore.auth.rolesText === "Dev") ||
      userPostId === authenStore.auth.id
    ) {
      fethData();
      fethLikePost();
      fethDataComment();
      CheckPost();
      fetchCountPost();
      console.log("Comment All");
      console.log("userPostID in Comment :", userPostId);
    } else {
      fethData();
      fethLikePost();
      fethDataCommentStatus();
      // fethDataComment();
      CheckPost();
      fetchCountPost();
      console.log("Comment Status 0");
      console.log("userPostID in Comment :", userPostId);
    }
  });
  console.log("get postId ", postId.value);
});

// Detail Post
const fethData = async () => {
  const respone = await detailPost(postId.value);
  console.log("fethData", respone);
  if (respone) {
    entityItem.value = respone.entity;
    userPostId = entityItem.value.user_id;
    console.log("User Post ID", respone);
    CheckPost();
    fetchCountPost();
    fetchCountComment();
  }
};

const entityListLikePost = ref([]);
//ฟังก์ชั่นโชว์รายชื่อผู้กดไลก์โพสต์
const fethLikePost = async () => {
  const response = await ListLikePost(postId.value);
  console.log("Fetch Who Like Post", response);
  if (response) {
    entityListLikePost.value = response.dataList;
  }
};

const entityListLikeComment = ref([]);
//ฟังก์ชั่นโชว์รายชื่อผู้กดไลก์โพสต์
const fethLikeComment = async (commentId) => {
  const response = await ListLikeComment(commentId);
  console.log("Fetch Who Like Comment", response);
  if (response) {
    entityListLikeComment.value = response;
    if (entityListLikeComment.value) {
      alertComment.value = true;
      console.log("Fetch Who Like Comment", entityListLikeComment.value);
    }
  }
};

// Detail List Comment
//เริ่มจากการเรียกข้อมูลของคอมเมนต์ โดยส่ง postId เข้ามา ละเอาไปเก็บไว้ใน entityItemComment.value
const fethDataComment = async () => {
  const respone = await detailComment(postId.value);
  console.log("fethDataComment", respone);
  if (respone) {
    entityItemComment.value = respone.entity;
    entityCheckComment.value = respone.entity;
    CheckComment();
    fetchCountComment();
  }
};

// Detail List Comment Status = 0
const fethDataCommentStatus = async () => {
  const respone = await detailCommentStatus(postId.value);
  console.log("fethDataCommentStatus", respone);
  if (respone) {
    entityItemCommentStatus.value = respone.entity;
    entityCheckCommentStatus.value = respone.entity;
    CheckComment0();
    fetchCountCommentStatus();
  }
};

const previewImage = () => {
  if (imageFile.value) {
    previewUrl.value = URL.createObjectURL(imageFile.value);
  }
};

// Add Comment
const onSubmit = async (action) => {
  if (imageFile.value) {
    const fileNameResponse = await uploadImageApi(imageFile.value);
    console.log("uploadImageApi", fileNameResponse);
    if (fileNameResponse && fileNameResponse.imageName) {
      if (action === "edit") {
        entitycomment.value.img_name = fileNameResponse.imageName;
        entitycomment.value.haveNewImage = true;
      } else {
        entityAdd.value.img_name = fileNameResponse.imageName;
        entityAdd.value.haveNewImage = true;
      }
    }
  }
  if (imageFile1.value) {
    const fileNameResponse = await uploadImageApi(imageFile1.value);
    console.log("uploadImageApi", fileNameResponse);
    if (fileNameResponse && fileNameResponse.imageName) {
      if (action === "edit") {
        entitycomment.value.img_name = fileNameResponse.imageName;
        entitycomment.value.haveNewImage = true;
      } else {
        entityAdd.value.img_name = fileNameResponse.imageName;
        entityAdd.value.haveNewImage = true;
      }
    }
  }

  console.log("onSubmit", entitycomment.value);
  if (action === "edit") {
    editProcess();
  } else {
    createProcess(entitycomment.value.post_id);
  }
};

// Function Add Comment
const createProcess = async (postId) => {
  const response = await addComment(postId, entityAdd.value);
  console.log("addComment", response);
  if (response) {
    $q.notify({
      message: t("Success"),
      type: "positive",
    });
    // refresh page to display the latest data
    entityAdd.value.content = "";
    // fethDataComment();
    imageFile.value = "";
  }
  // router.push(`/postncomment/${postId.value}`);
  fethData();
  if (
    authenStore.auth.rolesText === "Dev" ||
    userPostId === authenStore.auth.id
  ) {
    fethDataComment();
  } else {
    fethDataCommentStatus();
  }
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
      message: t("Success"),
      type: "positive",
    });
    deleteProcess(index);
    console.log("comment index", index);
  });
};

//Delete Function
const deleteProcess = async (index) => {
  const item = entityItemComment.value[index];
  const itemStatus = entityItemCommentStatus.value[index];
  console.log("item", item);
  console.log("item status", item);
  if (item) {
    const respone = await deleteComment(item.commentId);
    console.log("deleteComment", respone);
    console.log(item.commentId);
    // refresh page to display the latest data
    // location.reload();
    // refreshData();
    if (
      authenStore.auth.rolesText === "Dev" ||
      userPostId === authenStore.auth.id
    ) {
      fethDataComment();
    } else {
      fethDataCommentStatus();
    }
  }

  if (itemStatus) {
    const respone = await deleteComment(itemStatus.commentId);
    console.log("deleteComment", respone);
    console.log(itemStatus.commentId);
    // refresh page to display the latest data
    // location.reload();
    // refreshData();
    if (
      authenStore.auth.rolesText === "Dev" ||
      userPostId === authenStore.auth.id
    ) {
      fethDataComment();
    } else {
      fethDataCommentStatus();
    }
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
      message: t("Success"),
      type: "positive",
    });
    console.log(entityItem);
    deleteProcessPost(entityItem);
  });
};

//Delete Post Function
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
function toggleLikeComment(id, id1, check) {
  if (check === false) {
    LikeCommentBtn(id, id1);
    console.log("Arrey", entityCheckComment.value);
    // LikeCommentIcon.value = biHeartFill;
    // followColor.value = "secondary";
    // count.value += 1;
  } else {
    UnlikeCommentBtn(id, id1);
    console.log("Arrey", entityCheckComment.value);
    // LikeCommentIcon.value = biHeart;
    // followColor.value = "primary";
    // count.value -= 1;
  }
}

//Pop up หลังจากกดแก้ไขคอมเมนต์
const alertEdit = async (index) => {
  const response = await SingleComment(index);
  if (response) {
    entitycomment.value = response.entity;
    alertEdit1.value = true;
    console.log("Check Comment", entitycomment);
  }
};
const alertEdit1 = ref(false);

//ฟังก์ชั่นการแก้ไขคอมเมนต์
const editProcess = async () => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const date = new Date().toLocaleString("en-US", options);

  // แปลงรูปแบบวันเวลาจาก "MM/DD/YYYY, HH:MM:SS" เป็น "YYYY-MM-DD HH:MM:SS"
  const formattedDate = date.replace(
    /(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/,
    (match, p1, p2, p3, p4, p5, p6) => {
      const hour = p4.padStart(2, "0");
      const minute = p5.padStart(2, "0");
      const second = p6.padStart(2, "0");
      const year = p3;
      const month = p1.padStart(2, "0");
      const day = p2.padStart(2, "0");
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
  );

  // กำหนดค่า formattedDate ให้กับ property "update_date" ของ entitycomment
  entitycomment.value.update_date = formattedDate;
  // console.log(entitycomment.value.update_date);

  const response = await EditComment(entitycomment.value);
  console.log("updateUser", response);
  $q.notify({
    message: t("Success"),
    type: "positive",
  });
  if (
    authenStore.auth.rolesText === "Dev" ||
    userPostId === authenStore.auth.id
  ) {
    fethDataComment();
  } else {
    fethDataCommentStatus();
  }
  alertEdit1.value = false;
};

function toggleEditIcon(item) {
  if (LikeCommentIcon.value === biHeart) {
    LikeCommentBtn(id, id1);
    console.log("Arrey", entityCheckComment.value);
    LikeCommentIcon.value = biHeartFill;
    // followColor.value = "secondary";
    // count.value += 1;
  } else {
    UnlikeCommentBtn(id, id1);
    console.log("Arrey", entityCheckComment.value);
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

const entityCheckComment = ref({});
const entityCheckCommentStatus = ref({});
const ArrayCountComment = ref([]);

//แล้วมาทำการลูปให้ไอดีใน entityCHeckCommant มาเรียกข้อมูลของ API CheckLikeComment
//โดยสร้าง check เข้ามาให้เป็น index โดยอ้างอิงจาก status
const CheckComment = async () => {
  entityCheckComment.value.forEach(async (item, index) => {
    const response = await CheckLikeComment(item.commentId);
    if (response) {
      entityItemComment.value[index].check = response.status;
    }
  });
  console.log("มี 1 แล้วจ้า", entityItemComment.value);
};

//เช็คคอมเมนต์ที่มี status 0
const CheckComment0 = async () => {
  entityCheckCommentStatus.value.forEach(async (item, index) => {
    const response = await CheckLikeComment(item.commentId);
    if (response) {
      entityItemCommentStatus.value[index].check = response.status;
    }
  });
  console.log("มี 0 แล้วจ้า", entityItemCommentStatus.value);
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
  entityItemComment.value.forEach(async (item, index) => {
    const response = await CountComment(item.commentId);
    if (response) {
      entityItemComment.value[index].CountLikeComment =
        response.TotalLikeComment;
      // entityCheckCommentStatus.value = response.entity;
    }
  });
  // console.log("มานะมานนี", entityItemComment.value);
};

//ฟังก์ชั่นของการนับยอดไลก์คอมเมนต์ status 0
const fetchCountCommentStatus = async () => {
  entityItemCommentStatus.value.forEach(async (item, index) => {
    const response = await CountComment(item.commentId);
    if (response) {
      entityItemCommentStatus.value[index].CountLikeComment =
        response.TotalLikeComment;
      // entityCheckComment.value = response.entity;
    }
  });
  // console.log("มานะมานนี 0", entityItemCommentStatus.value);
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
      fethLikePost();
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
      fethLikePost();
    }
  }
};

//ฟังก์ชั่นกดไลก์คอมเมนต์
const LikeCommentBtn = async (id, id1) => {
  const $id = id;
  const $id1 = id1;
  if (
    authenStore.auth.rolesText === "Dev" ||
    userPostId === authenStore.auth.id
  ) {
    const response = await LikeComment($id, $id1);
    if (response) {
      console.log("LikeComment", response.message);
      fetchCountComment();
      // fetchCountCommentStatus();
      CheckComment();
      // fethDataComment();
    }
  } else {
    const response = await LikeComment($id, $id1);
    if (response) {
      // fethDataCommentStatus();
      CheckComment0();
      fetchCountCommentStatus();
    }
  }
};

//ฟังก์ชั่นกดยกเลิกไลก์คอมเมนต์
const UnlikeCommentBtn = async (id, id1) => {
  const $id = id;
  const $id1 = id1;
  if (
    authenStore.auth.rolesText === "Dev" ||
    userPostId === authenStore.auth.id
  ) {
    const response = await UnlikeComment($id, $id1);
    if (response) {
      console.log("UnlikeComment", response.message);
      fetchCountComment();
      // fetchCountCommentStatus();
      CheckComment();
      // fethDataComment();
    }
  } else {
    const response = await UnlikeComment($id, $id1);
    if (response) {
      // fethDataCommentStatus();
      CheckComment0();
      fetchCountCommentStatus();
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
      message: t("Success"),
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
    // location.reload();
    // await refreshideData(); // เรียกใช้งานฟังก์ชัน refreshHideData() เพื่อดึงข้อมูลใหม่จากแหล่งข้อมูล
    // router.push(`/postncomment/${postId.value}`);
    if (
      authenStore.auth.rolesText === "Dev" ||
      userPostId === authenStore.auth.id
    ) {
      fethDataComment();
    } else {
      fethDataCommentStatus();
    }
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
      message: t("Success"),
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
    // location.reload();
    // await refresUnhideData(); // เรียกใช้งานฟังก์ชัน refreshHideData() เพื่อดึงข้อมูลใหม่จากแหล่งข้อมูล
    // router.push(`/postncomment/${postId.value}`);
    if (
      authenStore.auth.rolesText === "Dev" ||
      userPostId === authenStore.auth.id
    ) {
      fethDataComment();
    } else {
      fethDataCommentStatus();
    }
  }
};

const refreshUnHideData = async () => {
  await fetchDataComment();
  await fetchDataCommentStatus();
};
</script>

<style scoped>
.background {
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
  height: 340px;
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
/* .flex .container-post .img {
  width: 250px;
  height: 250px;
} */

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
!

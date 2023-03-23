<template>
  <q-page class="flex flex-center">
    <q-form>
      <div class="container">
        <p style="font-size: 25px; font-weight: bolder">เพิ่มโพสต์ใหม่</p>

        <!-- ส่วนของการใส่หัวข้อโพสต์ -->
        <q-input
          outlined
          v-model="text"
          label="หัวข้อโพสต์  "
          stack-label
          :dense="dense"
          style="width: 760px"
        />

        <!-- ส่วนของการจัดรูปแบบเนื้อหาโพสต์ -->
        <div class="q-pa-md q-gutter-sm" style="width: 800px">
          <q-editor
            v-model="qeditor"
            style="height: 300px"
            :dense="$q.screen.lt.md"
            :toolbar="[
              [
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  list: 'only-icons',
                  options: ['left', 'center', 'right', 'justify'],
                },
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  options: ['left', 'center', 'right', 'justify'],
                },
              ],
              [
                'bold',
                'italic',
                'strike',
                'underline',
                'subscript',
                'superscript',
              ],
              ['token', 'hr', 'link', 'custom_btn'],
              ['print', 'fullscreen'],
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
                },
                {
                  label: $q.lang.editor.fontSize,
                  icon: $q.iconSet.editor.fontSize,
                  fixedLabel: true,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'size-1',
                    'size-2',
                    'size-3',
                    'size-4',
                    'size-5',
                    'size-6',
                    'size-7',
                  ],
                },
                {
                  label: $q.lang.editor.defaultFont,
                  icon: $q.iconSet.editor.font,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'default_font',
                    'arial',
                    'arial_black',
                    'comic_sans',
                    'courier_new',
                    'impact',
                    'lucida_grande',
                    'times_new_roman',
                    'verdana',
                  ],
                },
                'removeFormat',
              ],
              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

              ['undo', 'redo'],
              ['viewsource'],
            ]"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana',
            }"
          />

          <!-- ส่วนของการแทรกไฟล์รูปภาพ -->
          <div style="display: flex; justify-content: space-between">
            <q-input
              @update:model-value="
                (val) => {
                  files = val;
                }
              "
              multiple
              type="file"
              style="width: 200px,height: 0px;"
              borderless
            />

            <!-- ส่วนของปุ่มโพสต์ -->
            <q-btn
              push
              color="primary"
              label="โพสต์"
              style="height: 35px; width: 50px"
            />
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";

export default defineComponent({
  name: "AddPost",
  setup() {
    return {
      text: ref(null),
    };
  },
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
  width: 100%;
  height: auto;
}
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0.8;
  height: 500px;
  padding: 50px 50px 50px 50px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.75);
  padding: 10px;
  background: white;
}
</style>

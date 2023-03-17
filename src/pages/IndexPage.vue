<template>
  <q-page class="flex flex-center">
    <div class="container">
      <b> Title </b>
      <p>Content content content</p>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>

<style>
.flex {
  background-image: url(./public/background.jpg);
  background-size: cover;
  opacity: 0.9;
  width: 100%;
  height: auto;
}
/* .container {
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
.container:hover {
  transform: scale(1.02);
}
.Post {
  margin-right: 700px;
} */
</style>

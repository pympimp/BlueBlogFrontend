<template>
  <q-page>
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <title>BlueBlog</title>
      </head>
      <body>
        <header>
          <img src="/public/blueblog-logo.png" alt="" class="logo" />
          <nav class="navigation">
            <q-input
              rounded
              outlined
              v-model="text"
              label="Search bar"
              bg-color="white"
              q-icon="search"
              style="width: 200px"
            />
            <a href="#">Add</a>
            <img
              src="/public/profile-icon.png"
              alt=""
              style="width: 30px; height: 30px"
            />
          </nav>
        </header>
      </body>
    </html>
  </q-page>
</template>

<script></script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.logo {
  width: 40px;
  height: 40px;
  user-select: none;
}

.navigation a {
  position: relative;
  font-size: 1.1em;
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  margin-left: 40px;
}
</style>

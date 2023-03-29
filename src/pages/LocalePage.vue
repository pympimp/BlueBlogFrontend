<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          {{ t("appName") }}
        </div>
        <div class="text-h1">
          {{ t("welCome", { name: t("appName") }) }}
        </div>
      </q-card-section>

      <q-card-section>
        <p>Current Locale : {{ locale }}</p>

        <q-card-section>
          <q-select
            filled
            v-model="locale"
            :options="localeList"
            option-value="locale"
            option-label="text"
            emit-value
            map-options
          ></q-select>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useMeta } from "quasar";
import { useLang } from "src/composables/useLang";
useMeta({ title: "I18n Page" });

const { localeList, t, locale } = useLang();
</script>

<style></style>

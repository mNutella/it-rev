<template lang="pug">
  span {{text}}

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as store from "../plugins/store";

@Component
export default class Snackbar extends Vue {
  get active() {
    return store.snackbar().active;
  }
  set active(newValue: Boolean) {
    store.hideSnackbar();
  }
  get color() {
    return store.snackbar().color;
  }
  get text() {
    const msg = store.snackbar().message;
    return typeof msg === "string"
      ? msg === "Internal Server Error"
        ? "Internal Server Error!"
        : store.snackbar().message.toString()
      : "Error";
  }
}
</script>

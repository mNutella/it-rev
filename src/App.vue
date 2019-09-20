<template lang="pug">
  .wrapper
    Snackbar
    router-view
</template>

<script lang="ts">
import Snackbar from "./components/Snackbar.vue";
import * as store from "./plugins/store";

export default {
  components: { Snackbar }
};
</script>

<style lang="sass">
@import '@design'

$container_item_shadow: 0px 0px 10px 0px rgba(0,0,0,0.4)
$wrapper_height: calc(100vh - 2%)
$bg_color: #f1f1f1
$color_black: #1c2025
$color_red: #ec174f

html, body
  margin: 0
  padding: 0
  background-color: $bg_color
  font-family: "Roboto", Times, serif

body
  padding: 2% 2% 0 2%

.wrapper
  width: 100%
  height: $wrapper_height
  font-size: 1rem
  font-weight: 300

.container
  display: flex
  &__item
    background-color: white
    box-shadow: $container_item_shadow
    &-center
      justify-content: center

.custom-scroll
  overflow: auto
  &::-webkit-scrollbar
    width: 4px
    background-color: $color_black
  &::-webkit-scrollbar-thumb
    background-color: $color_red

.icon
  font-size: .9rem

.pd-def
  padding: 2%

.w-100
  width: 100%

@media screen and (min-width: $break-large)
  .container
    align-items: start
    flex-direction: row
    &__item
      flex: 1 auto
    &__item + &__item
      margin-top: 0
      margin-left: 1.5%
  .max-height
    max-height: 550px

@media screen and (max-width: $break-small)
  .container
    flex-direction: column
    &__item + &__item
      margin-top: 1.5%
      margin-left: 0

</style>
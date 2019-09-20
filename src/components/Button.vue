<template lang="pug">
  button(
    type="button"
    @click="onClick"
    v-bind:class="{'w-100': full, 'btn--dark-bg': dark}"
  ).btn {{text}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit } from "vue-property-decorator";

@Component({
  props: {
    full: Boolean,
    dark: Boolean
  }
})
export default class Button extends Vue {
  @Prop({ default: "Button" })
  text!: string;
  full!: boolean;
  dark!: boolean;
  @Emit("btn-click")
  onClick() {}
}
</script>

<style lang="sass" scoped>
$btn_bg_color: #ec174f

.btn
  background-color: $btn_bg_color
  border: none
  color: white
  padding: 30px 32px
  text-align: center
  text-decoration: none
  outline: none
  display: inline-block
  font-size: 1.1rem
  font-weight: 300
  -webkit-transition-duration: 0.4s
  transition-duration: 0.4s
  cursor: pointer
  &:hover
    background-color: #d6184a
  &--dark-bg
    background-color: #1c2025
    &:hover
      background-color: #343a42
</style>
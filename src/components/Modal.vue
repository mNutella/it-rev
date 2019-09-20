<template lang="pug">
  transition(name="modal")
    .modal__mask
      .modal__wrapper
        .modal__container
          span(@click="handleClose").icon.modal__btn-close ╳
          .modal__header
            slot(name="header") default header
          .modal__body
            Input(type="date" label="Дата" v-model="mydate")
            Input(type="number" label="Дистанция" v-model="mydistance" min="0")
          .modal__footer
            slot(name="footer") default header
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit, Model } from "vue-property-decorator";

import * as store from "../plugins/store";
import Button from "./Button.vue";
import Input from "../components/Input.vue";

import { parseFullDate, reverseFullDate } from "../utils/mixins";

@Component({
  components: { Button, Input }
})
export default class Modal extends Vue {
  get mydate() {
    return reverseFullDate(store.modal().track.date);
  }

  set mydate(val) {
    console.log(val);
    store.setModal({
      ...store.modal(),
      track: { ...store.modal().track, date: new Date(val) }
    });
  }

  get mydistance() {
    return store.modal().track.distance.toString();
  }

  set mydistance(val) {
    store.setModal({
      ...store.modal(),
      track: { ...store.modal().track, distance: Number(val) }
    });
  }

  handleClose() {
    store.setModalToDefault();
    store.hideModal();
  }
}
</script>

<style lang="sass" scoped>
$btn_bg_color: #ec174f
$btn_close_bg_color: #ec174f

.modal
  &__mask
    position: fixed
    z-index: 9998
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, .5)
    display: table
    transition: opacity .3s ease
  &__wrapper
    display: table-cell
    vertical-align: middle
  &__container
    width: 300px
    margin: 0px auto
    padding: 2% 2%
    background-color: #fff
    border-radius: 2px
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.4)
    font-weight: 300
    transition: all .3s ease
  &__btn-close
    background-color: $btn_close_bg_color
    opacity: 1
    font-size: .5rem
    color: white
    padding: 6px
    border-radius: 50%
    cursor: pointer
    &:hover
      opacity: .8
  &__header
    margin-top: 0
    color: #42b983
  &__body
    margin: 20px 0
  &-enter
    opacity: 0
  &-enter
    opacity: 0
  &-leave-active
    opacity: 0
  &-enter &-container,
  &-leave-active &-container
    -webkit-transform: scale(1.1)
    transform: scale(1.1)
</style>
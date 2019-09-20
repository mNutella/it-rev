<template lang="pug">
  div
    label {{label}}
    input(
      :type="type"
      :value="value"
      @input="onChange"
    ).input
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Model, Emit } from "vue-property-decorator";

@Component
export default class Input extends Vue {
  @Prop()
  ph!: string;
  @Prop({ default: "Input" })
  type!: "text" | "date" | "number";
  @Prop()
  label!: string;
  @Prop()
  min!: number;
  @Prop()
  @Model("input")
  value!: Date | string;

  get myval() {
    return this.value;
  }

  onChange(ev: any) {
    this.$emit("input", ev.target.value);
  }
}
</script>

<style lang="sass" scoped>
$outline_color: #f1f1f1
$border_color: #ccc

.input
  padding: 15px;
  border: 1px solid $border_color;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  font-family: montserrat;
  font-size: 1rem;
  outline-color: $outline_color
</style>
<template lang="pug">
  tr(@click="onClick").item
    td
      p.day {{localDay}}
      time(:datetime="date") {{fullDate}}
    td
      p {{distance}} метров
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit } from "vue-property-decorator";

import * as store from "../../plugins/store";
import * as api from "../../utils/api";
import { parseFullDate, parseDay } from "../../utils/mixins";

@Component
export default class Item extends Vue {
  @Prop({ default: undefined })
  private readonly id!: number;
  @Prop({ default: new Date() })
  private readonly date!: Date;
  @Prop({ default: 0 })
  private readonly distance!: number;
  @Emit("i-click")
  private onClick() {
    return { id: this.id, date: this.date, distance: this.distance };
  }

  get fullDate() {
    return parseFullDate(this.date);
  }

  get localDay() {
    return parseDay(this.date, "ru");
  }
}
</script>

<style lang="sass" scoped>
@import '@design'

.day
  font-size: .6rem
  margin: 0
  text-transform: capitalize
  color: $color-day-text
.item
  font-size: .9rem
</style>

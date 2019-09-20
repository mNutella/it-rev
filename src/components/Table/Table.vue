<template lang="pug">
  .table
    table
      thead
        tr
          th Дата
            span(
              v-bind:class="{'table__btn-icon--active': byDate}"
              @click="handleByDate"
            ).icon.table__btn-icon {{!byDateToggle ? '⬆' : '⬇'}}
          th Дистанция
            span(
              v-bind:class="{'table__btn-icon--active': byDistance}"
              @click="handleByDistance"
            ).icon.table__btn-icon {{!byDistanceToggle ? '⬆' : '⬇'}}
      tbody
        Item(v-for="item in filteredItems"
          :id="item.id"
          :date="new Date(item.date)"
          :distance="item.distance"
          :key="item.id"
          @i-click="onItemClick")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit } from "vue-property-decorator";

import * as store from "../../plugins/store";
import * as api from "../../utils/api";
import { Track } from "../../models/track";
import Item from "./Item.vue";

@Component({
  components: {
    Item
  }
})
export default class Table extends Vue {
  @Prop({ default: [] })
  private readonly items!: Array<Track>;
  @Emit("t-i-click")
  private onItemClick(value: number) {}

  get byDate(): Boolean {
    return store.table().byDate;
  }
  get byDistance(): Boolean {
    return store.table().byDistance;
  }
  get byDateToggle(): Boolean {
    return store.table().byDateToggle;
  }
  get byDistanceToggle(): Boolean {
    return store.table().byDistanceToggle;
  }

  private handleByDate() {
    let data: any = {};
    if (!this.byDate) {
      data.byDate = true;
      data.byDistance = false;
    }
    data.byDateToggle = !this.byDateToggle;

    store.setTable({ ...store.table(), ...data });
  }

  private handleByDistance() {
    let data: any = {};
    if (!this.byDistance) {
      data.byDistance = true;
      data.byDate = false;
    }
    data.byDistanceToggle = !this.byDistanceToggle;

    store.setTable({ ...store.table(), ...data });
  }

  private filterByDate(f: Track, s: Track) {
    const fData = new Date(f.date);
    const sData = new Date(f.date);
    return (new Date(f.date) as any) - (new Date(s.date) as any);
  }

  private filterByDistance(f: Track, s: Track) {
    if (f.distance > s.distance) return 1;
    if (s.distance > f.distance) return -1;
    return 0;
  }

  get filteredItems() {
    if (this.byDate) {
      if (this.byDateToggle) return this.items.sort(this.filterByDate);
      else return this.items.sort(this.filterByDate).reverse();
    }
    if (this.byDistance) {
      if (this.byDistanceToggle) return this.items.sort(this.filterByDistance);
      else return this.items.sort(this.filterByDistance).reverse();
    }
    return this.items;
  }
}
</script>

<style lang="sass">
@import '@design'

$thead_bg_color: #1c2025
$tbody_odd_tr_bg_color: #f1f1f1

table
  width: 100%
  padding: 2%
  border-spacing: 0
  border-collapse: collapse
  thead
    text-align: left
    color: white
    tr th
      padding: 15px 4%
      position: sticky
      top: 0
      background: $thead_bg_color
      vertical-align: center
    th
      font-weight: 300
  tbody tr td
    padding: 0 4%
  tbody tr
    cursor: pointer
    &:hover
      background-color: #dedcdc
    &:nth-child(odd)
      background-color: $tbody_odd_tr_bg_color
      &:hover
        background-color: #dedcdc

.table
  &__header
    display: inline-block
    text-align: left
    color: white
    padding: 15px 4%
    position: sticky
    top: 0
    background: $thead_bg_color
    vertical-align: center
  &__btn-icon
    margin: 4%
    cursor: pointer
    background-color: $color-icon-bg
    opacity: .5
    border-radius: 10%
    padding: 1px 2px
    &--active
      opacity: 1
</style>

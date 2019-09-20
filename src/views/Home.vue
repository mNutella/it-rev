<template lang="pug">
  .container
    .container__item
      .table-wrapper.max-height.custom-scroll
        Table(:items="tracks" @t-i-click="handleWalkClick")
      Button(text="Добавить запись" @btn-click="handleModalShow" full)
    .container__item
      div
        .header
          h1 Суммарная активность
        .chart-wrapper.pd-def
          Chart(
            :labels="chartLabels"
            :chartdata="chartData")
        .short-info
          p Минимум: {{minDistance}} метров
          p Максимум: {{maxDistance}} метров
          p Cуммарно за 7 дней: {{sumLastWeek}} метров
    Modal(v-if="modalShow")
      h3(slot="header") {{modalHeader}}
      .btn-group(slot="footer")
        Button(v-show="modalType" @btn-click="handleDeleteWalk" dark text="Удалить")
        Button(v-show="!modalType" @btn-click="handleAddWalk" text="Добавить")
        Button(v-show="modalType" @btn-click="handleUpdateWalk" text="Сохранить")
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import Component from "vue-class-component";

import * as store from "../plugins/store";
import * as api from "../utils/api";
import { delay, parseFullDate } from "../utils/mixins";
import { Track } from "../models/track";
import { Table } from "../components/Table";
import Chart from "../components/Chart.vue";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";

@Component({
  components: {
    Table,
    Button,
    Modal,
    Chart
  }
})
export default class Home extends Vue {
  get modalHeader() {
    return this.modalType ? "Изменить прогулку" : "Новая прогулка";
  }

  get modalShow() {
    return store.modal().show;
  }

  get minDistance() {
    return Math.min(...store.tracks().map(item => item.distance));
  }

  get maxDistance() {
    return Math.max(...store.tracks().map(item => item.distance));
  }

  get sumLastWeek() {
    if (store.tracks().length === 0) return;

    const today = new Date();
    const last = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const sum = store
      .tracks()
      .filter(
        item => new Date(item.date) <= today && new Date(item.date) >= last
      )
      .map(item => item.distance)
      .reduce((cur, pre) => cur + pre);

    return sum;
  }

  get tracks() {
    return store.tracks();
  }

  get loading() {
    return store.loading();
  }

  get modalType() {
    return store.modal().update;
  }

  get chartLabels() {
    return store.tracks().map(item => parseFullDate(new Date(item.date)));
  }

  get chartData() {
    return store.tracks().map(item => item.distance);
  }

  async mounted() {
    await this.getWalks();
  }

  handleModalShow() {
    store.setModal({ ...store.modal(), show: true });
  }

  handleWalkClick(val: Track) {
    store.setModal({
      ...store.modal(),
      show: true,
      update: true,
      track: {
        id: val.id,
        date: val.date,
        distance: val.distance
      }
    });
  }

  async handleAddWalk() {
    store.setModal({ ...store.modal(), show: true });
    try {
      const { date, distance } = store.modal().track;
      const walk = await api.addWalk({
        date: new Date(date),
        distance: distance
      });
      await this.getWalks();
      store.setModal({ ...store.modal(), show: false });
      store.setModalToDefault();
    } catch (err) {
      store.setSnackbar({
        message: "Failed: add walk",
        color: "error",
        active: true
      });
    }
  }

  async handleUpdateWalk() {
    try {
      const { id, date, distance } = store.modal().track;

      if (!id) throw "";

      const walk = await api.updateWalk(id, {
        date: date,
        distance: distance
      });
      await this.getWalks();
      store.setModal({ ...store.modal(), show: false });
      store.setModalToDefault();
    } catch (err) {
      console.log(err);
      store.setSnackbar({
        message: "Failed: remove walk",
        color: "error",
        active: true
      });
    }
  }

  async handleDeleteWalk() {
    try {
      const { id } = store.modal().track;

      if (!id) throw "";

      const walk = await api.removeWalk(id);
      await this.getWalks();
      store.setModal({ ...store.modal(), show: false });
      store.setModalToDefault();
    } catch (err) {
      store.setSnackbar({
        message: "Failed: remove walk",
        color: "error",
        active: true
      });
    }
  }

  async getWalks() {
    store.setLoading(true);
    try {
      const walks = await api.fetchWalks();
      store.setTracks(walks);
      store.setLoading(false);
    } catch (err) {
      store.setSnackbar({
        message: "Failed: fetch walks",
        color: "error",
        active: true
      });
    }
  }
}
</script>

<style lang="sass" scope>
$short_info_bg_color: #1c2025
$paddings: 15px 32px

.table-wrapper

.header
  padding: $paddings

.chart-wrapper
  overflow-x: auto

.l-wrapper

.short-info
  display: flex
  flex-wrap: wrap
  padding: $paddings
  justify-content: space-between
  background-color: $short_info_bg_color
  color: white
  font-weight: 500

.btn-group
  display: flex
  justify-content: space-between

</style>

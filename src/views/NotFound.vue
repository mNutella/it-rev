<template lang="pug">
  span {{$t('notFound')}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class NotFound extends Vue {}
</script>
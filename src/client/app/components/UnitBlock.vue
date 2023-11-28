<script setup lang="ts">

import AssetsProvider from "../providers/AssetsProvider";
import Color from "../models/Color";

const props = defineProps<{
  unit: any,
  count: number,
  color?: Color
}>();

const assets = new AssetsProvider()

const className: string = props.color && props.color.className
    ? props.color.className
    : 'border-gray-700 bg-gradient-to-b from-gray-700 to-white'
</script>

<template>
  <div class="border-4 p-0.5 pb-0 rounded"
       :class="className">
    <img :src="assets.getUnitImgSrc(unit.name)" :alt="unit.name" style="width: 65px;" class="rounded"/>
    <p class="text-center text-3xl font-bold text-white mt-1">
      {{ props.count }}
    </p>
  </div>
</template>

<style scoped>
  .unit-block {
    background: linear-gradient(0deg, rgba(156,0,0,1) 0%, rgba(0,0,0,0.32816876750700286) 100%);
    border: 2px solid red;
    border-radius: 4px;
    padding : 6px;
    margin-right: 6px;
  }

  .unit-block-img {
    width: 60px;
    height: 48px;
  }

  .unit-block-text {
    text-align: center;
    line-height: 35px;
    font-weight: bold;
    height : 35px;
    font-size: 30px;
    color: white;
  }
</style>

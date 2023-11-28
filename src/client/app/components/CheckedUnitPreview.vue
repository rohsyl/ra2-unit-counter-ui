<script setup lang="ts">
import {Unit} from "../stores/MetadataStore";
import AssetsProvider from "../providers/AssetsProvider";
import Color from "../models/Color";

const props = defineProps<{
  units: Unit[],
  color?: Color
}>()

const assets = new AssetsProvider()

const className: string = props.color && props.color.className
    ? props.color.className
    : 'border-gray-700 bg-gradient-to-b from-gray-700 to-white'

</script>

<template>
  <div class="flex gap-2 flex-wrap">
    <div v-for="unit in props.units" :key="unit"
         class="border-4 p-1 rounded"
         :class="className">
      <img :src="assets.getUnitImgSrc(unit.name)" :alt="unit.name" style="width: 64px;" class="rounded"/>
      <!--<p class="text-center text-3xl font-bold leading-8">
        0
      </p>-->
    </div>
  </div>
</template>

<style scoped>

</style>
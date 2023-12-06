<script setup lang="ts">

import AssetsProvider from "../providers/AssetsProvider";
import Color from "../models/Color";
import {computed} from "vue";

const props = withDefaults(
    defineProps<{
      unit: any,
      count: number | string,
      color?: Color
      direction: 'row' | 'column'
    }>(), {
      direction: 'row'
    });

const assets = new AssetsProvider()

const { containerDirectionClass, containerTextClass, imageWidth } = initDirection()

const unitImg = computed(() => {
  let name = props.unit.name;
  if(props.unit.name == 'warfactories'){
    name = (props.unit.faction ?? 'soviet') + '_' + props.unit.name
  }
  return assets.getUnitImgSrc(name)
})

function initDirection() {
  let containerDirectionClass = 'flex ';
  let containerTextClass = '';
  let imageWidth = ''
  if(props.direction === 'row') {
    containerDirectionClass += 'bg-gradient-to-b flex-col '
    containerTextClass = ' mt-1 '
    imageWidth = ' w-[60px]'
  }
  else if(props.direction === 'column') {
    containerDirectionClass += 'bg-gradient-to-r flex-row w-[120px] '
    containerTextClass = ' text-right pr-2 text-right flex-grow  '
    imageWidth = ' w-[50px]'
  }
  return { containerDirectionClass, containerTextClass, imageWidth }
}

</script>

<template>
  <div class="border-2 p-0.5 pb-0 rounded-lg shadow-lg"
       :class="(props.color
      ? props.color.borderClassNames + ' ' + props.color.gradientFromClassNames + ' ' + props.color.gradientToClassNames
      : 'border-gray-700 bg-gradient-to-b from-gray-700 to-white') + ' ' + containerDirectionClass" >
    <img :src="unitImg" :alt="unit.name" class="rounded-lg" :class="imageWidth"/>
    <p class="text-center text-3xl font-bold text-white"
       :class="containerTextClass">
      {{ props.count }}
    </p>
  </div>
</template>

<style scoped>
</style>

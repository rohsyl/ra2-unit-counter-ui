<script setup lang="ts">

import AssetsProvider from "../providers/AssetsProvider";
import Color from "../models/Color";
import {useMetadataStore} from "../stores/MetadataStore";

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
const metadataStore = useMetadataStore()

const { containerDirectionClass, containerTextClass, imageWidth } = initDirection()

function initDirection() {
  let containerDirectionClass = 'flex items-center ';
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
    imageWidth = ' w-[58px]'
  }
  return { containerDirectionClass, containerTextClass, imageWidth }
}

</script>

<template>
  <div class="border pb-0 rounded-lg shadow-lg"
       v-if="!metadataStore.hideWhenZero || count > 0"
       :class="(props.color
      ? props.color.borderClassNames + ' ' + props.color.gradientFromClassNames + ' ' + props.color.gradientToClassNames
      : 'border-gray-700 bg-gradient-to-b from-gray-700 to-white') + ' ' + containerDirectionClass" >
    <img :src="assets.getAssetPath(unit.imageUrl)" :alt="unit.name" class="rounded-lg" :class="imageWidth"/>
    <p class="text-center text-3xl font-bold text-white"
       :class="containerTextClass">
      {{ props.count }}
    </p>
  </div>
</template>

<style scoped>
</style>

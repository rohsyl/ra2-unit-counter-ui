<script setup lang="ts">
import Color from "../models/Color";

const props = withDefaults(
    defineProps<{
      color?: Color
      direction: 'row' | 'column'
    }>(), {
      direction: 'row'
    });


const { containerDirectionClass, imageWidth } = initDirection()

function initDirection() {
  let containerDirectionClass = '';
  let imageWidth = ''
  if(props.direction === 'row') {
    containerDirectionClass += 'bg-gradient-to-b '
    imageWidth = ' w-[60px]'
  }
  else if(props.direction === 'column') {
    containerDirectionClass += 'bg-gradient-to-r w-[120px] '
    imageWidth = ' w-[50px]'
  }
  return { containerDirectionClass, imageWidth }
}

</script>

<template>
  <div class="border p-0.5 pb-0 rounded-lg shadow-lg"
       :class="(props.color
      ? props.color.borderClassNames + ' ' +
        props.color.gradientFromClassNames + ' ' +
        props.color.gradientToClassNames
      : 'border-gray-700 bg-gradient-to-b from-gray-700 to-white') + ' ' + containerDirectionClass" >

    <slot></slot>

  </div>
</template>

<style scoped>

</style>
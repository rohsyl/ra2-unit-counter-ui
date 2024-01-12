<script setup lang="ts">
import Color from "../models/Color";

const props = withDefaults(
    defineProps<{
      leftColor?: Color,
      rightColor?: Color,

    }>(), {
    });
</script>

<template>

  <div class="text-center leading-none">
    <div class="">
      <div class="flex justify-center">
        <div class="flex-grow border-2 p-2 rounded-l-xl border-r-0 text-2xl font-bold border-gray-500 shadow-lg mt-3 mb-1.5 z-10"
             :class="'bg-gradient-to-r ' + (props.leftColor
                   ? props.leftColor.gradientFromClassNames + ' ' + props.leftColor.gradientToClassNames
                   : 'gray from-gray-700 to-gray-400')"
        >
          <div class="flex">
            <div class="flex-grow text-left self-center leading-none pb-0.5 capitalize px-2 text-ellipsis overflow-hidden" style="width:180px;">
              <slot name="left"></slot>
            </div>
          </div>
        </div>
        <div class="flex-grow border-2 border-gray-500 text-xl font-bold bg-gray-700 shadow-lg rounded-xl z-20">
          <div class="flex h-full items-center">
            <div class="w-1/2 h-full text-center text-4xl px-2 text-white">
              <div class="flex items-center justify-center h-full">
                <div>
                  <slot name="score1"></slot>
                </div>
              </div>
            </div>
            <div class="w-1/2 h-full text-center text-white text-4xl px-2 border-r-0">
              <div class="flex items-center justify-center h-full">
                <div>
                  <slot name="score2"></slot>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-grow border-2 p-2 rounded-r-xl border-l-0 text-2xl font-bold border-gray-500 shadow-lg mt-3 mb-1.5 z-10"
             :class="'bg-gradient-to-l ' + (props.rightColor
                   ? props.rightColor.gradientFromClassNames + ' ' + props.rightColor.gradientToClassNames
                   : 'gray from-gray-700 to-gray-400')"
        >
          <div class="flex">
            <div class="flex-grow text-right self-center leading-none pb-0.5 capitalize px-2 text-ellipsis overflow-hidden" style="width:180px;">
              <slot name="right"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center" style="margin-top:-10px;">
      <div class="border-2 border-t-0 border-gray-500 p-1 text-xl text-white w-2/5 rounded-b-xl bg-gray-600 z-0 font-bold leading-none shadow-lg shadow-inner pt-3">
        <slot name="format"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
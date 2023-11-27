<script setup>

import {useRoute} from "vue-router";
import {onMounted} from "vue";

const route = useRoute()
const activeClasses = 'shrink-0 border-b-2 border-sky-500 px-1 pb-4 text-sm font-medium text-sky-600'
const classes = 'shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700';

function activeClass(path) {
  return route.path === path ? activeClasses : classes
}

</script>

<template>
  <div class="border-b border-gray-200 mt-4 mx-4">
    <nav class="-mb-px flex gap-6" aria-label="Tabs">

      <router-link to="/" :class="activeClass('/')">
        Dashboard
      </router-link>
      <router-link to="/scoreboard" :class="activeClass('/scoreboard')">
        Scoreboard
      </router-link>
    </nav>
  </div>
</template>

<style scoped>

</style>

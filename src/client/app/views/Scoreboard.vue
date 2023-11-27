<script setup>
import Nav from "../components/Nav.vue";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import UnitsCounter from "../components/UnitsCounter.vue";

const route = useRoute()
const showNav = ref(true)

onMounted(() => {
  showNav.value = !route.query.hasOwnProperty('nonav')
})

</script>

<template>
  <div v-if="showNav">
    <Nav />
    <div class="px-4 flex justify-end">
      <a href="?nonav" class="text-sm">Hide nav</a>
    </div>
  </div>
  <div :class="showNav ? 'mt-2 p-4' : ''">

    <div class="flex justify-between">
      <div class="w-2/5">
        <UnitsCounter />
      </div>

      <div class="flex-grow px-2">
        <div class="text-center">
          <div class="">
            <div class="flex justify-center">
              <div class="flex-grow border-4 p-2 rounded-l-2xl border-r-2 text-2xl font-bold">
                1
              </div>
              <div class="flex-grow border-4 p-2 rounded-r-2xl border-l-2 text-2xl font-bold">
                0
              </div>
            </div>
          </div>
          <div class="flex justify-center">
            <div class="border-4 border-t-0 p-1 text-sm w-1/2 rounded-b-2xl">
              BO5
            </div>
          </div>
        </div>
      </div>

      <div class="w-2/5">
        <UnitsCounter />
      </div>
    </div>


  </div>
</template>

<style scoped>

</style>

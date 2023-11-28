<script setup>
import Nav from "../components/Nav.vue";
import Card from "../components/Card.vue";
import {useMetadataStore} from "../stores/MetadataStore";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";

const metadataStore = useMetadataStore()

const { getAlliedUnits, getSovietUnits } = storeToRefs(metadataStore)


</script>

<template>
  <Nav />
  <div class="p-2">

    <Card>
      <h1 class="text-2xl font-bold border-b pb-2 mb-4">Settings</h1>

      <div class="mb-6">
        <div class="flex flex-col sm:flex-row">
          <div class="w-full sm:w-1/2 md:w-1/3">
            <h4 class="text-lg font-bold">Generals</h4>
            <p>General settings</p>
          </div>
          <div class="w-full sm:w-1/2 md:w-2/3 pt-8 px-2">

            <div class="mb-4">
              <div class="flex items-center gap-2">
                <input type="checkbox" id="getYuriAsSoviet" v-model="metadataStore.yuriAsSoviet" />
                <label for="getYuriAsSoviet">Use yuri as Soviet</label>
              </div>
              <p class="text-gray-400 text-xs">
                Yuri is considered as soviet in Blitz.
              </p>
            </div>

            <div class="mb-4">
              <div class="flex items-center gap-2">
                <input type="checkbox" id="getYuriAsSoviet" v-model="metadataStore.showFactionIcons" />
                <label for="getYuriAsSoviet">Show faction icons on scoreboard</label>
              </div>
              <p class="text-gray-400 text-xs">
                Check this to show the faction icon on the scoreboard
              </p>
            </div>

          </div>
        </div>
      </div>


      <div class="mb-6">
        <div class="flex flex-col sm:flex-row">
          <div class="w-full sm:w-1/2 md:w-1/3">
            <h4 class="text-lg font-bold">Allied units</h4>
            <p>Choose what allied units to show on the layout</p>
            <img src="/assets/factions/allied.webp" alt="Allied" class="inline-block h-20 mt-4" />
          </div>
          <div class="w-full sm:w-1/2 md:w-2/3 pt-8 px-2">

            <div v-for="unit in getAlliedUnits" class="flex items-center gap-2">
              <input type="checkbox" :id="unit" v-model="unit.checked" />
              <label :for="unit">{{ unit.name }}</label>
            </div>

          </div>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex flex-col sm:flex-row">
          <div class="w-full sm:w-1/2 md:w-1/3">
            <h4 class="text-lg font-bold">Soviet units</h4>
            <p>Choose what soviet units to show on the layout</p>
            <img src="/assets/factions/soviet.webp" alt="Allied" class="inline-block h-20 mt-4" />
          </div>
          <div class="w-full sm:w-1/2 md:w-2/3 pt-8 px-2">

            <div v-for="unit in getSovietUnits" class="flex items-center gap-2">
              <input type="checkbox" :id="unit" v-model="unit.checked" />
              <label :for="unit">{{ unit.name }}</label>
            </div>

          </div>
        </div>
      </div>
    </Card>

  </div>
</template>

<style scoped>

</style>

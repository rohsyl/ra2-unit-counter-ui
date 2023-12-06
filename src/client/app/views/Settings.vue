<script setup>
import Nav from "../components/Nav.vue";
import Card from "../components/Card.vue";
import {useMetadataStore} from "../stores/MetadataStore";
import {storeToRefs} from "pinia";
import {computed, onMounted, watch} from "vue";
import MasterSync from "../services/MasterSync";
import AssetsProvider from "../providers/AssetsProvider";

const metadataStore = useMetadataStore()
const assetsProvider = new AssetsProvider()

const { getAlliedUnits, getSovietUnits, getYuriUnits } = storeToRefs(metadataStore)

let wsConnection = undefined

onMounted(() => {
    wsConnection = new MasterSync()
    wsConnection.connect()
})
watch(
    metadataStore,
    (state) => {
      wsConnection.syncMetadataStore()
    },
    { deep: true }
)

function getUnitImg(faction, name) {

  let n = name
  if(name == 'warfactories'){
    n = faction + '_' + name
  }
  return assetsProvider.getUnitImgSrc(n)
}

</script>

<template>
  <Nav />
  <div class="p-2">

    <Card>
      <h1 class="text-2xl font-bold border-b pb-2 mb-4">Settings</h1>

      <!--<div class="mb-6">
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
      </div>-->


      <div class="mb-6">
        <h4 class="text-lg font-bold">Allied units</h4>
        <p>Choose what allied units to show on the layout</p>
        <div class="w-full sm:w-1/2 md:w-2/3 pt-2 flex items-center gap-2 flex-wrap">
          <label v-for="unit in getAlliedUnits" :for="'allied' + unit.name" style="width: 60px; height: 45px;" class="relative">
            <input type="checkbox" :id="'allied' + unit.name" class="absolute bottom-1 left-1" v-model="unit.checked" />
            <img :src="getUnitImg('allied', unit.name)" :alt="unit.name" class="w-full h-full border-2 border-black rounded" />
          </label>
        </div>
      </div>

      <div class="mb-6">
        <h4 class="text-lg font-bold">Soviet units</h4>
        <p>Choose what soviet units to show on the layout</p>
        <div class="w-full sm:w-1/2 md:w-2/3 pt-2 flex items-center gap-2 flex-wrap">
          <label v-for="unit in getSovietUnits" :for="'soviet' + unit.name" style="width: 60px; height: 45px;" class="relative">
            <input type="checkbox" :id="'soviet' + unit.name" class="absolute bottom-1 left-1" v-model="unit.checked" />
            <img :src="getUnitImg('soviet', unit.name)" :alt="unit.name" class="w-full h-full border-2 border-black rounded" />
          </label>
        </div>
      </div>


      <div class="mb-6">
        <h4 class="text-lg font-bold">Yuri units</h4>
        <p>Choose what yuri units to show on the layout</p>
        <div class="w-full sm:w-1/2 md:w-2/3 pt-2 flex items-center gap-2 flex-wrap">
          <label v-for="unit in getYuriUnits" :for="'yuri' + unit.name" style="width: 60px; height: 45px;" class="relative">
            <input type="checkbox" :id="'yuri' + unit.name" class="absolute bottom-1 left-1" v-model="unit.checked" />
            <img :src="getUnitImg('yuri', unit.name)" :alt="unit.name" class="w-full h-full border-2 border-black rounded" />
          </label>
        </div>
      </div>



    </Card>

  </div>
</template>

<style scoped>

</style>

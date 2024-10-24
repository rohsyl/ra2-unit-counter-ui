<script setup>
import Nav from "../components/Nav.vue";
import Card from "../components/Card.vue";
import {useMetadataStore} from "../stores/MetadataStore";
import {storeToRefs} from "pinia";
import {onMounted, onUnmounted, watch} from "vue";
import AssetsProvider from "../providers/AssetsProvider";
import draggable from 'vuedraggable';
import {useMasterSync} from "../hooks/useMasterSync";

const metadataStore = useMetadataStore()
const assetsProvider = new AssetsProvider()

const { getAlliedUnits, getSovietUnits, getYuriUnits } = storeToRefs(metadataStore)
const { syncMetadataStore } = useMasterSync()

let unwatch;
onMounted(() => {
  unwatch = watch(
      metadataStore,
      () => {
        syncMetadataStore()
      },
      { deep: true }
  )
})

onUnmounted(() => {
  unwatch()
})

function updateOrder(faction, e) {
  metadataStore.updateMetadataOrder(faction, e)
}

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

            <!--<<div class="mb-4">
             <div class="flex items-center gap-2">
               <input type="checkbox" id="getYuriAsSoviet" v-model="metadataStore.yuriAsSoviet" />
               <label for="getYuriAsSoviet">Use yuri as Soviet</label>
             </div>
             <p class="text-gray-400 text-xs">
               Yuri is considered as soviet in Blitz.
             </p>
           </div>-->

           <div class="mb-4">
             <div class="flex items-center gap-2">
               <input type="checkbox" id="showFactionIcons" v-model="metadataStore.showFactionIcons" />
               <label for="showFactionIcons">Show faction / country icons on scoreboard</label>
             </div>
             <p class="text-gray-400 text-xs">
               Check this to show the faction / country icon on the scoreboard
             </p>
           </div>

            <div class="mb-4">
              <div class="flex items-center gap-2">
                <input type="checkbox" id="hideWhenZero" v-model="metadataStore.hideWhenZero" />
                <label for="hideWhenZero">Hide unit when count is 0</label>
              </div>
              <p class="text-gray-400 text-xs">
                Check this to hide units from the counter when not present on the battlefield
              </p>
            </div>

         </div>
       </div>
     </div>


      <div class="mb-6">
        <h4 class="text-lg font-bold">Allied units</h4>
        <p>Choose what allied units to show on the layout</p>
        <draggable :list="getAlliedUnits" tag="div" class="w-full sm:w-1/2 md:w-2/3 pt-2 flex items-center gap-2 flex-wrap"
                   group="allied" item-key="name" @change="(e) => updateOrder('allied', e)" :options="{animation: 100}">
          <template #item="{ element: unit }">
            <label :for="'allied' + unit.name" style="width: 60px; height: 45px;" class="relative">
              <input type="checkbox" :id="'allied' + unit.name" class="absolute bottom-1 left-1" v-model="unit.checked" />
              <img :src="assetsProvider.getAssetPath(unit.imageUrl)" :alt="unit.name" class="w-full h-full border-2 border-black rounded" />
            </label>
          </template>
        </draggable>
      </div>


      <div class="mb-6">
        <h4 class="text-lg font-bold">Soviet units</h4>
        <p>Choose what soviet units to show on the layout</p>
        <draggable :list="getSovietUnits" tag="div" class="w-full sm:w-1/2 md:w-2/3 pt-2 flex items-center gap-2 flex-wrap"
                   group="soviet" item-key="name" @change="(e) => updateOrder('soviet', e)" :options="{animation: 100}">
          <template #item="{ element: unit }">
            <label :for="'soviet' + unit.name" style="width: 60px; height: 45px;" class="relative">
              <input type="checkbox" :id="'soviet' + unit.name" class="absolute bottom-1 left-1" v-model="unit.checked" />
              <img :src="assetsProvider.getAssetPath(unit.imageUrl)" :alt="unit.name" class="w-full h-full border-2 border-black rounded" />
            </label>
          </template>
        </draggable>
      </div>


      <div class="mb-6">
        <h4 class="text-lg font-bold">Yuri units</h4>
        <p>Choose what yuri units to show on the layout</p>
        <draggable :list="getYuriUnits" tag="div" class="w-full sm:w-1/2 md:w-2/3 pt-2 flex items-center gap-2 flex-wrap"
                    group="yuri" item-key="name" @change="(e) => updateOrder('yuri', e)" :options="{animation: 100}">
          <template #item="{ element: unit }">
              <label :for="'yuri' + unit.name" style="width: 60px; height: 45px;" class="relative">
                <input type="checkbox" :id="'yuri' + unit.name" class="absolute bottom-1 left-1" v-model="unit.checked" />
                <img :src="assetsProvider.getAssetPath(unit.imageUrl)" :alt="unit.name" class="w-full h-full border-2 border-black rounded" />
              </label>
          </template>
        </draggable>
      </div>



    </Card>

  </div>
</template>

<style scoped>

</style>

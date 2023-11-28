<script setup lang="ts">
import {Player, useGameStore} from "../stores/GameStore";
import {computed, onMounted, toRefs, watch} from "vue";
import {initFetchValues, useUnitsStore} from "../stores/UnitsStore";
import {storeToRefs} from "pinia";
import UnitBlock from "./UnitBlock.vue";
import {useMetadataStore} from "../stores/MetadataStore";
import ColorsProvider from "../providers/ColorsProvider";

const props = defineProps<{
  player: Player,
  running: boolean
  align: 'start' | 'end'
}>()
const { player, running } = toRefs(props)
const unitsStore = useUnitsStore()
const gameStore = useGameStore()
const metadataStore = useMetadataStore()

const { getCheckedSovietUnits, getCheckedAlliedUnits } = storeToRefs(metadataStore)

const playerData = computed(() => {
  return unitsStore.players[player.value.color]
})
const units = computed(() => {
  if(playerData.value.faction === 'soviet') {
    return getCheckedSovietUnits.value
  }
  else if(playerData.value.faction === 'allied') {
    return getCheckedAlliedUnits.value
  }
  return []
})

let containerClass = '';
let labelsContainerClass = '';
let moneyContainerClass = '';
let powerContainerClass = '';
if(props.align === 'start') {
  containerClass = 'justify-start'
  labelsContainerClass = 'justify-start'
  moneyContainerClass = 'flex-row-reverse order-1'
  powerContainerClass = 'flex-row order-2 ml-4'
}
else if(props.align === 'end') {
  containerClass = 'justify-end'
  labelsContainerClass = 'justify-end'
  moneyContainerClass = 'flex-row  order-2'
  powerContainerClass = 'flex-row-reverse order-1 mr-4'
}

watch(running, (running) => {
  if(running) {
    initFetchValues(unitsStore, gameStore, player.value)
  }
})

function getUnitCount(unit: string) {
  return playerData.value.units.find(u => u.name === unit)?.count ?? 0
}

</script>

<template>
  <div v-if="running && player && playerData">


    <div :class="'flex gap-2 flex-wrap ' + containerClass">

      <UnitBlock v-for="unit in units"
                 :unit="unit"
                 :count="getUnitCount(unit.name)"
                 :color="ColorsProvider.getColor(player.color)" />

    </div>


    <div :class="'flex mt-2 ' + labelsContainerClass">
      <div :class="'flex align-middle font-bold text-white gap-2 ' + moneyContainerClass">
        <div>
          {{ playerData.balance }}
        </div>
        <svg class="inline-block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div :class="'flex align-middle gap-2 font-bold text-red-500 animate-pulse ' + powerContainerClass" v-if="playerData.is_low_power">
        <svg class="inline-block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457L3 3m5.457 5.457l7.086 7.086m0 0L21 21" />
        </svg>
        <div>
          LOW POWER
        </div>
      </div>
    </div>

  </div>

</template>

<style scoped>
</style>

<script setup lang="ts">
import {Player, useGameStore} from "../stores/GameStore";
import {computed, toRefs, watch} from "vue";
import {initFetchValues, useUnitsStore} from "../stores/UnitsStore";
import {storeToRefs} from "pinia";
import UnitBlock from "./UnitBlock.vue";
import {useMetadataStore} from "../stores/MetadataStore";
import Color from "../models/Color";

const props = withDefaults(
    defineProps<{
      player: Player,
      color: Color,
      running: boolean
      align: 'start' | 'end'
      direction: 'row' | 'column'
    }>(), {
      align: 'start',
      direction: 'row'
    })

const { player, running, direction } = toRefs(props)
const unitsStore = useUnitsStore()
const gameStore = useGameStore()
const metadataStore = useMetadataStore()

const { getCheckedSovietUnits, getCheckedAlliedUnits } = storeToRefs(metadataStore)
const { getPlayer1Color, getPlayer2Color } = storeToRefs(gameStore)

const playerData = computed(() => {
  return unitsStore.players[player.value.color]
})
const units = computed(() => {

  if(!playerData.value) {
    return getCheckedSovietUnits.value
  }

  if(playerData.value.faction === 'soviet') {
    return getCheckedSovietUnits.value
  }
  else if(playerData.value.faction === 'allied') {
    return getCheckedAlliedUnits.value
  }
  return []
})

const { containerClass, labelsContainerClass, moneyContainerClass, powerContainerClass } = initAlignment()
const { containerDirectionClass, labelsDirectionContainerClass, iconSize, moneyDirectionContainerClass, powerDirectionContainerClass } = initDirection()

function initAlignment() {
  let containerClass = '';
  let labelsContainerClass = '';
  let moneyContainerClass = '';
  let powerContainerClass = '';
  if(props.align === 'start') {
    containerClass = 'justify-start'
    labelsContainerClass = 'justify-start'
    moneyContainerClass = 'flex-row-reverse order-1'
    powerContainerClass = 'flex-row order-2 ml-6'
  }
  else if(props.align === 'end') {
    containerClass = 'justify-end'
    labelsContainerClass = 'justify-end'
    moneyContainerClass = 'flex-row  order-2'
    powerContainerClass = 'flex-row-reverse order-1 mr-6'
  }
  return {
    containerClass,
    labelsContainerClass,
    moneyContainerClass,
    powerContainerClass
  }
}
function initDirection() {
  let containerDirectionClass = '';
  let labelsDirectionContainerClass = '';
  let iconSize = '';
  let moneyDirectionContainerClass = '';
  let powerDirectionContainerClass = '';
  if(props.direction === 'row') {
    containerDirectionClass = 'flex-row'
    labelsDirectionContainerClass = ' text-2xl'
    iconSize = ' w-8 h-8'
  }
  else if(props.direction === 'column') {
    containerDirectionClass = 'flex-col gap-1'
    labelsDirectionContainerClass = ' w-[120px] flex-col text-lg'
    iconSize = ' w-6 h-6'
    moneyDirectionContainerClass = ' px-1 mb-2 flex justify-between'
    powerDirectionContainerClass = ' px-1 mb-2 flex justify-between'
  }
  return {
    containerDirectionClass, labelsDirectionContainerClass, iconSize, moneyDirectionContainerClass, powerDirectionContainerClass
  }
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

  <Transition name="fade">
    <div v-if="running && player && playerData">


      <div :class="'flex gap-1 flex-wrap ' + containerClass + ' ' + containerDirectionClass">

        <UnitBlock v-for="unit in units"
                   :unit="unit"
                   :count="getUnitCount(unit.name)"
                   :color="props.color"
                   :direction="props.direction"
        />

      </div>


      <div :class="'flex mt-2 ' + labelsContainerClass + ' ' + labelsDirectionContainerClass">
        <div :class="'flex align-middle font-bold text-white gap-2 ' + moneyContainerClass + ' ' + moneyDirectionContainerClass">
          <span class="drop-shadow-lg">
            {{ playerData.balance }}
          </span>
          <svg class="inline-block" :class="iconSize" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div v-if="playerData.is_low_power" :class="'flex align-middle gap-2 font-bold text-red-500 animate-pulse ' + powerContainerClass + ' ' + powerDirectionContainerClass">
          <svg class="inline-block" :class="iconSize" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457L3 3m5.457 5.457l7.086 7.086m0 0L21 21" />
          </svg>
          <div>
            LOW POWER
          </div>
        </div>
        <div v-else :class="'flex align-middle gap-2 font-bold text-green-300 text-white ' + powerContainerClass + ' ' + powerDirectionContainerClass">
          <svg class="inline-block" :class="iconSize" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
          <div>
            POWER
          </div>
        </div>
      </div>

    </div>
    <div v-else>
      <div :class="'flex gap-1 flex-wrap ' + containerClass + ' ' + containerDirectionClass">
        <UnitBlock v-for="unit in units"
                   :unit="unit"
                   :count="'&nbsp;'"
                   :color="props.color"
                   :direction="props.direction"
        />
      </div>
      <div :class="'flex mt-2 ' + labelsContainerClass + ' ' + labelsDirectionContainerClass">
        <div :class="'flex align-middle gap-2 font-bold text-green-300 text-white ' + powerContainerClass + ' ' + powerDirectionContainerClass">
          <svg class="inline-block w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
          <div>
            POWER
          </div>
        </div>
        <div :class="'flex align-middle font-bold text-white gap-2 ' + moneyContainerClass + ' ' + moneyDirectionContainerClass">
          <span class="drop-shadow-lg">
            0
          </span>
          <svg class="inline-block " :class="iconSize" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>
  </Transition>


</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

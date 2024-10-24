<script setup lang="ts">
import {Player, useGameStore} from "../stores/GameStore";
import {computed, toRefs, watch} from "vue";
import {initFetchValues, useUnitsStore} from "../stores/UnitsStore";
import {storeToRefs} from "pinia";
import UnitBlock from "./UnitBlock.vue";
import {useMetadataStore} from "../stores/MetadataStore";
import Color from "../models/Color";
import ColoredCard from "./ColoredCard.vue";
import MoneyIcon from "./icons/MoneyIcon.vue";
import PowerIcon from "./icons/PowerIcon.vue";

const props = withDefaults(
    defineProps<{
      player: Player,
      color: Color,
      running: boolean,
      align: 'start' | 'end',
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
    powerContainerClass = 'flex-row order-2 '
  }
  else if(props.align === 'end') {
    containerClass = 'justify-end'
    labelsContainerClass = 'justify-end'
    moneyContainerClass = 'flex-row  order-2'
    powerContainerClass = 'flex-row-reverse order-1 '
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
    if(props.align === 'start') {
      powerDirectionContainerClass = 'ml-6'
    }
    else if(props.align === 'end') {
      powerDirectionContainerClass = 'mr-6'
    }
  }
  else if(props.direction === 'column') {
    containerDirectionClass = 'flex-col gap-1'
    labelsDirectionContainerClass = ' w-[120px] flex-col text-lg'
    iconSize = ' w-6 h-6'
    moneyDirectionContainerClass = ' px-1 mb-1 flex justify-between'
    powerDirectionContainerClass = ' px-1 mb-0 flex justify-between m-0 '
  }
  return {
    containerDirectionClass, labelsDirectionContainerClass, iconSize, moneyDirectionContainerClass, powerDirectionContainerClass
  }
}

function getUnitCount(unit: string) {
  return playerData.value.units.find(u => u.name === unit)?.count ?? 0
}

</script>

<template>

    <div v-if="running && player && playerData">

      <ColoredCard :color="props.color" :direction="props.direction" class="mb-1">
        <div :class="'flex mt-0 w-full ' + labelsContainerClass + ' ' + labelsDirectionContainerClass">
          <div :class="'flex align-middle font-bold text-white gap-2 ' + moneyContainerClass + ' ' + moneyDirectionContainerClass">
            <span class="drop-shadow-lg">
              {{ playerData.balance }}
            </span>
            <MoneyIcon :class="iconSize" />
          </div>
          <div v-if="playerData.is_low_power" :class="'flex align-middle gap-2 font-bold text-red-500 animate-pulse ' + powerContainerClass + ' ' + powerDirectionContainerClass">
            <PowerIcon :class="iconSize" />
            <div>
              LOW
            </div>
          </div>
          <div v-else :class="'flex align-middle gap-2 font-bold text-green-300 text-white ' + powerContainerClass + ' ' + powerDirectionContainerClass">
            <PowerIcon :class="iconSize" />
            <div>
              OK
            </div>
          </div>
        </div>
      </ColoredCard>

      <div :class="'flex gap-0.5 flex-wrap ' + containerClass + ' ' + containerDirectionClass">

        <UnitBlock v-for="unit in units"
                   :unit="unit"
                   :count="getUnitCount(unit.name)"
                   :color="props.color"
                   :direction="props.direction"
        />

      </div>




    </div>
    <div v-else>

      <ColoredCard :color="props.color" :direction="props.direction" class="mb-1">
        <div :class="'flex mt-0 w-full ' + labelsContainerClass + ' ' + labelsDirectionContainerClass">
          <div :class="'flex align-middle gap-2 font-bold text-green-300 text-white ' + powerContainerClass + ' ' + powerDirectionContainerClass">
            <PowerIcon :class="iconSize" />
            <div>
              OK
            </div>
          </div>
          <div :class="'flex align-middle font-bold text-white gap-2 ' + moneyContainerClass + ' ' + moneyDirectionContainerClass">
            <span class="drop-shadow-lg">
              0
            </span>
            <MoneyIcon :class="iconSize" />
          </div>
        </div>
      </ColoredCard>

      <div :class="'flex gap-1 flex-wrap ' + containerClass + ' ' + containerDirectionClass">
        <UnitBlock v-for="unit in units"
                   :unit="unit"
                   :count="'&nbsp;'"
                   :color="props.color"
                   :direction="props.direction"
        />
      </div>
    </div>


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

<script setup lang="ts">
import Nav from "../components/Nav.vue";
import {useRoute} from "vue-router";
import {onMounted, Ref, ref} from "vue";
import UnitsCounter from "../components/UnitsCounter.vue";
import {useGameStore, initIsRunning} from "../stores/GameStore";
import ColorsProvider from "../providers/ColorsProvider";
import { computed } from 'vue'
import {storeToRefs} from "pinia";
import {initFetchValues, useUnitsStore} from "../stores/UnitsStore";
import {useMetadataStore} from "../stores/MetadataStore";
import ConfigProvider from "../providers/ConfigProvider";
import SmallButton from "../components/form/SmallButton.vue";

enum Views {
  Scoreboard = 'scoreboard',
  TopUnitsWithScoreboard = 'top-units-with-scoreboard',
  StandaloneUnitsRowPlayer1 = 'standalone-unit-row-player1',
  StandaloneUnitsRowPlayer2 = 'standalone-unit-row-player2',
  VerticalDualPlayerUnits = 'vertical-dual-player-units',
}

const route = useRoute()
const isSlave: Ref<boolean> = ref(true)
const view: Ref<undefined | string> = ref(undefined)
const userAgent: Ref<string> = ref('')
let wsConnection = null

const btnUseViewText = 'Copy URL to use this layout'
const gameStore = useGameStore()
const metadataStore = useMetadataStore()

const { getPlayer1Color, getPlayer2Color } = storeToRefs(gameStore)

onMounted(() => {
  isSlave.value = route.query.hasOwnProperty('nonav')
  view.value = route.query.view || (isSlave.value ? Views.TopUnitsWithScoreboard : undefined)
  userAgent.value = navigator.userAgent

  initIsRunning(gameStore)

  if(!isSlave.value) {
    return
  }

  wsConnection = new WebSocket(ConfigProvider.config.client.ws_url + '?type=slave')

  wsConnection.onopen = () => {
    console.log('Connected to websocket')
  }

  wsConnection.onmessage = (message) => {
    const data = JSON.parse(message.data)
    if(data.message.action === 'update-store') {
      if(data.message.store == 'game') {
        gameStore.$patch(data.message.data)
      }
      else if (data.message.store == 'metadata') {
        metadataStore.$patch(data.message.data)
      }
    }
  }

})

function useView(view: string) {
  window.location.href = `${ConfigProvider.config.client.base_path}/scoreboard?nonav&view=${view}`
}

</script>

<template>
  <div v-if="!isSlave">
    <Nav />
  </div>
  <div :class="!isSlave ? 'p-2 mb-4' : ''">

    <h1 v-if="!view" class="text-2xl font-bold border-b m-1 mb-4 ">
      Scoreboard
      <SmallButton type="button" class="ml-4 mb-1" @click="useView(Views.Scoreboard)">
        {{ btnUseViewText }}
      </SmallButton>
    </h1>
    <div v-if="!view || view === Views.Scoreboard" class="flex justify-center gap-2">

      <div class="w-2/6 text-white">
        <div class="text-center leading-none">
          <div class="">
            <div class="flex justify-center">
              <div class="flex-grow border-2 p-2 rounded-l-xl border-r-0 text-2xl font-bold border-gray-500 shadow-lg mt-3 mb-1.5 z-10"
                   :class="'bg-gradient-to-r ' + (getPlayer1Color
                   ? getPlayer1Color.gradientFromClassNames + ' ' + getPlayer1Color.gradientToClassNames
                   : 'gray')"
              >
                <div class="flex">
                  <div class="flex-grow text-left self-center leading-none pb-0.5 capitalize px-4">
                    {{ gameStore.player1.name }}
                  </div>
                </div>
              </div>
              <div class="flex-grow border-2 border-gray-500 text-xl font-bold bg-gray-700 shadow-lg rounded-xl z-20">
                <div class="flex h-full items-center">
                  <div class="w-1/2 h-full text-center text-4xl px-2 text-white">
                    <div class="flex items-center justify-center h-full">
                      <div>
                        {{ gameStore.player1.score }}
                      </div>
                    </div>
                  </div>
                  <div class="w-1/2 h-full text-center text-white text-4xl px-2 border-r-0">
                    <div class="flex items-center justify-center h-full">
                      <div>
                        {{ gameStore.player2.score }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-grow border-2 p-2 rounded-r-xl border-l-0 text-2xl font-bold border-gray-500 shadow-lg mt-3 mb-1.5 z-10"
                   :class="'bg-gradient-to-l ' + (getPlayer2Color
                   ? getPlayer2Color.gradientFromClassNames + ' ' + getPlayer2Color.gradientToClassNames
                   : 'gray')"
              >
                <div class="flex">
                  <div class="flex-grow text-right self-center leading-none pb-0.5 capitalize px-4">
                    {{ gameStore.player2.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center" style="margin-top:-10px;">
            <div class="border-2 border-t-0 border-gray-500 p-1 text-xl text-white w-2/5 rounded-b-xl bg-gray-600 z-0 font-bold leading-none shadow-lg shadow-inner pt-3">
              {{ gameStore.gameFormat}}
            </div>
          </div>
        </div>
      </div>

    </div>

    <h1 v-if="!view" class="text-2xl font-bold border-b m-1 mb-4 ">
      Top unit counter with scoreboard
      <SmallButton type="button" class="ml-4 mb-1" @click="useView(Views.TopUnitsWithScoreboard)">
        {{ btnUseViewText }}
      </SmallButton>
    </h1>
    <div v-if="!view || view === Views.TopUnitsWithScoreboard" class="flex justify-between gap-2">
      <div class="flex-grow">
        <UnitsCounter :running="gameStore.gameRunning" :player="gameStore.player1" :color="getPlayer1Color" align="end" />
      </div>

      <div class="w-2/6 text-white">
        <div class="text-center leading-none">
          <div class="">
            <div class="flex justify-center">
              <div class="flex-grow border-2 p-2 rounded-l-xl border-r-0 text-2xl font-bold border-gray-500 shadow-lg mt-3 mb-1.5 z-10"
                   :class="'bg-gradient-to-r ' + (getPlayer1Color
                   ? getPlayer1Color.gradientFromClassNames + ' ' + getPlayer1Color.gradientToClassNames
                   : 'gray')"
                >
                <div class="flex">
                  <div class="flex-grow text-left self-center leading-none pb-0.5 capitalize px-4">
                    {{ gameStore.player1.name }}
                  </div>
                </div>
              </div>
              <div class="flex-grow border-2 border-gray-500 text-xl font-bold bg-gray-700 shadow-lg rounded-xl z-20">
                <div class="flex h-full items-center">
                  <div class="w-1/2 h-full text-center text-4xl px-2 text-white">
                      <div class="flex items-center justify-center h-full">
                        <div>
                          {{ gameStore.player1.score }}
                        </div>
                      </div>
                  </div>
                  <div class="w-1/2 h-full text-center text-white text-4xl px-2 border-r-0">
                    <div class="flex items-center justify-center h-full">
                      <div>
                        {{ gameStore.player2.score }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-grow border-2 p-2 rounded-r-xl border-l-0 text-2xl font-bold border-gray-500 shadow-lg mt-3 mb-1.5 z-10"
                   :class="'bg-gradient-to-l ' + (getPlayer2Color
                   ? getPlayer2Color.gradientFromClassNames + ' ' + getPlayer2Color.gradientToClassNames
                   : 'gray')"
              >
                <div class="flex">
                  <div class="flex-grow text-right self-center leading-none pb-0.5 capitalize px-4">
                    {{ gameStore.player2.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center" style="margin-top:-10px;">
            <div class="border-2 border-t-0 border-gray-500 p-1 text-xl text-white w-2/5 rounded-b-xl bg-gray-600 z-0 font-bold leading-none shadow-lg shadow-inner pt-3">
              {{ gameStore.gameFormat}}
            </div>
          </div>
        </div>
      </div>

      <div class="flex-grow">
        <UnitsCounter :running="gameStore.gameRunning" :player="gameStore.player2" :color="getPlayer2Color" align="start" />
      </div>
    </div>


    <h1 v-if="!view" class="text-2xl font-bold border-b m-1 mb-4 mt-4">
      Standalone unit counter player 1
      <SmallButton type="button" class="ml-4 mb-1" @click="useView(Views.StandaloneUnitsRowPlayer1)">
        {{ btnUseViewText }}
      </SmallButton>
    </h1>
    <div  v-if="!view || view === Views.StandaloneUnitsRowPlayer1">
      <UnitsCounter :running="gameStore.gameRunning" :player="gameStore.player1" :color="getPlayer1Color" align="start" />
    </div>


    <h1 v-if="!view" class="text-2xl font-bold border-b m-1 mb-4 mt-4">
      Standalone unit counter player 2
      <SmallButton type="button" class="ml-4 mb-1" @click="useView(Views.StandaloneUnitsRowPlayer2)">
        {{ btnUseViewText }}
      </SmallButton>
    </h1>
    <div  v-if="!view || view === Views.StandaloneUnitsRowPlayer2">
      <UnitsCounter :running="gameStore.gameRunning" :player="gameStore.player2" :color="getPlayer2Color" align="start" />
    </div>


    <h1 v-if="!view" class="text-2xl font-bold border-b m-1 mb-4 mt-4">
      Vertical dual player unit counter
      <SmallButton type="button" class="ml-4 mb-1" @click="useView(Views.VerticalDualPlayerUnits)">
        {{ btnUseViewText }}
      </SmallButton>
    </h1>
    <div  v-if="!view || view === Views.VerticalDualPlayerUnits" class="flex gap-1">
      <div width="">
        <UnitsCounter :running="gameStore.gameRunning" :player="gameStore.player1" :color="getPlayer1Color" align="start" direction="column" />
      </div>
      <div>
        <UnitsCounter :running="gameStore.gameRunning" :player="gameStore.player2" :color="getPlayer2Color" align="start" direction="column"/>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>

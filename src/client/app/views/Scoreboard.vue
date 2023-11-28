<script setup>
import Nav from "../components/Nav.vue";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import UnitsCounter from "../components/UnitsCounter.vue";
import {useGameStore, initIsRunning} from "../stores/GameStore";
import ColorsProvider from "../providers/ColorsProvider";
import { computed } from 'vue'
import {storeToRefs} from "pinia";
import {initFetchValues, useUnitsStore} from "../stores/UnitsStore";
import {useMetadataStore} from "../stores/MetadataStore";

const route = useRoute()
const isSlave = ref(true)
const userAgent = ref('')
let wsConnection = null

const gameStore = useGameStore()
const metadataStore = useMetadataStore()

const { getPlayer1Color, getPlayer2Color } = storeToRefs(gameStore)

onMounted(() => {
  isSlave.value = route.query.hasOwnProperty('nonav')
  userAgent.value = navigator.userAgent

  initIsRunning(gameStore)

  if(!isSlave.value) {
    return
  }

  wsConnection = new WebSocket(import.meta.env.VITE_WS_URL + '?type=slave')

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

</script>

<template>
  <div v-if="!isSlave">
    <Nav />
    <div class="px-2 py-2 flex justify-end">
      <a href="?nonav" class="text-sm">Hide nav</a>
    </div>
  </div>
  <div :class="!isSlave ? 'p2' : ''">

    <div class="flex justify-between gap-2">
      <div class="w-1/4">
        <UnitsCounter :running="gameStore.gameRunning" :player="gameStore.player1" align="end" />
      </div>

      <div class="flex-grow">
        <div class="text-center">
          <div class="">
            <div class="flex justify-center">
              <div class="flex-grow border-4 p-2 rounded-l-2xl border-r-2 text-2xl font-bold bg-gray-400"
                :style="'background-color:' + (getPlayer1Color ? getPlayer1Color.hex : 'gray')">
                <div class="flex">
                  <div class="flex-grow text-left self-center">
                    {{ gameStore.player1.name }}
                  </div>
                  <div class="text-4xl pr-2">
                    {{ gameStore.player1.score }}
                  </div>
                </div>
              </div>
              <div class="flex-grow border-4 p-2 rounded-r-2xl border-l-2 text-2xl font-bold bg-gray-400"
                   :style="'background-color:' + (getPlayer2Color ? getPlayer2Color.hex : 'gray')">
                <div class="flex">
                  <div class="text-4xl pl-2">
                    {{ gameStore.player2.score }}
                  </div>
                  <div class="flex-grow text-right self-center">
                    {{ gameStore.player2.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center">
            <div class="border-4 border-t-0 border-black p-1 text-xl w-1/6 rounded-b-2xl bg-white font-bold">
              {{ gameStore.gameFormat}}
            </div>
          </div>
        </div>
      </div>

      <div class="w-1/4">
        <UnitsCounter :running="gameStore.gameRunning" :player="gameStore.player2" align="start" />
      </div>
    </div>


  </div>
</template>

<style scoped>

</style>

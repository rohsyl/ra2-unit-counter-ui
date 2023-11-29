<script setup>
import Nav from "../components/Nav.vue";
import Card from "../components/Card.vue";
import {useMetadataStore} from "../stores/MetadataStore";
import {storeToRefs} from "pinia";
import CheckedUnitPreview from "../components/CheckedUnitPreview.vue";
import {onMounted, ref, watch} from "vue";
import InputText from "../components/form/InputText.vue";
import InputLabel from "../components/form/InputLabel.vue";
import ColorsProvider from "../providers/ColorsProvider";
import InputHelper from "../components/form/InputHelper.vue";
import {initIsRunning, useGameStore} from "../stores/GameStore";
import PlayerControl from "../components/PlayerControl.vue";
import Button from "../components/form/Button.vue";
import ConfigProvider from "../providers/ConfigProvider";

const metadataStore = useMetadataStore()
const gameStore = useGameStore()

const { getCheckedAlliedUnits, getCheckedSovietUnits, getMetadataState } = storeToRefs(metadataStore)
const { getState } = storeToRefs(gameStore)
const prefix = ConfigProvider.config.client.base_path;

let wsConnection = null

onMounted(() => {
  wsConnection = new WebSocket(ConfigProvider.config.client.ws_url + '?type=master')
  wsConnection.onopen = () => {
    console.log('Connected to websocket')
  }

  // poll every x seconds to check if a game is running
  initIsRunning(gameStore)
})

watch(
    gameStore,
    (state) => {
      if(wsConnection) {
        wsConnection.send(JSON.stringify({
          action: 'message-slaves',
          message: {
            action: 'update-store',
            store: 'game',
            data: getState.value
          }
        }))
        wsConnection.send(JSON.stringify({
          action: 'message-slaves',
          message: {
            action: 'update-store',
            store: 'metadata',
            data: getMetadataState.value
          }
        }))
      }
    },
    { deep: true }
)

function resetScore() {
  gameStore.player1.score = 0
  gameStore.player2.score = 0
}

function refreshSlave() {
  if(wsConnection) {
    wsConnection.send(JSON.stringify({
      action: 'message-slaves',
      message: {
        action: 'refresh'
      }
    }))
  }

}


</script>

<template>
  <Nav />
  <div class="p-2">

    <div v-if="gameStore.error">
      <div class="flex items-center p-2 mb-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
        <div>
          <span class="font-medium">
            {{ gameStore.error }}
          </span>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="gameStore.gameRunning">
        <div class="flex items-center p-2 mb-2 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
          <div>
            <span class="font-medium">A game is running !</span>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="flex items-center p-2 mb-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600" role="alert">
          <div>
            <span class="font-medium">No game running...</span>
          </div>
        </div>
      </div>
    </div>



    <div class="flex gap-2 mb-4">
      <div class="w-1/2">
        <Card>
          <PlayerControl :player="gameStore.player1" :player-number="'1'" />
        </Card>
      </div>
      <div class="w-1/2">
        <Card>
          <PlayerControl :player="gameStore.player2" :player-number="'2'" />
        </Card>
      </div>
    </div>

    <Card class="mb-4">
      <h2 class="text-2xl font-bold mb-4 border-b">
        Game configurations
      </h2>
      <div>
        <div class="mb-2">
          <InputLabel for="gameFormat">Game format</InputLabel>
          <InputText v-model="gameStore.gameFormat" id="gameFormat" placeholder="Game format" class="w-full"/>
          <InputHelper>Set the game format here. Can be anything (BO3-5-7, etc...). It will be shown on the scoreboard.</InputHelper>
        </div>
        <div class="mt-6">
          <InputLabel>Actions</InputLabel>
          <Button @click="resetScore">
            Reset score
          </Button>
          <Button @click="refreshSlave">
            Force reload scoreboard
          </Button>
        </div>
      </div>
    </Card>


    <Card>
      <h2 class="text-2xl font-bold mb-2 border-b">
        Units configurations
      </h2>
      <p class="mb-2">
        Preview of what units will be shown on the layout for each factions. Click here to :
        <router-link :to="prefix + '/settings'" class="text-blue-700 underline hover:text-blue-400">configure units</router-link>
      </p>
      <h4 class="text-xl font-bold mb-2 border-b">
        Allied units
        <img :src="prefix + '/assets/factions/allied.webp'" alt="Allied" class="inline-block h-6 mb-1" />
      </h4>
      <CheckedUnitPreview :units="getCheckedAlliedUnits" :color="ColorsProvider.getColor('blue')" class="mb-4" />
      <h4 class="text-xl font-bold mb-2 border-b">
        Soviet units
        <img :src="prefix + '/assets/factions/soviet.webp'" alt="Allied" class="inline-block h-6 mb-1" />
      </h4>
      <CheckedUnitPreview :units="getCheckedSovietUnits" :color="ColorsProvider.getColor('red')" class="mb-4" />
    </Card>

  </div>
</template>

<style scoped>

</style>

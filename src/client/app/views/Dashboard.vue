<script setup>
import Nav from "../components/Nav.vue";
import Card from "../components/Card.vue";
import {onMounted, onUnmounted, watch} from "vue";
import InputText from "../components/form/InputText.vue";
import InputLabel from "../components/form/InputLabel.vue";
import InputHelper from "../components/form/InputHelper.vue";
import {initIsRunning, useGameStore} from "../stores/GameStore";
import PlayerControl from "../components/PlayerControl.vue";
import Button from "../components/form/Button.vue";
import TeamControl from "../components/TeamControl.vue";
import {useMasterSync} from "../hooks/useMasterSync.ts";

const gameStore = useGameStore()

const { syncGameStore } = useMasterSync()

let unwatch;

onMounted(() => {
  // poll every x seconds to check if a game is running
  initIsRunning(gameStore)

  unwatch = watch(
      gameStore,
      () => {
        syncGameStore()
      },
      { deep: true }
  )
})

onUnmounted(() => {
  unwatch()
})


function resetScore() {
  gameStore.player1.score = 0
  gameStore.player2.score = 0
  gameStore.team1.score = 0
  gameStore.team2.score = 0
}

function setGameMode(mode) {
  gameStore.setGameMode(mode);
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


    <div class="mb-2">
      <Button @click="setGameMode('1v1')" class="mr-2 "
              :class="gameStore.gameMode === '1v1' ? '' : 'bg-gray-400 border-blue-700 text-black hover:text-white'">
       1v1
      </Button>
      <Button @click="setGameMode('2v2')" class="mr-2 text-black"
              :class="gameStore.gameMode === '2v2' ? '' : 'bg-gray-400 border-blue-700 text-black hover:text-white'">
        2v2
      </Button>
      <!--<Button @click="setGameMode('3v3')" class="mr-2 text-black"
              :class="gameStore.gameMode === '3v3' ? '' : 'bg-gray-400 border-blue-700 text-black hover:text-white'">
        3v3
      </Button>-->
    </div>


    <div v-if="gameStore.gameMode === '2v2' || gameStore.gameMode === '3v3'" class="flex flex-col md:flex-row gap-2 mb-2">
      <div class="w-full">
        <Card>
          <TeamControl :team="gameStore.team1" />
        </Card>
      </div>
      <div class="w-full">
        <Card>
          <TeamControl :team="gameStore.team2" />
        </Card>
      </div>
    </div>

    <div v-if="gameStore.gameMode === '1v1'" class="flex flex-col md:flex-row gap-2 mb-2">
      <div class="w-full">
        <Card>
          <PlayerControl :player="gameStore.player1" :player-number="'1'" />
        </Card>
      </div>
      <div class="w-full">
        <Card>
          <PlayerControl :player="gameStore.player2" :player-number="'2'" />
        </Card>
      </div>
    </div>

    <Card class="mb-2">
      <div class="flex gap-2">
        <div class="w-1/2">
          <InputLabel for="gameFormat">Game format</InputLabel>
          <InputText v-model="gameStore.gameFormat" id="gameFormat" placeholder="Game format" class="w-full"/>
          <InputHelper>Set the game format</InputHelper>
        </div>
        <div class="w-1/2">
          <InputLabel>Actions</InputLabel>
          <div class="">
            <Button @click="resetScore" class="mr-2 mt-1">
              Reset score
            </Button>
            <!--<Button @click="refreshSlave" class=" mt-1">
              Force reload scoreboard
            </Button>-->
          </div>
        </div>
      </div>
    </Card>


    <!--<Card>
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
    </Card>-->

  </div>
</template>

<style scoped>

</style>

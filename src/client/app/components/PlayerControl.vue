<script setup lang="ts">
import InputText from "./form/InputText.vue";
import InputLabel from "./form/InputLabel.vue";
import InputSelect from "./form/InputSelect.vue";
import {Player, useGameStore} from "../stores/GameStore";
import {toRefs} from "vue";
import ColorsProvider from "../providers/ColorsProvider";
import Button from "./form/Button.vue";
import {useMetadataStore} from "../stores/MetadataStore";
import {storeToRefs} from "pinia";
import AssetsProvider from "../providers/AssetsProvider";

const props = defineProps<{
  player: Player,
  playerNumber: string
}>()
const { player } = toRefs(props)


const assets = new AssetsProvider();
const metadataStore = useMetadataStore()
const gameStore = useGameStore();

const colors = [{value: '', label: 'Automatic'}].concat(
    Object.values(ColorsProvider.getColors()).map(color => {
      return color.toOption()
    })
);

function increment() {
  player.value.score++
}
function decrement() {
  if(player.value.score === 0) return
  player.value.score--
}
</script>

<template>

  <div>

    <div class="flex justify-center mb-2 gap-1 font-bold text-white rounded-md py-1 border-2 " :class="gameStore.getColor(player)?.solidBackgroundClassNames + ' ' + gameStore.getColor(player)?.borderClassNames">
      {{ player.name }}
      <span v-if="player.country && player.faction">
        <img :src="assets.getAssetPath(metadataStore.getCountry(player.faction, player.country).imageUrl)" :alt="player.country" />
      </span>
    </div>

    <div class="flex justify-between">

      <div>
        <Button @click="decrement">
          <span class="font-bold">-</span>
        </Button>
      </div>

      <div class="text-center mb-2 flex-grow">
        <h1 class="text-3xl">{{ player.score }}</h1>
      </div>

      <div>
        <Button @click="increment">
          <span class="font-bold">+</span>
        </Button>
      </div>

    </div>

    <div class="flex gap-2">
      <div class="w-1/2 flex-grow">
        <InputLabel for="player_1">Player {{ playerNumber }} Name</InputLabel>
        <InputText v-model="player.name" id="player_1" placeholder="Player 1" class="w-full" />
      </div>
      <div class="w-1/2 flex-grow">
        <InputLabel for="player_1_color">Color</InputLabel>
        <InputSelect v-model="player.color" :options="colors" id="player_1_color" class="w-full" />
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
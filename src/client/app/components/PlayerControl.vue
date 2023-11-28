<script setup lang="ts">
import InputText from "./form/InputText.vue";
import InputLabel from "./form/InputLabel.vue";
import InputSelect from "./form/InputSelect.vue";
import {Player} from "../stores/GameStore";
import {toRefs} from "vue";
import ColorsProvider from "../providers/ColorsProvider";
import Button from "./form/Button.vue";

const props = defineProps<{
  player: Player,
  playerNumber: string
}>()
const { player } = toRefs(props)

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
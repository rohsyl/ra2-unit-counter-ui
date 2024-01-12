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

</script>

<template>

  <div>
    <div class="flex gap-2">
      <div class="w-1/2 flex-grow">
        <InputText v-model="player.name" id="player_1" :placeholder="'Player ' + playerNumber" class="w-full" />
      </div>
      <div class="w-1/2 flex-grow">
        <InputSelect v-model="player.color" :options="colors" id="player_1_color" class="w-full" />
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
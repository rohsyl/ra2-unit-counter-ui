<script setup lang="ts">
import InputText from "./form/InputText.vue";
import InputLabel from "./form/InputLabel.vue";
import InputSelect from "./form/InputSelect.vue";
import {Player, Team, useGameStore} from "../stores/GameStore";
import {toRefs} from "vue";
import ColorsProvider from "../providers/ColorsProvider";
import Button from "./form/Button.vue";
import SimplePlayerControl from "./SimplePlayerControl.vue";
import AssetsProvider from "../providers/AssetsProvider";
import {useMetadataStore} from "../stores/MetadataStore";

const props = defineProps<{
  team: Team
}>()
const { team } = toRefs(props)
const assets = new AssetsProvider();
const metadataStore = useMetadataStore()
const gameStore = useGameStore();

const colors = [{value: '', label: 'Automatic'}].concat(
    Object.values(ColorsProvider.getColors()).map(color => {
      return color.toOption()
    })
);

function increment() {
  team.value.score++
}
function decrement() {
  if(team.value.score === 0) return
  team.value.score--
}
</script>

<template>

  <div>
    <div class="flex justify-between gap-2 items-center">

      <div class="flex-grow">
        <div v-for="(player, index) in team.players" :key="index">
        <div class="flex justify-center mb-1 gap-1 font-bold text-white rounded-md py-1 border-2 " :class="gameStore.getColor(player)?.solidBackgroundClassNames + ' ' + gameStore.getColor(player)?.borderClassNames">
          {{ player.name }}
            <span v-if="player.country && player.faction">
            <img :src="assets.getAssetPath(metadataStore.getCountry(player.faction, player.country).imageUrl)" :alt="player.country" />
          </span>
        </div>
        </div>
      </div>
      <div class="text-center">
        <h1 class="text-3xl mb-2">{{ team.score }}</h1>
        <div class="flex gap-1">
          <div>
            <Button @click="decrement">
              <span class="font-bold">-</span>
            </Button>
          </div>
          <div>
            <Button @click="increment">
              <span class="font-bold">+</span>
            </Button>
          </div>
        </div>

      </div>
    </div>

    <div class="flex gap-2 mt-2">
      <div class="w-1/2 flex-grow">
        <InputText v-model="team.name" id="team_name" :placeholder="'Team name'" class="w-full" />
      </div>
    </div>

    <hr class="my-2" />

    <div>
      <div v-for="(player, index) in team.players" :key="index" class="mb-2">
        <SimplePlayerControl :player="player" :player-number="(index + 1).toString()" />
      </div>
    </div>

  </div>

</template>

<style scoped>

</style>
<script setup lang="ts">
  import Nav from './components/Nav.vue'
  import {onMounted, ref} from "vue";

  import { useMetadataStore } from "./stores/MetadataStore";

  const loading = ref(true)
  const metadataStore = useMetadataStore()

  onMounted(() => {
    metadataStore.loadMetadata().then(() => {
      loading.value = false
    })
  })

</script>

<template>
  <div v-if="loading">
    Loading ...
  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</template>

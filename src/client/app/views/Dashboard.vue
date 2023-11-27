<script setup>
import Nav from "../components/Nav.vue";
import Card from "../components/Card.vue";
</script>

<template>
  <Nav />
  <div class="mt-2 p-4">

    <div class="flex gap-2">
      <div class="w-1/2">
        <Card>
          <div>
            player 1
          </div>
          <div>
            p1 color
          </div>
        </Card>
      </div>
      <div class="w-1/2">
        <Card>
          <div>
            player 2
          </div>
          <div>
            p2 color
          </div>
        </Card>
      </div>
    </div>


  </div>
</template>

<style scoped>

</style>

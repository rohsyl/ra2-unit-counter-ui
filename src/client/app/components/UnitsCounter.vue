<script setup>

</script>

<template>
  <div class="flex">
      <div class="unit-block">
        <img src="/assets/rhino.webp" class="unit-block-img" />
        <div class="unit-block-text" id="1"></div>
      </div>
    <div class="unit-block">
      <img src="/assets/soviet_attack_dog.webp" class="unit-block-img" />
      <div class="unit-block-text" id="2"></div>
    </div>
  </div>
</template>

<style scoped>
.unit-block {
  background: linear-gradient(0deg, rgba(156,0,0,1) 0%, rgba(0,0,0,0.32816876750700286) 100%);
  border: 2px solid red;
  border-radius: 4px;
  padding : 6px;
  margin-right: 6px;
}

.unit-block-img {
  width: 60px;
  height: 48px;
}

.unit-block-text {
  text-align: center;
  line-height: 35px;
  font-weight: bold;
  height : 35px;
  font-size: 30px;
  color: white;
}
</style>

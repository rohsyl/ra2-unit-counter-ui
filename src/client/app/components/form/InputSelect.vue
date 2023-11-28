<script setup lang="ts">
const props = defineProps<{
  id?: string
  options: {
    value: string
    label: string
  }[]
  required?: boolean
  modelValue: string
}>()
defineEmits(['update:modelValue'])

</script>

<template>
  <select
      :id="props.id"
      @input="$emit('update:modelValue', $event.target.value)"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :class="$attrs.class"
      :required="props.required"
  >
    <option v-for="option in props.options" :key="option.value" :value="option.value" :selected="modelValue == option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped>

</style>
<script setup lang="ts">
const props = defineProps<{
  id?: string
  placeholder?: string
  required?: boolean
  modelValue: string
}>()
defineEmits(['update:modelValue'])

</script>

<template>
  <input type="text"
         :id="props.id"
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)"
         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         :class="$attrs.class"
         :placeholder="props.placeholder"
         :required="props.required" />
</template>

<style scoped>

</style>
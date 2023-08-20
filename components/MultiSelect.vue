<template>
    <ul class="flex flex-wrap gap-2">
        <li v-for="item in items" :key="item">
            <button type="button" class="btn px-3 py-2" :class="props.modelValue == item ? 'btn-primary' : 'btn-secondary'" @click="emit('update:modelValue', item)">{{ item }}</button>
        </li>
    </ul>
</template>

<script setup>
    const props = defineProps({
        modelValue: String,
        items: Array 
    })
    const emit = defineEmits(["update:modelValue"])
</script>
<template>
    <ul class="flex flex-wrap gap-2">
        <li v-for="item in items" :key="item">
            <button type="button" class="btn px-3 py-2" :class="props.modelValue == item ? 'btn-primary' : 'btn-secondary'" @click="emit('update:modelValue', item)">{{ capitalize(item) }}</button>
        </li>
    </ul>
</template>

<script setup>
    const props = defineProps({
        modelValue: String,
        items: Array 
    })
    const emit = defineEmits(["update:modelValue"])

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    }
</script>
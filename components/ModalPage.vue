<template>
    <Transition name="fade">
        <div v-if="props.modelValue" class="fixed top-0 left-0 z-50 h-0">
            <div class="w-screen h-screen flex items-center justify-center bg-backg-950 bg-opacity-30 background">
                <div class="flex flex-col p-3 bg-backg-200 border border-backg-400 rounded-2xl shadow-lg">
                    <div class="flex items-center justify-between">
                        <p class="text-lg font-bold">{{ props.title }}</p>
                        <button class="p-2 btn btn-primary self-end" @click="emit('update:modelValue', false)">
                            <SvgpathsPlusSvg class="stroke-backg-900 w-4 h-4 rotate-45" />
                        </button>
                    </div>
                    <slot></slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
const props = defineProps({
    title: String,
    modelValue: Boolean,
})
const emit = defineEmits(["update:modelValue"])
</script>
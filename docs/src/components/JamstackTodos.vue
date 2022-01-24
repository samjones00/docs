<template>
<div>
    <JamstackExamples v-bind="$props">
    <template #vue>
        <a href="https://vue-ssg.jamstacks.net/todomvc">
            <img src="/images/jamstack/todos-vue.png">
            <div class="text-center mb-3">
                vue-ssg.jamstacks.net/todomvc
            </div>
        </a>
        <div class="flex justify-center items-center">
            <a href="https://github.com/NetCoreTemplates/vue-ssg/blob/main/ui/src/stores/todos.ts" class="text-gray-600 hover:text-gray-500 text-lg">
                <Icon icon="noto:pineapple" class="w-6 h-6 align-middle" />
                todos.ts
            </a>
            <a href="https://github.com/NetCoreTemplates/vue-ssg/blob/main/ui/src/pages/TodoMvc.vue" class="ml-3 text-gray-600 hover:text-gray-500 text-lg">
                <Icon icon="logos:vue" class="w-6 h-6 align-middle" />
                TodoMvc.vue
            </a>
        </div>
    </template>
    <template #blazor>
        <a href="https://blazor-wasm.jamstacks.net/todomvc">
            <img src="/images/jamstack/todos-blazor.png">
            <div class="text-center mb-3">
                blazor-wasm.jamstacks.net/todomvc
            </div>
        </a>
        <div class="flex justify-center items-center">
            <a href="https://github.com/NetCoreTemplates/blazor-wasm/blob/main/MyApp.ServiceModel/Todos.cs" class="text-gray-600 hover:text-gray-500 text-lg">
                <Icon icon="oi:loop" class="ml-5 text-indigo-700 w-5 h-5 align-middle" />
                Todos.cs
            </a>
            <a href="https://github.com/NetCoreTemplates/blazor-wasm/blob/master/MyApp.Client/Pages/TodoMvc.razor" class="text-gray-600 hover:text-gray-500 text-lg">
                <Icon icon="simple-icons:blazor" class="ml-5 text-indigo-700 w-5 h-5 align-middle" />
                TodoMvc.razor
            </a>
        </div>
    </template>
    <template #nextjs>
        <a href="https://nextjs.jamstacks.net/todomvc">
            <img src="/images/jamstack/todos-nextjs.png">
            <div class="text-center mb-3">
                nextjs.jamstacks.net/todomvc
            </div>
        </a>
        <div class="flex justify-center items-center">
            <a href="https://github.com/NetCoreTemplates/nextjs/blob/main/ui/pages/todomvc.tsx" class="text-gray-600 hover:text-gray-500 text-lg">
                <Icon icon="logos:react" class="w-6 h-6 align-middle" />
                todomvc.tsx
            </a>
        </div>
    </template>
    </JamstackExamples>
</div>
</template>
<script setup lang="ts">
import JamstackExamples from "./JamstackExamples.vue"
import { Icon } from "@iconify/vue"
defineProps<{ body?: string }>()
</script>

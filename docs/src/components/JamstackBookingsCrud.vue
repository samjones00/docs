<template>
<div>
    <JamstackExamples v-bind="$props">
    <template #vue>
        <a href="https://vue-ssg.jamstacks.net/bookings-crud">
            <img src="/images/jamstack/bookings-vue.png">
            <div class="text-center mb-3">
                vue-ssg.jamstacks.net/bookings-crud
            </div>
        </a>
        <div class="flex justify-center items-center">
            <a href="https://github.com/NetCoreTemplates/vue-ssg/blob/main/ui/src/pages/bookings-crud/Index.vue" class="text-gray-600 hover:text-gray-500 text-lg">
                <Icon icon="logos:vue" class="w-6 h-6 align-middle" />
                Index.vue
            </a>
            <a href="https://github.com/NetCoreTemplates/vue-ssg/blob/main/ui/src/pages/bookings-crud/Create.vue" class="ml-3 text-gray-600 hover:text-gray-500 text-lg">
                <Icon icon="logos:vue" class="w-6 h-6 align-middle" />
                Create.vue
            </a>
            <a href="https://github.com/NetCoreTemplates/vue-ssg/blob/main/ui/src/pages/bookings-crud/Edit.vue" class="ml-3 text-gray-600 hover:text-gray-500 text-lg">
                <Icon icon="logos:vue" class="w-6 h-6 align-middle" />
                Edit.vue
            </a>
        </div>
    </template>
    <template #blazor>
        <a href="https://blazor-wasm.jamstacks.net/bookings-crud">
            <img src="/images/jamstack/bookings-blazor.png">
            <div class="text-center mb-3">
                blazor-wasm.jamstacks.net/bookings-crud
            </div>
        </a>
        <div class="flex justify-center items-center">
            <a href="https://github.com/NetCoreTemplates/blazor-wasm/blob/main/MyApp.Client/Pages/BookingsCrud/Index.razor" class="text-gray-600 hover:text-gray-500 text-lg">
                <Icon icon="simple-icons:blazor" class="ml-5 text-indigo-700 w-5 h-5 align-middle" />
                Index.razor
            </a>
            <a href="https://github.com/NetCoreTemplates/blazor-wasm/blob/main/MyApp.Client/Pages/BookingsCrud/Create.razor" class="text-gray-600 hover:text-gray-500 text-lg">
                <Icon icon="simple-icons:blazor" class="ml-5 text-indigo-700 w-5 h-5 align-middle" />
                Create.razor
            </a>
            <a href="https://github.com/NetCoreTemplates/blazor-wasm/blob/main/MyApp.Client/Pages/BookingsCrud/Edit.razor" class="text-gray-600 hover:text-gray-500 text-lg">
                <Icon icon="simple-icons:blazor" class="ml-5 text-indigo-700 w-5 h-5 align-middle" />
                Edit.razor
            </a>
        </div>
    </template>
    <template #nextjs>
        <a href="https://nextjs.jamstacks.net/bookings-crud">
            <img src="/images/jamstack/bookings-vue.png">
            <div class="text-center mb-3">
                nextjs.jamstacks.net/bookings-crud
            </div>
        </a>
        <div class="flex justify-center items-center">
            <a href="https://github.com/NetCoreTemplates/nextjs/blob/main/ui/pages/bookings-crud/index.tsx" class="text-gray-600 hover:text-gray-500 text-lg">
                <Icon icon="logos:react" class="w-6 h-6 align-middle" />
                index.tsx
            </a>
            <a href="https://github.com/NetCoreTemplates/nextjs/blob/main/ui/pages/bookings-crud/create.tsx" class="ml-3 text-gray-600 hover:text-gray-500 text-lg">
                <Icon icon="logos:react" class="w-6 h-6 align-middle" />
                create.tsx
            </a>
            <a href="https://github.com/NetCoreTemplates/nextjs/blob/main/ui/pages/bookings-crud/edit.tsx" class="ml-3 text-gray-600 hover:text-gray-500 text-lg">
                <Icon icon="logos:react" class="w-6 h-6 align-middle" />
                edit.tsx
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


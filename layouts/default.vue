<template>
  <!--  <NuxtLayout name="default">-->
  <div class="flex w-full">
    <Sidebar v-model="sidebarOpen" />
    <div class="w-full">
      <Navbar v-model="sidebarOpen" />
      <div class="p-5 flex flex-col gap-3">
        <div class="flex flex-row justify-between">
          <!--          <button-->
          <!--            class="btn btn-sm btn-ghost rounded-full text-gray-400"-->
          <!--            @click="router.go(-1)"-->
          <!--          >-->
          <!--            <i class="fa fa-arrow-left text-xs"></i>-->
          <!--          </button>-->
          <breadcrumb v-if="false" />
          <breadcrumb-default v-if="false"/>
        </div>
        <div class="card bg-base-100 shadow-xl">
          <slot class="w-full" />
        </div>
      </div>
    </div>
  </div>
<!--  </NuxtLayout>-->
</template>
<script
    setup
    lang="ts"
>

import Navbar from "~/components/layout/Navbar.vue";
import Sidebar from "~/components/layout/Sidebar.vue";
import Breadcrumb from "~/components/layout/Breadcrumb.vue";
import BreadcrumbDefault from "~/components/layout/Breadcrumb-default.vue";

let sidebarOpen = ref(true)

</script>


<style scoped>

</style>
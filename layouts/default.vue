<template>
  <!--  <NuxtLayout name="default">-->
  <div class="flex w-full">
    <Sidebar v-model="sidebarOpen" />
    <div class="w-full">
      <Navbar v-model="sidebarOpen" />
      <div class="p-5 flex flex-col gap-3">
        <div class="flex flex-row justify-between">
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
<script lang="ts" setup>

import Navbar from "~/components/layout/Navbar.vue";
import Sidebar from "~/components/layout/Sidebar.vue";
import Breadcrumb from "~/components/layout/Breadcrumb.vue";
import BreadcrumbDefault from "~/components/layout/Breadcrumb-default.vue";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import {useUiStore} from '~/store/ui/uiStore';

let sidebarOpen = ref(true)

const store = useUiStore();
const toast = useToast();

watch(() => store.toastMessage, (val) => {
  setToast(val);
});

function setToast(val:object) {
  if (val) {
    toast[val.type](val.message, val.config);
  }
}

</script>


<style scoped>

</style>
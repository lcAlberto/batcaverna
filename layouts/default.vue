<template>
  <!--  <NuxtLayout name="default">-->
  <Navbar v-model="sidebarOpen" />
  <div>
    <div class="flex content-stretch w-full p-7 gap-5">
      <Sidebar v-model="sidebarOpen" />
      <div class="w-full flex flex-col">
        <div class="flex flex-row justify-between">
          <breadcrumb v-if="false" />
          <breadcrumb-default v-if="false"/>
        </div>
        <Card>
          <template #content>
            <slot class="w-full" />
          </template>
        </Card>
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
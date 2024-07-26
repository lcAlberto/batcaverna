<template>
  <!--  <NuxtLayout name="default">-->
  <Navbar v-model="sidebarOpen"/>
  <div>
    <div class="flex content-stretch w-full p-7 gap-5">
      <Sidebar v-model="sidebarOpen"/>
      <Card class="w-full flex flex-col p-5 ">
        <template #header>
          <breadcrumb class="ml-auto"/>
        </template>
        <template #content>
          <NuxtPage/>
        </template>
      </Card>
    </div>
  </div>
  <!--  </NuxtLayout>-->
</template>
<script
    lang="ts"
    setup
>

import Navbar from "~/components/Ui/Navbar.vue";
import Sidebar from "~/components/Ui/Sidebar.vue";
import Breadcrumb from "~/components/Ui/Breadcrumb.vue";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import {useUiStore} from '~/store/ui/uiStore';
import {useRoute} from "vue-router";

let sidebarOpen = ref(true)

const store = useUiStore();
const toast = useToast();
const route = useRoute();

watch(() => store.toastMessage, (val) => {
  setToast(val);
});

function setToast(val: object) {
  if (val) {
    toast[val.type](val.message, val.config);
  }
}

</script>


<style scoped>

</style>
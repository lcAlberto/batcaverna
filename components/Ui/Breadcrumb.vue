<template>
  <div class="flex justify-between w-full">
    <page-header
      redirect-back="/heroes"
      :title="route.name"
    />
    <Breadcrumb :model="items" class="text-sm" style="background: transparent"/>
  </div>
</template>
<script lang="ts" setup>
import {useRoute} from 'vue-router';
import Breadcrumb from 'primevue/breadcrumb';
import PageHeader from "~/components/Ui/PageHeader.vue";

const items = ref([]);
const route = useRoute();

const generateBreadcrumbItems = (route:object) => {
  const paths = route.path.split('/').filter(p => p);
  const breadcrumbItems = paths.map((path:string, index:number) => {
    return {
      label: path.charAt(0).toUpperCase() + path.slice(1),
      to: '/' + paths.slice(0, index + 1).join('/')
    }
  });

  if (route.path !== '/home') {
    breadcrumbItems.unshift({
      label: 'Home',
      to: '/home',
      icon: 'fa fa-home'
    });
  }

  return breadcrumbItems;
};

watch(route, (newRoute) => {
  items.value = generateBreadcrumbItems(newRoute);
}, { immediate: true });
</script>

<style scoped>
li {
  user-select: none;
}
</style>
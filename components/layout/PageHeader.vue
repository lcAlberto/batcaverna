<template>
  <div class="flex justify-between">
    <div class="flex items-center gap-4">
      <Button
        type="button"
        rounded
        outlined
        severity="secondary"
        text
        raised
        icon="fa fa-arrow-left"
        @click="router.push(props.redirectBack)"
      />
      <div>
        <h1 class="text-2xl">{{ props.title }}</h1>
        <span class="text-sm m-0">{{ props.subtitle }}</span>
      </div>
    </div>
    <slot name="end"/>
  </div>
  <div class="divider m-0"/>
</template>
<script
    setup
    lang="ts"
>
import {useRouter} from "vue-router";

const props = defineProps({
  title: {type: String, default: null},
  subtitle: {type: String, default: null},
  redirectBack: {type: String, default: '/home'}
})
const router = useRouter()
</script>


<style scoped>

</style>
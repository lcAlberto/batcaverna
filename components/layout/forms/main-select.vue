<template >
  <div class="flex flex-row gap-4 w-full items-center">
    <div class="dropdown">
      <div class="input input-bordered w-52 m-0 flex items-center justify-between" role="button" tabindex="0">
        <span>Gênero</span>
        <i class="fa fa-chevron-down" />
      </div>
      <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52" tabindex="0">
        <li
          v-for="(item, index) in props.items"
          :key="index"
          @click="select(item)"
        ><a>{{item.label}}</a></li>
      </ul>
    </div>
  </div>
</template >
<script lang="ts" setup>
const emits = defineEmits(['selected'])
const props = defineProps({
  items: {type: Array, default: null},
})

function select(value:object) {
  emits('selected', value)
}


</script >


<style scoped>

</style >
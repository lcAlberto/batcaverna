<template>
  <div class="form-control flex flex-col gap-1 justify-center w-full">
    <div class="dropdown w-full">
      <div
        :class="{ 'input-error border border-red-500 text-red-500': errors}"
        class="input input-bordered focus:outline-0 h-8 text-sm flex items-center justify-between"
        role="button"
        tabindex="0"
      >
        <span v-if="selected">{{ selected.name }}</span>
        <span v-else>Equipe</span>
        <span
          v-if="loading"
          class="loading loading-infinity loading-xs"
        />
        <i
          v-else
          class="fa fa-chevron-down"
        />
      </div>
      <ul
        class="dropdown-content rounded-t-none z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
        tabindex="0"
      >
        <li
          v-for="(item, index) in prop.items"
          :key="index"
          @click="setSelected(item.id, item.name)"
        >
          <a>{{ item.name }}</a>
        </li>
      </ul>
    </div>
    <small v-if="errors && errors.length > 0" class="text-red-500">
      {{ errors[0] }}
    </small>
  </div>
</template>
<script
    lang="ts"
    setup
>
const emit = defineEmits(['selected'])
const prop = defineProps({
  items: {type: Array, default: null},
  errors: {type: Array, default: null},
  loading: {type: Boolean, default: false},
})

const selected = ref()

function setSelected(id: number, name: string) {
  selected.value = {id, name}
  emit('selected', selected.value)
}
</script>


<style scoped>

</style>
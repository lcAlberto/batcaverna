<template>
  <div class="form-control flex flex-col gap-1 justify-center w-full">
    <div class="dropdown w-full">
      <button
        :class="{'input-error border border-red-500 text-red-500': errors}"
        class="input input-bordered focus:outline-0 h-8 text-sm flex items-center justify-between w-full"
        role="button"
        tabindex="0"
      >
        <div
          v-if="selected.length > 0"
          class="flex flex-row gap-3 max-w-64 overflow-x-auto overflow-y-hidden hide-scrollbar"
        >
          <div
            v-for="(itemSelected, i) in selected"
            :key="i"
            class="badge badge-info gap-2 text-nowrap overflow-ellipsis"
          >
            {{ itemSelected.name }}
          </div>
        </div>
        <span v-else class="">{{ prop.label }}</span>
        <i class="fa fa-chevron-down"/>
      </button>
      <ul
        class="dropdown-content rounded-t-none menu p-2 shadow bg-base-100 rounded-box w-full max-h-52 overflow-y-auto overflow-x-hidden flex flex-col flex-nowrap"
        tabindex="0"
      >
        <li class="py-5">Selecione</li>
        <li
          v-for="(item, index) in prop.items"
          :id="`index-${index}`"
          :key="index"
          class="w-full"
        >
          <div class="form-control">
            <label
              :for="`option-key-${item.id}`"
              class="label cursor-pointer gap-2"
            >
              <input
                :id="`option-key-${item.id}`"
                v-model="selected"
                :value="item"
                class="checkbox"
                type="checkbox"
                @change="setModelValue(item.id)"
              />
              <span class="label-text">
                {{ item.name }}
              </span>
            </label>
          </div>
        </li>
      </ul>
    </div>
    <small v-if="errors && errors.length > 0" class="text-red-500">
      {{ errors[0] }}
    </small>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])
const prop = defineProps({
  modelValue: {type: Array, default: null},
  label: {type: String, default: 'Selecione'},
  items: {type: Array, default: null},
  errors: {type: Array, default: null},
  loading: {type: Boolean, default: false},
})

const selected = ref([])

watch(() => selected.value, (value) => {
  const send = value.map((item) => item.id)
  emit('update:modelValue', send)
})


</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none !important;
}
</style>
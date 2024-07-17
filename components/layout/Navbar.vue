<template>
  <div class="flex justify-between items-center shadow-2xl px-5">
    <div class="flex">
      <Button aria-label="Filter" icon="fa fa-bars" text @click="emit('update:modelValue', !open)"/>
      <router-link
        class="layout-topbar-logo p-3"
        to="/"
      >
        <img
          alt="logo"
          class="w-32"
          src="assets/images/system/ligth.png"
        />
      </router-link>
    </div>

    <div>
      <div class="card flex justify-center">
        <SplitButton
          :model="items"
          dropdownIcon="fa fa-bars"
          label=""
          severity="secondary"
          text
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: { type: Boolean, required: true }
  })
const open = ref(true)
  const items = ref([
    { label: 'Perfil', icon: 'fa fa-user', to: '#' },
    { label: 'Sair', icon: 'fa fa-gear', to: '#' },
  ]);

  watch(() => props.modelValue, (value) => {
    open.value = value
    emit('update:modelValue', value)
  })
</script>

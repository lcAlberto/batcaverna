<template>
  <div
    :class="{ 'drawer-open': open }"
    class="drawer w-min shadow-2xl"
  >
    <input
      id="my-drawer-2"
      v-model="open"
      class="drawer-toggle"
      type="checkbox"
    />
    <div class="drawer-side w-full z-10 text-center">
      <label aria-label="close sidebar" class="drawer-overlay" for="my-drawer-2"></label>
      <h2 class="font-bold text-lg py-5">BatCaverna</h2>
      <ul class="menu w-52 p-4 text-base-content">
        <!-- Sidebar content here -->
        <li v-for="(item, index) in list"
            :key="index"
            class=""
        >
          <nuxt-link
            :to="item.path"
            active-class="text-primary bg-transparent"
            class="hover:border border-primary"
          >
            <i :class="item.icon"/>
            {{ item.label }}
          </nuxt-link>
        </li>
      </ul>
      <button
        class="btn btn-xs btn-ghost fixed bottom-0"
        @click="close"
      >
        <i class="fa fa-angle-left"></i>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {type: Boolean, required: true}
})
const open = ref(true)

const list = ref([
  {
    path: '/home',
    icon: 'fa fa-home',
    label: 'Sala de justiça'
  },
  {
    path: '/heroes',
    icon: 'fa fa-mask',
    label: 'Hall dos heróis'
  },
  {
    path: '/#',
    icon: 'fa fa-satellite',
    label: 'Torre da Liga'
  },
  {
    path: '/teams',
    icon: 'fa fa-user',
    label: 'Equipes'
  },
  {
    path: '/younglings',
    icon: 'fa fa-graduation-cap',
    label: 'Recrutas'
  },
  {
    path: '/#',
    icon: 'fa fa-rocket',
    label: 'Veículos'
  },
  {
    path: '/#',
    icon: 'fa fa-medal',
    label: 'Missões'
  },
  {
    path: '/#',
    icon: 'fa fa-user-ninja',
    label: 'Vilões'
  },

])

watch(() => props.modelValue, (value) => {
  open.value = value
  emits('update:modelValue', value)
})

function close() {
  open.value = false
  emits('update:modelValue', false)
}

</script>


<style scoped>

</style>
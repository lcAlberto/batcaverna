<template>
  <div
    :class="{ 'drawer-open': open }"
    class="drawer w-min shadow-2xl"
  >
    <input
      v-model="open"
      id="my-drawer-2"
      type="checkbox"
      class="drawer-toggle"
    />
    <div class="drawer-side w-full z-10 text-center">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <h2 class="font-bold text-lg py-5">BatCaverna</h2>
      <ul class="menu w-52 p-4 text-base-content">
        <!-- Sidebar content here -->
        <li>
          <nuxt-link
            to="/home"
            class=""
          >
            <i class="fa fa-home" />
            Sala de justiça
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/heroes"
            class=""
          >
            <i class="fa fa-mask"></i>
            Heróis
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/home"
            class=""
          >
            <i class="fa fa-satellite"></i>
            Torre da liga
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/teams"
            class=""
          >
            <i class="fa fa-user"></i>
            Equipes
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/home"
            class=""
          >
            <i class="fa fa-graduation-cap"></i>
            Recrutas
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/home"
            class=""
          >
            <i class="fa fa-rocket"></i>
            Veículos
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/home"
            class=""
          >
            <i class="fa fa-medal"></i>
            Missões
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/home"
            class=""
          >
            <i class="fa fa-user-ninja"></i>
            Vilões
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
<script setup lang="ts">
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: { type: Boolean, required: true }
})
const open = ref(true)

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
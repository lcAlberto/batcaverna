<template>
  <div class="navbar bg-base-100 sticky top-0 z-50 shadow-2xl mb-2 py-0 min-h-3">
    <div
      v-if="!modelValue"
      class="flex-1"
    >
      <button
        class="btn btn-ghost hover:bg-transparent"
        @click="emit('update:modelValue', true)"
      >
        <i class="fa fa-bars"/>
      </button>
      <h2 class="font-bold text-lg">BatCaverna</h2>
    </div>
    <div class="ml-auto flex-none gap-2">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-8 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const emit = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: { type: Boolean, required: true }
  })

  watch(() => props.modelValue, (value) => {
    open.value = value
    emit('update:modelValue', value)
  })
</script>

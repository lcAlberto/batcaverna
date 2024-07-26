<template>
  <Card
    v-if="open"
    :class="open ? 'animate-fadein' : 'animate-fadeout'"
    class="animate animate-once animate-duration-500 flex flex-col justify-items-stretch"
    style="width: 25rem; height: 90vh; overflow: hidden"
  >
    <template #header>
      <img
        alt="user header"
        src="assets/images/system/ligth.png"
      />
    </template>
    <template #title>Batcaverna SO</template>
    <template #subtitle>
      Salvando o universo de maneira coordenada
    </template>
    <template #content>
      <div class="flex justify-center">
        <ul class="menu w-full py-4 text-base-content overflow-y-auto">
          <li
            v-for="(item, index) in list"
            :key="index"
            class="p-2 flex hover:bg-primary-50 rounded-xl"
          >
            <nuxt-link
              :to="item.path"
              active-class="text-primary bg-transparent"
              class="flex items-center gap-4"
            >
              <i :class="item.icon"/>
              {{ item.label }}
              <small>
                <Tag
                  v-if="item.badge"
                  severity="primary"
                  :value="item.badge"
                  class="text-xs"
                />
              </small>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-center gap-4 mt-auto">
        <Button
          aria-label="Filter"
          icon="fa fa-door-open"
          raised
          rounded
          text
        />
      </div>
    </template>
  </Card>
</template>
<script
    lang="ts"
    setup
>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {type: Boolean, required: true}
})
const open = ref(true)

const list = ref([
  {
    path: '/watch-tower',
    icon: 'fa fa-satellite',
    label: 'Torre da Liga'
  },
  {
    path: '/heroes',
    icon: 'fa fa-mask',
    label: 'Hall dos heróis'
  },
  {
    path: '/teams',
    icon: 'fa fa-user',
    label: 'Equipes'
  },
  {
    path: '/missions',
    icon: 'fa fa-medal',
    label: 'Missões'
  },
  {
    path: '/#younglings',//'/younglings',
    icon: 'fa fa-graduation-cap',
    label: 'Recrutas',
    badge: 'Em breve'
  },
  {
    path: '/#ships',
    icon: 'fa fa-rocket',
    label: 'Veículos',
    badge: 'Em breve'
  },
  {
    path: '/#missions',
    icon: 'fa fa-medal',
    label: 'Missões',
    badge: 'Em breve'
  },
  {
    path: '/#ninja',
    icon: 'fa fa-user-ninja',
    label: 'Vilões',
    badge: 'Em breve'
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
ul::-webkit-scrollbar {
  display: none;
}
</style>
<template>
  <ConfirmDialog>
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded mt-10">
        <div
          class="rounded-full text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20"
          :class="{'bg-primary': theme === 'primary', 'bg-red-500': theme === 'danger'}"
        >
          <i :class="`${props.icon} text-5xl`"></i>
        </div>
        <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
        <p class="mb-0">{{ message.message }}</p>
        <div class="flex items-center gap-2 mt-6">
          <Button
            :label="props.confirm"
            @click="acceptCallback"
            :severity="theme"
            class="w-32"
          ></Button>
          <Button
            :label="props.cancel"
            outlined
            :severity="theme"
            @click="rejectCallback"
            class="w-32"
          ></Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>
<script
    lang="ts"
    setup
>
import {useConfirm} from "primevue/useconfirm";

const props = defineProps({
  modelValue: {type: Boolean, required: true},
  title: {type: String, required: true},
  message: {type: String, required: true},
  confirm: {type: String, default: 'Ok'},
  cancel: {type: String, default: 'Cancelar'},
  icon: {type: String, default: 'fa fa-trash'},
  theme: {type: String, default: 'primary'}
})
const emits = defineEmits(['update:modelValue', 'confirm']);
const confirm = useConfirm();

const confirm2 = () => {
  confirm.require({
    message: props.message,
    header: props.title,
    icon: props.icon,
    position: 'top',
    rejectLabel: props.cancel,
    rejectProps: {
      label: props.cancel,
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: props.confirm,
      severity: props.theme
    },
    accept: () => {
      emits('confirm')
    },
    reject: () => {
      //
    }
  });
};

watch(() => props.modelValue, (val) => {
  if (val)
    confirm2()
})

</script>


<style scoped>

</style>
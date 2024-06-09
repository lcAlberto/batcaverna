<template >
  <!-- Open the modal using ID.showModal() method -->
  <dialog ref="confirmModal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box  border border-error">
      <h3 class="font-bold text-2xl text-error">
        <i class="fa fa-exclamation fa-bounce"></i>
        {{ props.title }}!
      </h3>
      <p class="py-4">{{ props.message }}</p>
      <div class="modal-action">
        <form class="w-1/2 flex gap-3" method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button
            class="btn w-1/2"
            @click="confirmModal.value.close()"
          >
            <i class="fa fa-ban"></i>
            {{ props.cancel }}
          </button>
          <button
            class="btn btn-error w-1/2"
            @click="emits('confirm')"
          >
            <i class="fa fa-check"></i>
            {{ props.confirm }}
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template >
<script lang="ts" setup>
import {defineProps, ref, watch} from 'vue';

const props = defineProps<{
  modelValue: { type: boolean, required: true },
  title: { type: string, required: true },
  message: { type: string, required: true },
  confirm: { type: string, default: 'Ok' },
  cancel: { type: string, default: 'Cancelar'}
}>()

const emits = defineEmits(['update:modelValue', 'confirm']);
const confirmModal = ref(null);

watch(() => props.modelValue, (val) => {
  if (confirmModal.value) {
    if (val) {
      confirmModal.value.showModal();
    } else {
      confirmModal.value.close();
    }
  }
});
</script >


<style scoped>

</style >
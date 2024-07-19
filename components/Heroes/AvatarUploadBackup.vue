<template>
  <div class="flex flex-col">
    <Image
      alt="Image"
      :class="{'border border-red-500': errors && errors.length > 0}"
      preview
    >
      <template #previewicon>
        <i class="pi pi-search"></i>
      </template>
      <template #image>
        <div class="xl:w-72 md:w-52 mx-auto">
          <img
            v-if="fileData && imgBlob.length > 0"
            :src="imgBlob"
            alt="image"
            class="w-full"
          />
          <img
            v-else-if="props.currentImage && props.currentImage.length > 0"
            :src="props.currentImage"
            alt="image"
            class="w-full"
          />
          <img
            v-else
            alt="superhero-profile-placeholder"
            src="/assets/female_superhero.png"
            class="w-full"
          />
        </div>
      </template>
      <template #preview="slotProps">
        <Card>
          <template #content>
            <img
              v-if="fileData && imgBlob.length > 0"
              :src="imgBlob"
              alt="preview"
              class="w-full"
              :style="slotProps.style"
              @click="slotProps.onClick"
            />
            <img
              v-else-if="props.currentImage && props.currentImage.length > 0"
              :src="props.currentImage"
              alt="preview"
              class="w-full"
              :style="slotProps.style"
              @click="slotProps.onClick"
            />
            <div
              v-else
              @click.stop
            >
              <dropzone-upload
                @update="handleFileUploadFromDropzone"
              />
            </div>
          </template>
        </Card>
      </template>
    </Image>
    <small
      v-if="errors && errors.length > 0"
      class="text-red-500"
    >{{ errors[0] }}
    </small>
  </div>
</template>
<script
    lang="ts"
    setup
>
import DropzoneUpload from "~/components/layout/forms/dropzone-upload.vue";
import {useUiStore} from "~/store/ui/uiStore";

const emit = defineEmits(['update'])
const props = defineProps({
  currentImage: {type: [Object, String], default: null},
  errors: {type: Array, default: null}
})

const imgBlob = ref('')
const fileData = ref(null)

// function handleFileUpload(event: object) {
//   let file = null
//   if (event.target.files && event.target.files.length > 0)
//     file = event.target.files[0]
//   else
//     file = event
//   if (file) {
//     fileData.value = file
//     const reader = new FileReader()
//     reader.onload = () => {
//       toBlob(reader.result)
//     }
//     reader.readAsDataURL(file)
//     emit('update', file);
//   }
// }

function handleFileUploadFromDropzone(file: object) {
  if (file) {
    fileData.value = file[0]
    const reader = new FileReader()
    reader.onload = () => {
      console.log(reader.result)
      // toBlob(reader.result)
    }
    imgBlob.value = fileData.value.objectURL
    emit('update', fileData.value);
    const uiStore = useUiStore()
    uiStore.setToastMessage('Imagem carregada!', 'success', null)
  }
}

function toBlob(result: string) {
  const teste = result.replace(/^data:image\/[a-z]+;base64,/, "")
  imgBlob.value = `data:image/png;base64,${teste}`
}

</script>


<style scoped>

</style>
<template>
  <div class="flex flex-col">
    <Image
      alt="Image"
      :class="{'border border-red-500': errors && errors.length > 0}"
      @click="visible = !visible"
    >
      <template #image>
        <div class="xl:w-72 md:w-52 mx-auto">
          <img
            v-if="imgBlob.length > 0"
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
    </Image>
    <Dialog
      v-model:visible="visible"
      modal
      header="Imagem"
      :style="{ width: '50%' }"
    >
      <FileUpload
        name="demo"
        mode="advanced"
        @upload="handleUpload"
        :multiple="false"
        accept="image/*"
        auto
        :maxFileSize="1000000"
      >
        <template #empty>
          <span>Drag and drop files to here to upload.</span>
        </template>
      </FileUpload>
    </Dialog>
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
const visible = ref(false)

function handleUpload(payload: object) {
  if (payload && payload.files) {
    const file = payload.files[0];
    handleBlobUrl(file.objectURL)
  }
}

async function handleBlobUrl(blobUrl: string) {
  try {
    const blob = await fetchBlobFromURL(blobUrl);
    console.log('blob', blob);
    const base64 = await blobToBase64(blob);
    console.log('base64', base64);
  } catch (error) {
    console.error('Erro ao converter blob URL para base64:', error);
  }
}

async function fetchBlobFromURL(blobUrl: string): Promise<Blob> {
  const response = await fetch(blobUrl);
  return await response.blob();
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      imgBlob.value = reader.result as string;
      emit('update', imgBlob.value)
      resolve(reader);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}


// async function handleBlobUrl(blobUrl: string) {
//   try {
//     const blob = await fetchBlobFromURL(blobUrl);
//     console.log('aqui oo arquivo', blob);
//     imgBlob.value = await blobToBase64(blob);
//     // emit('update', imgBlob.value)
//   } catch (error) {
//     console.error('Erro ao converter blob URL para base64:', error);
//   }
// }
//
// function blobToBase64(blob: Blob): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       let base64data = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
//       resolve(`data:image/png;base64,${base64data}`);
//     };
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
// }
//
// async function fetchBlobFromURL(blobUrl: string): Promise<Blob> {
//   const response = await fetch(blobUrl);
//   return await response.blob();
// }

</script>


<style scoped>

</style>
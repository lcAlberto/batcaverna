<template>
  <div class="avatar">
    <div
      class="w-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
      @click="triggerFileInput"
    >
      <img
        v-if="fileData && imgBlob.length > 0"
        :src="imgBlob"
        alt="superhero-profile-placeholder"
      />
      <img
        v-else-if="prop.currentImage"
        :src="prop.currentImage"
        alt="superhero-profile-placeholder"
      />
      <img
        v-else
        src="/assets/female_superhero.png"
        alt="superhero-profile-placeholder"
      />
    </div>
    <input
      id="fileInput"
      type="file"
      class="hidden"
      @change="handleFileUpload"
    >
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['update'])
const prop = defineProps({
  currentImage: { type: [Object, String], default: null }
})

const imgBlob = ref('')
const fileData = ref(null)

function triggerFileInput() {
  if (document.getElementById('fileInput'))
    document.getElementById('fileInput').click()
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    fileData.value = file
    const reader = new FileReader()
    reader.onload = () => {
      toBlob(reader.result)
    }
    reader.readAsDataURL(file)
  }
}

function toBlob (result: string) {
  const teste = result.replace(/^data:image\/[a-z]+;base64,/, "")
  imgBlob.value = `data:image/png;base64,${teste}`
  emit('update', imgBlob);
}

</script>


<style scoped>

</style>
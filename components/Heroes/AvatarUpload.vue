<template>
  <div class="avatar">
    <div
      class="w-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
      @click="triggerFileInput"
    >
      <img
        v-if="file && imageUrl.length > 0"
        :src="imageUrl"
        alt="superhero-profile-placeholder"
      />
      <img
        v-else-if="currentImage"
        :src="currentImage"
        alt="superhero-profile-placeholder"
      />
      <img
        v-else
        src="/assets/female_superhero.png"
        alt="superhero-profile-placeholder"
      />
    </div>
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      @change="handleFileUpload"
    >
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  emits: ['update'],
  name: "AvatarUpload",
  props: {
    currentImage: { type: String, default: null }
  },
  data () {
    return {
      imageUrl: '',
      errors: null,
      file: null,
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs['fileInput'].click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      console.log(file);
      if (file) {
        this.file = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
          this.$emit('update', reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
  }
})
</script>


<style scoped>

</style>
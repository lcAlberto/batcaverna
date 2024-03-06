<template>
  <div class="card-body">
    <page-header
      title="Heróis"
      subtitle="Todos os herois"
      redirect-back="/heroes"
    />
    <hero-form @update="(event) => formData = event" />
    <div class="card-actions justify-center">
      <button type="button" class="btn btn-primary" @click="submit">
        Salvar
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import HeroForm from "~/components/Heroes/HeroForm.vue";
import PageHeader from "~/components/layout/PageHeader.vue";

export default defineComponent({
  name: "new-hero",
  components: {PageHeader, HeroForm},
  data() {
    return {
      imageUrl: '',
      errors: null,
      file: null,
      formData: null,
    }
  },

  methods: {
    submit () {
      if (this.formData) {
        $fetch('https://65ad966badbd5aa31be0ff48.mockapi.io/person', {
          method: 'POST',
          body: this.formData,
          'Content-Type': 'Application/json',
        }).then((response) => {
          console.log(response);
          this.$router.push('/heroes')
        })
      }
    }
  }
})
</script>


<style scoped>

</style>
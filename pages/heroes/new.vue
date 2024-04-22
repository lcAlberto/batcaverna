<template>
  <div class="card-body">
    <page-header
      redirect-back="/heroes"
      subtitle="Todos os herois"
      title="Heróis"
    />
    <hero-form @update="(event) => formData = event" />
    <div class="card-actions justify-center">
      <button
        class="btn btn-primary"
        type="button"
        @click="submit"
      >
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
    submit() {
      console.log(this.formData);
      if (this.formData) {
        $fetch('http://127.0.0.1:8000/api/characters', {
          method: 'POST',
          body: this.formData,
          'Content-Type': 'Application/json',
          headers: {
            Authorization: 'Bearer c122eb6fb2605c98cc06c0b23ecfe34812d71a219ba16dc44c0aee851bb23c39f05194965356ea137b9904bcb622cebd02d6fc23afd821a2370cd3df538a58ad617fb9033f7ebdfa80f3d5b639a3658dcad19b9537b4de2bd7f059cf95b99765b50b31ef3a8036d043f35d6a4f35b9661a65eba4ca8b54741e3dd9611ec33825'
          }
        }).then(() => {
          this.$router.push('/heroes')
        })
      }
    }
  }
})
</script>


<style scoped>

</style>
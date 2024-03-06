<template>
  <div class="card-body">
    <page-header
      title="Heróis"
      subtitle="Todos os herois"
      redirect-back="/heroes"
    />
    <hero-form
      v-if="heroData"
      :old="heroData"
      @update="(event) => formData = event"
    />
    <div class="card-actions justify-center">
      <div
        v-if="askToConfirm"
        class="form-control flex">
        <label class="label cursor-pointer gap-4">
          <span class="label-text">Não, cancelar</span>
          <input
            v-model="confirmDestroy"
            type="radio"
            name="confirm-destroy"
            class="radio"
            @click="cancelDestroy"
          />
          <span class="label-text">Sim, tenho</span>
          <input
            v-model="confirmDestroy"
            type="radio"
            name="confirm-destroy"
            class="radio"
          />
        </label>
      </div>
      <button
        type="button"
        class="btn btn-outline btn-error"
        @click="handlerDestroy"
      >
        <span v-if="confirmDestroy">
          Ok, excluir
        </span>
        <span v-else-if="askToConfirm">
          Tem certeza que quer excluir?
        </span>
        <span v-else>
          Excluir dos registros
        </span>
      </button>
      <button
        v-if="!askToConfirm && !confirmDestroy"
        type="button"
        class="btn btn-primary"
        @click="update"
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
  components: {PageHeader, HeroForm},
  created() {
    this.fetchHero()
  },
  data() {
    return {
      imageUrl: '',
      errors: null,
      file: null,
      formData: null,
      heroData: null,
      confirmDestroy: false,
      askToConfirm: false
    }
  },
  computed: {
    heroId () {
      return this.$route.params.id;
    }
  },
  methods: {
    async fetchHero () {
      await $fetch(`https://65ad966badbd5aa31be0ff48.mockapi.io/person/${this.heroId}`, {
          method: 'GET',
          'Content-Type': 'Application/json',
        }).then((response) => {
          this.heroData = response;
        })
    },
    update () {
      if (this.formData) {
        $fetch(`https://65ad966badbd5aa31be0ff48.mockapi.io/person/${this.heroId}`, {
          method: 'PUT',
          body: this.formData,
          'Content-Type': 'Application/json',
        }).then((response) => {
          console.log(response);
        })
      }
    },
    handlerDestroy () {
      this.askToConfirm = !this.askToConfirm
      if (this.confirmDestroy) {
        this.destroy()
      }
    },
    cancelDestroy () {
      this.confirmDestroy = false
      this.askToConfirm = false
    },
    destroy () {
      if (this.formData) {
        $fetch(`https://65ad966badbd5aa31be0ff48.mockapi.io/person/${this.heroId}`, {
          method: 'DELETE',
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
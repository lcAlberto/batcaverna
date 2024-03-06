<template>
  <div class="card-body">
    <h2 class="card-title">Novo herói</h2>
    <span class="text-sm m-0">Cadastre os dados de cada heroi</span>
    <div class="divider m-0" />

    <div class="flex flex-col py-2">
      <div class="flex items-center justify-center gap-5 py-3">
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
              v-else
              src="/assets/female_superhero.png"
              alt="superhero-profile-placeholder"
            />
          </div>
        </div>
        <div class="flex flex-col w-full">
          <!--          Codinome-->
          <div class="flex gap-3">
            <label class="form-control w-full">
              <input
                v-model="formData.codename"
                type="text"
                placeholder="Codinome"
                class="input input-sm input-bordered w-full"
              />
              <div class="label">
                <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
              </div>
            </label>
          </div>
          <div class="flex gap-3">
            <!--            Nome-->
            <label class="form-control w-full">
              <input
                v-model="formData.name"
                type="text"
                placeholder="Nome"
                class="input input-sm input-bordered w-full"
              />
              <div class="label">
                <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
              </div>
            </label>
          </div>
          <div class="flex gap-3 w-full">
            <!--            Planeta-->
            <label class="form-control">
              <input
                v-model="formData.planet"
                type="text"
                placeholder="Planeta de origem"
                class="input input-sm input-bordered w-full"
              />
              <div class="label">
                <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
              </div>
            </label>
            <!--            Cidade-->
            <label class="form-control">
              <input
                v-model="formData.city"
                type="text"
                placeholder="Cidade"
                class="input input-sm input-bordered w-full"
              />
              <div class="label">
                <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
              </div>
            </label>
            <!--            Idade-->
            <label class="form-control">
              <input
                v-model="formData.age"
                type="text"
                placeholder="Idade"
                class="input input-sm input-bordered w-full"
              />
              <div class="label">
                <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <section>
        <div class="flex items-center justify-center gap-5 py-3">
          <div class="flex flex-col w-full">
            <div class="flex gap-3">
              <!--            Afiliado-->
              <label class="form-control w-full">
                <input
                  v-model="formData.affiliate"
                  type="text"
                  placeholder="Afiliado"
                  class="input input-sm input-bordered w-full"
                />
                <div class="label">
                  <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
                </div>
              </label>

              <!--            Par-->
              <label class="form-control w-full">
                <input
                  v-model="formData.pair"
                  type="text"
                  placeholder="Par"
                  class="input input-sm input-bordered w-full"
                />
                <div class="label">
                  <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
                </div>
              </label>

              <!--            Cor-->
              <label class="form-control w-full">
                <input
                  v-model="formData['main-color']"
                  type="text"
                  placeholder="Principal cor"
                  class="input input-sm input-bordered w-full"
                />
                <div class="label">
                  <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
                </div>
              </label>

              <!--            sexo-->
              <label class="form-control w-full">
                <input
                  v-model="formData.sex"
                  type="text"
                  placeholder="Sexo"
                  class="input input-sm input-bordered w-full"
                />
                <div class="label">
                  <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
                </div>
              </label>
            </div>
            <div class="flex gap-3">
              <!--            Poder-->
              <label class="form-control w-full">
                <input
                  v-model="formData['main-power']"
                  type="text"
                  placeholder="Principal poder"
                  class="input input-sm input-bordered w-full"
                />
                <div class="label">
                  <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
                </div>
              </label>

              <!--            Fraqueza-->
              <label class="form-control w-full">
                <input
                  v-model="formData.weakness"
                  type="text"
                  placeholder="Fraqueza"
                  class="input input-sm input-bordered w-full"
                />
                <div class="label">
                  <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <input
          ref="fileInput"
          type="file"
          class="hidden"
          @change="handleFileUpload"
        >
      </section>
    </div>

    <div class="card-actions justify-end">
      <button type="button" class="btn btn-primary" @click="submit">Buy Now</button>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "new-hero",
  data() {
    return {
      imageUrl: '',
      errors: null,
      file: null,
      formData: {
        name: '',
        avatar: '',
        codename: '',
        sex: '',
        city: '',
        'main-power': '',
        age: 0,
        planet: '',
        weakness: '',
        affiliate: '',
        pair: '',
        'main-color': '',
      },
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
          this.formData.avatar = reader.result;
        };
        reader.readAsDataURL(file);

        // this.formData.avatar = file;
        console.log(this.formData.avatar);
      }
    },
    submit () {
      $fetch('https://65ad966badbd5aa31be0ff48.mockapi.io/person', {
        method: 'POST',
        body: this.formData,
        'Content-Type': 'Application/json',
      }).then((response) => {
        console.log(response);
      })
    }
  }
})
</script>


<style scoped>

</style>
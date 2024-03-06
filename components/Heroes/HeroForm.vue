<template>
  <div class="flex flex-col justify-center py-2">
    <div class="flex items-center justify-center gap-5 py-3 my-5">
      <avatar-upload
        :current-image="formData.avatar"
        class="w-1/2 justify-end"
        @update="(event) => formData.avatar = event"
      />
      <div class="w-1/2">
        <label class="form-control w-full">
          <input
            v-model="formData.codename"
            type="text"
            placeholder="Codinome"
            class="input w-full"
          />
          <div class="label">
            <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <label class="form-control w-full">
          <input
            v-model="formData.name"
            type="text"
            placeholder="Nome"
            class="input w-full"
          />
          <div class="label">
            <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <label class="form-control mb-0">
          <input
            v-model="formData.age"
            type="text"
            placeholder="Idade"
            class="input input-sm w-full"
          />
          <div class="label">
            <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
          </div>
        </label>
      </div>
    </div>
    <div class="mx-auto lg:w-1/2">
      <div class="flex gap-4">
        <label class="form-control w-full">
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
        <label class="form-control w-full">
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
      </div>
      <div class="flex gap-4">
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
      </div>
      <div class="flex gap-4">
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
      <div class="flex gap-4">
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
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import AvatarUpload from "~/components/Heroes/AvatarUpload.vue";

export default defineComponent({
  name: "HeroForm",
  components: {AvatarUpload},
  props: {
    old: {type: Object, default: null}
  },
  data () {
    return {
      errors: null,
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
  mounted () {
    console.log(this.old);
    if (this.old) {
      this.formData = this.old
    }
  },
  watch: {
    formData: {
      handler (value) {
        this.$emit('update', value)
      },
      deep: true
    }
  },
})
</script>


<style scoped>

</style>
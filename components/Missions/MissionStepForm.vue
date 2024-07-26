<template>
  <div class="w-full flex justify-center">
    <Stepper
      v-model:value="currentStep"
      linear
      class="w-full"
    >
      <StepList>
        <Step :value="1">Missão</Step>
        <Step :value="2">Esquadrão</Step>
        <Step :value="3">Quadro da missão</Step>
      </StepList>
      <StepPanels>
        <StepPanel
          :value="1"
        >
          <div class="flex flex-col">
            <missions-mission-data-form
              :old="missionFormData"
              :form-errors="missionFormErrors"
              @update="(event) => missionFormData = event"
            />
          </div>
          <div class="flex gap-4 pt-6 justify-end">
            <Button
              type="button"
              label="Cancelar"
              severity="secondary"
              icon="fa fa-arrow-left"
              @click="router.go(-1)"
            />
            <Button
              type="button"
              label="Próximo passo"
              icon="fa fa-arrow-right"
              @click="submitMission()"
            />
          </div>
        </StepPanel>
        <StepPanel
          :value="2"
        >
          <div class="flex flex-col">
            <h1 class="text-lg bold">
              Criar esquadrão a missão {{ lastCreatedMissions.name }}
            </h1>
            <p class="text-sm w-3/4 mt-4">
              Organize melhor a missão criando esquadrões para diferentes frentes de batalha. Defina os heróis e seus objetivos de equipe
            </p>
            <squads-data-form
              :old="lastCreatedSquad"
              enable-create
              start-collapsed
              class="mt-5"
            />
            <Divider/>
            <div class="py-5">
              <label>Esquadrões disponíveis:</label>
              <squad-table-list
                :data="squads"
                @update="(event) => setSelectedSquads(event)"
                @refresh="loadSquads()"
              />
            </div>
            <Divider/>
          </div>
          <div class="flex pt-6 justify-between">
            <Button
              type="button"
              severity="secondary"
              label="Voltar"
              icon="fa fa-arrow-left"
              @click="loadMission()"
            />
            <Button
              type="button"
              label="Próximo passo"
              icon="fa fa-arrow-right"
              iconPos="right"
              @click="syncSquad()"
            />
          </div>
        </StepPanel>
        <StepPanel
          :value="3"
        >
          <Panel header="Missão criada com sucesso">
            <div
              v-if="lastCreatedMissions"
              class="flex flex-col p-5"
            >
              <h1 class="text-xl font-bold">Missão {{ lastCreatedMissions.name }}</h1>

              <div class="grid grid-cols-2 gap-4 items-center p-5">
                <div class="my-2">
                  <span class="font-bold">Coordenadas:</span>
                  <span class="ml-2">{{ lastCreatedMissions.coordinates }}:</span>
                </div>
                <div class="my-2">
                  <div class="flex flex-col justify-center text-center gap-4">
                    <span class="font-bold">Nível de ameaça:</span>
                    <Knob
                      v-model="lastCreatedMissions.urgency_level"
                      readonly
                      size="100%"
                      :text-color="urgencyColor.color"
                      :valueColor="urgencyColor.value"
                      rangeColor="SlateGray"
                    />
                    <h2
                      class="text-2xl font-bold"
                      :class="`text-${rangeColor}-500`"
                    >{{ urgency }}</h2>
                  </div>
                </div>
              </div>
              <Divider/>
              <h1 class="text-xl font-bold">Esquadrões</h1>
              <div class="p-5">
                {{ lastCreatedSquad }}
                <ul>
                  <li class="my-2">
                    <span class="font-bold">Coordenadas:</span>
                    <span class="ml-2">fdfjdhsf:</span>
                  </li>
                  <li class="my-2 flex flex-col">
                    <span class="font-bold">Objetivo:</span>
                    <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-start items-center p-2">
                      <p>fdfjdhsf border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-start items-center font-medium"</p>
                    </div>
                  </li>
                  <li class="my-2 flex flex-col">
                    <span class="font-bold">Descrição:</span>
                    <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-start items-center p-2">
                      <p>fdfjdhsf border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-start items-center font-medium"</p>
                    </div>
                  </li>
                </ul>
              </div>


            </div>
          </Panel>
          <div class="pt-6">
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              @click="currentStep = 2"
            />
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
</template>

<script
    setup
    lang="ts"
>
import {useMissionStore} from "~/store/mission/missionStore";
import {useSquadStore} from "~/store/squad/squadStore";

import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import SquadTableList from "~/components/Squads/Datalist/SquadTableList.vue";

const missionStore = useMissionStore()
const squadStore = useSquadStore()
const route = useRoute()
const router = useRouter()

const currentStep = ref(1)

/* MISSION VARS */
const missionData = ref({})
const missionFormData = ref({})
const missionFormErrors = missionStore.getErrors
const lastCreatedMissions = ref({})

/* SQUAD VARS */
const squads = ref({})
const selectedSquads = ref([])
const lastCreatedSquad = ref({})

onMounted(async () => {
  if (route.params.id) {
    await missionStore.fetchMission(`${route.params.id}`)
        .then(() => {
          missionData.value = missionStore.getMission
        })
  }
})

watch(() => squadStore.getSquads, (squadList) => {
  squads.value = squadList
});

function loadMission() {
  if (lastCreatedMissions.value)
    missionFormData.value = lastCreatedMissions.value
  currentStep.value = 1
}

async function loadSquads() {
  await squadStore.fetchSquads()
  lastCreatedMissions.value = squadStore.getLastCreatedSquad
}

async function submitMission() {
  if (route.params.id && missionData.value || lastCreatedMissions.value.id) {
    let missionId = route.params.id || lastCreatedMissions.value.id
    await missionStore.editMission(missionFormData.value, `${missionId}`)
        .then(() => {
          if (missionStore.getErrors.length === 0) {
            currentStep.value = 2
            loadSquads()
          }
        })
  } else {
    if (missionFormData.value) {
      await missionStore.newMission(missionFormData.value)
          .then(() => {
            if (missionStore.getErrors.length === 0) {
              currentStep.value = 2
              loadSquads()
            }
          })

    }
  }
}

function setSelectedSquads(squadList: []) {
  if (squadList && squadList.length > 0) {
    selectedSquads.value = squadList.map(squad => squad.id)
  } else {
    selectedSquads.value = []
  }
}

async function syncSquad() {
  await squadStore.addSquadToMission(lastCreatedMissions.value.id, selectedSquads.value)
      .then(() => {
        if (squadStore.getErrors.length === 0) {
          currentStep.value = 3
        }
      })
}

// TODO: Create a helper utils.ts
const urgencyColor = () => {
  let urgency = parseInt(lastCreatedMissions.urgency_level)
  if (urgency <= 10)
    return {
      color: 'cyan',
      value: 'Normal'
    }
  else if (urgency <= 20)
    return {
      color: 'lime',
      value: 'evemente Alta'
    }
  else if (urgency <= 30)
    return {
      color: 'green',
      value: 'Alta'
    }
  else if (urgency <= 50)
    return {
      color: 'yellow',
      value: 'Muito Alta'
    }
  else if (urgency <= 60)
    return {
      color: 'orange',
      value: 'Emergência'
    }
  else if (urgency <= 70)
    return {
      color: 'red',
      value: 'Catástrofica'
    }
}
</script>

<style scoped>

</style>
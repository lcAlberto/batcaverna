import type {RouteParamValue} from "vue-router";
import {useUiStore} from '@/store/ui/uiStore'
import {useRouter, useRuntimeConfig} from "#imports";

export const actions = {
    async fetchMissions() {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();
        this.loading = true;

        try {
            const {data, error} = await useFetch(`${config.public.apiBase}mission`, {
                headers: {Authorization: `Bearer ${config.public.apiSecret}`},
            });

            if (error.value) {
                throw error.value;
            }

            this.missions = data._value.missions.data;
            this.pagination = {
                current_page: data._value.missions.current_page,
                last_page: data._value.missions.last_page,
                total: data._value.missions.total
            };
        } catch (error) {
            console.log(error);
            uiStore.setToastMessage('Erro ao carregar as missões', 'error');
            this.errors = error
        } finally {
            this.loading = false;
        }
    },

    async newMission(params: object) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();
        // const router = useRouter();

        try {
            await $fetch(`${config.public.apiBase}mission`, {
                method: 'POST',
                body: params,
                headers: {Authorization: `Bearer ${config.public.apiSecret}`}
            }).then((response) => {
                uiStore.setToastMessage('Missão criada com sucesso', 'success');
                this.lastCreatedMission = response.data
            });
            // router.push('/missions');
        } catch (error) {
            uiStore.setToastMessage(error.data.message, 'error');
            this.errors = error.data.errors;
        }
    },

    async fetchMission(mission_id: string | RouteParamValue[]) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();

        try {
            const {data, error} = await useFetch(`${config.public.apiBase}mission/${mission_id}`, {
                headers: {Authorization: `Bearer ${config.public.apiSecret}`}
            });

            if (error.value) {
                throw error.value;
            }

            this.mission = data.value.data;
        } catch (error) {
            uiStore.setToastMessage('Falha ao carregar dados da missão', 'error');
            this.errors = error;
        }
    },

    async editMission(params: object, mission_id: string) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();
        // const router = useRouter();

        try {
            await $fetch(`${config.public.apiBase}mission/${mission_id}`, {
                method: 'PUT',
                body: params,
                headers: {Authorization: `Bearer ${config.public.apiSecret}`}
            });
            uiStore.setToastMessage('Missão atualizada com sucesso', 'success');
            // router.push('/missions');
        } catch (error) {
            uiStore.setToastMessage('Falha ao editar dados da missão', 'error');
            this.errors = error;
        }
    },

    async destroyMission(mission_id: string) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();
        const router = useRouter();

        try {
            await $fetch(`${config.public.apiBase}mission/${mission_id}`, {
                method: 'DELETE',
                headers: {Authorization: `Bearer ${config.public.apiSecret}`}
            });
            uiStore.setToastMessage('Missão excluída com sucesso', 'success');
            router.push('/teams');
        } catch (error) {
            uiStore.setToastMessage('Falha ao excluir missão', 'error');
            this.errors = error;
        }
    }
}

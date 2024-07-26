import type {RouteParamValue} from "vue-router";
import {useUiStore} from '@/store/ui/uiStore'
import {useRuntimeConfig} from "#imports";

export const actions = {
    async fetchSquads() {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();
        this.loading = true;

        try {
            const {data, error} = await useFetch(`${config.public.apiBase}squad`, {
                headers: {Authorization: `Bearer ${config.public.apiSecret}`},
            });

            if (error.value) {
                throw error.value;
            }

            this.squads = data._value.squads.data;
            this.pagination = {
                current_page: data._value.squads.current_page,
                last_page: data._value.squads.last_page,
                total: data._value.squads.total
            };
        } catch (error) {
            console.log(error);
            uiStore.setToastMessage('Erro ao carregar os esquadrões', 'error');
            this.errors = error
        } finally {
            this.loading = false;
        }
    },

    async newSquad(params: object) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();
        // const router = useRouter();

        try {
            await $fetch(`${config.public.apiBase}squad`, {
                method: 'POST',
                body: params,
                headers: {Authorization: `Bearer ${config.public.apiSecret}`}
            }).then((response) => {
                uiStore.setToastMessage('Esquadrão criado com sucesso', 'success');
                this.lastCreatedSquad = response.data
            });
            // router.push('/missions');
        } catch (error) {
            uiStore.setToastMessage(error.data.message, 'error');
            this.errors = error.data.errors;
        }
    },

    async fetchSquad(squad_id: string | RouteParamValue[]) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();

        try {
            const {data, error} = await useFetch(`${config.public.apiBase}squad/${squad_id}`, {
                headers: {Authorization: `Bearer ${config.public.apiSecret}`}
            });

            if (error.value) {
                throw error.value;
            }

            this.squad = data.value.data;
        } catch (error) {
            uiStore.setToastMessage('Falha ao carregar dados do esquadrão', 'error');
            this.errors = error;
        }
    },

    async editSquad(params: object, squad_id: string) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();
        // const router = useRouter();

        try {
            await $fetch(`${config.public.apiBase}squad/${squad_id}`, {
                method: 'PUT',
                body: params,
                headers: {Authorization: `Bearer ${config.public.apiSecret}`}
            });
            uiStore.setToastMessage('Esquadrão atualizada com sucesso', 'success');
            // router.push('/missions');
        } catch (error) {
            uiStore.setToastMessage('Falha ao editar dados ddo esquadrão', 'error');
            this.errors = error;
        }
    },

    async destroySquad(squad_id: string) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();
        // const router = useRouter();

        try {
            await $fetch(`${config.public.apiBase}squad/${squad_id}`, {
                method: 'DELETE',
                headers: {Authorization: `Bearer ${config.public.apiSecret}`}
            });
            uiStore.setToastMessage('Esquadrão excluído com sucesso', 'success');
            // router.push('/teams');
        } catch (error) {
            uiStore.setToastMessage('Falha ao excluir esquadrão', 'error');
            this.errors = error;
        }
    },


    async addSquadToMission(mission_id: string, params: object) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();

        try {
            await $fetch(`${config.public.apiBase}mission-squad/mission/${mission_id}`, {
                method: 'POST',
                body: {squad_ids: params},
                headers: {Authorization: `Bearer ${config.public.apiSecret}`}
            })
            uiStore.setToastMessage('Esquadrão atrelado com sucesso a missão', 'success');
        } catch (error) {
            uiStore.setToastMessage('Falha ao atrelar esquadrão a missão', 'error');
            this.errors = error;
        }
    },
}

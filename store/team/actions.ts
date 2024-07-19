import type {RouteParamValue} from "vue-router";
import {useUiStore} from '@/store/ui/uiStore'
import {useRouter, useRuntimeConfig} from "#imports";

export const actions = {
    async fetchTeams() {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();
        this.loading = true;

        try {
            const {data, error} = await useFetch(`${config.public.apiBase}teams`, {
                headers: {Authorization: `Bearer ${config.public.apiSecret}`},
            });

            if (error.value) {
                throw error.value;
            }

            this.teams = data._value.teams.data;
            this.pagination = {
                current_page: data._value.teams.current_page,
                last_page: data._value.teams.last_page,
                total: data._value.teams.total
            };
        } catch (error) {
            console.log(error);
            uiStore.setToastMessage('Erro ao carregar as equipes', 'error');
            this.errors = error
        } finally {
            this.loading = false;
        }
    },

    async newTeam(params: object) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();
        const router = useRouter();

        try {
            await $fetch(`${config.public.apiBase}teams`, {
                method: 'POST',
                body: params,
                headers: {Authorization: `Bearer ${config.public.apiSecret}`}
            });
            uiStore.setToastMessage('Equipe criada com sucesso', 'success');
            router.push('/teams');
        } catch (error) {
            uiStore.setToastMessage(error.data.message, 'error');
            this.errors = error.data.errors;
        }
    },

    async fetchTeam(team_id: string | RouteParamValue[]) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();

        try {
            const {data, error} = await useFetch(`${config.public.apiBase}teams/${team_id}`, {
                headers: {Authorization: `Bearer ${config.public.apiSecret}`}
            });

            if (error.value) {
                throw error.value;
            }

            this.team = data.value.data;
        } catch (error) {
            uiStore.setToastMessage('Falha ao carregar dados da equipe', 'error');
            this.errors = error;
        }
    },

    async editTeam(params: object, team_id: string) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();
        const router = useRouter();

        try {
            await $fetch(`${config.public.apiBase}teams/${team_id}`, {
                method: 'PUT',
                body: params,
                headers: {Authorization: `Bearer ${config.public.apiSecret}`}
            });
            uiStore.setToastMessage('Equipe atualizada com sucesso', 'success');
            router.push('/teams');
        } catch (error) {
            uiStore.setToastMessage('Falha ao editar dados da equipe', 'error');
            this.errors = error;
        }
    },

    async destroyTeam(hero_id: string) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();
        const router = useRouter();

        try {
            await $fetch(`${config.public.apiBase}teams/${hero_id}`, {
                method: 'DELETE',
                headers: {Authorization: `Bearer ${config.public.apiSecret}`}
            });
            uiStore.setToastMessage('Equipe excluída com sucesso', 'success');
            router.push('/teams');
        } catch (error) {
            uiStore.setToastMessage('Falha ao excluir equipe', 'error');
            this.errors = error;
        }
    }
}

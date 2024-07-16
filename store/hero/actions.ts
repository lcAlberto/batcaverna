import type {RouteParamValue} from "vue-router";
import {useUiStore} from '@/store/ui/uiStore'
import {useRouter, useRuntimeConfig} from "#imports";

export const actions = {
    async fetchHeroes(params: RequestParams) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();
        this.loading = true;

        try {
            const {data, error} = await useFetch(`${config.public.apiBase}characters`, {
                headers: {Authorization: `Bearer ${config.public.apiSecret}`},
                params
            });

            if (error.value) {
                throw error.value;
            }

            this.heroes = data.value.data;
            this.pagination = {
                current_page: data.value.current_page,
                last_page: data.value.last_page,
                total: data.value.total
            };
        } catch (error) {
            uiStore.setToastMessage('Erro ao carregar heróis', 'error');
            this.errors = error
        } finally {
            this.loading = false;
        }
    },

    async newHero(params: object) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();
        const router = useRouter();

        try {
            await $fetch(`${config.public.apiBase}characters`, {
                method: 'POST',
                body: params,
                headers: {Authorization: `Bearer ${config.public.apiSecret}`}
            });
            uiStore.setToastMessage('Herói criado com sucesso', 'success');
            router.push('/heroes');
        } catch (error) {
            console.log(error.data.errors);
            uiStore.setToastMessage(error.data.message, 'error');
            this.errors = error.data.errors;
        }
    },

    async fetchHero(hero_id: string | RouteParamValue[]) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();

        try {
            const {data, error} = await useFetch(`${config.public.apiBase}characters/${hero_id}`, {
                headers: {Authorization: `Bearer ${config.public.apiSecret}`}
            });

            if (error.value) {
                throw error.value;
            }

            this.hero = data.value.data;
        } catch (error) {
            uiStore.setToastMessage('Falha ao carregar dados do herói', 'error');
            this.errors = error;
        }
    },

    async editHero(params: object, hero_id: number) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();
        const router = useRouter();

        try {
            await $fetch(`${config.public.apiBase}characters/${hero_id}`, {
                method: 'PUT',
                body: params,
                headers: {Authorization: `Bearer ${config.public.apiSecret}`}
            });
            uiStore.setToastMessage('Herói atualizado com sucesso', 'success');
            router.push('/heroes');
        } catch (error) {
            uiStore.setToastMessage('Falha ao editar dados do herói', 'error');
            this.errors = error;
        }
    },

    async destroyHero(hero_id: string) {
        const config = useRuntimeConfig();
        const uiStore = useUiStore();
        const router = useRouter();

        try {
            await $fetch(`${config.public.apiBase}characters/${hero_id}`, {
                method: 'DELETE',
                headers: {Authorization: `Bearer ${config.public.apiSecret}`}
            });
            uiStore.setToastMessage('Herói excluído com sucesso', 'success');
            router.push('/heroes');
        } catch (error) {
            uiStore.setToastMessage('Falha ao excluir herói', 'error');
            this.errors = error;
        }
    }
}

interface RequestParams {
    search: null | string,
    sex: null | string
}
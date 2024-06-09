import type {RouteParamValue} from "vue-router";
import {useUiStore} from '@/store/ui/uiStore'

const uiStore = useUiStore()
const router = useRouter()
const config = useRuntimeConfig()

export const actions = {
    fetchHeroes: async function (params: RequestParams) {
        try {
            const {data, pending, error} = await useFetch(`${config.public.apiBase}characters`, {
                onRequest({options}) {
                    options.headers = { Authorization: `Bearer ${config.public.apiSecret}` }
                    options.params = params
                },
            })
            this.loading = pending;
            this.heroes = data.value.data.data;
            this.errors.value = error;
            const { current_page, last_page, total } = data.value;
            this.pagination = {
                current_page,
                last_page,
                total
            };
        } catch (error) {
            uiStore.setToastMessage('Erro ao carregar herói', 'error', null)
            this.errors = error;
        }
    },

    newHeroes: async function(params: object) {
        try {
            await $fetch(`${config.public.apiBase}characters`, {
                method: 'POST',
                body: params,
                'Content-Type': 'Application/json',
                'Accept': 'Application/json',
                headers: { Authorization: `Bearer ${config.public.apiSecret}` }
            })
            uiStore.setToastMessage('Heroi criado com sucesso', 'success', null)
            router.push('/heroes')
        } catch (error) {
            uiStore.setToastMessage('Falha ao criar herói', 'error', null)
            this.errors = error;
        }
    },

    fetchHero: async function (hero_id: string | RouteParamValue[]) {
        try {
            const response = await useFetch(`${config.public.apiBase}characters/${hero_id}`, {
                onRequest({options}) {
                    options.headers = { Authorization: `Bearer ${config.public.apiSecret}` }
                },
            })
            this.hero.value = response.data.value.data;
        } catch (error) {
            uiStore.setToastMessage('Falha ao carregar dados do herói', 'error', null)
            this.errors = error;
        }
    },

    editHero: async function(params: object, hero_id: number) {
        try {
            await $fetch(`${config.public.apiBase}characters/${hero_id}`, {
                method: 'PUT',
                body: params,
                'Content-Type': 'Application/json',
                headers: { Authorization: `Bearer ${config.public.apiSecret}` }
            })
            uiStore.setToastMessage('Herói atualizado com sucesso', 'success', null)
            router.push('/heroes')
        } catch (error) {
            uiStore.setToastMessage('Falha ao editar dados do herói', 'error', null)
            this.errors = error;
        }
    },

    destroyHero: async function(hero_id: string) {
        try {
            await $fetch(`${config.public.apiBase}characters/${hero_id}`, {
                method: 'DELETE',
                'Content-Type': 'Application/json',
                headers: { Authorization: `Bearer ${config.public.apiSecret}` }
            })
            uiStore.setToastMessage('Herói excluído com sucesso', 'success', null)
            router.push('/heroes')
        } catch (error) {
            uiStore.setToastMessage('Falha ao excluir herói', 'error', null)
            this.errors = error;
        }
    }
}

interface RequestParams {
    search: null|string,
    sex: null|string
}
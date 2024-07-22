import {useUiStore} from '@/store/ui/uiStore'


export const actions = {
    fetchWeakness: async function (params: object | null) {
        const uiStore = useUiStore()
        const config = useRuntimeConfig()
        try {
            const {data, pending, error} = await useFetch(`${config.public.apiBase}weakness`, {
                onRequest({options}) {
                    options.headers = { Authorization: `Bearer ${config.public.apiSecret}` }
                    options.params = params
                },
            })
            this.loading = pending;
            this.weakness = data.value.data.data;
            this.errors.value = error;
            const { current_page, last_page, total } = data.value;
            this.pagination = {
                current_page,
                last_page,
                total
            };
        } catch (error) {
            uiStore.setToastMessage('Erro ao carregar habilidades', 'error', null)
            this.errors = error;
        }
    },

    newWeakness: async function (params: object) {
        const uiStore = useUiStore()
        const config = useRuntimeConfig()
        try {
            await $fetch(`${config.public.apiBase}weakness`, {
                method: 'POST',
                body: params,
                'Content-Type': 'Application/json',
                'Accept': 'Application/json',
                headers: { Authorization: `Bearer ${config.public.apiSecret}` }
            })
            uiStore.setToastMessage('Habilidade criado com sucesso', 'success', null)
            // router.push('/heroes')
        } catch (error) {
            uiStore.setToastMessage('Falha ao criar habilidade', 'error', null)
            this.errors = error;
        }
    },
}
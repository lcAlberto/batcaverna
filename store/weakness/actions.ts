import {useUiStore} from '@/store/ui/uiStore'

const uiStore = useUiStore()
// const router = useRouter()
const config = useRuntimeConfig()

export const actions = {
    fetchWeakness: async function (params: object | null) {
        try {
            const {data, pending, error} = await useFetch(`${config.public.apiBase}weakness`, {
                onRequest({options}) {
                    options.headers = { Authorization: `Bearer ${config.public.apiSecret}` }
                    options.params = params
                },
            })
            this.loading = pending;
            this.skills = data.value.data.data;
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

    newSkill: async function(params: object) {
        try {
            await $fetch(`${config.public.apiBase}skill`, {
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
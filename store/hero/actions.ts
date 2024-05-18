export const actions = {

    fetchHeroes: async function (params: RequestParams) {
        const config = useRuntimeConfig()
        const {data, pending, error} = await useFetch(`${config.public.apiBase}characters`, {
            onRequest({options}) {
                options.headers = {
                    Authorization: `Bearer ${config.public.apiSecret}`
                }
                options.params = params
            },
        })
        this.loading = pending.value;
        this.heroes = data?.value.data;
        this.errors = error;
        const { current_page, last_page, total } = data.value;
        this.pagination = {
            current_page,
            last_page,
            total
        };
    },

    newHeroes: async function(params: object) {
        const config = useRuntimeConfig()
        $fetch(`${config.public.apiBase}characters`, {
            method: 'POST',
            body: params,
            'Content-Type': 'Application/json',
            headers: {
                Authorization: `Bearer ${config.public.apiSecret}`
            }
        }).then((response) => {
            console.log(response);
        })
    }
}

interface RequestParams {
    search: null|string,
    sex: null|string
}
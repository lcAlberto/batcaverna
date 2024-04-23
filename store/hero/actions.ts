export const actions = {
    fetchHeroes: async function () {
        const config = useRuntimeConfig()
        const {data, pending, error} = await useFetch(`${config.public.apiBase}characters`, {
            onRequest({options}) {
                options.headers = {
                    Authorization: `Bearer ${config.public.apiSecret}`
                }
            },
        })
        this.loading = pending.value;
        this.heroes = data.value.data;
        this.errors = error;
        const { current_page, last_page, total } = data.value;
        this.pagination = {
            current_page,
            last_page,
            total
        };
    },
}
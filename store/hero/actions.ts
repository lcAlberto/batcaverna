import type {RouteParamValue} from "vue-router";

export const actions = {

    fetchHeroes: async function (params: RequestParams) {
        try {
            const config = useRuntimeConfig()
            const response = await useFetch(`${config.public.apiBase}characters`, {
                onRequest({options}) {
                    options.headers = {
                        Authorization: `Bearer ${config.public.apiSecret}`
                    }
                    options.params = params
                },
            })

            if (response && response.data && response.data.value) {
                this.heroes = response.data.value.data;
                this.loading = response.pending.value;
                this.errors = response.error;
                const { current_page, last_page, total } = response.data.value;
                this.pagination = {
                    current_page,
                    last_page,
                    total
                };
            } else {
                throw new Error('Invalid API response');
            }
        } catch (error) {
            this.errors = error;
        }
    },

    newHeroes: async function(params: object) {
        try {
            const formData = new FormData();
            Object.entries(params).forEach(([key, value]) => {
                formData.append(key, value);
            });

            const config = useRuntimeConfig()
            await $fetch(`${config.public.apiBase}characters`, {
                method: 'POST',
                body: formData,
                'Content-Type': 'Application/json',
                'Accept': 'Application/json',
                headers: {
                    Authorization: `Bearer ${config.public.apiSecret}`
                }
            }).then((response) => {
                // setar toast de success
                console.log(response);
            })
        } catch (error) {
            console.error(error);
            this.errors = error;
        }
    },

    fetchHero: async function (hero_id: string | RouteParamValue[]) {
        try {
            const config = useRuntimeConfig()
            const response = await useFetch(`${config.public.apiBase}characters/${hero_id}`, {
                onRequest({options}) {
                    options.headers = {
                        Authorization: `Bearer ${config.public.apiSecret}`
                    }
                },
            })

            if (response && response.data && response.data.value) {
                const { data, pending, error } = response;

                this.loading = pending.value;
                this.hero.value = data.value.data;

                this.errors.value = error;
            } else {
                throw new Error('Invalid API response');
            }
        } catch (error) {
            this.errors = error;
        }
    },

    editHero: async function(params: object, hero_id: number) {
        try {
            const formData = new FormData();
            Object.entries(params).forEach(([key, value]) => {
                formData.append(key, value);
            });

            const config = useRuntimeConfig()
            await $fetch(`${config.public.apiBase}characters/${hero_id}`, {
                method: 'POST',
                body: formData,
                'Content-Type': 'Application/json',
                headers: {
                    Authorization: `Bearer ${config.public.apiSecret}`
                }
            }).then((response) => {
                // setar toast de success
                console.log(response);
            })
        } catch (error) {
            console.error(error);
            this.errors = error;
        }
    },

    destroyHero: async function(hero_id: number) {
        try {
            const config = useRuntimeConfig()
            await $fetch(`${config.public.apiBase}characters/${hero_id}`, {
                method: 'DELETE',
                body: formData,
                'Content-Type': 'Application/json',
                headers: {
                    Authorization: `Bearer ${config.public.apiSecret}`
                }
            }).then((response) => {
                // setar toast de success
                console.log(response);
            })
        } catch (error) {
            console.error(error);
            this.errors = error;
        }
    }
}

interface RequestParams {
    search: null|string,
    sex: null|string
}
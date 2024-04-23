export const state = () => ({
    heroes: ref([]),
    hero: ref({}),

    pagination: ref({}),
    errors: ref([]),
    loading: ref(false)
})
export const state = () => ({
    heroes: [],
    hero: ref({}),

    pagination: ref({}),
    errors: ref([]),
    loading: false
})
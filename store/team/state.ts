export const state = () => ({
    teams: [],
    team: ref({}),

    pagination: ref({}),
    errors: ref([]),
    loading: false
})
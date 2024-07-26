export const state = () => ({
    squads: [],
    squad: ref({}),
    lastCreatedSquad: ref({}),

    pagination: ref({}),
    errors: ref([]),
    loading: false
})
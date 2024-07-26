export const state = () => ({
    missions: [],
    mission: ref({}),
    lastCreatedMission: ref({}),

    pagination: ref({}),
    errors: ref([]),
    loading: false
})
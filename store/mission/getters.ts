export const getters = {
    getLoading: (state) => state.loading,
    getMissions: (state) => state.missions,
    getLastCreatedMissions: (state) => state.lastCreatedMission,
    getMission: (state) => state.mission,
    getErrors: (state) => state.errors,
    getPagination: (state) => state.pagination,
}
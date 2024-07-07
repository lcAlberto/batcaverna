export const getters = {
    getLoading: (state) => state.loading,
    getSkills: (state) => state.skills,
    getSkill: (state) => state.skill,
    getErrors: (state) => state.errors.data,
    getPagination: (state) => state.pagination,
}
export const getters = {
    getLoading: (state) => state.loading,
    getHeroes: (state) => state.heroes.data,
    getErrors: (state) => state.errors.data,
    getPagination: (state) => state.pagination,
}
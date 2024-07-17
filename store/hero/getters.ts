export const getters = {
    getLoading: (state) => state.loading,
    getHeroes: (state) => state.heroes.data,
    getHero: (state) => state.hero,
    getErrors: (state) => state.errors,
    getPagination: (state) => state.pagination,
}
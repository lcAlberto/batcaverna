export const getters = {
    getLoading: (state) => state.loading,
    getWeakness: (state) => state.weakness,
    getWeak: (state) => state.weak,
    getErrors: (state) => state.errors.data,
    getPagination: (state) => state.pagination,
}
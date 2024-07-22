import {defineStore} from 'pinia'
import {getters} from "~/store/weakness/getters";
import {state} from "~/store/weakness/state";
import {actions} from "~/store/weakness/actions";

export const useWeaknessStore = defineStore('weaknessStore', {
    getters,
    state,
    actions,
})
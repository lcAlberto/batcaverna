import {defineStore} from 'pinia'

import {getters} from './getters'
import {state} from './state'
import {actions} from './actions'

export const useMissionStore = defineStore('missionStore', {
    getters,
    state,
    actions,
})
// @ts-check
import {acceptHMRUpdate, defineStore} from 'pinia'

/**
 * Simulate a login
 */

export const useBackClockInfoStore = defineStore({
    id: 'clockInfo',
    state: () => ({
        clockList: [],
        backClockInfo: []
    })
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBackClockInfoStore, import.meta.hot))
}

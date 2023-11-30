// @ts-check
import {acceptHMRUpdate, defineStore} from 'pinia'

/**
 * Simulate a login
 */

export const useDialogStore = defineStore({
    id: 'dialog',
    state: () => ({
        isRead: false,
        mallRead: false,
        basicInformations:{}
    }), persist: {
        key: 'dialog',
        storage: sessionStorage,
        paths: ['isRead', 'mallRead'],
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDialogStore, import.meta.hot))
}

// @ts-check
import {acceptHMRUpdate, defineStore} from 'pinia'
import {UserControllerService, UserVO} from "../services/moguding-backend";

export const useUserStore = defineStore({
    id: 'user',
    state: (): { loginUser: UserVO } => ({
        loginUser: {userName: null,}
    }),

    actions: {
        /**
         * Attempt to login a user
         */
        async login(userAccount: string, password: string) {
            const res = await UserControllerService.userLoginUsingPost(
                {userPassword: password, userAccount: userAccount}
            )
            if (res && res.code === 0) {
                this.$patch({
                    loginUser: {
                        ...res.data,
                    }
                })
            } else {
                this.$patch({
                    loginUser: {userRole: "notLogin"}
                })
            }
            return res
        },
        async getLoginUser() {
            const res = await UserControllerService.getLoginUserUsingGet();
            if (res && res.code === 0) {
                this.$patch({
                    loginUser: {
                        ...res.data,
                    }
                })
            } else {
                this.$patch({
                    loginUser: {
                        userRole: "notLogin"
                    }
                })
            }
            return res
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}

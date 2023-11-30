<template>
  <div style="height: 100%">
    <div>
      <br> <br> <br> <br><br>
            <div class="flex justify-center items-center mt-2">
              <van-image
                  class="border border-white"
                  round
                  width="6rem"
                  height="6rem"
                  src="/logo.gif"
              />
            </div>
      <div class="flex justify-center items-center mt-3 text-3xl text-center font-sans font-bold">
        自动打卡
      </div>
      <div class="mt-5">
        <van-form>
          <van-cell-group inset>
            <van-field
                v-model="data.loginData.userAccount"
                name="userAccount"
                label="账号"
                placeholder="请输入你的账号"
                :rules="[{ required: true, message: '请填写你的账号' }]"
            />
            <van-field
                v-model="data.loginData.password"
                type="password"
                name="password"
                label="密码"
                placeholder="请输入你的密码"
                :rules="[{ required: true, message: '请输入你的密码' }]"
            />
          </van-cell-group>
          <div class="mt-4 mx-4">
            <van-button plain block @click="login" round type="primary">
              登录
            </van-button>
            <span @click="router.push('/register')" class="text-gray-400 text-sm float-right mt-2"> 还没有账号？点击注册
            </span>
          </div>
        </van-form>
      </div>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {showSuccessToast} from "vant";
import {useUserStore} from "../stores/user";

const userStore = useUserStore();
const router = useRouter()
const data = reactive({
  loginData: {
    userAccount: '',
    password: ""
  }
})

const login = async () => {
  const res = await userStore.login(data.loginData.userAccount, data.loginData.password);
  if (res.data && res.code === 0) {
    showSuccessToast("欢迎回来")
    await router.push("/")
  }
}
const onSubmit = (values) => {

};
</script>

<style>
</style>

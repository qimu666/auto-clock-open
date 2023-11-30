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
      <div class="flex justify-center items-center mt-2 text-3xl text-center font-sans font-bold">
        自动打卡
      </div>
      <div class="mt-5">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field
                v-model="data.registerData.userName"
                name="userName"
                label="昵称"
                placeholder="请输入你的昵称"
            />
            <van-field
                v-model="data.registerData.userAccount"
                name="userAccount"
                label="账号"
                placeholder="请输入你的账号"
                :rules="[{ required: true, message: '请填写你的账号' }]"
            />
            <van-field
                v-model="data.registerData.userPassword"
                type="password"
                name="userPassword"
                label="密码"
                placeholder="请输入你的密码"
                :rules="[{ required: true, message: '请输入你的密码' }]"
            />
            <van-field
                v-model="data.registerData.checkPassword"
                type="password"
                name="checkPassword"
                label="确认密码"
                placeholder="请确认你的密码"
                :rules="[{ required: true, message: '请确认你的密码' }]"
            />
          </van-cell-group>
          <div class="mt-4 mx-4">
            <van-button plain block round type="primary" native-type="submit">
              注册
            </van-button>
            <span @click="router.push('/login')" class="text-gray-400 text-sm float-right mt-2">已有账号？点击登录</span>
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
import {UserControllerService} from "../services/moguding-backend";
import {showSuccessToast} from "vant";

const router = useRouter()
const data = reactive({
  registerData: {
    userAccount: '',
    userName: '',
    checkPassword: '',
    userPassword: ""
  }
})
const onSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(data.registerData)
  if (res.data && res.code === 0) {
    showSuccessToast("注册成功")
    await router.push("/login")
  }
};</script>

<style scoped></style>

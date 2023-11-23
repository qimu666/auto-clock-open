<template>
  <div style="height: 100%">
    <div>
      <br> <br> <br> <br><br>
      <!--      <div class="flex justify-center items-center mt-2">-->
      <!--        <van-image-->
      <!--            round-->
      <!--            width="6rem"-->
      <!--            height="6rem"-->
      <!--            src="/logo.jpg"-->
      <!--        />-->
      <!--      </div>-->
      <div class="flex justify-center items-center mt-2 text-3xl text-center font-sans font-bold">
        自动打卡
      </div>
      <div class="mt-5">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field
                v-model="data.loginData.userName"
                name="userName"
                label="昵称"
                placeholder="请输入你的昵称"
            />
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
            <van-field
                v-model="data.loginData.checkPassword"
                type="checkPassword"
                name="password"
                label="确认密码"
                placeholder="请确认你的密码"
                :rules="[{ required: true, message: '请确认你的密码' }]"
            />
          </van-cell-group>
          <div class="mt-4 mx-4">
            <van-button plain block round type="primary" native-type="submit">
              注册
            </van-button>
            <router-link to="/login" class="text-gray-400 text-sm float-right mt-2">已有账号？点击登录</router-link>
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

const router = useRouter()
const data = reactive({
  loginData: {
    userAccount: '',
    userName: '',
    checkPassword: '',
    password: ""
  }
})
const onSubmit = (values) => {
  console.log('submit', values);
};</script>

<style scoped></style>

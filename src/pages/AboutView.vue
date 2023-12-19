<template>
  <div>
    <div class="flex justify-center items-center mt-2"
    >
      <van-image
          class="border border-white"
          round
          width="6rem"
          height="6rem"
          src="/logo.gif"
      />
    </div>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">{{
        loginUser.userAccount
      }}
    </van-divider>
    <van-cell-group>
      <van-cell :value="loginUser.userAccount">
        <template #title>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5 stroke-1">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
            </svg>

            <span class="custom-title">&nbsp;我的账号</span>
          </div>
        </template>
      </van-cell>
      <van-cell :value="loginUser.coin">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5 stroke-1">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="custom-title">&nbsp;我的积分</span>
          </div>
        </template>
      </van-cell>
      <van-cell @click="router.push('/coin_detail')" is-link>
        <template #title>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5 stroke-1">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/>
            </svg>
            <span class="custom-title">&nbsp;积分明细</span>
          </div>
        </template>
      </van-cell>
      <van-cell v-if="loginUser.userRole==='admin'" @click="router.push('/coinChange')" is-link>
        <template #title>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5 stroke-1">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="custom-title">&nbsp;积分变更</span>
          </div>
        </template>
      </van-cell>
      <van-cell is-link v-if="loginUser.userRole==='admin'" @click="router.push('/system')">
        <template #title>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5 stroke-1">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"/>
            </svg>

            <span class="custom-title">&nbsp;系统管理</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="mt-2">
      <van-button block @click="logout">退出登录</van-button>
    </div>
    <div class="h2"></div>
  </div>
  <div>
    <div class="mt-2 h-64 overflow-auto">
      <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
      >
        <van-cell-group>
           <van-cell v-for="item in data.record" :title="getTitle(item)"/>
        </van-cell-group>
      </van-list>
    </div>
  </div>
  <br>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from '../stores/user'
import {CoinDetailControllerService, DailyCheckIn, UserControllerService} from "../services/moguding-backend";
import {reactive, ref} from "vue";

const router = useRouter();
const userStore = useUserStore()
const {loginUser} = userStore
const logout = async () => {
  await UserControllerService.userLogoutUsingPost()
  await router.push('/login')
}

const route = useRoute();
const loading = ref(false)
const finished = ref(false)
const phoneData = ref()
const bgColor = (item) => {
  if (item.status === 1) {
    return 'bg-green-50'
  }
  if (item.status === 3) {
    return 'bg-red-50'
  }
}
const foramDate = (val) => {
  const date = new Date(val);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

}
const getTitle = (item) => {
  if (item.type !== 'reduceCoin' && item.type !== 'recharge') {
    return foramDate(item.createTime) + '  ' + item.nikeName + ' ' + item.description + ' - ' + item.coinNum
  } else {
    if (item.type === 'reduceCoin') {
      return foramDate(item.createTime) + '  ' + item.description + ' - ' + item.coinNum
    } else {
      return foramDate(item.createTime) + '  ' + item.description + ' + ' + item.coinNum
    }
  }
}

interface stats {
  record: DailyCheckIn[]
  initPageNum: number
}

const data: stats = reactive({
  record: [],
  initPageNum: 1
})

const onLoad = async () => {
  const res = await CoinDetailControllerService.listCoinDetailByPageUsingPost({
    current: data.initPageNum,
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true
    } else {
      data.record.push(...res.data.records)
      data.initPageNum += 1;
    }
  }
  loading.value = false
}
</script>

<style scoped></style>

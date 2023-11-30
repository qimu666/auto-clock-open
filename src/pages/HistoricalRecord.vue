<template>
  <div class="mt-2">
    <van-list
        class="min-h-[400px]"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
    >
      <div class="mt-2 bg-white flex items-center justify-center text-l h-10">账号：{{ phoneData }}</div>
      <div class="h-2"></div>
      <div class="mt-2" :class="bgColor(item)" v-for="item in data.record">
        <div class="h-2"></div>
        <div class="mx-2">
          <p class="flex items-center justify-center">{{ foramDate(item.createTime) }}</p>
          <p class="flex items-center justify-center">{{ item.description }}</p>
        </div>
        <div class="h-2"></div>
      </div>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {DailyCheckIn, DailyCheckInControllerService} from "../services/moguding-backend";
import {useRoute} from "vue-router";
import {showFailToast} from "vant";

const route = useRoute();
const loading = ref(false)
const finished = ref(false)
const phoneData = ref()
const bgColor = (item) => {
  if (item.status===1){
    return 'bg-green-50'
  }
  if (item.status===3){
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

interface stats {
  record: DailyCheckIn[]
  initPageNum: number
}

const data: stats = reactive({
  record: [],
  initPageNum: 1
})

onMounted(async () => {
  const {phone} = route.query
  if (!phone) {
    showFailToast("打卡账号不存在")
    return
  }
  phoneData.value = phone
})
const onLoad = async () => {
  const res = await DailyCheckInControllerService.listDailyCheckInByPageUsingPost({
    phone: phoneData.value, current: data.initPageNum,
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

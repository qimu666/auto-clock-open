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

      <van-cell-group inset>
        <van-cell v-for="item in data.record" :title="getTitle(item)"/>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {CoinDetailControllerService, DailyCheckIn} from "../services/moguding-backend";
import {useRoute} from "vue-router";

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

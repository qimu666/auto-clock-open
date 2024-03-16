<template>
  <div class="mt-2 ">
    <van-search v-model="value" placeholder="请输入搜索关键词"/>
    <div v-if="data.shopData.length>0">
      <div class="grid grid-cols-2 mt-3 sm:grid-cols-4 lg:grid-cols-3 gap-3">
        <div v-for="item in data.shopData" class="bg-white h-40 rounded" @click="clickTabBar(item.id)">
          <div @click="goToUrl(item)">
            <div class="flex justify-center items-center mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor"
                   :class="data.activeIndex === item.id?'stroke-cyan-500':''"
                   class="w-16 h-16 stroke-1">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
              </svg>
            </div>
            <p class="flex justify-center items-center mt-1 text-sm">
              {{ item.name }}
            </p>
            <div class="flex justify-center items-center mt-1 text-sm">
              <span class="text-red-500">{{ item.coin }}</span> 积分&nbsp;/&nbsp;
              <p v-if="item.timeType==='secondary'">次</p>
              <p v-else-if="item.timeType==='day'">天</p>
              <p v-else>打卡结束</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-empty v-else description="暂无数据"/>
    <br/>
    <br/>
    <br/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {PlatformInfoControllerService} from "../services/moguding-backend";

const router = useRouter();
const clickTabBar = (index: any) => {
  data.activeIndex = index;
};

const data = reactive({
  activeIndex: null,
  shopData: [],
})

onMounted(async () => {
  const res = await PlatformInfoControllerService.listPlatformInfoByPageUsingPost({})
  if (res.data && res.code === 0) {
    data.shopData = res.data.records || []
  }
})

const goToUrl = (item) => {
  if (item.clockType === 'qt') {
    location.href = item.url
    return
  }
  router.push({path: item.url, query: {id: item.id}})
}
const value = ref('');
</script>

<style scoped>
:deep(.van-search__field) {
  flex: 1;
  align-items: center;
  padding: 0 var(--van-padding-xs) 0 0;
  height: var(--van-search-input-height);
  background-color: transparent;
}
</style>

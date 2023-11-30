<template>
  <div class="mt-2">
    <div v-for="item in state.shopData">
      <van-swipe-cell>
        <van-cell :border="false" :title="item.name+' - '+item.coin+'积分 / ' + platForm[item.timeType]"
                  :value="item.status===1?'上架中':'已下架'"/>
        <template #right>
          <div class="space-x-1">
            <van-button square text="修改" plain @click="update(item)" type="primary"/>
            <van-button plain v-if="item.status===2" square text="上架" @click="online(item)" type="primary"/>
            <van-button plain v-else square text="下架" @click="offline(item)" type="danger"/>
            <van-button plain square text="删除" @click="doDelete(item)" type="danger"/>
          </div>
        </template>
      </van-swipe-cell>
      <div class="h-2"/>
    </div>
    <van-button block @click="addMall">新增平台</van-button>
  </div>

</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {showConfirmDialog, showSuccessToast} from "vant";
import {useRouter} from "vue-router";
import {PlatformInfo, PlatformInfoControllerService} from "../services/moguding-backend";

const router = useRouter();

const platForm = {
  day: '天',
  secondary: '次',
  permanent: '永久'
}

interface state {
  shopData: PlatformInfo[]
}

const state:state = reactive({
  shopData: [],
})
const doDelete = async (val) => {
  showConfirmDialog({
    title: '确认删除该平台？',
    message:
        '请确认是否删除该平台：' + val.name + ' - ' + val.coin + '积分 / ' + platForm[val.timeType],
  })
      .then(async () => {
        const res = await PlatformInfoControllerService.deletePlatformInfoUsingPost({id: val.id})
        if (res.data && res.code === 0) {
          state.shopData = state.shopData.filter(coin => coin.id != val.id)
          showSuccessToast("删除成功")
        }
      })
      .catch(() => {
        // on cancel
      });
}
onMounted(async () => {
  const res = await PlatformInfoControllerService.listPlatformInfoByPageUsingPost({})
  if (res.data && res.code === 0) {
    state.shopData = res.data.records || []
  }
})
const addMall = () => {
  router.push({path: '/add_platform'})
}
const update = (val) => {
  router.push({path: '/update_platform', query: {id: val.id}})
}
const offline = async (val) => {
  const res = await PlatformInfoControllerService.offlinePlatformInfoUsingPost({id: val.id})
  if (res.data && res.code === 0) {
    showSuccessToast("下架成功")
    val.status = 0
  }
}

const online = async (val) => {
  const res = await PlatformInfoControllerService.onlinePlatformInfoUsingPost({id: val.id})
  if (res.data && res.code === 0) {
    showSuccessToast("上架成功")
    val.status = 1
  }
}
</script>

<style scoped></style>

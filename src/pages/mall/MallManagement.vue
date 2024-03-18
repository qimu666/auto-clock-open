<template>
  <div class="mt-2">
    <div v-for="item in state.coinData">
      <van-swipe-cell>
        <van-cell :border="false" :title="item.coinName" :value="item.status===1?'上架中':'已下架'"/>
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
    <van-button block @click="addMall">新增积分规格</van-button>
  </div>

</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {ProductInfoControllerService} from "../../services/moguding-backend";
import {useRouter} from "vue-router";
import {showConfirmDialog, showSuccessToast} from "vant";

const router = useRouter();
const state = reactive({
  price: 0,
  addCoin: 0,
  activeIndex: null,
  coinData: []
});
const doDelete = async (val) => {
  showConfirmDialog({
    title: '确认删除该积分规格？',
    message:
        '请确认是否删除该积分规格：' + val.coinName,
  })
      .then(async () => {
        const res = await ProductInfoControllerService.deleteProductInfoUsingPost({id: val.id})
        if (res.data && res.code === 0) {
          state.coinData = state.coinData.filter(coin => coin.id != val.id)
          showSuccessToast("删除成功")
        }
      })
      .catch(() => {
        // on cancel
      });
}
onMounted(async () => {
  const res = await ProductInfoControllerService.listProductInfoByPageUsingPost({})
  if (res.data && res.code === 0) {
    state.coinData = res.data.records || []
  }
})
const addMall = () => {
  router.push({path: '/add_mall'})
}
const update = (val) => {
  router.push({path: '/update_mall', query: {id: val.id}})
}
const offline = async (val) => {
  const res = await ProductInfoControllerService.offlineProductInfoUsingPost({id: val.id})
  if (res.data && res.code === 0) {
    showSuccessToast("下架成功")
    val.status = 0
  }
}

const online = async (val) => {
  const res = await ProductInfoControllerService.onlineProductInfoUsingPost({id: val.id})
  if (res.data && res.code === 0) {
    showSuccessToast("上架成功")
    val.status = 1
  }
}
</script>

<style scoped></style>

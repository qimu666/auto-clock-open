<template>
  <div class="mt-2">
    <div v-if="state.coinData.length>0" >
    <div class="grid grid-cols-2 mt-3 sm:grid-cols-4 lg:grid-cols-3 gap-3">
      <div v-for="item in state.coinData" @click="clickTabBar(item)"
           class="h-40 rounded bg-white">
        <div class="flex justify-center items-center mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor"
               :class="state.activeIndex === item.id?'stroke-cyan-500':''"
               class=" w-16 h-16 stroke-1">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <p class="flex justify-center items-center mt-1">
          {{ item.coinName }}
        </p>
        <p class="flex justify-center items-center mt-1 text-red-500 text-lg">
          ￥{{ item.amount / 100 }}
        </p>
      </div>
      </div>
    </div>
    <div v-else>
    <van-empty description="暂无数据" />
    </div>
    <br/>
    <van-submit-bar
        tip-icon="info-o"
        tip="本商品为虚拟内容,用于平台运转费用,购买后不支持退换。"
        :price="state.price" button-text="提交订单" @submit="onSubmit"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {showConfirmDialog, showToast} from "vant";
import {useUserStore} from '../../stores/user'
import {ProductInfoControllerService} from "../../services/moguding-backend";
import {useDialogStore} from "../../stores/dialogRead";
const dialogStore = useDialogStore();
const state = reactive({
  price:0,
  addCoin: 0,
  activeIndex: null,
  coinData: []
});

const clickTabBar = (item) => {
  state.price = Number(item.amount)
  state.activeIndex = item.id;
  state.addCoin = item.addCoin
};

onMounted(async ()=>{
  const res=await ProductInfoControllerService.listProductInfoByPageUsingPost({})
  if (res.data&&res.code===0){
    state.coinData=res.data.records||[]
  }
})

const user = useUserStore()
const onSubmit = () => {
  // if (price.value <= 0 && !state.activeIndex) {
  //   showToast("请先选择积分规格")
  //   return
  // }
  showConfirmDialog({
    message:
    dialogStore.basicInformations.pointsNotification,
  })
      .then(() => {

      })
      .catch(() => {

      });
};
</script>

<style scoped></style>

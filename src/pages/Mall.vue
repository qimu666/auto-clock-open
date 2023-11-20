<template>
  <div class="mt-2">
    <!--    <van-button @click="add(1)">增加1</van-button>-->
    <!--    <van-button @click="notAdd(1)">减少1</van-button>-->
    <!--    <van-button @click="add(10)">增加10</van-button>-->
    <!--    <van-button @click="notAdd(10)">减少10</van-button>-->
    <!--    <br>-->
    <!--    <br>-->
    <!--    <div style="width: 300px;">-->
    <!--      <van-progress-->
    <!--          :percentage="progressVal <0 ?0:progressVal"-->
    <!--          :pivot-text="text"-->
    <!--          layer-color="#ebedf0"-->
    <!--      />-->
    <!--    </div>-->
    <div class="grid grid-cols-2 mt-3 sm:grid-cols-4 lg:grid-cols-3 gap-3">
      <div v-for="item in state.coinData" @click="clickTabBar(item.amount,item.id)"
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
    <br/>
    <van-submit-bar
        tip-icon="info-o"
        tip="本商品为虚拟内容,用于平台运转费用,购买后不支持退换。"
        :price="price" button-text="提交订单" @submit="onSubmit"/>
  </div>

</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {showToast} from "vant";

const progressVal = ref(0);
const residual = ref(2);
const countDay = ref(100);
const text = computed(() => "剩余" + residual.value < 0 ? 0 : residual.value + "天");
const add = (val: number) => {
  if (residual.value + val > countDay.value) {
    showToast("最多100天")
    return
  }
  progressVal.value += val;
  residual.value += val;
}
const notAdd = (val: number) => {
  if (residual.value <= val) {
    showToast("天数不能低于0")
    return
  }
  progressVal.value -= val;
  residual.value -= val;
}
progressVal.value = Number(((residual.value / countDay.value) * 100).toFixed(2))
const price = ref(0);
const state = reactive({
  activeIndex: null,
  coinData: [
    {
      id: '1',
      coinName: "增加100积分",
      addCoin: 100,
      amount: 100
    }, {
      id: '2',
      coinName: "增加300积分",
      addCoin: 300,
      amount: 300
    }, {
      id: '3',
      coinName: "增加600积分",
      addCoin: 600,
      amount: 600
    }
  ]

});

const clickTabBar = (val: any, index: any) => {
  price.value = val
  state.activeIndex = index;
};

computed(() => {

  return
});

const onSubmit = () => {
  if (price.value <= 0 && !state.activeIndex) {
    showToast("请先选择积分规格")
    return
  }
  showToast("共" + price.value / 100 + "元")
};
</script>

<style scoped></style>

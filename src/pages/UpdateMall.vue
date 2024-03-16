<template>
  <div class="mt-2">
    <van-form>
      <van-cell-group inset>
        <van-field
            v-model="data.coinData.coinName"
            name="积分规格名称"
            label="规格名称："
            placeholder="请填写积分规格名称"
            :rules="[{ required: true, message: '请填写积分规格名称' }]"
        />
        <van-field
            v-model="data.coinData.amount"
            name="积分价格(分)"
            label="价格(分)："
            placeholder="请填写积分价格(分)"
            :rules="[{ required: true, message: '请填写积分价格(分)' }]"
        />
        <van-field
            v-model="data.coinData.addCoin"
            name="增加积分数(个)"
            label="数量(个)："
            placeholder="请填写增加积数量(个)"
            :rules="[{ required: true, message: '请填写增加积数量(分)' }]"
        />
        <van-field name="radio" label="积分默认状态">
          <template #input>
            <van-radio-group v-model="data.status" direction="horizontal">
              <van-radio :name="1">上架</van-radio>
              <van-radio :name="2">下架</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;" class="space-y-2">
        <van-button round block type="primary" @click="updateMall" native-type="submit">
          修改
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {ProductInfo, ProductInfoControllerService} from "../services/moguding-backend";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute} from "vue-router";

const route = useRoute();

interface State {
  coinData: ProductInfo,
  status: number
}
const data: State = reactive({coinData: {}, status: 1})

onMounted(async () => {
  console.log(1)
  const {id} = route.query
  if (!id) {
    showFailToast("积分规格不存在")
    return
  }
  const res =await ProductInfoControllerService.getProductInfoByIdUsingGet(id)
  if (res.data && res.code === 0) {
    data.coinData=res.data
    data.status=res.data.status
  }
})

const updateMall = async () => {
  const res = await ProductInfoControllerService.updateProductInfoUsingPost({...data.coinData, status: data.status})
  if (res.data && res.code === 0) {
    showSuccessToast("更新成功")
  }
}
</script>

<style scoped></style>

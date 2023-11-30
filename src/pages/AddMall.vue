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
            <van-radio-group v-model="data.status"  direction="horizontal">
              <van-radio :name="1">上架</van-radio>
              <van-radio :name="2">下架</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;" class="space-y-2">
        <van-button round block type="primary" @click="addMall" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">

import {reactive} from "vue";
import {ProductInfo, ProductInfoControllerService} from "../services/moguding-backend";
import {showSuccessToast} from "vant";

interface State {
  coinData: ProductInfo,
  status: number,
}

const data: State = reactive({coinData: {}, status: 1})

const addMall = async () => {
  const res = await ProductInfoControllerService.addProductInfoUsingPost({...data.coinData, status: data.status})
  if (res.data && res.code === 0) {
    showSuccessToast("新增成功")
  }
}
</script>


<style scoped></style>

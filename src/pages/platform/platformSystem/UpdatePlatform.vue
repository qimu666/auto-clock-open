<template>
  <div class="mt-2">
    <van-form>
      <van-cell-group inset>
        <van-field
            v-model="data.shopData.name"
            name="平台名称"
            label="平台名称："
            placeholder="请填写平台名称"
            :rules="[{ required: true, message: '请填写平台名称' }]"
        />
        <van-field
            v-model="data.shopData.coin"
            name="积分价格(个)"
            label="价格(个)："
            placeholder="请填写平台积分价格(个)"
            :rules="[{ required: true, message: '请填写平台积分价格(个)' }]"
        />
        <van-field name="radio" label="平台类型：">
          <template #input>
            <van-radio-group v-model="data.clockType" direction="horizontal">
              <van-radio name="gxy">工学云</van-radio>
              <br/>
              <van-radio name="zxjy">职校家园</van-radio>
              <br/>
              <van-radio name="qt">其他</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="data.clockType==='qt'"
            v-model="data.url"
            name="其他平台地址"
            label="其他平台地址"
            placeholder="请填写其他平台地址"
        />
        <van-field name="radio" label="时长类型：">
          <template #input>
            <van-radio-group v-model="data.timeType" direction="horizontal">
              <van-radio name="secondary">次</van-radio>
              <van-radio name="day">天</van-radio>
              <van-radio name="permanent">永久</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="radio" label="默认状态">
          <template #input>
            <van-radio-group v-model="data.status" direction="horizontal">
              <van-radio :name="1">上架</van-radio>
              <van-radio :name="2">下架</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;" class="space-y-2">
        <van-button round block type="primary" @click="updatePlatForm" native-type="submit">
          修改
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">import {onMounted, reactive} from "vue";
import {
  PlatformInfo,
  PlatformInfoControllerService,
  ProductInfo,
  ProductInfoControllerService
} from "../../../services/moguding-backend";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute} from "vue-router";

const route = useRoute();

interface stats {
  shopData: PlatformInfo,
  status: number,
  timeType: string,
  clockType: string
  url: string
}

const data: stats = reactive({
  shopData: {},
  status: 1,
  timeType: 'secondary',
  clockType: 'gxy',
  url: null
})

onMounted(async () => {
  const {id} = route.query
  if (!id) {
    showFailToast("平台不存在")
    return
  }
  const res = await PlatformInfoControllerService.getPlatformInfoByIdUsingGet(id)
  if (res.data && res.code === 0) {
    data.shopData = res.data
    data.status = res.data.status
    data.timeType=res.data.timeType
    data.clockType=res.data.clockType
    if (res.data.clockType==='qt'){
      data.url=res.data.url
    }
  }
})

const updatePlatForm = async () => {
  const res = await PlatformInfoControllerService.updatePlatformInfoUsingPost({
    ...data.shopData,
    clockType:data.clockType,
    timeType: data.timeType,
    status: data.status,
    url: data.url
  })
  if (res.data && res.code === 0) {
    showSuccessToast("更新成功")
  }
}
</script>

<style scoped></style>

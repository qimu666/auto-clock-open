<template>
  <div class="mt-2">
    <van-form>
      <van-cell-group inset>
        <van-field
            v-model="data.user.userAccount"
            name="用户账号"
            label="用户账号："
            placeholder="请填写用户账号"
            :rules="[{ required: true, message: '请填写用户账号' }]"
        />
        <van-cell center title="获取用户当前积分">
          <template #right-icon>
            <van-switch size="22px" :loading="data.loading" @click="getUserInfo" v-model="data.getClockInfoStatus"/>
          </template>
        </van-cell>
        <van-field
            v-model="data.user.coin"
            name="用户当前积分"
            label="用户积分："
            placeholder="用户当前积分"
            readonly
        />
        <van-field
            v-model="data.addCoin"
            name="增加积分"
            label="增加积分："
            :rules="[{ required: true, message: '请填写增加积分数量' }]"
        />
        <van-field
            v-model="data.reduceCoin"
            name="减少积分"
            label="减少积分："
            :rules="[{ required: true, message: '请填写减少积分数量' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;" class="space-y-2">
        <van-button round block type="primary" @click="addCoin" native-type="submit">
          增加积分
        </van-button>
        <van-button round block type="primary" @click="reduceCoin" native-type="submit">
          扣除积分
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {UserControllerService, UserVO} from "../../services/moguding-backend";
import {showFailToast, showSuccessToast} from "vant";

interface State {
  user: UserVO,
  loading: boolean,
  addCoin: number,
  reduceCoin: number,
}

const data: State = reactive({
  user: {},
  loading: false,
  addCoin: 0,
  reduceCoin: 0,
})

const getUserInfo = async () => {
  data.loading = true
  const res = await UserControllerService.getUserInfoUsingGet(data.user.userAccount)
  if (res.data && res.code === 0) {
    data.user = res.data
  }
  setTimeout(() => {
    data.loading = false
  }, 1500)
}

const reduceCoin = async () => {
  if (data.reduceCoin <= 0) {
    showFailToast("扣除积分需要大于等于0")
    return
  }
  const res = await UserControllerService.reduceCoinUsingGet(data.user.userAccount, data.reduceCoin)
  if (res.data && res.code === 0) {
    showSuccessToast("扣除积分成功")
    await getUserInfo()
  }
}

const addCoin = async () => {
  if (data.addCoin <= 0) {
    showFailToast("增加积分需要大于等于0")
    return
  }
  const res = await UserControllerService.addCoinUsingGet(data.user.userAccount, data.addCoin)
  if (res.data && res.code === 0) {
    showSuccessToast("增加积分成功")
    await getUserInfo()
  }
}

</script>

<style scoped></style>

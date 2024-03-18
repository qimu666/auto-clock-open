<template>
  <div class="mt-2">
    <van-form>
      <van-cell-group inset>
        <van-field
            v-model="loginUser.coin"
            name="当前积分"
            label="当前积分："
            readonly
            input-align="right"
        />
        <van-field
            v-model="data.user.userAccount"
            name="接收账号"
            label="接收账号："
            input-align="right"
            error-message-align="right"
            placeholder="请填写接收账号"
            :rules="[{ required: true, message: '请填写接收账号' }]"
        />
        <van-field
            v-model="data.user.coin"
            name="转账积分数量"
            label="转账数量："
            input-align="right"
            placeholder="转账积分数量"
            error-message-align="right"
            :rules="[{ required: true, message: '请填写转账积分数量' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;" class="space-y-2">
        <van-button round block type="primary" :loading="data.loading" loading-type="spinner" @click="transferCoin"
                    native-type="submit">
          转账
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {UserControllerService} from "../../services/moguding-backend";
import {showConfirmDialog, showFailToast, showSuccessToast} from "vant";
import {useUserStore} from "../../stores/user";

const userStore = useUserStore();
const {loginUser} = userStore

const data = reactive({
  user: {},
  loading: false,
})

const transferCoin = async () => {
  if (data.user.coin <= 0) {
    showFailToast("转账积分需要大于等于0")
    return
  }
  if (isNaN(data.user.coin)) {
    showFailToast("数量输入有误")
    return
  }
  data.loading = true
  showConfirmDialog({
    title: '转账到账号' + data.user.userAccount,
    message:
        '请确认是否转账到账号' + data.user.userAccount + '，' + data.user.coin + '积分',
  })
      .then(async () => {
        const res = await UserControllerService.transferCoinUsingPost(data.user)
        if (res.data && res.code === 0) {
          showSuccessToast("转账积分成功")
          loginUser.coin = res.data.coin
          data.loading = false
        } else {
          data.loading = false
        }
      }).catch(() => {
    data.loading = false
  });
}

</script>

<style scoped></style>

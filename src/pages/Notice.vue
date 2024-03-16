<template>
  <div class="mt-2">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="data.basicInformations.websiteName"
            name="网站名称"
            label="网站名称"
            placeholder="请填写网站名称"
            :rules="[{ required: true, message: '请填写网站名称' }]"
        />
        <van-field
            v-model="data.basicInformations.noticeBar"
            name="滚动通知"
            label="滚动通知"
            placeholder="请填写滚动通知内容"
            :rules="[{ required: true, message: '请填写滚动通知内容' }]"
        />
        <van-field
            v-model="data.basicInformations.announcementTitle"
            name="公告标题"
            label="公告标题"
            placeholder="公告标题"
            :rules="[{ required: true, message: '请填写公告标题' }]"
        />
        <van-field
            v-model="data.basicInformations.announcement"
            name="公告内容"
            label="公告内容"
            placeholder="公告内容"
            :rules="[{ required: true, message: '请填写公告内容' }]"
        />
        <van-field
            v-model="data.basicInformations.noticeAnnouncementTitle"
            name="客服公告标题"
            label="客服公告标题"
            placeholder="客服公告标题"
            :rules="[{ required: true, message: '请填写客服公告标题' }]"
        />
        <van-field
            v-model="data.basicInformations.noticeAnnouncement"
            name="客服公告内容"
            label="客服公告内容"
            placeholder="客服公告内容"
            :rules="[{ required: true, message: '请填写客服公告内容' }]"
        />
        <van-field
            v-model="data.basicInformations.pointsNotification"
            name="购买积分通知"
            label="购买积分通知"
            placeholder="购买积分通知"
            :rules="[{ required: true, message: '请填写购买积分通知' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          更新
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {BasicInformation, BasicInformationControllerService} from "../services/moguding-backend";
import {showSuccessToast} from "vant";
import {useDialogStore} from "../stores/dialogRead";
const dialogStore = useDialogStore();
interface State {
  basicInformations:BasicInformation
}
const data:State = reactive({
  basicInformations:{}
})
const onSubmit = async (values) => {
  const res=await BasicInformationControllerService.updateBasicInformationUsingPost(data.basicInformations)
  if (res.data&&res.code===0){
      dialogStore.basicInformations=res.data
      data.basicInformations=res.data
    showSuccessToast("更新成功")
  }
};onMounted(async ()=>{
  const res=await BasicInformationControllerService.getBasicInformationByIdUsingGet(1)
  if (res.data&&res.code===0){
    data.basicInformations=res.data
  }

})
</script>

<style scoped></style>

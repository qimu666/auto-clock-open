<template>
  <div>
    <van-number-keyboard safe-area-inset-bottom/>
    <div>
      <div v-if="!WHITE_LIST.includes(route.path)">
        <van-nav-bar
            v-if="route.path!=='/'"
            :title="title"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-nav-bar
            v-else
            :title="title"
        />
        <van-notice-bar v-if="path==='/500'" scrollable
                        text="服务器异常请联系管理员" mode="closeable"/>
        <van-notice-bar v-else-if="route.path !=='/mall_management' && dialogStore.basicInformations.noticeBar"
                        scrollable
                        :text="dialogStore.basicInformations.noticeBar" mode="closeable"/>
        <van-notice-bar v-else-if="route.path==='/mall_management'" scrollable text="左划可编辑" mode="closeable"/>
      </div>
      <van-loading v-if="b" class="flex h-screen justify-center items-center" color="#0094ff" vertical>加载中...
      </van-loading>
      <div v-else class="container mx-auto px-2" style="margin-bottom:50px;">
        <router-view/>
      </div>
      <div v-if="!WHITE_LIST.includes(route.path)">
        <van-floating-bubble v-if="path !== '/500'" @click="showA" v-model:offset="offset" axis="xy" icon="chat"/>
        <van-tabbar route>
          <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
          <van-tabbar-item to="/mall" icon="shop-collect-o">积分商城</van-tabbar-item>
          <van-tabbar-item to="/clockInfo">
            <span>信息中台</span>
            <template #icon="props">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-6 h-6"
                   :class="props.active ?'stroke-blue-500':''"
              >
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"/>
              </svg>

            </template>
          </van-tabbar-item>
          <van-tabbar-item to="/about" icon="contact-o">我的</van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
    <van-number-keyboard safe-area-inset-bottom/>
  </div>
</template>
<script lang="ts" setup>
import {useTitle} from "@vueuse/core/index";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {showConfirmDialog, showDialog} from 'vant';
import {useDialogStore} from "./stores/dialogRead";
import {useUserStore} from "./stores/user";
import {BasicInformationControllerService} from "./services/moguding-backend";
import DisableDevtool from 'disable-devtool';

const {getLoginUser, loginUser} = useUserStore();

const options = {
  md5:'b977a915beb91b75508166477665a38b',
  clearLog: true,
  tkName:'devtool',
  url:'https://peisong.meituan.com/rider',
  interval:500,
  ignore: () => {
    return process.env.NODE_ENV === "development";
  }
};

DisableDevtool(options);

const dialogStore = useDialogStore();
const WHITE_LIST = ['/login', '/register']
let path = window.location.pathname
const writeList = [...WHITE_LIST, '/500']

const route = useRoute();
const basicInformation = ref({})

const showA = () => {
  showDialog({
    title: basicInformation.value.noticeAnnouncementTitle,
    message: basicInformation.value.noticeAnnouncement,
  }).then(() => {
    // on close
  });
}

const title = ref()
const b = ref(false)
const active = ref(0);
const router = useRouter();
router.beforeEach(async (to, from, next) => {
  if (!writeList.includes(to.path)) {
    await getLoginUser()
  }
  // @ts-ignore
  const resTitle = useTitle(to.name ? to.name : basicInformation.value.websiteName ? basicInformation.value.websiteName : "自动打卡");
  title.value = resTitle.value
  next();
});
const offset = ref({x: 298, y: 469});

const onClickLeft = () => {
  // b.value = !b.value
  return history.back()
};
onMounted(async () => {
  if (window.location.pathname !== '/500') {
    const res = await BasicInformationControllerService.getBasicInformationByIdUsingGet(1)
    if (res.code === 0 && res.data) {
      basicInformation.value = res.data
      dialogStore.basicInformations = res.data
      if (!dialogStore.isRead) {
        showConfirmDialog({
          title: res.data.announcementTitle,
          message: res.data.announcement,
        })
            .then(() => {
              dialogStore.isRead = true
            })
            .catch(() => {
              dialogStore.isRead = false
            });
      }
    }
  }
})

</script>
<style>
body {
  background-color: rgba(244, 244, 244, 0.99);
}
</style>

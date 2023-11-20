<template>
  <div class="bg-gray-100 h-full">
    <van-number-keyboard safe-area-inset-bottom/>
    <div>
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
      <van-notice-bar scrollable text="米袋虽空——樱花开哉！" mode="closeable"/>

      <van-loading v-if="b" class="flex h-screen justify-center items-center" color="#0094ff" vertical>加载中...
      </van-loading>
      <div v-else class="container mx-auto px-2" style="margin-bottom:50px;">
        <router-view/>
      </div>
      <van-floating-bubble @click="showA" v-model:offset="offset" axis="xy" icon="chat"/>
      <van-tabbar route>
        <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to="/mall" icon="shop-collect-o">积分商城</van-tabbar-item>

        <van-tabbar-item to="/notice">
          <span>通知</span>
          <template #icon="props">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6"
                 :class="props.active ?'stroke-blue-500':''"
            >
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"/>
            </svg>
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/about" icon="contact-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
    <van-number-keyboard safe-area-inset-bottom/>
  </div>
</template>
<script lang="ts" setup>
import {useTitle} from "@vueuse/core/index";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {showDialog} from 'vant';

const route = useRoute();

const showA = () => {

  showDialog({
    title: '联系客服',
    message: '11111111111111111111111111111',
  }).then(() => {
    // on close
  });
}

const title = ref()
const b = ref(false)
const active = ref(0);
const router = useRouter();
router.beforeEach((to, from, next) => {
  // @ts-ignore
  const resTitle = useTitle(to.name ? "自动打卡 - " + to.name : "自动打卡");
  title.value = resTitle.value
  next();
});
const offset = ref({x: 298, y: 469});

const onClickLeft = () => {
  // b.value = !b.value
  return history.back()
};
</script>
<style scoped>
</style>

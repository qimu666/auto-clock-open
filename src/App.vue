<template>
<div>
  <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-loading v-if="b" class="flex h-screen justify-center items-center" color="#0094ff" vertical >加载中...</van-loading>
  <div v-else class="bg-gray-100 bg-gray-100 container mx-auto">
  <router-view class="px-4" />
  </div>
  <van-floating-bubble v-model:offset="offset" axis="xy" icon="chat" />

  <van-tabbar route>
    <van-tabbar-item  to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item  to="/agent" icon="cluster-o">代理</van-tabbar-item>
    <van-tabbar-item  to="/mall" icon="shop-collect-o">积分商城</van-tabbar-item>
    <van-tabbar-item  to="/about" icon="contact-o">我的</van-tabbar-item>
  </van-tabbar>
</div>

</template>
<script lang="ts" setup>
import {useTitle} from "@vueuse/core/index";
import {useRouter} from "vue-router";
import {ref} from "vue";
import { showToast } from 'vant';


const title=ref()
const b=ref(true)

const router = useRouter();
router.beforeEach((to, from, next) => {
  // @ts-ignore
  const resTitle=useTitle(to.name ? "工学云 - " + to.name : "工学云");
  title.value=resTitle.value
  next();
});
const offset = ref({ x: 298 , y: 469 });

const onClickLeft = () => {
 b.value=!b.value
  return history.back()};
</script>
<style scoped>

</style>

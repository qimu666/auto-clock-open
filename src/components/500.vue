<template>
  <div class="mt-20 flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <div class="text-6xl text-red-500 font-bold text-center mb-4">500</div>
      <div class="text-lg text-gray-700 text-center mb-8">服务器异常请联系管理员</div>
      <div class="flex justify-center ">
        <button @click="reloadPage" class="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700">Reload
          Page
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
const reloadPage = () => {
  router.push('/');
}

</script>

<style scoped>
button:hover {
  cursor: pointer;
}
</style>

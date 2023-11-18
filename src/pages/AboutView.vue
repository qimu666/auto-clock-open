<template>
  <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      tel-maxlength="11"
      :change-area="changeArea"
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
  />

  <div>1</div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import { areaList } from '@vant/area-data';
import {showToast} from "vant";

const searchResult = ref([]);

const onSave = (e) => console.log(e);
const changeArea = (e) => console.log(e,'ca');

const onDelete = () => showToast('delete');
const onChangeDetail = (val) => {
  console.log(val)
  if (val) {
    searchResult.value = [
      {
        name: '黄龙万科中心',
        address: '杭州市西湖区',
      },
    ];
  } else {
    searchResult.value = [];
  }
};

</script>

<style scoped></style>

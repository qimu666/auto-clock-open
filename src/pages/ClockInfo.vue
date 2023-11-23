<template>
  <div class="mt-2">
    <van-search
        v-model="searchText"
        @search="onSearch"
        show-action
        @cancel="onCancel"
        placeholder="可搜索打卡账号、打卡地址"/>
    <van-cell-group class="mt-2 rounded">
      <div class="mt-3"></div>
      <div>
        <van-divider
            content-position="left"
            :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px',margin:0 }"
        >
          平台过滤
        </van-divider>
        <div class="mx-4">
          <div class="space-x-1 flex-wrap">
            <van-button
                v-for="item in data.clockType"
                @click="selectClockType(item.value)"
                :type="data.clockTypeActiveIndex === item.value? 'primary' :'default'" size="small"
            >{{ item.tagName }}
            </van-button>
          </div>
        </div>
        <div class="h-2"></div>
      </div>
      <div>
        <van-divider
            content-position="left"
            :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px',margin:0 }"
        >
          状态过滤
        </van-divider>
        <div class="mx-4">
          <div class="space-x-1 flex-wrap">
            <van-button
                v-for="item in data.tagList"
                @click="searchTag(item.type)"
                :type="data.tagActiveType === item.type? 'primary' :'default'" size="small"
            >{{ item.tagName }}
            </van-button>
          </div>
        </div>
        <div class="h-3"></div>
      </div>
    </van-cell-group>
    <p class="mt-2 text-sm text-gray-400">共30条</p>
    <van-list
        class="min-h-[400px]"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
    >
      <div v-for="item in data.clockList">
        <div class="bg-white rounded">
          <div class="h-2"></div>
          <div class="mx-4 text-sm grid grid-cols-2 mt-3 sm:grid-cols-4 lg:grid-cols-4 gap-1">
            <div>
              <div>
                <label>账号：</label>
                <router-link to="#" class="text-blue-400">{{ item.phone }}</router-link>
              </div>
              <div>
                <label>密码：</label>
                <span class="">{{ item.password }}</span>
              </div>
            </div>
            <div>
              <div>
                <label>姓名：</label>
                <span>{{ item.userName }}</span>
              </div>
              <div>
                <label>消息推送：</label>
                <van-tag v-if="item.messagePushStatus" plain>未开启</van-tag>
                <van-tag v-else type="success">已开启</van-tag>
              </div>
            </div>
            <div>
              <div>
                <label>打卡状态：</label>
                <van-tag v-if="item.clockStatus===0" plain>未开启</van-tag>
                <van-tag v-else :type="clockEnumStatus[item.clockStatus]">{{
                    clockEnumStatusMessage[item.clockStatus]
                  }}
                </van-tag>
              </div>
              <div>
                <label>日报状态：</label>
                <van-tag v-if="item.dailyNewspaperStatus===0" plain>未开启</van-tag>
                <van-tag v-else :type="reportEnumStatus[item.dailyNewspaperStatus]">
                  {{ reportEnumStatusMessage[item.dailyNewspaperStatus] }}
                </van-tag>
              </div>
            </div>
            <div>
              <div>
                <label>周报状态：</label>
                <van-tag v-if="item.weekNewspaperStatus===0" plain>未开启</van-tag>
                <van-tag v-else :type="reportEnumStatus[item.weekNewspaperStatus]">
                  {{ reportEnumStatusMessage[item.weekNewspaperStatus] }}
                </van-tag>
              </div>
              <div>
                <label>月报状态：</label>
                <van-tag v-if="item.monthNewspaperStatus===0" plain>未开启</van-tag>
                <van-tag v-else :type="reportEnumStatus[item.monthNewspaperStatus]">{{
                    reportEnumStatusMessage[item.monthNewspaperStatus]
                  }}
                </van-tag>
              </div>
            </div>
            <div class="col-span-2">
              <div class="flex">
                <label>本周已打卡：{{item.clockedSuccessDays}} / {{item.clockedTotalCount}}&nbsp; </label>
                <span>
                <van-progress
                    class="w-[200px] mt-2 mb-2"
                    :percentage="getProgressValue(item)"
                    :pivot-text="getshowClockedSuccessDays(item)"
                    layer-color="#ebedf0"
                /></span>
              </div>
              <div class="mt-2">
                <div class="flex justify-start items-center space-x-6 ml-2">
                  <div @click="router.push(`/clockInfo/detailed/${item.id}`)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div @click="doClock(item)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"/>
                    </svg>
                  </div>
                  <div @click="openClock(item)" v-if="item.clockStatus!==1&&item.clockStatus!==2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/>
                    </svg>
                  </div>
                  <div @click="stopClock(item)" v-if="item.clockStatus===1||item.clockStatus===2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div @click="historicalRecord(item.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div @click="updateClock(item.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                    </svg>
                  </div>
                  <div @click="deleteClock(item.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="h-3"></div>
          </div>
        </div>
        <div class="h-3"/>
      </div>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import {showToast} from "vant";

const clockEnumStatus = {
  0: '',
  1: 'primary',
  2: 'success',
  3: 'danger'
}

const clockEnumStatusMessage = {
  0: '未开启',
  1: '打卡中',
  2: '打卡成功',
  3: '打卡失败'
}
const reportEnumStatus = {
  0: '',
  1: 'primary',
  2: 'success',
  3: 'danger'
}
const reportEnumStatusMessage = {
  0: '未开启',
  1: '填写中...',
  2: '填写成功',
  3: '填写失败'
}
const data = reactive({
  tagActiveType: 'all',
  clockTypeActiveIndex: 'xgy',
  clockList: [],
  tagList: [
    {
      id: '6',
      tagName: '全部订单',
      type: 'all'
    },
    {
      id: '1',
      tagName: '已打卡',
      type: 'success'
    },
    {
      id: '2',
      tagName: '打卡失败',
      type: 'error'
    },
    {
      id: '3',
      tagName: '打卡中',
      type: 'open'
    },
    {
      id: '5',
      tagName: '未开启',
      type: 'off'
    }
  ],
  clockType: [
    {
      id: '2',
      tagName: '学工云',
      value: 'xgy'
    }, {
      id: '1',
      tagName: '职校家园',
      value: 'zxjy'
    },
  ]
})
const doClock = (item) => {
  item.clockStatus = 1
  // showToast("立即打卡账号：" + item.phone)
}
const openClock = (item) => {
  item.clockStatus = 1
  // showToast("开始打卡账号：" + item.phone)
}
const stopClock = (item) => {
  item.clockStatus = 0
  // showToast("暂停打卡账号：" + item.phone)
}
const historicalRecord = (id) => {
  showToast("历史记录id：" + id)
}
const deleteClock = (id) => {
  showToast("删除记录id：" + id)
}
const updateClock = (id) => {
  showToast("修改记录id：" + id)
  router.push({
    path: '/moguding',
    query: {id: id}
  })
}
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const route = useRoute();
const router = useRouter();
const initSearchParams = {
  text: "",
  pageSize: 10,
  pageNum: 1,
};
const getProgressValue = (clock) => {
  let number = Number(((clock.clockedSuccessDays / clock.clockedTotalCount) * 100).toFixed(2));
  console.log(number, "number")
  if (!number) {
    number = 0.00
  }
  return number > 100 ? 100 : number
}
const getshowClockedSuccessDays = (clock) => {
  console.log(clock.clockedSuccessDays, 'clockedSuccessDays')
  return clock.clockedSuccessDays < 0 ? 0 : "已打卡" + clock.clockedSuccessDays + "天"
}
const searchText = ref(route.query.text || "");
const searchParams = ref(initSearchParams);

watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text,
    clockType: route.query.clockType,
    tagType: route.query.tagType
  } as any;
  data.clockTypeActiveIndex = route.query.clockType ? route.query.clockType : data.clockTypeActiveIndex
  data.tagActiveType = route.query.tagType ? route.query.tagType : data.tagActiveType
});

const searchTag = (val: any) => {
  console.log('searchTag', val)
  data.tagActiveType = val
  router.push({
    query: {
      ...searchParams.value,
      tagType: data.tagActiveType,
      clockType: data.clockTypeActiveIndex
    }
  });
}
const selectClockType = (val) => {
  console.log('selectClockType', val)

  data.clockTypeActiveIndex = val
  router.push({
    query: {
      ...searchParams.value,
      tagType: data.tagActiveType,
      clockType: data.clockTypeActiveIndex
    },
  });
}

const onSearch = (val) => {
  router.push({
    query: {
      ...searchParams.value,
      text: val,
    },
  });
};
const onCancel = () => {

};

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  let lodaData = [{
    id: '1',
    phone: '177457290',
    password: '44444444',
    messagePushStatus: false,
    userName: '柒木',
    clockStatus: 0,
    dailyNewspaperStatus: 0,
    weekNewspaperStatus: 0,
    monthNewspaperStatus: 0,
    clockedSuccessDays: 5,
    clockedTotalCount: 7,
  }, {
    id: '4',
    phone: '17745447290',
    password: '222222',
    messagePushStatus: true,
    userName: '柒木',
    clockStatus: 1,
    dailyNewspaperStatus: 1,
    weekNewspaperStatus: 1,
    monthNewspaperStatus: 1,
    clockedSuccessDays: 0,
    clockedTotalCount: 0,
  }, {
    id: '3',
    phone: '177457290',
    password: '555555555',
    messagePushStatus: false,
    userName: '柒木',
    clockStatus: 2,
    dailyNewspaperStatus: 2,
    weekNewspaperStatus: 2,
    monthNewspaperStatus: 2,
    clockedSuccessDays: 3,
    clockedTotalCount: 7,
  }, {
    id: '2',
    phone: '177457290',
    password: '666666666',
    messagePushStatus: false,
    userName: '柒木',
    clockStatus: 3,
    dailyNewspaperStatus: 3,
    weekNewspaperStatus: 3,
    monthNewspaperStatus: 3,
    clockedSuccessDays: 4,
    clockedTotalCount: 4,
  }]
  data.clockList.push(...lodaData)
  /*setTimeout(() => {*/
  /*  for (let i = 0; i < 20; i++) {*/
  /*    data.clockList.push({*/
  /*      id: i + '',*/
  /*      phone: '17' + i + '74445' + i,*/
  /*      password: '4' + i + 'ad44' + i + '4' + i + '4',*/
  /*      messagePushStatus: i / 2 != 0,*/
  /*      userName: '柒木' + i,*/
  /*      clockStatus: i / 2 != 0 ? 2 : 1,*/
  /*      dailyNewspaperStatus: i / 5 != 0 ? 2 : 1,*/
  /*      weekNewspaperStatus: i / 3 != 0 ? 2 : 1,*/
  /*      monthNewspaperStatus: i / 4 != 0 ? 2 : 1,*/
  /*      clockedSuccessDays: 1 + i,*/
  /*      clockedTotalCount: 2 + i,*/
  /*    },)*/
  /*  }*/

  /*  // 加载状态结束*/
  /*  loading.value = false;*/
  /*  if (data.clockList.length > 5) {*/
  /*    data.clockList.push({*/
  /*      id: '2',*/
  /*      phone: '177457290',*/
  /*      password: '666666666',*/
  /*      messagePushStatus: true,*/
  /*      userName: '柒木',*/
  //       clockStatus: 0,
  //       dailyNewspaperStatus: 3,
  //       weekNewspaperStatus: 3,
  //       monthNewspaperStatus: 3,
  //       clockedSuccessDays: 3,
  //       clockedTotalCount: 7,
  //     })
  //   }
  //   // 数据全部加载完成
  //   if (data.clockList.length >= 60) {
  //     finished.value = true;
  //   }
  // }, 1500);

  loading.value = false;
  finished.value = true;

};

</script>

<style scoped>
.van-card {
  position: relative;
  box-sizing: border-box;
  padding: var(--van-card-padding);
  color: var(--van-card-text-color);
  font-size: var(--van-card-font-size);
  background-color: #fff;
}
</style>

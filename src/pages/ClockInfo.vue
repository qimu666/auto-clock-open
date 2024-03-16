<template>
  <div class="mt-2">
    <van-search
        v-model="searchText"
        @search="onSearch"
        @cancel="onCancel"
        placeholder="可搜索打卡账号、打卡地址、职位、报告标题、内容"/>
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
                v-for="item in data.clockTypeList"
                @click="selectClockType(item.type)"
                :type="data.clockTypeActiveIndex === item.type? 'primary' :'default'" size="small"
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
        <div v-if="data.clockTypeActiveIndex !=='report'" class="mx-4">
          <div class="space-x-1 flex-wrap">
            <van-button
                v-for="item in data.statusTagList"
                @click="searchTag(item.type)"
                :type="data.tagActiveType === item.type? 'primary' :'default'" size="small"
            >{{ item.tagName }}
            </van-button>
          </div>
        </div>
        <div v-else class="mx-4">
          <div class="space-x-1 flex-wrap">
            <van-button
                v-for="item in data.reportTagList"
                @click="searchTag(item.type)"
                :type="data.tagActiveType === item.type? 'primary' :'default'" size="small"
            >{{ item.tagName }}
            </van-button>
          </div>
        </div>
        <div class="h-3"></div>
      </div>
    </van-cell-group>
    <p v-if="data.clockTypeActiveIndex!=='report'" class="mt-2 text-sm text-gray-400">
      共{{ data.clockTotal }}条 已获取{{ data.clockList.length }}条&nbsp;
    </p>
    <p v-else class="mt-2 text-sm text-gray-400">
      共{{ data.reportTotal }}条 已获取{{ data.reportList.length }}条&nbsp;
    </p>
    <div class="h-[800px] overflow-auto" v-if="data.clockTypeActiveIndex!=='report'">
      <van-list
          class="min-h-[400px]"
          v-model:loading="clockLoding"
          :finished="clockFinished"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
      >
        <div v-for="item in data.clockList">
          <div class="bg-white rounded">
            <div class="h-2"></div>
            <div class="mx-4 text-sm">
              <div class="space-y-1">
                <div>
                  <label>账号：</label>
                  <span @click="router.push(`/clockInfo/detailed/${item.id}`)" class="text-blue-400">{{
                      item.phone
                    }}</span>
                </div>
                <div>
                  <label>密码：</label>
                  <span class="">{{ item.password }}</span>
                </div>
                <div>
                  <label>姓名：</label>
                  <span class="">{{ item.nikeName }}</span>
                </div>
                <div>
                  <label>最近状态：</label>
                  <van-tag v-if="item.clockStatus===0" plain>未开启</van-tag>
                  <van-tag v-else :type="clockEnumStatus[item.clockStatus]">{{
                      clockEnumStatusMessage[item.clockStatus]
                    }}
                  </van-tag>
                </div>
                <div>
                  <label>消息推送：</label>
                  <van-tag v-if="!item.pushToken&&!item.email" plain>未开启</van-tag>
                  <van-tag v-else type="success">已开启</van-tag>
                </div>
                <div>
                  <label>经纬度：</label>
                  <span class="">{{ getLatitudeAndLongitude(item) }}</span>
                </div>
                <div>
                  <label>公司地址：</label>
                  <span class="">{{ item.jobAddress }}</span>
                </div>
                <div>
                  <label>打卡地址：</label>
                  <span class="">{{ item.clockAddress }}</span>
                </div>
                <div>
                  <label>日报状态：</label>
                  <van-tag v-if="item.dailyNewspaperStatus===0" plain>未开启</van-tag>
                  <van-tag v-else :type="reportEnumStatus[item.dailyNewspaperStatus]">
                    {{ reportEnumStatusMessage[item.dailyNewspaperStatus] }}
                  </van-tag>
                </div>
                <div>
                  <label>周报状态：</label>
                  <van-tag v-if="item.weekNewspaperStatus===0" plain>未开启</van-tag>
                  <van-tag v-else :type="reportEnumStatus[item.weekNewspaperStatus]">
                    {{ reportEnumStatusMessage[item.weekNewspaperStatus] }}
                  </van-tag>
                  &nbsp;每周日提交
                </div>
                <div>
                  <label>月报状态：</label>
                  <van-tag v-if="item.monthNewspaperStatus===0" plain>未开启</van-tag>
                  <van-tag v-else :type="reportEnumStatus[item.monthNewspaperStatus]">{{
                      reportEnumStatusMessage[item.monthNewspaperStatus]
                    }}
                  </van-tag>
                  &nbsp;每月最后一天提交
                </div>
                <div v-if="data.clockTypeActiveIndex==='gxy'">
                  <div>
                    <label>上班打卡时间：</label>
                    <span class="">{{ item.startTime }}</span>
                  </div>
                  <div>
                    <label>下班打卡时间：</label>
                    <span class="">{{ item.endTime }}</span>
                  </div>
                </div>
                <div v-if="data.clockTypeActiveIndex==='zxjy'">
                  <div>
                    <label>打卡时间：</label>
                    <span class="">{{ item.startTime }}</span>
                  </div>
                </div>
                <div>
                  <label>打卡周期：</label>
                  <span class="">{{
                      getSignInCycle(item).length > 0 ? getSignInCycle(item) : "暂未选择打卡周期"
                    }}</span>
                </div>
                <div>
                  <label>剩余天数：</label>
                  <span class="">{{ item.clockDays }}天</span>
                </div>
                <div>
                  <label>最后一次打卡状态：</label>
                  <span class="">{{ clockEnumStatusMessage[item.clockStatus] }}</span>
                </div>
                <div>
                  <label>最后一次日报填写状态：</label>
                  <span class="">
                    {{ reportEnumStatusMessage[item.dailyNewspaperStatus] }}
                  </span>
                </div>
                <div>
                  <label>最后一次周报填写状态：</label>
                  <span class="">
                    {{ reportEnumStatusMessage[item.weekNewspaperStatus] }}
                  </span>
                </div>
                <div>
                  <label>最后一次月报填写状态：</label>
                  <span class="">
                    {{ reportEnumStatusMessage[item.monthNewspaperStatus] }}
                  </span>
                </div>
                <div>
                  <label>创建时间：</label>
                  <span class="">{{ foramDate(item.createTime) }}</span>
                </div>
              </div>
              <div>
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
                    <div @click="doSupplementaryReport(item)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                           stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"/>
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
                    <div @click="historicalRecord(item)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                           stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div @click="updateClock(item)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                           stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                      </svg>
                    </div>
                    <div @click="deleteClock(item)">
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
      <van-back-top bottom="10vh"/>
    </div>
    <div class="h-[800px] overflow-auto" v-else>
      <van-list
          class="min-h-[400px]"
          v-model:loading="reportLoding"
          :finished="reportFinished"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @load="reportLoad"
      >
        <div v-for="item in data.reportList">
          <div class="bg-white rounded">
            <div class="h-2"/>
            <div class="mx-4 text-sm">
              <div class="flex space-x-1 ">
                <div v-if="item.type==='day'">
                  <van-tag type="primary" size="medium">日报</van-tag>
                </div>
                <div v-if="item.type==='week'">
                  <van-tag type="primary" size="medium">周报</van-tag>
                </div>
                <div v-if="item.type==='month'">
                  <van-tag type="primary" size="medium">月报</van-tag>
                </div>
                <van-tag type="primary" size="medium">{{ item.jobName }}</van-tag>
              </div>
              <van-text-ellipsis
                  class="mt-2"
                  rows="3"
                  :content="item.content"
                  expand-text="展开"
                  collapse-text="收起"
              />
            </div>
            <div class="h-2"/>
          </div>
          <div class="h-3"/>
        </div>
      </van-list>
      <van-back-top bottom="10vh"/>
    </div>
  </div>
  <van-dialog v-model:show="show" :title="'账号：'+data.phoneData+' 日志'">
    <div class="flex h-5 justify-center text-sm text-red-500"><p>每月1号12点清空日志</p>,白屏请滑动滚动条</div>
    <div v-show="show" class="h-96 overflow-auto">
      <van-list
          class="min-h-[420px]"
          v-model:loading="historicalRecordLoading"
          :finished="historicalRecordFinished"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @load="historicalListOnLoad"
      >
        <!--        <van-cell-group>-->
        <div class="h-1"></div>
        <van-cell :class="bgColor(item)" v-for="item in data.historicalList"
                  :title="foramDate(item.createTime) +' ' +item.description"/>
        <!--        </van-cell-group>-->
      </van-list>
    </div>
  </van-dialog>
  <van-dialog show-cancel-button @confirm="onSubmit" v-model:show="doSupplementaryReportStatus"
              :title="'补报告 【'+data.phoneData+'】'">
    <div>
      <van-form>
        <van-cell-group inset>
          <div class="text-sm ml-4 mt-2 text-red-500 font-bold">
            <div>日报、周报、月报每篇扣费为10积分</div>
            <div v-if="data.clockTypeActiveIndex==='gxy'">日报周报支持防重复提交，月报不支持！</div>
            <div>提交后不可取消补写！请认真核对信息！</div>
          </div>
          <van-field name="reportSource" label="报告类型：">
            <template #input>
              <van-radio-group v-model="data.doSupplementaryReportData.type" @change="groupCheckedA"
                               direction="horizontal"
              >
                <van-radio @click="selectSupplementaryReportDay" name="day">日报</van-radio>
                <br>
                <van-radio @click="selectSupplementaryReportWeek" name="week">周报</van-radio>
                <br>
                <van-radio @click="selectSupplementaryReportMonth" name="month">月报</van-radio>
                <br>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
              v-model="data.doSupplementaryReportData.startTime"
              is-link
              readonly
              name="datePicker"
              label="开始时间"
              placeholder="点击选择时间"
              @click="showStartTimePicker = true"
          />
          <van-field
              v-if="data.clockTypeActiveIndex==='zxjy'"
              v-model="data.doSupplementaryReportData.reportAddress"
              name="reportAddress"
              label="报告地址"
              placeholder="报告地址 (留空默认公司地址)"
          />
          <van-field
              v-model="data.doSupplementaryReportData.endTime"
              is-link
              readonly
              name="datePicker2"
              label="结束时间"
              placeholder="点击选择时间"
              @click="showEndTimePicker = true"
          />
        </van-cell-group>
      </van-form>
    </div>
  </van-dialog>
  <van-popup v-model:show="showStartTimePicker" position="bottom">
    <van-date-picker v-model="formattedStartDateArray" @confirm="onConfirm"
                     :max-date="new Date()"
                     @cancel="showStartTimePicker = false"/>
  </van-popup>
  <van-popup v-model:show="showEndTimePicker" position="bottom">
    <van-date-picker v-model="formattedEndDateArray" @confirm="onConfirm2" :max-date="new Date()"
                     @cancel="showEndTimePicker = false"/>
  </van-popup>
</template>

<script setup lang="ts">
import {reactive, ref, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import {
  ClockInControllerService,
  ClockInInfoControllerService,
  ClockReportControllerService,
  DailyCheckInControllerService
} from "../services/moguding-backend";
import {showConfirmDialog, showSuccessToast} from "vant";

const show = ref(false);
const doSupplementaryReportStatus = ref(false);

const historicalRecordFinished = ref(false)
const historicalRecordLoading = ref(false)
const bgColor = (item) => {
  if (item.status === 2) {
    return 'bg-green-100'
  }
  if (item.status === 3) {
    return 'bg-red-50'
  }
}
let startTime = new Date();
// 格式化日期为年-月-日的字符串
let startFormattedDate = startTime.getFullYear() + '-' +
    ('0' + (startTime.getMonth() + 1)).slice(-2) + '-' +
    ('0' + startTime.getDate()).slice(-2);
let formattedStartDateArray = [
  startTime.getFullYear(),
  startTime.getMonth() + 1,
  startTime.getDate()
];
let endFormattedDate = startTime.getFullYear() + '-' +
    ('0' + (startTime.getMonth() + 1)).slice(-2) + '-' +
    ('0' + startTime.getDate()).slice(-2);
let formattedEndDateArray = [
  startTime.getFullYear(),
  startTime.getMonth() + 1, // 月份需要加1，因为月份是从0开始计数的
  startTime.getDate()
];
let load = 0
let loadSuccess = 0
const data = reactive({
  phoneData: "0",
  clockTotal: 0,
  type:'',
  reportTotal: 0,
  initClockPageNum: 1,
  initReportNum: 1,
  initHistoricalPageNum: 1,
  tagActiveType: 'all',
  // todo
  clockTypeActiveIndex: 'zxjy',
  // clockTypeActiveIndex: 'gxy',
  historicalList: [],
  clockList: [],
  backupList: [],
  backupData: [],
  reportBackupList: [],
  reportList: [],
  doSupplementaryReportData: {
    id: "",
    platformType: "",
    reportAddress: "",
    type: "day",
    endTime: endFormattedDate,
    startTime: startFormattedDate
  },
  statusTagList: [
    {
      id: '6',
      tagName: '全部信息',
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
  reportTagList: [
    {
      id: '4',
      tagName: '全部报告',
      type: 'all'
    },
    {
      id: '1',
      tagName: '日报',
      type: 'day'
    },
    {
      id: '2',
      tagName: '周报',
      type: 'week'
    },
    {
      id: '3',
      tagName: '月报',
      type: 'month'
    },
  ],
  clockTypeList: [
    // {
    //   id: '2',
    //   tagName: '工学云',
    //   type: 'gxy'
    // },
    {
      id: '3',
      tagName: '职校家园',
      type: 'zxjy'
    },
    {
      id: '1',
      tagName: '报告库',
      type: 'report'
    },
  ]
})
const showStartTimePicker = ref(false);
const showEndTimePicker = ref(false);

const onConfirm = ({selectedValues}) => {
  data.doSupplementaryReportData.startTime = selectedValues.join('-');
  showStartTimePicker.value = false;
};
const onConfirm2 = ({selectedValues}) => {
  data.doSupplementaryReportData.endTime = selectedValues.join('-');
  showEndTimePicker.value = false;
};
const selectSupplementaryReportDay = () => {

}
const selectSupplementaryReportWeek = () => {

}
const selectSupplementaryReportMonth = () => {

}
const doSupplementaryReport = (item) => {
  console.log(item)
  data.phoneData = item.phone
  data.doSupplementaryReportData.id = item.id
  data.doSupplementaryReportData.platformType = item.type
  doSupplementaryReportStatus.value = true
}
const foramDate = (val) => {
  const date = new Date(val);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
const historicalRecord = async (item) => {
  console.log(item)
  show.value = true
  data.phoneData = item.phone
  data.type=item.type
  data.historicalList = []
  data.initHistoricalPageNum = 1
  // router.push({path: '/historicalRecord', query: {phone: item.phone}})
  historicalRecordFinished.value = false;
}

const historicalListOnLoad = async () => {
  const res = await DailyCheckInControllerService.listDailyCheckInByPageUsingPost({
    phone: data.phoneData, current: data.initHistoricalPageNum,type:data.type
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      historicalRecordFinished.value = true
    } else {
      data.historicalList.push(...res.data.records)
      data.initHistoricalPageNum += 1;
    }
  }
  historicalRecordLoading.value = false
}

const list = ref([]);
const clockLoding = ref(false);
const clockFinished = ref(false);
const reportLoding = ref(false);
const reportFinished = ref(false);
const route = useRoute();
const router = useRouter();
const initSearchParams = {
  text: "",
  pageSize: 10,
  pageNum: 1,
};
const getLatitudeAndLongitude = (item) => {
  return item.latitude + "," + item.longitude
}

const onSubmit = async () => {
  showConfirmDialog({
    title: '确认立即补该账号' + report[data.doSupplementaryReportData.type] + '？',
    message:
        '请再次确认是否补该账号' + report[data.doSupplementaryReportData.type] + '？' + data.phoneData + ',该操作不可取消！',
  })
      .then(async () => {
        const res = await ClockInControllerService.doSupplementaryReportUsingPost(JSON.stringify(data.doSupplementaryReportData))
        if (res.code === 0 && res.data) {
          showSuccessToast(report[data.doSupplementaryReportData.type] + '任务已开启，请稍后前往日志记录查看')
          doSupplementaryReportStatus.value = false
        }
      })
      .catch(() => {
        // on cancel
      });
}
const groupCheckedA = () => {
  console.log(data.doSupplementaryReportData)
}

const getSignInCycle = (item) => {
  const data = JSON.parse(item.selectClockDay);
  const weekdaysMap = new Map([
    ['2', '周一'],
    ['3', '周二'],
    ['4', '周三'],
    ['5', '周四'],
    ['6', '周五'],
    ['7', '周六'],
    ['1', '周日']
  ]);
  data.sort();
  let result = '';
  data.forEach(day => {
    result += weekdaysMap.get(day) + ' ';
  });
  return result.trim();
};

const clockInfoEnumStatus = {
  'off': 0,
  'open': 1,
  'success': 2,
  'error': 3
}
const clockEnumStatus = {
  0: '',
  1: 'primary',
  2: 'success',
  3: 'danger'
}
const report = {
  'day': '日报',
  'week': '周报',
  'month': '月报',
}
const clockEnumStatusClass = {
  0: '',
  1: 'text-blue-500',
  2: 'text-green-500',
  3: 'text-red-500'
}
const searchText = ref(route.query.text || "");
const searchParams = ref(initSearchParams);


const onCancel = () => {
  searchText.value = ''
}
const change = (val) => {
  // searchText.value=val.value
  console.log(val);
}
const loadDataOld = async (params: any) => {
  if (data.clockTypeActiveIndex !== 'report') {
    const clockQuery = {
      ...params,
      searchText: params.text,
    };
    const clockStatus = clockInfoEnumStatus[clockQuery.tagType];
    const res = await ClockInInfoControllerService.listClockInInfoByPageUsingPost({
      ...clockQuery,
      clockStatus: clockStatus
    })
    if (res.data && res.code === 0) {
      data.clockList = res.data?.records || []
      data.backupData = res.data?.records || []
      data.clockTotal = res.data.total
    }
    clockFinished.value = false
  } else {
    const res = await ClockReportControllerService.listClockReportByPageUsingPost({
      ...params,
      searchText: params.text
    })
    if (res.code === 0 && res.data) {
      data.reportList = res.data?.records || []
      data.reportBackupList = res.data?.records || []
      data.reportTotal = res.data.total
    }
    reportFinished.value = false
  }
};
watchEffect(async () => {
  let {text, clockType, tagType} = route.query
  searchParams.value = {
    ...initSearchParams,
    text: text,
    clockType: clockType,
    tagType: tagType
  } as any;
  data.clockTypeActiveIndex = clockType ? clockType : data.clockTypeActiveIndex
  data.tagActiveType = tagType ? tagType : data.tagActiveType
  await loadDataOld(searchParams.value);
});


const searchTag = async (val: any) => {
  data.tagActiveType = val
  if (data.clockTypeActiveIndex !== 'report') {
    if (val !== "all") {
      const clockStatus = clockInfoEnumStatus[val];
      data.clockList = data.backupData.filter(clock => clock.clockStatus === clockStatus)
    } else {
      data.clockList = data.backupData
    }
    data.initClockPageNum = 1
    clockFinished.value = false
  } else {
    if (val !== "all") {
      data.reportList = data.reportBackupList.filter(report => report.type === val)
    } else {
      data.reportList = data.reportBackupList
    }
    data.initReportNum = 1
    reportFinished.value = false
  }

  await router.push({
    query: {
      ...searchParams.value,
      tagType: data.tagActiveType,
      clockType: data.clockTypeActiveIndex
    }
  });
}

const selectClockType = (val) => {
  console.log(val)
  data.clockTypeActiveIndex = val
  router.push({
    query: {
      ...searchParams.value,
      tagType: data.tagActiveType,
      clockType: data.clockTypeActiveIndex
    },
  });
  selectDefaultTagType(val)
  data.clockList = data.backupData.filter(clock => clock.type === data.clockTypeActiveIndex)
  data.initClockPageNum = 1
  clockFinished.value = false
}

const selectDefaultTagType = async (val) => {
  if (val && val !== 'report') {
    let clockStatus = 0;
    if (route.query.tagType) {
      clockStatus = clockInfoEnumStatus[route.query.tagType];
    }
    let type = "gxy";
    if (route.query.clockType) {
      type = route.query.clockType as string;
    }
    const res = await ClockInInfoControllerService.listClockInInfoByPageUsingPost({
      ...searchParams.value,
      clockStatus: clockStatus,
      searchText: searchParams.value.text,
      clockType: type,
    })
    if (res.code === 0) {
      data.clockList = res.data?.records || []
      data.backupData = res.data?.records || []
      data.clockTotal = res.data.total
    }
    if (!data.statusTagList.some(statusType => statusType.type === data.tagActiveType)) {
      data.tagActiveType = "all"
    }
  } else {
    const res = await ClockReportControllerService.listClockReportByPageUsingPost({})
    if (res.code === 0 && res.data) {
      data.reportList = res.data?.records || []
      data.reportBackupList = res.data?.records || []
      data.reportTotal = res.data.total
    }
    if (!data.reportTagList.some(reportType => reportType.type === data.tagActiveType)) {
      data.tagActiveType = "day"
    }
  }
}


const onSearch = async (val) => {
  await router.push({
    query: {
      ...searchParams.value,
      text: val,
    },
  });
  let clockStatus = 0;
  if (route.query.tagType) {
    clockStatus = clockInfoEnumStatus[route.query.tagType];
  }
  let type = "gxy";
  if (route.query.clockType) {
    type = route.query.clockType as string;
  }
  if (type !== "report") {
    const clockRes = await ClockInInfoControllerService.listClockInInfoByPageUsingPost({
      ...searchParams.value,
      searchText: val,
      clockStatus: clockStatus,
      clockType: type,
    })
    if (clockRes.code === 0 && clockRes.data) {
      data.clockList = clockRes.data?.records || []
      data.backupData = clockRes.data?.records || []
      data.clockTotal = clockRes.data.total
    }
  } else {
    const res = await ClockReportControllerService.listClockReportByPageUsingPost({
      ...searchParams.value,
      searchText: val
    })
    if (res.code === 0 && res.data) {
      data.reportList = res.data?.records || []
      data.reportBackupList = res.data?.records || []
      data.reportTotal = res.data.total
    }
  }
};


const onLoad = async () => {
  let clockStatus;
  if (route.query.tagType) {
    clockStatus = clockInfoEnumStatus[route.query.tagType];
  }
  const res = await ClockInInfoControllerService.listClockInInfoByPageUsingPost({
    ...searchParams.value,
    current: data.initClockPageNum,
    searchText: searchParams.value.text,
    clockStatus: clockStatus
  })

  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      clockFinished.value = true;
    } else {
      data.clockList = data.clockList.filter(item => {
        return !res.data.records.some(record => record.id === item.id);
      });
      data.backupData = data.backupData.filter(item => {
        return !res.data.records.some(record => record.id === item.id);
      });
      data.clockList.push(...res.data.records);
      data.backupData.push(...res.data.records);
      data.clockTotal = res.data.total
      data.initClockPageNum += 1;
    }
  }
  clockLoding.value = false;
}

const reportLoad = async () => {
  const res = await ClockReportControllerService.listClockReportByPageUsingPost({
    ...searchParams.value,
    current: data.initReportNum
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      reportFinished.value = true;
    } else {
      data.reportList = data.reportList.filter(item => {
        return !res.data.records.some(record => record.id === item.id);
      });
      data.reportBackupList = data.reportBackupList.filter(item => {
        return !res.data.records.some(record => record.id === item.id);
      });
      data.reportList.push(...res.data?.records)
      data.reportBackupList.push(...res.data?.records)
      data.reportTotal = res.data.total
      data.initReportNum += 1
    }
  }
  reportLoding.value = false;
};


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
  1: '填写中',
  2: '填写成功',
  3: '填写失败'
}
const doClock = async (item) => {
  showConfirmDialog({
    title: '确认立即打卡该账号？',
    message:
        '请确认是否立即打卡该账号？' + item.phone,
  })
      .then(async () => {
        const res = await ClockInControllerService.supplementClockInUsingPost({id: item.id})
        if (res.data && res.code === 0) {
          item.clockStatus = 1
          showSuccessToast("将在10秒后打卡")
        }
      })
      .catch(() => {
        // on cancel
      });
}
const openClock = async (item) => {
  const res = await ClockInControllerService.startingClockInUsingPost({id: item.id})
  if (res.data && res.code === 0) {
    item.clockStatus = 1
    showSuccessToast("打卡开启成功")
  }
}
const stopClock = async (item) => {
  item.clockStatus = 0
  const res = await ClockInControllerService.stopClockInUsingPost({id: item.id})
  if (res.data && res.code === 0) {
    showSuccessToast("打卡暂停成功")
  }
}

const deleteClock = (item) => {
  showConfirmDialog({
    title: '确认删除该打卡信息？',
    message:
        '请确认是否删除账号：' + item.phone,
  })
      .then(async () => {
        const res = await ClockInInfoControllerService.deleteClockInInfoUsingPost({id: item.id})
        if (res.data && res.code === 0) {
          showSuccessToast("删除成功")
          data.clockList = data.clockList.filter(clock => clock.id !== item.id)
          data.backupData = data.backupData.filter(clock => clock.id !== item.id)
        }
      })
      .catch(() => {
        // on cancel
      });
}
const updateClock = (item) => {
  router.push({
    path: `${item.type}/update`,
    query: {id: item.id}
  })
}

const getProgressValue = (clock) => {
  let number = Number(((clock.clockedSuccessDays / clock.clockedTotalCount) * 100).toFixed(2));
  if (!number) {
    number = 0.00
  }
  return number > 100 ? 100 : number
}
const getshowClockedSuccessDays = (clock) => {
  return clock.clockedSuccessDays < 0 ? 0 : "已打卡" + clock.clockedSuccessDays + "天"
}


const getshowDayClockClockedSuccessDays = (clock) => {
  return (clock.startClock + clock.endClock) < 0 ? 0 : "已打卡" + (clock.startClock + clock.endClock) + "次"

}
const getDayClockProgressValue = (clock) => {
  let number = Number((((clock.startClock + clock.endClock) / 2) * 100).toFixed(2));
  if (!number) {
    number = 0.00
  }
  return number > 100 ? 100 : number
}


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

:deep(.van-search__field) {
  flex: 1;
  align-items: center;
  padding: 0 var(--van-padding-xs) 0 0;
  height: var(--van-search-input-height);
  background-color: transparent;
}
</style>

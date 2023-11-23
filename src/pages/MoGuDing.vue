<template>
  <div class="mt-2">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="state.initClockInfo.phone"
            name="phone"
            label="工学云账号："
            placeholder="工学云账号"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="state.initClockInfo.password"
            type="password"
            name="password"
            label="工学云密码："
            placeholder="工学云密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-cell center title="一键获取账号信息">
          <template #right-icon>
            <van-switch size="22px" :loading="state.loading" @click="getClockInfo" v-model="state.getClockInfoStatus"/>
          </template>
        </van-cell>
        <van-collapse v-model="doClockInfo">
          <van-collapse-item title="打卡信息：" value="一键获取 / 自己填写 " name="1">
            <van-field
                v-model="state.initClockInfo.jobAddress"
                name="jobAddress"
                label="公司地址："
                placeholder="自动获取公司地址或者自定义地址"
                :rules="[{ required: true, message: '请填写公司地址' }]"
            />
            <van-field
                v-model="state.initClockInfo.clockAddress"
                name="clockAddress"
                label="打卡地址："
                placeholder="省 · 市 · 区 · 在xxx附近"
                :rules="[{ required: true, message: '请填写打卡地址' }]"
            />
            <van-field
                v-model="state.initClockInfo.longitude"
                label="经度："
                readonly
                placeholder="经度（根据公司地址自动生成）"
                :rules="[{ required: true, message: '请填写经度' }]"
            />
            <van-field
                v-model="state.initClockInfo.latitude"
                name="latitude"
                readonly
                label="纬度："
                placeholder="纬度（根据公司地址自动生成）"
                :rules="[{ required: true, message: '请填写纬度' }]"
            />
          </van-collapse-item>
        </van-collapse>
        <van-field
            v-model="state.clockInfo.startTime"
            is-link
            readonly
            name="startTime"
            label="上班打卡："
            placeholder="点击选择上班打卡时间"
            @click="startTimeShow = true"
            :rules="[{ required: true, message: '请填写上班打卡时间' }]"
        />
        <van-field
            v-model="state.clockInfo.endTime"
            is-link
            readonly
            name="endTime"
            label="下班打卡："
            placeholder="点击选择上班打卡时间"
            @click="endTimeShow = true"
        />
        <van-field name="clockDay" label="打卡周期">
          <template #input>
            <van-checkbox-group v-model="state.clockInfo.clockDay" @change="groupCheckedA" direction="horizontal">
              <van-checkbox name="0" shape="square">周一</van-checkbox>
              <br>
              <van-checkbox name="1" shape="square">周二</van-checkbox>
              <br>
              <van-checkbox name="2" shape="square">周三</van-checkbox>
              <br>
              <van-checkbox name="3" shape="square">周四</van-checkbox>
              <br>
              <van-checkbox name="4" shape="square">周五</van-checkbox>
              <br>
              <van-checkbox name="5" shape="square">周六</van-checkbox>
              <br>
              <van-checkbox name="6" shape="square">周日</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
        <van-field name="clockDays" label="打卡天数：">
          <template #input>
            <van-stepper v-model="state.clockInfo.clockDays"/>
          </template>
        </van-field>
        <van-collapse v-model="getDevice">
          <van-collapse-item title="获取设备信息（可选）" name="1">
            <van-cell-group class="mx-4 text-sm">
              连接地址：<a href="https://www.123pan.com/s/XrbBjv-ns0E3.html" target="_blank"
                          class="text-blue-400">下载获取设备信息软件</a>
            </van-cell-group>
            <van-field
                v-model="state.clockInfo.device"
                name="device"
                label="设备信息："
                placeholder="下载软件后复制填入"
            />
          </van-collapse-item>
        </van-collapse>
        <van-collapse v-model="massagePush">
          <van-collapse-item title="消息推送（可选）" name="1">
            <van-field
                v-model="state.clockInfo.email"
                name="email"
                label="邮箱："
                placeholder="邮箱地址"
            />
            <van-field
                v-model="state.clockInfo.pushPushToken"
                name="pushplusToken"
                label="微信推送Token："
                placeholder="pushplus微信推送Token"
            />
          </van-collapse-item>
        </van-collapse>

      </van-cell-group>
      <br>
      <van-cell-group inset>
        <van-field name="startDayLyNewspaper" label="日报：">
          <template #input>
            <van-switch size="22px" v-model="state.clockInfo.startDayLyNewspaper"/>
            &nbsp;每天提交
          </template>
        </van-field>
        <van-field name="startWeekLyNewspaper" label="周报：">
          <template #input>
            <van-switch size="22px" v-model="state.clockInfo.startWeekLyNewspaper"/>
            &nbsp;每周最后一天提交
          </template>
        </van-field>
        <van-field name="startMonthLyNewspaper" label="月报：">
          <template #input>
            <van-switch size="22px" v-model="state.clockInfo.startMonthLyNewspaper"/>
            &nbsp;每月最后一天提交
          </template>
        </van-field>
        <van-field name="reportSource" label="报告来源">
          <template #input>
            <van-radio-group v-model="state.clockInfo.reportSource" direction="horizontal">
              <van-radio @click="getReportSourceByAi" name="1">AI定制化报告</van-radio>
              <br>
              <van-radio @click="getReportSourceByLibrary" name="2">报告库</van-radio>
              <br>
              <van-radio @click="getReportSourceByYour" name="3">自己填写</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>
      <van-action-sheet v-model:show="showReportSourceByAi" title="AI定制化报告">
        <div v-if="!state.generatingReport">
          <van-field
              v-model="state.initClockInfo.jobName"
              name="weekPosition"
              label="职位"
              readonly
              placeholder="职位"
          />
          <van-field name="startDayLyNewspaper" label="日报：">
            <template #right-icon>
              <van-switch v-model="state.clockInfo.startDayLyNewspaper"/>
            </template>
          </van-field>
          <van-field name="startWeekLyNewspaper" label="周报：">
            <template #right-icon>
              <van-switch v-model="state.clockInfo.startWeekLyNewspaper"/>
            </template>
          </van-field>
          <van-field name="startMonthLyNewspaper" label="月报：">
            <template #right-icon>
              <van-switch v-model="state.clockInfo.startMonthLyNewspaper"/>
            </template>
          </van-field>
          <div class="mx-2 mt-5">
            <van-button plain type="primary" @click="generateAReport" block>生成报告</van-button>
          </div>
        </div>
        <div v-else>
          <van-notice-bar
              left-icon="info-o"
              text="生成报告预计10分钟左右，添加成功后，在打卡信息界面查看"
          />
          <div class="h-64 justify-center items-center flex">
            <van-loading color="#0094ff" vertical>
              <template #icon>
                <van-icon name="star-o" size="30"/>
              </template>
              报告生成中...
            </van-loading>
          </div>
        </div>
        <br/>
      </van-action-sheet>
      <van-action-sheet @cancel="showReportSourceByLibrary = false"
                        v-model:show="showReportSourceByLibrary" title="报告库">
        <van-collapse v-model="activeNames" accordion>
          <van-field
              v-model="state.initClockInfo.jobName"
              name="weekPosition"
              label="职位"
              :rules="[{ required: true, message: '请填写职位' }]"
              readonly
              placeholder="职位"
          />
          <van-collapse-item v-if="state.clockInfo.startDayLyNewspaper" title="日报" name="1">
            <van-field
                v-model="state.dayReport.dayTitle"
                name="dayTitle"
                label="标题"
                placeholder="标题"
                :rules="[{ required: true, message: '请填写标题' }]"
            />
            <van-field
                v-model="state.dayReport.dayContent"
                name="dayContent"
                type="textarea"
                autosize
                rows="2"
                maxlength="1200"
                show-word-limit
                label="内容"
                placeholder="内容"
                :rules="[{ required: true, message: '请填写内容' }]"
            />
          </van-collapse-item>
          <van-collapse-item v-if="state.clockInfo.startWeekLyNewspaper" title="周报" name="2">
            <van-field
                v-model="state.weekReport.weekTitle"
                name="weekTitle"
                label="标题"
                placeholder="标题"
                :rules="[{ required: true, message: '请填写标题' }]"
            />
            <van-field
                v-model="state.weekReport.weekContent"
                name="weekContent"
                type="textarea"
                autosize
                rows="2"
                maxlength="1200"
                show-word-limit
                label="内容"
                placeholder="内容"
                :rules="[{ required: true, message: '请填写内容' }]"
            />
          </van-collapse-item>
          <van-collapse-item v-if="state.clockInfo.startMonthLyNewspaper" title="月报" name="3">
            <van-field
                v-model="state.monthReport.monthTitle"
                name="monthTitle"
                label="标题"
                placeholder="标题"
                :rules="[{ required: true, message: '请填写标题' }]"
            />
            <van-field
                v-model="state.monthReport.monthContent"
                name="monthContent"
                type="textarea"
                autosize
                rows="2"
                maxlength="500"
                show-word-limit
                label="内容"
                placeholder="内容"
                :rules="[{ required: true, message: '请填写内容' }]"
            />
          </van-collapse-item>
        </van-collapse>
        <div class="mx-2 mt-5">
          <van-button plain type="primary" block>确认</van-button>
        </div>
        <br>
      </van-action-sheet>
      <van-action-sheet
          @cancel="showReportSourceByLibrary = false"
          v-model:show="showReportSourceByYour" title="自己填写">
        <van-collapse v-model="activeNames" accordion>
          <van-field
              v-model="state.initClockInfo.jobName"
              name="weekPosition"
              label="职位"
              readonly
              placeholder="职位"
              :rules="[{ required: true, message: '请填写职位' }]"
          />
          <van-collapse-item v-if="state.clockInfo.startDayLyNewspaper" title="日报" name="1">
            <van-field
                v-model="state.dayReport.dayTitle"
                name="dayTitle"
                label="标题"
                placeholder="标题"
                :rules="[{ required: true, message: '请填写标题' }]"
            />
            <van-field
                v-model="state.dayReport.dayContent"
                name="dayContent"
                type="textarea"
                autosize
                rows="2"
                maxlength="1200"
                show-word-limit
                label="内容"
                :rules="[{ required: true, message: '请填写内容' }]"
                placeholder="内容"
            />
          </van-collapse-item>
          <van-collapse-item v-if="state.clockInfo.startWeekLyNewspaper" title="周报" name="2">
            <van-field
                v-model="state.weekReport.weekTitle"
                name="weekTitle"
                label="标题"
                placeholder="标题"
                :rules="[{ required: true, message: '请填写标题' }]"
            />
            <van-field
                v-model="state.weekReport.weekContent"
                name="weekContent"
                type="textarea"
                autosize
                rows="2"
                maxlength="1200"
                show-word-limit
                label="内容"
                placeholder="内容"
                :rules="[{ required: true, message: '请填写内容' }]"
            />
          </van-collapse-item>
          <van-collapse-item v-if="state.clockInfo.startMonthLyNewspaper" title="月报" name="3">
            <van-field
                v-model="state.monthReport.monthTitle"
                name="monthTitle"
                label="标题"
                placeholder="标题"
                :rules="[{ required: true, message: '请填写标题' }]"
            />
            <van-field
                v-model="state.monthReport.monthContent"
                name="monthContent"
                type="textarea"
                autosize
                rows="2"
                maxlength="1200"
                show-word-limit
                :rules="[{ required: true, message: '请填写内容' }]"
                label="内容"
                placeholder="内容"
            />
          </van-collapse-item>
        </van-collapse>
        <div class="mx-2 mt-5">
          <van-button plain type="primary" block>确认</van-button>
        </div>
        <br>
      </van-action-sheet>

      <van-popup v-model:show="startTimeShow" position="bottom">
        <van-time-picker
            v-model="state.defaultStartTime"
            title="上班打卡时间："
            @confirm="confirmStartTime"
            :columns-type="['hour', 'minute', 'second']"
            min-time="08:00:00"
            max-time="11:30:00"
            @cancel="startTimeShow = false"
        />
      </van-popup>
      <van-popup v-model:show="endTimeShow" position="bottom">
        <van-time-picker
            v-model="state.defaultEndTime"
            title="下班打卡时间："
            @confirm="confirmEndTime"
            :columns-type="['hour', 'minute', 'second']"
            min-time="12:00:00"
            max-time="23:30:00"
            @cancel="endTimeShow = false"
        />
      </van-popup>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          添加
        </van-button>
      </div>
    </van-form>
    <div> {{ state.result }}</div>
    <br/>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, watchEffect} from "vue";
import {closeToast, showFailToast, showLoadingToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";

const activeNames = ref(['1']);
const doClockInfo = ref([]);
const getDevice = ref([]);
const massagePush = ref([]);
const router = useRouter();
const route = useRoute();
const show = ref(false);
const startTimeShow = ref(false);
const endTimeShow = ref(false);
const showReportSourceByLibrary = ref(false);
const showReportSourceByAi = ref(false);
const showReportSourceByYour = ref(false);

const groupCheckedA = (v) => {
  console.log(v, 'v')
}

const confirmStartTime = (val) => {
  state.defaultStartTime = val.selectedValues
  state.clockInfo.startTime = val.selectedValues.map((item) => item).join(':');
  startTimeShow.value = false
}
const confirmEndTime = (val) => {
  state.defaultEndTime = val.selectedValues
  state.clockInfo.startTime = val.selectedValues.map((item) => item).join(':');
  startTimeShow.value = false
}

const state = reactive({
  result: '',
  activeIndex: null,
  generatingReport: false,
  defaultStartTime: ['08', '00', '00'],
  defaultEndTime: ['18', '00', '00'],
  loading: false,
  dayReport: {
    id: '1',
    type: "day",
    dayTitle: "",
    dayContent: ''
  },
  weekReport: {
    id: '1',
    type: "week",
    weekTitle: "",
    weekContent: ''
  },
  monthReport: {
    id: '1',
    monthTitle: "",
    type: "month",
    monthContent: ''
  },
  getClockInfoStatus: false,
  initClockInfo: {
    phone: '',
    password: '',
    jobName: '',
    latitude: '',
    longitude: '',
    jobAddress: "",
    clockAddress: ""
  },
  clockInfo: {
    pushPushToken: '',
    email: '',
    device: '',
    clockDays: 180,
    reportSource: '',
    startDayLyNewspaper: false,
    startWeekLyNewspaper: false,
    startMonthLyNewspaper: false,
    startTime: '08:00:00',
    endTime: '18:00:00',
    clockDay: ['0', '1', "2", "3", "4", "5", "6"],
  }
});

watchEffect(() => {
  const {id} = route.query
  if (id) {
    const initData = {
      phone: "qimuuuu" + id,
      jobName: '室内设计',
      password: "12345678",
      latitude: '123.45',
      longitude: '123.45',
      jobAddress: "河南省郑州市四六区嵩山路政通路亿辰山海间3号楼1单元1309",
      clockAddress: "河南省 · 郑州市 · 四六区 · 在山海间附近"
    }

    state.clockInfo = {
      pushPushToken: '22sdf222222222222eas',
      email: '3444444@qq.com',
      device: '',
      clockDays: 23,
      reportSource: '1',
      startDayLyNewspaper: true,
      startWeekLyNewspaper: false,
      startMonthLyNewspaper: false,
      startTime: '08:07:00',
      endTime: '18:45:00',
      clockDay: ['0', "4", "5", "6"],
    }
    state.defaultStartTime = state.clockInfo.startTime.split(":");
    state.defaultEndTime = state.clockInfo.endTime.split(":");
    state.initClockInfo = initData
  }
});

const getReportSourceByLibrary = () => {
  if (!state.clockInfo.startDayLyNewspaper && !state.clockInfo.startWeekLyNewspaper && !state.clockInfo.startMonthLyNewspaper) {
    showFailToast("请先开启任意报告")
    return
  }
  showReportSourceByLibrary.value = true
}
const getReportSourceByAi = () => {
  // if (!state.clockInfo.startDayLyNewspaper && !state.clockInfo.startWeekLyNewspaper && !state.clockInfo.startMonthLyNewspaper) {
  //   showFailToast("请先开启任意报告")
  //   return
  // }
  showReportSourceByAi.value = true
}

const generateAReport = () => {
  if (!state.clockInfo.startDayLyNewspaper && !state.clockInfo.startWeekLyNewspaper && !state.clockInfo.startMonthLyNewspaper) {
    showFailToast("请先选择任意报告")
    return
  }
  if (!state.initClockInfo.jobName) {
    showFailToast("请先获取您的岗位信息")
    showReportSourceByAi.value = false
    return
  }
  state.generatingReport = true
}
const getReportSourceByYour = () => {
  if (!state.clockInfo.startDayLyNewspaper && !state.clockInfo.startWeekLyNewspaper && !state.clockInfo.startMonthLyNewspaper) {
    showFailToast("请先开启任意报告")
    return
  }
  showReportSourceByYour.value = true
}

const getClockInfo = () => {
  if (state.getClockInfoStatus) {
    state.loading = true
    showLoadingToast({
      duration: 0,
      forbidClick: true,
      message: '获取打卡信息中',
    });

    let second = 2;
    const timer = setInterval(() => {
      second--;
      if (!second) {
        showSuccessToast("打卡信息获取成功")
        setTimeout(() => {
          clearInterval(timer);
          closeToast();
        }, 1000)
      }
    }, 1000);

    setTimeout(() => {
      const initData = {
        clockDays: 180,
        phone: "qimuuuu",
        jobName: '室内设计',
        startWeekLyNewspaper: false,
        startMonthLyNewspaper: false,
        startDayLyNewspaper: false,
        startTime: '08:07:00',
        endTime: '18:45:00',
        password: "12345678",
        latitude: '123.45',
        reportSource: '',
        longitude: '123.45',
        clockDay: ['0', '1', "2", "3", "4"],
        jobAddress: "河南省郑州市二七区嵩山路政通路亿辰山海间3号楼1单元1309",
        clockAddress: "河南省 · 郑州市 · 二七区 · 在亿辰山海间附近"
      }
      const getData = {
        clockDays: 180,
        startWeekLyNewspaper: false,
        startMonthLyNewspaper: false,
        startDayLyNewspaper: false,
        startTime: '08:07:00',
        endTime: '18:45:00',
        latitude: '123.45',
        reportSource: '',
        clockDay: ['0', '1', "2", "3", "4"],
      }
      state.initClockInfo = initData
      // state.clockInfo = getData

      // state.defaultStartTime = state.clockInfo.startTime.split(":");
      // state.defaultEndTime = state.clockInfo.endTime.split(":");
      state.loading = false
    }, 2000)
  }
}

const onSubmit = (values) => {
  state.result = JSON.stringify(values)
  console.log(values)
  // showFailToast(JSON.stringify(values));
};

</script>


<style>
.state {
  margin-top: 15px;
}

.state span {
  margin-right: 25px;
}

body {
  margin: 0;
}

.location-btn {
  border: none;
  font-size: 12px;
}

.custom-control {
  border-radius: 4px;
  display: flex;
  color: #666666;
  background-color: #fff;
  padding: 6px;
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 15%) 1px 2px 1px;
}

.select {
  font-size: 12px;
  color: #666666;
  outline: none;
  border-radius: 6px;
  padding: 1px 10px;
  border: none;
}
</style>


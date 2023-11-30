<template>
  <div class="mt-2">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="data.clock.phone"
            name="phone"
            label="工学云账号："
            placeholder="工学云账号"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="data.clock.password"
            type="password"
            name="password"
            label="工学云密码："
            placeholder="工学云密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-cell center title="一键获取账号信息">
          <template #right-icon>
            <van-switch size="22px" :loading="data.loading" @click="getClockInfo" v-model="data.getClockInfoStatus"/>
          </template>
        </van-cell>
        <van-collapse v-model="doClockInfo">
          <van-collapse-item title="打卡信息：" value="信息微调" name="1">
            <van-field
                v-model="data.clock.nikeName"
                name="nikeName"
                label="姓名："
                placeholder="自定义或者自动获取"
            />
            <van-field
                v-model="data.clock.jobName"
                name="jobName"
                label="职位"
                placeholder="职位"
            />
            <van-field
                v-model="data.clock.jobAddress"
                name="jobAddress"
                label="公司地址："
                @change="changeAddress"
                placeholder="自动获取公司地址或者自定义地址"
                :rules="[{ required: true, message: '请填写公司地址' }]"
            />
            <van-field
                v-model="data.clock.clockAddress"
                name="clockAddress"
                label="打卡地址："
                placeholder="省 · 市 · 区 · 在xxx附近"
                :rules="[{ required: true, message: '请填写打卡地址' }]"
            />
            <van-field
                v-model="data.clock.longitude"
                label="经度："
                readonly
                placeholder="经度（根据公司地址自动生成）"
                :rules="[{ required: true, message: '请填写经度' }]"
            />
            <van-field
                v-model="data.clock.latitude"
                name="latitude"
                readonly
                label="纬度："
                placeholder="纬度（根据公司地址自动生成）"
                :rules="[{ required: true, message: '请填写纬度' }]"
            />
          </van-collapse-item>
        </van-collapse>
        <van-field
            v-model="data.defaultClockInfo.startTime"
            is-link
            readonly
            name="startTime"
            label="上班打卡："
            placeholder="点击选择上班打卡时间"
            @click="startTimeShow = true"
            :rules="[{ required: true, message: '请填写上班打卡时间' }]"
        />
        <van-field
            v-model="data.defaultClockInfo.endTime"
            is-link
            readonly
            name="endTime"
            label="下班打卡："
            placeholder="点击选择上班打卡时间"
            @click="endTimeShow = true"
        />
        <van-field name="selectClockDay" label="打卡周期">
          <template #input>
            <van-checkbox-group v-model="data.defaultClockInfo.selectClockDay" @change="groupCheckedA"
                                direction="horizontal">
              <van-checkbox name="2" shape="square">周一</van-checkbox>
              <br>
              <van-checkbox name="3" shape="square">周二</van-checkbox>
              <br>
              <van-checkbox name="4" shape="square">周三</van-checkbox>
              <br>
              <van-checkbox name="5" shape="square">周四</van-checkbox>
              <br>
              <van-checkbox name="6" shape="square">周五</van-checkbox>
              <br>
              <van-checkbox name="7" shape="square">周六</van-checkbox>
              <br>
              <van-checkbox name="1" shape="square">周日</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
        <van-field name="clockDays" label="打卡天数：">
          <template #input>
            <van-stepper v-model="data.defaultClockInfo.clockDays"/>
          </template>
        </van-field>
        <van-collapse v-model="getDevice">
          <van-collapse-item title="获取设备信息（可选）" name="1">
            <van-cell-group class="mx-4 text-sm">
              连接地址：<a href="https://www.123pan.com/s/XrbBjv-ns0E3.html" target="_blank"
                          class="text-blue-400">下载获取设备信息软件</a>
            </van-cell-group>
            <van-field
                v-model="data.clock.device"
                name="device"
                label="设备信息："
                placeholder="下载软件后复制填入"
            />
          </van-collapse-item>
        </van-collapse>
        <van-collapse v-model="massagePush">
          <van-collapse-item title="消息推送（可选）" name="1">
            <van-field
                v-model="data.clock.email"
                name="email"
                label="邮箱："
                placeholder="邮箱地址"
            />
            <van-field
                v-model="data.clock.pushToken"
                name="pushToken"
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
            <van-switch size="22px" v-model="data.defaultClockInfo.startDayLyNewspaper"/>
            &nbsp;每天提交
          </template>
        </van-field>
        <van-field name="startWeekLyNewspaper" label="周报：">
          <template #input>
            <van-switch size="22px" v-model="data.defaultClockInfo.startWeekLyNewspaper"/>
            &nbsp;每周最后一天提交
          </template>
        </van-field>
        <van-field name="startMonthLyNewspaper" label="月报：">
          <template #input>
            <van-switch size="22px" v-model="data.defaultClockInfo.startMonthLyNewspaper"/>
            &nbsp;每月最后一天提交
          </template>
        </van-field>
        <van-field name="reportSource" label="报告来源">
          <template #input>
            <van-radio-group v-model="data.defaultClockInfo.reportSource" direction="horizontal">
              <van-radio @click="getReportSourceByAi" :name=1>AI定制化报告</van-radio>
              <br>
              <van-radio @click="getReportSourceByLibrary" :name=2>报告库</van-radio>
              <br>
              <van-radio @click="getReportSourceByYour" :name=3>自己填写</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>

      <van-action-sheet
          v-model:show="showReportSourceByYour" title="自己填写">
        <van-collapse v-model="reportYour" accordion>
          <van-field
              v-model="data.clock.jobName"
              name="jobName"
              label="职位"
              readonly
              placeholder="职位"
          />
          <van-collapse-item v-if="data.defaultClockInfo.startDayLyNewspaper" title="日报" name="1">
            <van-field
                v-model="data.report.dayReport.dayTitle"
                name="dayTitle"
                label="标题"
                placeholder="标题"
            />
            <van-field
                v-model="data.report.dayReport.dayContent"
                name="dayContent"
                type="textarea"
                autosize
                rows="2"
                maxlength="1200"
                show-word-limit
                label="内容"
                placeholder="内容"
            />
          </van-collapse-item>
          <van-collapse-item v-if="data.defaultClockInfo.startWeekLyNewspaper" title="周报" name="2">
            <van-field
                v-model="data.report.weekReport.weekTitle"
                name="weekTitle"
                label="标题"
                placeholder="标题"
            />
            <van-field
                v-model="data.report.weekReport.weekContent"
                name="weekContent"
                type="textarea"
                autosize
                rows="2"
                maxlength="1200"
                show-word-limit
                label="内容"
                placeholder="内容"
            />
          </van-collapse-item>
          <van-collapse-item v-if="data.defaultClockInfo.startMonthLyNewspaper" title="月报" name="3">
            <van-field
                v-model="data.report.monthReport.monthTitle"
                name="monthTitle"
                label="标题"
                placeholder="标题"
            />
            <van-field
                v-model="data.report.monthReport.monthContent"
                name="monthContent"
                type="textarea"
                autosize
                rows="2"
                maxlength="1200"
                show-word-limit
                label="内容"
                placeholder="内容"
            />
          </van-collapse-item>
        </van-collapse>
        <div class="mx-2 mt-5">
          <van-button plain type="primary" @click="showReportSourceByYour=false" block>确认</van-button>
        </div>
        <br>
      </van-action-sheet>

      <van-popup v-model:show="startTimeShow" position="bottom">
        <van-time-picker
            v-model="data.defaultStartTime"
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
            v-model="data.defaultEndTime"
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
    <br/>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, watchEffect} from "vue";
import {showFailToast, showLoadingToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";
import {ClockInControllerService, ClockInInfoControllerService} from "../services/moguding-backend";


const loading = ref(false);
const finished = ref(false);
const reportLibrary = ref([]);
const reportYour = ref([]);

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

const selectDayReport = (item) => {
  data.selectDayReportIndex = item.id
  data.report.dayReport.dayContent = item.content
  data.report.dayReport.dayTitle = data.clock.jobName + item.title
}
const selectWeekReport = (item) => {
  data.selectWeekReportIndex = item.id
  data.report.weekReport.weekContent = item.content
  data.report.weekReport.weekTitle = data.clock.jobName + item.title
}
const selectMonthReport = (item) => {
  data.selectMonthReportIndex = item.id
  data.report.monthReport.monthContent = item.content
  data.report.monthReport.monthTitle = data.clock.jobName + item.title
}

const confirmStartTime = (val) => {
  data.defaultStartTime = val.selectedValues
  data.defaultClockInfo.startTime = val.selectedValues.map((item) => item).join(':');
  startTimeShow.value = false
}
const confirmEndTime = (val) => {
  data.defaultEndTime = val.selectedValues
  data.defaultClockInfo.endTime = val.selectedValues.map((item) => item).join(':');
  endTimeShow.value = false
}
let backClock = []
const groupCheckedA = (val) => {
  if (!val || val.length < 1) {
    showFailToast("打卡周期最少1天")
    data.defaultClockInfo.selectClockDay = backClock
    return
  }
  backClock = val
}

const selectReportType = (v) => {
}

const data = reactive({
  selectDayReportIndex: null,
  selectWeekReportIndex: null,
  selectMonthReportIndex: null,
  activeIndex: null,
  generatingReport: false,
  defaultStartTime: ['08', '00', '00'],
  defaultEndTime: ['18', '00', '00'],
  reportBackupList: [],
  dayReportList: [],
  weekReportBackupList: [],
  monthReportList: [],
  loading: false,
  clock: {
    clockAddress: '',
    clockDays: '',
    dailyNewspaperStatus: 0,
    device: '',
    email: '',
    endTime: '',
    jobName: '',
    jobAddress: '',
    monthNewspaperStatus: 0,
    password: '',
    phone: '',
    platformId: '',
    pushToken: '',
    reportSource: '',
    latitude: '',
    longitude: '',
    area: '',
    city: '',
    province: '',
    nikeName: '',
    selectClockDay: [],
    startTime: '',
    weekNewspaperStatus: 0,
    type: ''
  },
  report: {
    dayReport: {
      type: "day",
      dayTitle: "",
      dayContent: ''
    },
    weekReport: {
      type: "week",
      weekTitle: "",
      weekContent: ''
    },
    monthReport: {
      monthTitle: "",
      type: "month",
      monthContent: ''
    },
  },
  getClockInfoStatus: false,
  defaultClockInfo: {
    platformId: '',
    pushPushToken: '',
    email: '',
    device: '',
    clockDays: 180,
    reportSource: 0,
    startDayLyNewspaper: false,
    startWeekLyNewspaper: false,
    startMonthLyNewspaper: false,
    startTime: '08:00:00',
    endTime: '18:00:00',
    selectClockDay: ['7', '1', "2", "3", "4", "5", "6"],
  }
});

const changeAddress = async () => {
  if (data.clock.jobAddress) {
    const res = await ClockInControllerService.getChangeClonkAddressInfoUsingPost(data.clock.jobAddress)
    data.clock.clockAddress = res.data.clockAddress
    data.clock.latitude = res.data.latitude
    data.clock.longitude = res.data.longitude
  }
}

watchEffect(() => {
  const {id} = route.query
  if (!id) {
    showFailToast("平台不存在")
    return
  }
  data.clock.platformId = id as string
});

const getReportSourceByLibrary = () => {
  if (!data.defaultClockInfo.startDayLyNewspaper && !data.defaultClockInfo.startWeekLyNewspaper && !data.defaultClockInfo.startMonthLyNewspaper) {
    showFailToast("请先开启任意报告")
    return
  }
  showReportSourceByLibrary.value = true
}
const getReportSourceByAi = () => {
  if (!data.defaultClockInfo.startDayLyNewspaper && !data.defaultClockInfo.startWeekLyNewspaper && !data.defaultClockInfo.startMonthLyNewspaper) {
    showFailToast("请先开启任意报告")
    return
  }
  showReportSourceByAi.value = true
}

const generateAReport = () => {
  if (!data.defaultClockInfo.startDayLyNewspaper && !data.defaultClockInfo.startWeekLyNewspaper && !data.defaultClockInfo.startMonthLyNewspaper) {
    showFailToast("请先选择任意报告")
    return
  }
  if (!data.clock.jobName) {
    showFailToast("请先获取您的岗位信息")
    showReportSourceByAi.value = false
    return
  }
  data.generatingReport = true
  setTimeout(() => {
    showReportSourceByAi.value = false
  }, 1000)
}
const getReportSourceByYour = () => {
  if (!data.defaultClockInfo.startDayLyNewspaper && !data.defaultClockInfo.startWeekLyNewspaper && !data.defaultClockInfo.startMonthLyNewspaper) {
    showFailToast("请先开启任意报告")
    return
  }
  showReportSourceByYour.value = true
}

const getClockInfo = async () => {
  if (data.getClockInfoStatus) {
    data.loading = true
    showLoadingToast({
      duration: 0,
      forbidClick: true,
      message: '获取打卡信息中',
    });
    const res = await ClockInControllerService.initClockInfoUsingPost(data.clock.phone, data.clock.password)
    if (res.data && res.code === 0) {
      setTimeout(() => {
        showSuccessToast("打卡信息获取成功")
        data.clock = {
          ...data.clock,
          ...res.data
        }
        data.loading = false
      }, 1500)
    } else {
      data.getClockInfoStatus = false
      data.loading = false
    }
  }
}


const onSubmit = async () => {
  if (!data.clock.jobAddress || !data.clock.phone || !data.clock.clockAddress
      || !data.clock.password || !data.clock.latitude || !data.clock.longitude || !data.clock.jobName) {
    showFailToast("基础信息未填写")
    return
  }
  if (data.defaultClockInfo.reportSource === 3) {
    if (data.defaultClockInfo.startDayLyNewspaper) {
      if (!data.report.dayReport.dayContent || data.report.dayReport.dayContent === "暂无") {
        showFailToast("日报开启后,报告来源为自己填写内容不能为空")
        return
      }
    }
    if (data.defaultClockInfo.startWeekLyNewspaper) {
      if (!data.report.weekReport.weekContent || data.report.weekReport.weekContent === "暂无") {
        showFailToast("周报开启后,报告来源为自己填写内容不能为空")
        return
      }
    }
    if (data.defaultClockInfo.startMonthLyNewspaper) {
      if (!data.report.monthReport.monthContent || data.report.monthReport.monthContent === "暂无") {
        showFailToast("月报开启后,报告来源为自己填写内容不能为空")
        return
      }
    }
  }
  if (data.defaultClockInfo.startMonthLyNewspaper || data.defaultClockInfo.startWeekLyNewspaper || data.defaultClockInfo.startDayLyNewspaper) {
    if (data.defaultClockInfo.reportSource === 0) {
      showFailToast("开启报告后，请选择报告来源")
      return
    }
  }

  showLoadingToast({
    duration: 0,
    forbidClick: true,
    message: '添加打卡信息中',
  });
  const res = await ClockInInfoControllerService.addClockInInfoUsingPost({
    ...data.clock
    , clockDays: data.defaultClockInfo.clockDays,
    startTime: data.defaultClockInfo.startTime,
    endTime: data.defaultClockInfo.endTime,
    reportSource: data.defaultClockInfo.reportSource,
    dailyNewspaperStatus: data.defaultClockInfo.startDayLyNewspaper ? 1 : 0,
    monthNewspaperStatus: data.defaultClockInfo.startMonthLyNewspaper ? 1 : 0,
    weekNewspaperStatus: data.defaultClockInfo.startWeekLyNewspaper ? 1 : 0,
    selectClockDay: JSON.stringify(data.defaultClockInfo.selectClockDay),
    reportContent: JSON.stringify(data.report)
  })
  if (res.data && res.code === 0) {
    setTimeout(() => {
      showSuccessToast("打卡信息添加成功")
      router.push('/clockInfo?clockType=gxy&tagType=all')
    }, 1500)
  }
  // showFailToast(JSON.stringify(values));
};

</script>


<style>
.data {
  margin-top: 15px;
}

.data span {
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


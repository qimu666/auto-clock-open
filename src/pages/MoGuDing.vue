<template>
  <div class="mt-2">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="state.clockInfo.userName"
            name="userName"
            label="工学云账号："
            placeholder="工学云账号"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="state.clockInfo.password"
            type="password"
            name="password"
            label="工学云密码："
            placeholder="工学云密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-cell center title="一键获取账号信息：">
          <template #right-icon>
            <van-switch size="22px" :loading="state.loading" @click="getClockInfo" v-model="state.checked"/>
          </template>
        </van-cell>
        <van-field
            v-model="state.clockInfo.startTime"
            is-link
            readonly
            name="startTime"
            label="上班打卡："
            placeholder="点击选择上班打卡时间"
            @click="startTimeShow = true"
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
        <!--        <van-cell center title="地图选址：">-->
        <!--          <template #right-icon>-->
        <!--            <van-switch size="22px" v-model="show"/>-->
        <!--          </template>-->
        <!--        </van-cell>-->
        <van-field
            v-model="state.clockInfo.jobAddress"
            name="jobAddress"
            label="公司地址："
            placeholder="自动获取公司地址或者自定义地址"
        />
        <van-field
            v-model="state.clockInfo.clockAddress"
            name="clockAddress"
            label="打卡地址："
            placeholder="省 · 市 · 区 · 在xxx附近"
        />
        <van-field
            v-model="state.clockInfo.longitude"
            label="经度："
            readonly
            placeholder="经度（根据公司地址自动生成）"
        />
        <van-field
            v-model="state.clockInfo.latitude"
            name="latitude"
            readonly
            label="纬度："
            placeholder="纬度（根据公司地址自动生成）"
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
      </van-cell-group>
      <br>
      <van-cell-group inset>
        <van-field name="startDayly" label="日报：">
          <template #input>
            <van-switch  size="22px" v-model="state.clockInfo.startDayly"/>
            &nbsp;每天提交
          </template>
        </van-field>
        <van-field name="startWeekly" label="周报：">
          <template #input>
            <van-switch  size="22px"  v-model="state.clockInfo.startWeekly"/>
            &nbsp;每周最后一天提交
          </template>
        </van-field>
        <van-field name="startMonthly" label="月报：">
          <template #input>
            <van-switch  size="22px" v-model="state.clockInfo.startMonthly"/>
            &nbsp;每月最后一天提交
          </template>
        </van-field>
        <van-field name="reportSource" label="报告来源">
          <template #input>
            <van-radio-group v-model="state.clockInfo.reportSource" direction="horizontal">
              <van-radio @click="doReportSourceShowC" name="1">定制化报告</van-radio>
              <br>
              <van-radio @click="doReportSourceShowA" name="2">报告库</van-radio>
              <br>
              <van-radio @click="doReportSourceShowB" name="3">自己填写</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>
      <van-action-sheet v-model:show="reportSourceShowC" title="定制化报告">
        <van-collapse v-model="activeNames" accordion>
          <van-field
              v-model="state.clockInfo.jobName"
              name="weekPosition"
              label="职位"
              readonly
              placeholder="职位"
          />
        </van-collapse>
        <van-field name="startDayly" label="日报：">
          <template #right-icon>
            <van-switch v-model="state.clockInfo.startDayly"/>
          </template>
        </van-field>
        <van-field name="startWeekly" label="周报：">
          <template #right-icon>
            <van-switch v-model="state.clockInfo.startWeekly"/>
          </template>
        </van-field>
        <van-field name="startMonthly" label="月报：">
          <template #right-icon>
            <van-switch v-model="state.clockInfo.startMonthly"/>
          </template>
        </van-field>
        <div class="mx-2 mt-5">
          <van-button plain type="primary" @click="generateAReport" block>生成报告</van-button>
        </div>
        <br/>
      </van-action-sheet>
      <van-action-sheet @cancel="reportSourceShowA = false"
                        v-model:show="reportSourceShowA" title="报告库">
        <van-collapse v-model="activeNames" accordion>
          <van-field
              v-model="state.clockInfo.jobName"
              name="weekPosition"
              label="职位"
              readonly
              placeholder="职位"
          />
          <van-collapse-item v-if="state.clockInfo.startDayly" title="日报" name="1">
            <van-field
                v-model="state.dayReport.dayTitle"
                name="dayTitle"
                label="标题"
                placeholder="标题"
            />
            <van-field
                v-model="state.dayReport.dayContent"
                name="dayContent"
                type="textarea"
                autosize
                rows="2"
                maxlength="500"
                show-word-limit
                label="内容"
                placeholder="内容"
            />
          </van-collapse-item>
          <van-collapse-item v-if="state.clockInfo.startWeekly" title="周报" name="2">
            <van-field
                v-model="state.weekReport.weekTitle"
                name="weekTitle"
                label="标题"
                placeholder="标题"
            />
            <van-field
                v-model="state.weekReport.weekContent"
                name="weekContent"
                type="textarea"
                autosize
                rows="2"
                maxlength="500"
                show-word-limit
                label="内容"
                placeholder="内容"
            />
          </van-collapse-item>
          <van-collapse-item v-if="state.clockInfo.startMonthly" title="月报" name="3">
            <van-field
                v-model="state.monthReport.monthTitle"
                name="monthTitle"
                label="标题"
                placeholder="标题"
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
            />
          </van-collapse-item>
        </van-collapse>
        <div class="mx-2 mt-5">
          <van-button plain type="primary" block>确认</van-button>
        </div>
      </van-action-sheet>
      <van-action-sheet
          @cancel="reportSourceShowA = false"
          v-model:show="reportSourceShowB" title="自己填写">
        <van-collapse v-model="activeNames" accordion>
          <van-field
              v-model="state.clockInfo.jobName"
              name="weekPosition"
              label="职位"
              readonly
              placeholder="职位"
          />
          <van-collapse-item v-if="state.clockInfo.startDayly" title="日报" name="1">
            <van-field
                v-model="state.dayReport.dayTitle"
                name="dayTitle"
                label="标题"
                placeholder="标题"
            />
            <van-field
                v-model="state.dayReport.dayContent"
                name="dayContent"
                type="textarea"
                autosize
                rows="2"
                maxlength="500"
                show-word-limit
                label="内容"
                placeholder="内容"
            />
          </van-collapse-item>
          <van-collapse-item v-if="state.clockInfo.startWeekly" title="周报" name="2">
            <van-field
                v-model="state.weekReport.weekTitle"
                name="weekTitle"
                label="标题"
                placeholder="标题"
            />
            <van-field
                v-model="state.weekReport.weekContent"
                name="weekContent"
                type="textarea"
                autosize
                rows="2"
                maxlength="500"
                show-word-limit
                label="内容"
                placeholder="内容"
            />
          </van-collapse-item>
          <van-collapse-item v-if="state.clockInfo.startMonthly" title="月报" name="3">
            <van-field
                v-model="state.monthReport.monthTitle"
                name="monthTitle"
                label="标题"
                placeholder="标题"
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
            v-model="state.endTime"
            title="下班打卡时间："
            @confirm="confirmEndTime"
            :columns-type="['hour', 'minute', 'second']"
            min-time="12:00:00"
            max-time="23:30:00"
            @cancel="endTimeShow = false"
        />
      </van-popup>
      <van-action-sheet v-model:show="show" title="地图选址">
        <van-field
            v-model="state.clockInfo.jobAddress"
            name="jobAddress"
            label="公司地址"
            placeholder="公司地址"
        />
        <van-field
            v-model="state.clockInfo.clockAddress"
            name="clockAddress"
            label="打卡地址"
            placeholder="省 · 市 · 区 · 在xxx附近"
            :rules="[{ required: true, message: '请填写打卡地址' }]"
        />
        <BMap ref="map" height="320px" :center="point || undefined" @initd="handleInitd"
              :mapType="mapType"
        >
          <BZoom :offset="{ x: 22, y: 80 }"/>
          <BCityList :offset="{ x: 20, y: 20 }"/>
          <BNavigation3d anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :offset="{ x: 10, y: 140 }"/>
          <BControl anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{ x: 20, y: 20 }" class="custom-control">
            <select class="select" name="" id="" v-model="mapType">
              <option value="BMAP_NORMAL_MAP">普通地图</option>
              <option value="BMAP_SATELLITE_MAP">卫星地图</option>
              <option value="BMAP_EARTH_MAP">地球模式</option>
            </select>
          </BControl>
          <BLocation :offset="{ x: 14, y: 20 }"/>

          <template v-if="!isLoading && !isEmpty">
            <BMarker :position="point"></BMarker>
            <BLabel
                style="color: #333; font-size: 9px"
                :position="point"
                :content="arvaVal?arvaVal:'12' "
            />
          </template>
        </BMap>
      </van-action-sheet>
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
import {reactive, ref} from "vue";
import {MapType, Point, useAddressGeocoder} from 'vue3-baidu-map-gl'
import {closeToast, showFailToast, showLoadingToast, showSuccessToast} from "vant";

const activeNames = ref(['1']);
const show = ref(false);
const startTimeShow = ref(false);
const endTimeShow = ref(false);
const reportSourceShowA = ref(false);
const reportSourceShowC = ref(false);

const reportSourceShowB = ref(false);
const groupChecked = ref([]);
const groupCheckedA = (v) => {
  console.log(v, 'v')
}

const confirmStartTime = (val) => {
  state.startTime = val.selectedValues
  state.clockInfo.startTime = val.selectedValues.map((item) => item).join(':');
  startTimeShow.value = false
}
const confirmEndTime = (val) => {
  state.endTime = val.selectedValues
  state.clockInfo.startTime = val.selectedValues.map((item) => item).join(':');
  startTimeShow.value = false
}
const state = reactive({
  activeIndex: null,
  startTime: ['08', '00', '00'],
  endTime: ['19', '00', '00'],
  loading: false,
  dayReport: {
    dayTitle: "",
    dayContent: ''
  },
  weekReport: {
    weekTitle: "",
    weekContent: ''
  },
  monthReport: {
    monthTitle: "",
    monthContent: ''
  },
  checked: false,
  clockInfo: {
    clockDays: 180,
    jobName: '',
    reportSource: '',
    startDayly: false,
    startWeekly: false,
    startMonthly: false,
    startTime: '08:00:00',
    endTime: '18:00:00',
    clockDay: ['0', '1', "2", "3", "4", "5", "6"],
    userName: '',
    password: '',
    latitude: '',
    longitude: '',
    jobAddress: "",
    clockAddress: ""
  }
});

const doReportSourceShowA = () => {
  if (!state.clockInfo.startDayly && !state.clockInfo.startWeekly && !state.clockInfo.startMonthly) {
    showFailToast("请先开启任意报告")
    return
  }
  reportSourceShowA.value = true
}
const doReportSourceShowC = () => {
  // if (!state.clockInfo.startDayly && !state.clockInfo.startWeekly && !state.clockInfo.startMonthly) {
  //   showFailToast("请先开启任意报告")
  //   return
  // }
  reportSourceShowC.value = true
}
const doReportSourceShowB = () => {
  if (!state.clockInfo.startDayly && !state.clockInfo.startWeekly && !state.clockInfo.startMonthly) {
    showFailToast("请先开启任意报告")
    return
  }
  reportSourceShowB.value = true
}

const getClockInfo = () => {
  if (state.checked) {
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
      const lodaData = {
        clockDays: 180,
        userName: "qimuuuu",
        jobName: '室内设计',
        startDayly: false,
        startTime: '06:07:00',
        endTime: '18:45:00',
        password: "12345678",
        startWeekly: false,
        startMonthly: false,
        latitude: '123.45',
        reportSource: '',
        longitude: '123.45',
        clockDay: ['0', '1', "2", "3", "4", "5", "6"],
        jobAddress: "河南省郑州市二七区嵩山路政通路亿辰山海间3号楼1单元1309",
        clockAddress: "河南省 · 郑州市 · 二七区 · 在亿辰山海间附近"
      }
      state.clockInfo = lodaData

      state.startTime = state.clockInfo.startTime.split(":");
      state.endTime = state.clockInfo.endTime.split(":");
      state.loading = false
    }, 2000)
  }
}
const arvaVal = ref();

const onSubmit = (values) => {
  console.log(values)
  showFailToast(JSON.stringify(values));
};

// onMounted(() => {
//   if (!state.clockInfo.jobAddress) {
//     return
//   }
//   formatAddress(state.clockInfo.jobAddress)
// })

const generateAReport = () => {
  if (!state.clockInfo.jobName) {
    showFailToast("请先获取您的岗位信息")
    reportSourceShowC.value=false
  }

}

const mapType = ref<MapType>('BMAP_NORMAL_MAP')
const map = ref()

const {get, point, isLoading, isEmpty} = useAddressGeocoder<Point>(() => {
  map.value.resetCenter()
})

// watch(
//     () => state.clockInfo.jobAddress,
//     (n) => {
//       if (!n) {
//         showFailToast("公司地址不能为空");
//         return
//       }
//       formatAddress(n)
//     },
//     {
//       deep: true
//     }
// )


const formatAddress = (val) => {
  const reg = /^(?<province>[^市县区]+(?:省|自治区|特别行政区))(?<city>[^市县区]+市|市辖区)(?<county>[^市县区]+(?:区|县|市内区|林区|特区))?(?<address>(?:[^\\n]*))/;
  const regExpMatchArray = val.match(reg);
  const province = regExpMatchArray.groups.province;
  const city = regExpMatchArray.groups.city;
  const county = regExpMatchArray.groups.county;
  const address = regExpMatchArray.groups.address;

  let newAddress = '';
  if (province && province.trim()) {
    newAddress += province;
  }
  if (city && city.trim()) {
    newAddress += ' · ' + city;
  }
  if (county && county.trim()) {
    newAddress += ' · ' + county;
  }
  if (address && address.trim()) {
    newAddress += ' · ' + address;
  }
  if (newAddress.trim().endsWith("·")) {
    newAddress = newAddress.slice(0, -1);
  }
  state.clockInfo.clockAddress = newAddress
  if (show.value) {
    arvaVal.value = regExpMatchArray.input
    get(val, regExpMatchArray.groups.city)
  }
}

const handleInitd = () => {
  var reg = /^(?<province>[^市县区]+(?:省|自治区|特别行政区))(?<city>[^市县区]+市|市辖区)(?<county>[^市县区]+(?:区|县|市内区|林区|特区))?(?<address>(?:[^\\n]*))/;
  const regExpMatchArray = state.clockInfo.jobAddress.match(reg);
  arvaVal.value = regExpMatchArray.input
  get(state.clockInfo.jobAddress, regExpMatchArray.groups.city)
}

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


<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set">
        <div class="main_rightTop">
            <p>
                <span class="backout" @click="backoutclick"></span>
                <span style="margin-left: 5px;">返回</span>
            </p>
        </div>
        <div class="main_rightMain">
            <div style="margin-left: 96px;"><span>考勤组名称：</span><input class="inputText" type="text" placeholder="可按部门命名"></div>
            <div>
                <span style="float: left;">考勤类型：</span>
                <span style="margin-left: 10px;">排班制</span>
            </div>
            <!--排班制-->
            <div class="paibanradio" v-show="paiban">
                <div style="margin-left: 122px;" v-for="(list,index1) in lists"><span style="float: left;">{{list.name}}</span>
                    <div class="globalTime">
                        <ul style="float: left;">
                            <li v-for="(item,index) in lists[index1].itemsban" style="overflow: hidden;">
                                <div class="DatetimeBox" style="margin-left: 10px;">
                                    <el-time-select :picker-options="{
                                            start: '08:30',step: '00:05',end: '18:30'
                                            }" v-model="lists[index1].starTimeban[index]" placeholder="任意时间" :editable='false' clearable>
                                        </el-time-select>
                                </div>
                                <span style="float: left;line-height: 32px;margin: 0 5px;color: #d9d9d9;">———</span>
                                <div class="DatetimeBox">
                                    <el-time-select :picker-options="{
                                            start: '08:30',step: '00:05',end: '18:30',minTime:starTime[index]
                                            }" v-model="lists[index1].endTimeban[index]" placeholder="任意时间" :editable='false' clearable>
                                        </el-time-select>
                                </div>
                                <div v-show="index == 0" class="addbox" @click="addban_1(index,index1)"></div>
                                <div v-show="index != 0" class="removebox" @click="removeban_1(index,index1)"></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style="margin-top: 0px;margin-left: 188px;">
                    <div class="addicon" style="background-position: -86px -153px;margin-left: 0;" @click="addbanci()"></div><span style="margin-left: 5px;">添加班次</span> <span class="grayfont">(最多可添加10个班次)</span>
                </div>
                <div class="advanceSet">
                    <span style="float: left;">高级设置：</span>
                    <div>
                        <div style="float: left;margin-left: 10px;"><span>允许最早签到时间</span><span style="margin-left: 30px;">上班前2小时</span></div>
                        <div class="dailyicon" @click="paibanhighSet"></div>
                    </div>
                    <div><span style="margin-left: 80px;">允许最晚签到时间</span><span style="margin-left: 30px;">下班后6小时</span></div>
                </div>
                <div class="attendance">
                    <span style="float: left;">考勤位置：</span><span class="grayfont" style="margin-left: 10px">以下方式满足一项，考勤组成员即可完成考勤</span>
                    <div class="locationAtt">
                        <div style="overflow: hidden;">
                            <div style="float: left;line-height: 32px;margin-left: 78px;"><span>1、位置考勤 </span><span class="grayfont">(可填写多个地理位置)</span></div>
                            <div style="float: left;">
                                <span style="float: left;line-height: 32px;margin-left: 40px;margin-right: 10px;">有效范围</span>
                                <div class="selectBox" style="margin-top: 4px;">
                                    <el-select v-model="value_5" placeholder="请选择">
                                        <el-option v-for="item in options" :label="item.label" :value="item.value" :key="aa">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <ul>
                            <li v-for="(item,index) in locations_3">
                                <span>{{item}}</span>
                                <div class="deletelocation"></div>
                            </li>
                        </ul>
                        <div style="margin-top: 10px;margin-left: 100px;">
                            <div class="addlocation" @click="attendanceGroup"></div><span class="grayfont">添加考勤地点</span>
                        </div>

                    </div>
                    <div class="wifiAtt">
                        <div style="overflow: hidden;">
                            <div style="float: left;line-height: 32px;margin-left: 78px;"><span>1、WIFI考勤 </span><span class="grayfont">(可填写多个地理位置)</span></div>
                            <div style="float: left;">
                                <span style="float: left;line-height: 32px;margin-left: 40px;margin-right: 10px;">有效范围</span>
                                <div class="selectBox" style="margin-top: 4px;">
                                    <el-select v-model="value_6" placeholder="请选择">
                                        <el-option v-for="item in options" :label="item.label" :value="item.value" :key="aa">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <ul style="overflow: hidden">
                            <li v-for="(item,index) in locations_4">
                                <span>{{item.location}}</span><span>{{item.wifiname}}</span><span>{{item.wifiip}}</span>
                                <div class="deletelocation"></div>
                            </li>
                        </ul>
                        <div style="margin-top: 10px;margin-left: 100px;">
                            <div class="addlocation"></div><span class="grayfont">添加考勤WIFI</span>
                        </div>

                    </div>
                    <div style="margin: 32px 0;">
                        <input type="button" value="保存" class="baocun" style="margin-left: 178px;" @click="continueSet">
                        <input type="button" value="取消" class="quxiao" style="margin-left: 46px;">
                    </div>
                </div>
            </div>
        </div>
        <!--排班高级设置弹出框-->
        <div class="ModalsBox" v-show="paibanModalsBox">
            <div class="Modals" style="height: 621px;">
                <div class="modalsTop">
                    高级设置
                </div>
                <div class="modalsBot" style="height: 458px;">
                    <div class="chunk chunks">
                        <div class="punch">
                            <span>最早打卡时间</span>
                            <div class="selectBox">
                                <el-select v-model="delay_01" placeholder="请选择">
                                    <el-option v-for="item in delays_1" :label="item.label" :value="item.value" :key="aa">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="punch">
                            <span>最晚打卡时间</span>
                            <div class="selectBox">
                                <el-select v-model="delay_02" placeholder="请选择">
                                    <el-option v-for="item in delays_2" :label="item.label" :value="item.value" :key="aa">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="punch">
                            <span class="grayfont">在此时间范围以外不能打卡</span>
                        </div>
                    </div>
                    <div class="chunk chunks">
                        <div class="punch">
                            <span>上班弹性时间</span>
                            <div class="selectBox">
                                <el-select v-model="delay_03" placeholder="请选择">
                                    <el-option v-for="item in delays_3" :label="item.label" :value="item.value" :key="aa">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="punch">
                            <span>设置严重迟到</span>
                            <div class="selectBox">
                                <el-select v-model="delay_04" placeholder="请选择">
                                    <el-option v-for="item in delays_4" :label="item.label" :value="item.value" :key="aa">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="punch">
                            <span>设置旷工</span>
                            <span style="margin-left: 190px;">上班后</span>
                            <div class="selectBox">
                                <el-select v-model="delay_05" placeholder="请选择">
                                    <el-option v-for="item in delays_5" :label="item.label" :value="item.value" :key="aa">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="punch">
                            <span class="grayfont">方便统计员对出勤情况进行识别</span>
                        </div>
                    </div>
                    <div class="chunk chunks">
                        <div class="punch">
                            <el-checkbox v-model="paibancorrelation">设置请假、外出、出差、补卡关联</el-checkbox>
                        </div>
                        <div class="punch">
                            <span class="grayfont">关联后系统自动计算出考勤情况，方便统计</span>
                        </div>
                    </div>
                    <div class="chunk chunks">
                        <div class="punch">
                            <span>上班打卡提醒</span>
                            <div class="selectBox">
                                <el-select v-model="delay_06" placeholder="请选择">
                                    <el-option v-for="item in delays_6" :label="item.label" :value="item.value" :key="aa">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="punch">
                            <span>下班打卡提醒</span>
                            <div class="selectBox">
                                <el-select v-model="delay_07" placeholder="请选择">
                                    <el-option v-for="item in delays_7" :label="item.label" :value="item.value" :key="aa">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="punch">
                            <el-checkbox v-model="paibanallowField">允许外勤打卡</el-checkbox>
                        </div>
                    </div>
                </div>
                <div class="modalfoot"  style="padding:10px;padding-bottom: 58px;">
                    <input type="button" value="保存" class="baocun" style="margin-right: 24px;">
                    <input type="button" value="取消" class="quxiao" style="margin-left: 24px" @click="paibancancle">
                </div>
            </div>
        </div>
        
        <!--地图-->
        <div class="attendanceMapbox" v-show="attendanceMap">
            <div class="attendanceMap">
                <div class="addMap">添加考勤地点</div>
                <span id="addTitle">
                    考勤地点：
                </span>
                <input type="text" id="suggestId" name="address_detail" placeholder="请输入地址" v-model="address_detail" class="input_style">
                <div id="allmap" style="height: 347px;width: 536px;"></div>
                <div class="mapButton">
                    <div class="mapqx" @click="mapqx">取消</div>
                    <div class="mapqd">确定</div>
                </div>
            </div>
        </div>
        <!--设置成功后提示框-->
        <div class="ModalsBox" v-show="setSuccessBox">
            <div class="setSuccess">
                <div><span>事业一部考勤规则设置成功</span></div>
                <div>
                    <input style="margin-right: 15px;" type="button" value="继续设置人员">
                    <input style="margin-left: 15px;" type="button" value="暂不设置" @click="noset">
                </div>
            </div>
        </div>
        <!--添加考勤WIFI弹出框-->
        <div class="addAttendanceWifiBox ModalsBox" v-show="addAttendanceWifiBox">
        	<div class="addAttendanceWifi Modals">
        	   <div class="addAttendanceWifiTop">
        	   	  添加办公WIFI
        	   </div>
        	   <div class="addAttendanceWifiBot">       	   	         	   	   
        	   	   		<div>WIFI名称：<input type="text" placeholder='真实热点名称'/></div>
        	   	   	    <div>MAC地址：<input type="text" placeholder='真实热点名称'/></div>
        	   	   		<div>&nbsp;&nbsp;&nbsp;&nbsp;备注名：<input type="text" placeholder='真实热点名称'/></div>    
        	   	   		<div>
        	   	   			<p id="saveWIFI">
        	   	   				保存
        	   	   			</p>
        	   	   		    <p id="abolishWIFI" @click="abolishWifi">
        	   	   		    	取消
        	   	   		    </p>
        	   	   		</div>
        	   </div>
        	</div>
        </div>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex';
    import { MP } from '../../../assets/map.js'
    export default {
        name: 'set',
        data() {
            return {
                // 自由排班
                value_5:'',
                value_6:'',
                locations_5: ['中兴和泰酒店', '运璟网络'],
                locations_6: [{
                    location: '运璟',
                    wifiname: 'yunjing_AP',
                    wifiip: '00:00:00:00:00:00'
                },
                {
                    location: '中兴中兴钟祥',
                    wifiname: 'ZTE',
                    wifiip: '00:00:00:00:00:00'
                }],
                ziyouallowField:false,
                // 排班制
                paiban:true,
                ziyou:false,
                guding:true,
                paibanallowField:false,
                paibancorrelation:false,
                paibanModalsBox:false,
                lists: [
                    {
                        name: '班次一：',
                        itemsban:[''],
                        starTimeban:[],
                        endTimeban: [],
                    },
                ],
                value_4:'',
                value_3:'',
                locations_3: ['中兴和泰酒店', '运璟网络'],
                locations_4: [{
                    location: '运璟',
                    wifiname: 'yunjing_AP',
                    wifiip: '00:00:00:00:00:00'
                },
                {
                    location: '中兴中兴钟祥',
                    wifiname: 'ZTE',
                    wifiip: '00:00:00:00:00:00'
                }],
                delay_01:'',
                delay_02:'',
                delay_03:'',
                delay_04:'',
                delay_05:'',
                delay_06:'',
                delay_07:'',

                // 固定排班
                setSuccessBox: false,
                dailySet: false,
                StartTime: '',
                EndTime: '',
                allowField: false,
                correlation: true,
                ModalsBox: false,
                aa: '',
                items: [''],
                starTime: [],
                endTime: [],
                items_1: [''],
                starTime_1: [],
                endTime_1: [],
                // 每天考勤设置周一
                items_2: [''],
                starTime_2: ['08:00', '11:00', '14:00'],
                endTime_2: ['10:00', '13:00', '18:00'],
                monday: true,
                quantum_2: true,
                haverest_2: false,
                setquantum_2: false,
                // 每天考勤设置周二
                items_3: [''],
                starTime_3: ['08:00'],
                endTime_3: ['10:00'],
                Tue: true,
                quantum_3: true,
                haverest_3: false,
                setquantum_3: false,
                // 每天考勤设置周三
                items_4: [''],
                starTime_4: ['08:00'],
                endTime_4: ['10:00'],
                Wed: true,
                quantum_4: true,
                haverest_4: false,
                setquantum_4: false,
                // 每天考勤设置周四
                items_5: [''],
                starTime_5: ['08:00'],
                endTime_5: ['10:00'],
                Thu: true,
                quantum_5: true,
                haverest_5: false,
                setquantum_5: false,
                // 每天考勤设置周五
                items_6: [''],
                starTime_6: ['08:00'],
                endTime_6: ['10:00'],
                Fri: true,
                quantum_6: true,
                haverest_6: false,
                setquantum_6: false,
                // 每天考勤设置周六
                items_7: [''],
                starTime_7: ['08:00'],
                endTime_7: ['10:00'],
                Sat: false,
                quantum_7: false,
                haverest_7: true,
                setquantum_7: false,
                // 每天考勤设置周日
                items_8: [''],
                starTime_8: ['08:00'],
                endTime_8: ['10:00'],
                Sun: false,
                quantum_8: false,
                haverest_8: true,
                setquantum_8: false,
                // ======
                legal: true,
                options: [{
                    value: '选项1',
                    label: '100m'
                }, {
                    value: '选项2',
                    label: '200m'
                }],
                value_1: '',
                value_2: '',
                delay_1: '',
                delays_1: [{
                    value: '选项1',
                    label: '1小时'
                },
                {
                    value: '选项2',
                    label: '2小时'
                },
                {
                    value: '选项3',
                    label: '3小时'
                },
                {
                    value: '选项4',
                    label: '4小时'
                },
                {
                    value: '选项5',
                    label: '5小时'
                },
                {
                    value: '选项6',
                    label: '6小时'
                }],
                delay_2: '',
                delays_2: [{
                    value: '选项1',
                    label: '1小时'
                },
                {
                    value: '选项2',
                    label: '2小时'
                },
                {
                    value: '选项3',
                    label: '3小时'
                },
                {
                    value: '选项4',
                    label: '4小时'
                },
                {
                    value: '选项5',
                    label: '5小时'
                },
                {
                    value: '选项6',
                    label: '6小时'
                }],
                delay_3: '',
                delays_3: [{
                    value: '选项1',
                    label: '5分钟'
                },
                {
                    value: '选项2',
                    label: '10分钟'
                },
                {
                    value: '选项3',
                    label: '15分钟'
                },
                {
                    value: '选项4',
                    label: '20分钟'
                },
                {
                    value: '选项5',
                    label: '25分钟'
                },
                {
                    value: '选项6',
                    label: '30分钟'
                }],
                delay_4: '',
                delays_4: [{
                    value: '选项1',
                    label: '1分钟'
                },
                {
                    value: '选项2',
                    label: '2分钟'
                },
                {
                    value: '选项3',
                    label: '3分钟'
                },
                {
                    value: '选项4',
                    label: '4分钟'
                },
                {
                    value: '选项5',
                    label: '5分钟'
                },
                {
                    value: '选项6',
                    label: '6分钟'
                }],
                delay_5: '',
                delays_5: [{
                    value: '选项1',
                    label: '1小时'
                },
                {
                    value: '选项2',
                    label: '2小时'
                },
                {
                    value: '选项3',
                    label: '3小时'
                },
                {
                    value: '选项4',
                    label: '4小时'
                },
                {
                    value: '选项5',
                    label: '5小时'
                },
                {
                    value: '选项6',
                    label: '6小时'
                }],
                delay_6: '',
                delays_6: [{
                    value: '选项1',
                    label: '5分钟'
                },
                {
                    value: '选项2',
                    label: '10分钟'
                },
                {
                    value: '选项3',
                    label: '15分钟'
                },
                {
                    value: '选项4',
                    label: '20分钟'
                },
                {
                    value: '选项5',
                    label: '25分钟'
                },
                {
                    value: '选项6',
                    label: '30分钟'
                }],
                delay_7: '',
                delays_7: [{
                    value: '选项1',
                    label: '1分钟'
                },
                {
                    value: '选项2',
                    label: '2分钟'
                },
                {
                    value: '选项3',
                    label: '3分钟'
                },
                {
                    value: '选项4',
                    label: '4分钟'
                },
                {
                    value: '选项5',
                    label: '5分钟'
                },
                {
                    value: '选项6',
                    label: '6分钟'
                }],
                locations_1: ['中兴和泰酒店', '运璟网络'],
                locations_2: [{
                    location: '运璟网络',
                    wifiname: 'yunjing_AP',
                    wifiip: '00:00:00:00:00:00'
                },
                {
                    location: '中兴',
                    wifiname: 'ZTE',
                    wifiip: '00:00:00:00:00:00'
                }],
                value: '',
                address_detail: null, //详细地址
                userlocation: { lng: "", lat: "" },
                attendanceMap:false,
                ModalsBox:false,
                addAttendanceWifiBox:false
            }
        },
        mounted() {
            this.$nextTick(function () {
                MP("pM40PNcUXqUnVjVVPAHpysdXLGwAlGUG").then(BMap => {
                    var th = this
                    var map = new BMap.Map("allmap");            // 创建Map实例
                    var point = new BMap.Point(116.404, 39.915); // 创建点坐标
                    map.centerAndZoom(point, 15);
                    map.enableScrollWheelZoom();
                    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                        {
                            "input": "suggestId"
                            , "location": map

                        })
                    var myValue
                    ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
                        var _value = e.item.value;
                        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
                        this.address_detail = myValue
                        setPlace();
                    });

                    function setPlace() {
                        map.clearOverlays();    //清除地图上所有覆盖物
                        function myFun() {
                            th.userlocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                            map.centerAndZoom(th.userlocation, 18);
                            map.addOverlay(new BMap.Marker(th.userlocation));    //添加标注
                        }
                        var local = new BMap.LocalSearch(map, { //智能搜索
                            onSearchComplete: myFun
                        });
                        local.search(myValue);
                    }
                })
            })
        },
        created: function () {

        },
        watch: {

        },
        filters: {
            formatDate(date) {
                if (date == null || date == '' || date == undefined) {
                    return ''
                } else {
                    console.log(date)
                    let y, m, d, h, i, s, t = new Date(date);
                    console.log(t)
                    h = t.getHours();
                    i = t.getMinutes();
                    // s = t.getSeconds();
                    return (h < 10 ? '0' + h : h) + ':' + (i < 10 ? '0' + i : i)
                }
            },
        },
        methods: {
            // --排班制--
            addban_1(index,index1) {
                console.log(index1)
                var a = index + 1
                this.lists[index1].itemsban.push('')
            },
            removeban_1: function (index,index1) {
                this.lists[index1].itemsban.splice(index, 1)
                this.lists[index1].starTimeban.splice(index, 1)
                this.lists[index1].endTimeban.splice(index, 1)
            },
            addbanci() {
                var l = this.lists.length + 1
                console.log(l)
                if(l > 10){
                    this.$message('最多只能添加十个班次')
                    return 
                }else{
                switch (l) {
                    case 1:
                        l = "一"
                        break;
                    case 2:
                        l = "二"
                        break;
                    case 3:
                        l = "三"
                        break;
                    case 4:
                        l = "四"
                        break;
                    case 5:
                        l = "五"
                        break;
                    case 6:
                        l = "六"
                        break;
                    case 7:
                        l = "七"
                        break;
                    case 8:
                        l = "八"
                        break;
                    case 9:
                        l = "九"
                        break;
                    case 10:
                        l = "十"
                        break;
                }
                }
                this.lists.push({ name: '班次'+l+'：' ,itemsban:[''],starTimeban:[],
                        endTimeban: [],})
            },
            paibanhighSet:function(){
                this.paibanModalsBox = true
            },
            paibancancle:function(){
                this.paibanModalsBox = false
            },
            // 固定排班
            continueSet: function () {
                this.setSuccessBox = true
            },
            noset: function () {
                this.setSuccessBox = false
            },
            // 每天设置中的点击事件
            ischeck_2: function () {
                if (this.monday == true) {
                    this.quantum_2 = true
                    this.haverest_2 = false
                    this.setquantum_2 = false
                } else {
                    this.quantum_2 = false
                    this.haverest_2 = true
                    this.setquantum_2 = false
                }
            },
            peniconclick_2: function () {
                this.setquantum_2 = true
                this.quantum_2 = false
                this.haverest_2 = false
            },
            add_2() {
                this.items_2.push('')
            },
            remove_2: function (index) {
                this.items_2.splice(index, 1)
                this.starTime_2.splice(index, 1)
                this.endTime_2.splice(index, 1)
            },

            peniconclick_3: function () {
                this.setquantum_3 = true
                this.quantum_3 = false
                this.haverest_3 = false
            },
            ischeck_3: function () {
                if (this.Tue == true) {
                    this.quantum_3 = true
                    this.haverest_3 = false
                    this.setquantum_3 = false
                } else {
                    this.quantum_3 = false
                    this.haverest_3 = true
                    this.setquantum_3 = false
                }
            },
            add_3() {
                this.items_3.push('')
            },
            remove_3: function (index) {
                this.items_3.splice(index, 1)
                this.starTime_3.splice(index, 1)
                this.endTime_3.splice(index, 1)
            },

            peniconclick_4: function () {
                this.setquantum_4 = true
                this.quantum_4 = false
                this.haverest_4 = false
            },
            ischeck_4: function () {
                if (this.Wed == true) {
                    this.quantum_4 = true
                    this.haverest_4 = false
                    this.setquantum_4 = false
                } else {
                    this.quantum_4 = false
                    this.haverest_4 = true
                    this.setquantum_4 = false
                }
            },
            add_4() {
                this.items_4.push('')
            },
            remove_4: function (index) {
                this.items_4.splice(index, 1)
                this.starTime_4.splice(index, 1)
                this.endTime_4.splice(index, 1)
            },

            peniconclick_5: function () {
                this.setquantum_5 = true
                this.quantum_5 = false
                this.haverest_5 = false
            },
            ischeck_5: function () {
                if (this.Thu == true) {
                    this.quantum_5 = true
                    this.haverest_5 = false
                    this.setquantum_5 = false
                } else {
                    this.quantum_5 = false
                    this.haverest_5 = true
                    this.setquantum_5 = false
                }
            },
            add_5() {
                this.items_5.push('')
            },
            remove_5: function (index) {
                this.items_5.splice(index, 1)
                this.starTime_5.splice(index, 1)
                this.endTime_5.splice(index, 1)
            },

            peniconclick_6: function () {
                this.setquantum_6 = true
                this.quantum_6 = false
                this.haverest_6 = false
            },
            ischeck_6: function () {
                if (this.Fri == true) {
                    this.quantum_6 = true
                    this.haverest_6 = false
                    this.setquantum_6 = false
                } else {
                    this.quantum_6 = false
                    this.haverest_6 = true
                    this.setquantum_6 = false
                }
            },
            add_6() {
                this.items_6.push('')
            },
            remove_6: function (index) {
                this.items_6.splice(index, 1)
                this.starTime_6.splice(index, 1)
                this.endTime_6.splice(index, 1)
            },

            peniconclick_7: function () {
                this.setquantum_7 = true
                this.quantum_7 = false
                this.haverest_7 = false
            },
            ischeck_7: function () {
                if (this.Sat == true) {
                    this.quantum_7 = true
                    this.haverest_7 = false
                    this.setquantum_7 = false
                } else {
                    this.quantum_7 = false
                    this.haverest_7 = true
                    this.setquantum_7 = false
                }
            },
            add_7() {
                this.items_7.push('')
            },
            remove_7: function (index) {
                this.items_7.splice(index, 1)
                this.starTime_7.splice(index, 1)
                this.endTime_7.splice(index, 1)
            },

            peniconclick_8: function () {
                this.setquantum_8 = true
                this.quantum_8 = false
                this.haverest_8 = false
            },
            ischeck_8: function () {
                if (this.Sun == true) {
                    this.quantum_8 = true
                    this.haverest_8 = false
                    this.setquantum_8 = false
                } else {
                    this.quantum_8 = false
                    this.haverest_8 = true
                    this.setquantum_8 = false
                }
            },
            add_8() {
                this.items_8.push('')
            },
            remove_8: function (index) {
                this.items_8.splice(index, 1)
                this.starTime_8.splice(index, 1)
                this.endTime_8.splice(index, 1)
            },



            // 每天设置点击按钮
            dailySetclick: function () {
                this.dailySet = true
            },
            dailySetcancle: function () {
                this.dailySet = false
            },
            highSet: function () {
                this.ModalsBox = true
            },
            cancle: function () {
                this.ModalsBox = false
            },
            // 固定排班高级设置下 单选 选择考勤类型
            singles: function (event) {
                var el = event.currentTarget;
                var radioId = el.getAttribute("name")
                $('.radioGroups label').removeAttr('class') && el.setAttribute("class", "checked")
                $('.radioGroups input[type = "radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked')
            },
            // 添加全局时段
            add() {
                this.items.push('')
            },
            // 删除全局时段
            remove: function (index) {
                this.items.splice(index, 1)
                this.starTime.splice(index, 1)
                this.endTime.splice(index, 1)
            },
            // 固定排班高级设置 添加时段
            add_1() {
                this.items_1.push('')
            },
            mapqx(){
            	this.attendanceMap=false
            },
            addWifi(){
            	this.addAttendanceWifiBox=true
            },
            abolishWifi(){
            	this.addAttendanceWifiBox=false
            },
            // 高级设置 删除时段
            remove_1(index){
                this.items_1.splice(index, 1)
                this.starTime_1.splice(index, 1)
                this.endTime_1.splice(index, 1)
            },
            attendanceGroup() {
                this.attendanceMap = true
            },
            backoutclick:function(){
                this.$router.push({
                 path:'/home/attendance/attendanceMan'
                })
            },
        }
    }

</script>
<!--私有样式-->
<style scoped>
    .main_rightTop p {
        color: #303030;
        font-size: 14px;
        padding-top: 24px;
        padding-bottom: 12px;
        margin-left: 44px;
        width: calc(100% - 88px);
        border-bottom: 1px solid #d9d9d9;
    }
    
    .main_rightTop {
        width: 100%;
    }
    
    .main_rightMain {
        margin-left: 44px;
    }
    
    .inputText {
        width: 260px;
    }
    
    .main_rightMain>div:nth-child(1),
    .main_rightMain>div:nth-child(2) {
        margin-top: 24px;
        margin-left: 109px;
        overflow: hidden;
    }
    
    .paibanradio>div {
        margin-top: 24px;
        margin-left: 109px;
        overflow: hidden;
    }
    
    .radio_origin {
        opacity: 0;
        z-index: -1;
        position: absolute;
    }
    
    .radio_inner {
        margin-top: 3px;
        float: left;
        width: 14px;
        height: 14px;
        background: url('/static/img/Slice.png') no-repeat -118px -113px;
    }
    
    label.checked .radio_inner {
        background-position: -98px -113px;
    }
    
    .radio_input {
        white-space: nowrap;
        cursor: pointer;
        outline: 0;
        float: left;
        margin-top: 3px;
    }
    
    .radio_label {
        margin-left: 4px;
        font-weight: normal;
    }
    
    .radioGroup {
        float: left;
        margin-left: 10px;
    }
    
    .selectBox,
    .DatetimeBox {
        float: left;
        width: 99px!important;
        height: 32px;
        overflow: hidden;
        position: relative;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
    }
    
    .selectBox {
        width: 76px!important;
        height: 25px!important;
        /*height: 20px;*/
    }
    
    .selectBox .el-select {
        width: 90px;
        margin-left: -7px;
        margin-top: -6px;
    }
    
    .DatetimeBox .el-date-editor.el-date-editor {
        width: 102px;
        margin-left: -2px;
        margin-top: -3px;
    }
    
    .globalTime {
        float: left;
    }
    
    .setquantum li,
    .punch li,
    .globalTime li {
        margin-bottom: 10px;
    }
    
    .addbox {
        cursor: pointer;
        width: 20px;
        height: 20px;
        float: left;
        margin-top: 8px;
        margin-left: 12px;
        background: url('/static/img/Slice.png') no-repeat -171px -154px;
    }
    
    .removebox {
        cursor: pointer;
        width: 20px;
        height: 20px;
        float: left;
        margin-top: 8px;
        margin-left: 12px;
        background: url('/static/img/Slice.png') no-repeat -201px -154px;
    }
    
    .dailyicon {
        float: left;
        width: 20px;
        height: 20px;
        margin-left: 16px;
        background: url('/static/img/Slice.png') no-repeat -141px -154px;
        cursor: pointer;
    }
    
    .dailyHours>div {
        overflow: hidden;
        margin-left: 70px;
        margin-bottom: 10px;
    }
    
    .advanceSet>div {
        overflow: hidden;
        margin-bottom: 10px;
    }
    
    .grayfont {
        color: #8F8E94;
        font-size: 12px;
    }
    
    .attendance>div {
        margin-top: 10px;
    }
    
    .wifiAtt ul li,
    .locationAtt ul li {
        overflow: hidden;
        margin-left: 100px;
        width: 362px;
        margin-top: 10px;
    }
    
    .wifiAtt ul li span {
        float: left;
        width: 82px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .wifiAtt ul li span:nth-child(3) {
        width: 120px;
    }
    
    .deletelocation {
        cursor: pointer;
        float: right;
        width: 20px;
        height: 20px;
        background: url('/static/img/Slice.png') no-repeat -204px -111px;
    }
    
    .addlocation {
        cursor: pointer;
        float: left;
        width: 20px;
        height: 20px;
        background: url('/static/img/Slice.png') no-repeat -115px -152px;
    }
    
    .baocun {
        width: 80px;
        height: 35px;
        color: #fff;
        font-size: 16px;
        background: #E7744A;
        line-height: 35px;
    }
    
    .quxiao {
        width: 80px;
        height: 35px;
        color: #fff;
        font-size: 16px;
        background: #aeaeae;
        line-height: 35px;
    }
    /*固定排班高级设置样式*/
    
    .modalsBot {
        height: 532px;
        padding: 20px 30px;
        overflow: hidden;
        overflow-y: scroll;
        padding-bottom: 0;
    }
    
    .Modals {
        height: 692px;
        width: 600px;
    }
    
    .modalfoot {
        text-align: center;
        padding: 32px;
        background: #fff;
    }
    
    .chunk {
        margin-bottom: 20px;
        border-bottom: 1px solid #f2f2f2;
    }
    
    .punch {
        width: 375px;
        margin: 0 auto;
        overflow: hidden;
        margin-bottom: 6px;
        line-height: 25px;
    }
    
    .punch>span {
        float: left;
    }
    
    .punch .selectBox {
        float: right;
    }
    
    .delicon {
        float: left;
        width: 40px;
        height: 23px;
        background: url('/static/img/Slice.png') no-repeat -431px -9px;
        margin-left: 5px;
    }
    
    .datetimeBox {
        float: left;
        width: 140px!important;
        height: 36px;
        overflow: hidden;
        position: relative;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
    }
    
    .datetimeBox .el-date-editor.el-input {
        width: 143px;
        margin-left: -2px;
        margin-top: -1px;
    }
    
    .radioGroups {
        overflow: hidden;
        /*height: 25px;
        line-height: 25px;*/
    }
    /*地图弹出框*/
    .attendanceMapbox{
    	position: fixed;
    	left: 0;
    	top: 0;
    	width: 100%;
    	height: 100%;
    	background-color:rgba(255,255,255,0.1);   
    	animation: mapan .8s linear;	
    }
    @keyframes mapan{
    	from{
    		transform: translateY(-100px);
    		opacity: 0;
    	}
    	to{
    		transform: translateY(0);
    		opacity: 1;
    	}
    }
    .addMap{
    	width: 100%;
    	height: 60px;
    	background-color:#E7744A;
    	text-align: center;
    	line-height: 60px;
    	color:#FFF;
    	font-size:16px;
    }
    .attendanceMap input{
    	width: 260px;
    	height:36px;
    	border:1px solid #E7744A;
    	border-radius: 4px;
    	margin-top: 20px;
    	margin-left: 8px;
    	padding-left:12px;
    }
    #addTitle{
    	margin-left: 32px;
    }
    #allmap{
    	margin-top: 10px;
    	margin-left: 32px;
    }
    .mapButton{
    	width: 100%;
    	height: auto;
    	margin-top: 20px;
    }
    .mapButton div{
    	display: inline-block;
    	float: right;
    	width: 80px;
    	height: 40px;
    	text-align: center;
    	line-height: 40px;
    	border-radius: 4px;
    	color: #FFF;
    	cursor: pointer;
    }
    .mapqx{
    	margin-right: 32px;
    	background-color: #AEAEAE;
    }
    .mapqd{
    	margin-right: 46px;
    	background-color: #E7744A;
    }
    /*添加WIFI弹出框*/
    .addAttendanceWifi{
    	width: 600px;
    	height: 368px;    	
    }
    .addAttendanceWifiTop{
    	width: 100%;
    	height: 68px;
    	background-color:#E7744A;
    	text-align: center;
    	line-height: 68px;
    	font-size:16px;
    	color: #FFF;
    }
    .addAttendanceWifiBot{
    	width: 100%;
    	height: 300px;
    	background-color:#FFF;
    }
    .addAttendanceWifiBot div input{
    	width: 260px;
    	height: 36px;
    	border: 1px solid #FCB298;
    	border-radius: 4px;
    	padding-left: 12px;
    	margin-left: 10px;
    }
    .addAttendanceWifiBot div{
        padding-top: 24px;
        text-align: center;
    }
    #saveWIFI,
    #abolishWIFI{
       width: 80px;
       height: 34px;
       border-radius:4px;
       text-align: center;
       line-height: 34px;
       color:#FFF;
       display: inline-block;
       margin-top: 34px;
       cursor: pointer;
    }
    #saveWIFI{
    	background-color:#E7744A;
    }
    #abolishWIFI{
    	background-color:#AEAEAE;
    	margin-left: 40px;
    }
    .addicon {
        width: 20px;
        height: 24px;
        float: left;
        background: url('/static/img/Slice.png') no-repeat -86px -151px;
        margin-left: 151px;
    }
    /*添加地图样式*/
    
    
    .attendanceMap {
        width: 600px;
        height: 552px;
        background-color: #FFF;
        margin: auto auto;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border-radius: 4px;
        box-shadow: 0 5px 14px rgba(0, 0, 0, 0.15);
    } 
    .attendanceMap input {
        width: 260px;
        height: 36px;
        border: 1px solid #E7744A;
        border-radius: 4px;
        margin-top: 20px;
        margin-left: 8px;
        padding-left: 12px;
    }
    
    #addTitle {
        margin-left: 32px;
    }
    
    #allmap {
        margin-top: 10px;
        margin-left: 32px;
    }
    
    .mapButton {
        width: 100%;
        height: auto;
        margin-top: 20px;
    }
    
    .mapButton div {
        display: inline-block;
        float: right;
        width: 80px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 4px;
        color: #FFF;
        cursor: pointer;
    }
    /*每天考勤时段设置*/
    
    .dailySetModal {
        height: 490px;
    }
    
    .dailySetmodalsBot {
        height: 339px;
        padding: 20px 110px 0 110px;
    }
    
    .el-checkbox {
        float: left;
    }
    
    .timepart {
        float: left;
        margin-left: 12px;
        width: 300px;
    }
    
    .penicon {
        cursor: pointer;
        width: 20px;
        height: 20px;
        float: right;
        background: url('/static/img/Slice.png') no-repeat -141px -154px;
        margin-left: 16px;
    }
    
    .week {
        overflow: hidden;
        margin-bottom: 24px;
    }
    /*设置成功弹出层*/
    
    .setSuccess {
        width: 540px;
        height: 340px;
        border-radius: 4px;
        background-color: #FFF;
        margin: 240px auto;
        box-shadow: 0 2px 14px rgba(0, 0, 0, 0.15);
        animation: remove .8s;
    }
    
    @keyframes remove {
        from {
            transform: translateY(-100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .setSuccess {
        padding-top: 112px;
    }
    
    .setSuccess div:nth-child(1) {
        margin-left: 162px;
        margin-bottom: 72px;
        color: #303030;
        font-size: 18px;
    }
    
    .setSuccess div:nth-child(2) {
        text-align: center;
    }
    
    .setSuccess div:nth-child(2) input {
        width: 138px;
        height: 34px;
        line-height: 34px;
        color: #fff;
        font-size: 16px;
        background: #fcb298;
    }
    .chunks{
        border-bottom: none;
    }
    .backout{
        cursor: pointer;
        float: left;
        width: 20px;
        height: 20px;
        background: url('/static/img/Slice.png') no-repeat -3px -153px;
    }
    /*label{
        margin-top: 2px;
        margin-bottom: 0px!important;
    }*/
</style>
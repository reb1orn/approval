<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="monthTop">
            日志列表
        </div>
        <div class="monthCen" style="padding-top: 20px;">
            <span style="float: left;line-height: 32px;">选择时间：</span>
            <div class="DatetimeBox" style="margin-left: 0px;">
                <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
                </el-date-picker>
            </div>
            <span style="float: left;line-height: 32px;margin: 0 5px;color: #E7744A;">———</span>
            <div class="DatetimeBox">
                <el-date-picker v-model="value2" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
                </el-date-picker>
            </div>
            <div class="staffSearch">
                <span>发送人：</span>
                <input type="text" placeholder="选择部门，人员" @focus='selectMembers' />
            </div>
        </div>
        <div class="monthCen">
            <span style="float: left;line-height: 32px;">选择类型：</span>
            <div class="selectBox">
                <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="monthCen">
            <span class="filtrate" @click="query()">查询</span>
            <span class="filtrate" @click="del()">删除</span>
            <span class="filtrate">导出</span>
        </div>
        <div class="monthBot">
            <div class="fixedTable">
                <ul class="biaoge">
                    <li class="bgfirstli">
                        <div>
                            <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        </div>
                        <div>发送人</div>
                        <div>发送时间</div>
                        <div>日志类型</div>
                    </li>
                    <li class="normalli" v-for="(item,index) in items">
                        <div>
                            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                <el-checkbox :label="index" :key="item.name">{{dsa}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div>{{item.name}}</div>
                        <div>{{item.date}}</div>
                        <div>{{item.logType}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <!--<div class="pagination">
            <el-pagination small layout="prev, pager, next" :total="50">
            </el-pagination>
        </div>-->
        <popup-box v-show='Modals' @abolishmem='abolishmem'></popup-box>
        <!--确认输出弹出框-->
        <div class="ModalsBox" v-show="isdelete">
            <div class="Modals">
                <div class="modaltitle">确认删除？</div>
                <div class="modalcontent">
                    <p>这些将被删除，删除后不可恢复！</p>
                    <div class="btnBox">
                        <input type="button" value="删除" @click='deleteSure'>
                        <input type="button" value="取消" @click="cancle">
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    // const cityOptions = ['王力', '王红'];
    import {
        mapActions
    } from 'vuex';
    import popupBox from '../../pop-upBox' //这里引入全局组件
    export default {
        components: { popupBox },//这里注册全局组件
        name: 'set',
        data() {
            return {
                pickerOptions0: {
                    disabledDate(time) {
                        // console.log(Date.now() - 8.64e7)
                        return Date.now() < time.getTime();
                    }
                },
                isdelete: false,
                cityOptions: [0, 1],
                dsa: '',
                items: [{
                    name: '王力',
                    date: '2017-05-21',
                    logType: '日报'
                },
                {
                    name: '王红',
                    date: '2017-05-21',
                    logType: '日报'
                },
                ],
                checkedCities: [],
                checkAll: false,
                value1: '',
                value2: '',
                Modals: false,
                tableData3: [],
                options: [{
                    value: '1',
                    label: '日报'
                }, {
                    value: '2',
                    label: '周报'
                }, {
                    value: '3',
                    label: '月报'
                }],
                value: '1',
                flag: '',

            }
        },

        created: function () {

        },
        watch: {

        },
        methods: {
            query() {
                // console.log(this.value1)
                // console.log(this.value2)
                // console.log(this.value2 - this.value1)
                if (this.value1 > this.value2) {
                    this.$message("开始时间不可以大于结束时间");
                    return
                }else if((this.value2 - this.value1) > 86400000 * 30){
                    this.$message("查询时间间隔不能大于一个月");
                    return
                }
                
            },
            cancle() {
                this.isdelete = false
            },
            selectMembers() {
                this.Modals = true
            },
            abolishmem() {
                this.Modals = false
            },
            handleCheckedCitiesChange(value) {
                // console.log(this.checkedCities)
                let checkedCount = value.length
                this.checkAll = checkedCount === this.cityOptions.length;
            },
            handleCheckAllChange(event) {
                this.checkedCities = event.target.checked ? this.cityOptions : [];
                // console.log(this.checkedCities, '12')

            },
            ascOrder(x, y) {
                if (x > y) {
                    return 1;
                }
                else {
                    return -1;
                }
            },
            deleteSure() {
                var self = this
                self.checkedCities.sort(self.ascOrder) //按照从小到大排列
                console.log(self.checkedCities)
                for (var i = self.checkedCities.length - 1; i >= 0; i--) {
                    console.log(self.checkedCities[i])
                    self.items.splice(self.checkedCities[i], 1)
                    self.checkedCities.splice(i, 1)
                    if (self.checkedCities.length == 0) {
                        self.checkAll = false
                    }
                }
                self.isdelete = false
                return self.items

            },
            del() {
                // console.log(this.checkedCities)
                if (this.checkedCities.length == 0) {
                    this.$message('请选择人员！')
                } else {
                    this.isdelete = true
                }



            }
        }
    }

</script>
<style scoped>
    /*弹窗*/
    
    .Modals {
        background: #fff;
        height: 257px;
    }
    
    .modaltitle {
        height: 64px;
        line-height: 64px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        background: #E7744A;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    
    .modalcontent p {
        text-align: center;
        margin-top: 52px;
        margin-bottom: 48px;
    }
    
    .btnBox {
        text-align: center;
    }
    
    .btnBox input {
        width: 80px;
        height: 34px;
        line-height: 34px;
        background: #aeaeae;
        font-size: 16px;
        color: #fff;
    }
    
    .btnBox input:nth-child(1) {
        margin-right: 23px;
        background: #E7744A;
    }
    
    .btnBox input:nth-child(2) {
        margin-left: 23px;
    }
    /*表格*/
    
    .biaoge {
        width: 100%;
    }
    
    .biaoge>li {
        /*height: 56px;*/
    }
    
    .biaoge>li>div {
        height: 100%;
        text-align: center;
        display: inline-block;
    }
    
    .biaoge>li>div:nth-child(1),
    .biaoge>li>div:nth-child(4) {
        width: 125px;
    }
    
    .biaoge>li>div:nth-child(2) {
        width: 232px;
    }
    
    .biaoge>li>div:nth-child(3) {
        width: 220px;
    }
    
    .bgfirstli {
        height: 48px;
        line-height: 48px;
        background: #f4f4f6;
    }
    
    .normalli {
        height: 55px;
        line-height: 55px;
        border-bottom: 1px solid #f4f4f6;
    }
    
    .normalli label {
        margin-left: -29px;
    }
    
    .DatetimeBox {
        float: left;
        width: 120px!important;
        height: 32px;
        overflow: hidden;
        position: relative;
        border: 1px solid #E7744A;
        border-radius: 4px;
    }
    
    .DatetimeBox .el-date-editor.el-date-editor {
        width: 123px;
        margin-left: -2px;
        margin-top: -3px;
    }
    
    .selectBox {
        width: 120px!important;
        height: 32px;
        overflow: hidden;
        position: relative;
        border: 1px solid #E7744A;
        border-radius: 4px;
    }
    
    .selectBox .el-select {
        width: 123px;
        margin-left: -2px;
        margin-top: -3px;
    }
    
    .pagination {
        float: right;
        margin-right: 20px;
    }
    
    .monthTop {
        width: calc(100%-88px);
        height: auto;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        margin-left: 44px;
        margin-right: 44px;
        padding-top: 20px;
        padding-bottom: 12px;
        color: #303030;
        font-size: 14px;
    }
    
    .monthCen {
        width: calc(100%-88px);
        height: auto;
        margin-left: 44px;
        margin-right: 44px;
        padding-bottom: 26px;
        color: #303030;
        font-size: 14px;
        overflow: hidden;
    }
    
    .staffSearch {
        display: inline-block;
        width: auto;
        float: right;
        margin-top: 0;
    }
    
    .staffSearch input {
        border: 1px solid #E7744A;
        width: 200px;
        height: 32px;
        padding-left: 12px;
    }
    
    .filtrate {
        float: right;
        width: 96px;
        height: 27px;
        border: 1px solid #E7744A;
        border-radius: 4px;
        color: #E7744A;
        text-align: center;
        line-height: 27px;
        font-size: 14px;
        cursor: pointer;
        margin-left: 26px;
    }
    
    .monthBot {
        width: calc(100%-88px);
        height: auto;
        margin-left: 44px;
        margin-right: 44px;
    }
    
    .fixedTable {
        width: calc(100%-88px);
    }
</style>
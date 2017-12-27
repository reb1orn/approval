<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="monthTop">
            签到列表
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
            <span class="filtrate">导出</span>
            <span class="filtrate" @click="query()">查询</span>
        </div>
        <div class="monthBot">
            <div class="fixedTable" id="freezing" style="overflow:scroll;width: 715px;height: 200px;" @scroll="freezing">
                <ul class="biaoge">
                    <li class="bgfirstli">
                        <div style="background: #f0f0f0;"><span>姓名</span></div>
                        <div style="background: #f0f0f0;"><span>部门</span></div>
                        <div style="background: #f0f0f0;"><span>职位</span></div>
                        <div>
                            <span>6月05</span><br>
                            <span>周一</span>
                        </div>
                        <div>
                            <span>6月06</span><br>
                            <span>周二</span>
                        </div>
                        <div>
                            <span>6月07</span><br>
                            <span>周三</span>
                        </div>
                        <div>
                            <span>6月08</span><br>
                            <span>周四</span>
                        </div>
                        <div>
                            <span>6月09</span><br>
                            <span>周五</span>
                        </div>
                        <div>
                            <span>6月10</span><br>
                            <span>周六</span>
                        </div>
                    </li>
                    <div class="clear"></div>
                    <li class="normalli" v-for="item in tableDatas">
                        <div><span>{{item.name}}</span></div>
                        <div><span>{{item.department}}</span></div>
                        <div><span>{{item.position}}</span></div>
                        <div v-for="item in (item.signNumber)" v-show="item !== '0'"  @click="signNum" style="color:#E7744A;cursor: pointer;" >
                            <span>{{item}}</span>
                        </div>
                        <div v-for="item in (item.signNumber)" v-show="item == '0'">
                            <span>0</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--<div class="pagination">
            <el-pagination small layout="prev, pager, next" :total="50">
            </el-pagination>
        </div>-->
        <popup-box v-show='Modals' @abolishmem='abolishmem'></popup-box>
        <!--签到详情弹窗-->
        <div class="ModalsBox" v-show="issignDetail">
            <div class="Modals">
                <div class="modaltitle">签到详情</div>
                <div class="modalcontent">
                    <div style="height:50px;line-height:50px;border-bottom: 1px solid #ccc;"><span>张静</span><span style="margin-left: 16px;">2017-06-05</span></div>
                    <div style="margin-bottom: 20px;" v-for="item in signs">
                        <p class="grayp"><span>{{item.time}}</span><span style="margin-left: 12px;">{{item.site}}</span></p>
                        <p class="grayp"><span>备注：</span><span style="margin-left: 15px;">{{item.remark}}</span></p>
                        <ul class="imgul">
                            <li v-for="item in (item.imgs)"><img :src="item" alt="" style="width: 56px;height: 56px;"></li>
                        </ul>
                    </div>
                </div>
                <div class="btnBox"><input type="button" value="关闭" @click="cancle"></div>
            </div>
            
        </div>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex';
    import popupBox from '../../pop-upBox' //这里引入全局组件
    export default {
        components: { popupBox },//这里注册全局组件
        name: 'set',
        data() {
            return {
                signs:[
                    {
                        time:'10:30:29',
                        site:'陕西运璟网络科技有限公司',
                        remark:'考察',
                        imgs: [
                    '/static/img/1.jpg',
                    '/static/img/1.jpg',
                    '/static/img/1.jpg',
                    '/static/img/1.jpg',
                    '/static/img/1.jpg'
                ]
                    },
                    {
                        time:'10:30:29',
                        site:'陕西运璟网络科技有限公司',
                        remark:'考察',
                        imgs: [
                    '/static/img/1.jpg',
                    '/static/img/1.jpg',
                    '/static/img/1.jpg',
                    '/static/img/1.jpg',
                    '/static/img/1.jpg'
                ]
                    },
                ],
                issignDetail: false,
                pickerOptions0: {
                    disabledDate(time) {
                        // console.log(Date.now() - 8.64e7)
                        return Date.now() < time.getTime();
                    }
                },
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
                tableDatas: [{
                    name:'张静',
                    department:'事业一部',
                    position:'大数据销售',
                    signNumber:['1','2','3','0']
                },
                {
                    name:'王小白',
                    department:'事业一部',
                    position:'大数据销售',
                    signNumber:['5','2','3','0']
                },
                {
                    name:'齐一',
                    department:'事业一部',
                    position:'大数据销售',
                    signNumber:['1','6','3','0']
                },
                {
                    name:'赵开',
                    department:'事业一部',
                    position:'大数据销售',
                    signNumber:['1','0','3','0']
                }],
                

            }
        },

        created: function () {

        },
        watch: {

        },
        methods: {
            // 表格循环数据   查询按钮验证  签到次数字体变红 （循环便利）
            signNum(){
                this.issignDetail = true
            },
            cancle() {
                this.issignDetail = false
            },
            query() {
                if(this.value1 == null || this.value1 == '' || this.value2 == null || this.value2 == ''){
                    this.$message("请选择查询时间");
                    return
                }else if (this.value1 > this.value2) {
                    this.$message("开始时间不可以大于结束时间");
                    return
                } else if ((this.value2 - this.value1) > 86400000 * 30) {
                    this.$message("查询时间间隔不能大于一个月");
                    return
                }

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
            freezing() {
                $("#freezing .biaoge li>div:first-child").css("left", $("#freezing").scrollLeft());
                $("#freezing .biaoge li>div:nth-child(2)").css("left", $("#freezing").scrollLeft());
                $("#freezing .biaoge li>div:nth-child(3)").css("left", $("#freezing").scrollLeft());
                $('#freezing .bgfirstli').css('top', $("#freezing").scrollTop())
            },
        }
    }

</script>
<style scoped>
    /*弹窗*/
    
    .Modals {
        width: 330px;
        height: 581px;
        background: #fff;
    }
    
    .modaltitle {
        height: 64px;
        line-height: 64px;
        font-size: 16px;
        text-align: center;
        box-shadow: 0 2px 5px #ccc;
    }
    
    .modalcontent {
        padding: 0 44px;
    }
    
    .grayp {
        margin: 5px 0;
        color: #a1a0a5;
    }
    
    .imgul li {
        display: inline-block;
        margin-right: 12px;
        margin-top: 5px;
    }
    .modalcontent{
        height: 446px;overflow-y: auto;
    }
    .btnBox{
        text-align: center;margin-top: 16px;
    }
    .btnBox input {
        width: 80px;
        height: 34px;
        line-height: 34px;
        background: #E7744A;
        font-size: 16px;
        color: #fff;
    }
    /*表格*/
    
    .biaoge {
        width: 1544px;
    }
    
    .biaoge>li {
        height: 56px;
    }
    
    .biaoge>li>div {
        width: 59px;
        border-right: 1px solid #e5e5e5;
        position: relative;
        vertical-align: middle;
        display: table-cell;
        text-align: center;
        word-wrap: break-word;
        word-break: break-all;
        border-bottom: 1px solid #e5e5e5;
    }
    
    .biaoge li>div:nth-child(2),
    .biaoge li>div:nth-child(3) {
        width: 84px;
        z-index: 66;
    }
    
    .normalli,
    .bgfirstli {
        display: table;
    }
    
    .normalli div:nth-child(2),
    .normalli div:nth-child(3) {
        background: #fff;
    }
    
    .normalli div {
        height: 50px;
        padding: 2px;
    }
    
    .biaoge li>div:nth-child(1) {
        background: white;
        z-index: 3;
    }
    
    .bgfirstli {
        z-index: 88;
        position: relative;
        background: #f0f0f0!important;
    }
    
    .bgfirstli>div {
        height: 59px;
    }
    
    .bgfirstli>div span {
        line-height: 26px;
    }
    
    #freezing {
        border: solid 1px #e5e5e5;
    }
    
    .zhoumo {
        color: #Fcb298;
        font-size: 14px;
    }
    
    .xiujia {
        color: #Fcb298;
        font-size: 12px;
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
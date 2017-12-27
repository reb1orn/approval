<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="monthTop">
            <a href="javascript:;"><img src="/static/img/Shape.png" @click='back' /></a>
            打卡时间
        </div>
        <div class="monthCen">
            <span style="float: left;line-height: 32px;">时间：</span>
            <div class="DatetimeBox" style="margin-left: 0px;">
                <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                </el-date-picker>
            </div>
            <span style="float: left;line-height: 32px;margin: 0 5px;color: #E7744A;">———</span>
            <div class="DatetimeBox">
                <el-date-picker v-model="value2" type="date" placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="staffSearch">
                <input type="text" placeholder="选择部门，人员" @focus='selectMembers' />
                <div class="filtrate">筛选</div>
            </div>
        </div>
        <div class="monthBot">
            <div class="daoTable">导出打卡时间表</div>
            <div class="fixedTable" id="freezing">
                <ul class="biaoge">
                    <li class="bgfirstli">
                        <div><span>姓名</span></div>
                        <div><span>部门</span></div>
                        <div><span>考勤时间</span></div>
                        <div><span>打卡时间</span></div>
                        <div><span>打卡结果</span></div>
                        <div><span>打卡地址</span></div>
                        <div><span>打卡备注</span></div>
                        <div><span>打卡图片</span></div>
                        <div><span>打卡设备</span></div>
                    </li>
                    <li class="normalli">
                        <div><span>张静</span></div>
                        <div><span>事业一部</span></div>
                        <div><span>2017-05-01 周一 09:00</span></div>
                        <div><span>2017-05-01 周一 09:00</span></div>
                        <div><span>正常</span></div>
                        <div><span>YUJING_Ap 14:19:26:27:24:11</span></div>
                        <div><span>堵车</span></div>
                        <div @click="imgClick"><img :src="smallimg" alt="" style="width: 56px;height: 38px;"></div>
                        <div><span>手机UDID</span></div>
                    </li>
                    <li class="normalli">
                        <div><span>王小白</span></div>
                        <div><span>事业二部</span></div>
                        <div><span>2017-05-01 周一 09:00</span></div>
                        <div><span>2017-05-01 周一 09:00</span></div>
                        <div><span>正常</span></div>
                        <div><span>YUJING_Ap 14:19:26:27:24:11</span></div>
                        <div><span>堵车</span></div>
                        <div><img src="/static/img/daka.png" alt="" style="width: 56px;height: 38px;"></div>
                        <div><span>手机UDID</span></div>
                    </li>
                    <li class="normalli">
                        <div><span>齐一</span></div>
                        <div><span>事业三部</span></div>
                        <div><span>2017-05-01 周一 09:00</span></div>
                        <div><span>2017-05-01 周一 09:00</span></div>
                        <div><span>正常</span></div>
                        <div><span>YUJING_Ap 14:19:26:27:24:11</span></div>
                        <div><span>堵车</span></div>
                        <div><img src="/static/img/daka.png" alt="" style="width: 56px;height: 38px;"></div>
                        <div><span>手机UDID</span></div>
                    </li>
                    <li class="normalli">
                        <div><span>赵开</span></div>
                        <div><span>事业三部</span></div>
                        <div><span>2017-05-01 周一 09:00</span></div>
                        <div><span>2017-05-01 周一 09:00</span></div>
                        <div><span>正常</span></div>
                        <div><span>YUJING_Ap 14:19:26:27:24:11</span></div>
                        <div><span>堵车</span></div>
                        <div><img src="/static/img/daka.png" alt="" style="width: 56px;height: 38px;"></div>
                        <div><span>手机UDID</span></div>
                    </li>
                </ul>
            </div>
        </div>
        <!--大图片-->
        <div class="ModalsBox" v-show="showimg" @click="hiddenimg">
            <div class="imgbox" style="background: #fff;">
                <img :src="bigimg" alt="">
            </div>

        </div>
        <div class="pagination">
            <el-pagination small layout="prev, pager, next" :total="50">
            </el-pagination>
        </div>
        <popup-box v-show='Modals' @abolishmem='abolishmem'></popup-box>
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
                value1: '',
                value2: '',
                Modals: false,
                tableData3: [],
                showimg:false,
                smallimg:'/static/img/1.jpg',
                bigimg:''

            }
        },

        created: function () {

        },
        watch: {

        },
        methods: {
            selectMembers() {
                this.Modals = true
            },
            abolishmem() {
                this.Modals = false
            },
            back() {
                console.log(0)
            },
            imgClick(){
                this.showimg = true
                this.bigimg = this.smallimg
            },
            hiddenimg(){
                this.showimg = false
            }
        }
    }

</script>
<style scoped>
/*表格*/
    .biaoge{
        /*width: 800px;*/
    }
    .biaoge>li>div {
        border-right: 1px solid #e5e5e5;
        text-align: center;
         position: relative;
        vertical-align: middle;
        display: table-cell;
        text-align: center;
        word-wrap: break-word;
        word-break: break-all;
        border-bottom: 1px solid #e5e5e5;
    }    
    .biaoge{
        display: table;
    }
    .normalli>div{
       height: 48px;
       font-size: 12px;
    }
    
    .biaoge li>div:nth-child(1) {
        width: 56px;
    }
    .biaoge li>div:nth-child(2) {
        width: 96px;
    }
     .biaoge li>div:nth-child(3) {
        width: 105px;
    }
     .biaoge li>div:nth-child(4) {
        width: 105px;
    }
     .biaoge li>div:nth-child(5) {
        width: 64px;
    }
     .biaoge li>div:nth-child(6) {
        width: 96px;
    }
     .biaoge li>div:nth-child(7) {
        width: 64px;
    }
     .biaoge li>div:nth-child(8) {
        width: 64px;cursor: pointer;
    }
    .biaoge li>div:nth-child(9) {
        width: 82px;
    }
    .bgfirstli>div{
        height: 58px;
    }
    .bgfirstli {
        background: #f0f0f0;
    }
    
    /*.bgfirstli {
        z-index: 88;
        position: relative;
        background: #f0f0f0!important;
    }
    
    .bgfirstli>div span{
        line-height: 28px;
    }*/
     
    #freezing{
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
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        margin-left: 44px;
        margin-right: 44px;
        padding-top: 20px;
        padding-bottom: 20px;
        color: #303030;
        font-size: 14px;
        overflow: hidden;
    }
    
    .staffSearch {
        display: inline-block;
        width: auto;
        float: right;
        margin-top: 0;
        margin-right: 15px;
    }
    
    .staffSearch input {
        border: 1px solid #E7744A;
        width: 200px;
        height: 32px;
        padding-left: 12px;
    }
    
    .filtrate {
        display: inline-block;
        width: 48px;
        height: 22px;
        border: 1px solid #E7744A;
        border-radius: 4px;
        color: #E7744A;
        text-align: center;
        line-height: 22px;
        font-size: 12px;
        cursor: pointer;
        margin-left: 16px;
    }
    
    .monthBot {
        width: calc(100%-88px);
        height: auto;
        margin-top: 24px;
        margin-left: 44px;
        margin-right: 44px;
    }
    
    .daoTable {
        width: 122px;
        height: 30px;
        border: 1px solid #E7744A;
        border-radius: 4px;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        color: #E7744A;
        cursor: pointer;
    }
    
    .fixedTable {
        width: 734px;
        height: auto;
        margin-top: 10px;
    }
    .imgbox{
        width: 600px;height: 420px;
        box-shadow: 0px 5px 17px #ccc;
        position: absolute;
    top: 0px;
    bottom: 0;
    margin: auto;
    left: 39%;
    }
    .imgbox img{
        width: 580px;height: 400px;
        margin-left: 10px;
        margin-top: 10px;
    }
</style>
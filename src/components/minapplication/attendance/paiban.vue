<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="main_rightTop">
            <p>
                <span class="backout" @click="backoutclick"></span>
                <span style="margin-left: 5px;">编辑排班</span>
            </p>
        </div>
        <div class="main_rightMain">
            <div style="margin-top: 20px;overflow: hidden;">
                <div class="datepeople">
                    <div class="block">
                        <el-date-picker :editable='false' clearable v-model="month" type="month" placeholder="选择月">
                        </el-date-picker>
                    </div>
                    <input type="text" placeholder="选择部门、人员" class="inputText" @click="selectpeople">
                    <div class="filtrate">筛选</div>
                </div>
                <div class="anniubox">
                    <input type="button" value="保存">
                    <input type="button" value="恢复">
                </div>
            </div>
            <!--班次-->
            <div class="flightintro">
                <h3>班次说明：</h3>
                <ul>
                    <li>
                        <span>班次一 09:00-11:00 12:00-14:00</span>
                    </li>
                    <li>
                        <span>班次二 09:00-11:00</span>
                    </li>
                    <li>
                        <span>班次二 09:00-11:00</span>
                    </li>
                    <li>
                        <span>班次二 09:00-11:00</span>
                    </li>
                    <li>
                        <span>班次二 09:00-11:00 12:00-14:00</span>
                    </li>
                    <li>
                        <span>班次二 09:00-11:00 12:00-14:00</span>
                    </li>
                    <li>
                        <span>班次二 09:00-11:00 12:00-14:00</span>
                    </li>
                    <li>
                        <span>班次二 09:00-11:00 12:00-14:00</span>
                    </li>
                </ul>
            </div>
            <!--表格 编辑排班-->
            <div id="freezing" style="overflow:scroll;width: 715px;height: 256px;" @scroll="freezing">
                <ul class="biaoge">
                    <li class="bgfirstli">
                        <div class="thxiexian">
                            <span>姓名</span>
                            <span>日期</span>
                        </div>
                        <div @click="dayClick">
                            <span>1</span><br>
                            <span>一</span>
                            <div class="flightBox" id="flightdayall" v-show="fydayall">
                                <p>修改所有员工当天班次</p>
                                <ul>
                                    <li @click="banciyi_2">班次一</li>
                                    <li>班次二</li>
                                    <li>班次三</li>
                                    <li>班次四</li>
                                    <li>班次五</li>
                                    <li>班次六</li>
                                    <li>班次七</li>
                                    <li>班次八</li>
                                    <li>休息</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <span>2</span><br>
                            <span>二</span>
                        </div>
                        <div>
                            <span>3</span><br>
                            <span>三</span>
                        </div>
                        <div>
                            <span>4</span><br>
                            <span>四</span>
                        </div>
                        <div>
                            <span>5</span><br>
                            <span>五</span>
                        </div>
                        <div class="zhoumo">
                            <span>6</span><br>
                            <span>六</span>
                        </div>
                        <div class="zhoumo">
                            <span>7</span><br>
                            <span>日</span>
                        </div>
                        <div>
                            <span>8</span><br>
                            <span>一</span>
                        </div>
                        <div>
                            <span>9</span><br>
                            <span>二</span>
                        </div>
                        <div>
                            <span>1</span><br>
                            <span>一</span>
                        </div>
                        <div>
                            <span>2</span><br>
                            <span>二</span>
                        </div>
                        <div>
                            <span>3</span><br>
                            <span>三</span>
                        </div>
                        <div>
                            <span>4</span><br>
                            <span>四</span>
                        </div>
                        <div>
                            <span>5</span><br>
                            <span>五</span>
                        </div>
                        <div class="zhoumo">
                            <span>6</span><br>
                            <span>六</span>
                        </div>
                        <div class="zhoumo">
                            <span>7</span><br>
                            <span>日</span>
                        </div>
                        <div>
                            <span>8</span><br>
                            <span>一</span>
                        </div>
                        <div>
                            <span>9</span><br>
                            <span>二</span>
                        </div>
                    </li>
                    <div class="clear"></div>
                    <li class="normalli">
                        <div @click="nameClick">
                            <span>张蒙</span>
                            <!--<div class="ModalsBox">-->
                                 <div class="flightBox" v-show="fyMonth" style="top: 18px;left: 56px;">
                                <p>{{flightTitle}}</p>
                                <ul>
                                    <li @click="banciyi_1">班次一</li>
                                    <li>班次二</li>
                                    <li>班次三</li>
                                    <li>班次四</li>
                                    <li>班次五</li>
                                    <li>班次六</li>
                                    <li>班次七</li>
                                    <li>班次八</li>
                                    <li>休息</li>
                                </ul>
                            </div>
                            <!--</div>-->
                           
                        </div>
                        <div @click="banClick">
                            <span>一</span>
                            <div class="flightBox" v-show="fyday">
                                <p>{{flightTitle}}</p>
                                <ul>
                                    <li @click="banciyi_3">班次一</li>
                                    <li>班次二</li>
                                    <li>班次三</li>
                                    <li>班次四</li>
                                    <li>班次五</li>
                                    <li>班次六</li>
                                    <li>班次七</li>
                                    <li>班次八</li>
                                    <li>休息</li>
                                </ul>
                            </div>
                        </div>
                        <div><span>二</span></div>
                        <div class="xiujia"><span>休</span></div>
                        <div><span>四</span></div>
                    </li>
                    <li class="normalli">
                        <div><span>张静</span></div>
                        <div><span>一</span></div>
                        <div class="xiujia"><span>休</span></div>
                        <div><span>二</span></div>
                        <div><span>四</span></div>
                    </li>
                    <li class="normalli">
                        <div><span>一组</span></div>
                        <div class="xiujia"><span>休</span></div>
                        <div><span>一</span></div>
                        <div><span>二</span></div>
                        <div><span>十</span></div>
                    </li>
                    <li class="normalli">
                        <div>
                            <span>一组</span>
                         </div>
                        <div class="xiujia"><span>休</span></div>
                        <div><span>一</span></div>
                        <div><span>二</span></div>
                        <div><span>十</span></div>
                    </li>
                </ul>
            </div>
            <!--表格 排班统计-->
            <p style="margin-top: 24px;margin-bottom: 10px;">排班统计：</p>
            <div id="freezing_1" style="overflow:scroll;width: 715px;height: 256px;" @scroll="freezing_1">
                <ul class="biaoge">
                    <li class="bgfirstli">
                        <div class="thxiexian">
                            <span>班次</span>
                            <span>日期</span>
                        </div>
                        <div>
                            <span>2</span><br>
                            <span>二</span>
                        </div>
                        <div>
                            <span>3</span><br>
                            <span>三</span>
                        </div>
                        <div>
                            <span>4</span><br>
                            <span>四</span>
                        </div>
                        <div>
                            <span>5</span><br>
                            <span>五</span>
                        </div>
                        <div class="zhoumo">
                            <span>6</span><br>
                            <span>六</span>
                        </div>
                        <div class="zhoumo">
                            <span>7</span><br>
                            <span>日</span>
                        </div>
                        <div>
                            <span>8</span><br>
                            <span>一</span>
                        </div>
                        <div>
                            <span>9</span><br>
                            <span>二</span>
                        </div>
                        <div>
                            <span>1</span><br>
                            <span>一</span>
                        </div>
                        <div>
                            <span>2</span><br>
                            <span>二</span>
                        </div>
                        <div>
                            <span>3</span><br>
                            <span>三</span>
                        </div>
                        <div>
                            <span>4</span><br>
                            <span>四</span>
                        </div>
                        <div>
                            <span>5</span><br>
                            <span>五</span>
                        </div>
                        <div class="zhoumo">
                            <span>6</span><br>
                            <span>六</span>
                        </div>
                        <div class="zhoumo">
                            <span>7</span><br>
                            <span>日</span>
                        </div>
                        <div>
                            <span>8</span><br>
                            <span>一</span>
                        </div>
                        <div>
                            <span>9</span><br>
                            <span>二</span>
                        </div>
                    </li>
                    <div class="clear"></div>
                    <li class="normalli">
                        <div><span>班次一</span></div>
                        <div><span>20</span></div>
                        <div><span>0</span></div>
                        <div><span>10</span></div>
                        <div><span>10</span></div>
                    </li>
                    <li class="normalli">
                        <div><span>班次二</span></div>
                        <div><span>10</span></div>
                        <div><span>12</span></div>
                        <div><span>15</span></div>
                        <div><span>20</span></div>
                    </li>
                    <li class="normalli">
                        <div><span>班次三</span></div>
                        <div><span>10</span></div>
                        <div><span>5</span></div>
                        <div><span>23</span></div>
                        <div><span>10</span></div>
                    </li>
                    <li class="normalli">
                        <div>
                            <span>班次四</span>
                         </div>
                        <div><span>10</span></div>
                        <div><span>11</span></div>
                        <div><span>24</span></div>
                        <div><span>14</span></div>
                    </li>
                </ul>
            </div>
            <div class="anniubox" id="buttonbox">
                    <input type="button" value="保存">
                    <input type="button" value="清空">
                </div>
            <!--修改班次提示框-->


        </div>

        <!--<div class="pagination">
            <el-pagination small layout="prev, pager, next" :total="50">
            </el-pagination>
        </div>-->
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
                Modals: false,
                month: '',
                flightTitle: '修改该员工本月所有班次',
                fyMonth:false,
                fydayall:false,
                fyday:false,
            }
        },

        created: function () {
            // var m = $('.bgfirstli>div').length - 1
            // var w = m*48 + 56
            // console.log(m,'1223')
            // console.log(w)
            // $('.biaoge').css('width','920px')
        },
        watch: {

        },
        methods: {
            selectpeople:function(){
                this.Modals = true
            },
            abolishmem: function () {
                this.Modals = false
            },
            backoutclick: function () {
                this.$router.push({
                    path: '/home/attendance/attendanceMan'
                })
            },
            freezing() {
                $("#freezing .biaoge li>div:first-child").css("left", $("#freezing").scrollLeft());
                $('#freezing .bgfirstli').css('top', $("#freezing").scrollTop())
            },
            freezing_1() {
                $("#freezing_1 .biaoge li>div:first-child").css("left", $("#freezing_1").scrollLeft());
                $('#freezing_1 .bgfirstli').css('top', $("#freezing_1").scrollTop())
            },
            nameClick:function(){
                this.fyMonth = true
                this.fydayall = false
                this.fyday = false
            },
            banciyi_1:function(event){
                event.cancelBubble = true;
                this.fyMonth = false
            },
            dayClick:function(){
                this.fydayall = true
                this.fyday = false
                this.fyMonth = false
            },
            banciyi_2:function(event){
                event.cancelBubble = true;
                this.fydayall = false
            },
            banClick:function(){
                this.fyday = true
                this.fyMonth = false
                this.fydayall = false
            },
            banciyi_3:function(event){
                event.cancelBubble = true;
                this.fyday = false
            }
        }
    }

</script>
<style scoped>
    .flightBox {
        width: 180px;
        height: 260px;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 5px 14px #f1f1f1;
        text-align: center;
        font-size: 12px;
        padding-top: 16px;
         position: absolute;
        top: 40px;
        background: #FFF;
        z-index: 999;
        left: 40px;
    }
    
    .flightBox p {
        margin-bottom: 12px;
    }
    
    .flightBox ul li {
        margin-bottom: 5px;
        cursor: pointer;
    }
    /*#flightmonth{
       
    }*/
    
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
        width: calc(100% - 88px);
    }
    
    .backout {
        cursor: pointer;
        float: left;
        width: 20px;
        height: 20px;
        background: url('/static/img/Slice.png') no-repeat -3px -153px;
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
    
    .datepeople {
        float: left;
    }
    
    .block {
        float: left;
        width: 120px!important;
        height: 32px;
        overflow: hidden;
        position: relative;
        border: 1px solid #E7744A;
        border-radius: 4px;
    }
    
    .block .el-date-editor.el-input {
        width: 120px;
        margin-left: -1px;
        margin-top: -2px;
    }
    
    .inputText {
        width: 200px;
        height: 32px;
        margin-left: 24px;
        border: 1px solid #E7744A;
    }
    
    .anniubox {
        float: right;
    }
    
    .anniubox input {
        width: 80px;
        height: 34px;
        line-height: 34px;
        color: white;
        font-size: 16px;
    }
    
    .anniubox input:nth-child(1) {
        background: #e7744a;
        margin-right: 32px;
    }
    
    .anniubox input:nth-child(2) {
        background: #AEAEAE;
    }
    
    .flightintro h3 {
        font-size: 14px;
        margin-top: 24px;
        margin-bottom: 5px;
    }
    
    .flightintro ul {
        margin-left: 66px;
        width: calc(100% - 66px);
        margin-bottom: 16px;
        overflow: hidden;
    }
    
    .flightintro ul li {
        float: left;
        margin-right: 24px;
        margin-bottom: 12px;
    }
    /*表格*/
    
    .biaoge {
        width: 1544px;
    }
    
    .biaoge>li {
        border-bottom: 1px solid #e5e5e5;
        height: 56px;
    }
    .biaoge>li>div {
        width: 48px;
        height: 56px;
        float: left;
        border-right: 1px solid #e5e5e5;
        text-align: center;
    }
    #freezing .biaoge>li>div {
        cursor: pointer;
    }
    
    .biaoge>li>div:first-child {
        position: relative;
    }
    
    .thxiexian {
        cursor: auto!important;
        z-index: 888;
        position: relative;
        width: 56px!important;
        height: 56px!important;
        background-image: url('/static/img/xiexian.png');
        background-size: 100% 100%;
        line-height: 16px!important;
        border-bottom: 1px solid #e5e5e5;
    }
    
    .thxiexian span {
        position: absolute;
        font-size: 12px;
    }
    
    .thxiexian span:nth-child(1) {
        left: 3px;
        bottom: 3px;
    }
    
    .thxiexian span:nth-child(2) {
        right: 3px;
        top: 3px;
    }
    
    .normalli>div:nth-child(1) {
        width: 56px!important;
        height: 56px!important;
        background: white;
        border-bottom: 1px solid #e5e5e5;
        z-index: 3;
    }
    
    .bgfirstli {
        position: relative;
        background: #fff;
        z-index: 88;
    }
    
    .bgfirstli>div {
        height: 28px;
        position: relative;
    }
    .bgfirstli>div span{
        line-height: 28px;
    }
    
    .normalli>div{
        position: relative;
    }
    
    .normalli>div span {
        line-height: 56px;
    }    
    #freezing,#freezing_1 {
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
    #buttonbox{
        width: 196px;
        margin: 34px auto;
        float: none;
    }
</style>
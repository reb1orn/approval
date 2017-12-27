<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="placingPersonnel">
        	<span id="placing" @click='backAttendance'>
        		<img src="../../../../static/img/Shape.png"/>
        		&nbsp;考勤组成员
        	</span>
        </div>
        <div class="setContent">
        	<ul>
        		<li>&nbsp;&nbsp;&nbsp;考勤组名称： &nbsp;&nbsp;事业一部</li>
        		<li>参与考勤员工：<input type="text" placeholder='选择部门，人员' @focus='participation'/></li>
        		<li>无需考勤员工：<input type="text" placeholder='选择人员' /></li>
        		<li>&nbsp;&nbsp;&nbsp;规则管理员：<input type="text" placeholder='选择部门，人员' /></li>
        		<li>&nbsp;&nbsp;&nbsp;统计管理员：<input type="text" placeholder='选择部门，人员'/></li>
        	</ul>
        </div>
        <div class="placingButton">
        	<div class="placingSave" @click="placingSave">保存</div>
        	<div class="placingAbolish" @click="placingAbolish">取消</div>
        </div>
        <defini v-show='definiBox' @abolishmems='abolishmems'></defini>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex';
    import defini  from '../../defini' 
    components: {defini}//这里注册全局组件
    export default {
        name: 'set',
        data() {
            return {
              Modals:false,
              definiBox:false
            }
        },

        created: function() {

        },
        watch: {

        },
        methods: {
//选择部门
           participation(){
           	  this.definiBox=true
           },
           abolishmems(){
           	this.definiBox=false
           },
//返回上级目录
           backAttendance(){
           	let url='/home/attendance/attendanceMan'
            	this.$router.push({
					path: url
				})
           },
//保存           
           placingSave(){
           	let url='/home/attendance/attendanceMan'
            	this.$router.push({
					path: url
				})
           },
//取消
           placingAbolish(){
           	let url='/home/attendance/attendanceMan'
            	this.$router.push({
					path: url
				})
           }
        }
    }

</script>
<style scoped>
    .placingPersonnel {
    height: auto;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    margin-left: 44px;
    margin-right: 44px;
    padding-top: 20px;
    padding-bottom: 12px;
    color: #303030;
    font-size: 14px;
   }
   #placing{
   	color: #000;
   	border-radius: 4px;
    padding:5px 10px;
    cursor:pointer;
   }
   .setContent{
   	  margin-left: 140px;
   	  margin-top: 20px;
   	  font-size: 14px;
   }
   .setContent ul li{
   	height: 60px;
   }
   .setContent ul li input{
   	  width: 260px;
   	  height: 36px;
   	  border:1px solid #FCB298;
   	  border-radius: 4px;
   	  padding-left: 12px;
   	  margin-left: 8px;
   }
   .placingButton{
   	margin-top: 32px;
   margin-left: 272px;
   }
   .placingSave{
   	display: inline-block;
   	width: 80px;
   	height: 34px;
   	background-color:#E7744A;
   	cursor:pointer;
   	text-align: center;
   	line-height: 34px;
   	color: #FFFFFF;
   	border-radius: 4px;
   }
   .placingAbolish{
   	display: inline-block;
   	width: 80px;
   	height: 34px;
   	background-color:#AEAEAE;
   	text-align: center;
   	line-height: 34px;
   	cursor:pointer;
   	color: #FFFFFF;
   	border-radius: 4px;
   	margin-left: 46px;
   }
</style>

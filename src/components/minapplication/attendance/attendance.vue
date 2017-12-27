<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="checkLeft">
        	<div class="kqse">考勤设置</div>
            <ul>
                <li>
                    <div @click="attendance_1" :class="{attendanceColor_1:isattendanceColor_1}">考勤设置
                      <img src="../../../../static/img/向上.png" v-show="img1"/>
                      <img src="../../../../static/img/向下.png" v-show="img2"/>
                    </div>
                    <div v-show="attendance1":class="{attendanceColor1:isattendanceColor1}" @click="attendances1" >
                    	考勤组管理 
                        <p id="p" v-show="p"></p>
                    </div>
                </li>
                <li>
                    <div @click="attendance_2" :class="{attendanceColor_2:isattendanceColor_2}">考勤统计
                     <img src="../../../../static/img/向上.png" v-show="img3"/>
                      <img src="../../../../static/img/向下.png" v-show="img4"/>
                    </div>
                    <div v-show="attendance2" @click="attendances2" :class="{attendanceColor2:isattendanceColor2}">
                    	月度汇总
                    	<p id="p" v-show="p1"></p>
                    </div>
                    <div v-show="attendance2" @click="attendances3" :class="{attendanceColor3:isattendanceColor3}">
                    	每日统计
                    	<p id="p" v-show="p2"></p>
                    </div>
                    <div v-show="attendance2" @click="attendances4" :class="{attendanceColor4:isattendanceColor4}">
                    	打卡时间
                    <p id="p" v-show="p3"></p>
                    </div>
                    <div v-show="attendance2" @click="attendances5" :class="{attendanceColor5:isattendanceColor5}">
                                             原始记录
                    <p id="p" v-show="p4"></p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="checkRight">
        	     <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex';
    export default {
        name: 'set',
        data() {
            return {
              isSadeNav:0,
              attendance1:false,
              attendance2:false,
              img1:true,
              img2:false,
              img3:true,
              img4:false,
              isattendanceColor_1:false,
              isattendanceColor_2:false,
              p:false,
              p1:false,
              p2:false,
              p3:false,
              p4:false,
              isattendanceColor1:false,
              isattendanceColor2:false,
              isattendanceColor3:false,
              isattendanceColor4:false,
              isattendanceColor5:false,
            }
        },

        created: function() {

        },
        watch: {

        },
        methods: {
      attendance_1(){
      	var self=this
      	if(self.attendance1==false){
      		self.attendance1=true
      		self.img1=false
      		self.img2=true
      		self.isattendanceColor_1=true
      	}else{
      		self.attendance1=false
      		self.img1=true
      		self.img2=false
      		self.isattendanceColor_1=false
      		this.p=false
      		this.isattendanceColor1=false
      	}     	      	
      },
        attendances1(){
      	    this.p=true
      		this.isattendanceColor1=true
      		var self=this
      		self.p1=false
      		self.p2=false
      		self.p3=false
      		self.p4=false
      		self.isattendanceColor2=false
      		self.isattendanceColor3=false
      		self.isattendanceColor4=false
      		self.isattendanceColor5=false
      		let url='/home/attendance/attendanceMan'
            	this.$router.push({
					path: url
				})
       },
        attendances2(){
      	    this.p1=true
      		this.isattendanceColor2=true
      		var self=this
      		self.p=false
      		self.p2=false
      		self.p3=false
      		self.p4=false
      		self.isattendanceColor3=false
      		self.isattendanceColor4=false
      		self.isattendanceColor5=false
      		self.isattendanceColor1=false
      		let url='/home/attendance/monthlySummary'
            	this.$router.push({
					path: url
				})
       },
        attendances3(){
      	    this.p2=true
      		this.isattendanceColor3=true
      		var self=this
      		self.p=false
      		self.p1=false
      		self.p3=false
      		self.p4=false
      	    self.isattendanceColor2=false
      		self.isattendanceColor4=false
      		self.isattendanceColor5=false
      		self.isattendanceColor1=false
      		let url='/home/attendance/dailyStatistics'
            	this.$router.push({
					path: url
				})
       },
        attendances4(){
      	    this.p3=true
      		this.isattendanceColor4=true
      		var self=this
      		self.p=false
      		self.p1=false
      		self.p2=false
      		self.p4=false
      		self.isattendanceColor2=false
      		self.isattendanceColor3=false
      		self.isattendanceColor5=false
      		self.isattendanceColor1=false
      		let url='/home/attendance/clockTime'
            	this.$router.push({
					path: url
				})
       },
        attendances5(){
      	    this.p4=true
      		this.isattendanceColor5=true
      		var self=this
      		self.p=false
      		self.p1=false
      		self.p2=false
      		self.p3=false
      		self.isattendanceColor2=false
      		self.isattendanceColor3=false
      		self.isattendanceColor4=false
      		self.isattendanceColor1=false
      		let url='/home/attendance/sourceRecord'
            	this.$router.push({
					path: url
				})
       },
       attendance_2(){
      	var self=this
      	if(self.attendance2==false){
      		self.attendance2=true
      		self.img3=false
      		self.img4=true
      		self.isattendanceColor_2=true
      	}else{
      		self.attendance2=false
      		self.img3=true
      		self.img4=false
      		self.isattendanceColor_2=false
      		self.p1=false
      		self.p2=false
      		self.p3=false
      		self.p4=false
      		self.isattendanceColor2=false
      		self.isattendanceColor3=false
      		self.isattendanceColor4=false
      		self.isattendanceColor5=false
      		
      	}     	      	
      }
        }
    }

</script>
<style scoped>
	.kqse{
		width: 100%;
		height: 40px;
		background-color: #E7744A;
		text-align: center;
		line-height: 40px;
		color: #FFF;
	}
	#p{
		width: 2px;
		height: 39px;
		float: left;
		background-color:#E7744A;
		margin-left: -30px;
	}
	.attendanceColor1,
	.attendanceColor2,
	.attendanceColor3,
	.attendanceColor4,
	.attendanceColor5{
		background-color:rgba(231,116,74,0.05);
	}
	.attendanceColor_1,
	.attendanceColor_2{
		color:#E7744A;
	}
    .checkLeft{
    	width: 260px;
    	height: 100%;
    	float: left;
    	background-color: #fffaf9;
    }
    .checkRight{
    	width: 820px;
    	height: 100%;
        float: right;
		overflow-x: hidden;
		overflow-y: scroll;
    }
    .checkTitle
    {
       width: 100%;
       height: 40px;
       text-align: center;
       line-height: 40px;
       background-color: #E7744A;
       color: #FFF;
    }
    .attendanceSet,
     .attendanceStatistics{
       width: 100%;
       height:auto;
       padding-left: 16px;
       line-height: 40px;
       cursor:pointer;      
    }
    .AttendanceCon{
    	width: 100%;
    	height: 40px;
    	padding-left: 14px;
    }
    #borderL{
    	width: 1px;
    	height: 36px;
    	background-color: #E7744A;
    	margin-left: -30px;
    	line-height: 40px;
    }
     .attendanceSet img{
     	float: right;
     	margin-left: 16px;
     }
     #attendance{
     	width: 100%;
     	height: 40px;
     	text-align: center;
     	background-color: #E7744A;
     	margin: 0;
     	line-height: 40px;
     	color: #FFFFFF;
     }
     .checkLeft ul li div{
        width: 100%;
     	height: 40px;	
     
     	line-height: 40px;
     	cursor: pointer;
     }
      .checkLeft ul li div:nth-child(1){
      	padding-left: 16px;
      }
      .checkLeft ul li div:nth-child(1) img{
      	padding-left: 160px;      	
      }
       .checkLeft ul li div:nth-child(1) img:nth-child(1){
       	transform: rotateX(180deg);
       }
       .checkLeft ul li div:nth-child(2){
      	padding-left: 30px;      
      }
       .checkLeft ul li div:nth-child(3){
      	padding-left: 30px;      
      }
       .checkLeft ul li div:nth-child(4){
      	padding-left: 30px;  
      }
       .checkLeft ul li div:nth-child(5){
      	padding-left: 30px;    
      }
      
</style>

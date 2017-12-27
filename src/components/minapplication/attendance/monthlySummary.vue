<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="monthTop">
        	<a href="javascript:;"><img src="/static/img/Shape.png" @click='back'/></a>
        	月度汇总
        </div>
        <div class="monthCen">
        	<div class="ColumnStatistics">
        		统计列：
        		<el-checkbox v-model="date" @change="datas"></el-checkbox>&nbsp;&nbsp;出勤天数
        		<el-checkbox v-model="date1" @change="datas1"></el-checkbox>&nbsp;&nbsp;休息天数
        		<el-checkbox v-model="date2" @change="datas2"></el-checkbox>&nbsp;&nbsp;工作时长
        		<el-checkbox v-model="date3" @change="datas3"></el-checkbox>&nbsp;&nbsp;迟到次数
        		<el-checkbox v-model="date4" @change="datas4"></el-checkbox>&nbsp;&nbsp;严重迟到次数
        		<el-checkbox v-model="date5" @change="datas5"></el-checkbox>&nbsp;&nbsp;严重迟到时长
        		<div class="ulo">
        		<el-checkbox v-model="date6" @change="datas6"></el-checkbox>&nbsp;旷工迟到天数
        		<el-checkbox v-model="date7" @change="datas7"></el-checkbox>&nbsp;早退次数
        		<el-checkbox v-model="date8" @change="datas8"></el-checkbox>&nbsp;早退时长
        		<el-checkbox v-model="date9" @change="datas9"></el-checkbox>&nbsp;上班缺卡次数
        		<el-checkbox v-model="date_1" @change="datas_1"></el-checkbox>&nbsp;下班缺卡次数
        		<el-checkbox v-model="date_2" @change="datas_2"></el-checkbox>&nbsp;旷工天数
        		</div>
        		
        	</div>
        	<div class="selectTime">
        		时间：<el-date-picker
                         v-model="value1"
                         type="date"
                         placeholder="选择日期"
                         :picker-options="pickerOptions0">
                      </el-date-picker>
                <div id="xian"></div>
                <el-date-picker
                         v-model="value2"
                         type="date"
                         placeholder="选择日期"
                         :picker-options="pickerOptions0">
                </el-date-picker>
        	</div>
        	<div class="staffSearch">
        		<input type="text" placeholder="选择部门，人员" @focus='selectMembers'/>
        		<div class="filtrate">筛选</div>
        	</div>
        </div>
        <div class="monthBot">
             <div class="daoTable">导出月度汇总表</div>
             <div class="fixedTable">
    <el-table
    :data="tableData3"
    border
    style="width: 100%"
    height="300">
    <el-table-column
      fixed
      prop="date"
      label="姓名"
      width="80">
    </el-table-column>
    <el-table-column
      prop="name"
      fixed
      label="部门"
      width="103">
    </el-table-column>
    <el-table-column
      prop="province"
      label="出勤天数"
      width="100"
      v-if="tabledate">
    </el-table-column>
    <el-table-column
      prop="province"
      label="休息天数"
      width="100"
      v-if="tabledate1">
    </el-table-column>
    <el-table-column
      prop="province"
      label="工作时长"
      width="100"
      v-if="tabledate2">
    </el-table-column>
    <el-table-column
      prop="city"
      label="迟到次数"
      width="100"
      v-if="tabledate3">
    </el-table-column>
    <el-table-column
      prop="province"
      label="严重迟到次数"
      width="130"
      v-if="tabledate4">
    </el-table-column>
    <el-table-column
      prop="province"
      label="严重迟到时长"
      width="130"
      v-if="tabledate5">
    </el-table-column>
    <el-table-column
      prop="province"
      label="旷工迟到天数"
      width="130"
      v-if="tabledate6">
    </el-table-column>
    <el-table-column
      prop="province"
      label="早退次数"
      width="100"
      v-if="tabledate7">
    </el-table-column>
    <el-table-column
      prop="province"
      label="早退时长"
      width="100"
      v-if="tabledate8">
    </el-table-column>
    <el-table-column
      prop="province"
      label="上班缺卡次数"
      width="130"
      v-if="tabledate9">
    </el-table-column>
    <el-table-column
      prop="province"
      label="下班缺卡次数"
      width="130"
      v-if="tabledate_1">
    </el-table-column>
    <el-table-column
      prop="address"
      label="迟到时长"
      width="120"
      >
    </el-table-column>
    <el-table-column
      prop="zip"
      label="旷工天数"
      width="100"
      v-if="tabledate_2">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="1 一"
      width="48">
    </el-table-column>
      <el-table-column
      prop="zip"
      label="1 一"
      width="48">
    </el-table-column>
      <el-table-column
      prop="zip"
      label="1 一"
      width="48">
    </el-table-column>
      <el-table-column
      prop="zip"
      label="1 一"
      width="48">
    </el-table-column>
      <el-table-column
      prop="zip"
      label="1 一"
      width="48">
    </el-table-column>
      <el-table-column
      prop="zip"
      label="1 一"
      width="48">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="1 一"
      width="48"
      >
    </el-table-column>
  </el-table>
             </div>
        </div>
       <div class="pagination">
       	        <el-pagination
                     small
                      layout="prev, pager, next"
                    :total="50">
                </el-pagination>
       </div>
       <popup-box v-show='Modals' @abolishmem='abolishmem'></popup-box>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex';
    import popupBox  from '../../pop-upBox' //这里引入全局组件
    export default {
    	components: {popupBox},//这里注册全局组件
        name: 'set',
        data() {
            return {
               pickerOptions0: {
                    disabledDate(time) {
                       return time.getTime() < Date.now() - 8.64e7;
                         }
                },
                value1: '',
                value2:'',
                Modals:false,
                date:true,
                tabledate:true,
                tabledate_1:false,
                tabledate_2:true,
                tabledate1:false,
                tabledate2:false,
                tabledate3:true,
                tabledate4:false,
                tabledate5:true,
                tabledate6:false,
                tabledate7:false,
                tabledate8:false,
                tabledate9:false,
                date1:false,
                date2:false,
                date3:true,
                date4:false,
                date5:true,
                date6:false,
                date7:false,
                date8:false,
                date9:false,
                date_1:false,
                date_2:true,
                 tableData3: [{
          date: '张一白',
          name: '事业一部',
          province: '15',
          city: '1',
          address: '1小时10分钟',
          zip: 1
        }, {
          date: '张一白',
          name: '事业一部',
          province: '15',
          city: '1',
          address: '1小时10分钟',
          zip: 1
        },{
          date: '张一白',
          name: '事业一部',
          province: '15',
          city: '1',
          address: '1小时10分钟',
          zip: 1
        },{
          date: '张一白',
          name: '事业一部',
          province: '15',
          city: '1',
          address: '1小时10分钟',
          zip: 1
        }, {
          date: '张一白',
          name: '事业一部',
          province: '15',
          city: '1',
          address: '1小时10分钟',
          zip: 1
        }, {
          date: '张一白',
          name: '事业一部',
          province: '15',
          city: '1',
          address: '1小时10分钟',
          zip: 1
        }, {
          date: '张一白',
          name: '事业一部',
          province: '15',
          city: '1',
          address: '1小时10分钟',
          zip: 1
        }]
      
            }
        },

        created: function() {

        },
        watch: {

        },
        methods: {
        	selectMembers(){
        		this.Modals=true
        	},
        	abolishmem(){
        		this.Modals=false
        	},
        	hhh(){
        		console.log(1)
        	},
        	back(){
        		console.log(0)
        	},
        	datas(){
        		if(this.date==true){
        			this.tabledate=true
        		}else{
        			this.tabledate=false
        		}
        	},
           datas1(){
        		if(this.date1==true){
        			this.tabledate1=true
        		}else{
        			this.tabledate1=false
        		}
        	},
        	datas2(){
        		if(this.date2==true){
        			this.tabledate2=true
        		}else{
        			this.tabledate2=false
        		}
        	},
        	datas3(){
        		if(this.date3==true){
        			this.tabledate3=true
        		}else{
        			this.tabledate3=false
        		}
        	},
        	datas4(){
        		if(this.date4==true){
        			this.tabledate4=true
        		}else{
        			this.tabledate4=false
        		}
        	},
        	datas5(){
        		if(this.date5==true){
        			this.tabledate5=true
        		}else{
        			this.tabledate5=false
        		}
        	},
        	datas6(){
        		if(this.date6==true){
        			this.tabledate6=true
        		}else{
        			this.tabledate6=false
        		}
        	},
        	datas7(){
        		if(this.date7==true){
        			this.tabledate7=true
        		}else{
        			this.tabledate7=false
        		}
        	},
        	datas8(){
        		if(this.date8==true){
        			this.tabledate8=true
        		}else{
        			this.tabledate8=false
        		}
        	},
        	datas9(){
        		if(this.date9==true){
        			this.tabledate9=true
        		}else{
        			this.tabledate9=false
        		}
        	},
        	datas_1(){
        		if(this.date_1==true){
        			this.tabledate_1=true
        		}else{
        			this.tabledate_1=false
        		}
        	},
        	datas_2(){
        		if(this.date_2==true){
        			this.tabledate_2=true
        		}else{
        			this.tabledate_2=false
        		}
        	},
        }
    }

</script>
<style scoped>
	.pagination{
		float: right;
		margin-right: 20px;
	}
	.ulo{
		margin-left: 60px;
		margin-top: 10px;
	}
    .monthTop{
    	width: calc(100%-88px);
    	height: auto;
    	border-bottom:1px solid rgba(0,0,0,0.1);
        margin-left: 44px;
        margin-right: 44px;
        padding-top: 20px;
        padding-bottom: 12px;
        color: #303030;
        font-size: 14px;
    }
    .monthCen{
    	width: calc(100%-88px);
    	height: auto;
    	border-bottom:1px solid rgba(0,0,0,0.1);
        margin-left: 44px;
        margin-right: 44px;
        padding-top: 20px;
        padding-bottom: 20px;
        color: #303030;
        font-size: 14px;
    }
    .monthTop img{
    	margin-right: 8px;
    }
   .selectTime .el-date-editor.el-input{
    	width: 120px !important;
    	height: 32px !important;
    }
    #xian{
    	width: 40px;
    	height: 1px;
    	background-color:#FFF;
    	border-bottom: 1px solid #E7744A;
    	display: inline-block;
    }
    .selectTime{
    	margin-top: 24px;
    	width: 50%;
    }
    .staffSearch{
    	display: inline-block;
    	width: auto;
    	float: right;
    	margin-top: -30px;
    	margin-right:15px;
    }
    .staffSearch input{
    	border: 1px solid #E7744A;
    	width: 200px;
    	height: 32px;
    	padding-left: 12px;
    	line-height: 32px;
    }
    .filtrate{
    	display: inline-block;
    	width: 48px;
    	height: 22px;
    	border:1px solid #E7744A;
    	border-radius: 4px;
    	color: #E7744A;
    	text-align: center;
    	line-height: 22px;
    	font-size: 12px;
    	cursor: pointer;
    	margin-left: 16px;
    }
    .monthBot{
    	width: calc(100%-88px);
    	height: auto;
    	margin-top: 24px;
    	margin-left: 44px;
        margin-right: 44px;
    }
    .daoTable{
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
    .fixedTable{
        width: calc(100%-88px);
    	height: auto;
    	margin-top: 10px;
    }
</style>

<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="monthTop">
        	<a href="javascript:;"><img src="/static/img/Shape.png" @click='back'/></a>
        	每日统计
        </div>
        <div class="monthCen">
        	<div class="selectTime">
        		时间：<el-date-picker
                         v-model="value1"
                         type="date"
                         placeholder="选择日期"
                         :picker-options="pickerOptions0">
                      </el-date-picker>
                <p id="xian"></p>
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
             <div class="daoTable">导出每日统计表</div>
             <div class="fixedTable">
    <el-table
    :data="tableData3"
    border
    style="width: 100%"
    height="300">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
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
                 tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
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
           back(){
           	console.log(0)
           }
        }
    }

</script>
<style scoped>
	.pagination{
		float: right;
		margin-right: 20px;
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
    	background-color:#E7744A;
    	display: inline-block;
    	margin-top: 10px;
    }
    .selectTime{
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

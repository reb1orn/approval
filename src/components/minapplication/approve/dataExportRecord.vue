<template xmlns:v-on="http://www.w3.org/1999/xhtml">
	<div class="set" style="height: 100%;">
		<div class="addAttendance">
			<span id="add" @click="addcheck">
        		数据导出
        	</span>
        	<div id="long">
        		
        	</div>
        	<span id="record" @click="DataExportRecord">
        		   数据导出记录
        		</span>
		</div>
		<div class="recordTable">
			 <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="导出文件名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="审批人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="完成时间">
      </el-table-column>
      <el-table-column
        prop="genre"
        label="审批类型">
      </el-table-column>
    </el-table>
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
				 tableData: [{
            date: '2017060943015',
            name: '张静',
            address: '2012-06-09',
            genre:'请假'
          }, {
            date: '2017060943015',
            name: '张静',
            address: '2012-06-09',
            genre:'请假'
          }, {
            date: '2017060943015',
            name: '张静',
            address: '2012-06-09',
            genre:'请假'
          }, {
            date: '2017060943015',
            name: '张静',
            address: '2012-06-09',
            genre:'请假'
          }]
		   }
		},

		created: function () {

		},
		watch: {

		},
		methods: {	
			addcheck: function () {
				this.$router.push({
					path: "/home/approve/dataExport"
				})
			},
			DataExportRecord(){
				this.$router.push({
					path: "/home/approve/dataExportRecord"
				})
			}
		}
	}

</script>
<style scoped>
.el-table{
	border:none !important;
}

	.addAttendance {
		height: auto;
		border-bottom: 1px solid rgba(0, 0, 0, 0.15);
		margin-left: 16px;
		margin-right: 16px;
		padding-top: 20px;
		padding-bottom: 12px;
		color: #303030;
		font-size: 14px;
	}	
	#add {
		color: #000;
		border-radius: 4px;
		padding: 5px 10px;
		cursor: pointer;
	}
	#record{
		color: #E7744A;
		cursor: pointer;
	}
	#long{
		display: inline-block;
		width: 1px;
		height: 14px;
		padding-top: 10px;
		margin-left: -10px;
		background-color:#AEAEAE;
	}
    .recordTable{
    	width: 90%;
    	margin-left: 20px;
    	margin-top: 20px;
    }
</style>
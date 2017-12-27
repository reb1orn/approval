<template xmlns:v-on="http://www.w3.org/1999/xhtml">
	<div class="set" style="height: 100%;">
		<div class="addAttendance">
			<span id="add" @click="addcheck">
        		新建考勤组
        	</span>
		</div>
		<div class="tableAttendance">
			<table>
				<tr>
					<th>名称</th>
					<th>人数</th>
					<th>类型</th>
					<th>考勤时间</th>
					<th>考勤位置</th>
					<th>操作</th>
				</tr>
				<tr>
					<td>事业一部</td>
					<td>50人</td>
					<td>{{banzhi}}</td>
					<td>
						<div>每周一，二，四</div>
						<div>09:00-18:00</div>
						<div>每周三</div>
						<div>13:00-18:00</div>
					</td>
					<td>
						<div>WIFI:西安分公司1<br/>西安分公司2</div>
						<div>地点：中兴产业园L座</div>
					</td>
					<td>
						<p @click="editRule">编辑规则</p>
						<p @click="editMember">编辑成员</p>
						<p @click="paiban">排班</p>
						<p @click="remove">删除</p>
					</td>
				</tr>
			</table>
		</div>
		<div class="removeBox" v-show="removeBox">
			<div class="remove">
				<div class="removeTop">删除事业部一组考勤</div>
				<div class="removeBot">
					<div class="removeBl">确定</div>
					<div class="removeBr" @click="removeBr">取消</div>
				</div>
			</div>
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
				banzhi: '固定班制',
				removeBox: false
			}
		},

		created: function () {

		},
		watch: {

		},
		methods: {
			// 排班
			paiban:function(){
				this.$router.push({
						path: '/home/attendance/paiban'
					})
			},
			// 编辑规则
			editRule: function () {
				if (this.banzhi == '固定班制') {
					this.$router.push({
						path: '/home/attendance/editfixban'
					})
				} else if (this.banzhi == '排班制') {
					this.$router.push({
						path: '/home/attendance/editpaiban'
					})
				} else if (this.banzhi == '自由班制') {
					this.$router.push({
						path: '/home/attendance/editziyouban'
					})
				}

			},
			//删除列表
			remove() {
				this.removeBox = true
			},
			removeBr() {
				this.removeBox = false
			},
			//编辑成员
			editMember(index) {
				let url = '/home/attendance/editMember'
				this.$router.push({
					path: url
				})
			},
			addcheck: function () {
				this.$router.push({
					path: "/home/attendance/addattendance"
				})
			}
		}
	}

</script>
<style scoped>
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
		border: 1px solid #E7744A;
		color: #E7744A;
		border-radius: 4px;
		padding: 5px 10px;
		cursor: pointer;
	}
	
	.tableAttendance {
		height: auto;
		margin-top: 20px;
		margin-left: 16px;
		margin-right: 16px;
	}
	
	.tableAttendance table {
		width: 100%;
		height: auto;
	}
	
	.tableAttendance tr th {
		height: 40px;
		line-height: 40px;
		background-color: #F4F4F6;
		font-size: 12px;
	}
	
	.tableAttendance tr th:nth-child(1) {
		width: 132px;
		padding-left: 32px;
	}
	
	.tableAttendance tr td:nth-child(1) {
		width: 132px;
		padding-left: 32px;
	}
	
	.tableAttendance tr th:nth-child(2) {
		width: 96px;
	}
	
	.tableAttendance tr th:nth-child(3) {
		width: 125px;
	}
	
	.tableAttendance tr th:nth-child(4) {
		width: 200px;
	}
	
	.tableAttendance tr th:nth-child(5) {
		width: 192px;
	}
	
	.tableAttendance tr th:nth-child(6) {
		width: 134px;
	}
	
	.tableAttendance tr td {
		height: 36px;
		line-height: 36px;
		font-size: 12px;
		color: #5A5A5A;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	
	.tableAttendance tr td div {
		height: 22px;
	}
	
	.tableAttendance tr td p {
		height: 30px;
		color: #E7744A;
		cursor: pointer;
	}
	
	.removeBox {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.1);
	}
	
	.remove {
		width: 420px;
		height: 240px;
		border-radius: 4px;
		background-color: #FFF;
		margin: 240px auto;
		box-shadow: 0 2px 14px rgba(0, 0, 0, 0.15);
		animation: remove .8s linear;
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
	
	.removeTop {
		width: 100%;
		height: 60%;
		text-align: center;
		padding-top: 48px;
	}
	
	.removeBot {
		width: 100%;
		height: 40%;
		text-align: center;
	}
	
	.removeBl,
	.removeBr {
		width: 80px;
		height: 34px;
		color: #FFF;
		font-size: 16px;
		display: inline-block;
		line-height: 34px;
		border-radius: 4px;
		cursor: pointer;
	}
	
	.removeBl {
		background-color: #E7744A;
	}
	
	.removeBr {
		background-color: #AEAEAE;
		margin-left: 32px;
	}
</style>
<template>
	<div class="set" style="height: 100%;">
		<div class="addAttendance">
			<span id="add" @click="addcheck">
        		新建审批
        	</span>
		</div>
		<div class="approveBot">
			<div class="approveName">
				<span>审批名称</span>
				<span>说明</span>
				<span>操作</span>
			</div>
			<ul class="ulo">
				<li v-for="(lists,index) in itemsa" :key='index'>
					<div>{{lists.modelName}}</div>
					<div>
						<span>编辑表单</span>
						<span @click='ApproverSettings(index)'>审批人设置</span>
						<span @click='recipients(index)'>抄送人</span>
						<span @click='saveCopy(index)'>停用</span>
					</div>
				</li>
			</ul>
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
				itemsa:[],
			}
		},

		created: function () {
			    sessionStorage.removeItem('modelId')
				sessionStorage.removeItem('modelName')
				sessionStorage.removeItem('setting')
				sessionStorage.removeItem('approveList')
				//  获取审批列表
				let self = this
				self.getapprovalList({
					oid: sessionStorage.getItem("orgId"),
					access_token:sessionStorage.getItem('accessToken')
				}).then((data)=>{
					self.itemsa = data.data
					
				}).catch(msg=>{
					 this.$message({
						type: "info",
						message: data.msg
					});
				})
		},
		watch: {

		},
		methods: {
			// 保存抄送人
            saveCopy(index){
				 let self = this
				 let willCompile = self.itemsa[index].modelId
				 let arr = [1,2,3]
				 self.getapprovalcopysave({
                    modelId: willCompile, 
                    userIds:JSON.stringify(arr)
				 }).then((data)=>{
                         if(data.code == '000000'){
							this.$message({
								type:'success',
								message:'保存成功！'
							}) 
						 }else{
							this.$message({
								type:'info',
								message:data.msg
							}) 
						 }
				 }).catch(msg=>{
					this.$message({
					   type:'info',
					   message:data.msg
				   })  
				 })
			},
			
			// 获取抄送人列表
			recipients(index){
			  let self = this
			  let willCompile = self.itemsa[index].modelId
			  self.getapprovalcopyget({
                  modelId: willCompile
			  }).then((data)=>{
                      if(data.code == '000000'){

					  }else{
						 this.$message({
							type:'info',
							message:data.msg
						})  
					  }
			  }).catch(msg=>{
				 this.$message({
					   type:'info',
					   message:data.msg
				   }) 
			  })
			},
			// 审批人设置
			ApproverSettings(index){
			   let self = this
			   let willCompile = self.itemsa[index].modelId
			   sessionStorage.setItem('modelId',willCompile)
			   self.getapprovalSetItem({
                     modelId:willCompile
			   }).then((data)=>{
                       if(data.code == '000000'){
						sessionStorage.setItem('modelName',data.data.modelL.modelName)  
						sessionStorage.setItem('setting',data.data.setting)	
						sessionStorage.setItem('approveList',data.data.list)	
						this.$router.push({
				             path:'/home/approve/compileapprove'
			            })
					   }else{
						   this.$message({
							   type:'info',
							   message:data.msg
						   })
					   }
			   }).catch(msg=>{
				   this.$message({
					   type:'info',
					   message:data.msg
				   })
			   })
			   
			},
			addcheck: function () {
				this.$router.push({
					path: "/home/formDesign"
				})
			},
			...mapActions(['getapprovalList','getapprovalSetItem','getapprovalcopyget','getapprovalcopysave'])
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
	
   .approveName{
   	width: 90%;
   	height: 40px;
   	line-height: 40px;
   	color: #000000;
    font-size: 14px;
    background-color:#F4F4F6;
    margin-left: 16px;
    margin-top: 10px;
   }
   .approveName span:nth-child(1){
   	margin-left: 20px;
   	float: left;
   }
   .approveName span:nth-child(2){
   	margin-left: 180px;
   }
   .approveName span:nth-child(3){
   	margin-right: 180px;
   	float: right;
   }
   ul li {
   	width: 90%;
   	height: 40px;
   	border-bottom: 1px solid #CCCCCC;
   	margin-left: 16px;
   	line-height: 40px;
   	color: #000000;
   	font-size: 12px;
   }
   .ulo li div{
   	display: inline-block;
   }
  .ulo li div:nth-child(2){
  	display: inline-block;
  	float: right;
  	margin-right: 20px;
  	color: #E7744A;
  	cursor: pointer;
  }
  .ulo li div:nth-child(1){
  	padding-left: 20px;
  }
  .ulo li div:nth-child(2) span {
  	margin-left: 4px;
  }
</style>
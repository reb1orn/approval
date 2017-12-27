<template>
  <div>
	<div class="set" style="height: 100%">
		<div class="addAttendance">
			<span id="add" class='compile'>
        		'{{modelName}}' 审批人设置
        	</span>
		</div>
		<div class="approveBot">
			    <el-radio-group v-model="radio2" @change="radioSelet()">
					<el-radio :label='2' >不设置</el-radio>
					<el-radio :label='0' >不分条件设置审批人</el-radio>			
					<el-radio :label='1' >分条件设置审批人</el-radio>
				</el-radio-group>
				<div class='unconditional' v-show='unconditional '>
                    <div class='addApprover' v-show='addApprovar'>
					     <img :src=approvalImg alt="">	
						 <p>张三</p>
					</div>		 
                    <div class="unApproval" v-show='unApproval'>
					     <img :src=approvalImg alt="">	
						 <p @click='addApprovars()'>请添加审批人</p>	
					</div>
					<div class="unApproval" v-show='unApproval'>
					     <img :src=approvalImg alt="">	
						 <p>请添加审批人</p>	
					</div>
					<!-- <img :src=arrows alt="" id="arrows"> -->
					<div class='operation'>
						<span  @click='emptyData()'>清空</span>
					    <span @click='settings()'>设置</span>	
					</div>		 		
				</div>
		</div>
		<div @click='getApprovalCondition()' style="display:inline-block">获取</div>
		<div @click='saveApprovalCondition()'  style="display:inline-block">保存</div>
		<div @click='deleteApprovalCondition()'  style="display:inline-block">删除</div>
		
	</div>
	<div class='approvalMaskLayer' v-show="approvalMaskLayer">
		<div class='selectApprovalBox'>
			   <div class="selectApprovalTop">选择审批人</div>
			   <div class="selectApprovalCentant">
					<div class="selectApprovalLeft"></div>
					<div class="selectApprovalRight">
						<div class="selectApprovalRightTOP"></div>              
						<div class="selectApprovalRightBot">
							<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick(data)"></el-tree>		
						</div>   
					</div>
			   </div>
               <div class="selectApprovalBot">
				     <div class="saveApproval">保存</div>
					 <div class="abolishBox" @click='abolish()'>取消</div> 
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
				approvalMaskLayer:false,
				data:[],
				defaultProps: {
					children: 'children',
					label: 'name',
					
				},
				arrows:"./static/img/arrows.png",
				empty :false,
				unApproval:false,
				addApprovar:false,
				unconditional:false,
				radio2: 1,
				itemsa:[],
				modelName:'',
				setting:'',
				approveList:[], 	
				modelId:'',
				approvalImg:'./static/img/user8-128x128.jpg'
			}
		},

		created: function () {
		        this.modelId = sessionStorage.getItem('modelId')
				this.modelName = sessionStorage.getItem('modelName')
				this.setting = sessionStorage.getItem('setting')
				this.approveList = sessionStorage.getItem('approveList')
				if(this.setting == 0){
					this.radio2 = 0
				}else if(this.setting == 1){
					this.radio2 = 1
				}else if(this.setting == 2){
					this.radio2 = 2
				}
				this.radioSelet()
				this.companyList()
		},
		watch: {
             radioSelet(){
				let self = this
				if(self.radio2 == 2){
					self.unconditional = false
				 	self.getapprovalsaveSetItem({
					  modelId:self.modelId ,
					  setting:2
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
				}else if(self.radio2 == 0){
				  self.unconditional = true
				  if(self.approveList !== ''){
					   self.addApprovar = true
					   self.empty = true
				  }else{
					  self.empty = false
					  self.unApproval = true
				  }
				  self.getapprovalsaveSetItem({
					  modelId:self.modelId ,
					  setting:0
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
				}else if(self.radio2 == 1){
					self.unconditional = false
				self.getapprovalsaveSetItem({
					  modelId:self.modelId ,
					  setting:1
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
				}
				
			}, 
		},

		methods: {
			// 选择审批人弹出框
			addApprovars(){
                this.approvalMaskLayer = true
			},
			// 取消弹出框
			abolish(){
                this.approvalMaskLayer = false
			},
			// 树结构点击选择审批人
			handleNodeClick(data) {
			  if(data.children == undefined){
				if(data.userName == undefined){
	
				}else{
					console.log('这里push进新数组！')
				}		
			  }else{
                   
			  }	
	
			},
			// 删除审批条件
			deleteApprovalCondition(){
				let self = this
				self.getapprovalcdndelete({
					modelId:self.modelId,
					// conditions:
				}).then((data)=>{
                     if(data.code == '000000'){
						 console.log(data.data)
					 }else{
						 this.$message({
							type:'info',
							message:data.msg
						})
					 }
				}).catch(msg =>{
					this.$message({
						type:'info',
						message:'服务器错误！'
					})
				})
			},
			// 保存审批条件
			saveApprovalCondition(){
				let self = this
				self.getapprovalcdnsave({
					 modelId:self.modelId,
					//  field:,
					//  numbers:
				}).then((data)=>{
                     if(data.code == '000000'){
						 console.log(data.data)
					 }else{
						 this.$message({
							type:'info',
							message:data.msg
						})
					 }
				}).catch(msg =>{
					this.$message({
						type:'info',
						message:'服务器错误！'
					})
				})
			}, 
			// 获取审批条件
			getApprovalCondition(){
				let self = this
				self.getapprovalcdnget({
					modelId:self.modelId
				}).then((data)=>{
                     if(data.code == '000000'){
						 console.log(data.data)
					 }else{
						 this.$message({
							type:'info',
							message:data.msg
						})
					 }
				}).catch(msg =>{
					this.$message({
						type:'info',
						message:'服务器错误！'
					})
				})
			},
			// 获取公司部门信息
			companyList(){
				let self = this

				self.getdeptGetOrgTreeAndUser({
				oid:sessionStorage.getItem("orgId"),
				uid:sessionStorage.getItem('userId'),
				}).then((data)=>{
					if(data.code == '000000'){
						self.data = data.data
						console.log(self.data)
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
			// 清空审批流程
			emptyData(){
			 let self = this
			 self.getapprovaldeleteProcess({
				modelId: self.modelId, 
				conditionId:'',
			 }).then((data)=>{
                 if(data.code == '000000'){
					 this.$message({
						 type:'success',
						 message:'清空成功！'
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
			// 设置审批流程
			settings(){
			  let self = this
			  let arr = [1,2,3]

			  self.getapprovalupdateProcess({
				  modelId: self.modelId,
				  conditionId:'',
				  userArray:JSON.stringify(arr)
			  }).then((data)=>{
                  if(data.code == '000000'){
					 this.$message({
						 type:'success',
						 message:'设置成功！'
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
			// 选择单选按钮，发送设置项
			radioSelet(){
				let self = this
				if(self.radio2 == 2){
					self.unconditional = false
				 	self.getapprovalsaveSetItem({
					  modelId:self.modelId ,
					  setting:2
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
				}else if(self.radio2 == 0){
				  self.unconditional = true
				  if(self.approveList !== ''){
					   self.addApprovar = true
					   self.empty = true
				  }else{
					  self.empty = false
					  self.unApproval = true
				  }
				  self.getapprovalsaveSetItem({
					  modelId:self.modelId ,
					  setting:0
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
				}else if(self.radio2 == 1){
					self.unconditional = false
				self.getapprovalsaveSetItem({
					  modelId:self.modelId ,
					  setting:1
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
				}
				
			},
			
			...mapActions(['getdeptGetOrgTreeAndUser','getapprovalcdndelete','getapprovalcdnsave','getapprovalcdnget','getBranchMemberlist','getOrgTreeList','getapprovalList','getapprovalsaveSetItem','getapprovalupdateProcess','getapprovaldeleteProcess'])
		}
		 
	}

</script>
<style scoped>
    .selectApprovalRightBot{
		width: 100%;
		overflow-y: scroll;
		height: 340px;
	}
    .selectApprovalRightTOP{
		width: 100%;
		height: 60px;
		border-bottom: 1px solid #cccccc;
	}
    .selectApprovalCentant{
		width: 100%;
		height: 410px;
		/* background-color: #aeaeae; */
	}
	.selectApprovalLeft{
		float: left;
		width: 45%;
		height: 410px;;
        border:1px solid #d7d7d7;
		margin-left: 10px;
		/* background-color: #ffffff; */
	}
	.selectApprovalRight{
		float: right;
		width: 45%;
		height: 410px;;
        border:1px solid #d7d7d7;	
		margin-right: 10px;
		/* background-color: #ffffff; */
	}
	.selectApprovalBot{
		width: 100%;
		text-align: center;
	}
    .saveApproval{
		width: 80px;
		height: 35px;
		display: inline-block;
		margin-right: 20px;
		font-size: 14px;
		color: #F4F4F6;
		background-color: #E7744A;
		text-align: center;
		line-height: 35px;
		border-radius: 4px;
		cursor: pointer;
	}
	.abolishBox{
		width: 80px;
		height: 35px;
		display: inline-block;
		font-size: 14px;
		color: #ffffff;
		background-color: #aeaeae;
		text-align: center;
		line-height: 35px;
		border-radius: 4px;
		cursor: pointer;
	}
    .selectApprovalTop{
		width: 100%;
		height: 60px;
		color: #303030;
		font-size: 16px;
		text-align: center;
		line-height: 60px;
		border-bottom:1px solid #d7d7d7;
	}
    .approvalMaskLayer{
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.1);
		z-index: 9999;
	}
	.selectApprovalBox{
		width: 960px;
		height: 560px;
		box-shadow: 0 5px 14px rgba(0, 0, 0, 0.5);
		animation: madalsBox 0.8s;
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
		border-radius: 4px;
	}
	@keyframes madalsBox {
		from {
			transform: translateY(-200px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
    .approveBot{
		margin-top: 10px;
		margin-left: 10px;
	}

	.el-radio{
		display: block!important;
		margin-left: 20px!important;
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
		/* border: 1px solid #E7744A; */
		color: #E7744A;
		border-radius: 4px;
		padding: 5px 10px;
		/* cursor: pointer; */
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
  .unconditional{
	  width:calc(100% - 24px);
	  border: 1px  solid #cccccc;
	  height: 160px;
	  margin-top: 20px;
      margin-left: 10px;
	  position: relative;
  }
  .addApprover,
  .unApproval{
	  margin:40px 40px;
	  display: inline-block;
	  position: relative;
  }
  .addApprover img,
  .unApproval img{
	  width: 60px;
	  height: 60px;
	  border-radius: 50%;
	  margin-left: 6px;
  }
  .addApprover p{
	  margin-left: 12px;
	  margin-top: 10px;
  }
  .unApproval p{
	  margin-left: -4px;
	  margin-top: 10px;
	  cursor: pointer;
	  color:#E7744A;
  }
  #arrows{
	  display: inline-block;
	  margin-top: -80px;
  }
  .unApproval ::before{
	  content:url('../../../../static/img/arrows.png');
	  position: absolute;
	  left: 100px;
	  top: 20px;
  }
  .operation{
	  position: absolute;
      right: 10px;
	  bottom: 10px;
	  color: #E7744A;
	  font-size: 14px;
  }
  .operation :nth-child(1){
	  margin-right: 20px;
	  cursor: pointer;
  }
  .operation :nth-child(2){
	  margin-right: 10px;
	  cursor: pointer;
  }
</style>
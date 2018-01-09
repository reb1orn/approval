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
					<el-radio :label='1' >分条件设置审批人
						<p class='settingApproval' @click='getApprovalCondition()'  v-show="setApproval">设置审批条件</p>
					</el-radio>
				</el-radio-group>	
				<!-- 不分条件审批	-->
				<div class='unconditional' v-show='unconditional'>
                    <div class='addApprover' v-show='addApprovar'  v-for='(item,index) in usersArrs' :key='index'>
						 <div>
							<img :src=approvalImg alt="">
						 </div>
					     <div>
							 <p @click='addApprovars()'>{{item.userNick}}</p>
					     </div>		 
               <img :src=arrows alt="" id="arrows" v-show="!(index == usersArrs.length -1) ">
					</div>		 
                    <div class="unApproval" v-show='unApproval'>
						<div>
                            <img :src=approvalImg alt="">
						</div>
					    <div>
                            <p @click='addApprovars()'>请添加审批人</p>	
						</div>						 
					</div>
					<!-- <img :src=arrows alt="" id="arrows"> -->
					<div class='operation'>
						<span  @click='unApprovalempty()'>清空</span>
					    <span @click='unApprovalsettings()'>设置</span>	
					</div>		 		
				</div>
				<!-- 分条件审批 -->
				<div class='onconditional' v-show='separabilityConditional ' v-for='(item,index) in approveList' :key='index'>
					<div class="conditionTitle" :class='{conditionTitleColor:item.enabled == 1}' >当"{{item.content}}"时</div>
                    <div class='addApproverPeople' v-show='item.userVo.length !==0' v-for='(itemsa,index) in item.userVo' :key='index' >
											<div class="addImgArrow">
												<img :src=approvalImg alt="">	
											</div>
                      <div>
													<p >{{itemsa.userNick}}</p>
											</div>
                      <img :src=arrows alt="" id="arrows" v-show="!(index == item.userVo.length -1) ">
										</div>		 
                    <div class="unApprovalas" v-show='item.userVo.length ==0 '>
												<div>
													<img :src=approvalImg alt="">	
												</div>
												<div>
														<p @click='addApprovars(index)'>请添加审批人</p>	
												</div>
										</div>      
					<div class='operation'>
					    <span @click='deleteApprovalCondition(index)' v-show='item.enabled == 0'>删除</span>	
              <span  @click='emptyData(index)' v-show='item.enabled == 1'>清空</span>
					    <span @click='settings(index)' v-show='item.enabled == 1'>设置</span>	
					</div>
				</div>	
		</div>
	</div>
	    <!-- 选择成员时 -->
    <div v-show='ModalsShow' class="ModalsmemBox">
      <div class="Modalsmem">
        <div class="ModalsmemTop">
          选择成员
        </div>
        <div class="ModalsmemCenter">
          <div class="centerLeft">
            <div class="centerLeftTop">
              选择人员
            </div>
            <div class="centerLeftBot">
              <div class="centerLeftBotOne" @click='chooseCharge()'  style='margin-bottom:20px;cursor:pointer'>
                <div style='border:none;margin-top:20px;'>
                  <div class="centerLeftBotOneL" style='margin:20px 20px;'>
                    <img src="/static/img/user8-128x128.jpg" style='width:50px;height:50px;border-radius:50%;' alt="">
                  </div>
                  <div class="centerLeftBotOneI" style='padding-left:10px;'>
                    <!-- <input type="text" autofocus="autofocus" placeholder="搜索" v-model.trim="searchsmemVal"> -->
					主管(获取申请人通讯录中的主管)
					
                  </div>
                  <!-- <div v-show="searchsmemVal != ''"  class="centerLeftBotOneX" @click="clearSearchClick">
										<img src="/static/img/Group.png" alt="">
									</div> -->
                </div>
              </div>
              <div class="centerLeftBotTwo" style='border-top:1px solid #d7d7d7;padding-top:10px;'>
                <ul>
                  <li v-for="(item,index) in navLists" :key="index" @click="navClick(index)">
                    <div v-show="index !== 0">
                      >
                    </div>
                    <div>
                      {{item.name}}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="centerLeftBotThr">
                <div>
                  <el-checkbox v-model="checked" @change="numChange"></el-checkbox>
                </div>
                <div>
                  <span>全选</span>
                </div>
              </div>
              <div class="centerLeftBotFour">
                <ul>
                  <li v-for="(item,index) in selectLeftlists" :key="index">
                    <div class="centerLeftBotFourLiL">
                      <div  v-show="item.type == 2"  @click="lefthandleCheckedCitiesChange(index)">
                        <img v-show="item.open" src="/static/img/on@2x.png" alt="">
                        <img v-show="!item.open" src="/static/img/out@2x.png" alt="">
                      </div>
                      <div v-show="item.type == 1">
                        <img src="/static/img/member@2x.png" alt="">
                      </div>
                      <div>
                        {{item.name}}-{{item.type | typeFun}}
                      </div>
                    </div>
                    <div v-if="item.type == 1" class="centerLeftBotFourLiR" @click="leftNextClick(index)">
                      <div>
                        <img src="/static/img/can@2x.png" alt="">
                      </div>
                      <div>
                        下级
                      </div>
                    </div>
                    <div v-else v-show="item.type == 1" class="centerLeftBotFourLiR" @click="leftNextClick(index)">
                      <div>
                        <img src="/static/img/canon@2x.png" alt="">
                      </div>
                      <div id="nocenterLeftBotFourLiR">
                        下级
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="centerCenter">
            <div @click="commodityLeftClick">
              <img src="/static/img/xright@2x.png" alt="">
            </div>
            <div @click="commodityRightClick">
              <img src="/static/img/xleft@2x.png" alt="">
            </div>
          </div>
          <div class="centerRight">
            <div class="centerRightTop">
              已选人员
            </div>
            <div class="centerRightBot">
              <ul>
                <li v-for="(item,index) in selectRightlists" :key="index" @click="righthandleCheckedCitiesChange(index)">
                  <div class="centerRightBotLiL">
                    <div>
                      <img v-show="item.open" src="/static/img/on@2x.png" alt="">
                      <img v-show="!item.open" src="/static/img/out@2x.png" alt="">
                    </div>
                    <div v-show="item.type == 1">
                      <img src="/static/img/member@2x.png" alt="">
                    </div>
                    <div>
                      {{item.name}}-{{item.type | typeFun}}
                    </div>
                  </div>
                  <div class="centerRightBotLiR">
                    <div>
                      <!-- <img src="/static/img/清空@2x.png" alt=""> -->
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="ModalsmemBot">
          <div @click="confirmClick">
            确定
          </div>
          <div @click="cancelClick">
            取消
          </div>
        </div>
      </div>
    </div>
	<!-- 设置审批人弹出框 -->
	<div class='approvalMaskLayer' v-show="approvalMaskLayer">
		<div class='selectApprovalBox'>
			   <div class="selectApprovalTop">选择审批人</div>
			   <div class="selectApprovalCentant">
					<div class="selectApprovalLeft"></div>
					<div class="selectApprovalRight">
						<div class="selectApprovalRightTOP"></div>              
						<div class="selectApprovalRightBot">
							<div class="chooseApproval" v-for='(item,index) in ztreeData' :key='index'>
								<div class="approvalTitle">{{item.name}}</div>
							</div>
						</div>   
					</div>
			   </div>
               <div class="selectApprovalBot">
				     <div class="saveApproval" @click='saveAppval()'>保存</div>
					 <div class="abolishBox" @click='abolish()'>取消</div> 
			   </div>  
		</div>
	</div>
	<!-- 设置审批条件弹出框 -->
	<div class='approvalMaskLayer' v-show="conditionApprovalMaskLayer">
		<div class='selectApprovalConditionBox'>
			   <div class="selectApprovalTop">设置审批条件
				   <!-- <p class='onlyOne'>只能指定一个组件为审批条件</p> -->
			   </div>
         <div class="unConditionContant" v-show="unConditionContant">暂无审批条件</div>
			   <div class="conditionContant" v-show='conditionContant'>
				   <el-radio-group v-model="radioCondition" @change="radioConditionSelet()">
						<el-radio :label='3' >请假类型</el-radio>
						<el-radio :label='6' >请假天数</el-radio>						
					</el-radio-group> 
						<p class='settingApprovalCondition'  v-show="setApprovalCondition">选送内容将会作为审批条件:</p>
						<p class='settingApprovalCondition'  v-show="setApprovalConditionDay">请输入“请假天数”的分隔数字，我们将为您自动生成数值区间作为审批条件:</p>	
			        <div class='TypeApprovalAudit' v-show="TypeApprovalAudit">
					        <ul>
							   <li v-for='(item ,index) in items' :key='index'>{{item}}</li>
						    </ul>	
					</div>
					<div class="counterNumber" v-show="counterNumber">
					      <input v-model="period" type="number" />	
						    <img :src=exampleImg  alt="">
					</div>	
			   </div>
               <div class="selectApprovalBot">
				     <div class="saveApproval" @click='saveApprovalCondition()'>保存</div>
					 <div class="abolishBox" @click='conditionAbolish()'>取消</div> 
			   </div>  
		</div>
	</div>	
	
  </div>	
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "set",
  data() {
    return {
      conditionContant:false,
      unConditionContant:false,
      ModalsShow: false,
      searchsmemVal: "",
      ztreeData: [],
      field: "",
      period: "",
      setApprovalConditionDay: false,
      addApprovarCondition: false,
      unApprovalCondition: false,
      separabilityConditional: false,
      IsconditionTitleColor: false,
      exampleImg: "./static/img/Tb.png",
      counterNumber: false,
      TypeApprovalAudit: false,
      items: [
        { approvalName: "请假" },
        { approvalName: "请假" },
        { approvalName: "请假" },
        { approvalName: "请假" }
      ],
      radioCondition: 3,
      setApprovalCondition: false,
      conditionApprovalMaskLayer: false,
      setApproval: false,
      approvalMaskLayer: false,
      data: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      arrows: "./static/img/arrows.png",
      empty: false,
      unApproval: false,
      addApprovar: false,
      unconditional: false,
      radio2: 1,
      itemsa: [],
      modelName: "",
      setting: "",
      approveList: [],
      usersArrs: [],
      modelId: "",
      approvalImg: "./static/img/user8-128x128.jpg",
      navLists: [],
      checked: false,
      selectLeftlists: [],
      selectRightlists: [],
      counter: 0,
      conditions: "",
      fields:''
    };
  },

  created: function() {
     // 若此人中途无权限，则跳到登录页
    this.getbusiness({
      oid: sessionStorage.getItem("orgId"),
      uid: sessionStorage.getItem("userId")
    })
      .then(data => {
        if(data.code == "100005"){
          this.$message({
            type: "info",
            message: '对不起，没有权限'
          });
          this.$router.push({
            path:'/login'
          })
        }
      })
      .catch(msg => {
        if (JSON.parse(msg.bodyText).code == "188888") {
          this.$message({
            type: "info",
            message: JSON.parse(msg.bodyText).msg
          });
          this.$router.push({
            path: "/login"
          });
        } else {
          this.$message({
            type: "info",
            message: "服务器错误!"
          });
        }
      });
    this.listFun();
    this.modelId = sessionStorage.getItem("modelId");
    this.modelName = sessionStorage.getItem("modelName");
    this.setting = sessionStorage.getItem("setting");
    this.approveList = JSON.parse(sessionStorage.getItem("approveList"));
    this.usersArrs = JSON.parse(sessionStorage.getItem("usersArrs"));
    if (this.setting == 0) {
      this.radio2 = 0;
    } else if (this.setting == 1) {
      this.radio2 = 1;
    } else if (this.setting == 2) {
      this.radio2 = 2;
    }
    this.radioSelet();
    // this.companyList();
    this.radioConditionSelet();
  },
  watch: {
    period: function(newVal, oldVal) {
      const regex = /^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$/;
      if (!regex.test(newVal)) {
        //如果小于等于零
        this.period = oldVal; //恢复原值
      }
    }
    //  radioSelet(){
    // 	let self = this
    // 	if(self.radio2 == 2){
    // 		self.unconditional = false
    // 	 	self.getapprovalsaveSetItem({
    // 		  modelId:self.modelId ,
    // 		  setting:2
    // 	   }).then((data)=>{
    // 		   if(data.code == '000000'){

    // 		   }else{
    // 			   this.$message({
    // 				   type:'info',
    // 				   message:data.msg
    // 			   })
    // 		   }
    // 	   }).catch(msg=>{
    // 		   this.$message({
								// type: "info",
								// message: msg.statusText
							// });
    // 	   })
    // 	}else if(self.radio2 == 0){
    // 	  self.unconditional = true
    // 	  if(self.usersArrs.length !== 0){
    // 		   self.addApprovar = true
    // 		   self.empty = true
    // 	  }else{
    // 		  self.empty = false
    // 		  self.unApproval = true
    // 	  }
    // 	  self.getapprovalsaveSetItem({
    // 		  modelId:self.modelId ,
    // 		  setting:0
    // 	   }).then((data)=>{
    // 		   if(data.code == '000000'){

    // 		   }else{
    // 			   this.$message({
    // 				   type:'info',
    // 				   message:data.msg
    // 			   })
    // 		   }
    // 	   }).catch(msg=>{
    // 		   this.$message({
							// 	type: "info",
							// 	message: msg.statusText
							// });
    // 	   })
    // 	}else if(self.radio2 == 1){
    // 		self.unconditional = false
    // 		if(self.approveList.userVo.length == 0){
    // 			self.unApprovalCondition = true
    // 			self.addApprovalCondition = false
    // 		}else{
    // 			self.unApprovalCondition = false
    // 			self.addApprovalCondition = true
    // 		}
    // 	self.getapprovalsaveSetItem({
    // 		  modelId:self.modelId ,
    // 		  setting:1
    // 	   }).then((data)=>{
    // 		    if(data.code == '000000'){

    // 		   }else{
    // 			   this.$message({
    // 				   type:'info',
    // 				   message:data.msg
    // 			   })
    // 		   }
    // 	   }).catch(msg=>{
              // this.$message({
							// 	type: "info",
							// 	message: msg.statusText
							// });
    // 	   })
    // 	}

    // },
  },
  filters: {
    typeFun: function(val) {
      if (val == 1) {
        return "部门";
      } else {
        return "人员";
      }
    }
  },
  methods: {
    chooseCharge() {
      let self = this;
      self.counter += 1;
      self.selectRightlists.push({
        id: "admin_1_" + self.counter,
        name: "第" + self.counter + "级主管",
        open: false
      });
    },
    listFun() {
					var self = this;
					self.sBelectLeftlists = [];
					self.selectLeftlists = [];
					self.navLists = [];
					self.nBavLists = [];
					self.checked = false;
					// 查询人员列表
					this.getdeptstaff({
						oid: sessionStorage.getItem("orgId"),
						uid: sessionStorage.getItem("userId"),
						deptId: ""
					})
						.then(data => {
						if (data.code == "000000") {
							self.navLists.push({ name: data.data.name, deptId: data.data.id });
							self.nBavLists.push({ name: data.data.name, deptId: data.data.id });
							this.getdeptstaff({
							oid: sessionStorage.getItem("orgId"),
							uid: sessionStorage.getItem("userId"),
							deptId: self.navLists[0].deptId
							})
							.then(data => {
								if (data.code == "000000") {
								data.data.forEach(function(ele, ind) {
									self.selectLeftlists.push({
									name: ele.name,
									open: false,
									parentId: ele.parentId,
									type: ele.type,
									id: ele.id
									});
								});
								self.selectLeftlists.forEach(function(eleLeft, eleLeftInd) {
									self.selectRightlists.forEach(function(eleRight, rightInd) {
									if (eleLeft.id == eleRight.id) {
										self.selectLeftlists[eleLeftInd].open = true;
									}
									});
								});
								var rArrs = [];
								this.selectLeftlists.forEach(function(ele, ind) {
									if (ele.open == true) {
									rArrs.push({
										name: ele.name,
										open: false,
										parentId: ele.parentId,
										type: ele.type,
										id: ele.id
									});
									}
								});
								var hash = {};
								rArrs = rArrs.reduce(function(item, next) {
									hash[next.id]
									? ""
									: (hash[next.id] = true && item.push(next));
									return item;
								}, []);
								if (rArrs.length == this.selectLeftlists.length) {
									self.checked = true;
								} else {
									self.checked = false;
								}
								} else if (data.code == "100005") {
								self.$message(data.msg);
								self.$router.push({
									path: "/login"
								});
								} else {
							
								}
							})
							.catch(msg => {
									this.$message({
										type: "info",
										message: msg.statusText
									});
							});
				
						} 
						})
						.catch(msg => {
							this.$message({
								type: "info",
								message: msg.statusText
							});
						});
					self.xiaLists = [];
				},
    // 选择成员弹出框取消
    cancelClick() {
      var self = this;
      this.selectRightlists = [];
      this.selectLeftlists.forEach(function(ele) {
        ele.open = false;
      });
      this.ModalsShow = false;
      self.counter = 0;
    },
    //选择成员弹出框确认
    confirmClick() {
      var self = this;
      this.searchsmemVal = "";
      this.ModalsShow = false;
      var val = "";
      self.selectinputRightlists = [];
      this.selectRightlists.forEach(function(ele, ind) {
        self.selectinputRightlists.push({
          name: ele.name,
          open: false,
          parentId: ele.parentId,
          type: ele.type,
          id: ele.id
        });
      });
      var selectRightlistsHash = {};
      self.selectinputRightlists = self.selectinputRightlists.reduce(function(
        item,
        next
      ) {
        selectRightlistsHash[next.id]
          ? ""
          : (selectRightlistsHash[next.id] = true && item.push(next));
        return item;
      },
      []);
      self.uidsVal = "";
      if (this.selectinputRightlists.length == 1) {
        val = this.selectinputRightlists[0].name;
        self.uidsVal = this.selectinputRightlists[0].id;
      } else {
        this.selectinputRightlists.forEach(function(ele, ind) {
          val += ele.name + ",";
          self.uidsVal += ele.id + ",";
        });
        self.uidsVal = self.uidsVal.substr(0, self.uidsVal.length - 1);
      }
      this.selectMembersVal = val;
      self.counter = 0;
      if(self.conditions !== undefined ){
        self.getapprovalupdateProcess({
          modelId: self.modelId,
          conditionId: self.approveList[self.conditions].conditions,
          userArray: self.uidsVal
        })
        .then(data => {
          if (data.code == "000000") {
            self.getapprovalSetItem({
             modelId:self.modelId 
            }).then((data)=>{
              if(data.code == '000000'){
               self.approveList = data.data.list
              }else{
                this.$message({
                  type: "info",
                  message: data.msg
                }); 
              }
            }).catch(msg=>{
              this.$message({
								type: "info",
								message: msg.statusText
							}); 
            })
            this.$message({
              type: "success",
              message: "设置成功！"
            });
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
          }
        })
        .catch(msg => {
          this.$message({
								type: "info",
								message: msg.statusText
							});
        });
      }else if(self.conditions == undefined ){
        self.getapprovalupdateProcess({
          modelId: self.modelId,
          conditionId: '',
          userArray: self.uidsVal
        })
        .then(data => {
          if (data.code == "000000") {
            self.getapprovalSetItem({
             modelId:self.modelId 
            }).then((data)=>{
              if(data.code == '000000'){
               self.usersArrs = data.data.users
               self.unApproval = false
               self.addApprovar = true
              }else{
                this.$message({
                  type: "info",
                  message: data.msg
                }); 
              }
            }).catch(msg=>{
              this.$message({
								type: "info",
								message: msg.statusText
							}); 
            })
            this.$message({
              type: "success",
              message: "设置成功！"
            });
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
          }
        })
        .catch(msg => {
          this.$message({
								type: "info",
								message: msg.statusText
							});
        });
      }
      
    },
    righthandleCheckedCitiesChange(index) {
      var self = this;
      this.selectRightlists[index].open = !this.selectRightlists[index].open;
    },
    commodityRightClick() {
      var self = this;
      var rights = [];
      var seRight = [];
      self.selectRightlists.forEach(function(ele, ind) {
        if (ele.open == false) {
          rights.push({
            name: ele.name,
            open: false,
            parentId: ele.parentId,
            type: ele.type,
            id: ele.id
          });
        } else {
          seRight.push({
            name: ele.name,
            open: false,
            parentId: ele.parentId,
            type: ele.type,
            id: ele.id
          });
        }
      });
      self.selectRightlists = rights;
      this.selectLeftlists.forEach(function(eleL, indL) {
        seRight.forEach(function(ele, ind) {
          if (eleL.id === ele.id) {
            self.selectLeftlists[indL].open = false;
          }
        });
      });

      this.selectLeftlists.forEach(function(eleL, indL) {
        rights.forEach(function(ele, ind) {
          if (eleL.id === ele.id) {
            self.selectLeftlists[indL].open = true;
          }
        });
      });
      var rtArrs = [];
      this.selectLeftlists.forEach(function(ele, ind) {
        if (ele.open == true) {
          rtArrs.push({
            name: ele.name,
            open: false,
            parentId: ele.parentId,
            type: ele.type,
            id: ele.id
          });
        }
      });
      var rfArrs = [];
      this.selectLeftlists.forEach(function(ele, ind) {
        if (ele.type == 2) {
          rfArrs.push({
            name: ele.name,
            open: false,
            parentId: ele.parentId,
            type: ele.type,
            id: ele.id
          });
        }
      });
      var hashf = {};
      rfArrs = rfArrs.reduce(function(item, next) {
        hashf[next.id] ? "" : (hashf[next.id] = true && item.push(next));
        return item;
      }, []);
      var hasht = {};
      rtArrs = rtArrs.reduce(function(item, next) {
        hasht[next.id] ? "" : (hasht[next.id] = true && item.push(next));
        return item;
      }, []);
      if (rtArrs.length == rfArrs.length) {
        self.checked = true;
      } else {
        self.checked = false;
      }
    },
    commodityLeftClick() {
      var self = this;
      var rArrs = [];
      this.selectLeftlists.forEach(function(ele, ind) {
        if (ele.open == true) {
          self.selectRightlists.push({
            name: ele.name,
            open: false,
            parentId: ele.parentId,
            type: ele.type,
            id: ele.id
          });
        }
      });
      var hash = {};
      self.selectRightlists = self.selectRightlists.reduce(function(
        item,
        next
      ) {
        hash[next.id] ? "" : (hash[next.id] = true && item.push(next));
        return item;
      },
      []);
    },
    // 人员下一级
    leftNextClick(index) {
      var self = this;
      this.getdeptstaff({
        oid: sessionStorage.getItem("orgId"),
        uid: sessionStorage.getItem("userId"),
        deptId: self.selectLeftlists[index].id
      })
        .then(data => {
          if (data.code == "000000") {
            self.navLists.push({
              name: self.selectLeftlists[index].name,
              deptId: self.selectLeftlists[index].id
            });
            self.selectLeftlists = [];
            data.data.forEach(function(ele, ind) {
              self.selectLeftlists.push({
                name: ele.name,
                open: false,
                parentId: ele.parentId,
                type: ele.type,
                id: ele.id
              });
            });
            self.selectLeftlists.forEach(function(eleLeft, eleLeftInd) {
              self.selectRightlists.forEach(function(eleRight, rightInd) {
                if (eleLeft.id == eleRight.id) {
                  self.selectLeftlists[eleLeftInd].open = true;
                }
              });
            });
            var rArrs = [];
            this.selectLeftlists.forEach(function(ele, ind) {
              if (ele.open == true) {
                rArrs.push({
                  name: ele.name,
                  open: false,
                  parentId: ele.parentId,
                  type: ele.type,
                  id: ele.id
                });
              }
            });
            var hash = {};
            rArrs = rArrs.reduce(function(item, next) {
              hash[next.id] ? "" : (hash[next.id] = true && item.push(next));
              return item;
            }, []);
            if (rArrs.length == this.selectLeftlists.length) {
              self.checked = true;
            } else {
              self.checked = false;
            }
          } else if (data.code == "100005") {
            self.$message(data.msg);
            self.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
          }
        })
        .catch(msg => {
          this.$message({
								type: "info",
								message: msg.statusText
							});
        });
    },
    // 人员添加选中
    lefthandleCheckedCitiesChange(index) {
      var self = this;
      if (this.selectLeftlists[index].type == 2) {
        this.selectLeftlists[index].open = !this.selectLeftlists[index].open;
        var rtArrs = [];
        this.selectLeftlists.forEach(function(ele, ind) {
          if (ele.open == true) {
            rtArrs.push({
              name: ele.name,
              open: false,
              parentId: ele.parentId,
              type: ele.type,
              id: ele.id
            });
          }
        });
        var rfArrs = [];
        this.selectLeftlists.forEach(function(ele, ind) {
          if (ele.type == 2) {
            rfArrs.push({
              name: ele.name,
              open: false,
              parentId: ele.parentId,
              type: ele.type,
              id: ele.id
            });
          }
        });
        var hashf = {};
        rfArrs = rfArrs.reduce(function(item, next) {
          hashf[next.id] ? "" : (hashf[next.id] = true && item.push(next));
          return item;
        }, []);
        var hasht = {};
        rtArrs = rtArrs.reduce(function(item, next) {
          hasht[next.id] ? "" : (hasht[next.id] = true && item.push(next));
          return item;
        }, []);
        if (rtArrs.length == rfArrs.length) {
          self.checked = true;
        } else {
          self.checked = false;
        }
      } else {
        this.$message({
          type: "info",
          message: "请选择人员，你现在选择的是部门!"
        });
      }
    },
    // 人员所有序号被选中时
    numChange(event) {
      if (event.target.checked) {
        this.selectLeftlists.forEach(function(ele, ind) {
          if (ele.type == 2) {
            ele.open = true;
          }
        });
      } else {
        this.selectLeftlists.forEach(function(ele, ind) {
          if (ele.type == 2) {
            ele.open = false;
          }
        });
      }
      // var qOrR = true;
      // this.selectLeftlists.forEach(function(ele, ind) {
      //   if (ele.type == 1) {
      //     qOrR = false;
      //   }
      // });
      // if (qOrR == false) {
      //   this.$message({
      //     type: "info",
      //     message: "请选择人员，你所选择的包含了部门!"
      //   });
      //   this.checked = false;
      // } else {
      //   if (event.target.checked) {
      //     this.selectLeftlists.forEach(function(ele, ind) {
      //       ele.open = true;
      //     });
      //   } else {
      //     this.selectLeftlists.forEach(function(ele, ind) {
      //       ele.open = false;
      //     });
      //   }
      // }
    },
    // 人员导航选择
    navClick(index) {
      var self = this;
      this.getdeptstaff({
        oid: sessionStorage.getItem("orgId"),
        uid: sessionStorage.getItem("userId"),
        deptId: self.navLists[index].deptId
      })
        .then(data => {
          if (data.code == "000000") {
            var start = index + 1;
            self.navLists.splice(start, 1);
            self.selectLeftlists = [];
            data.data.forEach(function(ele, ind) {
              self.selectLeftlists.push({
                name: ele.name,
                open: false,
                parentId: ele.parentId,
                type: ele.type,
                id: ele.id
              });
            });
            self.selectLeftlists.forEach(function(eleLeft, eleLeftInd) {
              self.selectRightlists.forEach(function(eleRight, rightInd) {
                if (eleLeft.id == eleRight.id) {
                  self.selectLeftlists[eleLeftInd].open = true;
                }
              });
            });

            var rArrs = [];
            this.selectLeftlists.forEach(function(ele, ind) {
              if (ele.open == true) {
                rArrs.push({
                  name: ele.name,
                  open: false,
                  parentId: ele.parentId,
                  type: ele.type,
                  id: ele.id
                });
              }
            });
            var hash = {};
            rArrs = rArrs.reduce(function(item, next) {
              hash[next.id] ? "" : (hash[next.id] = true && item.push(next));
              return item;
            }, []);
            if (rArrs.length == this.selectLeftlists.length) {
              self.checked = true;
            } else {
              self.checked = false;
            }
          } else if (data.code == "100005") {
            self.$message(data.msg);
            self.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
          }
        })
        .catch(msg => {
          this.$message({
								type: "info",
								message: msg.statusText
							});
        });
    },
    clearSearchClick() {
      this.searchsmemVal = "";
    },
    // 选择审批条件
    radioConditionSelet() {
      let self = this;
      if (self.radioCondition == "3") {
        self.TypeApprovalAudit = true;
        self.setApprovalCondition = true;
        self.setApprovalConditionDay = false;
        self.counterNumber = false;
      } else if (self.radioCondition == "6") {
        self.TypeApprovalAudit = false;
        self.setApprovalConditionDay = true;
        self.setApprovalCondition = false;
        self.counterNumber = true;
      }
    },
    // 取消设置审批条件
    conditionAbolish() {
      let self = this;
      self.conditionApprovalMaskLayer = false;
      self.period = ''
    },
    // 设置审批条件
    settingCondition() {},
    // 选择审批人弹出框
    addApprovars(index) {
      this.ModalsShow = true;
      this.conditions = index;
      console.log(this.conditions);
    },
    // 取消弹出框
    abolish() {
      this.approvalMaskLayer = false;
    },
    // 树结构点击选择审批人
    handleNodeClick(data) {
      if (data.children == undefined) {
        if (data.userName == undefined) {
        } else {
          console.log("这里push进新数组！");
        }
      } else {
      }
    },
    // 删除审批条件
    deleteApprovalCondition(index) {
      let self = this;
      self
        .getapprovalcdndelete({
          modelId: self.modelId,
          conditions: self.approveList[index].conditions
        })
        .then(data => {
          if (data.code == "000000") {
            this.$message({
              type: "success",
              message: '删除成功！'
            });
            self
              .getapprovalSetItem({
                modelId: self.modelId
              })
              .then(data => {
                if (data.code == "000000") {
                  self.approveList = JSON.parse(JSON.stringify(data.data.list));
                } else {
                  this.$message({
                    type: "info",
                    message: data.msg
                  });
                }
              })
              .catch(msg => {
                this.$message({
								type: "info",
								message: msg.statusText
							});
              });
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
          }
        })
        .catch(msg => {
          this.$message({
								type: "info",
								message: msg.statusText
							});
        });
    },
    // 保存审批条件
    saveApprovalCondition() {
      let self = this;
      if(self.radioCondition == '3'){
        self.getapprovalcdnsave({
          modelId: self.modelId,
          field: self.field
          //  numbers:
        })
        .then((data) => {
          if (data.code == "000000") {
            self.approveList = JSON.parse(JSON.stringify(data.data))
            self.conditionApprovalMaskLayer = false;
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
          }
        })
        .catch(msg => {
          this.$message({
								type: "info",
								message: msg.statusText
							});
        });
      }else if(self.radioCondition == '6'){
       self.getapprovalcdnsave({
          modelId: self.modelId,
          field: self.fields,
          numbers:self.period
        })
        .then((data) => {
          if (data.code == "000000") {
            self.approveList = JSON.parse(JSON.stringify(data.data))
            self.conditionApprovalMaskLayer = false;
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
          }
        })
        .catch(msg => {
          this.$message({
								type: "info",
								message: msg.statusText
							});
        }); 
        self.period = ''
      }
      
      

    },
    // 获取审批条件
    getApprovalCondition() {
      let self = this;
      self.conditionApprovalMaskLayer = true;
      self.getapprovalcdnget({
          modelId: self.modelId
        })
        .then(data => {
          if (data.code == "000000") {
            // data.data = JSON.parse(JSON.stringify(data.data))
            if(data.data.length == 0){
              self.unConditionContant = true
              self.conditionContant = false
            }else{
            self.unConditionContant = false
            self.conditionContant = true
              self.items = data.data[0].optValue.split(",");
              self.field = data.data[0].field;
              self.fields = data.data[1].field
            }
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
          }
        })
        .catch(msg => {
          this.$message({
								type: "info",
								message: msg.statusText
							});
        });
    },
    // 获取公司部门信息
    companyList() {
      let self = this;
      self
        .getdeptGetOrgTreeAndUser({
          oid: sessionStorage.getItem("orgId"),
          uid: sessionStorage.getItem("userId")
        })
        .then(data => {
          if (data.code == "000000") {
            self.ztreeData = data.data;
            // console.log(self.data)
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
          }
        })
        .catch(msg => {
         this.$message({
								type: "info",
								message: msg.statusText
							});
        });
    },
    // 不分条件审批-清空审批流程
    unApprovalempty(){
      let self = this;
      self.getapprovaldeleteProcess({
          modelId: self.modelId,
          conditionId: ''
        })
        .then(data => {
          if (data.code == "000000") {
            this.$message({
              type: "success",
              message: "清空成功！"
            });
            self.usersArrs = [];
            self.unApproval = true;
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
          }
        })
        .catch(msg => {
          this.$message({
								type: "info",
								message: msg.statusText
							});
        }); 
    },
    // 分条件-清空审批流程
    emptyData(index) {
      let self = this;
      self.getapprovaldeleteProcess({
          modelId: self.modelId,
          conditionId: self.approveList[index].conditions
        })
        .then(data => {
          if (data.code == "000000") {
            self.getapprovalSetItem({
             modelId:self.modelId 
            }).then((data)=>{
              if(data.code == '000000'){
               self.approveList = data.data.list
              }else{
                this.$message({
                  type: "info",
                  message: data.msg
                }); 
              }
            }).catch(msg=>{
              this.$message({
								type: "info",
								message: msg.statusText
							}); 
            })
            this.$message({
              type: "success",
              message: "清空成功！"
            });
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
          }
        })
        .catch(msg => {
          this.$message({
								type: "info",
								message: msg.statusText
							});
        });
    },
    // 保存审批流程
    saveAppval() {
      let self = this;
      let arr = [1, 2, 3];
      self
        .getapprovalupdateProcess({
          modelId: self.modelId,
          conditionId: "",
          userArray: JSON.stringify(arr)
        })
        .then(data => {
          if (data.code == "000000") {
            this.$message({
              type: "success",
              message: "设置成功！"
            });
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
          }
        })
        .catch(msg => {
         this.$message({
								type: "info",
								message: msg.statusText
							});
        });
    },
    unApprovalsettings(){
      let self = this
      self.ModalsShow = true;
    },
    // 设置审批流程
    settings(index) {
      let self = this;
      self.conditions = index
      self.ModalsShow = true;
    },
    // 选择单选按钮，发送设置项
    radioSelet() {
      let self = this;
      if (self.radio2 == 2) {
        self.separabilityConditional = false;
        self.unconditional = false;
        self.setApproval = false;
        self
          .getapprovalsaveSetItem({
            modelId: self.modelId,
            setting: 2
          })
          .then(data => {
            if (data.code == "000000") {
            } else {
              this.$message({
                type: "info",
                message: data.msg
              });
            }
          })
          .catch(msg => {
            this.$message({
								type: "info",
								message: msg.statusText
							});
          });
      } else if (self.radio2 == 0) {
        self.setApproval = false;
        self.separabilityConditional = false;
        self.unconditional = true;
        if (self.usersArrs.length !== 0) {
          self.separabilityConditional = false;
          self.addApprovar = true;
          self.empty = true;
        } else {
          self.empty = false;
          self.unApproval = true;
        }
        self
          .getapprovalsaveSetItem({
            modelId: self.modelId,
            setting: 0
          })
          .then(data => {
            if (data.code == "000000") {
            } else {
              this.$message({
                type: "info",
                message: data.msg
              });
            }
          })
          .catch(msg => {
            this.$message({
								type: "info",
								message: msg.statusText
							});
          });
      } else if (self.radio2 == 1) {
        self.separabilityConditional = true;
        self.setApproval = true;
        self.unconditional = false;
        self
          .getapprovalsaveSetItem({
            modelId: self.modelId,
            setting: 1
          })
          .then(data => {
            if (data.code == "000000") {
            } else {
              this.$message({
                type: "info",
                message: data.msg
              });
            }
          })
          .catch(msg => {
            this.$message({
								type: "info",
								message: msg.statusText
							});
          });
      }
    },

    ...mapActions([
      'getbusiness',
      'getapprovalSetItem',
      "getdeptstaff",
      "getdeptgetchild",
      "getOrgTreeList",
      "getadminsave",
      "getauthgetAllAuth",
      "getRequestList",
      "getapprovalSetItem",
      "getdeptGetOrgTreeAndUser",
      "getapprovalcdndelete",
      "getapprovalcdnsave",
      "getapprovalcdnget",
      "getBranchMemberlist",
      "getOrgTreeList",
      "getapprovalList",
      "getapprovalsaveSetItem",
      "getapprovalupdateProcess",
      "getapprovaldeleteProcess"
    ])
  }
};
</script>
<style scoped>
.unConditionContant{
  width: 100%;
  height: 410px;
  text-align: center;
  line-height: 410px;
  color: #303030;
  font-size: 20px;
}
.addApproverPeople{
  float: left;
  margin-left: 40px;
  margin-top: 40px;
}
.addApproverPeople img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.addApproverPeople p{
  width: 64px;
  text-align: center;
  margin-top: 10px;
}
.conditionTitle {
  height: 50px;
  width: 100%;
  color: #303030;
  font-size: 14px;
  padding-left: 10px;
  line-height: 50px;
  border-bottom: 1px solid #d7d7d7;
  letter-spacing: 2px;
}
.conditionTitleColor {
  color: #e7744a !important;
}
.counterNumber {
  width: 100%;
}
.counterNumber input {
  width: 200px;
  height: 30px;
  border-radius: 4px;
  padding-left: 4px;
  line-height: 30px;
  border: 1px solid #e7744a;
  margin-left: 30px;
  margin-top: 10px;
}
.counterNumber img {
  margin-left: 30px;
  margin-top: 10px;
}
.TypeApprovalAudit {
  width: 100%;
}
.TypeApprovalAudit ul li {
  display: inline-block;
  margin-left: 30px;
  margin-top: 10px;
  background-color: #e7744a;
  color: #ffffff;
  font-size: 14px;
  border-radius: 4px;
  width: 60px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
}
.conditionContant {
  width: 100%;
  height: 410px;
  padding-left: 10px;
  padding-top: 10px;
}
.settingApprovalCondition {
  margin-left: 30px;
  margin-top: 10px;
  font-size: 12px;
}
.onlyOne {
  font-size: 12px;
  color: #303030;
  margin-left: 10px;
}
.settingApproval {
  display: inline-block;
  width: 100px;
  height: 20px;
  border: 1px solid #e7744a;
  text-align: center;
  line-height: 20px;
  color: #303030 !important;
  border-radius: 4px;
  margin-left: 10px;
}
.selectApprovalRightBot {
  width: 100%;
  overflow-y: scroll;
  height: 340px;
}
.selectApprovalRightTOP {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #cccccc;
}
.selectApprovalCentant {
  width: 100%;
  height: 410px;
  /* background-color: #aeaeae; */
}
.selectApprovalLeft {
  float: left;
  width: 45%;
  height: 410px;
  border: 1px solid #d7d7d7;
  margin-left: 10px;
  /* background-color: #ffffff; */
}
.selectApprovalRight {
  float: right;
  width: 45%;
  height: 410px;
  border: 1px solid #d7d7d7;
  margin-right: 10px;
  /* background-color: #ffffff; */
}
.selectApprovalBot {
  width: 100%;
  text-align: center;
}
.saveApproval {
  width: 80px;
  height: 35px;
  display: inline-block;
  margin-right: 20px;
  font-size: 14px;
  color: #f4f4f6;
  background-color: #e7744a;
  text-align: center;
  line-height: 35px;
  border-radius: 4px;
  cursor: pointer;
}
.abolishBox {
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
.selectApprovalTop {
  width: 100%;
  height: 60px;
  color: #303030;
  font-size: 16px;
  text-align: center;
  line-height: 60px;
  border-bottom: 1px solid #d7d7d7;
}
.approvalMaskLayer {
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
.selectApprovalConditionBox {
  width: 660px;
  height: 560px;
  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.5);
  animation: madalsBox 0.8s;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  border-radius: 4px;
}
.selectApprovalBox {
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
.approveBot {
  margin-top: 10px;
  margin-left: 10px;
}

.el-radio {
  display: block !important;
  margin-left: 20px !important;
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
  color: #e7744a;
  border-radius: 4px;
  padding: 5px 10px;
  /* cursor: pointer; */
}

.unconditional {
  width: calc(100% - 24px);
  border: 1px solid #cccccc;
  height: 160px;
  margin-top: 20px;
  margin-left: 10px;
  position: relative;
  overflow-y: scroll;
}
.onconditional {
  width: calc(100% - 24px);
  border: 1px solid #cccccc;
  height: 200px;
  margin-top: 20px;
  margin-left: 10px;
  position: relative;
  overflow-y: scroll;
}
.addApprover,
.unApproval {
  width: 100px;
  height: 100%;
  float: left;
  position: relative;
  /* margin: 40px 40px; */
  margin-left: 40px;
  margin-top: 40px;
}
.unApprovalas {
  width: 100px;
  height: 100%;
  /* float: left; */
  position: relative;
  margin: 40px 40px;
}
.unApprovalas > div > img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: 0px;
}
.addApprover > div > img,
.unApproval > div > img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: 0px;
}
/* .addApprover img,
  .unApproval img{
	  width: 60px;
	  height: 60px;
	  border-radius: 50%;
	  margin-left: 6px;
  } */
.addApprover > div > p {
  width: 64px;
  text-align: center;
  /* margin-left: 10px; */
  margin-top: 10px;
}
.unApproval > div > p {
  margin-left: -4px;
  margin-top: 10px;
  cursor: pointer;
  color: #e7744a;
}
.unApprovalas > div > p {
  margin-left: -4px;
  margin-top: 10px;
  cursor: pointer;
  color: #e7744a;
}
#arrows {
  width: 48px;
  height: 30px;
  margin-left: 70px;
  margin-right: -20px;
  margin-top: -140px
}
/* .unApproval ::before {
  content: url("../../../../static/img/arrows.png");
  position: absolute;
  left: 100px;
  top: 20px;
} */
/* .addApprover::before {
  content: url("../../../../static/img/arrows.png");
  position: absolute;
  left: 100px;
  top: 20px;
} */
.operation {
  position: absolute;
  right: 10px;
  top: 20px;
  color: #e7744a;
  font-size: 14px;
}
.operation :nth-child(1) {
  margin-right: 20px;
  cursor: pointer;
}
.operation :nth-child(2) {
  margin-right: 10px;
  cursor: pointer;
}
.operation :nth-child(3) {
  cursor: pointer;
}
/*成员弹出*/

.centerCenter > div {
  width: 30px;
  height: 30px;
  background-color: #fff;
  color: #000;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  overflow: hidden;
}

.centerCenter > div img {
  width: 100%;
  height: 100%;
}

#centerLeftBotOneShow {
  margin-top: 10px;
}

.centerCenter {
  width: 50px;
  height: 100%;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.centerRightBotLiR > div img {
  width: 100%;
  height: 100%;
}

.centerRightBotLiR > div {
  width: 17px;
  height: 17px;
  /* border-radius: 3px; */
  /* border: 1px solid #ececec; */
  margin-right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.centerRightBotLiR {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 15px;
}
.centerRightBotLiL > div:nth-child(3) {
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.centerRightBotLiL > div:nth-child(2) img {
  width: 100%;
  height: 100%;
}

.centerRightBotLiL > div:nth-child(2) {
  width: 17px;
  height: 17px;
  /* border-radius: 3px; */
  /* border: 1px solid #ececec; */
  margin-right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.centerRightBotLiL > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.centerRightBotLiL > div:nth-child(1) {
  width: 17px;
  height: 17px;
  /* border-radius: 3px; */
  /* border: 1px solid #ececec; */
  margin-right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.centerRightBotLiL {
  display: flex;
  align-items: center;
  justify-content: center;
}

.centerRightBot {
  height: 235px;
  margin-top: 5px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.centerRightBot ul li:hover {
  background-color: #f6f6f6;
}

.centerRightBot ul li:nth-child(1) {
  margin-top: 20px;
}

.centerRightBot ul li {
  display: flex;
  align-items: center;
  height: 27px;
  width: 100%;
  cursor: pointer;
  padding-left: 15px;
  justify-content: space-between;
}

.centerRightBot {
  height: 365px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #fff;
}

.centerLeftBotFourLiR > div:nth-child(1) {
  width: 18px;
  height: 18px;
  overflow: hidden;
}

.centerLeftBotFourLiR > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.centerLeftBotFourLiR {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 15px;
  color: #e7744a;
}

.centerLeftBotFourLiL > div:nth-child(2) img {
  width: 100%;
  height: 100%;
}
.centerLeftBotFourLiL > div:nth-child(3) {
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.centerLeftBotFourLiL > div:nth-child(2) {
  width: 17px;
  height: 17px;
  border-radius: 3px;
  /* border: 1px solid #ececec; */
  margin-right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.centerLeftBotFourLiL > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.centerLeftBotFourLiL > div:nth-child(1) {
  width: 17px;
  height: 17px;
  border-radius: 3px;
  /* border: 1px solid #ececec; */
  margin-right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.centerLeftBotFourLiL {
  display: flex;
  align-items: center;
  justify-content: center;
}

.centerLeftBotFour {
  height: 235px;
  margin-top: 5px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.centerLeftBotFour ul li:hover {
  background-color: #f6f6f6;
}

.centerLeftBotFour ul li {
  display: flex;
  align-items: center;
  height: 27px;
  width: 100%;
  cursor: pointer;
  padding-left: 15px;
  justify-content: space-between;
}

.centerLeftBotThr {
  height: 25px;
  margin-top: 5px;
  display: flex;
  align-items: center;
}

.centerLeftBotThr > div:nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  margin-top: 5px;
}

.centerLeftBotThr > div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
}

.centerLeftBotOne {
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.centerLeftBotOneL {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.centerLeftBotOneI input {
  height: 30px;
  width: 300px;
}
.centerLeftBotOneX img {
  width: 100%;
  height: 100%;
}
.centerLeftBotOneX {
  width: 17px;
  margin-left: 3px;
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.centerLeftBotOneI {
  width: 310px;
  height: 32px;
  line-height: 32px;
  font-size: 15px;
  color: #000;
}
#nocenterLeftBotFourLiR {
  color: #ccc;
}

.centerLeftBotOne > div {
  width: 370px;
  height: 32px;
  border-radius: 3px;
  border: 1px solid #d1c4b9;
  display: flex;
  align-items: center;
}

.centerLeftBotTwo ul li > div:nth-child(2) {
  color: #e7744a;
  margin-right: 5px;
  margin-left: 5px;
  cursor: pointer;
}

.centerLeftBotTwo ul li:nth-child(1) > div:nth-child(2) {
  margin-left: 0px;
}

.centerLeftBotTwo ul {
  margin-left: 15px;
}

.centerLeftBotTwo ul li {
  float: left;
  display: flex;
}

.centerLeftBotTwo {
  min-height: 20px;
}

.centerLeftBot > div {
  width: 100%;
}

.centerLeftBot {
  height: 365px;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #fff;
}

.centerLeftTop,
.centerRightTop {
  height: 45px;
  background-color: #f4f4f5;
  line-height: 55px;
  font-size: 16px;
  color: #000;
  padding-left: 5px;
}

.centerLeft {
  width: 400px;
  height: 410px;
  margin-left: 30px;
}

.centerRight {
  width: 400px;
  height: 410px;
  margin-left: 20px;
}

.ModalsmemTop {
  width: 100%;
  height: 66px;
  background-color: #fff;
  text-align: center;
  font-size: 16px;
  color: #303030;
  line-height: 66px;
}

.ModalsmemCenter {
  width: 100%;
  height: 410px;
  background-color: #f4f4f5;
  display: flex;
}

.ModalsmemBot {
  width: 100%;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f5;
}

.ModalsmemBot > div {
  width: 80px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.ModalsmemBot > div:nth-child(1) {
  background-color: #e7744a;
  margin-right: 22px;
}

.ModalsmemBot > div:nth-child(2) {
  background-color: #aeaeae;
  margin-left: 22px;
}

.Modalsmem {
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

.ModalsmemBox {
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
</style>
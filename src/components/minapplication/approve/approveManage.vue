<template>
<div>
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
			<ul class="uloas">
				<li v-for="(lists,index) in itemsa" :key='index'>
					<div>{{lists.modelName}}</div>
					<div>
						<span>编辑表单</span>
						<span @click='ApproverSettings(index)'>审批人设置</span>
						<span @click='recipients(index)'>抄送人({{lists.copyUserCount}})</span>
						<span>停用</span>
					</div>
				</li>
			</ul>
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
</div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "set",
  data() {
    return {
			copyUserCount:'',
      ModalsShow: false,
      searchsmemVal: "",
      itemsa: [],
      navLists: [],
      checked: false,
      selectLeftlists: [],
      selectRightlists: [],
      counter: 0,
      conditions: "",
      copyPeople: ""
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
    sessionStorage.removeItem("modelId");
    sessionStorage.removeItem("modelName");
    sessionStorage.removeItem("setting");
    sessionStorage.removeItem("approveList");
    //  获取审批列表
    let self = this;
    self
      .getapprovalList({
        oid: sessionStorage.getItem("orgId"),
        access_token: sessionStorage.getItem("accessToken")
      })
      .then(data => {
        if (data.code == "000000") {
          self.itemsa = data.data;
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
  watch: {},
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
      let willCompile = self.itemsa[self.copyPeople].modelId;
      self
        .getapprovalcopysave({
          modelId: willCompile,
          userIds: self.uidsVal
        })
        .then(data => {
          if (data.code == "000000") {
                let self = this;
            self.getapprovalList({
                oid: sessionStorage.getItem("orgId"),
                access_token: sessionStorage.getItem("accessToken")
              })
              .then(data => {
                if (data.code == "000000") {
                  self.itemsa = data.data;
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
            this.$message({
              type: "success",
              message: "保存成功！"
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
    // 保存抄送人
    saveCopy(index) {
      let self = this;
      let willCompile = self.itemsa[index].modelId;
      let arr = [1, 2, 3];
      self
        .getapprovalcopysave({
          modelId: willCompile,
          userIds: JSON.stringify(arr)
        })
        .then(data => {
          if (data.code == "000000") {
            this.$message({
              type: "success",
              message: "保存成功！"
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

    // 获取抄送人列表
    recipients(index) {
      let self = this;
      self.ModalsShow = true;
      let willCompile = self.itemsa[index].modelId;
      self.copyPeople = index;
      self
        .getapprovalcopyget({
          modelId: willCompile
        })
        .then(data => {
          if (data.code == "000000") {
            console.log(data.data);
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
            message: data.msg
          });
        });
    },
    // 审批人设置
    ApproverSettings(index) {
      let self = this;
      let willCompile = self.itemsa[index].modelId;
      sessionStorage.setItem("modelId", willCompile);
      self
        .getapprovalSetItem({
          modelId: willCompile
        })
        .then(data => {
          if (data.code == "000000") {
            sessionStorage.setItem("modelName", data.data.modelL.modelName);
            sessionStorage.setItem("setting", data.data.setting);
            sessionStorage.setItem(
              "approveList",
              JSON.stringify(data.data.list)
            );
            sessionStorage.setItem(
              "usersArrs",
              JSON.stringify(data.data.users)
            );
            this.$router.push({
              path: "/home/approve/compileapprove"
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
            message: data.msg
          });
        });
    },
    addcheck: function() {
      this.$router.push({
        path: "/home/formDesign"
      });
    },
    ...mapActions([
      'getbusiness',
      "getdeptstaff",
      "getdeptgetchild",
      "getOrgTreeList",
      "getadminsave",
      "getauthgetAllAuth",
      "getRequestList",
      "getapprovalList",
      "getapprovalSetItem",
      "getapprovalcopyget",
      "getapprovalcopysave"
    ])
  }
};
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
  border: 1px solid #e7744a;
  color: #e7744a;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.approveName {
  width: 90%;
  height: 40px;
  line-height: 40px;
  color: #000000;
  font-size: 14px;
  background-color: #f4f4f6;
  margin-left: 16px;
  margin-top: 10px;
}
.approveName span:nth-child(1) {
  margin-left: 20px;
  float: left;
}
.approveName span:nth-child(2) {
  margin-left: 180px;
}
.approveName span:nth-child(3) {
  margin-right: 180px;
  float: right;
}
.uloas > li {
  width: 90%;
  height: 40px;
  border-bottom: 1px solid #cccccc;
  margin-left: 16px;
  line-height: 40px;
  color: #000000;
  font-size: 12px;
}
.uloas li div {
  display: inline-block;
}
.uloas li div:nth-child(2) {
  display: inline-block;
  float: right;
  margin-right: 20px;
  color: #e7744a;
  cursor: pointer;
}
.uloas li div:nth-child(1) {
  padding-left: 20px;
}
.uloas li div:nth-child(2) span {
  margin-left: 4px;
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
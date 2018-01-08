<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="set" style="height: 100%;">
    <div class="addChildTop">
      <a href="javascript:;">
        <img src="/static/img/Shape.png" @click='back' />
      </a>
      编辑子管理员
    </div>
    <div class="addChildBot">
      <div class="member">
        成员：
        <!-- <input type="text" placeholder='请选择成员' v-model="selectMembersVal" @focus='selectMembers'> -->
        <div @click="selectMembers">{{selectMembersVal}}</div>
      </div>
      <div class="chainCommand">
        管理范围：
        <div class="branch radioGroups">
          <div class="branchDiv" v-for="(item,index) in fanweiLists" :key="item.name" @click="fanweiListsClick(index)">
            <div>
              <div v-show="selDivIndex == index"></div>
            </div>
            <div>
              {{item.name}}
            </div>
          </div>
          <div class="branchspecMem">
            <div @click="selectSpecific" id="Specific" v-show='specMem'>{{sBelectMembersVal}}</div>
            <!-- <input type="text" v-model="sBelectMembersVal" name="" id="Specific" placeholder='请选择特定企业部门' @focus='selectSpecific' v-show='specMem'> -->
          </div>
        </div>
      </div>
      <div class="privileges">
        分配权限：
        <span id="bracket">
          (将会在以上通讯录范围内配置权限)
        </span>
        <span id="allJurisdiction">
          <el-checkbox v-model="legalVal" @change="jurisdiction"></el-checkbox>&nbsp;&nbsp;全部权限
        </span>
      </div>
      <!-- <div class="BasicPermissions">
                <ul>
                    <li id='first'>基础权限</li>
                    <li v-for="(item,index) in shangLists" :key="item.authName" class="BasicPermissionsLi">
                        <div class="ato">
                            <img :src="'../../../static/img/' + item.authName + '.png'" />&nbsp;&nbsp;{{item.authName}}
                        </div>
                        <div class="allAA" @click="shangListsCLick(index)">
                            <div>
                                <img v-show="item.open" src="/static/img/选中.png" alt="">
                            </div>
                            <div>
                                全部管理权限
                            </div>
                        </div>
                    </li>
                </ul>
            </div> -->
      <div class="BasicPermissions">
        <ul>
          <li id='first'>权限列表</li>
          <li v-for="(item,index) in xiaLists" :key="item.authName" class="BasicPermissionsLi">
            <div class="ato">
              <img :src="'../../../static/img/' + item.appId  + '.png'" />&nbsp;&nbsp;{{item.authName}}
            </div>
            <div class="allAA">
              <div @click="allAACLick(index)">
                <img v-show="item.open" src="/static/img/on@2x.png" alt="">
                <div v-show="!item.open" id="unChecked"></div>
              </div>
              <div>
                全部管理权限
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="save">
        <a href="javascript:;" @click="addClick">保存</a>
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
              <div class="centerLeftBotOne">
                <div>
                  <div class="centerLeftBotOneL">
                    <img src="/static/img/watchsee.png" alt="">
                  </div>
                  <div class="centerLeftBotOneI">
                    <input type="text" autofocus="autofocus" v-model.trim="searchsmemVal" placeholder="搜索">
                  </div>
                  <div v-show="searchsmemVal != ''" class="centerLeftBotOneX" @click="clearSearchClick">
                    <img src="/static/img/Group.png" alt="">
                  </div>
                </div>
              </div>
              <div class="centerLeftBotTwo">
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
                      <div v-show="item.type == 2" @click="lefthandleCheckedCitiesChange(index)">
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
                    <div v-else v-show="item.type == 1" class="centerLeftBotFourLiR">
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
    <!-- 选择部门时 -->
    <div v-show="definiBox" class="definiBox">
      <div class="Modalsmem">
        <div class="ModalsmemTop">
          选择部门
        </div>
        <div class="ModalsmemCenter">
          <div class="centerLeft">
            <div class="centerLeftTop">
              选择部门
            </div>
            <div class="centerLeftBot">
              <div class="centerLeftBotOne" v-show="centers">
                <!-- <div>
									<div class="centerLeftBotOneL">
										<img src="/static/img/账号.png" alt="">
									</div>
									<div class="centerLeftBotOneI">
										<input type="text" placeholder="搜索">
									</div>
								</div> -->
              </div>
              <div class="centerLeftBotTwo" id="centerLeftBotOneShow">
                <ul>
                  <li v-for="(item,index) in nBavLists" :key="index" @click="navBClick(index)">
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
                  <el-checkbox v-model="cBhecked" @change="numBChange"></el-checkbox>
                </div>
                <div>
                  <span>全选</span>
                </div>
              </div>
              <div class="centerLeftBotFour">
                <ul>
                  <li v-for="(item,index) in sBelectLeftlists" :key="index">
                    <div class="centerLeftBotFourLiL">
                      <div v-show="item.type == 1" @click="lefthandleCheckedCitiesBChange(index)">
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
                    <div v-if="item.open || item.type == 2" class="centerLeftBotFourLiR">
                      <div>
                        <img src="/static/img/canon@2x.png" alt="">
                      </div>
                      <div id="nocenterLeftBotFourLiR">
                        下级
                      </div>
                    </div>
                    <div v-else class="centerLeftBotFourLiR" @click="leftNextBClick(index)">
                      <div>
                        <img src="/static/img/can@2x.png" alt="">
                      </div>
                      <div>
                        下级
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="centerCenter">
            <div @click="commodityLeftBClick">
              <img src="/static/img/xright@2x.png" alt="">
            </div>
            <div @click="commodityRightBClick">
              <img src="/static/img/xleft@2x.png" alt="">
            </div>
          </div>
          <div class="centerRight">
            <div class="centerRightTop">
              已选部门
            </div>
            <div class="centerRightBot">
              <ul>
                <li v-for="(item,index) in sBelectRightlists" :key="index" @click="righthandleCheckedCitiesBChange(index)">
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
          <div @click="confirmBClick">
            确定
          </div>
          <div @click="cancelBClick">
            取消
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import defini from "../defini";
export default {
  data() {
    return {
      centers: false,
      ModalsShow: false,
      selectMembersVal: "请选择成员",
      leftcheckNull: "",
      checkNull: "",
      checked: false,
      leftcheckList: [],
      rightcheckList: [],
      navLists: [],
      selectinputRightlists: [],
      selectLeftlists: [],
      selectRightlists: [],
 timeTrue: false,
      time: 60,
      definiBox: false,
      sBelectMembersVal: "请选择特定企业部门",
      lBeftcheckNull: "",
      cBheckNull: "",
      cBhecked: false,
      lBeftcheckList: [],
      rBightcheckList: [],
      nBavLists: [],
      sBelectLeftlists: [],
      sBelectRightlists: [],
      sBelectBackRightlists: [],
      uBidsVal: "",
      selectBinputRightlists: [],

      xiaLists: [],
      specMem: false,
      fanweiLists: [
        { name: "全公司", num: "0" },
        { name: "当前部门以及子部门", num: "1" },
        { name: "特定部门", num: "2" }
      ],
      shangLists: [
   
      ],
      selDivIndex: 0,
      indexArr: 0,
      legalVal: false,
      uidsVal: "",
      deptIds: [],
      renyuanLists: [],
      bumenLists: [],
      selectxiaLists: [],
      searchsmemVal: ""
    };
  },
  created: function() {
    if(sessionStorage.getItem("orgId") == undefined){
      return
    }
    this.listFun();
  },
  watch: {
    searchsmemVal: function(val) {
      var self = this;
      self.selectLeftlists = [];
      if (val.length == 0) {
        
      } else {
        self
          .getRequestList({
            oid: sessionStorage.getItem("orgId"),
            uid: sessionStorage.getItem("userId"),
            searchKey: val
          })
          .then(data => {
            if (data.code == "000000") {
              // self.userLists = data.data;
              data.data.forEach(function(ele, ind) {
                self.selectLeftlists.push({
                  name: ele.name,
                  open: false,
                  parentId: ele.userId,
                  type: 2,
                  id: ele.userId
                });
              });
              self.selectLeftlists.forEach(function(eleLeft, eleLeftInd) {
                self.selectRightlists.forEach(function(eleRight, rightInd) {
                  if (eleLeft.id == eleRight.id) {
                    self.selectLeftlists[eleLeftInd].open = true;
                  }
                });
              });
              if (self.selectLeftlists == 0) {
                self.checked = false;
              } else {
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
              }
            } else {
              self.userLists = [];
              this.$message({
                type: "info",
                message: data.msg
              });
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
      }
    }
  },
  filters: {
    typeFun: function(val) {
      if (val == 1) {
        return "部门";
      } else {
        return "人员";
      }
    },
    
  },
  methods: {
    clearSearchClick() {
      this.searchsmemVal = "";
    },
    listFun() {
      var self = this;
      self.sBelectLeftlists = [];
      self.selectLeftlists = [];
      self.navLists = [];
      self.nBavLists = [];
      // 查询详情
      this.getorgAdmineditForward({
        orgId: sessionStorage.getItem("orgId"),
        orgAdminId: self.$route.query.id
      })
        .then(bigData => {
          if (bigData.code == "000000") {
            // 权限选择
            self.selDivIndex = bigData.data.userScope;
            if (bigData.data.userScope == 2) {
              self.specMem = true;
              if (bigData.data.deptVoList.length == 1) {
                self.sBelectMembersVal = bigData.data.deptVoList[0].deptName;
              } else {
                bigData.data.deptVoList.forEach(function(ele, ind) {
                  self.sBelectMembersVal += ele.deptName + ",";
                });
                self.sBelectMembersVal = self.sBelectMembersVal.substr(
                  0,
                  self.sBelectMembersVal.length - 1
                );
              }
              bigData.data.deptVoList.forEach(function(ele, ind) {
                self.sBelectRightlists.push({
                  name: ele.deptName,
                  open: false,
                  type: 1,
                  id: ele.deptId
                });
                self.selectBinputRightlists.push({
                  name: ele.deptName,
                  open: false,
                  type: 1,
                  id: ele.deptId
                });
              });
              var sBelectRightlistsval = "";
              if (self.sBelectRightlists.length == 1) {
                self.sBelectMembersVal = self.sBelectRightlists[0].name;
                self.uBidsVal = this.sBelectRightlists[0].id;
              } else {
                self.sBelectRightlists.forEach(function(ele, ind) {
                  sBelectRightlistsval += ele.name + ",";
                  self.uBidsVal += ele.id + ",";
                });
                self.uBidsVal = self.uBidsVal.substr(
                  0,
                  self.uBidsVal.length - 1
                );
                self.sBelectMembersVal = sBelectRightlistsval.substr(
                  0,
                  sBelectRightlistsval.length - 1
                );
              }
            } else {
              self.specMem = false;
            }
            bigData.data.userVoList.forEach(function(ele, ind) {
              self.selectRightlists.push({
                name: ele.userNick,
                open: false,
                type: 2,
                id: ele.userId
              });
              self.selectinputRightlists.push({
                name: ele.userNick,
                open: false,
                type: 2,
                id: ele.userId
              });
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
            self.navLists = [];
            self.nBavLists = [];
            // 查询人员列表
            this.getdeptstaff({
              oid: sessionStorage.getItem("orgId"),
              uid: sessionStorage.getItem("userId"),
              deptId: ""
            })
              .then(data => {
                if (data.code == "000000") {
                  self.navLists.push({
                    name: data.data.name,
                    deptId: data.data.id
                  });
                  self.nBavLists.push({
                    name: data.data.name,
                    deptId: data.data.id
                  });
                  // 人员列表
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
                        self.selectLeftlists.forEach(function(
                          eleLeft,
                          eleLeftInd
                        ) {
                          self.selectRightlists.forEach(function(
                            eleRight,
                            rightInd
                          ) {
                            if (eleLeft.id == eleRight.id) {
                              self.selectLeftlists[eleLeftInd].open = true;
                            }
                          });
                        });
                        var selectRightlistsval = "";
                        if (self.selectRightlists.length == 1) {
                          self.selectMembersVal = self.selectRightlists[0].name;
                          self.uidsVal = self.selectRightlists[0].id;
                        } else {
                          self.selectRightlists.forEach(function(ele, ind) {
                            selectRightlistsval += ele.name + ",";
                            self.uidsVal += ele.id + ",";
                          });
                          self.uidsVal = self.uidsVal.substr(
                            0,
                            self.uidsVal.length - 1
                          );
                          self.selectMembersVal = selectRightlistsval.substr(
                            0,
                            selectRightlistsval.length - 1
                          );
                        }
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
                          hashf[next.id]
                            ? ""
                            : (hashf[next.id] = true && item.push(next));
                          return item;
                        }, []);
                        var hasht = {};
                        rtArrs = rtArrs.reduce(function(item, next) {
                          hasht[next.id]
                            ? ""
                            : (hasht[next.id] = true && item.push(next));
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
                          message: data.msg
                        });
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
                  // 部门列表
                  self.sBelectLeftlists = [];
                  this.getdeptstaff({
                    oid: sessionStorage.getItem("orgId"),
                    uid: sessionStorage.getItem("userId"),
                    deptId: self.nBavLists[0].deptId
                  })
                    .then(data => {
                      if (data.code == "000000") {
                        data.data.forEach(function(ele, ind) {
                          if (ele.type == 1) {
                            self.sBelectLeftlists.push({
                              name: ele.name,
                              open: false,
                              parentId: ele.parentId,
                              type: ele.type,
                              id: ele.id
                            });
                          }
                        });
                        self.sBelectLeftlists.forEach(function(
                          eleLeft,
                          eleLeftInd
                        ) {
                          self.sBelectRightlists.forEach(function(
                            eleRight,
                            rightInd
                          ) {
                            if (eleLeft.id == eleRight.id) {
                              self.sBelectLeftlists[eleLeftInd].open = true;
                            }
                          });
                        });
                        var rbArrs = [];
                        this.sBelectLeftlists.forEach(function(ele, ind) {
                          if (ele.open == true) {
                            rbArrs.push({
                              name: ele.name,
                              open: false,
                              type: ele.type,
                              id: ele.id
                            });
                          }
                        });
                        var hash = {};
                        rbArrs = rbArrs.reduce(function(item, next) {
                          hash[next.id]
                            ? ""
                            : (hash[next.id] = true && item.push(next));
                          return item;
                        }, []);
                        if (rbArrs.length == this.sBelectLeftlists.length) {
                          self.cBhecked = true;
                        } else {
                          self.cBhecked = false;
                        }
                      } else {
                        this.$message({
                          type: "info",
                          message: data.msg
                        });
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
                } else if(data.code == "100005"){
            self.$message(data.msg);
            self.$router.push({
              path:'/login'
            })
          }else {
                  this.$message({
                    type: "info",
                    message: data.msg
                  });
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

            self.xiaLists = [];
            // 微应用权限列表
            this.getauthgetAllAuth({
              orgId: sessionStorage.getItem("orgId")
            })
              .then(data => {
                if (data.code == "000000") {
                  data.data.forEach(function(ele, ind) {
                    self.xiaLists.push({
                      appId:ele.appId,
                      authName: ele.authName,
                      open: false,
                      authValue: ele.authValue,
                      id: ele.id,
                      orgId: ele.orgId
                    });
                  });
                  self.xiaLists.forEach(function(ele, ind) {
                    bigData.data.authVOList.forEach(function(auth, authInd) {
                      if (ele.id == auth.authId) {
                        self.xiaLists[ind].open = true;
                      }
                    });
                  });
                  var rxArrs = [];
                  self.xiaLists.forEach(function(ele, ind) {
                    if (ele.open == true) {
                      rxArrs.push({
                        authName: ele.authName,
                        open: false,
                        authValue: ele.authValue,
                        id: ele.id,
                        orgId: ele.orgId
                      });
                    }
                  });
                  var hash = {};
                  rxArrs = rxArrs.reduce(function(item, next) {
                    hash[next.id]
                      ? ""
                      : (hash[next.id] = true && item.push(next));
                    return item;
                  }, []);
                  if (rxArrs.length == self.xiaLists.length) {
                    self.legalVal = true;
                  } else {
                    self.legalVal = false;
                  }
                } else {
                  this.$message({
                    type: "info",
                    message: data.msg
                  });
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
          } else {
            this.$message({
              type: "info",
              message: bigData.msg
            });
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
    },
    crListFun() {
      var self = this;
      self.selectLeftlists = [];
      // self.selectRightlists = [];
      self.navLists = [];
      self.nBavLists = [];
      self.sBelectLeftlists = [];
      //   self.sBelectRightlists = [];
      // 查询人员列表
      this.getdeptstaff({
        oid: sessionStorage.getItem("orgId"),
        uid: sessionStorage.getItem("userId"),
        deptId: ""
      })
        .then(data => {
          if (data.code == "000000") {
            self.navLists.push({
              name: data.data.name,
              deptId: data.data.id
            });
            self.nBavLists.push({
              name: data.data.name,
              deptId: data.data.id
            });
            // 人员列表
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
                  self.selectRightlists = [];
                  self.selectinputRightlists.forEach(function(ele, ind) {
                   
                    self.selectRightlists.push({
                      name: ele.name,
                      open: false,
                      parentId: ele.parentId,
                      type: ele.type,
                      id: ele.id
                    });
                  });
                  var selectRightlistsHash = {};
                  self.selectRightlists = self.selectRightlists.reduce(function(
                    item,
                    next
                  ) {
                    selectRightlistsHash[next.id]
                      ? ""
                      : (selectRightlistsHash[next.id] =
                          true && item.push(next));
                    return item;
                  },
                  []);
                  self.selectLeftlists.forEach(function(eleLeft, eleLeftInd) {
                    self.selectRightlists.forEach(function(eleRight, rightInd) {
                      if (eleLeft.id == eleRight.id) {
                        self.selectLeftlists[eleLeftInd].open = true;
                      }
                    });
                  });
                  if (self.selectRightlists.length == 1) {
                    self.uidsVal = self.selectRightlists[0].id;
                  } else {
                    self.selectRightlists.forEach(function(ele, ind) {
                      self.uidsVal += ele.id + ",";
                    });
                    self.uidsVal = self.uidsVal.substr(
                      0,
                      self.uidsVal.length - 1
                    );
                  }
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
                    hashf[next.id]
                      ? ""
                      : (hashf[next.id] = true && item.push(next));
                    return item;
                  }, []);
                  var hasht = {};
                  rtArrs = rtArrs.reduce(function(item, next) {
                    hasht[next.id]
                      ? ""
                      : (hasht[next.id] = true && item.push(next));
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
                    message: data.msg
                  });
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
            // 部门列表
            this.getdeptstaff({
              oid: sessionStorage.getItem("orgId"),
              uid: sessionStorage.getItem("userId"),
              deptId: self.nBavLists[0].deptId
            })
              .then(data => {
                if (data.code == "000000") {
                  data.data.forEach(function(ele, ind) {
                    if (ele.type == 1) {
                      self.sBelectLeftlists.push({
                        name: ele.name,
                        open: false,
                        parentId: ele.parentId,
                        type: ele.type,
                        id: ele.id
                      });
                    }
                  });
                  self.sBelectLeftlists.forEach(function(eleLeft, eleLeftInd) {
                    self.sBelectRightlists.forEach(function(
                      eleRight,
                      rightInd
                    ) {
                      if (eleLeft.id == eleRight.id) {
                        self.sBelectLeftlists[eleLeftInd].open = true;
                      }
                    });
                  });
                  var rbArrs = [];
                  this.sBelectLeftlists.forEach(function(ele, ind) {
                    if (ele.open == true) {
                      rbArrs.push({
                        name: ele.name,
                        open: false,
                        type: ele.type,
                        id: ele.id
                      });
                    }
                  });
                  var hash = {};
                  rbArrs = rbArrs.reduce(function(item, next) {
                    hash[next.id]
                      ? ""
                      : (hash[next.id] = true && item.push(next));
                    return item;
                  }, []);
                  if (rbArrs.length == this.sBelectLeftlists.length) {
                    self.cBhecked = true;
                  } else {
                    self.cBhecked = false;
                  }
                } else {
                  this.$message({
                    type: "info",
                    message: data.msg
                  });
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
          }else if(data.code == "100005"){
            self.$message(data.msg);
            self.$router.push({
              path:'/login'
            })
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
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
    },
    backListFun() {
      var self = this;
      self.selectLeftlists = [];
      self.navLists = [];
      self.nBavLists = [];
      self.sBelectLeftlists = [];
      // 查询人员列表
      this.getdeptstaff({
        oid: sessionStorage.getItem("orgId"),
        uid: sessionStorage.getItem("userId"),
        deptId: ""
      })
        .then(data => {
          if (data.code == "000000") {
            self.navLists.push({
              name: data.data.name,
              deptId: data.data.id
            });
            self.nBavLists.push({
              name: data.data.name,
              deptId: data.data.id
            });
            // 人员列表
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
                  var selectRightlistsval = "";
                  if (self.selectRightlists.length == 1) {
                    self.selectMembersVal = self.selectRightlists[0].name;
                    self.uidsVal = self.selectRightlists[0].id;
                  } else {
                    self.selectRightlists.forEach(function(ele, ind) {
                      selectRightlistsval += ele.name + ",";
                      self.uidsVal += ele.id + ",";
                    });
                    self.uidsVal = self.uidsVal.substr(
                      0,
                      self.uidsVal.length - 1
                    );
                    // self.selectMembersVal = selectRightlistsval.substr(
                    //   0,
                    //   selectRightlistsval.length - 1
                    // );
                  }
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
                    hashf[next.id]
                      ? ""
                      : (hashf[next.id] = true && item.push(next));
                    return item;
                  }, []);
                  var hasht = {};
                  rtArrs = rtArrs.reduce(function(item, next) {
                    hasht[next.id]
                      ? ""
                      : (hasht[next.id] = true && item.push(next));
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
                    message: data.msg
                  });
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
            // 部门列表
            this.getdeptstaff({
              oid: sessionStorage.getItem("orgId"),
              uid: sessionStorage.getItem("userId"),
              deptId: self.nBavLists[0].deptId
            })
              .then(data => {
                if (data.code == "000000") {
                  data.data.forEach(function(ele, ind) {
                    if (ele.type == 1) {
                      self.sBelectLeftlists.push({
                        name: ele.name,
                        open: false,
                        parentId: ele.parentId,
                        type: ele.type,
                        id: ele.id
                      });
                    }
                  });
                  self.sBelectLeftlists.forEach(function(eleLeft, eleLeftInd) {
                    self.sBelectRightlists.forEach(function(
                      eleRight,
                      rightInd
                    ) {
                      if (eleLeft.id == eleRight.id) {
                        self.sBelectLeftlists[eleLeftInd].open = true;
                      }
                    });
                  });
                  var rbArrs = [];
                  this.sBelectLeftlists.forEach(function(ele, ind) {
                    if (ele.open == true) {
                      rbArrs.push({
                        name: ele.name,
                        open: false,
                        type: ele.type,
                        id: ele.id
                      });
                    }
                  });
                  var hash = {};
                  rbArrs = rbArrs.reduce(function(item, next) {
                    hash[next.id]
                      ? ""
                      : (hash[next.id] = true && item.push(next));
                    return item;
                  }, []);
                  if (rbArrs.length == this.sBelectLeftlists.length) {
                    self.cBhecked = true;
                  } else {
                    self.cBhecked = false;
                  }
                } else {
                  this.$message({
                    type: "info",
                    message: data.msg
                  });
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
          }else if(data.code == "100005"){
            self.$message(data.msg);
            self.$router.push({
              path:'/login'
            })
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
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
    },
    // 选择微应用权限
    allAACLick(index) {
      var self = this;
      this.xiaLists[index].open = !this.xiaLists[index].open;
      var indexArr = [];
      this.xiaLists.forEach(function(ele, ind) {
        if (ele.open == true) {
          indexArr.push({
            authName: ele.authName,
            open: false,
            authValue: ele.authValue,
            id: ele.id,
            orgId: ele.orgId
          });
        }
      });
      var hash = {};
      indexArr = indexArr.reduce(function(item, next) {
        hash[next.id] ? "" : (hash[next.id] = true && item.push(next));
        return item;
      }, []);
      if (indexArr.length == this.xiaLists.length) {
        this.legalVal = true;
      } else {
        this.legalVal = false;
      }
    },
    // 选择基础权限
    shangListsCLick(index) {
      if (!this.shangLists[index].open) {
        this.indexArr += 1;
      } else {
        this.indexArr -= 1;
      }
      this.shangLists[index].open = !this.shangLists[index].open;

      var xiaListsnumLength = this.xiaLists.length + this.shangLists.length;
      if (this.indexArr == xiaListsnumLength) {
        this.legalVal = true;
      } else {
        this.legalVal = false;
      }
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
          }else if(data.code == "100005"){
            self.$message(data.msg);
            self.$router.push({
              path:'/login'
            })
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
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
            if (self.selectLeftlists.length == 0) {
              self.checked = false;
            } else {
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
            }
          } else if(data.code == "100005"){
            self.$message(data.msg);
            self.$router.push({
              path:'/login'
            })
          }else {
            this.$message({
              type: "info",
              message: data.msg
            });
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
    },
    // 人员取消选中
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
    commodityLeftClick() {
      var self = this;
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
    },
    //选择成员弹出框
    selectMembers(e) {
      var self = this;
      this.ModalsShow = true;
    
      this.searchsmemVal = "";
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
    },
    // 选择成员弹出框取消
    cancelClick() {
      var self = this;
     
      this.ModalsShow = false;
      this.definiBox = false;
    },
    // 部门取消选中
    righthandleCheckedCitiesBChange(index) {
      var self = this;
      this.sBelectRightlists[index].open = !this.sBelectRightlists[index].open;
    },
    commodityRightBClick() {
      var self = this;
      var rights = [];
      var seRight = [];
      self.sBelectRightlists.forEach(function(ele, ind) {
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
      self.sBelectRightlists = rights;
      this.sBelectLeftlists.forEach(function(eleL, indL) {
        seRight.forEach(function(ele, ind) {
          if (eleL.id === ele.id) {
            self.sBelectLeftlists[indL].open = false;
          }
        });
      });
      var rArrs = [];
      this.sBelectLeftlists.forEach(function(ele, ind) {
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
      if (rArrs.length == this.sBelectLeftlists.length) {
        self.cBhecked = true;
      } else {
        self.cBhecked = false;
      }
    },
    // 部门添加选中
    lefthandleCheckedCitiesBChange(index) {
      var self = this;
      if (this.sBelectLeftlists[index].type == 1) {
        this.sBelectLeftlists[index].open = !this.sBelectLeftlists[index].open;
        var rArrs = [];
        this.sBelectLeftlists.forEach(function(ele, ind) {
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
        if (rArrs.length == this.sBelectLeftlists.length) {
          self.cBhecked = true;
        } else {
          self.cBhecked = false;
        }
      } else {
        this.$message({
          type: "info",
          message: "请选择部门，你现在选择的是人员!"
        });
      }
    },
    commodityLeftBClick() {
      var self = this;
      var rArrs = [];
      this.sBelectLeftlists.forEach(function(ele, ind) {
        if (ele.open == true) {
          self.sBelectRightlists.push({
            name: ele.name,
            open: false,
            parentId: ele.parentId,
            type: ele.type,
            id: ele.id
          });
          self.sBelectBackRightlists.push({
            name: ele.name,
            open: false,
            parentId: ele.parentId,
            type: ele.type,
            id: ele.id
          });
        }
      });
      var hash = {};
      self.sBelectRightlists = self.sBelectRightlists.reduce(function(
        item,
        next
      ) {
        hash[next.id] ? "" : (hash[next.id] = true && item.push(next));
        return item;
      },
      []);
    },
    // 部门所有序号被选中时
    numBChange(event) {
      var qOrR = true;
      this.sBelectLeftlists.forEach(function(ele, ind) {
        if (ele.type == 2) {
          qOrR = false;
        }
      });
      if (qOrR == false) {
        this.$message({
          type: "info",
          message: "请选择部门，你所选择的包含了人员!"
        });
        this.cBhecked = false;
      } else {
        if (event.target.checked) {
          this.sBelectLeftlists.forEach(function(ele, ind) {
            ele.open = true;
          });
        } else {
          this.sBelectLeftlists.forEach(function(ele, ind) {
            ele.open = false;
          });
        }
      }
    },
    // 部门下一级
    leftNextBClick(index) {
      var self = this;
      this.getdeptstaff({
        oid: sessionStorage.getItem("orgId"),
        uid: sessionStorage.getItem("userId"),
        deptId: self.sBelectLeftlists[index].id
      })
        .then(data => {
          if (data.code == "000000") {
            self.nBavLists.push({
              name: self.sBelectLeftlists[index].name,
              deptId: self.sBelectLeftlists[index].id
            });
            self.sBelectLeftlists = [];
            data.data.forEach(function(ele, ind) {
              if (ele.type == 1) {
                self.sBelectLeftlists.push({
                  name: ele.name,
                  open: false,
                  parentId: ele.parentId,
                  type: ele.type,
                  id: ele.id
                });
              }
            });
            self.sBelectLeftlists.forEach(function(eleLeft, eleLeftInd) {
              self.sBelectRightlists.forEach(function(eleRight, rightInd) {
                if (eleLeft.id == eleRight.id) {
                  self.sBelectLeftlists[eleLeftInd].open = true;
                }
              });
            });
            if (self.sBelectLeftlists.length == 0) {
              self.cBhecked = false;
            } else {
              var rArrs = [];
              this.sBelectLeftlists.forEach(function(ele, ind) {
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
              if (rArrs.length == this.sBelectLeftlists.length) {
                self.cBhecked = true;
              } else {
                self.cBhecked = false;
              }
            }
          }else if(data.code == "100005"){
            self.$message(data.msg);
            self.$router.push({
              path:'/login'
            })
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
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
    },
    // 部门导航
    navBClick(index) {
      var self = this;
      this.getdeptstaff({
        oid: sessionStorage.getItem("orgId"),
        uid: sessionStorage.getItem("userId"),
        deptId: self.nBavLists[index].deptId
      })
        .then(data => {
          if (data.code == "000000") {
            var start = index + 1;
            self.nBavLists.splice(start);
            self.sBelectLeftlists = [];
            data.data.forEach(function(ele, ind) {
              if (ele.type == 1) {
                self.sBelectLeftlists.push({
                  name: ele.name,
                  open: false,
                  parentId: ele.parentId,
                  type: ele.type,
                  id: ele.id
                });
              }
            });
            self.sBelectLeftlists.forEach(function(eleLeft, eleLeftInd) {
              self.sBelectRightlists.forEach(function(eleRight, rightInd) {
                if (eleLeft.id == eleRight.id) {
                  self.sBelectLeftlists[eleLeftInd].open = true;
                }
              });
            });
            var rArrs = [];
            this.sBelectLeftlists.forEach(function(ele, ind) {
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
            if (rArrs.length == this.sBelectLeftlists.length) {
              self.cBhecked = true;
            } else {
              self.cBhecked = false;
            }
          }else if(data.code == "100005"){
            self.$message(data.msg);
            self.$router.push({
              path:'/login'
            })
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
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
    },
    cBrListFun() {
      var self = this;
      self.navLists = [];
      self.nBavLists = [];
      self.sBelectLeftlists = [];
      // 查询人员列表
      this.getdeptstaff({
        oid: sessionStorage.getItem("orgId"),
        uid: sessionStorage.getItem("userId"),
        deptId: ""
      })
        .then(data => {
          if (data.code == "000000") {
            self.navLists.push({
              name: data.data.name,
              deptId: data.data.id
            });
            self.nBavLists.push({
              name: data.data.name,
              deptId: data.data.id
            });
            // 部门列表
            this.getdeptstaff({
              oid: sessionStorage.getItem("orgId"),
              uid: sessionStorage.getItem("userId"),
              deptId: self.nBavLists[0].deptId
            })
              .then(data => {
                if (data.code == "000000") {
                  data.data.forEach(function(ele, ind) {
                    if (ele.type == 1) {
                      self.sBelectLeftlists.push({
                        name: ele.name,
                        open: false,
                        parentId: ele.parentId,
                        type: ele.type,
                        id: ele.id
                      });
                    }
                  });
                  self.sBelectRightlists = [];
                  self.selectBinputRightlists.forEach(function(ele, ind) {
                    self.sBelectRightlists.push({
                      name: ele.name,
                      open: false,
                      parentId: ele.parentId,
                      type: ele.type,
                      id: ele.id
                    });
                  });
                  var selectRightlistsHash = {};
                  self.sBelectRightlists = self.sBelectRightlists.reduce(
                    function(item, next) {
                      selectRightlistsHash[next.id]
                        ? ""
                        : (selectRightlistsHash[next.id] =
                            true && item.push(next));
                      return item;
                    },
                    []
                  );
                  self.sBelectLeftlists.forEach(function(eleLeft, eleLeftInd) {
                    self.sBelectRightlists.forEach(function(
                      eleRight,
                      rightInd
                    ) {
                      if (eleLeft.id == eleRight.id) {
                        self.sBelectLeftlists[eleLeftInd].open = true;
                      }
                    });
                  });
                  var rbArrs = [];
                  this.sBelectLeftlists.forEach(function(ele, ind) {
                    if (ele.open == true) {
                      rbArrs.push({
                        name: ele.name,
                        open: false,
                        type: ele.type,
                        id: ele.id
                      });
                    }
                  });
                  var hash = {};
                  rbArrs = rbArrs.reduce(function(item, next) {
                    hash[next.id]
                      ? ""
                      : (hash[next.id] = true && item.push(next));
                    return item;
                  }, []);
                  if (rbArrs.length == this.sBelectLeftlists.length) {
                    self.cBhecked = true;
                  } else {
                    self.cBhecked = false;
                  }
                } else {
                  this.$message({
                    type: "info",
                    message: data.msg
                  });
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
          }else if(data.code == "100005"){
            self.$message(data.msg);
            self.$router.push({
              path:'/login'
            })
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
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
    },
    bBackListFun() {
      var self = this;
      self.navLists = [];
      self.nBavLists = [];
      self.sBelectLeftlists = [];
      // 查询人员列表
      this.getdeptstaff({
        oid: sessionStorage.getItem("orgId"),
        uid: sessionStorage.getItem("userId"),
        deptId: ""
      })
        .then(data => {
          if (data.code == "000000") {
            self.navLists.push({
              name: data.data.name,
              deptId: data.data.id
            });
            self.nBavLists.push({
              name: data.data.name,
              deptId: data.data.id
            });
            // 部门列表
            this.getdeptstaff({
              oid: sessionStorage.getItem("orgId"),
              uid: sessionStorage.getItem("userId"),
              deptId: self.nBavLists[0].deptId
            })
              .then(data => {
                if (data.code == "000000") {
                  data.data.forEach(function(ele, ind) {
                    if (ele.type == 1) {
                      self.sBelectLeftlists.push({
                        name: ele.name,
                        open: false,
                        parentId: ele.parentId,
                        type: ele.type,
                        id: ele.id
                      });
                    }
                  });
                  self.sBelectLeftlists.forEach(function(eleLeft, eleLeftInd) {
                    self.sBelectRightlists.forEach(function(
                      eleRight,
                      rightInd
                    ) {
                      if (eleLeft.id == eleRight.id) {
                        self.sBelectLeftlists[eleLeftInd].open = true;
                      }
                    });
                  });
                  var rbArrs = [];
                  this.sBelectLeftlists.forEach(function(ele, ind) {
                    if (ele.open == true) {
                      rbArrs.push({
                        name: ele.name,
                        open: false,
                        type: ele.type,
                        id: ele.id
                      });
                    }
                  });
                  var hash = {};
                  rbArrs = rbArrs.reduce(function(item, next) {
                    hash[next.id]
                      ? ""
                      : (hash[next.id] = true && item.push(next));
                    return item;
                  }, []);
                  if (rbArrs.length == this.sBelectLeftlists.length) {
                    self.cBhecked = true;
                  } else {
                    self.cBhecked = false;
                  }
                } else {
                  this.$message({
                    type: "info",
                    message: data.msg
                  });
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
          } else if(data.code == "100005"){
            self.$message(data.msg);
            self.$router.push({
              path:'/login'
            })
          }else {
            this.$message({
              type: "info",
              message: data.msg
            });
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
    },
    //选择部门弹出框
    selectSpecific(e) {
      this.definiBox = true;
      this.cBrListFun();
    },
    //选择部门弹出框确认
    confirmBClick() {
      var self = this;
      this.definiBox = false;
      var val = "";
      self.uBidsVal = "";
      self.selectBinputRightlists = [];
      this.sBelectRightlists.forEach(function(ele, ind) {
        self.selectBinputRightlists.push({
          name: ele.name,
          open: false,
          parentId: ele.parentId,
          type: ele.type,
          id: ele.id
        });
      });
      var selectRightlistsHash = {};
      self.selectBinputRightlists = self.selectBinputRightlists.reduce(function(
        item,
        next
      ) {
        selectRightlistsHash[next.id]
          ? ""
          : (selectRightlistsHash[next.id] = true && item.push(next));
        return item;
      },
      []);

      if (this.selectBinputRightlists.length == 1) {
        val = this.selectBinputRightlists[0].name;
        self.uBidsVal = this.selectBinputRightlists[0].id;
      } else {
        this.selectBinputRightlists.forEach(function(ele, ind) {
          val += ele.name + ",";
          self.uBidsVal += ele.id + ",";
        });
        self.uBidsVal = self.uBidsVal.substr(0, self.uBidsVal.length - 1);
      }
      this.sBelectMembersVal = val;
    },
    // 选择部门弹出框取消
    cancelBClick() {
      var self = this;
      this.definiBox = false;
      this.selectBinputRightlists.forEach(function(ele, ind) {
        self.sBelectRightlists.push({
          name: ele.name,
          open: false,
          parentId: ele.parentId,
          type: ele.type,
          id: ele.id
        });
      });
      this.backListFun();
    },
    // 保存
    addClick() {
      var val = "";
      var self = this;
      this.shangLists.forEach(function(ele, ind) {
        if (ele.open == true) {
          val += ele.id + ",";
        }
      });
      this.xiaLists.forEach(function(ele, ind) {
        if (ele.open == true) {
          val += ele.id + ",";
        }
      });
      var appIdsVal = "";
      appIdsVal = val.substr(0, val.length - 1);
      var addOBj = {};
      if (this.fanweiLists[this.selDivIndex].num == 2) {
        addOBj = {
          oid: sessionStorage.getItem("orgId"),
          uid: sessionStorage.getItem("userId"),
          adminId: self.$route.query.id,
          deptIds: self.uBidsVal,
          uids: self.uidsVal,
          appIds: appIdsVal,
          scopeId: this.fanweiLists[this.selDivIndex].num
        };
        if (
          self.uBidsVal.length > 0 &&
          self.uidsVal.length > 0 &&
          appIdsVal.length > 0
        ) {
           if (this.timeTrue == false) {
          self.timeTrue = true;
          this.getorgAdmineditOrgAdmin(addOBj)
            .then(data => {
              if (data.code == "000000") {
                if (data.data == true) {
                    self.time = 60;
                let timer = setInterval(() => {
                  self.time--;
                  if (self.time == 0) {
                    clearInterval(timer);
                    self.timeTrue = false;
                  }
                }, 2000);
                  this.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                  var url = "/home/set/setchildManager";
                  this.$router.push({
                    path: url
                  });
                } else {
                  self.timeTrue = false;
                  this.$message({
                    type: "info",
                    message: "保存失败!"
                  });
                }
              } else {
                self.timeTrue = false;
                this.$message({
                  type: "info",
                  message: data.msg
                });
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
        }else{

        } 
        }else {
          var msgStr = "请填写完成信息";
          if (self.uBidsVal.length == 0) {
            msgStr = "特定部门，请选择最少一个部门";
          } else if (self.uidsVal.length == 0) {
            msgStr = "请选择最少一个成员";
          } else if (appIdsVal.length == 0) {
            msgStr = "请选择最少一个权限";
          }
          this.$message({
            type: "info",
            message: msgStr
          });
        }
      } else {
        addOBj = {
          oid: sessionStorage.getItem("orgId"),
          uid: sessionStorage.getItem("userId"),
          adminId: self.$route.query.id,
          deptIds: "",
          uids: self.uidsVal,
          appIds: appIdsVal,
          scopeId: this.fanweiLists[this.selDivIndex].num
        };
        if (self.uidsVal.length > 0 && appIdsVal.length > 0) {
           if (this.timeTrue == false) {
          self.timeTrue = true;
          this.getorgAdmineditOrgAdmin(addOBj)
            .then(data => {
              if (data.code == "000000") {
                if (data.data == true) {
                  self.time = 60;
                let timer = setInterval(() => {
                  self.time--;
                  if (self.time == 0) {
                    clearInterval(timer);
                    self.timeTrue = false;
                  }
                }, 1000);
                  var url = "/home/set/setchildManager";
                  this.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                  this.$router.push({
                    path: url
                  });
                } else {
                   self.timeTrue = false;
                  this.$message({
                    type: "info",
                    message: "保存失败!"
                  });
                }
              } else {
                 self.timeTrue = false;
                this.$message({
                  type: "info",
                  message: data.msg
                });
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
        }else{

        } 
        
        }else {
          var msgStr = "请填写完成信息";
          if (self.uidsVal.length == 0) {
            msgStr = "请选择最少一个成员";
          } else if (appIdsVal.length == 0) {
            msgStr = "请选择最少一个权限";
          }
          this.$message({
            type: "info",
            message: msgStr
          });
        }
      }
    },
    // 全选权限
    jurisdiction(event) {
      if (event.target.checked) {
        this.shangLists.forEach(function(ele, ind) {
          ele.open = true;
        });
        this.indexArr = this.xiaLists.length + this.shangLists.length;
      } else {
        this.shangLists.forEach(function(ele, ind) {
          ele.open = false;
        });
        this.indexArr = 0;
      }
      if (event.target.checked) {
        this.xiaLists.forEach(function(ele, ind) {
          ele.open = true;
        });
        this.indexArr = this.xiaLists.length + this.shangLists.length;
      } else {
        this.xiaLists.forEach(function(ele, ind) {
          ele.open = false;
        });
        this.indexArr = 0;
      }
    },
    fanweiListsClick(index) {
      this.selDivIndex = index;
      if (index == 2) {
        this.specMem = true;
      } else {
        this.specMem = false;
      }
    },
    //返回上级页面
    back: function() {
      var url = "/home/set/setchildManager";
      this.$router.push({
        path: url
      });
    },
    ...mapActions([
      "getdeptstaff",
      "getdeptgetchild",
      "getOrgTreeList",
      "getadminsave",
      "getauthgetAllAuth",
      "getorgAdmineditForward",
      "getorgAdmineditOrgAdmin",
      "getRequestList"
    ])
  }
};
</script>
<style scoped>
/*部门弹出*/

.definiBoxCenter > div {
  width: 500px;
  height: 410px;
  overflow-x: hidden;
  overflow-y: scroll;
  border: 1px solid #fff;
  margin-top: 10px;
}

.definiBoxCenter {
  width: 100%;
  height: 410px;
  background-color: #f4f4f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ccc;
}

.definiBoxTop {
  width: 100%;
  height: 66px;
  background-color: #fff;
  text-align: center;
  font-size: 16px;
  color: #303030;
  line-height: 66px;
}

.defini {
  width: 560px;
  height: 560px;
  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.5);
  animation: definiBox 0.8s;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  border-radius: 4px;
}

@keyframes definiBox {
  from {
    transform: translateY(-200px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.definiBox {
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

/*成员弹出*/

.centerCenter > div {
  width: 30px;
  height: 30px;
  background-color: #fff;
  color: #000;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
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

#nocenterLeftBotFourLiR {
  color: #ccc;
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
.centerLeftBotFourLiL > div:nth-child(3) {
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.centerLeftBotFourLiL > div:nth-child(2) img {
  width: 100%;
  height: 100%;
}

.centerLeftBotFourLiL > div:nth-child(2) {
  width: 17px;
  height: 17px;
  /* border-radius: 3px; */
  /* border: 1px solid #ececec; */
  margin-right: 3px;
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
  border: 1px solid #ececec;
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

#centerLeftBotOneShow {
  margin-top: 10px;
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

.centerLeftBotOne > div {
  width: 370px;
  /* height: 32px; */
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

/*成员弹出*/

.set {
  position: relative;
}

.addChildTop {
  width: calc(100%-88px);
  height: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-left: 44px;
  margin-right: 44px;
  padding-top: 20px;
  padding-bottom: 12px;
  color: #303030;
  font-size: 14px;
}

.addChildTop img {
  margin-right: 8px;
}

.addChildBot {
  width: calc(100%-88px);
  height: auto;
  margin-left: 44px;
  margin-right: 44px;
  margin-top: 20px;
}

.member {
  width: 100%;
  height: auto;
  padding-left: 54px;
  display: flex;
}

.member div {
  width: 320px;
  height: 30px;
  margin-left: 12px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 5px;
  line-height: 30px;
  color: #ccc;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.chainCommand {
  width: 100%;
  height: auto;
  margin-left: 27px;
  margin-top: 20px;
}

.branch {
  margin-left: 85px;
  margin-top: -20px;
  min-height: 80px;
}

.branchspecMem {
  width: 100%;
  /*height: 30px;*/
  margin-top: 10px;
}

.branchDiv {
  width: 100%;
  height: 25px;
  display: flex;
  align-items: center;
}

.branchDiv > div:nth-child(1) > div {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #ccc;
}

.branchDiv > div:nth-child(1) {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.branchDiv > div:nth-child(2) {
  margin-left: 10px;
}

#Specific {
  width: 320px;
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 5px;
  line-height: 30px;
  color: #ccc;
  border-radius: 3px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.privileges {
  width: 100%;
  height: auto;
  margin-left: 29px;
  margin-top: 24px;
}

#bracket {
  margin-left: 8px;
  color: #8f8e94;
  font-size: 14px;
}

#allJurisdiction {
  float: right;
  margin-right: 118px;
  color: #e7744a;
  font-size: 14px;
}

.BasicPermissions {
  width: 75%;
  height: auto;
  margin-left: 108px;
  margin-top: 16px;
}

.BasicPermissionsLi {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #303030;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}

.BasicPermissionsLi > div:nth-child(2) {
  display: flex;
  align-items: center;
}

.BasicPermissionsLi > div:nth-child(2) > div:nth-child(1) {
  width: 17px;
  height: 17px;
  border-radius: 3px;
  /* border: 1px solid #ccc; */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.BasicPermissionsLi > div:nth-child(2) > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.BasicPermissionsLi > div:nth-child(2) > div:nth-child(2) {
  margin-left: 10px;
}
#unChecked{
  width: 17px;
  height: 17px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.BasicPermissions ul li div {
  display: inline-block;
}

#first {
  width: auto;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
}

.ato {
  width: auto;
  height: 40px;
  line-height: 40px;
}

.allAA {
  width: auto;
  height: 40px;
  line-height: 40px;
  float: right;
}

.save {
  width: 100px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  background-color: #e7744a;
  border-radius: 4px;
  margin: 30px auto;
}

.save a {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #ffffff;
  font-size: 16px;
}

.radio_inner {
  margin-top: 1px;
  margin-left: -20px;
  float: left;
  width: 14px;
  height: 14px;
  background: url("/static/img/Slice.png") no-repeat -118px -113px;
}

label.checked .radio_inner {
  background-position: -98px -113px;
}

.radio_origins {
  opacity: 0;
  z-index: -1;
  position: absolute;
}
</style>
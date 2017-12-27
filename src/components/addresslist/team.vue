<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="set" id="setMain">
    <div class="excelUpload">
      <div>
        <span @click="goAddresslist">通讯录</span>
        <span>&gt团队邀请</span>
        <div class="openInvite" @click="openInviteClick">
          <div v-if="isOpenInvite == 0">
            关闭此功能
          </div>
          <div v-else>
            打开此功能
          </div>
        </div>
      </div>
      <div v-show="isOpenInvite == 0">
        <div class="teambuild">
          通过链接邀请
          <div class="copy" @click="copyClick">
            复制链接
          </div>
        </div>
        <div class="urlCss">
          <span>这是伯通邀请链接</span>
          <div>
            {{copyMddel}}
          </div>
          <textarea name="" id="copys" cols="30" rows="10" v-model="copyMddel"></textarea>
        </div>
        <div class="teambuild">团队二维码</div>
        <div class="QRcodeClass">
          <canvas id="canvas"></canvas>
          <div>右键复制或者下载此二维码，发送给好友。</div>
        </div>
      </div>
      <div class="teambuild">申请人列表</div>
      <div>
        <ul>
          <li v-show="applyForList.length == 0">暂无数据</li>
          <li class="list" v-for="(item,index) in applyForList" :key="index">
            <div>
              <img :src="item.avatar | imgFun" alt="申请人头像" title="申请人头像">
            </div>
            <div class="listDetails">
              <div>{{item.nick}}</div>
              <div>{{item.mobile}}</div>
            </div>
            <div v-show="item.state == 0" class="applyBut">
              <div @click="applyButClick(index)">
                同意
              </div>
              <div class="topselect" @click="applyButAnges(index)">
                <select v-model="applyModel" @change="applyButAnge">
                  <option v-for="(type,index) in applySelect" :value="type.key" :key="type.value">{{type.value}}</option>
                </select>
              </div>
            </div>
            <div v-show="item.state == 1" class="applyFont">
              已接受
            </div>
            <div v-show="item.state == 2" class="applyFont">
              已拒绝
            </div>
            <div v-show="item.state == 3" class="applyFont">
              已屏蔽
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 接受弹出框 -->
    <div class="consent" v-show="consentShow">
      <div class="consentBox">
        <div class="consentTop">
          <div class="consentName">
            {{boxName}}
          </div>
          <div class="consentCelClick" @click="cancelConsent">
            +
          </div>
        </div>
        <div class="consentIn">
          <div class="consentInFont">
            客户端展示
          </div>
          <div class="consentLi">
            <div class="boxList">
              <div class="boxListName">
                <div title="姓名" maxlength=20>
                  姓名
                </div>：
              </div>
              <div class="boxListInp">
                <input type="text" v-model="boxName">
              </div>
              <span class="redFont" v-show="isnameRedFont">
                请输入正确的姓名！（中文或英文）
              </span>
            </div>
            <div class="boxList">
              <div class="boxListName">
                <div title="邮箱">
                  邮箱
                </div>：
              </div>
              <div class="boxListInp">
                <input type="text" v-model="mailbox">
              </div>
              <span class="redFont" v-show="isMailboxRedFont">
                请输入正确的邮箱！（不支持特殊字符）
              </span>
            </div>
            <div class="boxList">
              <div class="boxListName">
                <div title="电话">
                  手机号
                </div>：
              </div>
              <div class="boxListInp">
                <input type="text" maxlength="11" v-model="phone">
              </div>
              <span class="redFont" v-show="isphoneRedFont">
                请输入正确的手机号码！
              </span>
            </div>
            <div class="boxList">
              <div class="boxListName">
                <div title="电话">
                  职位
                </div>：
              </div>
              <div class="boxListInp">
                <input type="text" v-model="position">
              </div>
              <span class="redFont" v-show="ispositionRedFont">
                请输入正确的职位！（不支持特殊字符）
              </span>
            </div>
            <div class="boxList" v-for="(item,index) in consentList" :key='item.cKey' :value='item.cKey'>
              <div class="boxListName">
                <div :title="item.cKey">
                  {{item.cKey}}
                </div>：
              </div>
              <div class="boxListInp">
                <input type="text" v-model="consentList[index].val" @input="consentInt(index)">
              </div>
              <span class="redFont" v-show="item.showFont">
                {{item.isRedFont}}
              </span>
            </div>
          </div>
          <div class="department">
            <div class="departmentName">
              部门：
            </div>
            <div id="departmentSelect">
              <template>
                <el-select v-model="departmentOk" multiple placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </div>
            <span class="departmentRedFont" v-show="isdepartmentRedFont">
              请选择部门
            </span>
          </div>
          <div class="consentInFont" v-show="consentNoList.length>0">
            <span>客户端不展示</span>
            <span>设置客户端展示信息</span>
          </div>
          <div class="consentLiBot" v-show="consentNoList.length>0">
            <div class="boxList" v-for="(item,index) in consentNoList" :key='item.cKey' :value='item.cKey'>
              <div class="boxListName">
                <div :title="item.cKey">
                  {{item.cKey}}
                </div>：
              </div>
              <div class="boxListInp">
                <input type="text" v-model="item.val" @input="consentNoChag(index)">
              </div>
              <span class="redFont" v-show="item.showFont">
                {{item.isRedFont}}
              </span>
            </div>
          </div>
        </div>
        <div class="consentAdd">
          <div class="consentAddClick" @click="keepClick">
            保存
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
require("../../../api/api.js");
import Vue from "vue";
import { mapActions } from "vuex";
import QRCode from "qrcode";
Vue.use(QRCode);
export default {
  name: "set",
  data() {
    return {
      applyForList: [], //申请人列表
      imgs: "/static/img/tx@2x.png",
      copyMddel:
        "https://api.botong.tech/user/" +
        sessionStorage.getItem("orgId") +
        "/" +
        sessionStorage.getItem("phoneVal"),
      applySelect: [
        { value: "请选择", key: "QXZ" },
        { value: "拒绝", key: "2" },
        { value: "屏蔽", key: "3" }
      ],
      applyModel: "QXZ", //申请人操作
      isOpenInvite: 0, //邀请功能
      applystate: "", //处理结果
      applyIndex: "", //申请人列表index
      consentShow: false, //接受弹出框
      consentList: [
        { cKey: "姓名", eKey: "uo_name" },
        { cKey: "邮箱", eKey: "uo_email" },
        { cKey: "手机号", eKey: "uo_phone" },
        { cKey: "职位", eKey: "uo_position" }
      ], //客户端展示数组
      consentNoList: [], //客户端不展示数组
      options: [], //可选部门数组
      departmentOk: [], //已选部门数组
      boxName: "", //弹框 姓名
      isnameRedFont: false, // 姓名 正则
      mailbox: "", //弹框 邮箱
      isMailboxRedFont: false, //邮箱正则
      phone: "", //弹框 电话号
      isphoneRedFont: false, //电话号 正则
      position: "", //弹框 职位
      ispositionRedFont: false, //职位正则
      isdepartmentRedFont: false //部门正则
    };
  },
  filters: {
    imgFun: function(val) {
      if (val) {
        return val;
      } else {
        return "/static/img/tx@2x.png";
      }
    }
  },
  created: function() {
    if (sessionStorage.getItem("orgId") == undefined) {
      return;
    }
    var self = this;
    self
      .getteamgetTeamInvite({
        oid: sessionStorage.getItem("orgId"),
        uid: sessionStorage.getItem("userId")
      })
      .then(data => {
      
        if (data.code == "000000") {
          if (data.data) {
            self.applyForList = data.data.applyList;
            self.isOpenInvite = data.data.isOpenInvite;
          } else {
            self.$message({
              type: "info",
              message: "获取数据失败！"
            });
          }
        } else {
          self.$message({
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
            message: "服务器没有启动!"
          });
        }
      });
  },
  watch: {
    //姓名
    boxName: function(val) {
      var reg_2 = /^[\u4e00-\u9fa5a-zA-Z]+$/; //输入中文或英文
      if (reg_2.test(val)) {
        this.isnameRedFont = false;
      } else {
        this.isnameRedFont = true;
      }
    },
    //邮箱
    mailbox: function(val) {
      this.isMailboxRedFont = false;
    },
    //手机号
    phone: function(val) {
      this.isphoneRedFont = false;
      var a = val;
      this.phone = a.replace(/\D/g, "");
    },
    //职位
    position: function(val) {
      var reg_2 = /^[\u4e00-\u9fa5a-zA-Z]+$/; //输入中文或英文
      if (reg_2.test(val)) {
        this.ispositionRedFont = false;
      } else {
        this.ispositionRedFont = true;
      }
    },
    departmentOk: function() {
      if (this.departmentOk.length > 0) {
        this.isdepartmentRedFont = false;
      }
    }
  },
  methods: {
    goAddresslist() {
      this.$router.push({
        path: "/home/addresslist"
      });
    },
    //复制事件
    copyClick() {
      var Url2 = document.getElementById("copys");
      Url2.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        type: "success",
        message: "复制成功！"
      });
    },
    //生成二维码
    useqrcode() {
      var canvas = document.getElementById("canvas");
      QRCode.toCanvas(canvas, this.copyMddel, function(error) {
        if (error) console.error(error);
      
      });
    },
    //开启/关闭邀请功能
    openInviteClick() {
      var open = "";
      if (this.isOpenInvite == 0) {
        open = 1;
      } else {
        open = 0;
      }
      var self = this;
      self
        .getopenInvite({
          oid: sessionStorage.getItem("orgId"),
          uid: sessionStorage.getItem("userId"),
          isOpenInvite: open
        })
        .then(data => {
       
          if (data.code == "000000") {
            this.isOpenInvite = open;
          } else {
            self.$message({
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
              message: "服务器没有启动!"
            });
          }
        });
    },
    //同意
    applyButClick(index) {
      this.applyIndex = index;
      this.applystate = 1;
      this.consentShow = true;
      this.boxName = this.applyForList[index].nick;
      this.phone = this.applyForList[index].mobile;
      var self = this;
      //获取用户编辑/申请人弹框表格
      self
        .getUserAttrTemplateInfo({
          oid: sessionStorage.getItem("orgId"),
          uid: sessionStorage.getItem("userId")
        })
        .then(data => {
          
          if (data.code == "000000") {
            if (data.data) {
              var arr = [];
              data.data.showAttrList.forEach(function(ele, ind) {
                arr.push({
                  cKey: ele.cKey,
                  eKey: ele.eKey,
                  val: null,
                  showFont: false,
                  isRedFont: null
                });
              });
              for (var i = 0; i < arr.length; i++) {
                if (arr[i].eKey == "uo_name") {
                  //姓名
                  arr.splice(i, 1);
                }
              }
              for (var i = 0; i < arr.length; i++) {
                if (arr[i].eKey == "uo_email") {
                  //邮箱
                  arr.splice(i, 1);
                }
              }
              for (var i = 0; i < arr.length; i++) {
                if (arr[i].eKey == "uo_phone") {
                  //手机号
                  arr.splice(i, 1);
                }
              }
              for (var i = 0; i < arr.length; i++) {
                if (arr[i].eKey == "dept") {
                  //部门
                  arr.splice(i, 1);
                }
              }
              for (var i = 0; i < arr.length; i++) {
                if (arr[i].eKey == "uo_position") {
                  //职位
                  arr.splice(i, 1);
                }
              }
              self.consentList = arr;
              data.data.hideAttrList.forEach(function(ele, ind) {
                self.consentNoList.push({
                  cKey: ele.cKey,
                  eKey: ele.eKey,
                  val: null,
                  showFont: false,
                  isRedFont: null
                });
              });
            } else {
              self.$message({
                type: "info",
                message: "获取数据失败1！"
              });
            }
          } else {
            self.$message({
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
              message: "服务器没有启动!"
            });
          }
        });
      //获取部门列表
      self
        .getDeptPathList({
          oid: sessionStorage.getItem("orgId"),
          uid: sessionStorage.getItem("userId")
        })
        .then(data => {
         
          if (data.code == "000000") {
            if (data.data) {
              data.data.forEach(function(ele, ind) {
                self.options.push({
                  value: ele.deptId,
                  label: ele.deptPathName
                });
              });
            } else {
              self.$message({
                type: "info",
                message: "获取部门失败！"
              });
            }
          } else {
            self.$message({
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
              message: "服务器没有启动!"
            });
          }
        });
    },
    //正则验证
    regularFun() {
      var self = this;
      var reg_1 = /^[\s]*$/; //输入为空
      var reg_2 = /^[\u4e00-\u9fa5a-zA-Z]+$/; //输入中文或英文
      var reg_3 = /^1[3|4|5|8|9|7][0-9]\d{8}$/; //输入手机号码
      var reg_4 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; //邮箱正则
      var reg_5 = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*；,;（）——|{}【】]"); //特殊字符
      //姓名
      if (reg_1.test(self.boxName) || !reg_2.test(self.boxName)) {
        this.isnameRedFont = true;
      } else {
        this.isnameRedFont = false;
      }
      //邮箱
      // if (reg_1.test(self.mailbox) || !reg_4.test(self.mailbox)) {
      //   this.isMailboxRedFont = true;
      // } else {
      //   this.isMailboxRedFont = false;
      // }
      //手机号
      if (reg_1.test(self.phone) || !reg_3.test(self.phone)) {
        this.isphoneRedFont = true;
      } else {
        this.isphoneRedFont = false;
      }
      //职位
      // if (reg_1.test(self.position) || reg_5.test(self.position)) {
      //   this.ispositionRedFont = true;
      // } else {
      //   this.ispositionRedFont = false;
      // }
      //部门
      if (this.departmentOk.length > 0) {
        this.isdepartmentRedFont = false;
      } else {
        this.isdepartmentRedFont = true;
      }
      //客户端展示循环列表正则
      var consentShowFont = false;
      for (var i = 0; i < self.consentList.length; i++) {
        if (reg_5.test(self.consentList[i].val)) {
          consentShowFont = true;
          self.consentList[i].showFont = true;
          self.consentList[i].isRedFont = "不支持特殊字符";
        } else {
          self.consentList[i].showFont = false;
        }
      }
      //客户不端展示循环列表正则
      var consentNoShowFont = false;
      for (var i = 0; i < self.consentNoList.length; i++) {
        if (reg_5.test(self.consentNoList[i].val)) {
          consentNoShowFont = true;
          self.consentNoList[i].showFont = true;
          self.consentNoList[i].isRedFont = "不支持特殊字符";
        } else {
          self.consentNoList[i].showFont = false;
        }
      }
      //           this.ispositionRedFont == true ||           this.isMailboxRedFont == true ||
      if (
        this.isnameRedFont == true ||
        this.isphoneRedFont == true ||
        this.isdepartmentRedFont == true ||
        consentShowFont == true ||
        consentNoShowFont == true
      ) {
        return false;
      } else {
        return true;
      }
    },
    //客户端展示循环列表正则监视
    consentInt(index) {
      this.consentList[index].showFont = false;
    },
    //客户端不展示循环列表正则监视
    consentNoChag(index) {
      this.consentNoList[index].showFont = false;
    },
    //保存
    keepClick() {
      var self = this;
      if (self.regularFun() == false) {
        return;
      } else {
        var arry = [];
        if (self.consentList.length > 0) {
          self.consentList.forEach(function(ele, ind) {
            arry.push({
              ckey: ele.cKey,
              ekey: ele.eKey,
              val: ele.val
            });
          });
          arry.push(
            { ckey: "姓名", ekey: "uo_name", val: self.boxName },
            { ckey: "邮箱", ekey: "uo_email", val: self.mailbox },
            { ckey: "职位", ekey: "uo_position", val: self.position },
            { ckey: "手机号", ekey: "uo_phone", val: self.phone }
          );
        } else {
          arry.push(
            { ckey: "姓名", ekey: "uo_name", val: self.boxName },
            { ckey: "邮箱", ekey: "uo_email", val: self.mailbox },
            { ckey: "职位", ekey: "uo_position", val: self.position },
            { ckey: "手机号", ekey: "uo_phone", val: self.phone }
          );
        }
        if (self.consentNoList.length > 0) {
          self.consentNoList.forEach(function(ele, ind) {
            arry.push({
              ckey: ele.cKey,
              ekey: ele.eKey,
              val: ele.val
            });
          });
        } 
        // else {
        //   return arry;
        // }
        var arrString = JSON.stringify(arry);
        var departmentOkString = self.departmentOk.join(",");
        //接受/保存申请人
        self
          .getsaveOrgUserAttr({
            oid: sessionStorage.getItem("orgId"),
            mobile: self.phone,
            dept: departmentOkString,
            attrArray: arrString
          })
          .then(data => {
           
            if (data.code == "000000") {
              self.consentShow = false;
              self.operation();
            } else {
              self.$message({
                type: "info",
                message: data.msg
              });
            }
          })
          .catch(msg => {
            self.$message({
              type: "info",
              message: "保存失败！"
            });
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
                message: "服务器没有启动!"
              });
            }
          });
      }
    },
    //取消接受弹框
    cancelConsent() {
      this.consentShow = false;
    },
    //拒绝/屏蔽点击
    applyButAnges(index) {
      this.applyIndex = index;
    },
    //拒绝/屏蔽下拉
    applyButAnge() {
      if (this.applyModel == "QXZ") {
        return;
      } else {
        this.applystate = this.applyModel;
        this.operation();
      }
    },
    //申请人操作接口
    operation() {
      var self = this;
      self
        .getmodifyApplyInfo({
          oid: sessionStorage.getItem("orgId"),
          uid: sessionStorage.getItem("userId"),
          applyId: self.applyForList[this.applyIndex].id,
          state: self.applystate
        })
        .then(data => {
    
          if (data.code == "000000") {
            self.applyForList[self.applyIndex].state = self.applystate;
          } else {
            self.$message({
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
              message: "服务器没有启动!"
            });
          }
        });
    },
    ...mapActions([
      "getteamgetTeamInvite",
      "getsaveOrgUserAttr",
      "getopenInvite",
      "getmodifyApplyInfo",
      "getUserAttrTemplateInfo",
      "getDeptPathList"
    ])
  },
  mounted() {
    //生成二维码
    this.useqrcode();
  }
};
</script>
<style scoped>
p {
  margin-bottom: 20px;
}

.active {
  background-color: rgba(228, 74, 17, 0.6);
  color: #fff;
}

input[type="file"] {
  display: none;
}

label {
  margin-bottom: 0;
  font-weight: normal;
  color: #fff;
  width: 68px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  background-color: #e7744a;
  margin-left: 5px;
  text-align: center;
  cursor: pointer;
}

.excelUpload {
  width: 1008px;
  margin: 0 auto;
  padding: 0 20px;
}

.excelUpload > div:nth-child(1) {
  margin-top: 30px;
}

.excelUpload > div:nth-child(1) div {
  float: right;
  height: 20px;
  line-height: 20px;
  width: 70px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
}

.openInvite {
  border: 1px solid #888888;
  border-radius: 3px;
}

.excelUpload > div {
  margin-bottom: 30px;
}

.excelUpload > div:nth-child(1) > span:nth-child(1) {
  color: #e7744a;
  cursor: pointer;
}

.teambuild {
  margin-bottom: 20px;
  width: 100%;
  background: #e7744a;
  padding: 9px;
  color: #ffffff;
  border: 1px solid #e7744a;
  border-radius: 4px;
}

.urlcss {
  color: blue;
}

.copy {
  float: right;
  cursor: pointer;
}

.QRcodeClass {
  display: flex;
}

.QRcodeClass > div:nth-child(1) {
  width: 100px;
  height: 100px;
}

.QRcodeClass > div:nth-child(2) {
  height: 14px;
  width: 280px;
  padding: 83px 0 0 10px;
}

.list {
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
  border-bottom: 1px solid #aeaeae;
}

.list > div:nth-child(1) {
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

.list > div:nth-child(1) img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.listDetails {
  width: 77%;
  margin-left: 10px;
}

.listDetails div {
  height: 24px;
  line-height: 24px;
}

.urlCss {
  display: flex;
  margin-bottom: 20px !important;
}

.urlCss div {
  min-width: 50px;
  height: 24px;
  padding-left: 8px;
  margin: 0 !important;
}

textarea {
  height: 0px;
  background: white;
  border: none;
  position: relative;
  top: -1000px;
  left: -1000px;
}

#canvas {
  width: 100px;
  height: 100px;
  cursor: pointer;
}

.applyBut {
  display: flex;
  margin-top: 10px;
}

.applyBut > div:nth-child(1) {
  width: 75px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  margin-right: 5px;
  color: white;
  background: #e7744a;
  border-radius: 4px;
  cursor: pointer;
}

.applyFont {
  margin-top: 10px;
  width: 160px;
  height: 32px;
  line-height: 32px;
  text-align: center;
}

.topselect > select {
  width: 75px;
  height: 32px;
  line-height: 32px;
  padding-left: 10px;
  color: #8f8e94;
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/blueArrows.jpg") 92% 12px no-repeat transparent;
  font-size: 14px;
  color: #97969b;
  border: 1px solid #aeaeae;
  overflow: hidden;
  cursor: pointer;
}

select::-ms-expand {
  display: none;
}

/* 添加弹出框 */

.consent {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.consentBox {
  width: 900px;
  min-height: 415px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 #dbdbdb;
  border-radius: 5px;
  margin: calc((100vh - 480px) / 2) auto;
  overflow: hidden;
  z-index: 1000;
}

.consentTop {
  width: 900px;
  height: 55px;
  background-color: #e7744a;
  color: white;
}

.consentCelClick {
  float: right;
  width: 55px;
  height: 55px;
  line-height: 55px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  transform: rotate(45deg);
  cursor: pointer;
}

.consentName {
  float: left;
  height: 55px;
  line-height: 55px;
  font-size: 16px;
  padding-left: 24px;
}

.consentIn {
  min-height: 285px;
  width: 900px;
  border-bottom: 1px solid #e7744a;
}

.consentInFont {
  width: 852px;
  margin: 20px 24px 0 24px;
  font-size: 20px;
  border-bottom: 1px solid #e7744a;
}

.consentInFont > span:nth-child(2) {
  font-size: 14px;
  margin-left: 30px;
  color: #6b6b6b;
}

.consentLi {
  min-height: 55px;
  max-height: 110px;
  width: 852px;
  margin-left: 24px;
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
}

.consentLiBot {
  margin-left: 24px;
  margin-top: 12px;
  width: 852px;
  min-height: 55px;
  max-height: 110px;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
}

.boxList {
  padding: 0 13px;
  width: 400px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.redFont {
  color: red;
  position: absolute;
  bottom: -10px;
  left: 100px;
  font-size: 10px;
}

.departmentRedFont {
  color: red;
  position: absolute;
  bottom: -20px;
  right: 150px;
  font-size: 10px;
}

.boxListInp input {
  width: 315px;
  height: 34px;
  line-height: 34px;
  border: 1px solid #e7744a;
  border-radius: 4px;
  padding-left: 4px;
}

.consentAdd {
  width: 900px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.consentAddClick {
  width: 56px;
  height: 35px;
  background: #e7744a;
  cursor: pointer;
  border-radius: 4px;
  color: white;
  line-height: 35px;
  text-align: center;
}

.department {
  margin: 12px 0 0 36px;
  display: flex;
  position: relative;
}

.departmentName {
  height: 32px;
  line-height: 32px;
  margin-right: 17px;
}

.el-select {
  width: 716px;
  max-height: 110px;
  min-height: 32px;
}

.boxListName {
  display: flex;
  line-height: 32px;
}

.boxListName div {
  max-width: 42px;
  height: 32px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#setMain{
height: 100%;overflow-x: hidden;overflow-y: auto;
}
</style>
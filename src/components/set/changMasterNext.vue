<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="masterTop">
            <a href="javascript:;" @click='backtrack'>
                <img src="../../../static/img/Shape.png" alt="" />
            </a> 修改完成后，绑定找回密码的手机号会修改为新手机号
        </div>
        <div class="masterBot">
            <div class="BindingAccount">
                <ul>
                    <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;绑定伯通账号</li>
                    <li id='asterisk'>*</li>
                    <li>：</li>
                    <li id='interval' class="userSearch">
                        <div>
                            <input type="text" v-model.trim="searchVal" @keydown="reqGoodsSearched()" placeholder="请输入关键词手机号码或者名字">
                        </div>
                        <div v-show="searchShow">
                            <ul>
                                <li v-show="userLists.length > 0" :key="item" @click="userSarchClick(index)" class="userSearchLi" v-for="(item,index) in userLists">
                                    <div>
                                        {{item.name}}
                                    </div>
                                    <div>
                                        {{item.mobile}}
                                    </div>
                                </li>
                                <li v-show="userLists.length == 0">
                                    <div>
                                        暂无数据
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="telPhone">
                <ul>
                    <li>手机号</li>
                    <li id='asterisk'>*</li>
                    <li>：</li>
                    <li id='interval'>
                        <input type="text" disabled v-model='telphoneVal' @focus='inputFocus' @blur='inputOut' :class="{borderMa:IsborderMa}" />
                        <div id="prompt" v-show='promptTitle'>
                            请输入正确的手机号码
                        </div>
                    </li>
                    <li class='textCode'>
                        <ziksang-count-down :start='start' @countDown='start=false' @click.native='sendCode'></ziksang-count-down>
                    </li>
                </ul>
            </div>
            <div class="authCode">
                <ul>
                    <li>验证码</li>
                    <li id='asterisk'>*</li>
                    <li>：</li>
                    <li id='interval'>
                        <input type="text" v-model="code"  minlength="4" maxlength="4" placeholder='请填写验证码' :class="{borderMa:IsborderMa}" @focus='inputFocus' @blur='inputOut'
                        />
                        <div id="captcha" v-show='captcha'>
                            请输入正确的验证码
                        </div>
                    </li>
                </ul>
            </div>
            <div class="masterNext">
                <a href="javascript:;" @click='complete'>完成</a>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import ZiksangCountDown from "../my_component.vue"; //这里引入全局组件
export default {
  components: { ZiksangCountDown }, //这里注册全局组件
  name: "set",
  data() {
    return {
      searchVal: "",
      start: false,
      telphoneVal: "",
      promptTitle: false,
      IsborderMa: false,
      captcha: false,
      code: "",
      searchShow: false,
      searchTrue: false,
      userLists: [],
      token: "",
      time: 60,
      timeTrue: false,
      sssssTrue: false
    };
  },
  created: function() {
    if(sessionStorage.getItem("orgId") == undefined){
      return
    }
    var self = this;
    self
      .gettoken({})
      .then(data => {
        if (data.code == "000000") {
          this.token = data.data.token;
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
  watch: {
    searchVal: function(val) {
      var self = this;
      if (this.sssssTrue == false) {
      
        if (self.searchVal.length > 0) {
          self.searchShow = true;
        } else {
          self.searchShow = false;
        }
        self
          .getRequestList({
            oid: sessionStorage.getItem("orgId"),
            uid: sessionStorage.getItem("userId"),
            searchKey: val
          })
          .then(data => {
            if (data.code == "000000") {
              self.userLists = data.data;
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
  methods: {
    reqGoodsSearched() {
      var self = this;
      this.sssssTrue = false;
    },
    userSarchClick(index) {
      this.telphoneVal = this.userLists[index].mobile;
      this.searchVal = this.userLists[index].name;
      this.searchShow = false;
      this.sssssTrue = true;
    },
    // 短信验证码组件
    sendCode(value) {
      var self = this;
      if (self.valiorPhone()) {
        if (self.timeTrue == false) {
          self.timeTrue = true;

          self
            .getcodesms({
              token: self.token,
              to: self.telphoneVal
            })
            .then(data => {
              if (data.code == "000000") {
                self.time = 60;
                let timer = setInterval(() => {
                  self.time--;
                  if (self.time == 0) {
                    clearInterval(timer);
                    self.timeTrue = false;
                  }
                }, 1000);
                self.start = true;
              } else {
                self.$message({
                  type: "info",
                  message: data.msg
                });
                self.start = false;
                self.timeTrue = false;
              }
            })
            .catch(msg => {
              self.start = false;
              self.timeTrue = false;
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
            message: "验证码已经发送请查看手机!"
          });
        }
      } else {
        if (!this.valiorPhone()) {
          this.valiorPhone();
        }
      }
    },
    // 手机号验证
    valiorPhone() {
      var flag = true;
      var patterna = /^1[34578]\d{9}$/; //手机号验证
      var pattern = /[`~!@#\$%\^\&\*_\+<>\?:"\{\},\.\\\/;'\[\]]/; //非法字符验证
      var feiK = /^\s*$/g; //非空验证
      if (feiK.test(this.telphoneVal)) {
        this.promptTitle = true;
        flag = false;
      } else {
        if (!patterna.test(this.telphoneVal)) {
          this.promptTitle = true;
          flag = false;
        }
      }
      return flag;
    },
    // 返回上一级
    backtrack: function() {
      var url = "/home/set/changeMaster";
      this.$router.push({
        path: url
      });
    },
    // 输入框获取焦点改变边框颜色
    inputFocus: function(e) {
      this.IsborderMa = false;
      e.srcElement.style.borderColor = "#E7744A";
      this.promptTitle = false;
    },
    //			输入框失去焦点改变边框颜色
    inputOut: function(e) {
      e.srcElement.style.borderColor = "rgba(0,0,0,0.1)";
    },
    // 短信验证码校验
    valiorMessage() {
      var flag = true;
      var patterna = /^\d{4}$/;
      var pattern = /[`~!@#\$%\^\&\*_\+<>\?:"\{\},\.\\\/;'\[\]]/; //非法字符验证
      var feiK = /^\s*$/g; //非空验证
      if (feiK.test(this.code)) {
        flag = false;
      } else {
        if (!patterna.test(this.code)) {
          flag = false;
        }
      }
      return flag;
    },
    //  完成
    complete: function() {
      var self = this;
      if (this.valiorMessage()) {
        this.getadminchange({
          oid: sessionStorage.getItem("orgId"),
          uid: sessionStorage.getItem("userId"),
          mobile: this.telphoneVal,
          codeToken: this.token,
          code: this.code
        })
          .then(data => {
            if (data.code == "000000") {
              if (data.data == true) {
                this.$message({
                  type: "success",
                  message: "绑定成功！"
                });
                this.$router.push({
                  path: "/login"
                });
                sessionStorage.removeItem("orgId");
                sessionStorage.removeItem("userId");
                sessionStorage.removeItem("orgName");
                sessionStorage.removeItem("phoneVal");
              } else {
                this.$message({
                  type: "info",
                  message: "绑定失败！"
                });
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
        if (!this.valiorMessage()) {
          this.valiorMessage();
        }
      }
    },
    ...mapActions([
      "changeMaster",
      "getadminchange",
      "getcodesms",
      "getRequestList",
      "gettoken"
    ])
  }
};
</script>
<style scoped>
.userSearch {
  position: relative;
}

.userSearch > div:nth-child(1) {
  width: 240px;
  height: 36px;
  position: absolute;
  top: 0;
  left: 0;
}

.userSearch > div:nth-child(2) {
  width: 240px;
  background-color: #ccc;
  z-index: 500;
  position: absolute;
  top: 35px;
  left: 0;
  border: 1px solid #ccc;
  background-color: #fff;
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.userSearch > div:nth-child(2) > ul li {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
}

.userSearchLi > div:nth-child(1) {
  width: 100%;
  font-size: 17px;
  color: #303030;
  margin-top: 5px;
  margin-left: 10px;
}

.userSearchLi > div:nth-child(2) {
  width: 100%;
  font-size: 15px;
  margin-left: 10px;
  color: #303030;
}

.userSearch > div:nth-child(2) > ul li:nth-last-of-type(1) {
  border: 0;
}

.masterTop {
  width: calc(100%-88px);
  height: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  margin-left: 44px;
  margin-right: 44px;
  padding-top: 20px;
  padding-bottom: 12px;
  color: #303030;
  font-size: 14px;
}

.masterTop a {
  margin-right: 8px;
}

.masterBot {
  width: calc(100%-88px);
  height: 251px;
  margin-left: 44px;
  margin-right: 44px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}

.masterBot ul li {
  float: left;
}

.BindingAccount,
.telPhone,
.authCode {
  width: 100%;
  height: 40px;
  color: #303030;
  font-size: 14px;
}

.BindingAccount input {
  width: 240px;
  height: 36px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-top: -10px;
  padding-left: 5px;
}

.telPhone input {
  width: 240px;
  height: 36px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-top: -10px;
  padding-left: 5px;
}

.textCode {
  margin-top: -8px;
  margin-left: 70px;
}

.authCode input {
  width: 240px;
  height: 36px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-top: -10px;
  padding-left: 5px;
}

#interval {
  margin-left: 12px;
}

#asterisk {
  color: #e7744a;
  font-size: 14px;
  margin-top: -4px;
}

.BindingAccount {
  margin-top: 20px;
  padding-left: 70px;
}

.telPhone,
.authCode {
  margin-top: 20px;
  padding-left: 141px;
}

.masterNext {
  width: 100px;
  height: 34px;
  background-color: #e7744a;
  border-radius: 4px;
  margin-top: 30px;
  text-align: center;
  line-height: 34px;
  margin-left: 312px;
}

.masterNext a {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #ffffff;
  font-size: 16px;
}

#prompt {
  color: #e7744a;
  font-size: 12px;
}
</style>
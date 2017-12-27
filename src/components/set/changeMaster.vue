<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="masterTop">
            更换主管理账号，需要验证当前主管理账号的身份
        </div>
        <div class="masterBot">
            <div class="BindingAccount">
                <ul>
                    <li>当前绑定伯通账号</li>
                    <li id='asterisk'>*</li>
                    <li>：</li>
                    <li id='interval'>{{userName}}</li>
                </ul>
            </div>
            <div class="telPhone">
                <ul>
                    <li>手机号</li>
                    <li id='asterisk'>*</li>
                    <li>：</li>
                    <li id='interval'>
                        <input type="text" placeholder='请输入手机号' disabled v-model='telphone' @focus='inputFocus' @blur='inputOut' onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" :class="{borderMa:IsborderMa}" />
                        <div id="prompt" v-show='promptTitle'>
                            请输入正确的手机号码
                        </div>
                    </li>
                    <li class='textCode'>
                        <ziksang-count-down :start='start' @countDown='start=false' @click.native='sendCodeClick'></ziksang-count-down>
                    </li>
                </ul>
            </div>
            <div class="authCode">
                <ul>
                    <li>验证码</li>
                    <li id='asterisk'>*</li>
                    <li>：</li>
                    <li id='interval'>
                        <input type="text" placeholder='请填写验证码' minlength="4" maxlength="4" v-model="code" :class="{borderMa:IsborderMa}" @focus='inputFocus' @blur='inputOut'/>
                         <div id="captcha" v-show="captcha1">短信验证码不正确，请重新输入</div>
                        <div id="captcha" v-show="captcha2">短信验证码不能为空</div>
                    </li>
                </ul>
            </div>
            <div class="masterNext">
                <a href="javascript:;" @click='masterNext'>下一步</a>
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
      start: false,
      telphone: "",
      promptTitle: false,
      IsborderMa: false,
      captcha2: false,
      captcha1: false,
      token: "",
      code: "",
      userName: "",
      timeTrue: false,
      time: 60
    };
  },

  created: function() {
    var self = this;
    if(sessionStorage.getItem("orgId") == undefined){
      return
    }
    this.userName = sessionStorage.getItem("userName") || "暂无";
    this.telphone = sessionStorage.getItem("phoneVal") || "暂无";
    var self = this;
    var phoneStr = sessionStorage.getItem("phoneVal");
    self.telPhone = phoneStr;
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
  watch: {},
  methods: {
    //  短信验证码组件
    sendCodeClick(value) {
      var self = this;
      if (this.valiorPhone()) {
        if (this.timeTrue == false) {
          self.timeTrue = true;
          this.getcodesms({
            token: this.token,
            to: this.telPhone
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

                this.start = true;
              } else {
                this.$message({
                  type: "info",
                  message: data.msg
                });
                this.start = false;
                self.timeTrue = false;
              }
            })
            .catch(msg => {
              this.start = false;
              this.timeTrue = false;
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
            message: "验证码已经发送,请查看手机!"
          });
        }
      } else {
        if (!this.valiorPhone()) {
          this.valiorPhone();
        }
      }
    },
    //  输入框获取焦点改变边框颜色
    inputFocus: function(e) {
      this.IsborderMa = false;
      e.srcElement.style.borderColor = "#E7744A";
      this.promptTitle = false;
    },
    //			输入框失去焦点改变边框颜色
    inputOut: function(e) {
      e.srcElement.style.borderColor = "rgba(0,0,0,0.1)";
    },
    // 手机号验证
    valiorPhone() {
      var flag = true;
      var patterna = /^1[34578]\d{9}$/; //手机号验证
      var pattern = /[`~!@#\$%\^\&\*_\+<>\?:"\{\},\.\\\/;'\[\]]/; //非法字符验证
      var feiK = /^\s*$/g; //非空验证
      if (feiK.test(this.telPhone)) {
        this.telVel1 = true;
        flag = false;
      } else {
        if (!patterna.test(this.telPhone)) {
          this.telVel = true;
          flag = false;
        }
      }
      return flag;
    },
    // 短信验证码校验
    valiorMessage() {
      var flag = true;
      var patterna = /^\d{4}$/;
      var pattern = /[`~!@#\$%\^\&\*_\+<>\?:"\{\},\.\\\/;'\[\]]/; //非法字符验证
      var feiK = /^\s*$/g; //非空验证
      if (feiK.test(this.code)) {
        flag = false;
        this.captcha2 = true;
      } else {
        this.captcha2 = false;
        if (!patterna.test(this.code)) {
          flag = false;
          this.captcha1 = true;
        } else {
          this.captcha1 = false;
        }
      }
      return flag;
    },
    // 跳转下一级
    masterNext: function() {
      var self = this;
      if (this.valiorMessage()) {
        this.getadminvalidate({
          oid: sessionStorage.getItem("orgId"),
          uid: sessionStorage.getItem("userId"),
          mobile: this.telphone,
          codeToken: this.token,
          code: this.code
        })
          .then(data => {
            if (data.code == "000000") {
              if (data.data == true) {
                this.$message({
                  type: "success",
                  message: "验证成功！"
                });
                var url = "/home/set/changMasterNext";
                this.$router.push({
                  path: url
                });
              } else {
                this.$message({
                  type: "info",
                  message: data.msg
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
      "changMasterNext",
      "getadminvalidate",
      "getcodesms",
      "gettoken"
    ])
  }
};
</script>
<style scoped>
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
  height: 45px;
  color: #303030;
  font-size: 14px;
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
  color: #ff5f57;
  font-size: 12px;
  margin-top: 6px;
}

#captcha {
  color: #ff5f57;
  font-size: 12px;
  margin-top: 6px;
}

.borderMa {
  border: 1px solid #ff5f57 !important;
}
</style>

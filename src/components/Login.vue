<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="app" class="login">
    <div class="loginTop">
      <img src="../../static/img/logo.png" alt=""> 伯通管理后台
    </div>
    <div class="loginBot">
      <div class="loginLeft">
        <div class="botong">Bo Tong</div>
        <div class="cloud">Cloud Administration</div>
        <div class="welcome">欢迎使用伯通云管理系统</div>
      </div>
      <div class="loginRight">
        <div class="loginTitle">管理端登录</div>
        <div class="markedWordsBox">
          <div class="markedWords" v-show="markedWords">账号或密码输入不正确，请重新输入</div>
          <div class="markedWords" v-show="markedWords_1">验证码输入不正确,请重新输入</div>
          <div class="markedWords" v-show="markedWords_2">账号不能为空</div>
          <div class="markedWords" v-show="markedWords_3">密码不能为空</div>
          <div class="markedWords" v-show="markedWords_4">验证码不能为空</div>
        </div>
        <div class="account" id="interval">
          <input type="text" placeholder="账号" minlength="11" maxlength="11" id="account" v-model='account' @focus='inputFocus' @keyup.enter="submit">
          <img src="../../static/img/account.png" alt="">
        </div>
        <div class="password"> <input type="text" minlength="4" maxlength="12" placeholder="密码" onfocus="this.type='password'" id="password" v-model='password' @focus='inputFocus' @keyup.enter="submit"> <img src="../../static/img/password.png"> </div>
        <div class="authCode">
          <input id="login-input" class="placeholder-left" minlength="4" maxlength="4" v-model="codeImg" placeholder="验证码" @focus='inputFocus' @keyup.enter="submit">
          <img @click="refreshImgClick" id="refresh"  v-bind:src='imgurl' />
          <!-- <img src="../../static/img/homepage.jpg" alt=""> -->
     
        </div>
        <div class="retrievePassword" @click="passwordBack"></div>
        <div class="register">
          <div @click="loginssClick">登录</div>
        </div>
      </div>
      <!--修改密码-->
      <div class="retrievePasswordBox" v-show="passwordBox">
        <div class="retrievePasswordSmallBox">
          <div class="smallBoxTitle">找回密码</div>
          <ul>
            <li>绑定手机号：
              <input minlength="11" maxlength="11" type="text" placeholder="请输入绑定的手机号" v-model="telPhone" @focus='inputFocusT'>
              <div class="telphoneCode">
                <ziksangs-count-down :start='start' @countDown='start=false' @click.native='sendCode'></ziksangs-count-down>
              </div>
              <div class="yanzgz">
                <span v-show="yanzgzT">请输入正确的手机号码</span>
              </div>
            </li>
            <li>验证码：
              <input minlength="4" maxlength="6" type="text" placeholder="请填写验证码" v-model="yanzm" @focus='inputFocusC'>
              <div class="yanzgz yanzgzC">
                <span v-show="yanzgzC">请输入正确的验证码</span>
              </div>
            </li>
            <li>新密码：
              <input minlength="4" maxlength="12" type="password" placeholder="请输入新密码" v-model="newPassword" @focus='inputFocusP'>
              <div class="yanzgz yanzgzP">
                <span v-show="yanzgzP">请输入密码</span>
              </div>
            </li>
            <li>确认密码：
              <input minlength="4" maxlength="12" type="password" placeholder="请输入确认密码" v-model="newPasswords" @focus='inputFocusNp'>
              <div class="yanzgz yanzgzNp">
                <span v-show="yanzgzNp">两次密码输入不一致，请重新输入</span>
                
              </div>
            </li>
          </ul>
          <div class="passwordBox">
            <div class="passwordSave" @click="closeSave">保存</div>
            <div class="passwordAbolish" @click="abolish">取消</div>
          </div>
        </div>
      </div>
      <!--多企业选择-->
      <div class="selectHomeBox" v-show="selectBox">
        <div class="selectHome">
          <div>
            请选择您要进入的企业
          </div>
          <div>
            <ul>
              <li v-for="(item,index) in selectHomes" :key="item" >
                <div>
                  <div>
                    <img :src='item.orgLogo | change' @click="selectHomeClick(index)" />
                  </div>
                </div>
                <div>
                  <span @click="selectHomeClick(index)">
                    {{item.orgName}}
                  </span>
                </div>
              </li>
              <li >
                <div>
                  <div>
                    <img src='/static/img/addbusiness.png' @click="registration()" />
                  </div>
                </div>
                <div>
                  <span @click="registration()">
                    企业注册
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
require("../../api/api");
import { mapActions } from "vuex";
import ZiksangsCountDown from "./passwordBack.vue"; //这里引入全局组件
export default {
  components: {
    ZiksangsCountDown
  }, //这里注册全局组件
  name: "login",
  data() {
    return {
      loginIngbox: false,
      loginIng: true,
      checked: false,
      user: {
        name: "",
        password: ""
      },
      selectBox: false,
      selectHomes: [],
      loading: false,
      seePassword: true,
      start: false,
      passwordBox: false,
      verifyCodeLength: 4,
      codeImg: "",
      verifyArray: [],
      markedWords: false,
      account: "",
      password: "",
      verify: {
        code: ""
      },
      telPhone: "",
      yanzm: "",
      newPassword: "",
      newPsaawords: "",
      yanzgzT: false,
      yanzgzC: false,
      yanzgzP: false,
      yanzgzNp: false,
      telPhone: "",
      yanzm: "",
      newPassword: "",
      newPasswords: "",
      markedWords_1: false,
      markedWords_2: false,
      markedWords_3: false,
      markedWords_4: false,
      token: "",
      imgurl: "",
      dataObj: "",
      business: [],
      lists: [
        {
          name: "首页",
          push: "homepage"
        },
        // {
        //   name: "通讯录",
        //   push: "addresslist"
        // },
        // {
        //   name: "微应用",
        //   push: "minapplication"
        // },
        {
          name: "员工数据",
          push: "employeedata"
        }
        // {
        //   name: "设置",
        //   push: "set"
        // }
      ],
      listsas: []
    };
  },
  created: function() {
     document.onkeydown = function() {
        if (event.keyCode == 9) {
          //如果是其它键，换上相应在ascii 码即可。
          return true; //非常重要
        }
      };
    sessionStorage.removeItem("mClicks");
    sessionStorage.removeItem("aaaaa");
    sessionStorage.removeItem("myindex");
    sessionStorage.removeItem("youindex");
    let self = this;
    self
      .gettoken({})
      .then(data => {
        if (data.code == "000000") {
          this.token = data.data.token;
          sessionStorage.setItem("loginToken", this.token);
          this.refreshImgClick();
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
            message: data.msg
          });
          this.loading = false;
        }
      });
    sessionStorage.removeItem("identification");
    sessionStorage.removeItem("orgId");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("orgName");

    // 获取图片验证码
    // self.gettoken({}).then(data => {
    //   this.token = data.data.token;
    //   let urlStr = "http://192.168.10.60:8888/get_img/" + this.token;
    //   this.imgurl = urlStr;
    // });
  },
  filters: {
    change: function(val) {
      if (val) {
        return val;
      } else {
        return "/static/img/imgaa.png";
      }
    }
  },
  mounted() {},
  methods: {
    // 获取焦点
    inputFocus(e) {
      this.markedWords = false;
      this.markedWords_1 = false;
      this.markedWords_2 = false;
      this.markedWords_3 = false;
      this.markedWords_4 = false;
    },
    inputFocusT(e) {
      this.yanzgzT = false;
    },
    inputFocusC(e) {
      this.yanzgzC = false;
    },
    inputFocusP(e) {
      this.yanzgzP = false;
    },
    inputFocusNp(e) {
      this.yanzgzNp = false;
    },
    // 刷新验证码
    refreshImgClick() {
      var self = this;
      this.token = sessionStorage.getItem("loginToken");
      self.codeImg = "";
      let urlStr =
        "http://" +
        global.Imgip +
        ":" +
        global.Imgport +
        "/api-push/get_img/" +
        this.token +
        "?tm=" +
        Math.random();
      this.imgurl = urlStr;
    },

    // 验证码校验
    validate(rule, value, callback) {
      // 验证用户验证码输入
      var feiK = /^\s*$/g; //非空验证
      if (feiK.test(this.verify.code)) {
        this.markedWords_4 = true;
      } else {
        let result =
          this.verifyArray
            .map(x => x.value)
            .join("")
            .toLocaleLowerCase() === this.verify.code.toLocaleLowerCase();
        this.markedWords_1 = true;
        return result;
      }
    },
    registration() {
      sessionStorage.setItem("aaaaa", "aaaaa");
      this.$router.push({
        path: "/registration_1"
      });
    },
    passwordBack() {
      // this.passwordBox = true;
      this.$router.push({
        path: "/registration_1"
      });
    },
    abolish() {
      this.passwordBox = false;
      this.yanzgzT = false;
      this.yanzgzC = false;
      this.yanzgzP = false;
      this.yanzgzNp = false;
      this.telPhone = "";
      this.yanzm = "";
      this.newPassword = "";
      this.newPasswords = "";
    },
    //短信验证码
    sendCode(value) {
      //前面发送ajax请求成功之后调用this.start = true开始短信倒计时
      var patterna = /^1[34578]\d{9}$/; //手机号验证
      if (!patterna.test(this.telPhone)) {
        this.yanzgzT = true;
        return false;
      }
      this.start = true;
    },
    // 修改密码弹出框
    closeSave() {
      if (!this.newValior()) {
        return;
      }
      this.telPhone = "";
      this.yanzm = "";
      this.newPassword = "";
      this.newPasswords = "";
      this.passwordBox = false;
    },
    //表单验证
    newValior: function() {
      var flag = true;
      var patterna = /^1[34578]\d{9}$/; //手机号验证
      var pattern = /[`~!@#\$%\^\&\*_\+<>\?:"\{\},\.\\\/;'\[\]]/; //非法字符验证
      var feiK = /^\s*$/g; //非空验证
      var telphoneLi = document.getElementById("interval");
      var telphoneInput = telphoneLi.getElementsByTagName("input");
      if (!patterna.test(this.telPhone)) {
        this.yanzgzT = true;
        flag = false;
      }
      if (feiK.test(this.yanzm)) {
        this.yanzgzC = true;
        flag = false;
      }
      if (feiK.test(this.newPassword)) {
        this.yanzgzP = true;
        flag = false;
      }
      if (!(this.newPasswords == this.newPassword)) {
        this.yanzgzNp = true;
        flag = false;
      }
      return flag;
    },
    // 手机号验证
    valiorPhone() {
      var flag = true;
      var patterna = /^1[34578]\d{9}$/; //手机号验证
      var pattern = /[`~!@#\$%\^\&\*_\+<>\?:"\{\},\.\\\/;'\[\]]/; //非法字符验证
      var feiK = /^\s*$/g; //非空验证
      var patternaImg = /^[a-zA-Z0-9]{4}$/;
      if (feiK.test(this.account)) {
        this.markedWords_2 = true;

        this.password = "";
        this.codeImg = "";
        this.refreshImgClick();
        flag = false;
      } else if (!patterna.test(this.account)) {
        this.markedWords = true;

        this.password = "";
        this.codeImg = "";
        this.refreshImgClick();

        flag = false;
      } else if (feiK.test(this.password)) {
        this.markedWords_3 = true;
        this.refreshImgClick();
        this.password = "";
        this.codeImg = "";
        flag = false;
      } else if (feiK.test(this.codeImg)) {
        this.markedWords_4 = true;

        this.password = "";
        this.codeImg = "";
        this.refreshImgClick();
        flag = false;
      } else if (!patternaImg.test(this.codeImg)) {
        this.markedWords_1 = true;

        this.password = "";
        this.codeImg = "";
        this.refreshImgClick();
        flag = false;
      }
      return flag;
    },
    // 键盘事件
    submit() {
      this.loginssClick();
    },
    loginssClick() {
      var self = this;
      if (this.valiorPhone()) {
        this.getvalidate({
          token: this.token,
          code: this.codeImg
        })
          .then(data => {
            if (data.code == "000000") {
              this.getloginToken({
                client_id: "android",
                client_secret: "android",
                grant_type: "password",
                username: this.account,
                password: this.password
              })
                .then(data => {
                  if (data.access_token) {
                    sessionStorage.setItem("accessToken", data.access_token);
                    self
                      .getlogin({
                        access_token: data.access_token,
                        userMobile: this.account,
                        userPwd: this.password
                      })
                      .then(data => {
                        sessionStorage.setItem("phoneVal", this.account);
                        this.dataObj = data;
                        if (data.code == "000000") {
                            if (data.data.listOrg.length > 1 || data.data.listOrg.length == 1) {
                            self.selectHomes = data.data.listOrg;
                            self.selectBox = true;
                            document.getElementById('account').blur()
                            document.getElementById('password').blur()
                            document.getElementById('login-input').blur()
                            // 出现选择企业弹框的时候，禁用tab键盘
                            document.onkeydown = function() {
                              if (event.keyCode == 9) {
                                //如果是其它键，换上相应在ascii 码即可。
                                return false; //非常重要
                              }
                            };
                          } else if (data.data.listOrg.length == 0) {
                            this.$router.push({
                              path: "/registration_1"
                            });
                            sessionStorage.setItem("aaaaa", "aaaaa");
                            this.refreshImgClick();
                            this.password = "";
                            this.codeImg = "";
                            document.getElementById('password').focus()
                          } else {
                            sessionStorage.setItem("identification", "111");
                            this.$router.push({
                              path: "/registration_1"
                            });
                            this.refreshImgClick();
                            this.password = "";
                            this.codeImg = "";
                            document.getElementById('password').focus()
                          }
                        } else if (data.code == "888888") {
                          sessionStorage.setItem("identification", "111");
                          this.$router.push({
                            path: "/registration_1"
                          });
                          sessionStorage.setItem("aaaaa", "aaaaa");
                          this.refreshImgClick();
                          this.password = "";
                          this.codeImg = "";
                          document.getElementById('password').focus()
                        } else if (data.code == "100001") {
                          this.$router.push({
                            path: "/home"
                          });
                          this.refreshImgClick();
                          this.password = "";
                          this.codeImg = "";
                          document.getElementById('password').focus()
                        } else {
                          this.$message({
                            type: "info",
                            message: data.msg
                          });
                          this.refreshImgClick();
                          this.password = "";
                          this.codeImg = "";
                          document.getElementById('password').focus()
                        }

                        this.refreshImgClick();
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
                            message: data.msg
                          });
                          this.refreshImgClick();
                          this.password = "";
                          this.codeImg = "";
                          document.getElementById('password').focus()
                        }
                      });
                  } else {
                    this.password = "";
                    this.codeImg = "";
                    document.getElementById('password').focus()
                    this.refreshImgClick();
                  }
                })
                .catch(msg => {
                  if (msg.body.code == "888888") {
                    this.$message({
                      type: "info",
                      message: msg.body.msg
                    });
                    this.codeImg = "";
                    this.refreshImgClick();
                    this.password = "";
                    document.getElementById('password').focus()
                  } else {
                    this.$message({
                      type: "info",
                      message: JSON.parse(msg.body).msg
                    });
                    this.refreshImgClick();
                    this.password = "";
                    this.codeImg = "";
                    document.getElementById('password').focus()
                  }
                });
            } else {
              this.$message({
                type: "info",
                message: data.msg
              });

              this.refreshImgClick();
              this.password = "";
              this.codeImg = "";
              document.getElementById('password').focus()
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
                message: JSON.parse(msg.bodyText).msg
              });
              this.refreshImgClick();
              this.password = "";
              this.codeImg = "";
              document.getElementById('password').focus()
            }
          });
      } else {
        // this.valiorPhone();
      }
    },
    selectHomeClick(index) {
      sessionStorage.setItem("aaaaa", "aaaaa");
      sessionStorage.setItem("orgId", this.dataObj.data.listOrg[index].orgId);
      sessionStorage.setItem("userId", this.dataObj.data.userId);

      sessionStorage.setItem(
        "orgName",
        this.dataObj.data.listOrg[index].orgName
      );

      this.getbusiness({
        oid: sessionStorage.getItem("orgId"),
        uid: sessionStorage.getItem("userId")
      })
        .then(data => {
          if (data.statusCode == "000000") {
            sessionStorage.setItem("business", JSON.stringify(data.data));
            if (data.data.isPrimary == "1") {
              this.lists = [
                {
                  name: "首页",
                  push: "homepage"
                },
                {
                  name: "员工数据",
                  push: "employeedata"
                },
                {
                  name: "通讯录",
                  push: "addresslist"
                },
                {
                  name: "微应用",
                  push: "minapplication"
                },

                {
                  name: "设置",
                  push: "set"
                }
              ];
              sessionStorage.setItem("arras", JSON.stringify(this.lists));
            } else {
              this.business = data.data.authList;
              for (let i = 0; i < this.business.length; i++) {
                this.listsas.push(this.business[i].authName);
              }
              for (let j = 0; j < this.listsas.length; j++) {
                if (this.listsas[j] == "企业设置") {
                  this.lists.push({
                    name: "设置",
                    push: "set"
                  });
                }
                if (this.listsas[j] == "通讯录") {
                  this.lists.push({
                    name: "通讯录",
                    push: "addresslist"
                  });
                }
                if (this.listsas[j] == "微应用管理") {
                  this.lists.push({
                    name: "微应用",
                    push: "minapplication"
                  });
                }
              }
              sessionStorage.setItem("arras", JSON.stringify(this.lists));
            }
            this.$router.push({
              path: "/home"
            });
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
            this.$router.push({
              path: "/login"
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
      self.selectBox = false;
      document.onkeydown = function() {
        if (event.keyCode == 9) {
          //如果是其它键，换上相应在ascii 码即可。
          return true; //非常重要
        }
      };
    },
    ...mapActions([
      "gettoken",
      "getlogin",
      "getvalidate",
      "getloginToken",
      "getbusiness"
    ])
  }
};
</script>
<style scoped>
.selectHome > div:nth-child(1) {
  height: 80px;
  width: 100%;
  text-align: center;
  line-height: 80px;
  font-weight: 600;
  color: #333;
  font-size: 24px;
}

.selectHome > div:nth-child(2) {
  min-height: 170px;
}

.selectHome > div:nth-child(2) li > div:nth-child(1) > div img {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.selectHome > div:nth-child(2) li > div:nth-child(1) > div {
  width: 90px;
  height: 90px;
  overflow: hidden;
  border-radius: 5px;
  /* border: 1px solid #ccc; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.selectHome > div:nth-child(2) li > div:nth-child(1) {
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.selectHome > div:nth-child(2) li > div:nth-child(2) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.selectHome > div:nth-child(2) li > div:nth-child(2) span {
  /* border: 1px solid red; */
  cursor: pointer;
}

.selectHome > div:nth-child(2) li > div:nth-child(2) {
  width: 100%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 16px;
  color: #333;
  margin-top: 15px;
}

.selectHome > div:nth-child(2) li {
  width: 33.3333333333%;
  height: 145px;
  font-size: 16px;
  color: #333;
  float: left;
  display: flex;
  flex-direction: column;
}

.selectHome {
  width: 765px;
  min-height: 285px;
  max-height: 435px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.15);
  animation: passwordBox 0.5s linear;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

@keyframes passwordBox {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.selectHomeBox {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login {
  height: 100vh;
  background: url("/static/img/background.png") repeat;
  background-size: 100% 100%;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.loginTop {
  width: 100%;
  height: 56px;
  background-color: #fffaf9;
  line-height: 56px;
  color: #fe6500;
  font-size: 18px;
  padding-left: 8px;
}

.loginTop img {
  padding-left: 120px;
  padding-bottom: 4px;
}

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset;
}

input[type="text"]:focus,
input[type="password"]:focus,
textarea:focus {
  -webkit-box-shadow: 0 0 0 1000px white inset;
}

.loginLeft {
  width: 100%;
  height: 100%;
}

.botong {
  margin-left: 190px;
  margin-top: 250px;
  color: #fff;
  font-size: 72px;
}

.cloud {
  margin-top: 20px;
  margin-left: 190px;
  color: #fff;
  font-size: 28px;
}

.welcome {
  margin-top: 60px;
  margin-left: 190px;
  color: #fff;
  font-size: 48px;
}

.loginRight {
  width: 320px;
  height: 400px;
  position: absolute;
  right: 10%;
  top: 30%;
  background-color: #fff;
  opacity: 0.9;
  border-radius: 8px;
}

.loginTitle {
  margin-top: 44px;
  width: 100%;
  height: auto;
  text-align: center;
  color: #8f8e94;
  font-size: 24px;
}

.account,
.password,
.authCode {
  height: 40px;
  width: 300px;
  text-align: center;
  position: relative;
}

.account {
  margin-top: 24px;
}

.password {
  margin-top: 38px;
}

.authCode {
  margin-top: 27px;
}

.authCode img {
  cursor: pointer;
}

.account input {
  width: 90%;
  border-bottom: 1px solid #aeaeae;
  padding-left: 2px;
  color: #aeaeae;
  font-size: 16px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  outline: none;
  padding-bottom: 5px;
}

.account img {
  position: absolute;
  right: 30px;
  top: 20px;
}

.password img {
  position: absolute;
  right: 30px;
  top: 2px;
}

#account {
  background-color: rgba(255, 255, 255, 0.9);
}

#password {
  background-color: rgba(255, 255, 255, 0.9);
}

#authCode {
  background-color: rgba(255, 255, 255, 0.9);
}

.password input {
  width: 90%;
  border-bottom: 1px solid #aeaeae;
  padding-left: 2px;
  color: #aeaeae;
  font-size: 16px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  outline: none;
  padding-bottom: 5px;
}

.authCode input {
  width: 90%;
  border-bottom: 1px solid #aeaeae;
  padding-left: 2px;
  color: #aeaeae;
  font-size: 16px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  outline: none;
  padding-bottom: 5px;
}

.retrievePassword {
  width: 29%;
  margin-top: 13px;
  color: #e7744a;
  font-size: 16px;
  float: right;
  cursor: pointer;
}

.register {
  width: 220px;
  height: 32px;
  margin: 61px auto;
}

.register div {
  width: 100%;
  height: 100%;
  background-color: #e7744a;
  border-radius: 8px;
  text-align: center;
  line-height: 32px;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
}

.retrievePasswordBox {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.retrievePasswordSmallBox {
  width: 600px;
  height: 452px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.15);
  animation: passwordBox 0.8s linear;
}

@keyframes passwordBox {
  from {
    transform: translateY(-100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.smallBoxTitle {
  width: 100%;
  height: 60px;
  background-color: #e7744a;
  text-align: center;
  line-height: 60px;
  font-size: 16px;
  border-radius: 4px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  color: #fff;
}

.retrievePasswordSmallBox ul li {
  margin-left: 100px;
}

.retrievePasswordSmallBox ul li:nth-child(1) {
  margin-top: 28px;
}

.retrievePasswordSmallBox ul li:nth-child(2) {
  margin-left: 128px;
  margin-top: 12px;
}

.retrievePasswordSmallBox ul li:nth-child(3) {
  margin-left: 128px;
  margin-top: 12px;
}

.retrievePasswordSmallBox ul li:nth-child(4) {
  margin-left: 114px;
  margin-top: 12px;
}

.retrievePasswordSmallBox ul li input {
  width: 260px;
  height: 36px;
  border: 1px solid #fcb298;
  margin-left: 8px;
  border-radius: 4px;
  padding-left: 12px;
  color: #8f8e94;
  font-size: 14px;
}

.telphoneCode {
  display: inline-block;
}

.passwordSave,
.passwordAbolish {
  width: 80px;
  height: 34px;
  background-color: #e7744a;
  font-size: 16px;
  color: #fff;
  text-align: center;
  line-height: 34px;
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
}

.passwordAbolish {
  display: inline-block;
  background-color: #aeaeae;
  margin-left: 32px;
}

.passwordBox {
  text-align: center;
  margin-top: 34px;
}

.verify-img {
  height: 34px;
  width: 80px;
  border: 0;
  background: #fff;
  color: #000;
  cursor: pointer;
  line-height: 40px;
  position: absolute;
  right: 26px;
  top: -6px;
}

.verify-code-item {
  float: left;
  width: 20px;
  height: 34px;
  line-height: 34px;
  text-align: center;
}

.markedWords {
  width: 100%;
  font-size: 14px;
  color: #ff5f57;
  text-align: center;
}

.markedWordsBox {
  width: 100%;
  height: 20px;
  float: left;
  margin-top: 24px;
}

.yanzgz {
  width: 600px;
  height: 12px;
  margin-left: 104px;
  margin-top: 6px;
  font-size: 12px;
  color: #ff5f57;
}

.yanzgzC {
  margin-left: 78px;
}

.yanzgzP {
  margin-left: 78px;
}

.yanzgzNp {
  margin-left: 90px;
}

input::-webkit-credentials-auto-fill-button {
  visibility: hidden;
  display: none !important;
  pointer-events: none;
  position: absolute;
  right: 0;
}
     #refresh{
margin-top: -65px;
margin-left: 186px;
          }
</style>
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set">
        <div class="businessRegistration">伯通企业注册</div>
        <div class="procedure"></div>
        <div class="registrationTel">
            <ul>
                <li>&nbsp;&nbsp;&nbsp;手机号码：
                    <input type="text" minlength="10" maxlength="11" :class="{inputBorder:IsinputBorder}" @blur='borderOut' @focus="borderfocus"
                        readonly v-model="telPhone" />
                    <div class="telVelBox">
                        <div class="telVel" v-show="telVel">手机号码不正确，请重新输入</div>
                        <div class="telVel" v-show="telVel1">手机号码不能为空</div>
                    </div>
                </li>
                <li>图片验证码：
                    <input type="text" minlength="4" maxlength="4" class="placeholder-left" v-model="codeImg" placeholder="请输入验证码" :class="{inputBorder:IsinputBorder1}"
                        @blur='borderOut1' @focus="borderfocus1">
                        <img @click="refreshImgClick" id="imgrdfresh"  :src=imgurl alt="">
                        <div class="telVelBox">
                            <div class="telVel" v-show="telVel2">验证码不正确，请重新输入</div>
                            <div class="telVel" v-show="telVel3">验证码不能为空</div>
                        </div>
                </li>
                <li>短信验证码：
                    <input type="text" v-model="noteVel" minlength="4" maxlength="4" placeholder="请输入验证码" :class="{inputBorder:IsinputBorder2}"
                        @blur='borderOut2' @focus="borderfocus2" />
                    <div class="dxyzm">
                        <ziksang-count-down :start='start' @countDown='start=false' @click.native='sendCodeClick'></ziksang-count-down>
                    </div>
                    <div class="telVelBox">
                        <div class="telVel" v-show="telVel4">短信验证码不正确，请重新输入</div>
                        <div class="telVel" v-show="telVel5">短信验证码不能为空</div>
                    </div>
                </li>
            </ul>
            <div class="tleXian"></div>
            <div class="registrationNext">
                <div @click="nextClick">下一步</div>
            </div>
        </div>

    </div>
</template>
<script>
require("../../../api/api");
import { mapActions } from "vuex";
import ZiksangCountDown from "../my_component.vue"; //这里引入全局组件
export default {
  components: { ZiksangCountDown }, //这里注册全局组件
  name: "set",
  data() {
    return {
      IsinputBorder: false,
      IsinputBorder1: false,
      IsinputBorder2: false,
      telVel: false,
      telVel1: false,
      telVel2: false,
      telVel3: false,
      telVel4: false,
      telVel5: false,
      telPhone: "",
      noteVel: "",
      start: false,
      token: "",
      imgurl: "",
      codeImg: "",
      flag: true,
      timeTrue: false,
      time: 60
    };
  },
  created: function() {
    var self = this;
    self
      .gettoken({})
      .then(data => {
        if (data.code == "000000") {
          this.token = data.data.token;
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

    var phoneStr = sessionStorage.getItem("phoneVal");
    self.telPhone = phoneStr;
  },
  watch: {},
  methods: {
    sendCodeClick(value) {
      var self = this;
      if (this.valiorImg()) {
        if (this.timeTrue == false) {
          self.timeTrue = true;
          this.getvalidatesms({
            token: this.token,
            to: this.telPhone,
            code: this.codeImg
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
                this.refreshImgClick();
                this.codeImg = "";
                this.timeTrue = false;
                this.start = false;
              }
            })
            .catch(msg => {
              this.$message({
                type: "info",
                message: '服务器错误！'
              });
            });
        } else {
        }
      } else {
        if (!this.valiorImg()) {
          this.valiorImg();
        }
      }
    },
    // 获取焦点
    borderfocus() {
      this.IsinputBorder = true;
      this.telVel1 = false;
      this.telVel = false;
    },
    borderfocus1() {
      this.IsinputBorder1 = true;
      this.telVel2 = false;
      this.telVel3 = false;
    },
    borderfocus2() {
      this.IsinputBorder2 = true;
      this.telVel5 = false;
      this.telVel4 = false;
    },
    // 失去焦点
    borderOut() {
      this.IsinputBorder = false;
    },
    borderOut1() {
      this.IsinputBorder1 = false;
    },
    borderOut2() {
      this.IsinputBorder2 = false;
    },
    // 下一步
    nextClick() {
      var self = this;

      if (this.valiorPhone() && this.valiorMessage() && this.valiorImg()) {
        // 验证短信验证码
        this.getcodevalidatesms({
          token: this.token,
          code: this.noteVel
        }).then(data => {
          if (data.code == "000000") {
            this.$router.push({
              path: "/registration_2"
            });
            sessionStorage.setItem("aaaaa", "bbbbb");
          } else {
            this.$message({
              type: "info",
              message: data.msg
            });
            this.codeImg = "";
            this.noteVel = "";
            this.refreshImgClick()
          
          }
        });
      } else {
        if (!this.valiorPhone()) {
          this.valiorPhone();
        }
        if (!this.valiorMessage()) {
          this.valiorMessage();
        }
        if (!this.valiorImg()) {
          this.valiorImg();
        }
      }
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
      if (feiK.test(this.noteVel)) {
        this.telVel5 = true;
        flag = false;
      } else {
        if (!patterna.test(this.noteVel)) {
          this.telVel4 = true;
          flag = false;
        }
      }
      return flag;
    },
    // 图片验证码校验
    valiorImg() {
      var flag = true;
      var patterna = /^[a-zA-Z0-9]{4}$/;
      var pattern = /[`~!@#\$%\^\&\*_\+<>\?:"\{\},\.\\\/;'\[\]]/; //非法字符验证
      var feiK = /^\s*$/g; //非空验证
      if (feiK.test(this.codeImg)) {
        this.telVel3 = true;
        flag = false;
      } else {
        if (!patterna.test(this.codeImg)) {
          this.telVel2 = true;
          flag = false;
        }
      }
      return flag;
    },
    // 刷新验证码
    refreshImgClick() {
      var self = this;
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
    ...mapActions([
      "getcodesms",
      "getcodevalidatesms",
      "gettoken",
      "getvalidate",
      "getvalidatesms"
    ])
  },
  mounted() {}
};
</script>
<style scoped>
input::-webkit-contacts-auto-fill-button {
  visibility: hidden;
  display: none !important;
  pointer-events: none;
  position: absolute;
  right: 0;
}

.verify-img {
  height: 34px;
  width: 80px;
  border: 0;
  background: #e4e4e4;
  color: #000;
  cursor: pointer;
  line-height: 40px;
  position: absolute;
  margin-left: 350px;
  margin-top: -34px;
}

.dxyzm {
  position: absolute;
  margin-left: 350px;
  margin-top: -35px;
}

.verify-code-item {
  float: left;
  width: 20px;
  height: 34px;
  line-height: 34px;
  text-align: center;
}

.telVelBox {
  position: absolute;
  margin-left: 90px;
  margin-top: 6px;
}

.telVel {
  color: #ff5f57;
  font-size: 12px;
}

.inputBorder {
  border: 1px solid #e7744a !important;
}

.set {
  position: fixed;
  width: 100%;
  height: 100%;
}

.businessRegistration {
  width: 100%;
  height: 40px;
  background-color: #e7744a;
  line-height: 40px;
  padding-left: 20%;
  color: #fff;
  font-size: 16px;
}

.procedure {
  width: 60%;
  height: 70px;
  border: 1px solid #aeaeae;
  background-color: rgba(255, 255, 255, 0.6);
  margin: 20px auto;
  border-radius: 4px;
  background: url(../../../static/img/first.png) no-repeat;
  background-size: 100% 100%;
  min-width: 1200px;
}

.registrationTel {
  width: 60%;
  height: 300px;
  border: 1px solid #aeaeae;
  border-radius: 4px;
  margin: 0 auto;
  margin-top: 10px;
  min-width: 1200px;
}

.registrationTel ul li {
  margin-left: 20%;
  padding-top: 30px;
}

.registrationTel ul li input {
  width: 260px;
  height: 34px;
  border-radius: 4px;
  border: 1px solid #aeaeae;
  padding-left: 12px;
  color: #aeaeae;
  font-size: 14px;
}

.registrationTel ul li:nth-child(1) {
  padding-left: -282px;
}

.tleXian {
  width: 80%;
  height: 1px;
  background-color: #cccccc;
  margin-left: 10%;
  margin-top: 40px;
}

.registrationNext {
  width: 80px;
  height: 34px;
  background-color: #e7744a;
  border-radius: 4px;
  text-align: center;
  line-height: 34px;
  color: #fff;
  font-size: 14px;
  margin: 20px 28%;
  cursor: pointer;
}
#imgrdfresh{
width:80px;
height:34px;
          }
</style>
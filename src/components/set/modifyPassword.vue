<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set">
        <div class="main_rightTop">
            <p>修改密码</p>
        </div>
        <div class="main_rightMain">
            <div>
                <div class="key_picture">
                    <img src="/static/img/suo.png" alt="">
                </div>
                <p class="change_pwd" @click='modifypwd'>修改密码</p>
            </div>
        </div>
        <!--修改密码弹出框-->
        <div class="ModalsBox" v-show="modifyBox">
            <div class="Modals" id="modifyPwdMain">
                <div class="modalsTop">
                    修改密码
                </div>
                <div class="modalsBot" id="modifyPwdMain-middle">
                    <div>
                        <span>当前密码
                            <i class="mustIcon">*</i>：</span>
                        <input minlength="4" maxlength="12" v-model="currentpwd" type="password" class="inputText" placeholder="请输入原密码" @focus="focusInput_1"
                            @blur="blurInput_1" :class="{redBorder:isredBorder_1,focusBorder:isfocusBorder_1}">
                    </div>
                    <p v-show="warning_1" class="warnStyle">当前密码不正确</p>
                    <div>
                        <span id="newPwdWords">新密码
                            <i class="mustIcon">*</i>：</span>
                        <input minlength="4" maxlength="12" v-model="newpwd" type="password" class="inputText" placeholder="请输入新密码" @focus="focusInput_2"
                            @blur="blurInput_2" :class="{redBorder:isredBorder_2,focusBorder:isfocusBorder_2}">
                    </div>
                    <p v-show="warning_2" class="warnStyle">密码必须为数字或字母、数字组合(密码长度为4-12位)</p>
                    <div>
                        <span>确认密码
                            <i class="mustIcon">*</i>：</span>
                        <input minlength="4" maxlength="12" v-model="confirmpwd" type="password" class="inputText" placeholder="请输入确认密码" @focus="focusInput_3"
                            @blur="blurInput_3" :class="{redBorder:isredBorder_3,focusBorder:isfocusBorder_3}">
                    </div>
                    <p v-show="warning_3" class="warnStyle">两次输入密码不一致</p>
                </div>
                <div class="modalfoot" id="modifyPwdFoot">
                    <input type="button" value="保存" class="baocun" @click="addBaocun">
                    <input type="button" value="取消" class="quxiao" @click="cancle">
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
      modifyBox: false,
      isfocusBorder_1: false,
      isredBorder_1: false,
      isfocusBorder_2: false,
      isredBorder_2: false,
      isfocusBorder_3: false,
      isredBorder_3: false,
      confirmpwd: "",
      currentpwd: "",
      newpwd: "",
      mima: "",
      warning_1: false,
      warning_2: false,
      warning_3: false
    };
  },

  created: function() {
    if(sessionStorage.getItem("orgId") == undefined){
      return
    }
  },
  watch: {
    currentpwd: function(val) {
      this.warning_1 = this.isredBorder_1 = false;
    }
  },
  methods: {
    //修改密码
    modifypwd: function() {
      this.modifyBox = true;
      this.currentpwd = this.newpwd = this.confirmpwd = "";
      this.isredBorder_1 = this.isredBorder_2 = this.isredBorder_3 = false;
      this.warning_1 = this.warning_2 = this.warning_3 = false;
    },
    //取消
    cancle: function() {
      this.modifyBox = false;
    },
    focusInput_1: function() {
      this.isfocusBorder_1 = true;
      this.warning_1 = this.warning_2 = this.warning_3 = false;
    },
    blurInput_1: function() {
      this.isfocusBorder_1 = false;
    },
    focusInput_2: function() {
      this.isfocusBorder_2 = true;
      this.warning_1 = this.warning_2 = this.warning_3 = false;
    },
    blurInput_2: function() {
      this.isfocusBorder_2 = false;
    },
    focusInput_3: function() {
      this.isfocusBorder_3 = true;
      this.warning_1 = this.warning_2 = this.warning_3 = false;
    },
    blurInput_3: function() {
      this.isfocusBorder_3 = false;
    },
    panduan() {
      var a1, a2, a3;
      a1 = a2 = a3 = true;
      var obj = [a1, a2, a3];
      if (this.currentpwd == null || this.currentpwd == "") {
        obj[0] = false;
      }
      if (this.newpwd == null || this.newpwd == "") {
        obj[1] = false;
      }
      if (this.confirmpwd == null || this.confirmpwd == "") {
        obj[2] = false;
      }
      for (var i = 0; i < 3; i++) {
        let m = i + 1;
        if (obj[i] == false) {
          this["isredBorder_" + m] = true;
        } else {
          this["isredBorder_" + m] = false;
        }
      }
      if (obj.indexOf(false) != -1) {
        return false;
      } else {
        // if(this.currentpwd != this.mima){
        //     this.warning_1 = this.isredBorder_1 = true
        //     return false
        // }else{
        //     this.warning_1 = this.isredBorder_1 = false
        // }
        var reg = /^[a-zA-Z\d]+$/;
        if (!reg.test(this.newpwd) || this.newpwd.length < 4) {
          this.warning_2 = this.isredBorder_2 = true;
          return false;
        } else {
          this.warning_2 = this.isredBorder_2 = false;
        }
        if (this.confirmpwd != this.newpwd) {
          this.warning_3 = this.isredBorder_3 = true;
          return false;
        } else {
          this.warning_3 = this.isredBorder_3 = false;
        }
      }
    },
    //确定
    addBaocun: function() {
      if (this.panduan() == false) {
        return;
      } else {
        this.getusermodifyPassWord({
          oid: sessionStorage.getItem("orgId"),
          uid: sessionStorage.getItem("userId"),
          passWord: this.currentpwd,
          newPassWord: this.newpwd
        })
          .then(data => {
           
            if (data.code == "000000") {
              this.modifyBox = false;
              this.$message({
                type: "success",
                message: "密码修改成功！"
              });
            } else if (data.code == "222222") {
              this.warning_1 = this.isredBorder_1 = true;
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
      }
    },
    ...mapActions(["getusermodifyPassWord"])
  }
};
</script>
<style scoped>
.main_rightTop p {
  color: #303030;
  font-size: 14px;
  padding-top: 24px;
  padding-bottom: 12px;
  margin-left: 44px;
  width: calc(100% - 88px);
  border-bottom: 1px solid #d9d9d9;
}

.main_rightTop {
  width: 100%;
}

.main_rightMain > div {
  width: 100px;
  margin: 240px auto;
}

.key_picture {
  width: 100px;
  height: 100px;
}

.key_picture img {
  width: 100%;
  height: 100%;
}

.change_pwd {
  width: 100px;
  text-align: center;
  padding: 5px 10px;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  background: #e7744a;
  margin: 30px auto;
}

.modalfoot {
  text-align: center;
  background: #fff;
}

.baocun {
  width: 80px;
  height: 35px;
  color: #fff;
  font-size: 16px;
  background: #e7744a;
  line-height: 35px;
  margin-right: 24px;
}

.quxiao {
  width: 80px;
  height: 35px;
  color: #fff;
  font-size: 16px;
  background: #aeaeae;
  line-height: 35px;
  margin-left: 24px
}

.modalsBot {
  padding: 0px 65px;
  overflow: hidden;
  overflow-y: auto;
  padding-bottom: 0;
}

.inputText {
  width: 410px;
}

.modalsBot > div {
  height: 36px;
  line-height: 36px;
  margin-top: 24px;
}

.modalsBot > div span {
  float: left;
}

.redBorder {
  border: 1px solid #ff5f57;
}

.focusBorder {
  border: 1px solid #fcb298;
}

.warnStyle {
  color: #ff5f57;
  font-size: 12px;
  margin-left: 85px;
  margin-top: 6px;
}
#setMain{
height: 100%;
}
#modifyPwdMain{
height: 445px;
}
#modifyPwdMain-middle{
height: 300px;
}
.mustIcon{
color: #E7744A
}
#newPwdWords{
margin-left: 13px;
}
#modifyPwdFoot{
padding:10px;padding-bottom: 36px;
}
</style>
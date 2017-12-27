<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="businessRegistration">伯通企业注册</div>
        <div class="procedure"></div>
        <div class="registrationBuss">
            <ul>
                <li>企业（团队）名称：
                    <input type="text" placeholder="请输入企业名称" v-model="name" @focus="nameInput" @blur="nameOut" :class="{inputBorder:IsinputBorder}">
                   
                    <div class="nameVale" v-show="nameVale">请输入中文或英文</div>
                </li>
                <li>所在地：
                   <template>
                          <el-select v-model="value4"  placeholder="请选择" @change="locationInput">
                        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                       </template>
                        <template>
                             <el-select v-model="value5" placeholder="请选择" @change="locationInput1">
                        <el-option v-for="item in options_1" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                       </template>
                    <div class="location" v-show="location">请选择所在地</div>
                </li>
                <li>行业类型：
                    <el-select v-model="value6" clearable placeholder="请选择" @change="industryInput">
                        <el-option v-for="item in options_2" :key="item.id" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                    <div class="industry" v-show="industry">请选择行业类型</div>
                </li>
            </ul>
            <ol>
                <li>联系人姓名：<input type="text" placeholder="请输入姓名" v-model="linkman" @focus="linkmanInput" @blur="linkmanOut" :class="{inputBorder:IsinputBorder_1}">
                    <div class="linkman" v-show="linkmanVal">联系人姓名不能为空</div>
                </li>
                <li>邮箱：<input type="text" placeholder="请输入邮箱" v-model="postCode" @focus="postcodeInput" @blur="postcodeOut" :class="{inputBorder:IsinputBorder_2}">
                    <div class="postCode" v-show="postCodeVal">请输入正确的邮箱</div>
                </li>
                <li>
                    <el-checkbox v-model="checked" @change="checkedChange"></el-checkbox>
                    已阅读<span>《伯通服务协议》</span> <span v-show="postChecked" class="selectCgecked">认真阅读，并打钩</span>
                </li>
            </ol>
            <div class="tleXian"></div>
            <div class="registrationNext">
                <div @click="registerClick">注册</div>
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
      checked: false,
      nameVale: false,
      nameVales:false,
      name: "",
      IsinputBorder: false,
      IsinputBorder_2: false,
      IsinputBorder_1: false,
      location: false,
      industry: false,
      linkman: "",
      linkmanVal: false,
      postCode: "",
      postCodeVal: false,
      postChecked: false,
      options: [],
      options_2: [],
      options_1: [],
      value4: "",
      value5: "",
      value6: "",
      pid: "",
      telphone: ""
    };
  },
  created: function() {
    this.telphone = sessionStorage.getItem("userName");
    this.listFun();
  },
  watch: {},
  methods: {
    listFun() {
      // 获取地区
      this.getArea({
        pid: 0
      })
        .then(data => {
          if (data.code == "000000") {
            this.options = data.data;
          } else {
            this.$message({
              type:'info',
              message:data.msg
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
              message: data.msg
            });
            this.loading = false;
          }
        });
      // 获取行业
      this.gettype({})
        .then(data => {
          if (data.code == "000000") {
            this.options_2 = data.data;
          } else {
            this.$message({
              type:'info',
              message:data.msg
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
              message:data.msg
            });
            this.loading = false;
          }
        });
    },
    //获取焦点
    nameInput() {
      this.IsinputBorder = true;
      this.nameVale = false;
    },
    linkmanInput() {
      this.IsinputBorder_1 = true;
      this.linkmanVal = false;
    },
    postcodeInput() {
      this.IsinputBorder_2 = true;
      this.postCodeVal = false;
    },
    locationInput() {
      var self = this;
      self.options_1 = [];
      this.location = false;
      this.getArea({
        pid: this.value4
      }).then(data => {
        if (data.code == "000000") {
          self.options_1 = data.data;
          self.value5 = "";
        } else {
          this.$message({
            type:'info',
            message:data.msg
          })
        }
      });
    },
    locationInput1() {
      this.location = false;
    },
    industryInput() {
      this.industry = false;
    },
    //失去焦点
    nameOut() {
      this.IsinputBorder = false;
    },
    linkmanOut() {
      this.IsinputBorder_1 = false;
    },
    postcodeOut() {
      this.IsinputBorder_2 = false;
    },
    // 注册
    registerClick() {
      var self = this;
      if (this.valior()) {
        // var cityStr = ''
        // this.options_1.forEach(function (ele, ind) {
        //     if (ele.id == self.value5) {
        //         cityStr = ele.name
        //     }
        // })
        this.getregister({
          orgName: this.name,
          orgType: this.value6,
          orgArea: this.value4 + "," + this.value5,
          userMobile: sessionStorage.getItem("phoneVal"),
          userNick: this.linkman,
          userEmail: this.postCode
        })
          .then(data => {
            if (data.code == "000000") {
              if (data.data == true) {
                this.$router.push({
                  path: "/registration_3"
                });
                sessionStorage.setItem("aaaaa",'ccccc');
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
                message: data.msg
              });
              this.loading = false;
            }
          });
      } else {
        this.valior();
      }
    },
    checkedChange() {},
    //验证规则
    valior() {
      var self = this;
      var flag = true;
      var patterna = /^1[34578]\d{9}$/; //手机号验证
      var pattern = /[`~!@#\$%\^\&\*_\+<>\?:"\{\},\.\\\/;'\[\]]/; //非法字符验证
      var feiK = /^\s*$/g; //非空验证
      // 只能输入中文或英文
      var leter = /^[a-zA-Z\u4e00-\u9fa5]+$/;
      var postCode = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; // 邮箱验证
      
      if (feiK.test(this.value4) || feiK.test(this.value5)) {
        this.location = true;
        flag = false;
      }
      if (feiK.test(this.value6)) {
        this.industry = true;
        flag = false;
      }
      if (feiK.test(this.linkman)) {
        this.linkmanVal = true;
        flag = false;
      }
       if (!leter.test(this.name)) {
        this.nameVale = true;
        flag = false;
      }
      if (!postCode.test(this.postCode)) {
        this.postCodeVal = true;
        flag = false;
      }
      if (!self.checked) {
        this.postChecked = true;
        flag = false;
      } else {
        this.postChecked = false;
      }
      return flag;
    },
    ...mapActions(["getregister", "getArea", "gettype"])
  }
};
</script>
<style scoped>
.selectCgecked {
  color: #ff5f57;
}

.set {
  position: fixed;
  width: 100%;
  height: 100%;
}

.inputBorder {
  border-color: #e7744a !important;
}

.nameVale {
  position: absolute;
  left: 340px;
  top: 68px;
  color: #ff5f57;
  font-size: 12px;
}

.location {
  position: absolute;
  left: 340px;
  top: 138px;
  color: #ff5f57;
  font-size: 12px;
  z-index: 999;
}

.industry {
  position: absolute;
  left: 340px;
  top: 202px;
  color: #ff5f57;
  font-size: 12px;
  z-index: 999;
}

.linkman {
  position: absolute;
  left: 340px;
  top: 274px;
  color: #ff5f57;
  font-size: 12px;
  z-index: 999;
}

.postCode {
  position: absolute;
  left: 340px;
  top: 338px;
  color: #ff5f57;
  font-size: 12px;
  z-index: 999;
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
  height: 60px;
  border: 1px solid #aeaeae;
  background-color: rgba(255, 255, 255, 0.6);
  margin: 20px auto;
  border-radius: 4px;
  background: url(../../../static/img/secend.png) no-repeat;
  background-size: 100% 100%;
  min-width: 1200px;
}

.registrationBuss {
  position: relative;
  width: 60%;
  height: 550px;
  border: 1px solid #aeaeae;
  border-radius: 4px;
  margin: 0 auto;
  margin-top: 10px;
  min-width: 1200px;
}

.registrationBuss ul li,
.registrationBuss ol li {
  margin-left: 200px;
  padding-top: 30px;
}

.registrationBuss ul li input,
.registrationBuss ol li input {
  width: 260px;
  height: 34px;
  border-radius: 4px;
  border: 1px solid #bfcbd9;
  padding-left: 12px;
  color: #303030;
  font-size: 14px;
}

.registrationBuss ul li:nth-child(2) {
  margin-left: 267px;
}

.registrationBuss ol li:nth-child(1) {
  margin-left: 204px;
}

.registrationBuss ol li:nth-child(2) {
  margin-left: 246px;
}

.registrationBuss ol li:nth-child(3) {
  margin-left: 290px;
}

.registrationBuss ul li:nth-child(3) {
  margin-left: 252px;
}

.tleXian {
  width: 80%;
  height: 1px;
  background-color: #cccccc;
  margin-left: 10%;
  margin-top: 20px;
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
  margin: 40px 340px;
  cursor: pointer;
}
</style>
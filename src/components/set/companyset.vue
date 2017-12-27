<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="main_rightTop">
            <p>企业名称与logo设置</p>
        </div>
        <div class="main_rightMain" v-loading="loading" element-loading-text="加载中....">
            <div>
                <div class="firmname">
                    <span style="color: #E7744A;">*</span><span>企业名称：</span>
                    <input maxlength="30" v-model="companyname" class="inputText" @focus="focusInput" @blur="blurInput" :class="{redBorder:isredBorder_1,focusBorder:isfocusBorder_1}"
                        type="text" placeholder="请输入中文或英文">
                </div>
                <p v-show="warning_1" class="warnStyle">请输入中文或英文</p>
                <div class="firmprofile">
                    <span>企业简介：</span>
                    <textarea maxlength="150" v-model="companyfile" @focus="focusInput_1" @blur="blurInput_1" :class="{redBorder:isredBorder_2,focusBorder:isfocusBorder_2}"
                        @keyup="areachange" name="" id="area" cols="30" rows="10" placeholder="不超过150个汉字" style="width: 560px;height: 110px;"></textarea>
                        <p><span id="text-count">0</span> / 150</p>
                </div>
                <p v-show="warning_2" class="warnStyle">不能输入特殊字符</p>
                <div class="firmlogo">
                    <span style="margin-left: 5px;">企业logo：</span><img :src="defaultImg_1" alt="" width="80" height="80">
                    <input id="logofile" type="file" style="display: none;" accept="image/jpeg,image/jpg,image/png" @change="onFileChange">
                    <input type="button" value="上传" @click="upload"><br>
                    <span class="egRatio">上传尺寸为1:1,建议640*640,大小不超过1M</span>

                </div>
                <p v-show="warning_3" class="warnStyle">请上传正确的图片格式</p>
                <div class="firmlogo">
                    <span style="margin-left: 5px;">开机启动图：</span>
                    <img style="margin-left: -3px;" :src="defaultImg_2" alt="" width="80" height="80">
                    <input id="logofiles" type="file" style="display: none;" accept="image/jpeg,image/jpg,image/png" @change="onFileChanges">
                    <input type="button" value="上传" @click="uploads">
                    <br>
                    <span class="egRatio">上传尺寸为900*750,大小不超过2M</span>
                </div>
                <p v-show="warning_4" class="warnStyle">请上传正确的图片格式</p>
                <div class="qidong">
                    <p>启动图跳转链接</p>
                    <input placeholder="http://" v-model="imgurl" @focus="focusInput_2" @blur="blurInput_2" :class="{redBorder:isredBorder_3,focusBorder:isfocusBorder_3}"
                        style="margin-left: 8px;" class="inputText" type="text">
                </div>
                <p v-show="isredImgurl" class="warnStyle">请输入正确的跳转链接</p>
                <div class="qidong">
                    <p style="margin-top: 10px;margin-bottom: 4px;">启动图有效期（有效期到期后自动下线）</p>
                    <div style="overflow: hidden;">
                        <div class="datetimeBox" style="margin-left: 5px;" :class="{redBorder:isredBorder_4}">
                            <el-date-picker :picker-options="pickerOptions1" v-model="advStartTime" type="datetime" placeholder="起始时间" :editable='false'
                                clearable></el-date-picker>
                        </div>
                        <span style="float: left;line-height: 36px;margin: 0 5px;color: #d9d9d9;">———</span>
                        <div class="datetimeBox" :class="{redBorder:isredBorder_5}">
                            <el-date-picker :picker-options="pickerOptions1" v-model="advEndTime" type="datetime" placeholder="结束时间"  :editable='false'
                                clearable></el-date-picker>
                        </div>
                    </div>
                </div>
                <p v-show="warning_6" class="warnStyle">{{warn_6}}</p>
                <div class="clear"></div>
                <input class="baocun" type="button" value="保存" @click="addsetBtn">
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
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      defaultImg_1: "/static/img/123.png",
      defaultImg_2: "/static/img/123.png",
      isfocusBorder_1: false,
      isfocusBorder_2: false,
      isfocusBorder_3: false,
      companyfile: "",
      companyname: "",
      imgurl: "",
      advStartTime: null,
      advEndTime: null,
      warning_1: false,
      warning_2: false,
      warning_3: false,
      warning_4: false,
      warning_5: false,
      warning_6: false,
      warn_6: "",
      isredBorder_1: false,
      isredBorder_2: false,
      isredBorder_3: false,
      isredBorder_4: false,
      isredBorder_5: false,
      flag: true,
      islogoImg: "",
      loading: false,
      oid: "ff80808159956936015995865b7b0001",
      uid: "b7dbe60745954de4bf75e1c6a755ad8e",
      isredImgurl: false
    };
  },
  filters: {},
  created: function() {
    if(sessionStorage.getItem("orgId") == undefined){
      return
    }
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
    this.oid = sessionStorage.getItem("orgId");
    this.uid = sessionStorage.getItem("userId");
    this.gainInfo();
    this.areachange();
  },
  watch: {},
  methods: {
    // 返回日期格式化
    UnFormatDates(date) {
      var y, m, d, h, i, s;
      var t = new Date(date);
      y = t.getFullYear();
      m = t.getMonth() + 1;
      d = t.getDate();
      return y + "." + (m < 10 ? "0" + m : m) + "." + (d < 10 ? "0" + d : d);
    },
    UnFormatDate(date) {
      var y, m, d, h, i, s;
      var t = new Date(date);
      y = t.getFullYear();
      m = t.getMonth() + 1;
      d = t.getDate();
      h = t.getHours();
      i = t.getMinutes();
      return (
        y +
        "-" +
        (m < 10 ? "0" + m : m) +
        "-" +
        (d < 10 ? "0" + d : d) +
        " " +
        (h < 10 ? "0" + h : h) +
        ":" +
        (i < 10 ? "0" + i : i)
      );
    },
    focusInput: function() {
      this.isfocusBorder_1 = true;
    },
    blurInput: function() {
      this.isfocusBorder_1 = false;
    },
    focusInput_1: function() {
      this.isfocusBorder_2 = true;
    },
    blurInput_1: function() {
      this.isfocusBorder_2 = false;
    },
    focusInput_2: function() {
      this.isfocusBorder_3 = true;
    },
    blurInput_2: function() {
      this.isfocusBorder_3 = false;
    },
    upload: function() {
      $("#logofile").click();
    },
    uploads: function() {
      $("#logofiles").click();
    },
    // 获取企业信息
    gainInfo() {
      var self = this;
      // self.loading = true
      self
        .getGainCompanyInfo({
          oid: self.oid
        })
        .then(data => {
          self.loading = false;
          if (data.code == "000000") {
            self.companyname = data.data.orgName;
            if (data.data.hasOwnProperty("orgDesc")) {
              self.companyfile = data.data.orgDesc;
              self.areachange();
            }
            if (data.data.hasOwnProperty("orgLogo")) {
              self.defaultImg_1 =
                data.data.orgLogo == ""
                  ? "/static/img/123.png"
                  : data.data.orgLogo;
            } else {
              self.defaultImg_1 = "/static/img/123.png";
            }
            if (data.data.hasOwnProperty("orgImage")) {
              self.defaultImg_2 =
                data.data.orgImage == ""
                  ? "/static/img/123.png"
                  : data.data.orgImage;
            } else {
              self.defaultImg_2 = "/static/img/123.png";
            }
            if (data.data.hasOwnProperty("orgUrl")) {
              self.imgurl = data.data.orgUrl;
            }
            if (data.data.hasOwnProperty("startTime")) {
              self.advStartTime =
                data.data.startTime == 0 ? "" : data.data.startTime;
            }
            if (data.data.hasOwnProperty("endTime")) {
              self.advEndTime = data.data.endTime == 0 ? "" : data.data.endTime;
            }
          } else {
            self.$message(data.msg);
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
    // 选择图片上传
    onFileChange(e) {
      var self = this;
      self.islogoImg = true;
      var files = e.target.files || e.dataTransfer.files;
      var fileData = files[0];
      // 读取图片数据
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        // 加载图片的真实宽度和高度
        var image = new Image();
        image.onload = function() {
          if (image.width != image.height) {
            self.warning_3 = true;
            return;
          } else if (fileData.size > 1024 * 1024) {
            self.warning_3 = true;
            return;
          } else {
            self.warning_3 = false;
            self.uploadImage(files[0]);
          }
        };
        image.src = data;
      };
      reader.readAsDataURL(fileData);
    },
    onFileChanges(e) {
      var self = this;
      self.islogoImg = false;
      var files = e.target.files || e.dataTransfer.files;
      var fileData = files[0];
      // 读取图片数据
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        // 加载图片的真实宽度和高度
        var image = new Image();
        image.onload = function() {
          if (image.width !== 900) {
            self.warning_4 = true;
            return;
          } else if (image.height !== 750) {
            self.warning_4 = true;
            return;
          } else if (fileData.size > 1024 * 1024 * 2) {
            self.warning_4 = true;
            return;
          } else {
            self.warning_4 = false;
            self.uploadImage(files[0]);
          }
        };
        image.src = data;
      };
      reader.readAsDataURL(fileData);
    },
    // 上传图片
    uploadImage(file) {
      var formdata = new FormData();
      formdata.append("file", file);
      // formdata.append('appName','appName')
      this.uploadFile(formdata).then(data => {
        if (data.code == 200) {
          this.$message({
            message: "上传图片成功",
            type: "success"
          });
          if (this.islogoImg == true) {
            this.defaultImg_1 = data.data[0].reqUrl;
            document.getElementById("logofile").value = "";
          } else {
            this.defaultImg_2 = data.data[0].reqUrl;
            document.getElementById("logofiles").value = "";
          }
        } else {
          self.$message(data.msg);
          document.getElementById("logofile").value = "";
          document.getElementById("logofiles").value = "";
        }
      });
    },
    areachange: function() {
      var count = "";
      count = this.companyfile.length;
      $("#text-count").text(count);
    },
    panduan() {
      if (this.flag == true) {
        if (this.companyname == null || this.companyname == "") {
          this.isredBorder_1 = true;
        } else {
          this.isredBorder_1 = false;
        }
        if (this.isredBorder_1 == true) {
          return false;
        } else {
          // 只能输入中文或英文
          var leter = /^[a-zA-Z\u4e00-\u9fa5]+$/;
          // 不能输入特殊字符
          var regs = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*;（）——|{}【】]");
          if (!leter.test(this.companyname)) {
            this.isredBorder_1 = true;
            this.warning_1 = true;
          } else {
            this.isredBorder_1 = false;
            this.warning_1 = false;
          }
          if (regs.test(this.companyfile)) {
            this.isredBorder_2 = true;
            this.warning_2 = true;
          } else {
            this.isredBorder_2 = false;
            this.warning_2 = false;
          }
          if (
            this.imgurl.substring(0, 7) == "" ||
            this.imgurl.substring(0, 7) == "http://" ||
            this.imgurl.substring(0, 8) == "https://"
          ) {
            this.isredImgurl = this.isredBorder_3 = false;
          } else {
            this.isredImgurl = true;
            this.isredBorder_3 = true;
          }
          if (
            (this.advStartTime == null || this.advStartTime == "") &&
            (this.advEndTime == null || this.advEndTime == "")
          ) {
            this.isredBorder_4 = this.isredBorder_5 = this.warning_6 = false;
          } else {
            if (
              this.advStartTime != null &&
              (this.advEndTime == null || this.advEndTime == "")
            ) {
              this.warn_6 = "请填写结束时间";
              this.isredBorder_4 = this.isredBorder_5 = this.warning_6 = true;
            } else if (
              (this.advStartTime == null || this.advStartTime == "") &&
              this.advEndTime != null
            ) {
              this.warn_6 = "请填写开始时间";
              this.isredBorder_4 = this.isredBorder_5 = this.warning_6 = true;
            } else if (this.advStartTime < new Date()) {
              this.warn_6 = "开始时间不能小于当前时间";
              this.isredBorder_4 = this.isredBorder_5 = this.warning_6 = true;
            } else if (this.advStartTime >= this.advEndTime) {
              this.warn_6 = "开始时间不能大于或者等于结束日期";
              this.isredBorder_4 = this.isredBorder_5 = this.warning_6 = true;
            } else {
              this.isredBorder_4 = this.isredBorder_5 = this.warning_6 = false;
            }
          }
          if (
            this.isredBorder_1 == true ||
            this.isredBorder_2 == true ||
            this.warning_3 == true ||
            this.warning_4 == true ||
            this.isredBorder_3 == true ||
            this.isredBorder_4 == true ||
            this.isredBorder_5 == true
          ) {
            return false;
          }
        }
      }
    },
    // 保存企业设置信息
    addsetBtn() {
      var self = this;
      if (this.panduan() == false) {
        return;
      } else {
        self
          .getSaveCompanySet({
            oid: self.oid,
            name: self.companyname,
            desc: self.companyfile,
            logo:
              self.defaultImg_1 == "/static/img/123.png"
                ? ""
                : self.defaultImg_1,
            image:
              self.defaultImg_2 == "/static/img/123.png"
                ? ""
                : self.defaultImg_2,
            url: self.imgurl,
            start:
              self.advStartTime == "" || self.advStartTime == null
                ? ""
                : self.UnFormatDate(self.advStartTime),
            end:
              self.advEndTime == "" || self.advEndTime == null
                ? ""
                : self.UnFormatDate(self.advEndTime)
          })
          .then(data => {
            if (data.code == "000000") {
              this.$message({
                message: "设置成功",
                type: "success"
              });
            } else {
              this.$message(data.msg);
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
    ...mapActions(["getGainCompanyInfo", "getSaveCompanySet", "uploadFile",'getbusiness'])
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

.firmname {
  line-height: 36px;
  height: 36px;
  margin-top: 20px;
}

textarea {
  margin-left: 15px;
}

.focusBorder {
  border: 1px solid #fcb298;
}

.main_rightMain {
  margin-left: 44px;
}

.firmprofile > span {
  float: left;
  margin-left: 5px;
  margin-top: 5px;
}

.firmprofile {
  position: relative;
  height: 110px;
  margin-top: 24px;
}

.firmprofile p {
  position: absolute;
  bottom: 2px;
  right: 130px;
  font-size: 12px;
  color: #e7744a;
}

.firmlogo {
  position: relative;
  margin-top: 24px;
}

.firmlogo input {
  width: 80px;
  height: 30px;
  background: #e7744a;
  font-size: 14px;
  color: #fff;
  margin-left: 24px;
}

.egRatio {
  position: absolute;
  bottom: 0;
  left: 196px;
  color: #8f8e94;
}

.firmlogo img {
  margin-left: 15px;
}

.qidong {
  margin-left: 83px;
  margin-top: 24px;
}

.qidong p {
  margin: 5px;
}

.datetimeBox {
  float: left;
  width: 175px !important;
  height: 36px;
  overflow: hidden;
  position: relative;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.el-date-editor.el-input {
  width: 180px;
}

.datetimeBox .el-date-editor.el-input {
  margin-left: -2px;
  margin-top: -1px;
}

.baocun {
  width: 100px;
  height: 34px;
  color: #fff;
  font-size: 16px;
  background: #e7744a;
  margin-left: 238px;
  margin-top: 32px;
}

.warnStyle {
  color: #ff5f57;
  font-size: 12px;
  margin-left: 90px;
  margin-top: 6px;
}

.redBorder {
  border: 1px solid #ff5f57;
}
</style>
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" id="setMain">
        <div class="main_rightTop">
            <p>
                <span>版本管理</span>
                <span class="addicon" @click="addiconClick"></span>
            </p>
        </div>
        <div class="main_rightMain">
            <ul>
                <li class="firstli">
                    <div>版本类型</div>
                    <div>资源链接</div>
                    <div>版本号</div>
                    <div>版本说明</div>
                    <div>更新时间</div>
                    <div class="brNone">操作</div>
                </li>
                <li v-for="(item,index) in items" :key="index">
                    <div>{{item.type | valFun}}</div>
                    <div>{{item.address}}</div>
                    <div>{{item.versionCode}}</div>
                    <div>{{item.versionDesc}}</div>
                    <div>{{item.createTime | ctimeFun}}</div>
                    <div class="brNone">
                        <div class="editicon" @click="editiconClick(index)"></div>
                    </div>
                </li>
            </ul>
        </div>
        <!--添加版本弹出层-->
        <div class="ModalsBox" v-show="addversion">
            <div class="Modals">
                <div class="modalsTop">
                    {{modalTitle}}
                </div>
                <div class="modalsBot" id="addversionModalMain">
                    <div>
                        <span>版本类型：</span>
                        <div class="selectBox" :class="{redBorder:isredBorder_3}">
                            <el-select v-model="value" :disabled='disb' placeholder="请选择" @change="banbenselect">
                                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <p v-show="warning_3" class="warnStyle">该版本类型已添加</p>
                    <div>
                        <span id="versionNumLeft">版本号：</span>
                        <input maxlength="10" v-show="versionHaois" v-model="versionHaoi" class="inputText" @focus="focusInput" @blur="blurInput"
                            :class="{redBorder:isredBorder_1,focusBorder:isfocusBorder_1}" type="text" placeholder="例：1.0.1">
                        <input maxlength="10" v-show="versionHaoAs" v-model="versionHaoA" class="inputText" @focus="focusInput" @blur="blurInput"
                            :class="{redBorder:isredBorder_1,focusBorder:isfocusBorder_1}" type="text" placeholder="例：12">
                    </div>
                    <p v-show="warning_2" class="warnStyle">版本号格式错误</p>
                    <div v-show="resourcechunk">
                        <span>资源链接：</span>
                        <input v-model="resourceUrl" disabled="true" type="text" :class="{redBorder:isredBorder_4}" 
                            class="inputText" id="apkfile">
                        <input id="uploadResourceBtn" type="button" @click="clickfile" value="选择文件">
                        <img v-show="isLoading" class="loading" src="/static/img/loading.gif" alt="加载中">
                        <input id="filebtn" value="" type="file" name="apk" @change="onFileChange">
                    </div>
                    <p v-show="warning_1" class="warnStyle">请上传apk文件格式</p>
                    <div>
                        <span>版本说明：</span>
                        <div class="textareabox" :class="{redBorder:isredBorder_2,focusBorder:isfocusBorder_2}">
                            <!-- <el-input @focus="focusInput_1" @blur="blurInput_1" type="textarea" :rows="4" placeholder="例：1.界面优化;2.新添功能;(注:分割符号为英文符号)"
                                v-model="textarea">
                            </el-input> -->
                            <textarea name="" id="" cols="30" rows="10" v-model="textarea"></textarea>
                        </div>
                    </div>
                </div>
                <div class="loadingBut" v-show="isLoading">
                    <div>
                        上传中，请等待......
                    </div>
                </div>
                <div v-show="!isLoading" class="modalfoot" id="versionFootBtnbox">
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
      isLoading: false,
      disb: false,
      resourceUrl: "",
      resourcechunk: false,
      warning_1: false,
      warning_2: false,
      warning_3: false,
      modalTitle: "",
      versionHaoi: "",
      versionHaoA: "",
      versionHaois: true,
      versionHaoAs: false,
      textarea: "",
      isfocusBorder_1: false,
      isredBorder_1: false,
      isfocusBorder_2: false,
      isredBorder_2: false,
      isredBorder_3: false,
      isredBorder_4: false,
      aa: "",
      options: [
        {
          value: "iOS",
          label: "iOS"
        },
        {
          value: "Android",
          label: "Android"
        }
      ],
      value: "",
      addversion: false,
      items: [],
      editId: "",
      values: ""
    };
  },
  filters: {
    // 返回日期格式化
    ctimeFun: function(val) {
      var now = new Date(val);
      var year = now.getYear() - 100;
      var month = now.getMonth() + 1;
      month = month > 9 ? month : "0" + month;
      var date = now.getDate();
      date = date > 9 ? date : "0" + date;
      var hour = now.getHours();
      hour = hour > 9 ? hour : "0" + hour;
      var minute = now.getMinutes();
      minute = minute > 9 ? minute : "0" + minute;
      return "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute;
    },
    valFun: function(val) {
      if (val == 1) {
        return "iOS";
      }
      if (val == 2) {
        return "安卓";
      } else {
        return "暂无信息";
      }
    }
  },
  created: function() {
    if(sessionStorage.getItem("orgId") == undefined){
      return
    }
    //获取版本信息列表
    this.getList();
  },
  watch: {},
  methods: {
    getList() {
      this.getversionfindList({})
        .then(data => {
         
          if (data.code == "000000") {
            this.items = data.data;
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
    //添加版本 信息
    addiconClick: function() {
      this.disb = false;
      this.modalTitle = "添加版本";
      this.addversion = true;
      this.value = "";
      this.versionHaoi = "";
      this.versionHaoA = "";
      this.resourceUrl = "";
      this.textarea = "";
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
    //修改版本信息
    editiconClick(index) {
     
      this.editId = this.items[index].id;
      this.modalTitle = "修改版本信息";
      this.addversion = true;
      this.disb = true;
      if (this.items[index].type == 1) {
        this.value = "iOS";
        this.versionHaoi = this.items[index].versionCode;
        this.resourceUrl = this.items[index].address;
        this.textarea = this.items[index].versionDesc;
      } else if (this.items[index].type == 2) {
        this.value = "Android";
        this.versionHaoA = this.items[index].versionCode;
        this.resourceUrl = this.items[index].address;
        this.textarea = this.items[index].versionDesc;
      }
      this.banbenselect();
    },
    clickfile: function() {
      $("#filebtn").click();
    },
    // select选择版本
    banbenselect: function() {
      this.warning_1 = false;
      this.warning_2 = false;
      this.warning_3 = false;
      this.isredBorder_4 = false;
      this.isredBorder_3 = false;
      this.isredBorder_1 = false;
      this.isredBorder_2 = false;
      // this.textarea = ''
      if (this.value == "Android") {
        this.resourcechunk = true;
        this.versionHaoAs = true;
        this.versionHaois = false;
      } else {
        this.resourcechunk = false;
        this.versionHaoAs = false;
        this.versionHaois = true;
      }
    },
    // 上传文件
    onFileChange(e) {
      
      var self = this;
      var files = e.target.files || e.dataTransfer.files;
      var fileData = files[0];
      if (
        !/\.(apk)$/i.test(files[0].name) ||
        !/\.(Apk)$/i.test(files[0].name) ||
        !files.length
      ) {
        self.isredBorder_4 = true;
        self.warning_1 = true;
      } else {
        self.isredBorder_4 = false;
        self.warning_1 = false;
        self.uploadImage(fileData);
      }
    },
    // 上传文件
    uploadImage(file) {
      this.isLoading = true;
    
    
      var formdata = new FormData();
     
      formdata.append("file", file);
      formdata.append("appName", "appName");
      this.uploadFile(formdata)
        .then(data => {
      
          if (data.code == 200) {
            this.isLoading = false;
            this.$message({
              message: "上传成功",
              type: "success"
            });
           
            this.resourceUrl = data.data[0].reqUrl;
          } else {
            this.isLoading = false;
            self.$message({
              type: "info",
              message: data.msg
            });
          }
        })
        .catch(msg => {
          this.isLoading = false;
          self.$message({
            type: "info",
            message: "服务器错误，上传失败！"
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
              message: "服务器错误!"
            });
          }
        });
    },
    panduan() {
      if (this.value == null || this.value == "") {
        this.isredBorder_3 = true;
      } else {
        this.isredBorder_3 = false;
      }

      if (this.value == "Android") {
        if (this.resourceUrl == null || this.resourceUrl == "") {
          this.isredBorder_4 = true;
        } else {
          this.isredBorder_4 = false;
        }
        if (this.versionHaoA == null || this.versionHaoA == "") {
          this.isredBorder_1 = true;
        } else {
          this.isredBorder_1 = false;
        }
      } else {
        this.isredBorder_4 = false;
        if (this.versionHaoi == null || this.versionHaoi == "") {
          this.isredBorder_1 = true;
        } else {
          this.isredBorder_1 = false;
        }
      }
      if (this.textarea == null || this.textarea == "") {
        this.isredBorder_2 = true;
      } else {
        this.isredBorder_2 = false;
      }

      if (
        this.isredBorder_1 == true ||
        this.isredBorder_2 == true ||
        this.isredBorder_3 == true ||
        this.isredBorder_4 == true
      ) {
        return false;
      } else {
        // for(var i=0;i<this.items.length;i++){
        
        //     if( this.value == this.items[i].type){
        //         this.warning_3 = true
        //         this.isredBorder_3 = true
        //         return
        //     }else{
        //         this.warning_3 = false
        //         this.isredBorder_3 = false
        //     }
        // }
        var reg = /^[0-9]*$/;
        var reg_2 = /^\d+(\.\d+){2}$/;
        if (this.value == "Android") {
          if (!reg.test(this.versionHaoA)) {
            this.warning_2 = true;
            this.isredBorder_1 = true;
            return false;
          } else {
            this.warning_2 = false;
          }
        } else {
          let verNums = this.versionHaoi.split(".");
          if (verNums.length != 3 && !reg_2.test(this.versionHaoi)) {
            this.warning_2 = true;
            this.isredBorder_1 = true;
            return false;
          } else {
            this.warning_2 = false;
          }
        }
        //     // 只能输入中文或英文
        //     var leter = /^[a-zA-Z\u4e00-\u9fa5]+$/
        //     // 不能输入特殊字符
        //     var regs = new RegExp("[.\u3000-\u303F\uFF00-\uFFEF\u3400-\u4DBF`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]+");
        //     if(!leter.test(this.companyname)){
        //         this.isredBorder_1 = true
        //         this.warning_1 = true
        //     }else{
        //         this.isredBorder_1 = false
        //         this.warning_1 = false
        //     }
        //     if(regs.test(this.companyfile)){
        //         this.isredBorder_2 = true
        //         this.warning_2 = true
        //     }else{
        //         this.isredBorder_2 = false
        //         this.warning_2 = false
        //     }
        //     if(this.advStartTime >= this.advEndTime){
        //         this.isredBorder_4 = true
        //         this.isredBorder_5 = true
        //         this.warn_6 = '开始时间不能大于或者等于结束日期'
        //         this.warning_6 = true
        //     }else{
        //         this.isredBorder_4 = false
        //         this.isredBorder_5 = false
        //         this.warning_6 = false
        //     }
        //     if(this.isredBorder_1 == true || this.isredBorder_2 == true ||　this.warning_3 == true
        // || this.warning_4 == true || this.isredBorder_3 == true || this.isredBorder_4 == true || this.isredBorder_5 == true){
        //     return false
        //     }
      }
    },
    //弹框保存
    addBaocun: function() {
      if (this.panduan() == false) {
        return;
      } else {
        if (this.modalTitle == "修改版本信息") {
          var obj = {};
          if (this.value == "iOS") {
            this.values = "1";
            obj = {
              versionCode: this.versionHaoi,
              type: this.values,
              versionDesc: this.textarea,
              id: this.editId
            };
          } else if (this.value == "Android") {
            this.values = "2";
            obj = {
              versionCode: this.versionHaoA,
              type: this.values,
              versionDesc: this.textarea,
              id: this.editId,
              address: this.resourceUrl
            };
          }
          this.getversionupdate(obj)
            .then(data => {
              if (data.code == "000000") {
                this.addversion = false;
                this.$message({
                  type: "success",
                  message: "修改成功！"
                });
                this.getList();
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
        } else if (this.modalTitle == "添加版本") {
          if (this.value == "iOS") {
            this.values = "1";
            for (let i = 0; i < this.items.length; i++) {
              if (this.items[i].type == "1") {
                this.warning_3 = true;
                return;
              }
            }

            this.getversionsave({
              type: this.values,
              address: this.resourceUrl,
              versionCode: this.versionHaoi || this.versionHaoA,
              versionDesc: this.textarea
            })
              .then(data => {
            
                if (data.code == "000000") {
                  this.addversion = false;
                  this.$message({
                    type: "success",
                    message: "添加成功！"
                  });
                  this.getList();
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
          } else if (this.value == "Android") {
            this.values = "2";
            for (let i = 0; i < this.items.length; i++) {
              if (this.items[i].type == "2") {
                this.warning_3 = true;
                return;
              }
            }

            this.getversionsave({
              type: this.values,
              address: this.resourceUrl,
              versionCode: this.versionHaoi || this.versionHaoA,
              versionDesc: this.textarea
            })
              .then(data => {
              
                if (data.code == "000000") {
                  this.addversion = false;
                  this.$message({
                    type: "success",
                    message: "添加成功！"
                  });
                  this.getList();
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
        }
      }
    },
    //取消
    cancle: function() {
      this.addversion = false;
    },
    ...mapActions([
      "getversionsave",
      "getversionupdate",
      "getversionfindList",
      "uploadFile"
    ])
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
  border-bottom: 1px solid #d9d9d9;
  width: calc(100% - 88px);
  overflow: hidden;
}

.main_rightTop p span {
  float: left;
}

.main_rightTop {
  width: 100%;
}

.addicon {
  float: left;
  width: 48px;
  height: 22px;
  margin-left: 12px;
  background: url("/static/img/Slice.png") no-repeat -137px -9px;
  cursor: pointer;
}

.main_rightMain ul {
  margin-left: 44px;
  border: 1px solid #eeeeee;
  margin-top: 20px;
  width: calc(100% - 88px);
}

.main_rightMain ul li {
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid #eeeeee;
  display: table;
}

.main_rightMain ul li div {
  vertical-align: middle;
  display: table-cell;
  text-align: center;
  word-wrap: break-word;
  word-break: break-all;
  border-right: 1px solid #eee;
  padding: 10px 3px;
}

.firstli div {
  text-align: center;
  height: 55px;
  line-height: 55px;
}

.main_rightMain ul li div:nth-child(1) {
  width: 10%;
}

.main_rightMain ul li div:nth-child(2) {
  width: 22%;
}

.main_rightMain ul li div:nth-child(3) {
  width: 7%;
}

.main_rightMain ul li div:nth-child(4) {
  width: 40%;
}

.main_rightMain ul li div:nth-child(5) {
  width: 14%;
}

.main_rightMain ul li div:nth-child(6) {
  width: 7%;
}

.editicon {
  border-right: none !important;
  width: 48px;
  height: 25px;
  margin-left: 8px;
  background: url("/static/img/Slice.png") no-repeat -48px -8px;
  cursor: pointer;
}

/*添加版本弹出框*/

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
  padding: 0px 30px;
  overflow: hidden;
  overflow-y: auto;
  padding-bottom: 0;
}

.selectBox {
  float: left;
  width: 229px !important;
  height: 36px;
  overflow: hidden;
  position: relative;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.textareabox {
  float: left;
  width: 500px;
  height: 90px;
  overflow: hidden;
  position: relative;
  /* border: 1px solid #d9d9d9; */
  border-radius: 4px;
}

.textareabox textarea {
  width: 100%;
  height: 100%;
  line-height: 24px;
}

.el-textarea {
  width: 502px;
  margin-left: -1px;
  margin-top: -2px;
  position: absolute;
}

.modalsBot > div {
  height: 36px;
  line-height: 36px;
  margin-top: 24px;
}

.modalsBot > div span {
  float: left;
}

.selectBox .el-select {
  width: 232px;
  margin-left: -2px;
  margin-top: -1px;
  position: absolute;
}

.redBorder {
  border: 1px solid #ff5f57;
}

.focusBorder {
  border: 1px solid #fcb298;
}

.inputText {
  width: 500px;
  margin-left: 2px;
  padding-left: 8px;
}

.warnStyle {
  color: #ff5f57;
  font-size: 12px;
  margin-left: 73px;
  margin-top: 6px;
}

.Modals {
  height: 445px;
}

.loading {
  width: 25px;
  height: 25px;
}

.loadingBut {
  display: flex;
  justify-content: center;
  align-content: center;
}

.loadingBut div {
  margin-top: 10px;
  cursor: wait;
  width: 140px;
  height: 32px;
  border-radius: 4px;
  text-align: center;
  line-height: 32px;
  background: rgb(199, 199, 199);
}
#setMain{
  height: 100%;
}
.brNone{
  border-right: none!important;
}
#addversionModalMain{
  height: 300px;
}
#versionNumLeft{
margin-left: 12px;
}
#uploadResourceBtn{
height: 36px;line-height: 36px;
}
#filebtn{
display: none;
}
#apkfile{
width: 415px;background: #fff;
}
#versionFootBtnbox{
padding:10px;padding-bottom: 36px;
}
</style>
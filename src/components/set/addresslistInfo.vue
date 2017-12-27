<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" id="setMain" v-loading="loading" element-loading-text="加载中....">
        <div class="main_rightTop">
            <p>通讯录信息标签</p>
        </div>
        <div class="main_rightMain">
            <div class="anchorTag">
                <p>部门</p>
                <p>职位</p>
                <p>姓名</p>
                <p>手机号</p>
                <p>邮箱</p>
            </div>
            <div class="clear"></div>
            <ul class="deleteTag">
                <li v-for="(tag,index) in tags" :key="tag.cKey">
                    <span>{{tag.cKey}}</span>
                    <span class="crossImg" @click="deletetag(index)"></span>
                </li>
                <div class="userDefine" v-show="tags.length < 10">
                    <input v-model="userDefineCon" maxlength="15" onkeyup="this.value=this.value.replace(/\s+/g,'')" type="text" placeholder="自定义标签">
                    <div @click="addTag"></div>
                </div>
            </ul>
            <div class="clear"></div>
            <div class="phoneInfo">
                <p>手机端需要展示的信息</p>
            </div>
            <div class="phoneTag">
                <div class="phoneTag_left">
                    <div>
                        <p class="disab">
                            <el-checkbox v-model="checked" disabled>部门</el-checkbox>
                        </p>
                        <p class="disab">
                            <el-checkbox v-model="checked" disabled>邮箱</el-checkbox>
                        </p>
                        <p class="disab">
                            <el-checkbox v-model="checked" disabled>姓名</el-checkbox>
                        </p>
                        <p class="shouji">
                            <el-checkbox v-model="checked1" @change="mobileChange">手机号</el-checkbox>
                        </p>
                        <p class="shouji">
                            <el-checkbox v-model="checked2" @change="positionChange">职位</el-checkbox>
                        </p>
                    </div>
                    <div class="clear"></div>
                    <ul>
                        <li v-for="(item,index) in tags" :key="item.isShow">
                            <div @click="checkimg(index)" v-show="item.isShow == 0">
                                <img src="/static/img/on@2x.png" alt="">
                            </div>
                            <div @click="checkimg(index)" v-show="item.isShow == 1"></div>
                            <div class="tagWords">{{item.cKey}}</div>
                        </li>
                    </ul>
                </div>
                <div class="phoneTag_right">
                    <p>手机端展示效果图：</p>
                    <div id="phoneTag_right_main">
                        <img src="/static/img/zhaopian.png" alt="">
                        <ul>
                            <li v-for="(draw,index) in checkTag" :key="draw">
                                <span>{{draw}}</span>
                                <div></div>
                            </li>
                        </ul>
                        <img src="/static/img/Group 4.png" alt="">
                    </div>
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
      element: "",
      userDefineCon: "",
      checked: true,
      checked1: false,
      checked2: false,
      checked3: false,
      tags: [],
      checkTag: [],
      oid: "ff80808159956936015995e711f40086",
      uid: "b7dbe60745954de4bf75e1c6a755ad8e",
      loading: false,
      existtag: ["部门", "手机号", "职位", "姓名", "邮箱"]
    };
  },

  created: function() {
    if(sessionStorage.getItem("orgId") == undefined){
      return
    }
    this.oid = sessionStorage.getItem("orgId");
    this.uid = sessionStorage.getItem("userId");
    this.getUserDefineTag();
  },
  watch: {},
  methods: {
    mobileChange() {
      var n = "uo_phone";
      this.checked1 != this.checked1;
      this.ischeck(this.checked1, n);
    },
    positionChange() {
      var n = "uo_position";
      this.checked2 != this.checked2;
      this.ischeck(this.checked2, n);
    },
    // 获取用户自定义标签的信息
    getUserDefineTag() {
      var self = this;
      self.checkTag = [];
      self
        .getAllUserDefineConlist({
          oid: self.oid
          // uid:self.uid,
        })
        .then(data => {
          if (data.code == "000000") {
            self.tags = data.data.customizeAttr;
            for (var i = 0; i < data.data.fixedAttr.length; i++) {
              if (data.data.fixedAttr[i].cKey == "手机号") {
                if (data.data.fixedAttr[i].isShow == 1) {
                  self.checked1 = false;
                } else {
                  self.checked1 = true;
                  self.checkTag.push(data.data.fixedAttr[i].cKey);
                }
              }
              if (data.data.fixedAttr[i].cKey == "职位") {
                if (data.data.fixedAttr[i].isShow == 1) {
                  self.checked2 = false;
                } else {
                  self.checked2 = true;
                  self.checkTag.push(data.data.fixedAttr[i].cKey);
                }
              }
            }
            for (var i = 0; i < self.tags.length; i++) {
              if (self.tags[i].isShow == 0) {
                self.checkTag.push(self.tags[i].cKey);
              }
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
    // 点击复选框
    checkimg(index) {
      var self = this;
      self.loading = true;
      self
        .geteditUserDefineConlist({
          oid: self.oid,
          uid: self.uid,
          eKey: self.tags[index].eKey,
          isShow: self.tags[index].isShow == 1 ? 0 : 1
        })
        .then(data => {
          if (data.code == "000000") {
            self.loading = false;
            self.getUserDefineTag();
          } else {
            self.loading = false;
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
    // 手机号、职位是否选中
    ischeck(m, n) {
      var self = this;
      self.loading = true;
      self
        .geteditUserDefineConlist({
          oid: self.oid,
          uid: self.uid,
          eKey: n,
          isShow: m == true ? 0 : 1
        })
        .then(data => {
          if (data.code == "000000") {
            self.loading = false;
            self.getUserDefineTag();
          } else {
            self.loading = false;
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
    // 添加自定义标签
    addTag: function() {
      var a;
      for (var i = 0; i < this.existtag.length; i++) {
        if (this.existtag[i] == this.userDefineCon) {
          a = false;
        }
      }
      for (var i = 0; i < this.tags.length; i++) {
        if (this.tags[i].cKey == this.userDefineCon) {
          a = false;
        }
      }
      if (this.tags.length > 9) {
        this.$message("只能添加10个标签");
        return;
      } else if (this.userDefineCon == null || this.userDefineCon == "") {
        this.$message("请输入标签内容");
        return;
      } else if (a == false) {
        this.$message("添加过的标签不能重复添加");
        return;
      } else {
        var self = this;
        self
          .getaddUserDefineConlist({
            oid: self.oid,
            uid: self.uid,
            chineseName: self.userDefineCon
          })
          .then(data => {
            if (data.code == "000000") {
              // self.tags.push(data.data)
              self.userDefineCon = "";
              self.getUserDefineTag();
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
      }
    },
    // 删除自定义标签
    deletetag(index) {
      var self = this;
      self
        .getdelUserDefineConlist({
          oid: self.oid,
          uid: self.uid,
          attrId: self.tags[index].id
        })
        .then(data => {
          if (data.code == "000000") {
            self.getUserDefineTag();
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
    ...mapActions([
      "getaddUserDefineConlist",
      "getdelUserDefineConlist",
      "getAllUserDefineConlist",
      "geteditUserDefineConlist"
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
  width: calc(100% - 88px);
  border-bottom: 1px solid #d9d9d9;
}

.main_rightTop {
  width: 100%;
}

.main_rightMain {
  margin-left: 44px;
  width: calc(100% - 88px);
}

.anchorTag {
  margin-top: 20px;
  margin-bottom: 24px;
}

.anchorTag p {
  float: left;
  border: 1px solid #fcb298;
  border-radius: 4px;
  margin-right: 12px;
  padding: 0 22px;
  color: #fcb298;
  height: 36px;
  line-height: 36px;
}

.deleteTag {
  float: left;
}

.deleteTag li {
  margin-top: 24px;
  position: relative;
  float: left;
  border: 1px solid #fcb298;
  border-radius: 4px;
  margin-right: 12px;
  padding: 0 22px;
  color: #fcb298;
  height: 36px;
  line-height: 36px;
}

.crossImg {
  background: url("/static/img/Group.png") no-repeat;
  position: absolute;
  top: -7px;
  right: -5px;
  width: 15px;
  height: 15px;
  cursor: pointer;
}

.userDefine {
  overflow: hidden;
  width: 149px;
  float: left;
  margin-top: 24px;
}

.userDefine input {
  float: left;
  width: 113px;
  height: 36px;
  line-height: 36px;
  border: 1px solid #d9d9d9;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding-left: 12px;
  border-right: none;
}

.userDefine div {
  cursor: pointer;
  width: 36px;
  height: 36px;
  float: left;
  background: url("/static/img/Rectangle 4.png") no-repeat;
}

.phoneInfo {
  width: 100%;
  margin-top: 48px;
}

.phoneInfo p {
  width: 100%;
  color: #303030;
  font-size: 14px;
  padding-top: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #d9d9d9;
}

.disab .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background: #000 !important;
  border-color: #000 !important;
}

.el-checkbox__input.is-disabled + .el-checkbox__label {
  color: #303030;
}

.shouji .el-checkbox__inner {
  background: #fff;
}

.phoneTag {
  overflow: hidden;
}

.phoneTag_left {
  width: 70%;
  float: left;
}

.phoneTag_right {
  width: 28%;
  float: right;
}

.phoneTag_left > div p {
  float: left;
  margin-right: 40px;
  margin-top: 20px;
}

.phoneTag_left .el-checkbox-group label {
  margin-top: 36px;
  margin-right: 40px;
  margin-left: 0 !important;
}

.el-checkbox-group .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #e7744a;
  border-color: #e7744a;
}

.shouji .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #e7744a;
  border-color: #e7744a;
}

.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #ccc;
}

.phoneTag_right ul {
  border-left: 1px solid #f7f7f7;
  border-right: 1px solid #f7f7f7;
}

.phoneTag_right li {
  font-size: 12px;
  color: #7f6f71;
  background: #ffffff;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #efefef;
  position: relative;
}

.phoneTag_right li span:nth-child(1) {
  margin-left: 15px;
  float: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 70px;
}

.phoneTag_right li div {
  width: 34px;
  left: 81px;
  top: 16px;
  position: absolute;
  border-top: 1.5px solid #c6c5c8;
}

.phoneTag_right img {
  width: 100%;
}

.phoneTag_right p {
  margin-top: 20px;
  margin-bottom: 12px;
  text-align: center;
}

.phoneTag_right > div {
  box-shadow: rgb(204, 204, 204) -1px 1px 9px;
  max-height: 400px;
  overflow: hidden;
  overflow-y: scroll;
}
.phoneTag_right > div .el-checkbox {
  margin-left: 9px;
}
.phoneTag_left ul {
  /*display:flex;
         justify-content: flex-start;*/
}
.phoneTag_left li {
  float: left;
  margin-top: 36px;
  margin-right: 40px;
  height: 18px;
  line-height: 18px;
}
.phoneTag_left li img{
  vertical-align: baseline;
}

.phoneTag_left li > div {
  float: left;
}

.phoneTag_left li > div:nth-child(2) {
  cursor: pointer;
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 1px solid #bfcbd9;
}

.phoneTag_left li > div:nth-child(2):hover {
  border: 1px solid #5acdfa;
}
.phoneTag_left li > div:nth-child(1) img {
  cursor: pointer;
  width: 18px;
  height: 18px;
}
#setMain{
  height: 100%;
}
.tagWords{
  margin-left: 5px;
}
#phoneTag_right_main{
box-shadow: -1px 1px 9px #ccc
}
</style>
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" id="setMain" v-loading="loading" element-loading-text="上传中....">
        <div class="excelUpload">
            <div>
                <span @click="goAddresslist">通讯录</span>
                <span>>导入通讯录</span>
            </div>
            <div>
                <span>温馨提示：</span>
                <p>由于您的企业未认证，通讯录仅能存储<span>200人以内</span>的员工，如有超出，建议<a>申请企业认证</a></p>
            </div>
            <div>
                <h2>提示：</h2>
                <p>1.如果需要修改员工信息类别，请点击<router-link to="/home/set/addresslistInfo">此处</router-link>进行设置，并重新下载模板填写。</p>
                <p>2.为了确保通讯录信息的准确性，请导出通讯录，并在最新通讯录上修改。</p>
                <p>3.子账号仅能上传和导出有权限范围内的通讯录信息。</p>
            </div>
            <div class="Butbox">
                <div :class="{active:isActive_1}" @click="addAddresslist">新建通讯录</div>
                <div :class="{active:isActive_2}" @click="exportAddresslist">导出/修改通讯录</div>
            </div>
            <div class="content" v-show="isActive_1 == true">
                <div>
                    <div><img src="/static/img/iconfont_page_step1.png" alt=""></div>
                    <div>下载员工通讯录模版，批量填写员工信息</div>
                    <label @click="templetDownClick">下载</label>
                    <!--<input id="download_1" type="file">-->
                    
                </div>
                <div>
                    <div><img src="/static/img/iconfont_page_step2.png" alt=""></div>
                    <div>上传填写好的员工信息表</div>
                    <label for="upload_1">上传</label>
                    <input id="upload_1" type="file" @change="onFileChange" accept=".xls,.xlsx">
                </div>
            </div>
            <div class="content" v-show="isActive_2 == true">
                <div>
                    <div><img src="/static/img/iconfont_page_step1.png" alt=""></div>
                    <div>导出所有员工信息，批量修改员工信息</div>
                    <label for="download_2" @click='memberInfoExcelClick'>导出</label>
                    
                </div>
                <div>
                    <div><img src="/static/img/iconfont_page_step2.png" alt=""></div>
                    <div>上传修改好的员工信息表</div>
                    <label for="upload_2">上传</label>
                    <input id="upload_2" type="file" @change="onFileChange" accept=".xls,.xlsx">
                </div>
            </div>
        </div>

    </div>
</template>
<script>
require("../../../api/api.js");
import { mapActions } from "vuex";
export default {
  name: "set",
  data() {
    return {
      isActive_1: true,
      isActive_2: false,
      oid: "ff80808159956936015995e711f40086",
      uid: "b7dbe60745954de4bf75e1c6a755ad8e",
      TOKEN: "",
      loading:false,
    };
  },

  created: function() {
    if (sessionStorage.getItem("orgId") == undefined) {
      return;
    }
    this.oid = sessionStorage.getItem("orgId");
    this.uid = sessionStorage.getItem("userId");
    this.TOKEN = sessionStorage.getItem("accessToken");
  },
  watch: {},
  methods: {
    addAddresslist() {
      this.isActive_1 = true;
      this.isActive_2 = false;
    },
    exportAddresslist() {
      this.isActive_1 = false;
      this.isActive_2 = true;
    },
    goAddresslist() {
      this.$router.push({
        path: "/home/addresslist"
      });
    },
    //下载模板
    templetDownClick() {
      window.location.href =
        global.ip +
        "/api-org/book/download/" +
        this.oid +
        "/" +
        this.uid +
        "?access_token=" +
        this.TOKEN;
    },
    // 下载员工信息表
    memberInfoExcelClick() {
      window.location.href =
        global.ip +
        "/api-org/book/export/" +
        this.oid +
        "/" +
        this.uid +
        "?access_token=" +
        this.TOKEN;
    },
    onFileChange(e) {
      var self = this;
      var files = e.target.files || e.dataTransfer.files;
      var fileData = files[0];
      if(fileData.name.lastIndexOf('.xls') == -1 && fileData.name.lastIndexOf('.xlsx') == -1){
        this.$message('暂支持.xls,.xlsx格式，请重新上传')
      }else{
        self.uploadImage(files[0]);
      }
      
    },
    // 上传文件
    uploadImage(file) {
      var self = this;
      self.loading = true
      var formdata = new FormData();
      formdata.append("file", file);
      this.uploadFileExcel(formdata)
        .then(data => {
          self.loading = false
         
          if (data.code == "000000") {
            this.$message({
              message: "上传文件成功",
              type: "success"
            });
            var excelData = JSON.stringify(data.data);
            sessionStorage.setItem("excelData", excelData);
            self.$router.push({
              path: "/home/excelList"
            });
            document.getElementById('upload_1').value = ''
            document.getElementById('upload_2').value = ''
          } else {
            this.$message(data.msg);
            document.getElementById('upload_1').value = ''
            document.getElementById('upload_2').value = ''
          }
        })
        .catch(msg => {
          document.getElementById('upload_1').value = ''
          document.getElementById('upload_2').value = ''
          self.loading = false
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
    ...mapActions(["uploadFileExcel"])
  },
  mounted() {}
};
</script>
<style scoped>
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
  margin: 30px 0;
}
.excelUpload > div:nth-child(1) > span:nth-child(1) {
  color: #e7744a;
  cursor: pointer;
}
.excelUpload > div:nth-child(2) {
  display: flex;
}
.excelUpload > div:nth-child(2) p span,
.excelUpload > div:nth-child(2) p a {
  color: #e7744a;
}
.excelUpload > div:nth-child(2) p a:hover {
  text-decoration: none;
  /* cursor: pointer; */
}
.excelUpload > div:nth-child(3) {
  height: 115px;
  border-radius: 4px;
  background-color: #fbfaea;
  border: solid 1px #efeedc;
}
.excelUpload > div:nth-child(3) {
  padding-left: 20px;
  margin-top: 20px;
}
.excelUpload > div:nth-child(3) p a {
  color: #e7744a;
  cursor: pointer;
}
.excelUpload > div:nth-child(3) h2 {
  font-size: 14px;
  margin: 12px 0;
  margin-bottom: 5px;
}
.Butbox {
  display: flex;
  height: 44px;
  line-height: 44px;
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 16px;
}
.Butbox div:nth-child(1) {
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  width: 155px;
  height: 44px;
  text-align: center;
  border: solid 1px #d7d7d7;
  border-right: none;
  cursor: pointer;
}
.Butbox div:nth-child(2) {
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  width: 155px;
  height: 44px;
  text-align: center;
  border: solid 1px #d7d7d7;
  border-left: none;
  cursor: pointer;
}
.content {
  border-radius: 4px;
  border: solid 1px #d7d7d7;
}
.content > div {
  display: flex;
  align-items: center;
  margin: 25px;
}
.content > div > div:nth-child(1) {
  margin-right: 15px;
}
#setMain{
height: 100%;overflow-x: hidden;overflow-y: auto;
}
</style>
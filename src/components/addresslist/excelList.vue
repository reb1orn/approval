<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" id="setMain">
        <div class="excelUpload">
            <div>
                <span @click="goAddresslist">通讯录</span>
                <span>>导入通讯录</span>
            </div>
            <div v-show="!isErrorlist">您一共上传了<span>{{tableDataLength}}</span>条数据</div>
            <div v-show="isErrorlist">当前表格中有<span>{{tableDataLength}}</span>条错误，请修改完成后重新上传<span>（如有误，请调整excel后重新上传）</span></div>
            <div class="tableBox">
                <ul>
                    <li class="firstLi">
                        <div v-for="(item,index) in tableTitle" :title="item.name" :key="item.name">{{item.name}}</div>
                    </li>
                    <li class="dataLi" v-for="(item,index) in tableData" :key="">
                        <div v-for="(every,index) in item.item" :title="every.value" :key="every.value">{{every.value}}</div>
                    </li>
                </ul>
            </div>
            <p v-show="updateData.length>0">以下有员工信息较之前有变更，将以此次为准（如有误，请调整 excel 重新上传）</p>
             <div class="tableBox">
                <ul>
                    <li class="firstLi" v-show="updateData.length>0">
                        <div v-for="(item,index) in tableTitle" :title="item.name" :key="item.name">{{item.name}}</div>
                    </li>
                    <li class="dataLi" v-for="(item,index) in updateData" :key="">
                        <div v-for="(every,index) in item.item" :title="every.value" :key="every.value">{{every.value}}</div>
                    </li>
                </ul>
            </div>
            <div class="btnBox">
                <input type="button" value="重新上传" @click="reuploadClick">
                <input v-show="!isErrorlist" type="button" value="保存" @click="saveClick">
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
      tableTitle: [],
      excelData: null,
      tableData: null,
      tableDataLength: "",
      updateData: [],
      isErrorlist: false
    };
  },

  created: function() {
    if (sessionStorage.getItem("orgId") == undefined) {
      return;
    }
    this.oid = sessionStorage.getItem("orgId");
    this.uid = sessionStorage.getItem("userId");
    var self = this;
    var excelData = JSON.parse(sessionStorage.getItem("excelData"));
    self.tableTitle = excelData.title;
    self.tableData = excelData.list;
    self.tableDataLength = excelData.list.length;
    if (excelData.update) {
      self.updateData = excelData.update;
    }

    if (excelData.error == 0) {
      self.isErrorlist = false;
    } else {
      self.isErrorlist = true;
    }
  },
  watch: {},
  methods: {
    goAddresslist() {
      this.$router.push({
        path: "/home/addresslist"
      });
    },
    reuploadClick() {
      this.$router.push({
        path: "/home/excelUpload"
      });
    },
    saveClick() {
      var self = this;
      self
        .getsaveExcelList({
          oid: self.oid,
          uid: self.uid
        })
        .then(data => {
          if (data.code == "000000") {
            self.$message({
              type: "success",
              message: "保存excel成功！"
            });
            self.$router.push({
              path: "/home/addresslist"
            });
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
    ...mapActions(["getsaveExcelList"])
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
  margin-top: 30px;
}
.excelUpload > div {
  margin-bottom: 30px;
}
.excelUpload > div:nth-child(1) > span:nth-child(1) {
  color: #e7744a;
  cursor: pointer;
}
.excelUpload > div:nth-child(2),
.excelUpload > div:nth-child(3) {
  margin-bottom: 20px;
  width: 100%;
  background: #e7744a;
  padding: 9px;
  color: #ffffff;
  border: 1px solid #e7744a;
  border-radius: 4px;
}
.excelUpload > div:nth-child(3) {
  background: #f5c771;
  border: none;
}
.excelUpload > div:nth-child(3) span:nth-child(2) {
  color: red;
}
.tableBox {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}
ul li {
  /*display:flex;*/
  height: 38px;
  line-height: 38px;
}
ul li div {
  display: inline-block;
  min-width: 80px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 130px;
}
.firstLi div {
  border-right: 1px solid #000;
  text-align: center;
  background: #eceff4;
}
.btnBox {
  text-align: center;
}
.btnBox input {
  padding: 7px;
}
.btnBox input:nth-child(1) {
  background: #fff;
  border: 1px solid #c3c6ce;
  margin-right: 8px;
}
.btnBox input:nth-child(2) {
  background: #e7744a;
  color: #fff;
  padding: 7px 15px;
}
.Butbox {
  cursor: pointer;
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
}
.Butbox div:nth-child(2) {
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  width: 155px;
  height: 44px;
  text-align: center;
  border: solid 1px #d7d7d7;
  border-left: none;
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
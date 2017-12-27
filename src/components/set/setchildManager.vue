<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="childMasterTop">
            子管理员
            <a href="javascript:;" @click='add'>
                <img src="../../../static/img/add.png" alt="" />
            </a>
        </div>
        <div class="childMasterBot">
            <ul>
                <li class="firstLi">
                    <div>成员</div>
                    <div>管理范围</div>
                    <div>权限</div>
                    <div>操作</div>
                </li>
                <li class="dataLi" v-for="(item,index) in lists" :key="item.userNick">
                    <div>{{item.userNick}}</div>
                    <div v-if="item.userDept">{{item.userDept}}</div>
                    <div v-else>{{item.userScope}}</div>
                    <div class="dataAuth">
                        <span v-for="auth in item.userAuth" :key="auth">
                            {{auth}}
                        </span>
                    </div>
                    <div class="dataOp">
                        <div @click="compile(index)">
                            <img src="/static/img/compile.png" alt="">
                        </div>
                        <div @click="remove(index)">
                            <img src="../../../static/img/del.png" alt="">
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <remove-master v-show='removeM' @ensure='ensureClick' @abolish='abolishClick'></remove-master>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import removeMaster from "../removeMaster.vue"; //这里引入全局组件
export default {
  components: { removeMaster }, //这里注册全局组件
  name: "set",
  data() {
    return {
      removeM: false,
      ModalsBox: false,
      lists: [],
      delIndex: ""
    };
  },
  created: function() {
    if(sessionStorage.getItem("orgId") == undefined){
      return
    }
    this.listsFun();
  },
  watch: {},
  methods: {
    listsFun() {
      var self = this;
      self
        .getalladmin({
          orgId: sessionStorage.getItem("orgId")
        })
        .then(data => {
          if (data.code == "000000") {
            var arr = [];
            data.data.forEach(function(ele, ind) {
              var val = "";
              var auths = [];
              if (ele.userAuth) {
                val = ele.userAuth.substr(0, ele.userAuth.length);
                if (val.indexOf(",") > -1) {
                  auths = val.split(",");
                } else {
                  auths.push(val);
                }
              }
              arr.push({
                id: ele.id,
                userAuth: auths,
                userNick: ele.userNick,
                userDept: ele.userScope,
                userScope: ele.userScope,
                userDept: ele.userDept
              });
            });
            self.lists = arr;
          } else {
            this.$message({
              type: "info",
              message: "服务器错误，获取列表失败！"
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
    // 跳转编辑页面
    compile(index) {
      var self = this;
      var url = "/home/set/compileChildMaster";
      this.$router.push({
        path: url,
        query: { id: self.lists[index].id }
      });
    },
    // 删除管理员
    remove(index) {
      this.removeM = true;
      this.delIndex = index;
    },
    abolishClick() {
      this.removeM = false;
    },
    ensureClick() {
      var self = this;
      this.getorgAdmindelUserAdmin({
        orgUserAdminId: self.lists[self.delIndex].id
      })
        .then(data => {
          this.removeM = false;
          if (data.code == "000000") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            self.listsFun();
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
    // 跳转添加子管理员页面
    add() {
      var url = "/home/set/addChildMaster";
      this.$router.push({
        path: url
      });
    },
    ...mapActions([
      "addChildMaster",
      "compileChildMaster",
      "getalladmin",
      "getorgAdmindelUserAdmin"
    ])
  }
};
</script>
<style scoped>
.childMasterBot .dataLi .dataOp {
  display: flex;

  justify-content: center;
}

.childMasterBot .dataLi .dataOp > div {
  border: 0;
  padding:0;
}

.childMasterBot .dataLi .dataOp > div:nth-child(1) {
  margin-right: 10px;
}

.childMasterBot .dataLi .dataOp > div:nth-child(2) {
  margin-left: 10px;
}

.childMasterBot li {
  display: flex;
}

.childMasterBot li div:nth-child(4) {
  width: 15%;
}

.childMasterBot li div:nth-child(3) {
  width: 35%;
}

.childMasterBot li div:nth-child(2) {
  width: 25%;
}

.childMasterBot li div:nth-child(1) {
  width: 25%;
}

.childMasterBot {
  width: calc(100%-88px);
  min-height: 251px;
  margin-left: 44px;
  margin-right: 44px;
  margin-top: 20px;
}

.dataLi div:nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.dataAuth {
  padding: 10px;
}

.dataAuth span {
  float: left;
  margin: 5px;
  border: 1px solid #fcb298;
  color: #fcb298;
  font-size: 12px;
  margin-left: 2px;
  border-radius: 10px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 3px;
  padding-bottom: 3px;
}

.dataLi div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.dataLi {
  min-height: 36px;
  font-size: 14px;
  color: #5a5a5a;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.firstLi {
  display: flex;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: #f4f4f6;
  font-size: 14px;
}

.set {
  position: relative;
}

.childMasterTop {
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

.childMasterTop a {
  margin-left: 8px;
}

#remove {
  margin-left: 10px;
}
</style>
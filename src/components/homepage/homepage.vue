<template>
    <div class="set" id="setMain">
        <div class="main_left">
            <div class="business_head">
                <div>
                    <img :src="business.avatar | imgFun" alt="">
                </div>
                <div>
                    {{business.nick}}
                </div>
            </div>
            <div class="outnumber">
                <p>企业人数</p>
                <p class="number_people">{{business.userNum}}人</p>
            </div>
            <div class="outnumber">
                <p>部门数</p>
                <p class="number_people">{{business.deptNum}}个</p>
            </div>
            <div class="outnumber">
                <p>昨天使用人数</p>
                <p class="number_people">{{business.lastNum}}人</p>
            </div>
        </div>
        <div class="main_right">
            <div class="right-box-pic">
                <img src="../../../static/img/homepage.jpg">
            </div>
            <div class="staff-div">
                <div class="staff-box ng-isolate-scope">
                    <p class="quick_entry">快捷入口</p>
                    <div class="entry_classifi">
                        <ul>
                            <li v-for="(item,index) in items" :key="item.a" @click="QuickEntry_1Click(index)">
                                <div >                  
                                       <img  :src= item.imgIcon id="imgIconkq"/>                                    
                                    <span>
                                        <small>{{item.name}}</small>
                                    </span>
                                </div>
                            </li>
                            
                            <li>
                                <div @click="QuickEntry_5Click">
                                    <img src="../../../static/img/icon_KQ.jpg" id="imgIconkq">
                                    <span>
                                        <small>退出</small>
                                    </span>
                                </div>

                               
                            </li>

                        </ul>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      items: [
        {
          name: "员工管理",
          imgIcon: "../../../static/img/icon_ZCY.jpg"
        }
      ],
      business: {},
      imgIcon: "",
      headImage: "/static/img/tx@2x.png",
      itemsa: []
    };
  },
  filters: {
    imgFun: function(val) {
      if (val) {
        return val;
      } else {
        return "/static/img/tx@2x.png";
      }
    }
  },
  created: function() {
    if (sessionStorage.getItem("orgId") == undefined) {
      return;
    }
    let self = this;
    this.business = JSON.parse(sessionStorage.getItem("business"));
    sessionStorage.setItem("userName", this.business.nick);
    sessionStorage.setItem("IsParentCompany", this.business.isParent);
    sessionStorage.setItem("isPrimary", this.business.isPrimary);
    this.itemsa = JSON.parse(sessionStorage.getItem("arras"));
    for (let i = 0; i < self.itemsa.length; i++) {
      if (self.itemsa[i].name == "通讯录") {
        self.items.push({
          name: "通讯录管理",
          imgIcon: "../../../static/img/icon_TXL.jpg"
        });
      }
      if (self.itemsa[i].name == "微应用") {
        self.items.push({
          name: "应用中心",
          imgIcon: "../../../static/img/icon_WL.jpg"
        });
      }
      if (self.itemsa[i].name == "设置") {
        self.items.push({
          name: "设置",
          imgIcon: "../../../static/img/icon_DX.jpg"
        });
      }
    }
    self.items.push();
    sessionStorage.removeItem("youindex");
    this.getbusiness({
      oid: sessionStorage.getItem("orgId"),
      uid: sessionStorage.getItem("userId")
    })
      .then(data => {
        if (data.statusCode == "000000") {
          this.business = data.data;
        }else if(data.code == "100005"){
          this.$message({
            type: "info",
            message: '对不起，没有权限'
          });
          this.$router.push({
            path:'/login'
          })
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
  watch: {},
  methods: {
    QuickEntry_1Click(index) {
      var pathStr = this.itemsa[index + 1].push;
      var url = "/home/" + pathStr;
      this.$router.push({
        path: url
      });
      sessionStorage.setItem("myindex", index + 1);
    },
    QuickEntry_5Click() {
      this.$router.push({
        path: "/login"
      });
      this.refreshImgClick();
    },
    // 刷新验证码
    refreshImgClick() {
      var self = this;
      self
        .gettoken({})
        .then(data => {
          this.token = data.data.token;
          let urlStr =
            "http://192.168.10.60:8888/get_img/" +
            this.token +
            "?tm=" +
            Math.random();
          this.imgurl = urlStr;
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
              message: "服务器没有启动!"
            });
          }
        });
    },
    ...mapActions(["getbusiness", "gettoken"])
  }
};
</script>
<style scoped>
.staff-div {
  width: 100%;
}

.quick_entry {
  font-size: 16px;
  color: #333;
  font-weight: 600;
  padding: 10px 30px;
}

.entry_classifi {
  padding: 10px;
}

.entry_classifi ul li {
  width: 33.3333%;
  float: left;
  padding: 10px;
}

.entry_classifi ul li div {
  border-radius: 5px;
  cursor: pointer;
  width: 86%;
  margin: 0 auto;
  padding: 10px 20px;
  border: 1px solid #cecece;
}

a {
  text-decoration: none !important;
  color: #666666;
}

#footer a,
span {
  margin-left: 10px;
  margin-right: 10px;
}

.right-box-pic {
  padding: 20px 80px;
}

.number_people {
  text-align: right;
  margin-top: -22px;
}

.outnumber {
  width: 100%;
  padding: 10px 5px;
  height: 40px;
}

.main_left {
  border-radius: 4px;
  float: left;
  width: 260px;
  height: 100%;
  background: #fffaf9;
  border-right: 1px solid #ccc;
}

.main_left li {
  cursor: pointer;
  line-height: 40px;
  color: #000;
  font-size: 14px;
}

.main_left li:nth-child(1) {
  margin-top: 14px;
}

.main_left li:hover {
  background: #f7f2f1;
}

.main_left li div span {
  margin-left: 15px;
}

.main_right {
  width: 820px;
  height: 100%;
  float: left;
  overflow-y: scroll;
  overflow-x: hidden;
}

.business_head > div:nth-child(1) img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
}

.business_head > div:nth-child(1) {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.business_head > div:nth-child(2) {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 17px;
  color: #000;
  display: flex;
  justify-content: center;
}

.business_head {
  width: 60px;
  border-bottom: 1px solid #ccc;
  width: 100%;
}

.center {
  border: 1px solid red;
  text-align: center;
  width: 88%;
  margin: 0 auto;
  font-size: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid #cecece;
}
.imgDiv{
  max-height:35px;
}
 #imgIconkq{
  width:35px;
  height:35px;
 }
#setMain{
  height: 100%;
}
</style>
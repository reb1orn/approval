<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="minapplication" id="setMain">
        <div class="main_rightTop">
            <p><span @click="wodeapply" class="defaultColor" :class="{fontColor:isfontColor == 0}">我的应用</span><span id="verLine">|</span><span
                    class="defaultColor" :class="{fontColor:isfontColor == 1}" @click="editsort">编辑排序</span></p>
        </div>
        <div class="main_rightMain">
            <div v-show="wode">
                <p class="enabledprogram">已启用程序</p>
                <ul class="enableUl">
                    <li @mouseout="mouseouts(index)" @mouseover="mousehovers(index)" v-for="(item,index) in items" :key="index">
                        <img :src="item.logo" alt="">
                        <div>{{item.appName}}</div>
                        <div  v-show="hoverabled == index"  class="tingyong">
                            <p @click="entrance(index)" >进入</p>
                            <!-- <p @click='minSet(index)'>设置</p>
                            <p @click="stopuse(index)">停用</p> -->
                        </div>
                    </li>
                </ul>
                <div class="clear"></div>
                <p class="enabledprogram" v-show='enabledprogram'>已停用程序</p>
                <ul class="disabledUl">
                    <li @mouseout="mouseout(index)" @mouseover="mousehover(index)" v-for="(item,index) in itemss" :key="index">
                        <img :src="item.logo" alt="">
                        <div>{{item.appName}}</div>
                        <div @click="startuse(index)" v-show="hoverdisable == index" class="qiyong">启用</div>
                    </li>
                </ul>
            </div>
            <div v-show="edit">
                <p class="enabledprogram">已启用程序</p>
                <ul class="enableUl">
                    <li v-for="(item,index) in items" v-dragging="{item:item,list:items}" :key="item.logo">
                        <img :src="item.logo" alt="">
                        <div>{{item.appName}}</div>
                    </li>
                </ul>
                <div class="clear"></div>
                <p class="enabledprogram" v-show='enabledprogram'>已停用程序</p>
                <ul class="disabledUl">
                    <li v-for="(item,index) in itemss" v-dragging="{item:item,list:itemss,group:'item'}" :key="item.logo">
                        <img :src="item.logo" alt="">
                        <div>{{item.appName}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <!--弹出框-->
        <div class="ModalsBox" v-show="modifyBox">
            <div class="Modals" id="setMinapplyMain">
                <div class="modalsTop">
                    {{modalTitle}}
                </div>
                <div class="modalsBot" id="setMinapplyMiddle">
                    <div id="logoBox">
                        <span id="logoWords">应用logo<i class="mustIcon">*</i>：</span>
                        <div><img :src="logoImg" alt="" id="logoImg"></div>
                    </div>
                    <div>
                        <span>应用名称<i class="mustIcon">*</i>：</span>
                        <span>{{modalTitle}}</span>
                    </div>
                    <div>
                        <span id="agentWords">AgentID：</span>
                        <span id="agentWords-right">fflkasdjfklasdjfkasjdfklajsdlkfjasdkl</span>
                    </div>
                     <div>
                        <span>应用功能<i class="mustIcon">*</i>：</span>
                        <span>员工发送日报、周报、月报</span>
                    </div>
                     <div>
                        <span style="margin-left: 5px;">发送范围：</span>
                        <input style="cursor: pointer;" type="text" class="inputText" placeholder="选中部门、人员" @click="focusInput_1" >
                    </div>
                    <p class="grayfont">不选时，默认为所有员工可见</p>
                    <div>
                        <span style="margin-left: 33px;">其他：</span>
                        <el-checkbox v-model="hideicon"></el-checkbox>隐藏客户端图标
                    </div>
                    <p class="grayfont" style="margin-top: 0;">选择隐藏后，除管理员外，所有人员不可见，但仍接收应用消息</p>
                </div>
                <div class="modalfoot" style="padding:10px;padding-bottom: 36px;">
                    <input type="button" value="保存" class="baocun" style="margin-right: 24px;" @click="addBaocun">
                    <input type="button" value="取消" class="quxiao" style="margin-left: 24px" @click="cancle">
                </div>
            </div>
        </div>
        <!-- <pop-upBox v-show='Modals' @abolishmem='abolishmem'></pop-upBox> -->
    </div>
</template>
<script>
import { mapActions } from "vuex";
// import popupBox  from '../pop-upBox' //这里引入全局组件
export default {
  // components: {popupBox},//这里注册全局组件
  name: "minapplication",
  data() {
    return {
     
      enabledprogram:false,
      modalTitle: "",
      // isfocusBorder_1: false,
      hideicon: false,
      modifyBox: false,
      Modals: false,
      logoImg: "",
      isfontColor: 0,
      wode: true,
      edit: false,
      hoverdisable: 1111111,
      hoverabled: 11111,
      items: [
        // {
        //   name: "签到",
        //   imgurl: "/static/img/qiandao.png",
        //   imgurls: "/static/img/qiandaos.png",
        //   url: "/home/sign"
        // },
        // {
        //   name: "考勤打卡",
        //   imgurl: "/static/img/daka.png",
        //   imgurls: "/static/img/dakas.png",
        //   url: "/home/attendance"
        // },
        // {
        //   name: "审批",
        //   imgurl: "/static/img/shenpi.png",
        //   imgurls: "/static/img/shenpis.png",
        //   url: "/home/approve"
        // },
        // {
        //   name: "公告",
        //   imgurl: "/static/img/gonggao.png",
        //   imgurls: "/static/img/gonggaos.png",
        //   url: "/home/notice"
        // },
        // {
        //   name: "网盘",
        //   imgurl: "/static/img/wangpan.png",
        //   imgurls: "/static/img/wangpans.png"
        // },
        // {
        //   name: "会议",
        //   imgurl: "/static/img/huiyi.png",
        //   imgurls: "/static/img/huiyis.png"
        // }
      ],
      itemss: [
        {
          name: "日志",
          imgurl: "/static/img/rizhi.png",
          imgurls: "/static/img/rizhis.png",
          url: "/home/log"
        },
        {
          name: "咨询",
          imgurl: "/static/img/zixun.png",
          imgurls: "/static/img/zixuns.png"
        }
      ]
    };
  },

  created: function() {
    if (sessionStorage.getItem("orgId") == undefined) {
      return;
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
      // 获取微应用列表
      var self = this
      this.getmicroApplicationList({
         orgId: sessionStorage.getItem("orgId"),
         userId: sessionStorage.getItem("userId")
      }).then((data)=>{
        if(data.code == '000000'){
          self.items = data.data
        }else{
          this.$message({
            type:'info',
            message:data.msg
          })
        }
      }).catch(msg =>{
          this.$message({
            type: "info",
            message: data.msg
          });
      })
  },
  watch: {},
  mounted() {
    this.$dragging.$on("dragged", ({ value }) => {
      console.log(value)
      var arr =value.list
      var sortArray = []
      for(let i=0;i<arr.length;i++){
          sortArray.push({id:arr[i].id,sort:i})
      }
      
       this.getmicroApplicationListSort({
        orgId: sessionStorage.getItem("orgId"),
        sortArray:JSON.stringify(sortArray)
      }).then((data)=>{
         if(data.code == '000000'){
           this.$message({
             type:'success',
             message:'编辑成功！'
           })
         }else{
          this.$message({
             type:'info',
             message:data.msg
           }) 
         }
      }).catch(msg=>{
         this.$message({
           type:'info',
           message:data.msg
         })
      })
    });
    
  },
  methods: {
    focusInput_1: function() {
      // this.isfocusBorder_1 = true
      this.Modals = true;
    },
    // blurInput_1: function () {
    //     this.isfocusBorder_1 = false
    // },
    mousehover(index) {
      this.hoverdisable = index;
    },
    mouseout(index) {
      this.hoverdisable = 11111111;
    },
    mousehovers(index) {
      this.hoverabled = index;
     
    },
    mouseouts(index) {
      this.hoverabled = 11111111;
    },
    entrance(index) {
      let url = this.items[index].adminUrl;
      this.$router.push({
        path: url
      });
    },
    // 开启应用
    startuse(index) {
      let a = this.itemss[index];
      this.itemss.splice(index, 1);
      this.items.push(a);
    },
    // 停用应用
    stopuse(index) {
      let a = this.items[index];
      this.items.splice(index, 1);
      this.itemss.push(a);
      this.hoverdisable = 111111;
    },
    // 点击设置
    minSet(index) {
      this.modifyBox = true;
      this.modalTitle = this.items[index].name;
      this.logoImg = this.items[index].imgurl;
    },
    abolishmem: function() {
      this.Modals = false;
    },
    // 点击编辑排序
    editsort: function() {
      this.isfontColor = 1;
      this.wode = false;
      this.edit = true;
    },
    // 点击我的应用
    wodeapply: function() {
      this.isfontColor = 0;
      this.wode = true;
      this.edit = false;
    // 获取微应用列表
      var self = this
      this.getmicroApplicationList({
         orgId: sessionStorage.getItem("orgId"),
         userId: sessionStorage.getItem("userId")
      }).then((data)=>{
        if(data.code == '000000'){
          self.items = data.data
        }else{
          this.$message({
            type:'info',
            message:data.msg
          })
        }
      }).catch(msg =>{
          this.$message({
            type: "info",
            message: data.msg
          });
      })
    },
    addBaocun: function() {},
    cancle: function() {
      this.modifyBox = false;
    },
    ...mapActions(["attendance",'getbusiness','getmicroApplicationList','getmicroApplicationListSort'])
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
}

.enabledprogram {
  margin-top: 20px;
}

.enableUl li {
  cursor: pointer;
  position: relative;
  float: left;
  margin-top: 16px;
  margin-right: 16px;
}

.enableUl li div {
  margin-top: 10px;
  text-align: center;
}

.disabledUl li {
  cursor: pointer;
  position: relative;
  float: left;
  margin-top: 16px;
  margin-right: 16px;
}

.disabledUl li div {
  margin-top: 10px;
  text-align: center;
}
.qiyong {
  line-height: 84px;
  background: #f1f1f1;
  width: 85px;
  height: 84px;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  margin-top: 0px !important;
}

.tingyong {
  background: #f1f1f1;
  width: 90px;
  height: 90px;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  margin-top: 0 !important;
}

.tingyong p {
  font-size: 12px;
  line-height: 90px;
  
}

.tingyong p:nth-child(1) {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.tingyong p:nth-child(3) {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.tingyong p:hover {
  background: #e4e4e4;
}

.tingyong p:nth-child(2) {
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
}

.defaultColor {
  color: #8f8e94;
  cursor: pointer;
}

.fontColor {
  color: #e7744a !important;
}
/*各个图标设置对应弹出框*/
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
}

.quxiao {
  width: 80px;
  height: 35px;
  color: #fff;
  font-size: 16px;
  background: #aeaeae;
  line-height: 35px;
}

.modalsBot {
  padding: 0px 65px;
  overflow: hidden;
  overflow-y: auto;
  padding-bottom: 0;
}
.inputText {
  width: 300px;
  margin-left: 12px;
}
.modalsBot > div {
  height: 36px;
  line-height: 36px;
  margin-top: 24px;
}
.modalsBot > div span {
  float: left;
}
.modalsBot > div span:nth-child(2) {
  margin-left: 12px;
}
.focusBorder {
  border: 1px solid #fcb298;
}
input::-webkit-input-placeholder {
  color: #e7744a !important;
  font-size: 14px;
}

input:-moz-placeholder {
  color: #e7744a !important;
  font-size: 14px;
}

input::-moz-placeholder {
  color: #e7744a !important;
  font-size: 14px;
}

input:-ms-input-placeholder {
  color: #e7744a !important;
  font-size: 14px;
}
.grayfont {
  margin-left: 85px;
  margin-top: 8px;
  color: #8f8e94;
  font-size: 12px;
}
.el-checkbox {
  margin-left: 13px;
  margin-right: 10px;
}
#setMain{
  height: 100%;
}
#verLine{
margin:0 5px;
}
#setMinapplyMain{
height: 615px;
}
#setMinapplyMiddle{
height: 470px;
}
#logoBox{
  height: 90px;overflow: hidden;
}
.mustIcon{
color: #E7744A
}
#logoWords{
margin-top: 55px;
}
#logoImg{
margin-left: 12px;
}
#agentWords{
margin-left: 10px;
}
#agentWords-right{
margin-left: 12px;
}
</style>
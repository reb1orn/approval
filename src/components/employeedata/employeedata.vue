<template xmlns:v-on="http://www.w3.org/1999/xhtml">
<div>
    <div class="defaultPage" v-show="imgahg">
    
    </div>

    <div class="set" id="setMain" v-show="noimg">
        <div class="employeemain">
            <div class="employeeheader">员工数据</div>
            <div class="threepart">
                <div class="peoplenum">
                    <p id="currentPeopleNum">当前企业人数</p>
                    <div>
                        <div>
                            <span>{{businessNumber}}</span>人
                        </div>
                    </div>
                </div>
                <div class="peoplenum peoplenumMiddle">
                    <p>已激活人数</p>
                    <div>
                        <div>
                            <span>{{NumberOfActivePeople}}</span>人
                        </div>
                    </div>
                </div>
                <div class="peoplenum">
                    <p>未激活人数</p>
                    <div>
                        <div>
                            <span>{{inactiveNumber}}</span>人
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
            <div class="employeeheader">企业每日分析（截止昨天）</div>
        </div>
        <div class="tubiao">
            <div class="tubiaoTitle">伯通使用人数</div>
            <div id="map" class="tubiaoBox"></div>
        </div>

    </div>
</div>
</template>
<script>
let echarts = require("echarts");
import { mapActions } from "vuex";
export default {
  name: "set",
  data() {
    return {
      businessNumber:'',
      NumberOfActivePeople:'',
      inactiveNumber:'',
      imgahg: false,
      noimg: true,
      arr:[],
      Array:[],
      arrayNumber:[]
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
    sessionStorage.removeItem("youindex");
    this.getData()
  },
  watch: {},
  methods: {
    getData(){
      let self = this
      self.getemployeeNumber({
          oid:sessionStorage.getItem("orgId") ,
          access_token:sessionStorage.getItem('accessToken')      
      }).then((data)=>{
         if(data.code == '000000'){
           self.businessNumber = data.data.totalNumber
           self.NumberOfActivePeople = data.data.activationNumber
           self.inactiveNumber = data.data.inactiveNumber
           self.arr = data.data.variationCountList
           for(let i=0;i<self.arr.length;i++){
              self.Array.unshift(self.arr[i].date)
              self.arrayNumber.unshift(self.arr[i].count)
           }

            var map = echarts.init(document.getElementById("map"));
    map.setOption({
      
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      // legend: {
      //     data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      // },
      grid: {
        left: "3%",
        right: "5%",
        bottom: "3%",
        top: "2%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data:this.Array
        }
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            lineStyle: {
              width: 1,
              color: "#979797",
              type: "dotted"
            }
          }
        }
      ],

      series: [
        {
          symbolSize: 10,
          type: "line",
          smooth: true,
          stack: "总量",
          itemStyle: {
            normal: {
              color: "#e7744a",
              lineStyle: {
                width: 4,
                color: "#e7744a"
              }
            }
          },
          data: this.arrayNumber
        }
      ]
    });
         }else{
           this.$message({
             type:'info',
             message:data.msg
            }) 
         }
       
      }).catch(msg=>{
        this.$message({
          type:'info',
          message:'服务器错误！'
        })
      })
    },
    ...mapActions(["getbusiness",'getemployeeNumber'])
  },
  mounted() {
    // var self = this
    // var m = this.man
   
   
  }
};
</script>
<style scoped>
.employeemain {
  width: 1008px;
  margin: 0 auto;
}

.employeeheader {
  text-align: left;
  padding: 12px 0;
  border-bottom: 1px solid #ececec;
  padding-top: 24px;
}

.threepart {
  text-align: center;
  margin-top: 23px;
}

.peoplenum {
  width: 290px;
  height: 132px;
  border-radius: 4px;
  box-shadow: 0px 1px 8px #eeeeee;
  float: left;
  background: #fff;
}

.peoplenum p {
  text-align: left;
  margin-top: 16px;
  margin-left: 20px;
  padding-bottom: 5px;
  width: 73px;
  border-bottom: 4px solid #fcb298;
}

.peoplenum > div {
  height: 84px;
  position: relative;
}

.peoplenum > div > div {
  position: absolute;
  right: 20px;
  bottom: 16px;
  color: #8f8e94;
}

.peoplenum > div > div span {
  margin-right: 6px;
  font-size: 44px;
}

.tubiao {
  width: 695px;
  margin: 0 auto;
}
#setMain {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.peoplenumMiddle {
  margin: 0 23px;
}
#currentPeopleNum {
  width: 84px;
}
.tubiaoTitle {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 30px;
}
.tubiaoBox {
  width: 695px;
  height: 280px;
}
.defaultPage {
  width: 100%;
  height: calc(100vh - 200px);
  background: url("/static/img/defaultPage.png") no-repeat;
  background-size: 100% 100%;
  overflow-y: hidden;
}
</style>
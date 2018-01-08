<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="main_rightTop">
            <p>企业文化</p>
        </div>
        <div class="main_rightMain">
            <div class="noticNav">
                <span>文档标题</span>
                <span>是否显示</span>
                <span>最后修改时间</span>
                <span>设置</span>
            </div>
            <ul>
                <li v-for="(item,index) in items" :key="index">
                    <!-- <p>{{item.title}}</p> -->
                    <div >
                        <div class="noticNavs">
                            <span >{{item.contentTitle}}</span>
                            <span>{{item.isView | typeFun}}</span>
                            <span>{{item.lastMdfTime | Date}}</span>
                            <span>
                                <p @click='compile(index)'><img src="../../../../static/img/iconfont-bianji.png" alt=""></p>
                                <p @click='remove(index)'><img src="../../../../static/img/iconfont-shanchu.png" alt=""></p>
                                <p @click="carousel(index)"><img src="../../../../static/img/iconfont-lunbo-zixun.png" alt=""></p>
                            </span>
                        </div>
                        
                    </div>

                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex';
    export default {
        name: '',
        data() {
            return {
                items:[]
            }
        },
        created: function () {
                let self = this 
                self.getcontentGet({
                     columnId:sessionStorage.getItem('columnId'),
                     type:sessionStorage.getItem('columnShowType'),
                     pageNo:1,
                     pageSize:10
                }).then((data)=>{
                    if(data.code == '000000'){
                        if(data.data.records.length == 0){
                              
                        }else{
                            self.items = data.data.records
                        }
                    }else{
                        this.$message({
                            type:'info',
                            message:data.msg
                        })
                    }
                }).catch(msg=>{
                    this.$message({
                        type:'info',
                        message:msg.error
                    })
                })
        },
         filters: {
            typeFun(val) {
            if (val == 1) {
                return "否";
            } else {
                return "是";
            }
            },
            Date(val){
                var date = new Date(val);
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = date.getDate() + ' ';
                let h = date.getHours() + ':';
                let m = date.getMinutes() ;
                let s = date.getSeconds(); 
                return Y+M+D+h+m
            }
        },
        watch: {

        },
        methods: {
            // 编辑文档
            compile(index){
                  this.$router.push({
                      path:'/home/message/compileMessage'
                  })
            },
            // 删除文档
            remove(index){

            },
            // 设为轮播
            carousel(index){

            },
            ...mapActions(['getcontentGet'])

        }
    }

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
    
    .noticNav {
        width: 100%;
        height: 48px;
        line-height: 48px;
        background: #f4f4f6;
        margin-top: 20px;
    }
    .noticNavs {
        width: 100%;
        height: 48px;
        line-height: 48px;
        /* background: #f4f4f6; */
        /* margin-top: 20px; */
    }
    .noticNavs span:nth-child(4) p{
        width: 33%;
        height: 24px;
        float: left;
    }
     .noticNavs span:nth-child(4) p img{
         width: 24px;
         height: 24px;
     }
    .noticNavs span:nth-child(1){
        width: 25%;
        text-align: left;
        padding-left: 24px;
    }
    .noticNavs span{
        float: left;
        width: 25%;
        text-align: center;
    }
    .noticNav span:nth-child(1){
        width: 25%;
        text-align: left;
        padding-left: 24px;
    }
    .noticNav span{
        float: left;
        width: 25%;
        text-align: center;
    }
    /* .noticNav span:nth-child(1) {
        float: left;
        margin-left: 24px;
    }
    
    .noticNav span:nth-child(2) {
        float: right;
        margin-right: 134px;
    } */
    ul li{
        height: 48px;
        border-bottom: 1px solid #d9d9d9;
    }
    ul li>p{
        height: 48px;line-height: 48px;margin-left: 24px;cursor: pointer;
    }
    .biaoti{
        float: left;
    }

    .unread{
        float: left;margin-left: 189px;
    }
    .grayfont{
        color: #8f8e94;
    }
    .borderStyle{
        cursor: pointer;
        font-size: 12px;
        color: #fcb298;
        width: 48px;display: inline-block;border: 1px solid #fcb298;height: 20px;line-height:20px;border-radius: 17px;text-align: center;
    }
</style>

<!--父组件中引入items-->
  <!--<items  :model='model' v-for='model in data'></items>-->




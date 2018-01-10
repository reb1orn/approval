<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="main_rightTop">
            <p>入职培训</p>
            <p class="addTitle" @click="addTitle()">添加文档</p>
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
                                <p @click="carousel(index)" v-if="item.isCarousel==1"><img src="../../../../static/img/iconfont-lunbo-zixun.png" alt=""></p>
                                <p @click="carousel(index)" v-else><img src="../../../../static/img/iconfont-lunbo-zixun-no.png" alt=""></p>
                            </span>
                        </div>
                        
                    </div>

                </li>
            </ul>
            <div class="pagination">
       	        <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    small
                    layout="prev, pager, next"
                    :total="totals">
                </el-pagination>
            </div>
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
                currentPage:'',
                items:[],
                isCarousel:'',
                totals:''
            }
        },
        created: function () {
                sessionStorage.removeItem('detail')
                sessionStorage.removeItem('Title')
                sessionStorage.removeItem('contentId')
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
                            self.totals = data.data.total
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
                return "是";
            } else {
                return "否";
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
            addTitle(){
                this.$router.push({
                    path:'/home/message/addinduction'
                }) 
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                let self = this
                self.currentPage = val
                self.getcontentGet({
                     columnId:sessionStorage.getItem('columnId'),
                     type:sessionStorage.getItem('columnShowType'),
                     pageNo:val,
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
            // 编辑文档
            compile(index){
                let self = this
                sessionStorage.setItem('Title',this.items[index].contentTitle)
                sessionStorage.setItem('contentId',this.items[index].contentId)
                self.getcontentdetail({
                    columnId:sessionStorage.getItem('columnId'),
                    contentId:self.items[index].contentId
                }).then((data)=>{
                    if(data.code == '000000'){
                        sessionStorage.setItem('detail',JSON.stringify(data.data))
                        this.$router.push({
                            path:'/home/message/compileinduction'
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
                        message:msg.statusText
                    })
                })
                
            },
            // 删除文档
            remove(index){
                let self = this
                self.getcontentDelete({
                    contentId:self.items[index].contentId,
                    type:1
                }).then((data)=>{
                    if(data.code == '000000'){
                        this.$message({
                            type:'success',
                            message:'删除成功!'
                        })
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
                    }else{
                       this.$message({
                        type:'info',
                        message:data.msg
                    }) 
                    }
                }).catch(msg=>{
                    this.$message({
                        type:'info',
                        message:msg.statusText
                    })
                })
            },
            // 设为轮播
            carousel(index){
                let self = this
                if(self.items[index].isCarousel == 1){
                    self.isCarousel = 0
                }else if(self.items[index].isCarousel == 0){
                    self.isCarousel = 1
                }
                self.getcontentUpdate({
                    oid:sessionStorage.getItem('orgId'),
                    contentId:self.items[index].contentId,
                    isCarousel:self.isCarousel
                }).then((data)=>{
                    if(data.code == '000000'){
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
                this.$message({
                    type:'success',
                    message:'设置成功！'
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
                        message:msg.statusText
                    })
                })
            },
            ...mapActions(['getcontentGet','getcontentDelete','getcontentUpdate','getcontentdetail'])

        }
    }

</script>
<style scoped>
    .addTitle{
        float: right;
        margin-top: -40px;
        margin-right: 30px;
        cursor: pointer;
        width: 70px;
        height: 30px;
        background-color: #e7744a;
        color: #ffffff;
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        border-radius: 4px;
    }
	.pagination{
		float: right;
		margin-right: 20px;
	}
    .main_rightTop p:nth-child(1) {
        color: #303030;
        font-size: 14px;
        padding-top: 24px;
        padding-bottom: 12px;
        margin-left: 44px;
        /* width: calc(100% - 88px); */
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
        height: 40px;
        float: left;
    }
     .noticNavs span:nth-child(4) p img{
         width: 24px;
         height: 24px;
         cursor: pointer;
     }
    .noticNavs span:nth-child(1){
        width: 25%;
        text-align: left;
        padding-left: 24px;
    }
    .noticNavs span{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
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




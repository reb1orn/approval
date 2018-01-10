<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="main_left">
        	<div class="approve">资讯</div>
                <ul>
                <li v-for="(list,index) in chidlists" :key='index' :class="{sadeNav:isSadeNav == index}" >
                    <div>
                        <span @click="sadeNavClick(list,index)" class="listColumnName">{{list.columnName}}</span>
                        <div class="nodeChildren" v-show="list.clickNode" v-for="(children,index) in list.children" :key="index" @click='nodeChildren(list,index)' :class="{sadeNav:isSadeNav == index}">
                            <span>{{children.columnName}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="main_right">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex';
    export default {
        name: 'set',
        data() {
            return {
                isSadeNav:'',
                chidlists:[{
                    name:'企业文化',
                    push:'consulting'
                },
                // {
                //     name:'已发公告',
                //     push:'alreadysentNotice'
                // },
                ]
            }
        },

        created: function() {
                this.setDate()
                // sessionStorage.removeItem('columnId')
                let self = this 
                self.getcolumnGet({
                    oid:sessionStorage.getItem('orgId')
                }).then((data)=>{
                    if(data.code == '000000'){
                        if(data.data.length == 0){
                                self.chidlists = [
                                    {
                                        columnName:'企业文化',
                                        indexUrl:'consulting' 
                                    },
                                    {
                                        columnName:'培训资料',
                                        indexUrl:'induction'
                                    },
                                    {
                                        columnName:'入职培训',
                                        indexUrl:'induction'
                                    },
                                    {
                                        columnName:'在职培训',
                                        indexUrl:'onJob'
                                    },
                                    {
                                        columnName:'公司制度',
                                        indexUrl:'regime'
                                    }
                                ]                         
                        }else{
                        self.chidlists = data.data
                        sessionStorage.setItem('columnId',data.data[0].columnId)
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
                        message:msg.statusText
                    })
                })
                 
        },
        watch: {
                // 如果路由有变化，会再次执行该方法
                 "$route": "setDate"
        },
        methods: {
            nodeChildren(list,index){
               this.isSadeNav = index
               var pathStr = this.chidlists[index].indexUrl
                var url = '/home/message/' + pathStr
                this.$router.push({
                    path: url
                }) 
            },
        	 //  根据路径匹配标记导航
            setDate: function() {
                var psthStr = this.$route.path.split('/')[3]
                switch (psthStr) {
                    case 'consulting':
                        this.isSadeNav = 0
                        this.isSadeNav_1 = 0
                        break;
                        case 'induction':
                        this.isSadeNav = 1
                        this.isSadeNav_1 = 1
                        break;
                        case 'onJob':
                        this.isSadeNav = 1
                        this.isSadeNav_1 = 1
                        break;
                        case 'regime':
                        this.isSadeNav = 2
                        this.isSadeNav_1 = 2
                        break;
                }
            },
            sadeNavClick(list,index){
                list.clickNode = !list.clickNode 
                this.isSadeNav = index
                var pathStr = this.chidlists[index].indexUrl
                sessionStorage.setItem('columnId',this.chidlists[index].columnId)
                sessionStorage.setItem('columnShowType',this.chidlists[index].columnShowType)
                var url = '/home/message/' + pathStr
                this.$router.push({
                    path: url
                })
            },
            ...mapActions(['getcolumnGet'])
        }
    }

</script>
<!--私有样式-->
<style scoped>
.nodeChildren{
    padding-left: 20px;
    animation: nodeChildrens .8s forwards;   
}
@keyframes nodeChildrens {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: 40px;
    opacity: 1;
  }
}
.sadeNav{
    color:#FCB298!important;
    background: rgba(231,116,74,0.1);
    
}
.approve{
	text-align: center;
	line-height: 40px;
	background-color:#E7744A;
	color: #FFF;
	font-size: 14px;
	border-top-left-radius: 4px;
}
.main_left{
    border-radius: 4px;
    float: left;
    width: 260px;
    height: 100%;
    background: #fffaf9;
    border-right: 1px solid #ccc;
}
.main_left li{
    cursor: pointer;
    line-height: 40px;
    color:#000;
    font-size: 14px;
}
.main_left li:hover{
    background: #f7f2f1;
}
.main_left li div span{
    margin-left: 15px;
}
.main_right{
	width: 820px;
	height: 100%;
	float: left;
    overflow-y: scroll;
    overflow-x: hidden;
	}
    
</style>


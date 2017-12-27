<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="main_left">
        	<div class="approve">公告</div>
                <ul>
                <li v-for="(list,index) in chidlists" :class="{sadeNav:isSadeNav == index}" @click="sadeNavClick(index)">
                    <div>
                        <span>{{list.name}}</span>
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
                    name:'发送公告',
                    push:'sendNotice'
                },
                {
                    name:'已发公告',
                    push:'alreadysentNotice'
                },
                ]
            }
        },

        created: function() {
                  this.setDate()
        },
        watch: {
                // 如果路由有变化，会再次执行该方法
                 "$route": "setDate"
        },
        methods: {
        	 //  根据路径匹配标记导航
            setDate: function() {
                var psthStr = this.$route.path.split('/')[3]
                switch (psthStr) {
                    case 'sendNotice':
                        this.isSadeNav = 0
                        this.isSadeNav_1 = 0
                        break;
                        case 'alreadysentNotice':
                        this.isSadeNav = 1
                        this.isSadeNav_1 = 1
                        break;
                }
            },
            sadeNavClick(index){
                this.isSadeNav = index
                var pathStr = this.chidlists[index].push
                var url = '/home/notice/' + pathStr
                this.$router.push({
                    path: url
                })
            }
        }
    }

</script>
<!--私有样式-->
<style scoped>
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


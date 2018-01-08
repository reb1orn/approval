<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="main_rightTop">
            <p>在职培训</p>
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
                    <p>{{item.title}}</p>
                    <div style="overflow: hidden;margin-left: 24px;">
                        <div class="biaoti">
                            <span class="grayfont">{{item.time}}</span>
                            <span style="margin-left: 18px;" class="grayfont">{{item.name}}</span>
                            <span class="borderStyle" style="margin-left: 64px;" @click="stick(index)">置顶</span>
                            <span class="borderStyle" style="margin-left: 8px;">保密</span>
                        </div>
                        <div v-show='true' class="unread grayfont"><span>1人已读</span><span style="margin-left: 8px;">8人未读</span></div>
                        <div v-show="false"  class="unread grayfont"><span>全部人已读</span></div>
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
                items:[{
                    name:'张静',
                    title:'123',
                    time:'2017-05-26 09:00'
                },
                {
                    name:'李四',
                    title:'关于端午节放假的通知',
                    time:'2017-05-26 09:00'
                },
                {
                    name:'老王',
                    title:'456',
                    time:'2017-05-26 09:00'
                }]

            }

        },

        created: function () {
        },
        watch: {

        },
        methods: {
            stick(index){
                var a = this.items[index]
                this.items.splice(index,1)
                this.items.unshift(a)
            }

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
        height: 56px;border-bottom: 1px solid #d9d9d9;
    }
    ul li>p{
        height: 28px;line-height: 28px;margin-left: 24px;cursor: pointer;
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




<template>
    <div id="app">
        <div class="delTitle">
                提示
        </div>
        <div class="delCont">
            {{name}}
        </div>
        <div class="delope">
            <div @click="okClick">
                确定
            </div>
            <div @click="canleClick">
                取消
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        props: ['name'],
        data() {
            return {

            }
        },
        created: function () {
        },
        mounted: function () {
        },
        watch: {
        },
        methods: {
            // 确认
            okClick() {
                this.$emit('ok', "1")
            },
            // 取消
            canleClick() {
                this.$emit('canle', "2")
            },
             ...mapActions([''])
        },

    }

</script>
<style scoped>
    .delTitle{
        text-align: center;
        font-size: 20px;
        margin-top: 20px;
    }
    
     .delCont {
        font-size: 15px;
        text-align: center;
        margin:24px 0 25px 0;
        width: 100%;
        height: 25px;
    }
    
    .delope {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .delope>div {
        cursor: pointer;
        width: 100px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border-radius: 4px;
    }
    
    .delope>div:nth-child(1) {
        margin-right: 30px;
        border: solid 1px #e97449;
        color:#e97449;
    }
    
    .delope>div:nth-child(2) {
        margin-left: 30px;
        border: solid 1px #afafaf;
        color:#afafaf;
    }
</style>
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="home">
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex';
    export default {
        name: 'home',
        data() {
            return {
                lists: [
                ],
            }
        },

        created: function () {
            // this.fetchDate()
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            "$route": "fetchDate"
        },

        methods: {
            //  根据路径匹配标记导航
            fetchDate: function () {
                var psthStr = this.$route.path.split('/')[2]
                switch (psthStr) {
                    case 'set':
                        this.isSadeNacClo = 4
                        this.isSadeNacClo_1 = 4
                        break;
                    case 'employeedata':
                        this.isSadeNacClo = 3
                        this.isSadeNacClo_1 = 3
                        break;
                    case 'minapplication':
                        this.isSadeNacClo = 2
                        this.isSadeNacClo_1 = 2
                        break;
                    case 'attendance':
                        this.isSadeNacClo = 2
                        this.isSadeNacClo_1 = 2
                        break;
                    case 'notice':
                        this.isSadeNacClo = 2
                        this.isSadeNacClo_1 = 2
                        break;
                    case 'log':
                        this.isSadeNacClo = 2
                        this.isSadeNacClo_1 = 2
                        break;
                    case 'sign':
                        this.isSadeNacClo = 2
                        this.isSadeNacClo_1 = 2
                        break;
                    case 'addresslist':
                        this.isSadeNacClo = 1
                        this.isSadeNacClo_1 = 1
                        break;
                    case 'excelUpload':
                        this.isSadeNacClo = 1
                        this.isSadeNacClo_1 = 1
                        break;
                    case 'homepage':
                        this.isSadeNacClo = 0
                        this.isSadeNacClo_1 = 0
                        break;
                }
            },
            // 顶部导航切换
            sadeNacCloClick(index) {
                this.isSadeNacClo = index
                var pathStr = this.lists[index].push
                var url = '/home/' + pathStr
                this.$router.push({
                    path: url
                })
            },
        }
    }

</script>
<!--私有样式-->
<style scoped>
    .home_top {
        height: 64px;
        background: #fff;
        line-height: 64px;
        /*overflow: hidden;*/
        margin-bottom: 16px;
    }
    
    .home_top>div {
        width: 1080px;
        margin: 0 auto;
        height: 64px;
    }
    
    .home_topLeft {
        float: left;
        width: 260px;
    }
    
    .home_topLeft span:nth-child(1) {
        float: left;
        border-radius: 50%;
        margin-top: 12px;
        background: url('/static/img/Slice.png') no-repeat -3px 0px;
        width: 40px;
        height: 40px;
    }
    
    .home_topLeft span:nth-child(2) {
        color: #E7744A;
        font-size: 20px;
        margin-left: 16px;
    }
    
    .sadeNacClo {
        color: #E7744A!important;
        border-bottom: 1px solid #E7744A;
    }
    
    .home_topRight {
        float: left;
        width: 820px;
        height: 100%;
    }
    
    .home_topRight ul {
        float: left;
        height: 100%;
    }
    
    .home_topRight>span {
        background: url('/static/img/Slice.png') no-repeat -287px -109px;
        width: 20px;
        height: 20px;
        cursor: pointer;
        float: right;
        margin-top: 22px;
    }
    
    .home_topRight ul li {
        cursor: pointer;
        float: left;
        margin: 0 24px;
        text-align: center;
        height: 100%;
        color: #303030;
        font-size: 18px;
    }
    
    .home_main {
        border-radius: 4px;
        margin-top: 16px;
        background: #fff;
        width: 1080px;
        margin: 0 auto;
        /*min-height: calc(100vh - 80px);
        min-height: -webkit-calc(100vh - 80px);
        height: -webkit-calc(100vh - 80px);
        height: calc(100vh - 80px);*/
        position: absolute;
        top: 80px;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
<style>
    /*公用*/
    
    * {
        outline: none;
    }
    
    p {
        margin: 0;
    }
    
    .fl {
        float: left;
    }
    
    .fr {
        float: right;
    }
    
    .clear {
        clear: both
    }
    
    input {
        border-radius: 4px;
        outline: none;
        border: none;
    }
    
    .inputText {
        padding-left: 12px;
        border: 1px solid #d9d9d9;
        height: 36px;
        margin-left: 10px;
        width: 560px;
    }
    
    textarea {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        padding-left: 12px;
        padding-top: 8px;
        resize: none;
    }
    
    textarea::-webkit-input-placeholder {
        color: #8E8F94!important;
        font-size: 12px
    }
    
    input::-webkit-input-placeholder {
        color: #8E8F94!important;
        font-size: 12px
    }
    
    input:-moz-placeholder {
        color: #8E8F94!important;
        font-size: 12px
    }
    
    input::-moz-placeholder {
        color: #8E8F94!important;
        font-size: 12px
    }
    
    input:-ms-input-placeholder {
        color: #8E8F94!important;
        font-size: 12px
    }
    
    .el-date-table td.current:not(.disabled) {
        background-color: #E7744A!important;
    }
    
    .el-date-table td.today:before {
        border-top: 0.5em solid #E7744A!important;
    }
    
    ul {
        margin: 0;
        padding: 0;
    }
    
    .nullContent {
        margin-top: 302px;
        color: #DDD;
        font-size: 20px;
        text-align: center;
    }
    
    .main {
        min-height: calc(100vh - 150px);
    }
    /*::-webkit-scrollbar {
    width: 0px;
  }*/
    
    .el-input__inner {
        border-color: #E7744A !important;
    }
    
    .dataExBot .el-input {
        width: 100px !important;
    }
    
    .el-input__inner:focus {
        border-color: #E7744A;
    }
    
    .el-checkbox__inner {
        width: 17px!important;
        height: 16px!important;
        z-index: 0 !important;
    }
    
    .el-transfer .el-checkbox__inner {
        width: 15px!important;
        height: 15px!important;
    }
    
    .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: #E7744A !important;
        border-color: #E7744A !important;
        z-index: 0;
    }
    
    .el-checkbox__input.is-checked .el-checkbox__inner::after {
        /*margin-left: -1px;*/
    }
    
    .el-checkbox__label {
        font-weight: normal;
    }
    
    .el-pager li.active {
        background-color: #E7744A !important;
        border-radius: 4px !important;
        border: 1px solid #E7744A !important;
    }
    
    .el-pager li.hover {
        color: #E7744A !important;
    }
    
    .el-table .cell {
        text-align: center !important;
    }
    /*弹出框*/
    
    .ModalsBox {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.1);
        z-index: 999;
    }
    
    .Modals {
        position: absolute;
        left: 0;
        top: 0px;
        right: 0;
        bottom: 0;
        margin: auto auto;
        width: 648px;
        height: 292px;
        box-shadow: 0 5px 3px #CCCCCC;
        border-radius: 5px;
        animation: madalsBox .8s;
        background: #fff;
    }
    
    @keyframes madalsBox {
        from {
            transform: translateY(-200px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes madalsBoxLeft {
        from {
            right: -400px;
        }
        to {
            right: 0;
        }
    }
    
    .ModalsLeft {
        position: absolute;
        right: 0;
        width: 420px;
        height: 100%;
        box-shadow: -2px 1px 4px 0 #dbdbdb;
        border-radius: 5px;
        animation: madalsBoxLeft .8s;
        background: #fff;
    }
    
    .modalsTop {
        width: 100%;
        height: 64px;
        background-color: #E7744A;
        text-align: center;
        line-height: 64px;
        color: #FFFFFF;
        font-size: 16px;
    }
    
    .modalsBot {
        width: 100%;
        height: 228px;
        background-color: #FFFFFF;
    }
    
    .anNiu {
        width: auto;
        height: auto;
        margin-top: 44px;
        text-align: center;
    }
    
    .modalsLeftTop {
        width: 420px;
        height: 64px;
        line-height: 64px;
        font-size: 22px;
        padding-left: 25px;
        border-bottom: 1px solid #dbdbdb;
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
        z-index: 1000;
    }
    
    .ModalsLeftMain {
        padding: 64px 25px 82px 25px;
        overflow-y: auto;
        height: 100%;
    }
    
    .modalLeftfoot {
        text-align: center;
        position: absolute;
        bottom: 0;
        width: 420px;
        background: #fff;
        height: 72px;
    }
    
    .modalLeftfoot input[type=button] {
        width: 96px;
        height: 36px;
        border-radius: 2px;
    }
    
    .wangEditor-menu-container .menu-group {
        padding: 0 4px!important;
    }
    
    .wangEditor-container {
        float: right!important;
        width: 88%!important;
        height: 240px!important;
        border: 1px solid #d9d9d9;
    }
    
    #editor {
        height: 72%!important;
    }
    
    .font_16 {
        font-size: 16px;
    }
</style>
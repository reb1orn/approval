<template>
    <div class='ModalsBox' v-show='ModalsBox'>
        <div class="Modals">
            <div class="modalsTop">
                删除
            </div>
            <div class="modalsBot">
                <div class="hint"></div>
                <div class="details">
                    <!-- <div class="detailsOne">1.若该员工属于多个部门，则只从部门删除；</div> -->
                    <div class="detailsTwo">是否要删除该权限组？</div>
                </div>
                <div class="anNiu">
                    <div class="ensure" @click='ensure'><a href="javascript:;">确定</a></div>
                    <div class="abolish" @click='abolish'><a href="javascript:;">取消</a></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                ModalsBox: true
            }
        },
        methods: {
            abolish() {
                this.$emit('abolish')
            },
            ensure() {
                this.$emit('ensure')
            },
        }
    }

</script>
<style scoped>
    .ModalsBox {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.1)
    }
    
    .Modals {
        position: absolute;
        left: 0;
        top: 0px;
        right: 0;
        bottom: 0;
        margin: auto auto;
        width: 340px;
        height: 180px;
        box-shadow: 0 5px 14px rgba(0, 0, 0, 0.15);
        border-radius: 5px;
        animation: madalsBox .8s;
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
    
    .hint {
        width: 100%;
        height: 44px;
        /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
        /* padding-left: 24px; */
        text-align: center;
        line-height: 44px;
        color: #303030;
        font-size: 16px;
    }
    
    .details {
        width: 100%;
        height: auto;
        margin-top: 14px;
    }
    
    .detailsOne {
        padding-left: 56px;
        color: #303030;
        font-size: 14px;
    }
    
    .detailsTwo {
        /* padding-left: 56px; */
        text-align: center;
        color: #303030;
        font-size: 14px
    }
    
    .anNiu {
        width: auto;
        height: auto;
        margin-top: 44px;
        text-align: center;
    }
    
    .ensure {
        display: inline-block;
        width: 80px;
        height: 34px;
        border-radius: 4px;
        background: #E7744A;
        color: #FFFFFF;
        font-size: 16px;
        text-align: center;
        line-height: 34px;
        margin-right: 23px;
    }
    
    .ensure a {
        width: 100%;
        height: 100%;
        display: inline-block;
        color: #FFFFFF;
        font-size: 16px;
        text-decoration: none;
    }
    
    .abolish {
        display: inline-block;
        width: 80px;
        height: 34px;
        border-radius: 4px;
        background: #AEAEAE;
        text-align: center;
        line-height: 34px;
        margin-left: 23px;
    }
    
    .abolish a {
        display: inline-block;
        width: 100%;
        height: 100%;
        color: #FFFFFF;
        font-size: 16px;
        text-decoration: none;
    }
    
    .abolish a:hover {
        text-decoration: none;
        color: #FFFFFF;
    }
    
    .ensure a:hover {
        text-decoration: none;
        color: #FFFFFF;
    }
</style>
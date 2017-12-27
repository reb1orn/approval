<template>
     <div>
        <button id='Component-textAuthenticationCodes'>{{time | change}}</button>
     </div>
</template>

<script>
let flag = false
    export default {
        data () {
            return {
                time : '获取验证码',
            }
        },
        props : {
            start : {
                type : Boolean
            }
        },
        watch : {
            start (value,oldvalue) {
                if(value == true){
                    this.countDown()
                }
            }
        },
        methods: {
            countDown () {
                this.time = 60;
                let time = setInterval(()=>{
                    this.time --
                    if(this.time == 0){
                        this.$emit('countDown')
                        this.time = '获取验证码'
                        flag = true
                        clearInterval(time)
                    }
                },1000)
            }
        },
        filters : {
            change (value) {
               if(!value) return ""
               if(!isNaN(value)){
                   if(flag == true){
                       return `重新发送${value}S`
                   }
                   return value+'S后重新发送'
               }else{
                   return value
               }
            }
        }

    }
</script>
<style type="text/css">
		#Component-textAuthenticationCodes{
			width: 100px;
			height: 36px;
		    background-color:#FFF;
		    border: none;
		    border-radius: 4px;
		    color: #E7744A;
		    font-size: 12px;
		}
</style>
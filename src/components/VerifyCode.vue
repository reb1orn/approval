<template>
  <el-input :maxlength="verifyCodeLength" :minlength="verifyCodeLength" class="placeholder-left" v-model="verify.code" placeholder="请输入验证码">
    <div class="verify-img" slot="append" @click.prevent="refresh">
      <div class="verify-code-item" v-for="item in verifyArray" :style="item.style">{{item.value}}</div>
    </div>
  </el-input>
</template>
<script>
  export default {
    name: 'VerifyCode',
    data() {
      return {
        verifyCodeLength: 4,
        verify: {
          code: ''
        },
        verifyArray: []
      }
    },
    methods: {
      /**
       * 获取随机数值
       */
      getValue() {
        return Math.random().toString(36).substr(7, 1)
      },
      /**
       * 获取验证码样式
       */
      getStyle() {
        let transformY = `translateY(${Math.floor((Math.random() - 0.5) * 10)}px)`
        let scale = `scale(${Math.random() + 0.8})`
        let rotate = `rotate(${Math.floor((Math.random() - 0.5) * 100)}deg)`
        let font = `${12 + Math.floor((Math.random() - 0.5) * 4)}px`
        return {
          transform: `${transformY} ${scale} ${rotate}`,
          fonSize: font
        }
      },
      /**
       * 刷新验证码
       */
      refresh() {
        var array = Array.from(Array(this.verifyCodeLength)).map(x =>
          ({
            value: this.getValue(),
            style: this.getStyle()
          })
        )
        this.verifyArray = array
      },
      /**
       * 验证码校验
       */
      validate(rule, value, callback) {
        // 验证用户验证码输入
        let result = this.verifyArray.map(x => x.value).join('').toLocaleLowerCase() === this.verify.code.toLocaleLowerCase()

        return result
      },
      /**
       * 获取验证码输入值
       */
      getVerifyValue() {
        return this.verify.code
      },
      reset() {
        this.verify.code = ''
        this.refresh()
      }
    },
    mounted() {
      this.refresh()
    }
  }

</script>
<style scoped>
  .verify-img {
    float: left;
    height: 34px;
    width: 80px;
    border: 0;
    background: #e4e4e4;
    color: #000;
    cursor: pointer;
    line-height: 40px;
    position: relative;
    margin: 0 -10px;
  }
  
  .verify-code-item {
    float: left;
    width: 20px;
    height: 34px;
    line-height: 34px;
    text-align: center;
  }

</style>

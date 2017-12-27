<template>
     <div class='definiBox'>
         <div class="defini">
            <div class="definiTop">
            	选择部门
            </div>
            <div class="definiBot">
                <el-transfer
                       filterable
                       :filter-method="filterMethod"
                       :titles="['选择部门', '已选部门']"	
                       filter-placeholder="请输入城市拼音"
                       v-model="value2"
                       :data="data2">
                </el-transfer>
                <div class="anNiu">
            		<div class="ensure"><a href="javascript:;">确定</a></div>
            		<div class="abolish" @click='abolishmems'><a href="javascript:;">取消</a></div>
            	</div>
            </div>
         </div>
     </div>
</template>
<script type="text/javascript">
export default {
    data() {
      const generateData2 = _ => {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都','太原'];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu','taiyuan'];
        cities.forEach((city, index) => {
          data.push({
              label: city,
              key: index,
              pinyin: pinyin[index]
            });
        });
            return data;
      };
        return {
             data2: generateData2(),
             value2: [],
        filterMethod(query, item) {
             return item.pinyin.indexOf(query) > -1;
        }
      };
    },
    methods:{
    	   abolishmems () {
			   this.$emit('abolishmems')
		},
    }
  };
</script>
<style scoped> 
    .el-transfer{
    	margin-left: 26px;
    }
    .el-transfer-panel{
    	width: 430px !important;
    	height: 388px;
        margin-top: 10px;
    }
    .el-transfer-panel__list.is-filterable{
    	height: 280px !important;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: #E7744A !important;
        border-color: #E7744A !important;
    }
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #E7744A !important;
        border-color: #E7744A !important;
    }
    .el-button--primary {
        background-color: #E7744A !important;
        border-color: #E7744A !important;
    }
    .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {  
        background-color: #eef1f6 !important;
        border-color: #d1dbe5 !important;
}
	.definiBox{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color:rgba(255,255,255,0.1)
	}
	.defini{
		position: absolute;
	    left: 0;
	    top: -100px;
	    right: 0;
	    bottom: 0;
	    margin: auto auto;
		width: 960px;
		height: 560px;
		box-shadow: 0 5px 3px #CCCCCC;
		animation: madalsBox .8s ;
	}
	@keyframes madalsBox{
		from{
			transform: translateY(-200px);
			opacity: 0;
		}
		to{
			transform: translateY(0);
			opacity: 1;
		}
	}
	.definiTop{
		width: 100%;
		height: 64px;
		background-color:#F4F4F6;
		text-align: center;
		line-height: 64px;
		color: #303030;
		font-size: 16px;
	}
	.definiBot{
		width: 100%;
		height: 496px;
		background-color: #CCCCCC;
	}
</style>
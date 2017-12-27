<template>
    <div class='ModalsmemBox'>
        <div class="Modalsmem">
            <div class="ModalsmemTop">
                选择人员
            </div>
            <div class="ModalsmemBot">
                <el-transfer
                       filterable
                       :filter-method="filterMethod"
                       :titles="['选择人员', '已选人员']"	
                       filter-placeholder="请输入城市拼音"
                       v-model="value2"
                       :data="data2">
                </el-transfer>
                <!-- <div class="Modalsmain">
                    <div>
                        <ul>
                            <li @click="select(index)" v-for="(item,index) in items" :class="{'red': item.selected}">{{item.text}}</li>
                        </ul>
                    </div>
                    <div style="margin-left: 5px;">
                        <ul>
                            <li @click="remove(index)" v-for="(item,index) in itemSelects">{{item.text}}</li>
                        </ul>
                    </div>
                </div> -->
                <div class="anNiu">
                    <div class="ensure"><a href="javascript:;">确定</a></div>
                    <div class="abolish" @click='abolishmem'><a href="javascript:;">取消</a></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import { mapActions } from "vuex";
    export default {
        data() {
              const generateData2 = _ => {
        const data = [];
        const cities = [{
                id:"856fd2341ca54a8589ce4cd5c23a54da",
                name:"一杯二锅头",
                parentId:"f865a2b2fbc5495aa1354163ee8376d3",
                type:1
                },
                {"id":"bebd2e780d3d43aab65b3534a3e6695e",
                "name":"开心二部",
                "parentId":"f865a2b2fbc5495aa1354163ee8376d3",
                "type":1
                },
                {"id":"f48c624236904cd5ae0bf27812a6e8f7",
                "name":"开心一部",
                "parentId":"f865a2b2fbc5495aa1354163ee8376d3",
                "type":1
                }
                ];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu','taiyuan'];
        cities.forEach((city, id) => {
          data.push({
              label: city,
              key: id,
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
        created: function () {
    
        },
        methods: {
        
            abolishmem() {
                    console.log(this.value2)
                this.$emit("abolishmem");
            },
            select(index) {
                this.items[index].selected = true;
                this.itemSelects.push(this.items[index]);
            },
            remove(index) {
                console.log(index);
                this.items[index].selected = false;
                this.itemSelects.splice(index, 1);
            },
    ...mapActions(["getdeptgetchild"])
        }
    };

</script>
<style>
    .red {
        color: red;
    }
    
    .Modalsmain {
        overflow: hidden;
        height: 400px;
        width: 84%;
        margin: auto;
        padding-top: 15px;
    }
    
    .Modalsmain > div {
        float: left;
        width: 400px;
        height: 400px;
        background: #fff;
    }
    
    .el-transfer {
        margin-left: 26px;
    }
    
    .el-transfer-panel {
        width: 430px !important;
        height: 388px;
        margin-top: 10px;
    }
    
    .el-transfer-panel__list.is-filterable {
        height: 280px !important;
    }
    
    .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: #e7744a !important;
        border-color: #e7744a !important;
    }
    
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #e7744a !important;
        border-color: #e7744a !important;
    }
    
    .el-button--primary {
        background-color: #e7744a !important;
        border-color: #e7744a !important;
    }
    
    .el-button.is-disabled,
    .el-button.is-disabled:focus,
    .el-button.is-disabled:hover {
        background-color: #eef1f6 !important;
        border-color: #d1dbe5 !important;
    }
    
    .ModalsmemBox {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.1);
        z-index: 9999;
    }
    
    .Modalsmem {
        position: absolute;
        left: 0;
        top: 0px;
        right: 0;
        bottom: 0;
        margin: auto auto;
        width: 960px;
        height: 560px;
        box-shadow: 0 5px 14px rgba(0, 0, 0, 0.15);
        animation: madalsBox 0.8s;
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
    
    .ModalsmemTop {
        width: 100%;
        height: 64px;
        background-color: #f4f4f6;
        text-align: center;
        line-height: 64px;
        color: #303030;
        font-size: 16px;
    }
    
    .ModalsmemBot {
        width: 100%;
        height: 496px;
        background-color: #cccccc;
    }
    
    .el-checkbox__input.is-checked .el-checkbox__inner::after {
        margin-left: 0px !important;
    }
</style>
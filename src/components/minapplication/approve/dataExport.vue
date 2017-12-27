<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="addAttendance">
            <span id="add" @click="addcheck">
                数据导出
            </span>
            <div id="long">

            </div>
            <span id="record" @click="DataExportRecord">
                数据导出记录
            </span>
        </div>
        <div class="dataExBot">
            <div class="bot1">
                审批类型：
                <el-select v-model="value" placeholder="请假">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="bot2">
                审批类型：
                <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="bot3">
                标题：<input type="text" class="headline" placeholder="请输入标题" />
            </div>
            <div class="bot4">
                发起时间：
                <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                </el-date-picker>
                <div class="xian"></div>
                <el-date-picker v-model="value2" type="date" placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="bot5">
                完成时间：
                <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                </el-date-picker>
                <div class="xian"></div>
                <el-date-picker v-model="value2" type="date" placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="inquire">
                <div class="dc">导出</div>
                <div class="cx">查询</div>
            </div>
            <div class="dataTable">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="审批标题" width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="发起时间" width="120">
                    </el-table-column>
                    <el-table-column prop="address" label="完成时间" width="120">
                    </el-table-column>
                    <el-table-column prop="address" label="审批人" width="120">
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template :scope="scope">
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="removeBox ModalsBox" v-show="removeBox">
            <div class="Modals">
                <div class="modalsTop">
                    确认删除？
                </div>
                <div class="modalsBot">

                    <div class="details">
                        <div class="detailsOne">张静的病假审批单将被删除，删除后不可恢复！</div>

                    </div>
                    <div class="anNiu">
                        <div class="ensure">
                            <a href="javascript:;">删除</a>
                        </div>
                        <div class="abolish" @click='abolish'>
                            <a href="javascript:;">取消</a>
                        </div>
                    </div>
                </div>
            </div>

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
            value: "",
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value1: "",
            value2: "",
            removeBox: false,
            tableData: [{
                date: '张静',
                name: '2012-06-07',
                address: '2012-06-09'
            }, {
                date: '张静',
                name: '2012-06-07',
                address: '2012-06-09'
            }, {
                date: '张静',
                name: '2012-06-07',
                address: '2012-06-09'
            }, {
                date: '张静',
                name: '2012-06-07',
                address: '2012-06-09'
            }]
        }
    },

    created: function() {

    },
    watch: {

    },
    methods: {
        addcheck: function() {
            this.$router.push({
                path: "/home/approve/dataExport"
            })
        },
        DataExportRecord() {
            this.$router.push({
                path: "/home/approve/dataExportRecord"
            })
        },
        abolish() {
            this.removeBox = false
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            this.removeBox = true
        }
    }
}

</script>
<style scoped>
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-left: 24px;
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
    padding-left: 56px;
    padding-top: 8px;
    color: #303030;
    font-size: 14px;
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

#record {
    cursor: pointer;
}

.cx,
.dc {
    margin-right: 8px;
    margin-top: 20px;
    display: inline-block;
    float: right;
    width: 100px;
    height: 30px;
    border: 1px solid #E7744A;
    border-radius: 4px;
    text-align: center;
    line-height: 30px;
    color: #E7744A;
    font-size: 14px;
    cursor: pointer;
}

.cx {
    margin-right: 25px;
}

.xian {
    display: inline-block;
    width: 40px;
    height: 1px;
    background-color: #E7744A;
}

.bot1 {
    display: inline-block;
    margin-left: 22px;
    margin-top: 10px;
}

.bot2 {
    display: inline-block;
    margin-left: 15px;
}

.bot3 {
    display: inline-block;
    margin-left: 60px;
}

.bot4 {
    display: inline-block;
    margin-left: 20px;
    margin-top: 26px;
}

.bot5 {
    display: inline-block;
    margin-left: 48px;
    margin-top: 26px;
}

.headline {
    width: 220px;
    height: 34px;
    border: 1px solid #E7744A;
    padding-left: 12px;
}

.el-input {
    width: 100px;
}

.addAttendance {
    height: auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    margin-left: 16px;
    margin-right: 16px;
    padding-top: 20px;
    padding-bottom: 12px;
    color: #303030;
    font-size: 14px;
}

#add {
    color: #E7744A;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
}

#long {
    display: inline-block;
    width: 1px;
    height: 14px;
    padding-top: 10px;
    margin-left: -10px;
    background-color: #AEAEAE;
}

.dataExBot {
    width: 90%;
    height: auto;
}

.dataTable {
    text-align: center;
    width: 100%;
    height: auto;
    margin-left: 20px;
    margin-top: 70px;
}
</style>
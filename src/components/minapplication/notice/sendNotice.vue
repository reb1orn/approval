<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="main_rightTop">
            <p>发送公告</p>
        </div>
        <div class="main_rightMain">
            <div class="firmname">
                <span>发送范围<span style="color: #E7744A;">*</span>：</span>
                <input onkeyup="this.value=this.value.replace(/\s+/g,'')" v-model="sendRange" class="inputText" type="text" placeholder="选择部门、人员" @focus="focusInput_1" @blur="blurInput_1"
                    :class="{redBorder:isredBorder_1,focusBorder:isfocusBorder_1}">
            </div>
            <p v-show="warning_1" class="warnStyle">请选择接受人员</p>
            <div class="firmname">
                <span style="margin-left: 28px;">标题<span style="color: #E7744A;">*</span>：</span>
                <input onkeyup="this.value=this.value.replace(/\s+/g,'')" maxlength="35" v-model="noticeTitle" class="inputText" type="text" placeholder="最多35个汉字" @focus="focusInput_2" @blur="blurInput_2"
                    :class="{redBorder:isredBorder_2,focusBorder:isfocusBorder_2}">
            </div>
            <p v-show="warning_2" class="warnStyle">请输入标题(不能含特殊字符)</p>
            <div class="firmname">
                <span style="margin-left: 33px;">作者：</span>
                <input onkeyup="this.value=this.value.replace(/\s+/g,'')" maxlength="10" v-model="author" class="inputText" type="text" placeholder="不填则默认为公司名称" @focus="focusInput_3" @blur="blurInput_3"
                    :class="{redBorder:isredBorder_3,focusBorder:isfocusBorder_3}">
            </div>
            <p v-show="warning_4" class="warnStyle">不能输入特殊字符</p>
            <div class="firmname">
                <span style="margin-left: 28px;">正文<span style="color: #E7744A;">*</span>：</span>
                <div id="editor" tabindex="-1" @focus="focusInput_4" @blur="blurInput_4" v-html="inputContent" @input="outputContent" style="height: 500px;">

                </div>
            </div>
            <div class="clear"></div>
            <div class="firmlogo">
                <span style="margin-left: 5px;">封面图片：</span><img :src="defaultImg_1" alt="" width="80" height="80">
                <input id="logofile" type="file" style="display: none;" accept="image/jpeg,image/jpg,image/png,image/bmp,image/gif" @change="onFileChange">
                <span class="egRatio">图片尺寸为750*300像素,文件类型.jpg,.jpeg,.bmp,.gif,.png,大小不超过5M</span><br>
                <input type="button" value="上传" @click="upload">
            </div>
            <p v-show="warning_3" class="warnStyle">请上传正确的图片格式</p>
            <div class="firmfujian">
                <span style="margin-left: 33px;">附件：</span>
                <input id="logofiles" type="file" style="display: none;" accept="application/msword,application/pdf,application/vnd.ms-excel,aplication/zip,application/vnd.ms-powerpoint"
                    @change="onFileChanges">
                    <span style="color: #8F8E94;margin-left: 6px;">支持.doc,.pdf,.xls,.ppt,.zip类型文件，20M以内</span>
                    <input class="fjupload" type="button" value="上传" @click="uploads">
                    <p v-show="warning_5" class="warnStyle">请上传正确的文件格式</p>
                    <ul>
                        <li v-for="(item,index) in items">
                            <div><span>{{item.name}}</span><span class="closeimg" @click="delitem(index)"></span></div>
                        </li>
                    </ul>
                    <div class="checkBox" style="margin-top: 24px;">
                        <el-checkbox v-model="secrecy">设为保密公告</el-checkbox>
                        <p class="grayfont">接收人只能查看，消息不可转发；公告详情页有接收人本人昵称水印</p>
                    </div>
                    <div class="checkBox">
                        <el-checkbox v-model="dang">DANG一下</el-checkbox>
                        <p class="grayfont">通过DANG消息提醒接收人</p>
                    </div>
                    <div class="checkBox">
                        <el-checkbox v-model="stick">置顶工作首页</el-checkbox>
                        <p class="grayfont">发送范围为所有员工时，才可在工作首页置顶</p>
                    </div>
            </div>
            <div class="clear"></div>
            <div style="margin: 32px 0;text-align: center;">
                <input type="button" value="发送" class="baocun" @click="send">
                <input type="button" value="预览" class="quxiao" style="margin-left: 46px;" @click="preview">
            </div>
        </div>
        <!--公告预览弹出框-->
        <div class="ModalsBox" v-show="ispreview">
            <div class="Modals">
                <div class="modaltitle">公告预览</div>
                <div class="modalcontent">
                    <h3>123123</h3>
                    <p style="margin-top: 10px;margin-bottom: 24px;color:#8F8E94"><span>必康集团西安分部</span><span style="margin-left: 16px;">2017-06-02</span></p>
                    <div class="imgbox"><img src="/static/img/1.jpg" alt=""></div>
                    <p style="margin-top:24px;border-bottom:1px solid #d9d9d9;padding-bottom: 24px;">Type somethingType somethingType somethingType somethingType somethingType something Type somethingType
                        somethingType somethingType somethingType somethingType somethingType Type somethingType somethingType
                        somethingType something somethingType somethingType something
                    </p>
                    <p style="height: 36px;line-height: 36px;color: #8f8e94;">附件：</p>
                    <ul>
                        <li v-for="(item,index) in items">
                            <div><span>{{item.name}}</span></div>
                        </li>
                    </ul>

                </div>
                <div class="modalfooter">
                    <input type="button" value="关闭" @click="cancle">
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import WangEditor from 'wangeditor'
    import {
        mapActions
    } from 'vuex';
    export default {
        props: ['inputContent', 'uploadUrl'],
        name: '',
        data() {
            return {
                ispreview:false,
                islogoImg: '',
                flag: '',
                defaultImg_1: '/static/img/123.png',
                warning_1: false,
                warning_2: false,
                warning_3: false,
                warning_4: false,
                warning_5: false,
                noticeTitle: '',
                author: "",
                // content: 'vcbvcvbc',
                secrecy: '',
                dang: '',
                stick: '',
                isfocusBorder_1: false,
                isfocusBorder_2: false,
                isfocusBorder_3: false,
                isfocusBorder_4: false,
                isredBorder_1: false,
                isredBorder_2: false,
                isredBorder_3: false,
                isredBorder_4: false,
                sendRange: '',
                items: [
                    { name: 'pdd.ppt' },
                    { name: 'pdd.xls' },
                    { name: 'pdd.zip' },
                ]


            }

        },

        created: function () {
        },
        mounted() {
            this.createEditor()
        },
        watch: {

        },
        methods: {
            focusInput_1: function () {
                this.isfocusBorder_1 = true
            },
            blurInput_1: function () {
                this.isfocusBorder_1 = false
            },
            focusInput_2: function () {
                this.isfocusBorder_2 = true
            },
            blurInput_2: function () {
                this.isfocusBorder_2 = false
            },
            focusInput_3: function () {
                this.isfocusBorder_3 = true
            },
            blurInput_3: function () {
                this.isfocusBorder_3 = false
            },
            focusInput_4: function () {
                $('.wangEditor-container').css('border', '1px solid #fcb298')
            },
            blurInput_4: function () {
                $('.wangEditor-container').css('border', '1px solid #d9d9d9')
            },
            delitem(index) {
                this.items.splice(index, 1)
            },
            preview(){
                this.ispreview = true
            },
            cancle(){
                this.ispreview = false
            },
            panduan() {
                if (this.sendRange == null || this.sendRange == '') {
                    this.isredBorder_1 = this.warning_1 = true
                } else {
                    this.isredBorder_1 = this.warning_1 = false
                }
                if (this.noticeTitle == null || this.noticeTitle == '') {
                    this.isredBorder_2 = this.warning_2 = true
                } else {
                    this.isredBorder_2 = this.warning_2 = false
                }
                var reg = /[^\s]/; //第一位为非空格
                if ($('#editor').text() == null || $('#editor').text() == '' || !reg.test($('#editor').text())) {
                    $('.wangEditor-container').css('border', '1px solid #FF5F57')
                    this.flag = true
                } else {
                    $('.wangEditor-container').css('border', '1px solid #d9d9d9')
                    this.flag = false
                }
                
                if (this.defaultImg_1 == '/static/img/123.png') {
                    this.warning_3 = true
                } else {
                    this.warning_3 = false
                }

                if (this.isredBorder_1 == true || this.isredBorder_2 == true || 　this.warning_3 == true || this.flag == true) {
                    return false
                } else {
                    //     // 只能输入中文或英文
                    //     var leter = /^[a-zA-Z\u4e00-\u9fa5]+$/ 
                    // 不能输入特殊字符
                    var regs = new RegExp("[.\u3000-\u303F\uFF00-\uFFEF\u3400-\u4DBF`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]+");
                    if (regs.test(this.noticeTitle)) {
                        this.isredBorder_2 = true
                        this.warning_2 = true
                    } else {
                        this.isredBorder_2 = false
                        this.warning_2 = false
                    }
                    if (regs.test(this.author)) {
                        this.isredBorder_3 = true
                        this.warning_4 = true
                    } else {
                        this.isredBorder_3 = false
                        this.warning_4 = false
                    }

                    if (this.isredBorder_2 == true || 　this.warning_3 == true) {
                        return false
                    }
                }

            },
            send() {
                if (this.panduan() == false) {
                    return
                } else {

                }
            },
            upload: function () {
                $("#logofile").click();
            },
            uploads: function () {
                $("#logofiles").click();
            },
            // 选择图片上传
            onFileChange(e) {
                var self = this
                self.islogoImg = true
                var files = e.target.files || e.dataTransfer.files;
                var fileData = files[0]
                console.log(fileData)
                // 读取图片数据
                var reader = new FileReader()
                reader.onload = function (e) {
                    var data = e.target.result;
                    // 加载图片的真实宽度和高度
                    var image = new Image()
                    image.onload = function () {
                        console.log(image.width)
                        if (image.width !== 750 || image.height !== 300) {
                            self.warning_3 = true
                            return
                        } else if (fileData.size > 5242880) {
                            self.warning_3 = true
                            return
                        } else {
                            self.warning_3 = false
                            self.uploadImage(files[0])
                        }
                    };
                    image.src = data;
                }
                reader.readAsDataURL(fileData)
            },
            onFileChanges(e) {
                var self = this
                var files = e.target.files || e.dataTransfer.files;
                var fileData = files[0]
                console.log(fileData)
                if (fileData.size < 20971520) {
                    self.warning_5 = true
                    return
                } else {
                    self.warning_5 = false
                    self.uploadImage(files[0])
                }
            },
            // 上传图片
            uploadImage(file) {
                // var formdata = new FormData();
                // formdata.append('file',file);
                // formdata.append('appName','appName')
                // this.uploadFile(formdata).then((data)=>{
                //     console.log(data)
                //     if(data.code == 200){
                //         this.$message({
                //             message:'上传图片成功',
                //             type:'success'
                //         });
                //         if(this.islogoImg == true){
                //             this.defaultImg_1 = data.data[0].path
                //         }else{
                //             this.items.push({name:data.data[0].path})
                //         }
                //     }
                // })
            },
            createEditor() {
                const self = this
                const editor = new WangEditor('editor')
                editor.config.menus = ['source', '|', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright',
                    '|', 'link', 'unlink', 'table', 'img', 'video', 'insertcode', '|', 'undo', 'redo', 'fullscreen'
                ]
                editor.config.uploadImgUrl = this.uploadUrl
                // 上传图片（举例）
                // editor.config.uploadImgUrl = '/upload';
                // 配置自定义参数（举例）
                // editor.config.uploadParams = {
                //     token: 'abcdefg',
                //     user: 'wangfupeng1988'
                // };
                editor.onchange = function () {
                    self.formatContent(this.$txt.html())
                }
                editor.create()
            },
            formatContent(content) {
                // handle
                // ...
                this.content = content
                this.outputContent()
            },
            outputContent() {
                this.$emit('input', this.content)
            },

        }
    }

</script>
<style scoped>
    /*公告预览弹出框*/
    
    h3 {
        margin: 0;
        font-size: 14px;
    }
    
    .Modals {
        background: #fff;
        box-shadow: 0 5px 14px #cccccc;
        width: 640px;
        height: 744px;
    }
    
    .modaltitle {
        height: 64px;
        line-height: 64px;
        text-align: center;
        font-size: 16px;
        box-shadow: 0 2px 5px #ccc;
    }
    
    .modalcontent {
        padding: 20px 30px 0 30px;height: 582px;overflow-y: auto;
    }
    
    .imgbox {
        width: 100%;
        height: 280px;
    }
    
    .imgbox img {
        width: 100%;
        height: 100%;
    }
    .modalcontent ul li {
        width: 100%;
        border: 1px solid #d9d9d9;
        height: 36px;
        line-height: 36px;
        margin-top: 6px;
        padding-left: 12px;
    }
    .modalfooter{
        text-align: center;margin:32px;
    }
    .modalfooter input{
        width: 80px;height: 34px;line-height: 34px;background: #aeaeae;font-size: 16px;color: #fff;
        
    }
    /*--------------*/
    
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
    
    .inputText {
        border: 1px solid #d9d9d9;
        width: 240px;
        margin-left: 5px;
    }
    
    .firmname {
        line-height: 36px;
        height: 36px;
        margin-top: 24px;
    }
    
    .firmlogo {
        margin-top: 24px;
    }
    
    .warnStyle {
        color: #FF5F57;
        font-size: 12px;
        margin-left: 85px;
        margin-top: 6px;
    }
    
    .redBorder {
        border: 1px solid #FF5F57;
    }
    
    .focusBorder {
        border: 1px solid #fcb298;
    }
    
    .firmlogo {
        position: relative;
        margin-top: 24px;
    }
    
    .firmlogo input {
        width: 80px;
        height: 30px;
        line-height: 30px;
        background: #E7744A;
        font-size: 14px;
        color: #fff;
        position: absolute;
        left: 183px;
        top: 50px;
    }
    
    .fjupload {
        width: 80px;
        height: 30px;
        line-height: 30px;
        background: #E7744A;
        font-size: 14px;
        color: #fff;
        margin-left: 10px;
    }
    
    .egRatio {
        position: absolute;
        top: 3px;
        left: 183px;
        color: #8F8E94;
        width: 52%;
    }
    
    .firmlogo img {
        margin-left: 11px;
    }
    
    .closeimg {
        cursor: pointer;
        float: right;
        width: 20px;
        height: 20px;
        background: url('/static/img/Slice.png') no-repeat -29px -153px;
        margin-top: 7px;
        margin-right: 12px;
    }
    
    .firmfujian {
        margin-top: 24px;
    }
    
    .firmfujian ul {
        margin-left: 85px;
    }
    
    .firmfujian ul li{
        width: 292px;
        border: 1px solid #d9d9d9;
        height: 36px;
        line-height: 36px;
        margin-top: 6px;
        padding-left: 12px;
    }
    
    .checkBox {
        margin-left: 85px;
        margin-top: 10px;
    }
    
    .checkBox p {
        margin-top: 5px;
        margin-left: 22px;
    }
    
    .grayfont {
        font-size: 12px;
        color: #8F8E94;
    }
    
    .baocun {
        width: 80px;
        height: 35px;
        color: #fff;
        font-size: 16px;
        background: #E7744A;
        line-height: 35px;
    }
    
    .quxiao {
        width: 80px;
        height: 35px;
        color: #fff;
        font-size: 16px;
        background: #aeaeae;
        line-height: 35px;
    }
</style>
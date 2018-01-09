<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="main_rightTop">
            <p>主题：{{contentTitle}}</p>
        </div>
        <div class="main_rightMain">
 
            <div class="firmlogo">
                <span style="margin-left: 5px;">添加图片：</span><img :src="defaultImg_1" alt="" width="80" height="80">
                <input id="logofile" type="file" style="display: none;" accept="image/jpeg,image/jpg,image/png,image/bmp,image/gif" @change="onFileChange">
                <span class="egRatio">图片尺寸为750*300像素,文件类型.jpg,.jpeg,.bmp,.gif,.png,大小不超过5M</span><br>
                <input type="button" value="上传" @click="upload">
            </div>
            <p v-show="warning_3" class="warnStyle">请上传正确的图片格式</p>

            <div class="clear"></div>
            <div class="firmname">
                <span style="margin-left: 28px;">正文<span style="color: #E7744A;">*</span>：</span>
                <div id="editor" tabindex="-1" @focus="focusInput_4" @blur="blurInput_4" v-html="inputContent" @input="outputContent" style="height: 500px;">

                </div>
            </div>
            <div class="clear"></div>

            <div style="margin: 32px 0;text-align: center;">
                <input type="button" value="保存" class="baocun" @click="send">
                <input type="button" value="取消" class="quxiao" style="margin-left: 46px;" @click="preview">
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
                contentTitle:'',
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
                ],
                contentDetail:'',
                detail:''
            }
        },
        created: function () {
            this.contentTitle = sessionStorage.getItem('Title')
            this.detail = JSON.parse(sessionStorage.getItem('detail'))
            this.defaultImg_1 = this.detail.contentImg
            this.inputContent = this.detail.contentDetail 
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
                this.$router.push({
                    path:'/home/message/consulting'
                })
            },
            cancle(){
                this.ispreview = false
            },
            panduan() {
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
                if (　this.warning_3 == true || this.flag == true) {
                    return false
                } else {
                    if ( 　this.warning_3 == true) {
                        return false
                    }
                }

            },
            send() {
                    let self = this
                    if (this.panduan() == false) {
                    return
                } else {
                    self.getcontentedit({
                        oid:sessionStorage.getItem('orgId'),
                        uid:sessionStorage.getItem('userId'),
                        contentId:sessionStorage.getItem('contentId'),
                        contentTitle:sessionStorage.getItem('Title'),
                        contentImg:self.defaultImg_1,
                        contentEnclosure:"",
                        enclosureInfo:"",
                        contentDetail:self.contentDetail || self.inputContent,
                        columnId:sessionStorage.getItem('columnId')
                    }).then((data)=>{
                       if(data.code == '000000'){
                             this.$message({
                                 type:'success',
                                 message:'保存成功！'
                             })
                             this.$router.push({
                                 path:'/home/message/consulting'
                             })
                       }else{
                           this.$message({
                               type:'info',
                               message:data.msg
                           })
                       }
                    }).catch(msg=>{
                        this.$message({
                            type:'info',
                            message:msg.statusText
                        })
                    })
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
                var formdata = new FormData();
                formdata.append('file',file);
                formdata.append('appName','appName')
                this.uploadFile(formdata).then((data)=>{
                    console.log(data)
                    if(data.code == 200){
                        this.$message({
                            message:'上传图片成功',
                            type:'success'
                        });
                        this.defaultImg_1 = data.data[0].reqUrl
                    }
                }).catch(msg=>{
                    this.$message({
                        type:'info',
                        message:msg.error
                    })
                })
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
                    self.contentDetail = this.$txt.html()
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
        ...mapActions(['uploadFile','getcontentedit'])
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
        margin-top: 40px
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
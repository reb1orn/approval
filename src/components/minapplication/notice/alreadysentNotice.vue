<!--<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" style="height: 100%;">
        <div class="main_rightTop">
            <p>已发公告</p>
        </div>
        <div class="main_rightMain">
            <div class="noticNav">
                <span>标题</span><span>状态</span>
            </div>
            <ul>
                <li v-for="(item,index) in items">
                    <p>{{item.title}}</p>
                    <div style="overflow: hidden;margin-left: 24px;">
                        <div class="biaoti">
                            <span class="grayfont">{{item.time}}</span>
                            <span style="margin-left: 18px;" class="grayfont">{{item.name}}</span>
                            <span class="borderStyle" style="margin-left: 64px;" @click="stick(index)">置顶</span>
                            <span class="borderStyle" style="margin-left: 8px;">保密</span>
                        </div>
                        <div v-show='true' class="unread grayfont"><span>1人已读</span><span style="margin-left: 8px;">8人未读</span></div>
                        <div v-show="false"  class="unread grayfont"><span>全部人已读</span></div>
                    </div>

                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex';
    export default {
        name: '',
        data() {
            return {
                items:[{
                    name:'张静',
                    title:'123',
                    time:'2017-05-26 09:00'
                },
                {
                    name:'李四',
                    title:'关于端午节放假的通知',
                    time:'2017-05-26 09:00'
                },
                {
                    name:'老王',
                    title:'456',
                    time:'2017-05-26 09:00'
                }]

            }

        },

        created: function () {
        },
        watch: {

        },
        methods: {
            stick(index){
                var a = this.items[index]
                this.items.splice(index,1)
                this.items.unshift(a)
            }

        }
    }

</script>
<style scoped>
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
    
    .noticNav {
        width: 100%;
        height: 48px;
        line-height: 48px;
        background: #f4f4f6;
        margin-top: 20px;
    }
    
    .noticNav span:nth-child(1) {
        float: left;
        margin-left: 24px;
    }
    
    .noticNav span:nth-child(2) {
        float: right;
        margin-right: 134px;
    }
    ul li{
        height: 56px;border-bottom: 1px solid #d9d9d9;
    }
    ul li>p{
        height: 28px;line-height: 28px;margin-left: 24px;cursor: pointer;
    }
    .biaoti{
        float: left;
    }
    .unread{
        float: left;margin-left: 189px;
    }
    .grayfont{
        color: #8f8e94;
    }
    .borderStyle{
        cursor: pointer;
        font-size: 12px;
        color: #fcb298;
        width: 48px;display: inline-block;border: 1px solid #fcb298;height: 20px;line-height:20px;border-radius: 17px;text-align: center;
    }
</style>-->

<!--父组件中引入items-->
  <!--<items  :model='model' v-for='model in data'></items>-->


<style>
body {font-family: Helvetica, sans-serif;}
.iconClassRoot {
   width:15px;
   height:15px;
   display: inline-block;
   background: url("/static/images/ztree/root.png") no-repeat center/100% auto;
}
.iconClassNode {
   width:15px;
   height:15px;
   display: inline-block;
   background: url("/static/images/ztree/node.png") no-repeat center/100% auto;
}
.operate ul>li{
  float:left;
  margin:10px 10px;
  list-style-type: none;
}
</style>
<template>
  <div style='display:flex;flex:3'>
      <div style='flex:1' >
        <h1>Hello Ztree(非异步)</h1>
        <div class='operate'>
           <ul>
             <li><a href="javascript:void(0)" @click='up'>节点上移</a></li>
             <li><a href="javascript:void(0)" @click='down'>节点下移</a></li>
             <li><a href="javascript:void(0)" @click='delNode'>删除节点</a></li>
             <li><a href="javascript:void(0)" @click='addNode'>新增节点</a></li>
           </ul>
        </div>
        <div style='width:280px;' v-if='ztreeDataSource.length>0'>
           <vue-ztree :status="isStatus" :list.sync='ztreeDataSource' :func='nodeClick' :contextmenu='contextmenuClick' :is-open='true'></vue-ztree>
        </div>
      </div>

      <ol class="breadcrumb">
        <li><a href="#">Home</a></li>
        <li v-for="(item,index) in dataList" @click="aa(index)">
            <span>{{item.name}}</span>
        </li>
    </ol>
  </div>
</template>

<script>
import vueZtree from '../../subgroup/vue-ztree.vue'
export default {
  data () {
    return {
      msg: 'Hello Vue-Ztree-2.0!',
      ztreeDataSource:[],
      show:true,
      parentNodeModel:[],//当前点击节点父亲对象
      nodeModel:null, // 当前点击节点对象
      dataList:[],
      isStatus:'1'
    }
  },
  methods:{
    // 新增节点
    addNode:function(){
        if(this.nodeModel) {
          this.nodeModel.children.push({
              id:+new Date(),
              name:"动态新增节点哦～",
              path:"",
              clickNode:false,
              isFolder:false,
              isExpand:false,
              loadNode:0,
              children:[]
          });
          this.nodeModel.isFolder = true;
        }else {
          console.log("请先选中节点");
        }
    },
    // 删除节点
    delNode:function(){
        if(this.nodeModel) {
           if(this.parentNodeModel.hasOwnProperty("children")) {
              this.parentNodeModel.children.splice(this.parentNodeModel.children.indexOf(this.nodeModel),1);
           }else if(this.parentNodeModel instanceof Array){
              // 第一级根节点处理
              this.parentNodeModel.splice(this.parentNodeModel.indexOf(this.nodeModel),1);
           }
           this.nodeModel = null;
        }else {
           console.log("请先选中节点");
        }
    },
    // 节点上移
    up:function(){
       if(!this.nodeModel) console.log("请先选中节点");

       if(this.parentNodeModel.hasOwnProperty("children")) {
          var index = this.parentNodeModel.children.indexOf(this.nodeModel);
          if(index-1>=0) {
            var model = this.parentNodeModel.children.splice(this.parentNodeModel.children.indexOf(this.nodeModel),1);
            this.parentNodeModel.children.splice(index-1,0,model[0]);
          }
       }else if(this.parentNodeModel instanceof Array){
          // 第一级根节点处理
          var index = this.parentNodeModel.indexOf(this.nodeModel);
          if(index-1>=0) {
            var model = this.parentNodeModel.splice(this.parentNodeModel.indexOf(this.nodeModel),1);
            this.parentNodeModel.splice(index-1,0,model[0]);
          }
       }
    },
    // 节点下移
    down:function(){
       if(!this.nodeModel) console.log("请先选中节点");

       if(this.parentNodeModel.hasOwnProperty("children")) {
          var index = this.parentNodeModel.children.indexOf(this.nodeModel);
          if(index+1<=this.parentNodeModel.children.length) {
            var model = this.parentNodeModel.children.splice(this.parentNodeModel.children.indexOf(this.nodeModel),1);
            this.parentNodeModel.children.splice(index+1,0,model[0]);
          }
       }else if(this.parentNodeModel instanceof Array){
          // 第一级根节点处理
          var index = this.parentNodeModel.indexOf(this.nodeModel);
          if(index+1<=this.parentNodeModel.length) {
            var model = this.parentNodeModel.splice(this.parentNodeModel.indexOf(this.nodeModel),1);
            this.parentNodeModel.splice(index+1,0,model[0]);
          }
       }
    },
      aa(index,item){
        // 递归
        var recurFunc = (data,list) => {
            data.forEach((i)=>{
                if(i.id==item.id){
                  i.clickNode = true;
                }else {
                  i.clickNode = false;
                }

                if(i.children){
                   recurFunc(i.children,i);
                }
            });
        }

        recurFunc(this.treeDeepCopy, this.treeDeepCopy);
        
        
        // 导航
        var self = this;
        for(var i=0;i<self.dataList.length;i++){
            if(index == i){
                self.dataList[i].clickNode = true
            }else{
                self.dataList[i].clickNode = false
            }
        }
        self.dataList.splice(index+1,self.dataList.length - (index+1))

      

       var tree = Object.assign([], this.treeDeepCopy);
       
    //    console.log(tree,'tree')
       // this.ztreeDataSource =[]
       this.ztreeDataSource = tree
    },


    findById(data,parentId) {
        var vm =this;
        for(var i = 0;i<data.length;i++){
            if (parentId == data[i].id){
                console.log(data[i])
                vm.dataList.push(data[i]);
                vm.findById(vm.ztreeDataSource, data[i].parentId)
                return data[i]
//                break;
            }
            if (data[i].hasOwnProperty('children')){
                vm.findById(data[i].children,parentId)
            }

        }

    },

    // 点击节点
    nodeClick:function(m, parent){
       this.show = !this.show;
       this.nodeModel = m;  // 当前点击节点对象
    //    this.parentNodeModel = parent; //当前点击节点父亲对象

    //    console.log(m);
    //    console.log(parent)
        console.log(JSON.parse(JSON.stringify(m)));
        // this.clickData = m
        this.dataList=[]
        this.findById(this.ztreeDataSource,m.parentId)
        this.dataList= this.dataList.reverse();
        this.dataList.push(m)
        console.log(this.dataList)
    },
    // 右击事件
    contextmenuClick:function(){
       console.log("触发了自定义的contextmenuClick事件");
       alert("触发了自定义");
    },
  },
  components:{
    vueZtree
  },
  mounted (){
      // 异步获取数据操作
    //   setTimeout(()=>{ 
         this.ztreeDataSource = [{
            id:220,
            parentId:0,
            // clickNode:false,
            name:"游戏1奥术大师大所大所大所大所",
            iconClass:"iconClassRoot",
            children:[{
              id:221,
              parentId:220,
            //   clickNode:false,
              name:"游戏2",
              path:"",
              children:[{
                  id:222,
                  parentId:221,
                //   clickNode:false,
                  name:"游戏3",
                  path:"",
                  children:[{
                      id:223,
                      parentId:222,
                    //   clickNode:false,
                      name:"游戏4",
                      path:"",
                      children:[{
                          id:224,
                          name:"游戏5",
                          path:"",
                          children:[{
                              id:225,
                              name:"游戏6",
                              path:"",
                              children:[{
                                  id:226,
                                  name:"游戏末节点",
                                  path:""
                              }],
                          }],
                      }],
                  }],
              }],
           }],
            path:"http://www.baidu.com"
         }
         ,{
            id:1,
            name:"音乐",
            iconClass:"iconClassRoot",
            children:[],
            path:"http://www.baidu.com"
         },{
            id:2,
            name:"视频",
            iconClass:"iconClassRoot",
            children:[{
               id:3,
               name:"电影",
               children:[{
                  id:4,
                  name:"国产电影",
                  iconClass:"iconClassNode",
                  path:""
               },{
                  id:5,
                  name:"好莱坞电影",
                  iconClass:"iconClassNode",
                  path:""
               },{
                  id:6,
                  name:"小语种电影",
                  iconClass:"iconClassNode",
                  path:""
               }]
            },{
               id:7,
               name:"短片",
               children:[{
                  id:9,
                  name:"电视剧",
                  iconClass:"iconClassNode",
                  path:""
               },{
                  id:10,
                  name:"短片",
                  iconClass:"iconClassNode",
                  path:""
               }]
            }],
            path:""
         }
         ]
    //   },1000)
      
      // 测试修改数据
    //   setTimeout(()=>{ 
    //      this.ztreeDataSource[0].name = "游戏被改了";
    //   },5000);
  }
}
</script>
<style>
    .breadcrumb > li + li:before {
    color: #CCCCCC;
    content: "/ ";
    padding: 0 5px;
}
.breadcrumb li{
    cursor: pointer;
    color:#337ab7
}
.breadcrumb li:nth-last-child(1){
    color:red;
}
</style>


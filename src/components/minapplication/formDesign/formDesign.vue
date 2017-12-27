<template xmlns:v-on="http://www.w3.org/1999/xhtml">
	<div class="set" style="height: 100%;" v-on:mouseup="moveend" v-on:mousemove="move">
				<div class="wf-mainTop">
        		审批表单设计
        	</div>
        <div class="wf-main">
        	
            <mainleft></mainleft>
            <formcanvas></formcanvas>
            <setting></setting>
            <div class="saveBut">保存并启用</div>
        </div>
        <dragging></dragging>
        
	</div>
</template>
<script>
	
    import mainleft from './mainLeft'
    import formcanvas from './formcanvas'
    import setting from './setting'
    import dragging from './dragging'

    export default {
        name: 'set',
        components: {
            mainleft,
            formcanvas,
            setting,
            dragging
        },
        data: function () {
            return {
                isstart: false,
                componentView: {}
            }
        },
        methods: {
            move: function (e) {
            
                if (this.isstart) {
                    document.querySelector('html').classList.add('wf-cursor-move')
                    let obj = {
                        componentName: this.componentView.componentName,
                        clientX: e.clientX,
                        clientY: e.clientY
                    }
                    drag.$emit("moveInCanvas", obj)
                    drag.$emit('move', e)
                }
            },
            moveend: function (e) {
            	
                if (this.isstart) {
                    let obj = {
                        componentView: this.componentView
                    }
                    drag.$emit("moveend", obj)
                    this.isstart = false
                }
            }
        },
        created: function () {
            let self = this
            drag.$on('movestart', function (obj) {
                self.isstart = true
                self.componentView = obj.componentView
            })
        },
        mounted: function () {

        }
    }
</script>
<style scoped>
    @import "../../../assets/css/design.css";
</style>


<template>
    <span class="btn">
        <i :class="styleClass" :style="style" @click="click"></i>
        <!-- <div 
        class="titlebtn" 
        :style="style"
        @click="click"/> -->
    </span>
</template>

<script>
    const {ipcRenderer: ipc} = require('electron');
    const style = {
        min: {
            //backgroundColor: 'green',
            right:'60px'
        },
        max: {
            //backgroundColor: 'yellow',
            right:'30px'
        },
        close: {
            //backgroundColor: 'red',
            right:'0px'
        }
    };
    const styleClass = {
        min: "el-icon-minus",
        max: "el-icon-copy-document",
        close: "el-icon-close"
    };
    export default {
        name: 'TitleButton',
        props: ['type'],
        computed: {
            style: function () {
                return style[this.type];
            },
            styleClass(){
                return styleClass[this.type];
            }
        },
        methods: {
            click: function () {
                //console.log(123);
                ipc.send(this.type);
            }
        }
    }
</script>
    
<style>
.titlebtn {
    position: absolute;
    top: 10px;
    width: 15px;
    height: 15px;
    -webkit-app-region: no-drag;
    border-radius: 50%;
}
.titlebtn:hover{
    border: 1px solid rgba(248, 242, 242, 0.6);
}

.btn i{
    position: absolute;
     -webkit-app-region: no-drag;
    top: 0px;
    right: 0px;
}
.btn i:hover{
    font-size:20px;
}
</style>
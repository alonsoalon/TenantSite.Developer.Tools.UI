<template>
<el-container class="container" style="height: 100%;">
    <el-header height="60px" >
      <div id="dragBar">
          {{title}}
      </div>
      
      <div id="mytitle">
          <title-button type="min" title="最小化" />
          <title-button type="max" title="最大/还原" />
          <title-button type="close" title="关闭"/>
      </div>
    </el-header>

    <el-main class="mainScroll">
      <el-tabs tab-position="left">
        <el-tab-pane label="设置">
          <tool-setting></tool-setting>
        </el-tab-pane>
        <el-tab-pane label="建库工具">
          <create-db></create-db>
        </el-tab-pane>

        <el-tab-pane label="租户管理">
          <tenant-manage></tenant-manage>
        </el-tab-pane>
          
        <el-tab-pane label="启动参数">        
          <config-startup></config-startup>      
        </el-tab-pane>
        <el-tab-pane label="应用参数">        
          <config-app></config-app>      
        </el-tab-pane>



        <el-tab-pane label="种子数据生成">
          <seed-data></seed-data>
        </el-tab-pane>

        <el-tab-pane label="关于">
          
          <el-alert
          :title="title"
          type="info"
          :closable="false">
            <div style="font-size:14px;">
              <p>
              是专门用于HttpApi项目的初始化工作，包括系统参数配置、初始化租户参数配置、初始化租户数据资源面向开发人员的工具。
              </p>
              <p>
              您也可以直接到HttpApi项目下手工修改appsetting.json文件来完成参数的配置工作，但初始化租户的数据资源(同步数据库结构及种子数据初始化)只能在此工具下进行。
              </p>
              建议在开发环境中使用，不适合在产品环境中使用。
            </div>
          </el-alert>

          <el-alert
          title="说明"
          type="info"
          :closable="false">
            <div style="font-size:14px;">
              <p>
              {{title}}  依赖于后端初始化服务项目(AlonsoAdmin.HttpApi.Init)，应用此工具前请确保该项目成功启动。
              </p>
              <p>
              {{title}}  采用 Electron 进行研发。
              <!-- https://gitee.com/Enious/electron-vue -->
              </p>
              <system-information></system-information>
            </div>
          </el-alert>

        </el-tab-pane>
      </el-tabs>
    </el-main>
  
  <el-footer height="30px" style="font-size:12px">
    {{title}}  
    <!-- v{{version}}  -->
    by {{author}}
  </el-footer>
</el-container>


</template>

<script>

  // 打开系统本地文件
  // const {shell} = require("electron");
  // Open a local file in the default app


  var pa = require("./../../../package.json");
  var fs = require('fs');
 
 
  import TitleButton from './title-button'
  import SystemInformation from './system-info/SystemInformation'
  import ConfigStartup from './config-startup'
  import ConfigApp from './config-app'
  import TenantManage from './tenant-manage'
  import CreateDb from './create-db'
  import ToolSetting from './tool-setting'
  import SeedData from './seed-data'

  import { mapState } from "vuex";
  

  export default {
    name: 'landing-page',
    components: { 
      SystemInformation,
      ToolSetting,
      CreateDb,
      ConfigStartup,
      ConfigApp,
      TenantManage,
      SeedData,
      TitleButton
    },
    data() {
      return {
        //title:this.$store.state.admin.app.title
      }
    },
    computed:{
     ...mapState("admin/app", ["title","version","author"]),
    },
    methods: { 
 
    }
  }
</script>

<style lang="scss" scoped>
.mainScroll {
  padding: 0px 10px;
}
.mainScroll::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.mainScroll::-webkit-scrollbar-thumb {
  background-color: #d5d5d5;
  border-radius: 5px;
}
#dragBar{
  -webkit-app-region: drag;
  margin-top: 2px;
  height:58px;
}
#mytitle {
    position: absolute;
    width: 100%;
    height: 52px;
    -webkit-app-region: drag;
    top: 10px;
    right: 10px
}
</style>

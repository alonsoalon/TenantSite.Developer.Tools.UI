<template>
    <el-card shadow="hover" class="card">
        <div slot="header" class="clearfix">
            <span>启动参数 - HostAPI 项目 启动时用到的参数</span>
        </div>
        <el-form ref="form" :model="startup" label-width="150px" v-loading="loading">

            <!-- <el-divider content-position="left">缓存</el-divider> -->
            <el-form-item label="缓存类型">
                <el-radio v-model="startup.cache.type" :label="0" border >内存</el-radio>
                <el-radio v-model="startup.cache.type" :label="1" border >Redis</el-radio>
            </el-form-item>
            <el-form-item label="Redis连接字符">
                <el-input v-model="startup.cache.redis.connectionString"></el-input>
            </el-form-item>
            <el-form-item label="API访问日志">
                <el-switch v-model="startup.log.operation">
                </el-switch>
            </el-form-item>
            <el-form-item label="租户策略">         
                <el-radio v-model="startup.tenantRouteStrategy" :label="0" border >Route</el-radio>
                <el-radio v-model="startup.tenantRouteStrategy" :label="1" border >Host</el-radio>
                <br/>
                Route：路由模式，即租户标识从路由中获取，形如：http://www.xxx.com/tenant1 （其中 tenant1 为租户编码）<br/>
                Host：主机模式，即租户标识从域名中获取，形如：http://tenant1.xxx.com （本地环境可用nginx模拟实现效果）
            </el-form-item>


            
            <el-form-item>
                <el-button type="primary" @click="reLoad">重载配置</el-button>
                <el-button type="primary" @click="saveConfig">保存设置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { getStartupConfig,updateStartupConfig } from './../../api/config';
 export default {
    data() {
      return {
        loading:true,
        "startup": {
            "cache": {
                "type": 0,
                "redis": {
                    "connectionString": "127.0.0.1:6379,password=,defaultDatabase=2"
                }
            },
            "log": {
                "operation": true
            },
            "tenantRouteStrategy": 0
        }
      }
    },
    mounted() {
        this.getConfig(false);
    },
    methods: {
        reLoad(){
            this.$confirm('重载参数，未保存的修改将丢失，是否重载？', '确认信息', {
                confirmButtonText: '确认重载参数',
                cancelButtonText: '取消'
            })
            .then(() => {
                this.getConfig(true);
            })
            .catch(action => {

            });
        },
        async getConfig(displaySuccessMsg){
            this.loading=true;
            var res= await getStartupConfig();
            this.loading=false;
            if (!res.success && res.message) {
                this.$message({ message: res.message, type: "error" });
                return;
            }
            else
            {
                this.startup = res.data;                
                if(displaySuccessMsg){
                    this.$message({ message: "成功载入启动配置参数（Startup Config）", type: "success" });
                }   
                return;
            }
          
        },
        async saveConfig(){
            this.loading = true;
            var res= await updateStartupConfig(this.startup);
            this.loading = false;
            if (!res.success && res.message) {
                this.$message({ message: res.message, type: "error" });
                return;
            }
            else
            {
                this.$message({ message: "成功保存", type: "success" });
                return;
            }
        }
    }
  }
</script>

<style>

</style>
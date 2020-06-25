<template>
<section>
    <el-card shadow="hover" class="card" >
        <div slot="header" class="clearfix">
            <span>应用参数</span>
        </div>
        

        <el-form ref="form" :model="system" label-width="150px" v-loading="loading">

            
            <el-divider content-position="left">系统参数</el-divider>
            <el-form-item label="数据库Keys">
                <tags :keys="system.dbKeys"></tags>                        
                仓储多数据库实例对象支持，此处为配置应用涉及到的数据库Key，具体数据库类型与连接串在每个租户的配置中进行配置 <br />                
                如有新增，配置后还需到项目 AlonsoAdmin.Repository > _Db > Constants 常量类增加相应KEY <br />
                数据库Key应用示例见仓储项目：AlonsoAdmin.Repository > Blog > TestRepository.cs <br />
                system 为系统核心功能数据库key, 建议保留。  <br />
            </el-form-item>

            <el-form-item label="Watch CURD">
                <el-switch v-model="system.watchCurd"></el-switch>   <br />               
                如果打开，在控制台将输出每次请求数据库的SQL语句
            </el-form-item>
            <el-form-item label="Data Center Id">
                <el-input-number v-model="system.dataCenterId" size="small"></el-input-number> <br />         
                数据中心ID：用于生成雪花算法的主键ID生成，系统所有表主键采样雪花算法实现。
            </el-form-item>
            <el-form-item label="Work Id"> 
                <el-input-number v-model="system.workId" size="small"></el-input-number> <br />               
                工作站ID：用于生成雪花算法的主键ID生成，系统所有表主键采样雪花算法实现。
            </el-form-item>
            <el-form-item label="API验证">         
                <el-switch v-model="system.enableApiAccessControl"></el-switch>   <br />             
                如果打开，后台将对每次请求的API进行权限验证(API管理中禁用验证的除外)。
            </el-form-item>
            <el-divider content-position="left">头像上传参数</el-divider>
            <el-form-item label="上传目录">         
                 <el-input v-model="system.uploadAvatar.uploadPath"></el-input>   
            </el-form-item>
            <el-form-item label="请求根路径">         
                 <el-input v-model="system.uploadAvatar.requestPath"></el-input>   
            </el-form-item>
            <el-form-item label="图片最大上传大小">         
                 <el-input v-model="system.uploadAvatar.maxSize">
                      <template slot="append">byte</template>
                </el-input>   <br />  
                 例：图片大小不超过 1M = 1024 * 1024 = 1048576 byte
            </el-form-item>
            <el-form-item label="上传类型">     
                <tags :keys="system.uploadAvatar.contentType"></tags>                
            </el-form-item>
            
            
            <el-form-item>
                <el-button type="primary" @click="reLoad">重载配置</el-button>
                <el-button type="primary" @click="saveConfig">保存设置</el-button>
            </el-form-item>

        </el-form>
    </el-card>
</section>



    
</template>

<script>
import { getSystemConfig,updateSystemConfig } from './../../api/config';
   import Tags from './../Tags'
 export default {
    name: 'config-page',
    components: { Tags },
    data() {
      return {
        loading:true,
        "system": {
            "dbKeys":["system","blog"],
            "watchCurd": true,
            "dataCenterId": 5,
            "workId": 20,
            "enableApiAccessControl": true,
            "uploadAvatar": {
                "uploadPath": "D:/upload/avatar",
                "requestPath": "/upload/avatar",
                "maxSize": 1048576,
                "contentType": [
                    "image/jpg",
                    "image/png",
                    "image/jpeg",
                    "image/gif"
                ]
            }
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
            var res= await getSystemConfig();
            this.loading=false;
            if (!res.success && res.message) {
                this.$message({ message: res.message, type: "error" });
                return;
            }
            else
            {
                this.system = res.data;
                this.$store.dispatch('admin/app/setDbKeys',this.system.dbKeys);
                if(displaySuccessMsg){
                    this.$message({ message: "成功载入应用配置参数（System Config）", type: "success" });
                }                    
                return;
            }   
        },
        async saveConfig(){
            this.loading = true;
            var res= await updateSystemConfig(this.system);
            this.loading = false;
            if (!res.success && res.message) {
                this.$message({ message: res.message, type: "error" });
                return;
            }
            else
            {
                this.$store.dispatch('admin/app/setDbKeys',this.system.dbKeys);
                this.$message({ message: "成功保存", type: "success" });
                return;
            }
        }
    }
  }
</script>

<style lang="scss" scoped>

.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    height: 32px;
    margin-left: 10px;
  }
</style>
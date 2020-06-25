<template>
<section>
    <el-card shadow="hover" class="card">
        <div slot="header" class="clearfix">
            <span>设置</span>
        </div>
        <el-form ref="form" :model="toolSetting" label-width="150px">
            <el-form-item label="服务BaseURL">
                <el-input v-model="toolSetting.apiUrl"></el-input>
                后台 AlonsoAdmin.HttpApi.Init 项目启动根地址
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSaveSetting">保存设置</el-button>
            </el-form-item>
        </el-form>
    </el-card>

</section>



    
</template>



<script>

  import { mapState,mapActions } from "vuex";
  
  export default {
    name: 'landing-page',
    data() {
      return {
        toolSetting:{
            apiUrl: this.$store.state.admin.app.baseUrl
        },
        
        form: {
          api: '',
          path:''
        }
      }
    },
    computed:{
     ...mapState("admin/app", ["baseUrl"]),
    //  apiUrl(){
    //      return this.baseUrl;
    //  }
    },
    methods: { 
        //...mapActions("admin/app",["setBaseUrl"]),
        onSubmit(){

        },
        onSaveSetting(){
            this.$store.dispatch('admin/app/setBaseUrl',this.toolSetting.apiUrl)
            //this.setBaseUrl(this.toolSetting.apiUrl);
            this.$message({ message: "成功保存参数", type: "success" });
        }
    }
  }
</script>

<style lang="scss" scoped>



</style>
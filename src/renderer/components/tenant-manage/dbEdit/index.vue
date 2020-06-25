<template>
<section>
    <el-drawer
      :title="title"
      :size="size"
      :append-to-body="true"
      :visible.sync="drawerVisible"
      :direction="direction"
      :wrapperClosable="wrapperClosable"
      class="drawer"
      @close="onClosePanl"
    >
      <section class="drawer-body">
        
        <el-form
          ref="refForm"
          label-width="80px"
          :model="dataItem"
          :inline="false"
          size="small"
          :rules="formRules"
        >

          <el-card shadow="hover" class="card" >
          <el-form-item label="编码" prop="code">
            <el-input v-model="dataItem.code" autocomplete="off" />            
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="dataItem.name" />
          </el-form-item>
          <el-divider content-position="left">JWT Token 参数</el-divider>
          <el-form-item label="Audience" prop="items.audience">
            <el-input v-model="dataItem.items.audience"  />
          </el-form-item>
          <el-form-item label="Issuer" prop="items.issuer">
            <el-input v-model="dataItem.items.issuer"  />
          </el-form-item>
          <el-form-item label="Expiration" prop="items.expirationMinutes">
            <el-input v-model="dataItem.items.expirationMinutes" >
            <template slot="append">分钟</template>
            </el-input>
          </el-form-item>
          <el-form-item label="Secret" prop="items.secret">
            <el-input v-model="dataItem.items.secret"  />
          </el-form-item>

          </el-card>


          <div v-for="item in dbOptionsInit" :key="item.key">
            <el-card shadow="hover" class="card" >
            <div slot="header" class="clearfix">
                <span>{{item.key}} 配置</span>
                <el-button style="float: right; padding: 5px" type="text" @click="onAdd(item.key)" icon="el-icon-plus">增加字符串</el-button>
                <el-tooltip class="item" effect="dark" content="执行初始化，将对主库同步数据结构，插入种子数据" placement="bottom-start">
                  <el-button style="float: right; padding: 5px" type="text" @click="onAdd(item.key)" icon="el-icon-check">初始化</el-button>
                </el-tooltip>
            </div>
              
              <el-form-item label="库类型" >
                <el-radio-group v-model="item.dbType" size="mini">
                  <el-radio-button :label="0">My Sql</el-radio-button>
                  <el-radio-button :label="1">Sql Servier</el-radio-button>
                  <el-radio-button :label="2">Postgre SQL</el-radio-button>
                  <el-radio-button :label="3">&nbsp;Oracle&nbsp;</el-radio-button>
                  <el-radio-button :label="4">Sqlite</el-radio-button>    
                  <el-radio-button :label="11">Microsoft Access</el-radio-button>
                  <el-radio-button :label="12"> Da Meng </el-radio-button>
                </el-radio-group>

                 <el-radio-group v-model="item.dbType" size="mini">  
                  <el-radio-button :label="5">OdbcOracle</el-radio-button>
                  <el-radio-button :label="6">OdbcSqlServer</el-radio-button>
                  <el-radio-button :label="7">OdbcMySql</el-radio-button>
                  <el-radio-button :label="8">OdbcPostgreSQL</el-radio-button>
                  <el-radio-button :label="9">Odbc</el-radio-button>
                  <el-radio-button :label="10">OdbcDameng</el-radio-button>
                </el-radio-group>


              </el-form-item>
              <template v-for="(conn,index) in item.connectionStrings" >
                <el-form-item label="连接字符" :key="index">
                    <el-input v-model="conn.connectionString" autocomplete="off"  >
                    <template slot="prepend">{{conn.useType==0?"主库":"从库"}} </template>
                    <el-button slot="append" icon="el-icon-connection" v-loading="conn.loading" @click="onTestDbConnect(item.dbType,conn.connectionString,conn.loading)">测试连接</el-button>
                    <!-- <el-button v-if="conn.useType==1" slot="append" icon="el-icon-delete" @click="onDelete(item.key,index)">删除</el-button> -->
                  </el-input>
                </el-form-item>
              </template>

            </el-card>

          </div>
        </el-form>
      </section>
      <div class="drawer-footer">
        <el-button @click.native="drawerVisible = false">
          取消
        </el-button>
        <confirm-button
          :validate="formValidate"
          :loading="loading"
          type="submit"
          @click="onSubmit"
        />
        
      </div>
    </el-drawer>
  </section>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapState } from "vuex";
import ConfirmButton from "../../confirm-button";
import { saveTenantConfig } from './../../../api/config';
import { testDbConnect } from './../../../api/tool';
export default {
    components: {
      ConfirmButton
    },
    props: {
        title: {
            type: String,
            default: "新增"
        },
        visible: {
            type: Boolean,
            default: false
        },
        direction: {
            type: String,
            default: "rtl"
        },
        size: {
            type: String,
            default: "1000px"
        },
        wrapperClosable: {
            type: Boolean,
            default: false
        },
        data: {
           type: Object,
           default:()=>{}
        }
    },
    computed: {
        ...mapState("admin/app", ["dbKeys"]),       
        dbOptionsInit(){
          //console.log(this.dbKes);
          if(!this.dbKeys || this.dbKeys.length == 0){
            return this.data.dbOptions;
          }
         
          if(!this.data.dbOptions || this.data.dbOptions.length == 0){
            return [];
          }

          let dbOptions=[]
          this.dbKeys.forEach(x => {      
            //let exDb = this.data.dbOptions.filter(m => m.key == x);
            if(this.data.dbOptions.some(y=>y.key==x)){
              let dbs = this.data.dbOptions.filter(m => m.key == x);
              dbOptions.push(dbs[0]);
            }
            else 
            {
              let db = {
                key:x,
                dbType:0,
                connectionStrings:[ {useType:0, connectionString:"" } ]
              }
              dbOptions.push(db);
            }
          });
          //this.data.dbOptions = [];
          this.data.dbOptions = dbOptions;
          return this.data.dbOptions;

        },
        drawerVisible: {
            get() {
                return this.visible;
            },
            set(v) {
                this.$emit("onChangeDrawer", v);
            }
        }
    },

    data() { 
        
        return {
            dataItem:{
              // "id":"",
              // "code":"",
              // "name":"",
              "items": {
                "audience": "https://www.xxxx.com/",
                "issuer": "https://www.xxxx.com/",
                "expirationMinutes": "1000",
                "secret": "1qtiOLpT7mJQx239e2kgMheAH7B9lGQJnoxYRCb7KX3x1ogDEd55I7dJ1ziYptiTF"
              }
            },
            loading: false,
            formRules: {
                code: [{ required: true, message: "请输入标题", trigger: "blur" }],
                name: [{ required: true, message: "请输入接口地址", trigger: "blur" }]
            }
        };
    },
    watch:{
      data(val) {
        this.dataItem = val;
      }
    },
    methods: {
        async onTestDbConnect(dbType,connectionString,loading){
            this.loading = true;
            const para = { dbType, connectionString };
            const res = await testDbConnect(para);
            this.loading = false;

            if (res.success) {
                this.$message({ message: "连接成功", type: "success" });
            } else {
                this.$message({ message: res.message, type: "error" });
            }

        },
        onAdd(dbkey){
          this.data.dbOptions.some(x => {
            if(x.key === dbkey){     
              if(!x.connectionStrings || x.connectionStrings.length == 0){
                x.connectionStrings = [{useType:0,connectionString:""}];
              }
              else{
                x.connectionStrings.push({useType:1,connectionString:""});
              }

              return true;
            }
          });
        },
        onDelete(dbkey,index){
          //console.log(dbkey,index,this.data.dbOptions);
          if(!this.data.dbOptions || this.data.dbOptions.length == 0){
            return;
          }
          
          this.data.dbOptions.some(x => {
            if(x.key === dbkey){             
              x.connectionStrings.splice(index, 1);
              return true;
            }
          });
        },
        // 验证表单
        formValidate: function() {
            let isValid = false;
            this.$refs.refForm.validate(valid => {
                isValid = valid;
            });
            return isValid;
        },
        // 关闭表单面板重置表单控件
        onClosePanl() {
            this.$refs.refForm.resetFields();
        },
        async onSubmit() {
            this.loading = true;
            const para = this.dataItem;
            const res = await saveTenantConfig(para);
            this.loading = false;

            if (res.success) {
                this.$message({ message: "更新成功", type: "success" });
                this.$refs.refForm.resetFields();
                this.drawerVisible = false;
                // 成功后钩子，共父级调用
                this.$emit("onSuccess", para, res);
            } else {
                this.$message({ message: res.message, type: "error" });
                // 失败后钩子，共父级调用
                this.$emit("onError", para, res);
            }
        }
    }
}
</script>

<style>

</style>
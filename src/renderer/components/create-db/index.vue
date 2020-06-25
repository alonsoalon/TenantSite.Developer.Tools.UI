<template>
<section class="root">
    <el-card shadow="hover" class="card">
        <div slot="header" class="clearfix">
            <span>创建数据库 (你也可以通过专用数据库工具先为租户创建好数据库)</span>
        </div>
        <el-form ref="form" :model="form" label-width="150px">

            <el-form-item label="库类型">
                <el-radio-group v-model="form.dbType"  @change="onDbTypeChange">
                  <el-radio-button 
                        v-for="item in dbTypes"
                        :key="item.id"
                        :label="item.label"                        
                        >{{item.title}}
                </el-radio-button>
                </el-radio-group>
                <br />
                更多数据库支持见：<a href="https://github.com/dotnetcore/FreeSql/wiki/%E5%85%A5%E9%97%A8#connectionstrings" target="_blank"> 
                https://github.com/dotnetcore/FreeSql/wiki/入门#connectionstrings
                </a>
            </el-form-item>
            <el-form-item label="建库连接字符串">
                <el-input v-model="form.connectionString">
                    <el-button slot="append" icon="el-icon-connection" v-loading="testDbConnectLoading" @click="onTestDbConnect">测试连接</el-button>
                </el-input>
                
            </el-form-item>
            <el-form-item label="建库脚本">
                <el-input v-model="form.createDbCommand"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onCreateDb" v-loading="createDbLoading">创建数据库</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</section>



    
</template>



<script>

  //import { mapState,mapActions } from "vuex";
  import { testDbConnect,createDb } from './../../api/tool';
  export default {
    name: 'create-db',
    data() {
      return {
        testDbConnectLoading:false,
        createDbLoading:false,
        dbTypes:[
            {id:"0", label:"MySql",title:"MySql" },
            {id:"1", label:"SqlServer",title:"SqlServer" },
            {id:"2", label:"PostgreSql",title:"PostgreSql" },
            {id:"3", label:"Oracle",title:"Oracle" },
            {id:"4", label:"Sqlite",title:"Sqlite" },
            {id:"11", label:"MsAccess",title:"MsAccess" },
            {id:"12", label:"Dameng",title:"Dameng" }
        ],
        connectionStrings:{
            MySql:"Server=localhost; Port=3306; Database=mysql; Uid=root; Pwd=000000; Charset=utf8mb4;",
            SqlServer:"Data Source=.;Integrated Security=True;Initial Catalog=master;Pooling=true;Min Pool Size=1",
            PostgreSql:"Host=localhost;Port=5432;Username=postgres;Password=; Database=postgres;Pooling=true;Minimum Pool Size=1",
            
        },      
        createDbCommands:{
            MySql:"CREATE DATABASE `tenant1db` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci'",
            SqlServer:"CREATE DATABASE [tenant1db]",
            PostgreSql:"CREATE DATABASE \"tenant1db\" WITH ENCODING = 'UTF8'",
          
        },
        form: {
          dbType:"MySql",
          connectionString:"Server=localhost; Port=3306; Database=mysql; Uid=root; Pwd=000000; Charset=utf8mb4;",
          createDbCommand:"CREATE DATABASE `tenant1db` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci'"     

        }
      }
    },
    computed:{

    },
    methods: { 
        onDbTypeChange(v){
            this.form.dbType=v;
            this.form.connectionString = this.connectionStrings[v] || "";
            this.form.createDbCommand = this.createDbCommands[v] || "";
        },
        async onTestDbConnect(){
            this.testDbConnectLoading = true;
            const para = this.form;
            const res = await testDbConnect(para);
            this.testDbConnectLoading = false;

            if (res.success) {
                this.$message({ message: "连接成功", type: "success" });
            } else {
                this.$message({ message: res.message, type: "error" });
            }

        },
        async onCreateDb(){
            this.createDbLoading = true;
            const para = this.form;
            const res = await createDb(para);
            this.createDbLoading = false;

            if (res.success) {
                this.$message({ message: "创建成功", type: "success" });
            } else {
                this.$message({ message: res.message, type: "error" });
            }
        }
    }
  }
</script>

<style lang="scss" scoped>
    .root /deep/ .el-input__inner{
        height : auto;
    }

</style>
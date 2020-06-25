<template>
<section class="root">
    <el-card shadow="hover" class="card"  >
        <div slot="header" class="clearfix">
            <span>种子数据生成</span>
        </div>
        <el-form ref="form" :model="form" label-width="150px" v-loading="generateSeedDataLoading">

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
    

            <el-form-item>
                <el-button type="primary" @click="onGenerateSeedData" >生成种子数据</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</section>



    
</template>



<script>

  //import { mapState,mapActions } from "vuex";
  import { testDbConnect,generateSeedData } from './../../api/tool';
  export default {
    name: 'create-db',
    data() {
      return {
        testDbConnectLoading:false,
        generateSeedDataLoading:false,
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
            MySql:"Server=localhost; Port=3306; Database=tenant1db; Uid=root; Pwd=000000; Charset=utf8mb4;",
            SqlServer:"Data Source=.;Integrated Security=True;Initial Catalog=tenant1db;Pooling=true;Min Pool Size=1",
            PostgreSql:"Host=localhost;Port=5432;Username=postgres;Password=; Database=tenant1db;Pooling=true;Minimum Pool Size=1",
            
        },      
        form: {
          dbType:"MySql",
          connectionString:"Server=localhost; Port=3306; Database=tenant1db; Uid=root; Pwd=000000; Charset=utf8mb4;",
        }
      }
    },
    computed:{

    },
    methods: { 
        onDbTypeChange(v){
            this.form.dbType=v;
            this.form.connectionString = this.connectionStrings[v] || "";
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
        async onGenerateSeedData(){
            this.generateSeedDataLoading = true;
            const para = this.form;
            const res = await generateSeedData(para);
            this.generateSeedDataLoading = false;

            if (res.success) {
                this.$message({ message: "生成成功", type: "success" });
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
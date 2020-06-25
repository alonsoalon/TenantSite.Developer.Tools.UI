<template>
<section>
    <div class="btnTool">
        <el-button style="width:100%" icon="el-icon-plus" @click="onAdd">添加租户</el-button>
    </div>
    
    <el-table :data="rows" style="width: 100%;" v-loading="loading">
        <el-table-column prop="id" label="Id" width="220"></el-table-column>
        <el-table-column prop="code" label="Code"></el-table-column>
        <el-table-column prop="name" label="名称" ></el-table-column>
        <el-table-column
        
        label="操作"
        width="200">
        <template v-slot="{ $index, row }" >
            <el-button @click="onEdit(row)" type="primary" size="small">编辑</el-button>
            <!-- <el-button @click="onDelete(row)" type="text" size="small">删除</el-button> -->
            <confirm-button
              type="delete"
              :loading="row._loading"
              :validate-data="row"
              size="small"
              @click="onDelete(row)"
            />
        </template>
        </el-table-column>
    </el-table>

    <add-panl
      title="新增"
      :visible="addVisible"
      :data="addItem"
      @onChangeDrawer="onAddChangeDrawer"
      @onSuccess="onAddSuccess"
      @onError="onAddError"
    ></add-panl>

    <edit-panl
      :title="editPanlTile"
      :visible="editVisible"
      :data="editItem"
      @onChangeDrawer="onEditChangeDrawer"
      @onSuccess="onEditSuccess"
      @onError="onEditError"
    ></edit-panl>



</section>
</template>

<script>
import { cloneDeep } from "lodash";
import EditPanl from "./edit/index";
import AddPanl from "./add/index";
import { getTenantList,deleteTenant } from './../../api/config';
import ConfirmButton from "../confirm-button";
export default {
    name: "teanant-manage--config--index",
    components: { AddPanl,EditPanl, ConfirmButton},
    data() {
        return {
            loading:false,
            rows: [],
            // 新增面板显示属性
            addVisible: false,
            //addPanlTile:"添加",
            addItem: {},            

            editVisible: false,
            editPanlTile:"编辑",
            editItem: {},


            dbEditVisible: false,
            dbEditPanlTile:"编辑",
            dbEditItem: {},

        }
    },
    mounted() {
        this.getTenantList(false);
    },
    methods: {
        async getTenantList(displaySuccessMsg){
            this.loading=true;
            var res= await getTenantList();
            this.loading=false;
            if (!res.success && res.message) {
                this.$message({ message: res.message, type: "error" });
                return;
            }
            else
            {
                let data = res.data;

                if (data !== null && data.length > 0) {
                    data.forEach(d => {
                        d._loading = false;
                    });
                }

                this.rows = data;
                if(displaySuccessMsg){
                    this.$message({ message: "成功载入租户数据", type: "success" });
                }                    
                return;
            }   
        },
        async onDelete(row){

            row._loading = true;
            const para = { id: row.id };
            const res = await deleteTenant(para);
            row._loading = false;

            if (!res.success && res.message) {
                this.$message({ message: res.message, type: "error" });
                return;
            }
            else
            {
                this.$message({ message: "成功删除", type: "success" });
                this.getTenantList(false);
            } 
        },
     
        // -- add 事件 start --
        onAdd() {
            this.addVisible = true;
            this.addItem = {
                "id": "",
                "code": "",
                "name": "租户名称",
                "dbOptions": [
                    {
                        "key": "system",
                        "dbType": 0,
                        "connectionStrings": [
                            {
                            "connectionString": "Server=localhost; Port=3306; Database=Tenant1db; Uid=root; Pwd=000000; Charset=utf8mb4;",
                            "useType": 0
                            }
                        ]
                    }
                ],
                "items": {
                    "audience": "https://www.xxxx.com/",
                    "issuer": "https://www.xxxx.com/",
                    "expirationMinutes": "2000",
                    "secret": "1qtiOLpT7mJQx239e2kgMheAH7B9lGQJnoxYRCb7KX3x1ogDEd55I7dJ1ziYptiTF"
                }
            };
        },
        onAddSuccess() {
            this.getTenantList(false);
        },
        onAddError() {},
        onAddChangeDrawer(v) {
            this.addVisible = v;
        },
        // -- add 事件 end --

        // -- edit 事件 start --
        onEdit(row) {
            this.editVisible = true;
            this.editPanlTile= row.name + " 编辑";
            this.editItem = cloneDeep(row);
            //this.editItem = row;
        
        },
        onEditSuccess() {
            this.getTenantList(false);
        },
        onEditError() {},
        onEditChangeDrawer(v) {
            this.editVisible = v;
        },
        // -- edit 事件 end --



    }
}
</script>
<style lang="scss" scoped>
.btnTool{
    button{
        border: dashed 1px #DCDFE6;
    }
}
</style>

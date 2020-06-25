<template>
  <div>
        <el-tag
            :key="tag"
            v-for="tag in keys"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
        </el-tag>
        <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ {{addBtnTitle}}</el-button>
    </div>

</template>

<script>
export default {
    props: {
        addBtnTitle: {
          type: String,
          default: "增加"
        },
        keys: {
          type: Array,
          default: () => []
        }
    },
    data() {
      return {
        inputVisible: false,
        inputValue: ''
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleClose(tag) {
        this.keys.splice(this.keys.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.keys.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
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
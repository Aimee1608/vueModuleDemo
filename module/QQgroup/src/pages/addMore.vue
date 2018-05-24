<template>
  <el-container class="container qqaddMoreBox" v-loading="loading">
    <el-header>批量导入 <a href="#/addMore">批量导入</a><a href="#/list">QQ群配置列表</a> </el-header>
    <el-main>
      <div class="qq-main">
        <h1>请选择导入文件</h1>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          accept="csv"
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">第一列为课程id，第二列为qq群号，第三列为网页id key和iPhone key，第四列为android key，文件格式需要保存成csv格式</div>
        </el-upload>
        <div class="">
          <p>demo示意图</p>
          <img src="../assets/img/review.jpg" alt="">
        </div>
      </div>
      <div class="qq-footer">
        <el-button type="info" @click="goList()">取消</el-button>
        <el-button type="primary" @click="saveData()">完成</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () { // 选项 数据
    return {
      fileName: '',
      loading: false,
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },
  components: { // 定义组件

  },
  methods: { // 事件处理方法
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm('确定移除 ' + file.name + ' ？')
    },
    goList () { // 取消返回
      this.$router.push({path: '/list'})
    },
    saveData () { // 完成保存
      this.$router.push({path: '/list'})
    }
  },
  created () { // 生命周期函数

  }

}
</script>

<style>
.qqaddMoreBox .qq-main{
  height: 100%;
}
.qqaddMoreBox .qq-footer{
  text-align: center;
  padding: 40px 0;
}
</style>

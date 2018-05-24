<template>
  <el-container class="container qqaddBox" v-loading="loading">
    <el-header>新增配置 <a href="#/addMore">批量导入</a><a href="#/list">QQ群配置列表</a> </el-header>
    <el-main>
      <div class="qq-main">
        <ul>
          <li>
            <div class="">
              课程id
            </div>
            <el-input
              placeholder="课程Id"
              v-model="courseId"
              clearable>
            </el-input>
            <span class="mustTip">*</span>
          </li>
          <li>
            <div class="">
              QQ群号
            </div>
            <el-input
              placeholder="课程Id"
              v-model="courseId"
              clearable>
            </el-input>
            <span class="mustTip">*</span>
          </li>
          <li>
            <div class="">
              网页id key和iPhone key
            </div>
            <el-input
              placeholder="课程Id"
              v-model="courseId"
              clearable>
            </el-input>
            <span class="mustTip">*</span>
          </li>
          <li>
            <div class="">
              Android key
            </div>
            <el-input
              placeholder="课程Id"
              v-model="courseId"
              clearable>
            </el-input>
            <span class="mustTip">*</span>
          </li>
        </ul>
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
      loading: false,
      courseId: '' // qq号
    }
  },
  components: { // 定义组件

  },
  methods: { // 事件处理方法
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
.qqaddBox .qq-main{
  min-height: 600px;
}
.qqaddBox .qq-main ul{
  list-style: none;
  margin-bottom: 20px;
}
.qqaddBox .qq-main ul li{
  margin-bottom: 40px;
}
.qqaddBox .qq-main ul li .el-input{
  width: 400px;
  margin-top: 15px;
}
.qqaddBox .qq-footer{
  text-align: center;
  padding: 20px 0;
}
</style>

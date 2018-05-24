<template>
  <el-container class="container qqListBox" v-loading="loading">
    <el-header>QQ群配置列表 <a href="#/addMore">批量导入</a><a href="#/add">新增配置</a> </el-header>
    <el-main>
      <div class="searchbox">
        <el-input
          placeholder="QQ群号"
          v-model="qqNum"
          clearable>
        </el-input>
        <el-input
          placeholder="课程Id"
          v-model="courseId"
          clearable>
        </el-input>
        <el-button type="primary" @click="searchFun">查询</el-button>
      </div>
      <div class="tablebox">
        <el-table
          :data="tableData"
          :stripe="true"
          size="mini"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="课程ID">
          </el-table-column>
          <el-table-column
            prop="name"
            label="QQ号">
          </el-table-column>
          <el-table-column
            prop="status_str"
            label="状态">
            <template slot-scope="scope">
              <p :class="scope.row.status!=1?'hasdongtext':'hasjietext'">• {{scope.row.status!=1?"已冻结":"已启用"}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button
                type="text" size="small"
                @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button
                type="text" size="small"
                @click="handleDelete(scope.row.id, scope.row.status, scope.$index)">{{scope.row.status!=1?"解冻":"冻结"}}</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div class="paginationBox">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="totalNum">
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () { // 选项 数据
    return {
       loading: false, // 加载遮罩
       qqNum: '', // QQ群号
       courseId: '', // 课程id
       currentPage: 1, // 当前第几页
       pageSize: 5, // 每页显示条数
       totalNum: 10, // 总条数
       tableData: [{ // 渲染表格数据
            'id': 1,
            'name': '小二快速定级',
            'status': 2,
            'status_str': '已冻结'
       }]
    }
  },
  components: { // 定义组件

  },
  methods: { // 事件处理方法
    searchFun () { // 查询

    },
    handleSizeChange (val) { // 每页改变
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) { // 选择每页
      // console.log(`当前页: ${val}`)
    }
  },
  created () { // 生命周期函数

  }

}
</script>

<style>
.qqListBox .searchbox .el-input{
  width: auto;
  margin-right: 20px;
  margin-bottom: 20px;
}
.qqListBox  .tablebox{
  height: 600px;
}
.qqListBox  .tablebox table{
  font-size: 12px;
}
.qqListBox  .tablebox  thead th{
  background: #f5f7fa;
  height: 70px;
}
.qqListBox  .tablebox .hasdongtext{
  color: #FE5500;
}
.qqListBox  .tablebox .hasjietext{
  color: #2EBA07;
}
.qqListBox .paginationBox{
  text-align: center;
  margin: 20px 0;
}
</style>

<template>
    <el-container class="container gradeListBox" v-loading="loading">
      <el-header>定级列表 <a href="#/addGrade">新增定级</a></el-header>
      <el-main>
        <div class="searchbox">
          <el-select v-model="valueProvince" placeholder="省份">
            <el-option label="全部省份" :value="0"></el-option>
            <el-option
              v-for="item in selectProvince"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="valueGrade" placeholder="年级">
            <el-option label="全部年级" :value="0"></el-option>
            <el-option
              v-for="item in selectGrade"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="valueCourse" placeholder="学科">
            <el-option label="全部学科" :value="0"></el-option>
            <el-option
              v-for="item in selectCourse"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="valueState" placeholder="状态">
            <el-option label="全部状态" :value="0"></el-option>
            <el-option
              v-for="item in selectState"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
            <el-input
              placeholder="请输入关键字"
              v-model="keywords"
              clearable>
            </el-input>
            <el-input
              placeholder="定级ID"
              v-model="searchGradeId"
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
              label="定级ID"
              width="100">
            </el-table-column>
            <el-table-column
              prop="name"
              label="定级规则名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="province_str"
              label="省份"
              width="180">
            </el-table-column>
            <el-table-column
              prop="grade_name"
              label="年级">
            </el-table-column>
            <el-table-column
              prop="subject_name"
              label="学科">
            </el-table-column>
            <el-table-column
              prop="status_str"
              label="状态">
              <template slot-scope="scope">
                <p :class="scope.row.status!=1?'hasdongtext':'hasjietext'">• {{scope.row.status!=1?"已冻结":"已启用"}}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
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
import {getlist, getstaticinfo, switchHand} from '@/assets/js/server.js'
// import * as MockData from '@/MockData/MockData.js'
export default {
  data () { // 选项 数据
    return {
      loading: true, // 加载模态框
      selectProvince: [ // 选择省份
        {
            id: 1,
            name: '河北省',
            province_id: 130000,
            alias: '河北'
          }, {
            id: 2,
            name: '河北省',
            province_id: 130000,
            alias: '河北'
          }, {
            id: 3,
            name: '河北省',
            province_id: 130000,
            alias: '河北'
          }
      ],
      selectGrade: [{ // 选择年级
          id: 1,
          name: '幼升小',
          digit: 1,
          alias: 'xueqian',
          division_id: 2
        }, {
          id: 2,
          name: '幼升小',
          digit: 1,
          alias: 'xueqian',
          division_id: 2
        }, {
          id: 3,
          name: '幼升小',
          digit: 1,
          alias: 'xueqian',
          division_id: 2
        }],
        selectCourse: [{ // 选择课程
            id: 1,
            name: '语文',
            digit: 1,
            alias: 'yuwen'
          }, {
            id: 2,
            name: '语文',
            digit: 1,
            alias: 'yuwen'
          }],
          selectState: [{ // 定级状态 1开启 2 冻结
              value: '1',
              label: '已启用'
            }, {
              value: '2',
              label: '已冻结'
            }],
        valueProvince: '', // 条件搜索省份
        valueGrade: '', // 条件搜索年级
        valueCourse: '', // 条件搜索课程
        valueState: '', // 条件搜索状态
        searchGradeId: '', // 条件搜索规则id
        keywords: '', // 条件搜索关键词
        tableData: [{ // 渲染表格数据
             'id': 1,
             'grade_id': 2,
             'grade_name': '二年级',
             'subject_id': 2,
             'subject_name': '语文',
             'name': '小二快速定级',
             'status': 2,
             'status_str': '已冻结',
             'creator_id': 1,
             'creator_name': '',
             'create_time': '0000-00-00 00:00:00',
             'modify_time': '0000-00-00 00:00:00',
             'province_ids': '2',
             'province_str': '天津'
        }],
        currentPage: 1, // 当前第几页
        pageSize: 5, // 每页显示条数
        totalNum: 10 // 总条数
    }
  },
  components: { // 定义组件

  },
  methods: { // 事件处理方法
      handleEdit (id) { // 编辑
        this.$router.push({path: '/addGrade?id=' + id})
      },
      handleDelete (id, status, index) { // 冻结 解冻
        // console.log(id, status, index)
        var that = this
        var newStatus = status == 1 ? 2 : 1
        switchHand(id, newStatus, function (result) {
          // console.log(result)
           if (result.stat == 1) {
             that.tableData[index].status_str = that.tableData[index].status == 1 ? '已冻结' : '已启用'
             that.tableData[index].status = that.tableData[index].status == 1 ? 2 : 1
           } else if (result.stat == 0) {
             that.$alert(result.data, '操作失败', {
               confirmButtonText: '确定',
               showClose: false,
               callback: action => {
               }
             })
           } else if (result.stat == 3) {
             that.$alert(result.data, '登录失效', {
               confirmButtonText: '确定',
               showClose: false,
               callback: action => {
                  window.parent.location.href = 'http://admin.xesv5.com'
               }
             })
           } else {
             that.$alert('网络异常，保存数据失败', '请求失败', {
               confirmButtonText: '确定',
               showClose: false,
               callback: action => {
               }
             })
           }
        })
      },
      handleSizeChange (val) { // 每页改变
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) { // 选择每页
        // console.log(`当前页: ${val}`)
        this.getListData()
      },
      searchFun () { // 提交按钮搜索
        this.currentPage = 0
        this.pageSize = 0
        this.totalNum = 0
        this.getListData()
      },
      getListData () { // 获取列表
          var that = this
          getlist(that.valueProvince, that.valueGrade, that.valueCourse, that.valueState, that.keywords, that.searchGradeId, that.currentPage, function (result) {
            // console.log('列表', result)
            if (result.stat == 1) {
               that.loading = false
               that.tableData = result.data.list
               that.totalNum = result.data.total_num
               that.pageSize = result.data.page_size
               that.currentPage = result.data.page
            } else if (result.stat == 0) {
              that.loading = false
              that.$alert(result.data, '操作失败', {
                confirmButtonText: '确定',
                showClose: false,
                callback: action => {
                }
              })
            } else if (result.stat == 3) {
              that.$alert(result.data, '登录失效', {
                confirmButtonText: '确定',
                showClose: false,
                callback: action => {
                   window.parent.location.href = 'http://admin.xesv5.com'
                }
              })
            } else {
              that.$alert('网络异常，获取数据失败', '请求失败', {
                confirmButtonText: '确定',
                showClose: false,
                callback: action => {
                }
              })
            }
          })
      }
  },
  created () { // 生命周期函数
    var that = this
    this.getListData()
    getstaticinfo(function (result) { // 获取学科省份年级
      // console.log('省年级学科', result)
      that.selectProvince = result.provinces
      that.selectCourse = result.subjects
      that.selectGrade = result.grades
    })
  }
}
</script>

<style>
.gradeListBox .searchbox {
  width: 100%;
}
.gradeListBox .searchbox .el-select,.gradeListBox .searchbox .el-input{
  margin-bottom: 10px;
  margin-right: 10px;
}
.gradeListBox .searchbox .el-input{
  width: auto;
}
.gradeListBox  .tablebox{
  height: 600px;
}
.gradeListBox  .tablebox table{
  font-size: 12px;
}
.gradeListBox  .tablebox  thead th{
  background: #f5f7fa;
  height: 70px;
}
.gradeListBox  .tablebox .hasdongtext{
  color: #FE5500;
}
.gradeListBox  .tablebox .hasjietext{
  color: #2EBA07;
}

.gradeListBox .paginationBox{
  text-align: center;
  margin: 20px 0;
}
</style>

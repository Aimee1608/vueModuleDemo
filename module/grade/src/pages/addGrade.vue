<template>
  <el-container class="container addGradeBox" v-loading="loading">
    <el-header>{{ruleId?'编辑定级':'新增定级'}} <a href="#/gradeList">定级列表</a></el-header>
    <el-main>
      <div class="addgrade-list">
        <h1>定级名称</h1>
        <el-input class="gradeName-input" v-model="gradeInfo.name" placeholder="请输入内容" max="15" clearable></el-input><span class="mustTip">*</span><span>  最多15个字</span>
        <h1>课程范围</h1>
        <ul class="gradeRage-list">
          <li>
            <h2>年级</h2>
            <el-radio-group v-model="gradeInfo.grade_id" @change="gradeChange(false)">
              <el-radio v-for="(item,index) in selectGrade" :key="item.id" :label="item.id">{{item.name}}</el-radio>
            </el-radio-group>
          </li>
          <li>
            <h2>学科</h2>
            <el-radio-group v-model="gradeInfo.subject_id" @change="gradeChange(false)">
              <el-radio v-for="(item,index) in selectCourse" :key="item.id" :label="item.id">{{item.name}}</el-radio>
            </el-radio-group>
          </li>
          <li>
            <h2>省份 </h2>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group class="province-checkbox" v-model="gradeInfo.province_ids" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="(item,index) in selectProvince" :key="item.id" :label="item.id"  :disabled="item.check == 0">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </li>
        </ul>
        <h1 class="questionTitle">定级问卷设置  <el-button  @click="addNewQuestion">新增题目</el-button></h1>
        <div class="questionItem" v-for="(Qitem, index) in gradeInfo.question_list" :key="index+'a'">
          <p>第{{index+1}}题题干 <el-button type="text" :disabled="gradeInfo.question_list.length<=1"  @click="deleteQestion(index)">删除题目</el-button></p>
          <el-input class="gradeName-input" placeholder="请输入题干" v-model="Qitem.name" max="50" clearable></el-input><span class="mustTip">*</span><span> 最多50个字</span>
          <p>选择配置</p>
          <el-table
            :data="Qitem.option_list"
            style="width: 100%">
            <el-table-column
              label="选项" width="100">
              <template slot-scope="scope">
                <p>{{scope.$index+1}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="内容">
              <template slot-scope="scope">
                <el-input placeholder="请输入题干" v-model="scope.row.name" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  :disabled="Qitem.option_list.length<=2"
                  @click="handleDeleteOption(index, scope.$index)"><i class="el-icon-minus"></i></el-button>
                <el-button
                  size="mini"
                  type="info"
                  @click="handleAddOption(index, scope.$index)"><i class="el-icon-plus"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-alert
        class="errorTip"
        v-show="errorTip"
        :title="errorTip"
        type="error"
        show-icon
        :closable="false">
      </el-alert>
      <div class="grade-footer">
        <el-button type="info" @click="goList()">取消</el-button>
        <el-button type="primary" @click="saveData()">下一步</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {getbaseinfo, getstaticinfo, savebaseinfo, getprovincebyparams} from '@/assets/js/server.js'
export default {
  data () { // 选项 数据
    return {
      loading: false, // 加载loading
      errorTip: '', // 错误提示内容
      checkAll: false, // 是否全选
      ruleId: '',
      isnew: 0, // 新增0 编辑1
      isIndeterminate: true, //
      selectProvince: [ // 省份
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
      selectGrade: [{ // 年级
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
        selectCourse: [{ // 学科
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
          gradeInfo: { // 规则数据
              'id': 0,
              'grade_id': 0,
              'subject_id': 0,
              'name': null,
              'abstruct': null,
              'status': 0,
              'creator_id': 0,
              'creator_name': '管理员',
              'create_time': null,
              'modify_time': 0,
              'is_deleted': 0,
              'province_ids': [],
              'question_list': [
                 {
                      'id': 0,
                      'grading_id': 0,
                      'name': null,
                      'sort_index': 0,
                      'option_list': [
                         {
                              'id': 0,
                              'grading_id': 0,
                              'question_id': 0,
                              'name': null,
                              'sort_index': 0
                         },
                         {
                               'id': 0,
                               'grading_id': 0,
                               'question_id': 0,
                               'name': null,
                               'sort_index': 0
                         }
                     ]
                 }
             ]},
             initGradeId: 0, // 初始记录年级id
             initSubjectId: 0, // 初始记录学科ID
             initProvinceIds: [] // 初始记录省份id
    }
  },
  components: { // 定义组件

  },
  methods: { // 事件处理方法
     disableFun () { // 重设置disabled
        for (var i = 0; i < this.initProvinceIds.length; i++) {
          for (var j = 0; j < this.selectProvince.length; j++) {
            if (this.initProvinceIds[i] == this.selectProvince[j].id) {
                this.selectProvince[j].check = 1
            }
          }
        }
     },
     gradeChange () { // 改变年级
        var that = this
        if (that.gradeInfo.grade_id && that.gradeInfo.subject_id) {
          getprovincebyparams(that.gradeInfo.grade_id, that.gradeInfo.subject_id, function (result) {
            // console.log('根据年级学科获取省份', result)
            if (result.stat == 1) {
               that.selectProvince = result.data
               that.isIndeterminate = false
                if (that.initGradeId == that.gradeInfo.grade_id && that.initSubjectId == that.gradeInfo.subject_id) {
                   that.gradeInfo.province_ids = that.initProvinceIds
                   that.disableFun()
                } else {
                  that.gradeInfo.province_ids = []
                }
                that.getprovinceID()
            } else if (result.stat == 0) {
              that.$alert(result.data, '操作失败', {
                confirmButtonText: '确定',
                showClose: false,
                callback: action => {
                }
              })
            } else if (result.stat == 3) {
              that.loading = true
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
                callback: action => {
                }
              })
            }
          })
        }
     },
     getprovinceID () { // 提取省份ID
       this.provinceIdList = []
       for (var i = 0; i < this.selectProvince.length; i++) {
         if (this.selectProvince[i].check != 0) {
            this.provinceIdList.push(this.selectProvince[i].id)
         }
       }
       // console.log(this.provinceIdList, this.selectProvince)
     },
      handleCheckAllChange (val) { // 全选
        // console.log(val, this.provinceIdList)
        this.gradeInfo.province_ids = val ? this.provinceIdList : []
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange (value) { // 选择性选择
        let checkedCount = value.length
        this.checkAll = checkedCount === this.provinceIdList.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.provinceIdList.length
      },
      handleDeleteOption (Qindex, rowindex) { // 减少 选项
        // console.log(Qindex, rowindex)
        this.gradeInfo.question_list[Qindex].option_list.splice(rowindex, 1)
      },
      handleAddOption (Qindex, rowindex) { // 增加选项
        // console.log(Qindex, rowindex)
        var option = {
              'id': 0,
              'grading_id': 0,
              'question_id': 0,
              'name': null,
              'sort_index': 0
        }
        this.gradeInfo.question_list[Qindex].option_list.push(option)
      },
      addNewQuestion () { // 新增题目
        if (this.gradeInfo.question_list.length >= 5) {
          this.$alert('定级题目最多为5题', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            center: true,
            callback: action => {

            }
          })
          return false
        }
        var data = {
             'id': 0,
             'grading_id': 0,
             'name': null,
             'sort_index': 0,
             'option_list': [
                {
                     'id': 0,
                     'grading_id': 0,
                     'question_id': 0,
                     'name': null,
                     'sort_index': 0
                },
                {
                      'id': 0,
                      'grading_id': 0,
                      'question_id': 0,
                      'name': null,
                      'sort_index': 0
                }
            ]
        }
        this.gradeInfo.question_list.push(data)
      },
      deleteQestion (index) { // 删除题目
        this.gradeInfo.question_list.splice(index, 1)
      },
      goList () { // 取消保存
        this.$confirm('此操作不保存以数据, 返回定级列表?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$router.push({path: '/gradeList'})
        }).catch(() => {

        })
      },
      saveData () { // 保存前往下一步
        var that = this
        if ((!that.gradeInfo.name) || that.gradeInfo.name.length > 15) {
            that.errorTip = '请正确输入定级名称'
            return false
        }
        if (!that.gradeInfo.subject_id) {
            that.errorTip = '请选择学科'
            return false
        }
        if (!that.gradeInfo.grade_id) {
            that.errorTip = '请选择年级'
            return false
        }
        if (that.gradeInfo.province_ids.length <= 0) {
            that.errorTip = '请选择省份'
            return false
        }
        if (!that.gradeInfo.subject_id) {
            that.errorTip = '请选择学科'
            return false
        }
        for (var i = 0; i < that.gradeInfo.question_list.length; i++) {
            var questionItem = that.gradeInfo.question_list[i]
            if ((!questionItem.name) || questionItem.name.length > 50) {
                that.errorTip = '请完善题干'
                return false
            }
            for (var j = 0; j < questionItem.option_list.length; j++) {
              if (!questionItem.option_list[j].name) {
                  that.errorTip = '请完善题目答案'
                  return false
              }
            }
        }
        // console.log('传递的参数', that.gradeInfo)
        if (i == that.gradeInfo.question_list.length) {
           that.errorTip = ''
           that.loading = true
           savebaseinfo(that.gradeInfo, function (result) {
             // console.log('保存', result)
             if (result.stat == 1) {
               that.gradeInfo.id = result.data
               var timer = setTimeout(function () {
                  that.loading = false
                  that.$router.push({path: '/gradeRule?id=' + that.gradeInfo.id + '&isnew=' + that.isnew})
               }, 1000)
             } else if (result.stat == 0) {
               that.$alert(result.data, '操作失败', {
                 confirmButtonText: '确定',
                 showClose: false,
                 callback: action => {
                   that.loading = false
                 }
               })
             } else if (result.stat == 3) {
               that.loading = true
               that.$alert(result.data, '登录失效', {
                 confirmButtonText: '确定',
                 showClose: false,
                 callback: action => {
                    window.parent.location.href = 'http://admin.xesv5.com'
                 }
               })
             } else {
               that.loading = false
               that.$alert('网络异常，获取数据失败', '请求失败', {
                 confirmButtonText: '确定',
                 showClose: false,
                 callback: action => {
                 }
               })
             }
           })
        }
      }
  },
  created () { // 生命周期函数
    var that = this
    getstaticinfo(function (result) {
        // console.log('省年级学科', result)
        that.selectCourse = result.subjects
        that.selectGrade = result.grades
        if (that.$route.query.id) {
          that.ruleId = that.$route.query.id
          that.isnew = that.ruleId ? 1 : 0
          getbaseinfo(that.$route.query.id, function (msg) {
            // console.log('编辑定级第一页', msg)
            if (msg.stat == 1) {
                that.gradeInfo = msg.data
                that.initProvinceIds = msg.data.province_ids
                that.initGradeId = msg.data.grade_id
                that.initSubjectId = msg.data.subject_id
                that.gradeChange()
                that.getprovinceID()
            } else if (msg.stat == 0) {
              that.$alert(msg.data, '操作失败', {
                confirmButtonText: '确定',
                showClose: false,
                callback: action => {
                }
              })
            } else if (msg.stat == 3) {
              that.loading = true
              that.$alert(msg.data, '登录失效', {
                confirmButtonText: '确定',
                showClose: false,
                callback: action => {
                   window.parent.location.href = 'http://admin.xesv5.com'
                }
              })
            } else {
              that.loading = true
              that.$alert('网络异常，获取数据失败', '请求失败', {
                confirmButtonText: '确定',
                showClose: false,
                callback: action => {
                }
              })
            }
          })
        } else {
          that.selectProvince = result.provinces
          that.getprovinceID()
        }
    })
  }

}
</script>

<style>
.addGradeBox .addgrade-list h1{
   font-size: 18px;
   color: #333;
   font-weight: bold;
   margin-bottom: 15px;
   margin-top: 20px;

}
.addGradeBox .addgrade-list h1:nth-of-type(1){
  margin-top: 0;
}

.addGradeBox .addgrade-list h1.questionTitle .el-button{
  float: right;
  margin-top: -10px;
}
.addGradeBox .addgrade-list .gradeName-input{
   width: 400px;
}
.addGradeBox .addgrade-list .gradeRage-list{
  list-style: none;
  background: rgba(247, 247, 247, 1);
  padding: 10px 20px;
  border-radius: 5px;
}
.addGradeBox .addgrade-list .gradeRage-list h2{
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
}
.addGradeBox .addgrade-list .gradeRage-list li{
  margin-bottom: 30px;
}

.addGradeBox .addgrade-list .gradeRage-list .el-radio, .addGradeBox .addgrade-list .province-checkbox .el-checkbox{
  margin-left: 0;
  margin-right: 30px;
  margin-bottom: 5px;
}
.addGradeBox .addgrade-list .questionItem{
  background: rgba(247, 247, 247, 1);
  padding: 10px 20px;
  border-radius: 5px;
}
.addGradeBox .addgrade-list .questionItem p{
  font-size: 14px;
  margin: 20px 0 10px 0;
}
.addGradeBox .grade-footer{
  text-align: center;
  padding: 20px 0;

}
</style>

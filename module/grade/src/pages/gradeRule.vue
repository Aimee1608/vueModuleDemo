<template>
  <el-container class="container gradeRuleBox" v-loading="loading">
    <el-header>{{isnew==1?'编辑定级':'新增定级'}} <a href="#/gradeList">定级列表</a></el-header>
    <el-main>
      <h1>定级规则</h1>
      <div class="rulebox">
        <div class="ruleItem" v-for="(item, index) in ruleList" :key="item.id">
          <h2>组合{{index+1}}：</h2>
          <p v-for="(qitem, qindex) in item.question_list" :key="qitem.id">{{qitem.name + ':  ' + qitem.option.name }}</p>
          <ul >
            <li >
              <span >难度：</span>
              <el-select v-model="item.difficulty_id"  placeholder="请选择"  @change="difficultyChange(index)">
                <el-option :value="0" label="请选择难度"></el-option>
                <el-option
                  v-for="(ditem, dindex) in difficultyList"
                  :key="ditem.difficulty_id"
                  :label="ditem.name"
                  :value="ditem.difficulty_id">
                </el-option>
              </el-select> <span class="mustTip">*</span>
            </li>
            <li >
              <span >版本：</span>
              <el-select v-model="item.version_id" placeholder="请选择">
                <el-option :value="0" label="请选择版本"></el-option>
                <el-option
                  v-for="vitem in versionList[index]"
                  :key="vitem.version_id"
                  :label="vitem.name"
                  :value="vitem.version_id">
                </el-option>
              </el-select>
            </li>
            <li  class="leftTitle-col">
              <span>名称说明：</span>
              <el-input
                placeholder="请输入名称说明"
                v-model="item.abstruct_name"
                clearable>
              </el-input>
              <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="item.abstruct">
                </el-input>
                <span class="mustTip">*</span>
            </li>
            <li  >
              <el-checkbox  v-model="item.need_exam==1" @change="checkBoxChange(index)">需要考试</el-checkbox>
              <el-input class="link-input"
                placeholder="请输入内容"
                v-model="item.exam_url"
                :disabled="item.need_exam==0">
              </el-input>
              <span v-show="item.need_exam!=0" class="mustTip">*</span>
            </li>
          </ul>
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
        <el-button type="info" @click="cancleHandle()">取消</el-button>
        <el-button type="info" @click="goAddGrade()">上一步</el-button>
        <el-button type="primary" @click="saveData()">完成</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {getrulelist, saverule} from '@/assets/js/server.js'
export default {
  data () { // 选项 数据
    return {
      loading: false, // 加载遮罩
      errorTip: '', // 错误提示
      ruleId: '', // 规则ID
      checked: true, // 是否已选
      isnew: 0, // 新增
      difficultyList: [{ // 难度列表
            'difficulty_id': 1,
            'name': 'level1',
            'version_list': [{
                'version_id': 1,
                'name': '人教版'
              }, {
                'version_id': 2,
                'name': '人教版'
             }]
        }],
        ruleList: [{ // 答案组合列表
               'id': 1,
               'question_list': [{
                       'id': 1,
                       'name': '你多大了',
                       'sort_index': 1,
                       'option': {
                           'id': 1,
                           'name': '18岁',
                           'sort_index': 1
                      }
                  }, {
                       'id': 2,
                       'name': '你几岁',
                       'sort_index': 1,
                       'option': {
                           'id': 2,
                           'name': '18岁',
                           'sort_index': 1
                      }
                }],
               'difficulty_id': 0,
               'version_id': 1,
               'exam_url': 'http://www.baidu.com',
               'abstruct': '描述'
          }],
          versionList: [] // 版本列表
    }
  },
  components: { // 定义组件

  },
  methods: { // 事件处理方法
    checkBoxChange (index) {
      // console.log('el-checkbox改变', index)
      this.ruleList[index].need_exam = (this.ruleList[index].need_exam == 1 ? 0 : 1)
    },
    difficultyChange (index) { // 难度变化 版本选项变化
      for (var i = 0; i < this.difficultyList.length; i++) {
        if (this.difficultyList[i].difficulty_id == this.ruleList[index].difficulty_id) {
           this.versionList[index] = this.difficultyList[i].version_list
           // console.log(this.versionList[index], this.difficultyList[i].version_list)
           if (this.difficultyList[i].version_list.length == 1) {
             this.ruleList[index].version_id = this.difficultyList[i].version_list[0].version_id
           } else {
             this.ruleList[index].version_id = 0
           }
        }
      }
      // console.log('版本改变', index, this.ruleList[index].difficulty_id, this.versionList[index], this.ruleList[index].version_id)
    },
    cancleHandle () { // 取消编辑返回定级列表
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
    goAddGrade () { // 返回上一步
       this.$router.push({path: '/addGrade?id=' + this.ruleId})
    },
    saveData () { // 保存提交返回列表页
       var that = this
        for (var i = 0; i < that.ruleList.length; i++) {
           if (!that.ruleList[i].difficulty_id) {
              that.errorTip = '难度等级不能为空'
              return false
           }
           if (!that.ruleList[i].abstruct_name) {
              that.errorTip = '名称说明不能为空'
              return false
           }
           if (!that.ruleList[i].abstruct) {
              that.errorTip = '名称说明内容不能为空'
              return false
           }
           if (that.ruleList[i].need_exam == 1 && (!that.ruleList[i].exam_url)) {
              that.errorTip = '已选择需要考试，考试网址不能为空'
              return false
           }
        }
        if (i == that.ruleList.length) {
           that.errorTip = ''
           that.loading = true
           // console.log(that.ruleList)
           saverule(that.ruleId, that.ruleList, function (result) {
             // console.log('保存规则说明', result)
             if (result.stat == 1) {
               var timer = setTimeout(function () {
                  that.loading = false
                  that.$router.push({path: '/gradeList'})
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
               that.$alert(result.data, '登录失效', {
                 confirmButtonText: '确定',
                 showClose: false,
                 callback: action => {
                    window.parent.location.href = 'http://admin.manogyav5.com'
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
    pushversionList () { // 根据难度修改版本
      // console.log(999, this.versionList)
      for (var i = 0; i < this.ruleList.length; i++) {
        if (this.ruleList[i].difficulty_id) {
           for (var j = 0; j < this.difficultyList.length; j++) {
             if (this.difficultyList[j].difficulty_id == this.ruleList[i].difficulty_id) {
                this.versionList[i] = this.difficultyList[j].version_list
             }
           }
        } else {
          this.versionList[i] = {}
        }
      }
    }
  },
  created () { // 生命周期函数
    var that = this
    if (that.$route.query.id) {
      that.ruleId = that.$route.query.id
      that.isnew = that.$route.query.isnew
      getrulelist(that.$route.query.id, function (result) { // 获取规则列表
        // console.log('规则列表', result)
        if (result.stat == 1) {
          that.difficultyList = result.data.difficulty_list
          that.ruleList = result.data.rule_list
          that.pushversionList()
        } else if (result.stat == 0) {
          that.$alert(result.data, '获取数据失败', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        } else if (result.stat == 3) {
          that.loading = true
          that.$alert(result.data, '登录失效', {
            confirmButtonText: '确定',
            callback: action => {
               window.parent.location.href = 'http://admin.manogyav5.com'
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
    } else {
      that.$alert('网络异常，获取数据失败', '请求失败', {
        confirmButtonText: '确定',
        callback: action => {
          that.$router.push({path: '/gradeList'})
        }
      })
    }
  }

}
</script>

<style>
.gradeRuleBox h1{
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-bottom: 15px;
  margin-top: 20px;
}
.gradeRuleBox   h1:nth-of-type(1){
  margin-top: 0;
}
.gradeRuleBox .rulebox{
  background: rgba(247, 247, 247, 1);
  padding: 10px 20px;
  border-radius: 5px;
}
.gradeRuleBox .rulebox .ruleItem h2{
  font-size: 14px;
  color: #333;
  font-weight: bold;
  line-height: 1.5;

}
.gradeRuleBox .rulebox .ruleItem  p{
  font-size: 14px;
  line-height: 1.4;
}
.gradeRuleBox .rulebox .ruleItem ul{
  list-style: none;
  margin-top: 10px;
  margin-bottom: 10px;
}
.gradeRuleBox .rulebox .ruleItem ul li{
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 20px;
}
.gradeRuleBox .rulebox .ruleItem ul li .el-select{
  width: auto;
}
.gradeRuleBox .rulebox .ruleItem ul li .el-input{
  width: 130px;
}
.gradeRuleBox .rulebox .ruleItem ul li .el-textarea{
  width: auto;
  min-width: 300px;
  vertical-align: top;
}
.gradeRuleBox .rulebox .ruleItem ul li .link-input{
  width: 200px;
}
.gradeRuleBox .grade-footer{
  text-align: center;
  padding: 20px 0;
}
</style>

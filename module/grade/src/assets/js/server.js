import axios from 'axios'

const portUrl = 'http://bizadmin.manogyav5.com/'

// 获取定级列表 grading/getlist
const getlist = (provinceId, gradeId, subjectId, status, name, id, page, callback) => {
    let data = {
      'province_id': provinceId,
      'grade_id': gradeId,
      'subject_id': subjectId,
      'status': status,
      'name': name,
      'id': id,
      'page': page
    }
    let url = portUrl + 'grading/getlist'
    axios.get(url, {params: data}).then(function (num) {
       // console.log(num)
        callback && callback(num.data)
    }).catch((message) => {
        // 这里处理失败回调
        console.log(message)
        callback && callback(message)
    })
}

// 获取静态信息(省\年纪\学科) grading/getstaticinfo
const getstaticinfo = (callback) => {
  let url = portUrl + 'grading/getstaticinfo'
  axios.get(url).then(function (num) {
      callback && callback(num.data)
  }).catch((message) => {
      // 这里处理失败回调
      console.log(message)
      callback && callback(message)
  })
}

// 冻结/解冻定级 grading/switch
const switchHand = (id, status, callback) => {
  let url = portUrl + 'grading/switch'
  let data = {
    'id': id,
    'status': status
  }

  axios.post(url, data).then(function (num) {
    // console.log(num)
      callback && callback(num.data)
  }).catch((message) => {
      // 这里处理失败回调
      console.log(message)
      callback && callback(message)
  })
}

// 获取定级信息(编辑用第一页) grading/getbaseinfo
 const getbaseinfo = (id, callback) => {
   let url = portUrl + 'grading/getbaseinfo'
   let data = {
     'id': id
   }
   let result = {
    'stat': 1,
    'rows': 1,
    'data': {
        'id': 1,
        'grade_id': 1,
        'subject_id': 1,
        'name': '册书',
        'abstruct': '描述',
        'status': 0,
        'creator_id': 111,
        'creator_name': '管理员',
        'create_time': '2018-04-05 00:00:00',
        'modify_time': '2018-04-15 02:00:00',
        'is_deleted': 0,
        'province_ids': [
                1
       ],
        'question_list': [
           {
                'id': 1,
                'grading_id': 1,
                'name': '你多大了',
                'sort_index': 0,
                'option_list': [
                   {
                        'id': 1,
                        'grading_id': 1,
                        'question_id': 1,
                        'name': '18岁',
                        'sort_index': 0
                   },
                   {
                        'id': 2,
                        'grading_id': 1,
                        'question_id': 1,
                        'name': '19岁',
                        'sort_index': 0
                   },
                   {
                        'id': 3,
                        'grading_id': 1,
                        'question_id': 1,
                        'name': '20岁以上',
                        'sort_index': 0
                   }
               ]
           }
       ]}
     }
     // callback && callback(result)
   axios.get(url, {params: data}).then(function (num) {
     // console.log(num)
       callback && callback(num.data)
   }).catch((message) => {
       // 这里处理失败回调
       console.log(message)
       callback && callback(message)
   })
 }

// 保存定级信息(保存第一页) grading/savebaseinfo
const savebaseinfo = (data, callback) => {
  let url = portUrl + 'grading/savebaseinfo'
  axios.post(url, {data: JSON.stringify(data)}).then(function (num) {
      // console.log(num)
      callback && callback(num.data)
  }).catch((message) => {
      // 这里处理失败回调
      console.log(message)
      callback && callback(message)
  })
}

// 获取定级规则列表 grading/getrulelist
const getrulelist = (id, callback) => {
  let url = portUrl + 'grading/getrulelist?id=' + id
  var data = {
        'stat': 1,
        'rows': 1,
        'data': {
            'difficulty_list': [
               {
                   'difficulty_id': 1,
                   'name': 'level1',
                   'version_list': [{
                       'version_id': 1,
                       'name': '人教版'
                   }, {
                     'version_id': 2,
                     'name': '人教版'
                }]
               }
            ],
            'rule_list': [
               {
                    'id': 1,
                    'question_list': [
                       {
                            'id': 1,
                            'name': '你多大了',
                            'sort_index': 1,
                            'option': {
                                'id': 1,
                                'name': '18岁',
                                'sort_index': 1
                           }
                       },
                       {
                            'id': 2,
                            'name': '你几岁',
                            'sort_index': 1,
                            'option': {
                                'id': 2,
                                'name': '18岁',
                                'sort_index': 1
                           }
                       }
                   ],
                    'difficulty_id': 0,
                    'version_id': 1,
                    'exam_url': 'http://www.baidu.com',
                    'abstruct': '描述'
               }
           ]
       }
    }
  // callback && callback(data)
  axios.get(url).then(function (num) {
    // console.log(num)
    callback && callback(num.data)
  }).catch((message) => {
    console.log(message)
    callback && callback(message)
  })
}

// 保存定级信息(保存第二页) grading/saverule
const saverule = (id, data, callback) => {
  let url = portUrl + 'grading/saverule'
  axios.post(url, {id: id, data: JSON.stringify(data)}).then(function (num) {
    // console.log(num)
    callback && callback(num.data)
  }).catch((message) => {
    console.log(message)
    callback && callback(message)
  })
}

// 根据学科年纪获取已配置省份 grading/getprovincebyparams
const getprovincebyparams = (gradeId, subjectId, callback) => {
  let url = portUrl + 'grading/getprovincebyparams'
  var data = {'grade_id': gradeId, 'subject_id': subjectId}
  axios.get(url, {params: data}).then(function (num) {
    // console.log(num)
    callback && callback(num.data)
  }).catch((message) => {
    console.log(message)
    callback && callback(message)
  })
}

export {
  getlist,
  getstaticinfo,
  switchHand,
  getbaseinfo,
  savebaseinfo,
  getrulelist,
  saverule,
  getprovincebyparams
}

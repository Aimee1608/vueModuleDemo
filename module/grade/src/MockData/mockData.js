import Mock from 'mockjs'
Mock.setup({
  // timeout: 6000
})
// 当前直播接口
export const liveRemind = Mock.mock(/\/\/i.xueersi.com\/MyCourses\/ajaxStudyRemindNew[\w\W]?/, {
  'stat': 1,
  'data': {
    'rows': 15,
    'haveCurrentLive': 1,
    'currentLive': {
      'name': '谁说',
      'type': 0,
      'mode': '3',
      'package_id': '10425',
      'outline_id': '21989',
      'catalog_id': '21989',
      'teacher_id': '1649',
      'day': '2017-11-28',
      'end_time': '22: 00',
      'stime': '1511859600',
      'etime': '1511877600',
      'is_playback': '1',
      'is_audition': '0',
      'status': '1',
      'creater_id': '10121',
      'create_time': '2017-11-15 14: 58: 23',
      'modify_time': '2017-11-15 14: 58: 29',
      'category': 1,
      'group_id': 138794,
      'is_show': 1,
      'teacher_ids': '1649',
      'real_outline_id': '1380',
      'is_del': 0,
      'stuCouId': '4127288',
      'course_id': '38794',
      'course_name': '我问你是不是想不想继续上不上这个课了',
      'teacher': [
          {
              'id': '1649',
              'name': 'bill01',
              'imgUrl': 'http: //r04.xesimg.com/web/2015/12/21/14506863061774.png'
          }
      ],
      'teacherNum': 1,
      'courseId': '38794',
      'courseName': '我问你是不是想不想继续上不上这个课了',
      'subjectIds': '1',
      'startTime': '17: 00',
      'clickUrl': 'https://live.xueersi.com/live/index/108957/7d0bedde76fe1c7f726442f0a55fda58'
    }
  }
})
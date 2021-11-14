// 初始化dayjs的相关配置，进行封装
import dayjs from 'dayjs'
// 配置中文语言
import 'dayjs/locale/zh-cn'
// 使用相对时间
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
// console.log(dayjs('2020-1-1').from(dayjs()))
export { dayjs }

/*
 * @Author: your name
 * @Date: 2021-12-29 09:53:56
 * @LastEditTime: 2022-01-06 13:46:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oms.fandow.come:\my_work\oauth.fandow.com\src\assets\js\permissions-manage\Astatic-variable.js
 */
import { reactive } from 'vue'
const pageTips: string = `Authing 的权限系统基于 RBAC（Role-based access control，
基于角色的访问控制）并可以通过环境属性进行更细粒度的权限控制。
既可以管理你的业务系统实体资源，也能管理你的应用中的菜单、按钮等资源权限`
const tabsRescoureTips: string = `Authing 中的资源是你的业务系统中实际资源的标识符，一个资源可以是你的业务系统中的某一个实体，
如 Order，我们也可以对 order 设定一个具体的操作，如：order:read；资源也可以是 UI 界面上的某一个菜单，一个按钮。
当你把所有业务资源都在 Authing 中创建以后，就能控制对它们的访问、修改等权限。`
const tabsRoleTips: string = `角色可以理解为一组权限的集合，每个用户能被授予一个或多个角色，这种用户-角色、角色-权限间的关系，
让我们可以不用再单独管理单个用户。`
const tabsAuthorTips: string = `通过一定的授权规则，将资源的访问、修改等权限授予某些主体。`
const drawerResourceTips: string = `Authing 中的资源是你的业务系统中实际资源的标识符，一个资源可以是你的业务系统中的某一个实体，
如 Order，我们也可以对 order 设定一个具体的操作，如：order:read；资源也可以是 UI 界面上的某一个菜单，一个按钮。
当你把所有业务资源都在 Authing 中创建以后，就能控制对它们的访问、修改等权限。` 
// tabs配置
const tabsTtitleList = reactive([
  { name: 'resource', label: '资源管理', isClick: true, tip: tabsRescoureTips, addTag: '添加资源' },
  { name: 'role', label: '角色管理', isClick: false, tip: tabsRoleTips, addTag: '添加角色' },
  { name: 'assignment', label: '授权', isClick: false, tip: tabsAuthorTips, addTag: '添加授权' },
])

const roleList = reactive([
  { role: '宇智波佐助', desc: '啊吧啊吧', createTime: '2021-12-31' },
  { role: '宇智波佐助', desc: '啊吧啊吧', createTime: '2021-12-31' },
  { role: '宇智波佐助', desc: '啊吧啊吧', createTime: '2021-12-31' },
  { role: '宇智波佐助', desc: '啊吧啊吧', createTime: '2021-12-31' },
])
const resourceList = reactive([
  { name: '宇智波佐助', type: '啊吧啊吧', createTime: '2021-12-31' },
  { name: '宇智波佐助', type: '啊吧啊吧', createTime: '2021-12-31' },
  { name: '宇智波佐助', type: '啊吧啊吧', createTime: '2021-12-31' },
  { name: '宇智波佐助', type: '啊吧啊吧', createTime: '2021-12-31' },
])
const assignmentList = reactive([
  { targetName: '宇智波佐助', targetType: '啊吧啊吧', createTime: '2021-12-31' },
  { targetName: '宇智波佐助', targetType: '啊吧啊吧', createTime: '2021-12-31' },
  { targetName: '宇智波佐助', targetType: '啊吧啊吧', createTime: '2021-12-31' },
  { targetName: '宇智波佐助', targetType: '啊吧啊吧', createTime: '2021-12-31' },
])

const authorizedTargetList = [
  { targetId: 1, targetName: '尼玛' },
  { targetId: 2, targetName: '666' },
  { targetId: 3, targetName: '可以' },
  { targetId: 4, targetName: '李瑞勇' },
  { targetId: 5, targetName: '陈瑞勇' },
  { targetId: 6, targetName: '张瑞勇' },
  { targetId: 7, targetName: '王瑞永' },
  { targetId: 8, targetName: '林瑞勇' },
]
const roleTargetList = [
  { targetId: 1, targetName: '前端开发' },
  { targetId: 2, targetName: '后端开发' },
  { targetId: 3, targetName: '管理员' },
  { targetId: 4, targetName: '人事人员' },
  { targetId: 5, targetName: '财务人员' },
  { targetId: 6, targetName: '总经理' },
  { targetId: 7, targetName: '呵呵哒' },
  { targetId: 8, targetName: '奥利给' },
]
const deptTargetList = [
  { targetId: 1, targetName: 'it开发发部' },
  { targetId: 2, targetName: '人力资源部' },
  { targetId: 3, targetName: '财务部' },
  { targetId: 4, targetName: '总经办' },
  { targetId: 5, targetName: '行政部' },
  { targetId: 6, targetName: '生产部' },
  { targetId: 7, targetName: '产品研发部' },
  { targetId: 8, targetName: '奥利给部' },
]
const groupTest = [
  { name: '系统权限组', isClick: true },
  { name: '示例应用', isClick: false },
  { name: '李瑞勇', isClick: false },
  { name: '刘衣衣', isClick: false },
  { name: '陈帆', isClick: false },
  { name: '微医生', isClick: false },
  { name: '阿里巴巴', isClick: false },
  { name: '阿里蚂蚁', isClick: false },
  { name: '欧巴', isClick: false },
  { name: '小丑巴基', isClick: false },
]
export { 
  pageTips, 
  groupTest, 
  tabsTtitleList, 
  roleList,
  resourceList,
  assignmentList,
  drawerResourceTips,
  authorizedTargetList,
  roleTargetList,
  deptTargetList
}

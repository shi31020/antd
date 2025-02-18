import component from '@/locales/bn-BD/component';

/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    name: '课程查询',
    path: '/',
    component: './Query',
  },
  {
    path: '/selection',
    name: '学生选课',
    access: 'canStudent',
    component: './Students/SelectCourse',
  },
  {
    path: '/cancel',
    name: '学生退选',
    access: 'canStudent',
    component: './Students/DeleteCourse',
  },
  {
    path: '/rank',
    name: '选课排名',
    access: 'canStudent',
    component: './Students/CourseRanking',
  },
  {
    path: '/creditstatus',
    name: '学分完成情况',
    access: 'canStudent',
    component: './Students/CreditStatus',
  },
  {
    path: '/management',
    name: '课程管理',
    access: 'canTeacher',
    component: './Teachers/CourseManagement',
  },
  {
    path: '/marking',
    component: '@/pages/Teachers/Marking',
    menu: false, // 不可见
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/approval',
      },
      {
        path: '/admin',
        redirect: '/admin/modify',
      },
      {
        path: '/admin',
        redirect: '/admin/register',
      },
      {
        path: '/admin/approval',
        name: '开课申请审核',
        component: './Admin/Approval',
      },
      {
        path: '/admin/modify',
        name: '课程信息修改',
        component: './Admin/Modify',
      },
      {
        path: '/admin/register',
        name: '用户注册',
        component: './Admin/Register',
      },
    ],
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];

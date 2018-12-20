import Vue from 'vue'
import Router from 'vue-router'

// 微信授权处理
import wxAuth from '@/service/wx-auth'

const Error404 = resolve => require(['@/views/error-404'], resolve)
const ErrorAuth = resolve => require(['@/views/error-auth'], resolve)

// C端签到
const SignInIndex = resolve =>
  require(/* webpackChunkName: "sign-in" */ ['@/views/customer/sign-in/index'], resolve) // 首页

// C端众筹
const CrowdFundingIndex = resolve =>
  require(/* webpackChunkName: "crowd-funding" */ ['@/views/customer/crowd-funding/index'], resolve) // 首页
const CrowdFundingRecords = resolve =>
  require(/* webpackChunkName: "crowd-funding" */ [
    '@/views/customer/crowd-funding/records'
  ], resolve) // 记录

/* 组件演示 demo */
const IndexDemo = resolve => require(/* webpackChunkName: "demo" */ ['@/views/demo/index'], resolve) // 首页
const ScrollerDemo = resolve =>
  require(/* webpackChunkName: "demo" */ ['@/views/demo/scroller'], resolve) // 滚动组件
const ToastDemo = resolve => require(/* webpackChunkName: "demo" */ ['@/views/demo/toast'], resolve) // 提示
const DialogDemo = resolve =>
  require(/* webpackChunkName: "demo" */ ['@/views/demo/dialog'], resolve) // 对话框
const AlertDemo = resolve => require(/* webpackChunkName: "demo" */ ['@/views/demo/alert'], resolve) // 警告框
const ConfirmDemo = resolve =>
  require(/* webpackChunkName: "demo" */ ['@/views/demo/confirm'], resolve) // 确认框
const FormDemo = resolve => require(/* webpackChunkName: "demo" */ ['@/views/demo/form'], resolve) // 确认框
const LayoutDemo = resolve =>
  require(/* webpackChunkName: "demo" */ ['@/views/demo/layout'], resolve) // 确认框

Vue.use(Router)
let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      component: Error404
    },
    {
      path: '/',
      component: Error404
    },

    // error
    {
      path: '/error-auth',
      component: ErrorAuth
    },

    // C端签到
    {
      path: '/customer/sign-in/index',
      component: SignInIndex
    },

    // C端众筹
    {
      path: '/customer/crowd-funding/index',
      component: CrowdFundingIndex
    },
    {
      path: '/customer/crowd-funding/records',
      component: CrowdFundingRecords
    },

    // Demo
    {
      path: '/demo/index',
      component: IndexDemo
    },
    {
      path: '/demo/scroller',
      component: ScrollerDemo
    },
    {
      path: '/demo/toast',
      component: ToastDemo
    },
    {
      path: '/demo/dialog',
      component: DialogDemo
    },
    {
      path: '/demo/alert',
      component: AlertDemo
    },
    {
      path: '/demo/confirm',
      component: ConfirmDemo
    },
    {
      path: '/demo/form',
      component: FormDemo
    },
    {
      path: '/demo/layout',
      component: LayoutDemo
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
router.beforeEach((to, from, next) => {
  let token = to.query.token
  if (token) {
    wxAuth.saveAuthPatams(token)
  }
  next()
})
export default router

import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import base from '@/components/1_base'
import chartPreview from '@/components/2_chartPreview'
import node from '@/components/3_node'
import nodeSetColor from '@/components/4_nodeSetColor'
import customPlatter from '@/components/5_customPlatter'
import xmlToJson from '@/components/6_xmlToJson'
import jsonToXml from '@/components/7_jsonToXml'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '导航页',
      component: index
    },
    {
      path: '/base',
      name: '基础篇',
      component: base
    },
    {
      path: '/chartPreview',
      name: '流程图预览篇',
      component: chartPreview
    },
    {
      path: '/node',
      name: '节点篇',
      component: node
    },
    {
      path: '/nodeSetColor',
      name: '节点添加颜色',
      component: nodeSetColor
    },
    {
      path: '/customPlatter',
      name: '自定义Platter',
      component: customPlatter
    },
    {
      path: '/xmlToJson',
      name: 'xml转json',
      component: xmlToJson
    },
    {
      path: '/jsonToXml',
      name: 'json转xml',
      component: jsonToXml
    }
  ]
})

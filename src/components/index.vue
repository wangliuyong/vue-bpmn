<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-link type="primary" @click="chartDetail('base')">基础篇</el-link>
    <el-link type="primary" @click="chartDetail('chartPreview')">流程图预览篇</el-link>
    <el-link type="primary" @click="chartDetail('node')">节点篇</el-link>
    <el-link type="primary" @click="chartDetail('nodeSetColor')">节点添加颜色</el-link>
    <el-link type="primary" @click="chartDetail('customPlatter')">自定义platter</el-link>
    <el-link type="primary" @click="chartDetail('xmlToJson')">xml转json</el-link>
    <el-link type="primary" @click="chartDetail('jsonToXml')">json转xml</el-link>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        msg: 'A vue project with bpmn, Welcome'
      }
    },
    methods: {
      chartDetail (code) {
        this.$router.push({path: `/${code}`})
      }
    }
  }
</script>

<style scoped>
</style>

<template>
  <div class="containerBox">
    <el-button-group>
      <el-button type="primary" size="mini" @click="handleUndo">后退</el-button>
      <el-button type="success" size="mini" @click="handleRedo">前进</el-button>
      <el-button type="warning" size="mini" @click="handleDownload">下载</el-button>
      <el-upload
        style="display: inline-block;"
        :file-list="fileList"
        class="upload-demo"
        action=""
        :auto-upload="false"
        :show-file-list="false"
        :http-request="httpRequest"
        :on-change="handleOnchangeFile"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
      >
        <el-button type="danger" size="mini">导入</el-button>
      </el-upload>
    </el-button-group>
    <div id="container"></div>
  </div>
</template>
<script>
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  import camundaExtension from './camunda'

  export default {
    name: 'index',
    data () {
      return {
        containerEl: null,
        bpmnModeler: null,
        fileList: []
      }
    },
    mounted () {
      this.containerEl = document.getElementById('container')
      this.bpmnModeler = new BpmnModeler({
        container: this.containerEl,
        moddleExtensions: {camunda: camundaExtension}
      })
      this.create()
    },
    methods: {
      create () {
        this.bpmnModeler.createDiagram(() => {
          this.bpmnModeler.get('canvas').zoom('fit-viewport')
        })
      },
      handleRemove (file) {
        for (let i = 0; i < this.fileList.length; i++) {
          if (file.name === this.fileList[i].name) {
            this.fileList.splice(i, 1)
          }
        }
      },
      beforeRemove (file) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      // 后退
      handleUndo () {
        this.bpmnModeler.get('commandStack').undo()
      },
      // 前进
      handleRedo () {
        this.bpmnModeler.get('commandStack').redo()
      },
      handleDownload () {
        this.bpmnModeler.saveXML({format: true}, (err, data) => {
          const dataTrack = 'bpmn'
          const a = document.createElement('a')
          const name = `diagram.${dataTrack}`
          a.setAttribute(
            'href',
            `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`
          )
          a.setAttribute('target', '_blank')
          a.setAttribute('dataTrack', `diagram:download-${dataTrack}`)
          a.setAttribute('download', name)
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        })
      },
      handleOnchangeFile (file) {
        const reader = new FileReader()
        let data = ''
        reader.readAsText(file.raw)
        reader.onload = (event) => {
          data = event.target.result
          this.bpmnModeler.importXML(data, (err) => {
            if (err) {
              this.$message.info('导入失败')
            } else {
              this.$message.success('导入成功')
            }
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  .containerBox {
    height: calc(100vh - 220px);
    position: relative;

    #container {
      height: calc(100% - 50px);
    }
  }
</style>

<template>
  <div class="container">
    <el-button type="primary" @click="previewTemp">预览</el-button>
    <el-button type="success" @click="handleZoom(1)">放大</el-button>
    <el-button type="warning" @click="handleZoom(-1)">缩小</el-button>
    <div class="chart-preview">
      <div style="clear: both;"></div>
      <div class="view-canvas">
        <div id="container"
             v-bind:style="{width: 100 * scale + '%',height: 100 * scale + '%'}"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
  import jquery from 'jquery';
  import BpmnViewer from 'bpmn-js/lib/Viewer';
  export default {
    data() {
      return {
        containerEl: null,
        bpmnModeler: null,
        scale: 1,
        currentCanvasXml: '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
          '  <bpmn:process id="Process_1" isExecutable="false">\n' +
          '    <bpmn:startEvent id="StartEvent_1">\n' +
          '      <bpmn:outgoing>Flow_021z3si</bpmn:outgoing>\n' +
          '    </bpmn:startEvent>\n' +
          '    <bpmn:serviceTask id="Activity_1fru9kc" name="第一个节点">\n' +
          '      <bpmn:incoming>Flow_021z3si</bpmn:incoming>\n' +
          '      <bpmn:outgoing>Flow_1hwj8kv</bpmn:outgoing>\n' +
          '    </bpmn:serviceTask>\n' +
          '    <bpmn:sequenceFlow id="Flow_021z3si" sourceRef="StartEvent_1" targetRef="Activity_1fru9kc">\n' +
          '    </bpmn:sequenceFlow>\n' +
          '    <bpmn:userTask id="Activity_0ozmm5p" name="第二个节点">\n' +
          '      <bpmn:incoming>Flow_1hwj8kv</bpmn:incoming>\n' +
          '      <bpmn:outgoing>Flow_1tbnntc</bpmn:outgoing>\n' +
          '    </bpmn:userTask>\n' +
          '    <bpmn:sequenceFlow id="Flow_1hwj8kv" sourceRef="Activity_1fru9kc" targetRef="Activity_0ozmm5p">\n' +
          '    </bpmn:sequenceFlow>\n' +
          '    <bpmn:sequenceFlow id="Flow_1tbnntc" sourceRef="Activity_0ozmm5p" targetRef="Event_03kmy6i">\n' +
          '    </bpmn:sequenceFlow>\n' +
          '    <bpmn:endEvent id="Event_03kmy6i">\n' +
          '      <bpmn:incoming>Flow_1tbnntc</bpmn:incoming>\n' +
          '    </bpmn:endEvent>\n' +
          '  </bpmn:process>\n' +
          '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
          '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
          '      <bpmndi:BPMNEdge id="Flow_021z3si_di" bpmnElement="Flow_021z3si">\n' +
          '        <di:waypoint x="209" y="120" />\n' +
          '        <di:waypoint x="290" y="120" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '      <bpmndi:BPMNEdge id="Flow_1hwj8kv_di" bpmnElement="Flow_1hwj8kv">\n' +
          '        <di:waypoint x="390" y="120" />\n' +
          '        <di:waypoint x="480" y="120" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '      <bpmndi:BPMNEdge id="Flow_1tbnntc_di" bpmnElement="Flow_1tbnntc">\n' +
          '        <di:waypoint x="580" y="120" />\n' +
          '        <di:waypoint x="642" y="120" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
          '        <dc:Bounds x="173" y="102" width="36" height="36" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape id="Activity_1fru9kc_di" bpmnElement="Activity_1fru9kc">\n' +
          '        <dc:Bounds x="290" y="80" width="100" height="80" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape id="Activity_0ozmm5p_di" bpmnElement="Activity_0ozmm5p">\n' +
          '        <dc:Bounds x="480" y="80" width="100" height="80" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape id="Event_03kmy6i_di" bpmnElement="Event_03kmy6i">\n' +
          '        <dc:Bounds x="642" y="102" width="36" height="36" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape id="Activity_0lkkmka_di">\n' +
          '        <dc:Bounds x="820" y="80" width="100" height="80" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNEdge id="Flow_1t2mucq_di">\n' +
          '        <di:waypoint x="920" y="120" />\n' +
          '        <di:waypoint x="1012" y="120" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '    </bpmndi:BPMNPlane>\n' +
          '  </bpmndi:BPMNDiagram>\n' +
          '</bpmn:definitions>'
      };
    },
    methods: {
      handleZoom(flag) {
        if (flag < 0 && this.scale <= 1) {
          return;
        }
        this.scale += flag;
        this.$nextTick(() => {
          this.bpmnModeler.get('canvas').zoom('fit-viewport');
        });
      },
      previewTemp() {
        this.containerEl = document.getElementById('container');
        // 避免缓存，每次清一下
        this.bpmnModeler && this.bpmnModeler.destroy();
        this.scale = 1;
        this.bpmnModeler = new BpmnViewer({container: this.containerEl});
        const viewer = this.bpmnModeler;
        this.bpmnModeler.importXML(this.currentCanvasXml, (err) => {
          if (err) {
            console.error(err);
          } else {
            // 只实现预览，核心代码以下两句足够
            const canvas = viewer.get('canvas');
            canvas.zoom('fit-viewport');
            // 以下代码为：为节点注册鼠标悬浮事件
            const eventBus = this.bpmnModeler.get('eventBus');
            const overlays = this.bpmnModeler.get('overlays');
            eventBus.on('element.hover', (e) => {
              const $overlayHtml = jquery(` <div class="tipBox">
                    你好，我是悬浮框里的内容
                    </div>`);
              overlays.add(e.element.id, {
                position: {top: e.element.height, left: 0},
                html: $overlayHtml
              });
            });
            eventBus.on('element.out', () => {
              overlays.clear();
            });
            //  注册悬浮事件结束
          }
        });
      }
    }
  };
</script>
<style lang="scss">
  .container {
    .tipBox {
      width: 200px;
      background: #fff;
      border-radius: 4px;
      border: 1px solid #ebeef5;
      padding: 12px;
    }
  }
</style>

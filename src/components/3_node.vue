<template>
  <div class="containerBox">
    <div style="margin-left: 250px">
      通过输入框更改节点名称：
      <el-input
        v-model.trim="nodeName"
        placeholder="请输入节点名称"
        clearable
        @input="inputChange"
        style="width: 200px">
      </el-input>
    </div>
    <div id="container"></div>
  </div>
</template>
<script>
  import BpmnModeler from 'bpmn-js/lib/Modeler';
  import camundaExtension from './camunda';

  export default {
    name: '3_node',
    data() {
      return {
        containerEl: null,
        bpmnModeler: null,
        currentElement: {},
        nodeName: "",
        chart: '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
          '<bpmn:process id="Process_1" isExecutable="false">\n' +
          '<bpmn:startEvent id="StartEvent_1">\n' +
          '<bpmn:outgoing>Flow_021z3si</bpmn:outgoing>\n' +
          '</bpmn:startEvent>\n' +
          '<bpmn:serviceTask id="Activity_1fru9kc" name="我是第一个节点">\n' +
          '<bpmn:incoming>Flow_021z3si</bpmn:incoming>\n' +
          '<bpmn:outgoing>Flow_1hwj8kv</bpmn:outgoing>\n' +
          '</bpmn:serviceTask>\n' +
          '<bpmn:sequenceFlow id="Flow_021z3si" sourceRef="StartEvent_1" targetRef="Activity_1fru9kc"> </bpmn:sequenceFlow>\n' +
          '<bpmn:userTask id="Activity_0ozmm5p" name="第二名">\n' +
          '<bpmn:incoming>Flow_1hwj8kv</bpmn:incoming>\n' +
          '<bpmn:outgoing>Flow_1tbnntc</bpmn:outgoing>\n' +
          '</bpmn:userTask>\n' +
          '<bpmn:sequenceFlow id="Flow_1hwj8kv" sourceRef="Activity_1fru9kc" targetRef="Activity_0ozmm5p"> </bpmn:sequenceFlow>\n' +
          '<bpmn:sequenceFlow id="Flow_1tbnntc" sourceRef="Activity_0ozmm5p" targetRef="Event_03kmy6i"> </bpmn:sequenceFlow>\n' +
          '<bpmn:endEvent id="Event_03kmy6i">\n' +
          '<bpmn:incoming>Flow_1tbnntc</bpmn:incoming>\n' +
          '</bpmn:endEvent>\n' +
          '</bpmn:process>\n' +
          '<bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
          '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
          '<bpmndi:BPMNEdge id="Flow_021z3si_di" bpmnElement="Flow_021z3si">\n' +
          '<di:waypoint x="209" y="120"/>\n' +
          '<di:waypoint x="290" y="120"/>\n' +
          '</bpmndi:BPMNEdge>\n' +
          '<bpmndi:BPMNEdge id="Flow_1hwj8kv_di" bpmnElement="Flow_1hwj8kv">\n' +
          '<di:waypoint x="390" y="120"/>\n' +
          '<di:waypoint x="480" y="120"/>\n' +
          '</bpmndi:BPMNEdge>\n' +
          '<bpmndi:BPMNEdge id="Flow_1tbnntc_di" bpmnElement="Flow_1tbnntc">\n' +
          '<di:waypoint x="580" y="120"/>\n' +
          '<di:waypoint x="672" y="120"/>\n' +
          '</bpmndi:BPMNEdge>\n' +
          '<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
          '<dc:Bounds x="173" y="102" width="36" height="36"/>\n' +
          '</bpmndi:BPMNShape>\n' +
          '<bpmndi:BPMNShape id="Activity_1fru9kc_di" bpmnElement="Activity_1fru9kc">\n' +
          '<dc:Bounds x="290" y="80" width="100" height="80"/>\n' +
          '</bpmndi:BPMNShape>\n' +
          '<bpmndi:BPMNShape id="Activity_0ozmm5p_di" bpmnElement="Activity_0ozmm5p">\n' +
          '<dc:Bounds x="480" y="80" width="100" height="80"/>\n' +
          '</bpmndi:BPMNShape>\n' +
          '<bpmndi:BPMNShape id="Event_03kmy6i_di" bpmnElement="Event_03kmy6i">\n' +
          '<dc:Bounds x="672" y="102" width="36" height="36"/>\n' +
          '</bpmndi:BPMNShape>\n' +
          '<bpmndi:BPMNShape id="Activity_0lkkmka_di">\n' +
          '<dc:Bounds x="820" y="80" width="100" height="80"/>\n' +
          '</bpmndi:BPMNShape>\n' +
          '<bpmndi:BPMNEdge id="Flow_1t2mucq_di">\n' +
          '<di:waypoint x="920" y="120"/>\n' +
          '<di:waypoint x="1012" y="120"/>\n' +
          '</bpmndi:BPMNEdge>\n' +
          '</bpmndi:BPMNPlane>\n' +
          '</bpmndi:BPMNDiagram>\n' +
          '</bpmn:definitions>'
      };
    },
    mounted() {
      this.containerEl = document.getElementById('container');
      this.bpmnModeler = new BpmnModeler({
        container: this.containerEl,
        moddleExtensions: {camunda: camundaExtension}
      });
      this.showChart();
    },
    methods: {
      getShapeById() {
        const elementRegistry = this.bpmnModeler.get('elementRegistry');
        console.log(elementRegistry.get('Activity_0ozmm5p'));
      },
      inputChange(val) {
        const modeling = this.bpmnModeler.get('modeling');
        if (JSON.stringify(this.currentElement) === '{}') {
          this.$message.info('请保证要更改的节点处于选中状态!');
          return false;
        } else {
          modeling.updateLabel(this.currentElement, val);
        }
      },
      // 流程图回显
      showChart() {
        this.bpmnModeler.importXML(this.chart, (err) => {
          if (!err) {
            this.addEventBusListener();
            this.getNodeInfoList();
            this.getShapeById();
          }
        });
      },
      // 获取流程图中所有节点信息
      getNodeInfoList() {
        const elementRegistry = this.bpmnModeler.get('elementRegistry');
        const userTaskList = elementRegistry.filter(
          (item) => item.type === 'bpmn:UserTask'
        );
        // 此时得到的userTaskList 便是流程图中所有的用户节点的集合
        console.log(userTaskList);
      },
      addEventBusListener() {
        const eventBus = this.bpmnModeler.get('eventBus');
        // 注册节点事件，eventTypes中可以写多个事件
        const eventTypes = ['element.click', 'element.hover'];
        eventTypes.forEach((eventType) => {
          eventBus.on(eventType, (e) => {
            const {element} = e;
            if (!element.parent) return;
            if (!e || element.type === 'bpmn:Process') {
              return false;
            } else {
              if (eventType === 'element.click') {
                // 节点点击后想要做的处理
                // 此时想要点击节点后，拿到节点实例，通过外部输入更新节点名称
                this.currentElement = element;
              } else if (eventType === 'element.hover') {
                // 鼠标滑过节点后想要做的处理
                console.log('鼠标经过节点啦~');
              }
            }
          });
        });
      }
    }
  };
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

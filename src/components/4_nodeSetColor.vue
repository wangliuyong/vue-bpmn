<template>
  <div class="containerBox">
    <div id="container"></div>
    <div style="margin-left: 200px">看我！我是点击的节点名称啊~
      <span style="color: #eaae00">{{nodeName}}</span>
    </div>
  </div>
</template>
<script>
  import BpmnModeler from 'bpmn-js/lib/Modeler';
  import camundaExtension from './camunda';
  import $ from 'jquery';

  export default {
    name: 'nodeSetColor',
    data() {
      return {
        containerEl: null,
        bpmnModeler: null,
        nodeName: '',
        nodeList: [],
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
      // 流程图回显
      showChart() {
        this.bpmnModeler.importXML(this.chart, (err) => {
          if (!err) {
            this.addEventBusListener();
            this.setNodeColor();
          }
        });
      },
      setNodeColor() {
        // 目的：为第一个节点添加绿色，为第二个节点添加黄色
        // 实现步骤：1、找到页面里所有节点
        const elementRegistry = this.bpmnModeler.get('elementRegistry');
        this.nodeList = elementRegistry.filter (
          (item) => item.type === 'bpmn:UserTask' || item.type === 'bpmn:ServiceTask'
        );
        // 此时得到的userTaskList 便是流程图中所有的节点的集合
        console.log(this.nodeList);
        // 步骤2 ：为节点添加颜色
        // 方式1 ：modeling.setColor(参数1：节点，可以是单个元素实例，也可是多个节点组成的数组，参数2：class类);
        let modeling = this.bpmnModeler.get('modeling');
        modeling.setColor(this.nodeList[0], {
          stroke: 'green',
          fill: 'yellow'
        });
        // 方式2 ：添加蒙板
        const overlays = this.bpmnModeler.get('overlays');
        const shape = elementRegistry.get(this.nodeList[1].id);
        if (shape) {
          const $overlayHtml = $('<div class="highlight-overlay">').css({
            width: shape.width,
            height: shape.height
          });
          overlays.add(this.nodeList[1].id, {
            position: {top: 0, left: 0},
            html: $overlayHtml
          });
        }
        // 此方法为了解决方式2造成的节点点击事件失效问题，如果采用方式1，可忽略此方法
        this.overlayClick();
      },
      overlayClick() {
        $(".djs-container").on("click", ".djs-overlays", (e) => {
          const parentEle = e.target.parentElement.parentElement;
          const shapeId = parentEle.getAttribute('data-container-id');
          const temp = this.nodeList.filter(
            (item) => item.id === shapeId
          )[0];
          this.nodeName = temp ? temp.businessObject.name : '';
        });
      },
      addEventBusListener() {
        const eventBus = this.bpmnModeler.get('eventBus');
        // 为节点注册点击事件，点击节点，下方显示点击的节点名称
        eventBus.on('element.click', (e) => {
          const {element} = e;
          if (!element.parent) return;
          if (!e || element.type === 'bpmn:Process') {
            return false;
          } else {
            this.nodeName = element.businessObject.name;
          }
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
    .highlight-overlay {
      background-color: green;
      opacity: 0.4;
      border-radius: 10px;
    }
  }
</style>

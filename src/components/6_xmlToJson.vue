<template>
  <div class="containerBox">
    <div id="container"></div>
    <div class="nodeInfo">
      <el-form size="mini" label-width="80px" :model="form">
        <el-form-item label="昵称：">
          <el-input v-model.trim="form.selfName" style="width: 25%"></el-input>
        </el-form-item>
        <el-form-item label="年龄：">
          <el-checkbox-group v-model="form.interestFood">
            <el-checkbox label="苹果"></el-checkbox>
            <el-checkbox label="香蕉"></el-checkbox>
            <el-checkbox label="草莓蛋糕"></el-checkbox>
            <el-checkbox label="西瓜"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <h4>详细信息</h4>
        <el-form-item label="班级：">
          <el-input v-model.trim="form.nodeDesc.class" style="width: 25%"></el-input>
        </el-form-item>
        <el-form-item label="年龄：">
          <el-input v-model.trim="form.nodeDesc.age" style="width: 25%"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import BpmnModeler from 'bpmn-js/lib/Modeler';
  import camundaExtension from './camunda.json';

  export default {
    name: 'xmlToJson',
    data() {
      return {
        containerEl: null,
        bpmnModeler: null,
        nodeName: "",
        form: {
          selfName: '',
          nodeDesc: {
            class: '',
            age: ''
          },
          interestFood: []
        },
        chart: '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
          '  <bpmn:process id="Process_1" isExecutable="false">\n' +
          '    <bpmn:startEvent id="StartEvent_1">\n' +
          '      <bpmn:outgoing>Flow_09dyrc9</bpmn:outgoing>\n' +
          '    </bpmn:startEvent>\n' +
          '    <bpmn:userTask id="Activity_0igip2e" name="第一名">\n' +
          '      <bpmn:extensionElements>\n' +
          '        <camunda:inputOutput>\n' +
          '          <camunda:inputParameter name="selfName">少年的你</camunda:inputParameter>\n' +
          '          <camunda:inputParameter name="nodeDesc">\n' +
          '            <camunda:map>\n' +
          '              <camunda:entry key="class">一年一班</camunda:entry>\n' +
          '              <camunda:entry key="age">8</camunda:entry>\n' +
          '            </camunda:map>\n' +
          '          </camunda:inputParameter>\n' +
          '          <camunda:inputParameter name="interestFood">\n' +
          '            <camunda:list>\n' +
          '              <camunda:value>苹果</camunda:value>\n' +
          '              <camunda:value>香蕉</camunda:value>\n' +
          '              <camunda:value>西瓜</camunda:value>\n' +
          '            </camunda:list>\n' +
          '          </camunda:inputParameter>\n' +
          '        </camunda:inputOutput>\n' +
          '      </bpmn:extensionElements>\n' +
          '      <bpmn:incoming>Flow_09dyrc9</bpmn:incoming>\n' +
          '      <bpmn:outgoing>Flow_03cqlix</bpmn:outgoing>\n' +
          '    </bpmn:userTask>\n' +
          '    <bpmn:endEvent id="Event_1lh7sje">\n' +
          '      <bpmn:incoming>Flow_03cqlix</bpmn:incoming>\n' +
          '    </bpmn:endEvent>\n' +
          '    <bpmn:sequenceFlow id="Flow_09dyrc9" sourceRef="StartEvent_1" targetRef="Activity_0igip2e" />\n' +
          '    <bpmn:sequenceFlow id="Flow_03cqlix" sourceRef="Activity_0igip2e" targetRef="Event_1lh7sje" />\n' +
          '  </bpmn:process>\n' +
          '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
          '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
          '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
          '        <dc:Bounds x="173" y="102" width="36" height="36" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape id="Activity_0igip2e_di" bpmnElement="Activity_0igip2e">\n' +
          '        <dc:Bounds x="310" y="80" width="100" height="80" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape id="Event_1lh7sje_di" bpmnElement="Event_1lh7sje">\n' +
          '        <dc:Bounds x="502" y="102" width="36" height="36" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNEdge id="Flow_09dyrc9_di" bpmnElement="Flow_09dyrc9">\n' +
          '        <di:waypoint x="209" y="120" />\n' +
          '        <di:waypoint x="310" y="120" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '      <bpmndi:BPMNEdge id="Flow_03cqlix_di" bpmnElement="Flow_03cqlix">\n' +
          '        <di:waypoint x="410" y="120" />\n' +
          '        <di:waypoint x="502" y="120" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '    </bpmndi:BPMNPlane>\n' +
          '  </bpmndi:BPMNDiagram>\n' +
          '</bpmn:definitions>'
      };
    },
    mounted() {
      this.containerEl = document.getElementById('container');
      this.bpmnModeler = new BpmnModeler({
        container: this.containerEl,
        moddleExtensions: {camunda: camundaExtension},
      });
      this.showChart();
    },
    methods: {
      splitBusiness2Json(businessObject) {
        let formData = {};
        let params = this.getExtensionElement(businessObject, 'camunda:InputOutput');
        if (params && params.inputParameters) {
          params.inputParameters.forEach((item) => {
            let definition = item.definition;
            if (definition) {
              if (definition.$type === 'camunda:List') {
                let arr = [];
                definition.items.forEach((itemsItem) => {
                  arr.push(itemsItem.value);
                });
                formData[item.name] = arr;
              } else if (definition.$type === 'camunda:Map') {
                let obj = {};
                if (definition.entries) {
                  definition.entries.forEach((entriesItem) => {
                    obj[entriesItem.key] = entriesItem.value;
                  });
                  formData[item.name] = obj;
                }
              }
            } else {
              formData[item.name] = item.value;
            }
          });
        }
        this.form = formData;
        console.log('this.form', this.form);
      },

      getExtensionElement(element, type) {
        if (!element.extensionElements) {
          return;
        }
        return element.extensionElements.values.filter((extensionElement) => {
          return extensionElement.$instanceOf(type);
        })[0];
      },
      addEventBusListener() {
        let eventBus = this.bpmnModeler.get('eventBus');
        // 注册节点事件，eventTypes中可以写多个事件
        let eventTypes = ['element.click'];
        eventTypes.forEach((eventType) => {
          eventBus.on(eventType, (e) => {
            let {element} = e;
            if (!element.parent) return;
            if (!e || element.type === 'bpmn:Process') {
              return false;
            } else {
              if (eventType === 'element.click') {
                let businessObject = element.businessObject || element;
                // 此时的businessObject 是我们想要的万能的小可爱
                this.splitBusiness2Json(businessObject);
              }
            }
          });
        });
      },
      // 流程图回显
      showChart() {
        this.bpmnModeler.importXML(this.chart, (err) => {
          if (!err) {
            this.addEventBusListener();
          }
        });
      }
    }
  };
</script>
<style lang="scss">
  .containerBox {
    height: calc(100vh - 220px);

    #container {
      height: calc(100% - 50px);
    }

    #container, .nodeInfo {
      width: 50%;
      display: inline-block;
      height: calc(100% - 50px);
    }
  }
</style>

<template>
  <div class="containerBox">
    <div id="container"></div>
  </div>
</template>
<script>
  import BpmnModeler from 'bpmn-js/lib/Modeler';
  import customModule from './customPalette';

  export default {
    name: 'customPlatter',
    data() {
      return {
        containerEl: null,
        bpmnModeler: null
      };
    },
    mounted() {
      this.containerEl = document.getElementById('container');
      this.bpmnModeler = new BpmnModeler({
        container: this.containerEl,
        additionalModules: [ customModule ]
      });
      this.create();
    },
    methods: {
      create() {
        this.bpmnModeler.createDiagram(() => {
          this.bpmnModeler.get('canvas').zoom('fit-viewport');
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
  }
</style>

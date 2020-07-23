export default class CustomPalette {
  constructor(create, elementFactory, palette) {
    this.create = create;
    this.elementFactory = elementFactory;
    palette.registerProvider(this);
  }

  // 这个函数就是绘制palette的核心
  getPaletteEntries() {
    const elementFactory = this.elementFactory;
    const create = this.create;

    function dragEventFactory(type) {
      return function (event) {
        const taskShape = elementFactory.create('shape', {
          type: type
        });
        create.start(event, taskShape);
      };
    }

    return {
      'create.monitor': {
        title: '我是自定义节点-草莓蛋糕',
        className: 'icon-custom bpmn-icon-cake',
        action: {
          dragstart: dragEventFactory('bpmn:Task')
        }
      }
    };
  }
}
CustomPalette.$inject = [
  'create',
  'elementFactory',
  'palette'
];

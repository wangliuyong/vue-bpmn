import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer'; // 引入默认的renderer
import { customElements, customConfig } from './util';
import { append as svgAppend, create as svgCreate } from 'tiny-svg';

const HIGH_PRIORITY = 1500; // 最高优先级

export default class CustomRenderer extends BaseRenderer {
  // 继承BaseRenderer
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);
    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(element) {
    // ignore labels
    return !element.labelTarget;
  }

  drawShape(parentNode, element) {
    const type = element.type; // 获取到类型
    if (customElements.includes(type)) {
      const {url, attr} = customConfig['cake'];
      const customIcon = svgCreate('image', {...attr, href: url});
      element['width'] = attr.width;
      element['height'] = attr.height;
      svgAppend(parentNode, customIcon);
      return customIcon;
    }
    const shape = this.bpmnRenderer.drawShape(parentNode, element);
    return shape;
  }

  getShapePath(shape) {
    return this.bpmnRenderer.getShapePath(shape);
  }
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer'];

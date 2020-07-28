export function splitBusiness2Json(businessObject) {
  console.log(businessObject);
  let formData = {};
  let params = getExtensionElement(businessObject, 'camunda:InputOutput');
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
  console.log('this.form', formData);
}

export function getExtensionElement(element, type) {
  if (!element.extensionElements) {
    return;
  }
  return element.extensionElements.values.filter((extensionElement) => {
    return extensionElement.$instanceOf(type);
  })[0];
}
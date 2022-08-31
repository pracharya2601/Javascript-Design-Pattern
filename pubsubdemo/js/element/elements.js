import { pubsub } from '../pubsub/index.js';

export const elements = {
  render: () => {
    pubsub.subscribe('nestedElement', elements.nestedElementCreated);
  },
  nestedElementCreated: ({
    container,
    child,
    meta,
  }) => {

    let component = elements.creationHelper(meta);
    elements.childHelper(component, child, meta.element);
    container.appendChild(component);
  },
  childHelper: (parent, child, element) => {
    if (typeof child === 'object' && child.length > 0) {
      child.forEach((childItem) => {
        let comp = elements.creationHelper(childItem.meta);
        elements.childHelper(comp, childItem.child, childItem.meta.element)
        parent.appendChild(comp);
      })
    } else if (typeof child === 'string' && element === "input") {
      parent.setAttribute('value', child)
    } else if (typeof child === 'string') {
      parent.innerHTML = child;
    }

  },
  creationHelper: ({ element, ...rest }) => {
    let cElement = document.createElement(element);
    if (rest.id) cElement.setAttribute("id", rest.id);
    if (rest.class) cElement.setAttribute('class', rest.class);
    if (rest.dataId) cElement.setAttribute('data-id', rest.dataId);
    if (rest.events?.length > 0) {
      rest.events.forEach(({ type, func }) => {
        cElement.addEventListener(type, func);
      })
    }
    return cElement;
  }
}
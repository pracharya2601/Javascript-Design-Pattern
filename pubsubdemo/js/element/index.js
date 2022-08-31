import { pubsub } from '../pubsub/index.js';

export const element = {
  render: () => {
    pubsub.subscribe('updateElement', element.updateElement);
    pubsub.subscribe('updateEvent', element.updateEvent);
  },
  updateElement: ({
    selector,
    value,
  }) => {
    selector.innerHTML = value || "Start typing";
  },
  updateEvent: ({
    selector,
    type,
    func
  }) => {
    selector.addEventListener(type, func);
  }
}
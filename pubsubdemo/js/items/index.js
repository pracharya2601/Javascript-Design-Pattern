import { pubsub } from '../pubsub/index.js';

export const items = {
  state: ["Item 1", "Item 2", "Item 3", "Item 4"],
  parentContainer: document.querySelector('.list-items'),
  render: () => {
    pubsub.subscribe('itemAdded', items.itemAdded);
    pubsub.subscribe('itemUpdated', items.itemUpdated);
    pubsub.subscribe('itemDeleted', items.itemDeleted);
    items.renderItem(items.parentContainer);
  },
  itemAdded: (data) => {
    let index = items.state.length;
    items.state.push(data);
    pubsub.publish('nestedElement', {
      container: items.parentContainer,
      ...items.renderList(data, index),
    })
  },
  itemUpdated: ({ index, value }) => {
    items.state[index] = value;
  },
  itemDeleted: (index) => {
    items.state[index] = ""
  },
  renderItem: (container) => {
    container.innerHTML = ""
    items.state.forEach((item, index) => {
      pubsub.publish('nestedElement', {
        container: container,
        ...items.renderList(item, index)
      })
    })
  },

  renderList: (item, index) => {
    return {
      child: [
        {
          child: item,
          meta: {
            element: 'div',
            class: 'list-content'
          }
        },
        {
          child: [
            {
              child: item,
              meta: {
                element: 'input',
                id: `edit-field-${index}`
              }
            },
            // {
            //   child: 'task_alt',
            //   meta: {
            //     element: 'span',
            //     id: `done-item-${index}`,
            //     dataId: `item-${index}`,
            //     class: 'material-symbols-outlined done-btn',
            //   }
            // }

          ],
          meta: {
            element: 'div',
            id: `edit-form-${index}`,
            class: 'item-hidden item-list-form'
          }
        },
        {
          child: 'edit_square',
          meta: {
            element: 'span',
            id: `edit-item-${index}`,
            dataId: `item-${index}`,
            class: 'material-symbols-outlined edit-btn',
          }
        },
        {
          child: 'delete',
          meta: {
            element: 'span',
            id: `delete-item-${index}`,
            class: 'material-symbols-outlined delete-btn',
            dataId: `item-${index}`,
          }
        }

      ],
      meta: {
        element: 'li',
        id: `item-${index}`
      }
    }
  }

}
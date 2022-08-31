import { pubsub } from '../pubsub/index.js';

export const itemForm = {
  formElement: document.querySelector('#item-form'),
  inputForm: document.querySelector('#item'),
  itemLists: document.querySelector('.list-items'),
  editItem: undefined,
  isEdited: "",
  render: () => {
    itemForm.formElement.addEventListener('submit', itemForm.addItem)
    itemForm.itemLists.addEventListener('click', itemForm.clickHandle);
  },
  addItem: (e) => {
    e.preventDefault();
    let inpValue = itemForm.inputForm.value;
    console.log(itemForm.isEdited)
    if (!itemForm.editItem) {
      pubsub.publish('itemAdded', inpValue);
    }
    itemForm.inputForm.value = "";
    itemForm.isEdited = "";
  },
  clickHandle: (e) => {
    if (e.target.classList.contains('edit-btn')) {
      itemForm.editItemHandle(e)
    }
    if (e.target.classList.contains('delete-btn')) {
      itemForm.deleteItemHandle(e)
    }
  },

  editItemHandle: (e) => {
    e.preventDefault()
    let liItem = e.target.parentNode;
    let contentDiv = liItem.querySelector('div');
    let inputDiv = liItem.querySelector('.item-list-form');
    contentDiv.classList.toggle("item-hidden")
    inputDiv.classList.toggle("item-hidden");
    let inputElement = inputDiv.querySelector('input');
    inputElement.focus()

    let editButton = liItem.querySelector('.edit-btn');
    if (editButton.innerHTML === "check_circle") {
      // this value need to be updated
      pubsub.publish('itemUpdated', { value: inputElement.value, index: liItem.id.split('-')[1] })
      pubsub.publish('updateElement', {
        selector: contentDiv,
        value: inputElement.value,
      })
      editButton.innerHTML = 'edit_square'
    } else {
      editButton.innerHTML = 'check_circle'
    }
  },

  deleteItemHandle: (e) => {
    e.preventDefault()
    let liItem = e.target.parentNode;
    liItem.remove();
    pubsub.publish('itemDeleted', liItem.id.split('-')[1])
  },

}
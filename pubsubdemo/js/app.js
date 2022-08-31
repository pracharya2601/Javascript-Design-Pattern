import { element } from './element/index.js';
import { elements } from './element/elements.js';
import { items } from './items/index.js';

import { itemForm } from './items/itemForm.js';



document.addEventListener("DOMContentLoaded", () => {
  itemForm.render()
  elements.render();
  element.render();
  items.render();

})
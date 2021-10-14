import { writable, derived } from 'svelte/store';
import { v4 as uuid } from 'uuid';

const blankItem = () => {
  return {
    id: uuid(),
    quantity: 1,
    description: '',
    price: 0
  }
};

const createItem = () => {

  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    add: () => update(items => [...items, blankItem()]),
    remove: (id) => update(items => items.filter(item => item.id !== id)),
    onChange: (id, key, value)  => update(items => {
      return items.map(item => {
        if(item.id === id ) {
          item[key] = value;
        }
        return item;
      })
    }),
    changeQuantity: (id, quantity) => update(items => {
      return items.map(item => {
        if(item.id === id ) {
          item.quantity = quantity;
        }
        return item;
      })
    }),
  }
}

export const items = createItem();

export const total = derived(
  items,
  $items => $items.reduce((sum, curr) => {
    return sum += curr.quantity * curr.price;
  }, 0));

<script>
  import { items } from './store';
  import { slide } from 'svelte/transition';

  export let id;
  export let index;
  export let quantity = 1;
  export let description = "";
  export let price = 0;

  let currency = "R$"

  const onRemoveItem = () => {
    items.remove(id);
  }

  const onChange = (key, value) => {
    return () => {
      items.onChange(id, key, value)
    };
  }

  $: subtotal = quantity * price;
</script>
<tr transition:slide id={id} class="{ index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}">
  <td class="px-6 w-10 py-4 min-w-full whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
    <input class="bg-transparent" on:change={onChange('quantity', quantity)} type="number" bind:value={quantity}>
  </td>
  <td class="px-6 w-3/6 py-4 text-sm leading-5 text-gray-500">
    <input class="bg-transparent" on:change={onChange('description', description)} type="text" bind:value={description}>
  </td>
  <td class="px-6 w-1/6 py-4  whitespace-no-wrap text-sm leading-5 text-gray-500">
    {currency}
    <input class="bg-transparent" on:change={onChange('price', price)} type="number" bind:value={price}>
  </td>
  <td class="px-6 w-1/6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
    {currency} {subtotal}
  </td>
  <td class="px-6 py-4 text-right text-sm leading-5 font-medium">

    <button on:click={onRemoveItem} class="transition-all duration-500 ease-in-out text-indigo-600 hover:text-indigo-900">Remover</button>
  </td>
</tr>

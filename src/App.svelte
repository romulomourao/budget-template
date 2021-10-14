<script>

import { total, items } from './store';

import Item from './Item';
import { formatCurrency } from './utils/currency_formatter';
import Button from './Button';
import TableHead from './TableHead';
import { fade } from 'svelte/transition';

const onAddNewItem = () => {
  items.add();
}

$: totalFormatted = formatCurrency($total, 2, "R$ ", ".", ",")

</script>

<div class="bg-white overflow-hidden shadow rounded-lg">
  <div class="border-b border-gray-200 px-4 py-5 sm:px-6 flex justify-between items-center">
   <span class="text-xl sm:text-3xl font-bold text-gray-700" contenteditable="true">Orçamento</span>
   <Button onClick={onAddNewItem}></Button>
  </div>
  <div class="px-4 py-5 sm:p-6">
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            {#if $items.length > 0}
              <table transition:fade class="min-w-full divide-y divide-gray-200">
                <TableHead />
                <tbody>
                  {#each $items as {id, quantity, description, price}, index}
                    <Item {id} {description} {quantity} {price} {index}/>
                  {/each}
                </tbody>
              </table>
            {:else}
              <div class="text-center text-gray-600 py-6">
                Você ainda não adicionou nenhum item.
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="border-t border-gray-200 px-4 py-5 sm:px-6 text-right text-xl sm:text-2xl text-gray-700">
   <span class="font-bold">Total:</span> {totalFormatted}
  </div>
</div>


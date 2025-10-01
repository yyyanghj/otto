<script lang="ts">
  import type { ExtensionInfo } from '@/lib/browser'
  import { getAllExtensions } from '@/lib/browser'
  import { onMount } from 'svelte'
  import Extension from './Extension.svelte'

  let extensions = $state<ExtensionInfo[]>([])
  let filter = $state<string>('')

  let filteredExtensions = $derived.by(() => {
    if (!filter) return extensions

    console.log('Filtering extensions with:', filter)
    return extensions.filter(ext => ext.name.toLowerCase().includes(filter.toLowerCase()))
  })

  const refresh = async () => {
    const result = await getAllExtensions()
    extensions = result.sort((a, b) => a.name.localeCompare(b.name))
  }

  onMount(() => {
    refresh()
  })
</script>

<main class="text-base text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-900">
  <!-- Filter -->
  <header class="px-4 py-2">
    <input
      bind:value={filter}
      type="text"
      class="h-8 rounded-full w-full border border-zinc-200 dark:border-zinc-700 px-4"
      placeholder="Filter extensions"
    />
  </header>

  <!-- List -->
  <ul class="max-h-[400px] overflow-auto border-t border-zinc-200 dark:border-zinc-700">
    {#each filteredExtensions as ext (ext.id)}
      <Extension extension={ext} refresh={refresh} />
    {/each}
  </ul>

  {#if filteredExtensions.length === 0}
    <div class="flex justify-center items-center h-[44px] text-zinc-500 dark:text-zinc-400">No extensions found</div>
  {/if}

  <!-- Footer -->
   <footer class="px-4 py-2 flex justify-between border-t border-zinc-200 dark:border-zinc-700 text-sm">
    <span>
      Made by <a class="text-blue-500 dark:text-blue-300 underline" href="https://github.com/yyyanghj" target="_blank">yyyanghj</a>
    </span>
    <a class="text-blue-500 dark:text-blue-300 text-sm underline" href="https://github.com/yyyanghj/otto" target="_blank">Source Code</a>
   </footer>
</main>

<style>

</style>

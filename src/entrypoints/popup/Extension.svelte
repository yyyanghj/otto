<script lang="ts">
  import { isApp, launchApp, openNewTab, setEnabled, uninstall, type ExtensionInfo } from '@/lib/browser'

  interface Props {
    extension: ExtensionInfo
    refresh: () => void
  }

  let { extension, refresh }: Props = $props()

  let icon = $derived.by(() => {
    const icons = extension.icons || []
    const icon = icons.find(item => item.size >= 32) || icons[icons.length - 1]
    return icon?.url || ''
  })

  $inspect(extension)

  const handleClick = async () => {
    if (isApp(extension)) {
      launchApp(extension)
    }
    else {
      await setEnabled(extension, !extension.enabled)
      refresh()
    }
  }

  const handleClickCog = () => {
    openNewTab(extension.optionsUrl)
  }

  const handleClickTrash = async () => {
    await uninstall(extension)
    refresh()
  }
</script>

<li
  class={[
    'flex items-center px-4 py-2 gap-4 hover:bg-zinc-600/6 cursor-pointer border-b border-zinc-200 dark:border-zinc-700',
    extension.enabled ? '' : 'opacity-50',
  ]}
>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="flex items-center flex-1 overflow-hidden" onclick={handleClick}>
    <img
      src={icon}
      alt={extension.name}
      class="w-8 h-8 rounded mr-4"
    />
    <div class="flex-1 min-w-0">
      <h4 class="font-medium truncate">{extension.name}</h4>
      <div class="text-sm text-zinc-500 dark:text-zinc-400">
        {extension.version}
      </div>
    </div>
  </div>

  <div class={[
    'flex items-center ml-auto shrink-0 gap-2',
    '*:w-9 *:h-9 *:flex *:items-center *:justify-center *:rounded-lg *:hover:bg-zinc-600/12 *:cursor-pointer',
  ]}>
    <button class={[extension.optionsUrl ? '' : 'hidden!']} onclick={handleClickCog}>
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <!-- Icon from HeroIcons v1 Outline by Refactoring UI Inc - https://github.com/tailwindlabs/heroicons/blob/master/LICENSE -->
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37c.996.608 2.296.07 2.572-1.065"/>
          <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0"/>
        </g>
      </svg>
    </button>

    <button onclick={handleClickTrash}>
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <!-- Icon from HeroIcons v1 Outline by Refactoring UI Inc - https://github.com/tailwindlabs/heroicons/blob/master/LICENSE -->
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16"/>
      </svg>
    </button>
  </div>
</li>

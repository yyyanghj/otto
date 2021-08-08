<template>
  <main class="container">
    <header class="header">
      <div class="filter-box">
        <input v-model="filterText" class="filter-input" type="text" />
      </div>
      <Dropdown v-model:value="filterType" :options="dropdownOptions" />
    </header>

    <section class="list">
      <Extension
        v-for="ext of extensions"
        :key="ext.id"
        :extension="ext"
        @click="handleClick"
        @click-trash="handleUninstall"
      />
    </section>

    <!-- <footer class="footer">
      <div class="layout-options">
        <div class="icon active">
          <icon-heroicons-outline-view-list />
        </div>
        <div class="icon">
          <icon-heroicons-outline-view-grid />
        </div>
      </div>
    </footer> -->
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useExtensions } from './use-extension';
import { isApp, isExtension } from './utils';
import Extension from './components/Extension.vue';
import Dropdown from './components/Dropdown.vue';

const { allExtensions, toggleEnabled, launchApp, uninstall } = useExtensions();

const filterType = ref<null | 'hosted_app' | 'extension'>(null);
const filterText = ref<string>('');

const dropdownOptions = [
  { text: 'All', value: null },
  { text: 'App', value: 'hosted_app' },
  { text: 'Extension', value: 'extension' },
];

const extensions = computed(() => {
  return allExtensions.value.filter(ext => {
    if (filterType.value && ext.type !== filterType.value) {
      return false;
    }
    if (filterText.value && ext.name.toLowerCase().indexOf(filterText.value.toLowerCase()) === -1) {
      return false;
    }
    return true;
  });
});

const handleClick = async (ext: chrome.management.ExtensionInfo) => {
  if (isApp(ext)) {
    return launchApp(ext.id);
  }

  if (isExtension(ext)) {
    return toggleEnabled(ext.id);
  }
};

const handleUninstall = (ext: chrome.management.ExtensionInfo) => {
  uninstall(ext.id);
};
</script>

<style lang="less">
.container {
  display: flex;
  flex-flow: column nowrap;
  width: 375px;
  min-height: 240px;
  max-height: 600px;
  overflow: hidden;

  .header {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 56px;
    padding: 0 12px;

    .filter-box {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      background-color: var(--color-natural-3);
      height: 36px;
      border-radius: 36px;
      margin-right: 8px;
    }

    .filter-input {
      display: block;
      border: none;
      outline: none;
      padding: 0 18px;
      width: 100%;
      height: 100%;
      background: transparent;
    }
  }

  .list {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 24px;
  }

  .footer {
    display: flex;
    align-items: center;
    height: 48px;
    flex-shrink: 0;
    padding: 0 12px;
    background: var(--color-natural-2);
    border-top: 1px solid var(--color-natural-3);

    .layout-options {
      display: flex;
      margin-left: auto;
    }
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      width: 32px;
      height: 32px;
      color: var(--color-natural-6);
      cursor: pointer;
      margin-left: 4px;
      border-radius: 4px;
      &.active {
        background-color: var(--color-natural-3);
        color: var(--color-natural-7);
      }
    }
  }
}
</style>

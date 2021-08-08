<template>
  <div class="extension-list" :class="layout">
    <ExtensionListItem v-for="ext of extensions" :key="ext.id" :extension="ext" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  extensions: chrome.management.ExtensionInfo[];
  layout: 'grid' | 'list';
}>();
</script>

<style lang="less">
.extension-list {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 24px;

  &.list {
    display: block;
  }

  &.grid {
    padding: 0 20px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
}
</style>

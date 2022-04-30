<template>
  <div class="extension-list">
    <ExtensionListItem v-for="ext of extensions" :key="ext.id" :extension="ext" />
    <div v-if="!extensions.length" class="empty">No Item Found</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import ExtensionListItem from './ExtensionListItem.vue';

const props = defineProps<{
  extensions: chrome.management.ExtensionInfo[];
}>();
</script>

<style lang="less">
.extension-list {
  display: block;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 12px;

  .empty {
    padding: 50px;
    text-align: center;
    color: var(--color-natural-6);
  }
}
</style>

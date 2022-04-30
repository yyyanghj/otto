<template>
  <div class="extension-list-item" :class="{ disabled: !extension.enabled && !isApp }">
    <div class="info" @click="handleClick">
      <div class="icon">
        <img :src="imgUrl" />
      </div>
      <div class="name">{{ extension.name }}</div>
    </div>

    <div v-show="label" class="label">{{ label }}</div>

    <div class="action">
      <div class="icon" :class="{ disabled: !extension.optionsUrl }" @click="handleClickSetting">
        <icon-heroicons-outline-cog />
      </div>

      <div class="icon" @click="handleClickTrash">
        <icon-heroicons-outline-trash />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import * as utils from '../utils';
import { useStore } from '../store';

const { toggleEnabled, launchApp, uninstall } = useStore();

const props = defineProps<{
  extension: chrome.management.ExtensionInfo;
}>();

const isApp = computed(() => {
  return utils.isApp(props.extension);
});

const isDev = computed(() => {
  return utils.isDevExt(props.extension);
});

const imgUrl = computed(() => {
  const icons = props.extension.icons || [];
  if (!icons.length) {
    return '';
  }
  icons.sort((a, b) => b.size - a.size);
  return icons[0].url;
});

const label = computed(() => {
  return isApp.value ? 'APP' : isDev.value ? 'DEV' : '';
});

const handleClick = () => {
  if (isApp.value) {
    launchApp(props.extension.id);
  } else {
    toggleEnabled(props.extension.id);
  }
};

const handleClickTrash = () => {
  uninstall(props.extension.id);
};

const handleClickSetting = () => {
  utils.openOptionPage(props.extension);
};
</script>

<style lang="less">
.extension-list-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 12px;
  cursor: pointer;

  &.disabled {
    .info {
      opacity: 0.4;
    }
  }

  .info {
    display: flex;
    align-items: center;
    width: 260px;
    overflow: hidden;
    margin-right: 12px;
  }

  .icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    border-radius: 8px;
    overflow: hidden;
    margin-left: 8px;

    img {
      width: 100%;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .name {
    margin-left: 12px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .label {
    margin-left: auto;
    width: 40px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    font-size: 12px;
    color: var(--color-natural-1);
    background-color: var(--color-primary);
    border-radius: 20px;
  }

  &:hover .label {
    display: none;
  }

  .action {
    display: flex;
    align-items: center;
    position: absolute;
    right: 8px;
    z-index: 99;
    height: 36px;
    background-color: var(--color-natural-1);
    border-radius: 36px;
    opacity: 0;
    pointer-events: none;
  }

  &:hover .action {
    opacity: 1;
    pointer-events: initial;
  }

  .icon {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    border-radius: 4px;
    background-color: var(--color-natural-2);
    &:hover {
      background-color: var(--color-natural-3);
    }
    &.disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }
}
</style>

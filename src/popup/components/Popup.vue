<template>
  <teleport to="body">
    <div class="popup" :style="style">
      <slot></slot>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{
  position: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
  };
}>();

const style = computed(() => {
  const toPx = (n: number | undefined) => {
    if (typeof n !== 'number') {
      return undefined;
    }
    return n + 'px';
  };
  const { top, left, right, bottom } = props.position;
  return {
    top: toPx(top),
    left: toPx(left),
    right: toPx(right),
    bottom: toPx(bottom),
  };
});
</script>

<style lang="less">
.popup {
  position: fixed;
  z-index: 9999;
}
</style>

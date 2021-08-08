<template>
  <div ref="el" class="dropdown">
    <div class="dropdown-select" @click.stop="showOptions = true">{{ text }}</div>
    <icon-heroicons-outline-chevron-down class="icon" />
    <div
      v-show="showOptions"
      class="dropdown-list"
      :style="{ left: `${position.left}px`, top: `${position.top}px` }"
    >
      <div
        v-for="(item, index) of options"
        :key="`${item.text}_${index}`"
        class="dropdown-option"
        @click="handleOptionClick(item.value)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps<{
  value: unknown;
  options: Array<{ text: string; value: unknown }>;
}>();

const position = ref({ left: 0, top: 0 });

const text = computed(() => {
  return props.options.find(item => item.value === props.value)?.text || '';
});

const showOptions = ref(false);

const el = ref<HTMLDivElement>();

const emits = defineEmits(['update:value']);

const handleOptionClick = (value: unknown) => {
  emits('update:value', value);
};

const handler = () => {
  showOptions.value = false;
};

onMounted(() => {
  document.addEventListener('click', handler);

  requestAnimationFrame(() => {
    if (el.value) {
      const rect = el.value.getBoundingClientRect();
      console.log('rect', rect);

      const top = rect.top + rect.height + 4;
      const left = rect.left;

      position.value = {
        top,
        left,
      };
    }
  });
});

onUnmounted(() => {
  document.removeEventListener('click', handler);
});
</script>

<style lang="less">
.dropdown {
  position: relative;
  display: flex;
  align-items: center;
  width: 100px;
  height: 36px;
  border: 1px solid var(--color-natural-3);
  border-radius: 36px;
  font-size: 14px;

  .dropdown-select {
    width: 80px;
    height: 36px;
    padding: 0 12px;
    line-height: 36px;
  }

  .icon {
    display: block;
    width: 20px;
    height: 20px;
    margin-left: 4px;
  }

  .dropdown-list {
    width: 100px;
    display: block;
    position: fixed;
    left: 0;
    padding: 4px 0;
    z-index: 999;
    border: 1px solid var(--color-natural-3);
    background: var(--color-natural-1);
  }

  .dropdown-option {
    padding: 4px 12px;
    cursor: pointer;
  }

  .dropdown-option:hover {
    background: var(--color-primary);
    color: var(--color-natural-1);
  }
}
</style>

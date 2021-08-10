<template>
  <div ref="el" class="dropdown">
    <div class="dropdown-select" @click.stop="showOptions = true">{{ text }}</div>
    <icon-feather-chevron-down class="icon" />

    <Popup v-if="showOptions" :position="position">
      <div class="dropdown-list">
        <div
          v-for="(item, index) of options"
          :key="`${item.text}_${index}`"
          class="dropdown-option"
          @click="handleOptionClick(item.value)"
        >
          {{ item.text }}
        </div>
      </div>
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, onUnmounted, computed } from 'vue';
import { useRect } from '../use-rect';
import Popup from './Popup.vue';

const props = defineProps<{
  value: unknown;
  options: Array<{ text: string; value: unknown }>;
}>();

const el = ref<HTMLDivElement>();
const rect = useRect(el);

const position = computed(() => {
  const { top, height, left } = rect.value;

  return {
    top: top + height + 4,
    left: left,
  };
});

const text = computed(() => {
  return props.options.find(item => item.value === props.value)?.text || '';
});

const showOptions = ref(false);

const emits = defineEmits(['update:value']);

const handleOptionClick = (value: unknown) => {
  emits('update:value', value);
};

const handler = () => {
  showOptions.value = false;
};

onMounted(() => {
  document.addEventListener('click', handler);
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
  width: 120px;
  height: 36px;
  border: 1px solid var(--color-natural-3);
  border-radius: 36px;
  font-size: 14px;
  padding: 0 12px;

  .dropdown-select {
    flex: 1;
    height: 36px;
    line-height: 36px;
  }

  .icon {
    flex-shrink: 0;
    display: block;
    width: 20px;
    height: 20px;
    margin-left: 4px;
  }
}

.dropdown-list {
  width: 120px;
  display: block;

  padding: 4px 0;

  border-radius: 4px;
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
</style>

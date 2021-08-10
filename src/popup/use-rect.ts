import { ref, onMounted, onUpdated, Ref } from 'vue';

export function useRect<T extends HTMLElement = HTMLDivElement>(el: Ref<T | undefined>) {
  const rect = ref({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  } as DOMRect);

  const fn = () => {
    // 初始 document.documentElement.clientWidth 不对
    // 会影响 getBoundingClientRect, 因此加个 raf
    requestAnimationFrame(() => {
      if (el.value) {
        rect.value = el.value.getBoundingClientRect();
      }
    });
  };

  onMounted(() => {
    fn();
  });

  onUpdated(() => {
    fn();
  });

  return rect;
}

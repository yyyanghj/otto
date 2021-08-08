import * as utils from './utils';
import { ref, computed } from 'vue';

const getOrder = (ext: chrome.management.ExtensionInfo) => {
  if (utils.isApp(ext)) {
    return 4;
  }

  if (ext.enabled) {
    return 2;
  }

  return 0;
};

export function useExtensions() {
  const allExtensions = ref<chrome.management.ExtensionInfo[]>([]);

  utils.getAll().then(allExt => {
    allExtensions.value = allExt.sort((a, b) => {
      return getOrder(b) - getOrder(a);
    });
    console.log(allExtensions.value);
  });

  const toggleEnabled = async (id: string) => {
    const ext = allExtensions.value.find(ext => ext.id === id);
    if (!ext || !utils.isExtension(ext)) {
      return;
    }
    await utils.setEnabled(id, !ext.enabled);
    ext.enabled = !ext.enabled;
  };

  const launchApp = async (id: string) => {
    const ext = allExtensions.value.find(ext => ext.id === id);
    if (!ext || !utils.isApp(ext)) {
      return;
    }
    await utils.launchApp(id);
    ext.enabled = !ext.enabled;
  };

  const uninstall = async (id: string) => {
    const res = await utils.uninstall(id);

    console.log('unstall res', res);

    allExtensions.value = allExtensions.value.filter(ext => ext.id !== id);
  };

  return {
    allExtensions,
    toggleEnabled,
    launchApp,
    uninstall,
  };
}

export function getAll() {
  return chrome.management.getAll();
}

export function setEnabled(id: string, enabled: boolean) {
  return chrome.management.setEnabled(id, enabled);
}

export function launchApp(id: string) {
  return chrome.management.launchApp(id);
}

export function uninstall(id: string) {
  return chrome.management.uninstall(id, { showConfirmDialog: true });
}

export function isExtension(ext: chrome.management.ExtensionInfo) {
  return ext.type === 'extension';
}

export function isApp(ext: chrome.management.ExtensionInfo) {
  return ext.type === 'hosted_app';
}

export function isDevExt(ext: chrome.management.ExtensionInfo) {
  return ext.installType === 'development';
}

export function openOptionPage(ext: chrome.management.ExtensionInfo) {
  chrome.tabs.create({
    url: ext.optionsUrl,
  });
}

export type ExtensionInfo = Browser.management.ExtensionInfo

export function getAllExtensions() {
  return browser.management.getAll()
}

export function setEnabled(ext: ExtensionInfo, enabled: boolean) {
  return browser.management.setEnabled(ext.id, enabled)
}

export function launchApp(ext: ExtensionInfo) {
  return browser.management.launchApp(ext.id)
}

export function uninstall(ext: ExtensionInfo) {
  return browser.management.uninstall(ext.id, { showConfirmDialog: true })
}

export function isExtension(ext: ExtensionInfo) {
  return ext.type === 'extension'
}

export function isDevelopmentExtension(ext: ExtensionInfo) {
  return ext.installType === 'development'
}

export function isApp(ext: ExtensionInfo) {
  return ext.type === 'hosted_app'
}

export function openNewTab(url: string) {
  browser.tabs.create({ url: url })
}

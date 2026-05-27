// Bootstrap Icons CDN integration
// Note: In React Native, icons are loaded via @expo/vector-icons or react-native-vector-icons

// Common Bootstrap icon names mapped to Ionicons
export const ICON_MAP: Record<string, string> = {
  'chat-dots': 'chatbubbles',
  'robot': 'hardware-chip',
  'file-code': 'document-text',
  'brain': 'bulb',
  'terminal': 'terminal',
  'gear': 'settings',
  'person': 'person',
  'people': 'people',
  'globe': 'globe',
  'key': 'key',
  'database': 'server',
  'cloud': 'cloud',
  'shield': 'shield-checkmark',
  'link': 'link',
  'clock': 'time',
  'calendar': 'calendar',
  'bell': 'notifications',
  'mail': 'mail',
  'send': 'send',
  'download': 'download',
  'upload': 'cloud-upload',
  'trash': 'trash',
  'edit': 'create',
  'copy': 'copy',
  'paste': 'clipboard',
  'search': 'search',
  'menu': 'menu',
  'grid': 'grid',
  'list': 'list',
  'home': 'home',
  'info': 'information-circle',
  'warning': 'warning',
  'check': 'checkmark-circle',
  'x': 'close-circle',
  'plus': 'add',
  'minus': 'remove',
  'chevron-right': 'chevron-forward',
  'chevron-left': 'chevron-back',
  'chevron-down': 'chevron-down',
  'chevron-up': 'chevron-up',
  'arrow-right': 'arrow-forward',
  'arrow-left': 'arrow-back',
  'arrow-up': 'arrow-up',
  'arrow-down': 'arrow-down',
  'play': 'play',
  'pause': 'pause',
  'stop': 'stop',
  'refresh': 'refresh',
  'sync': 'sync',
  'lock': 'lock-closed',
  'unlock': 'lock-open',
  'eye': 'eye',
  'eye-off': 'eye-off',
};

// Helper function to get icon name
export function getIconName(bootstrapIcon: string): string {
  return ICON_MAP[bootstrapIcon] || bootstrapIcon;
}

// Bootstrap icon classes for web
export const BOOTSTRAP_ICON_CSS = `
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css");
`;
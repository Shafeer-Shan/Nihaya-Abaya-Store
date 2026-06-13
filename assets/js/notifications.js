// Nihaya Simulated Push Notification System

const MARKETING_NOTIFICATIONS = [
  "✨ A client from Riyadh just inquired about the 'Luxury Beige Linen Open Abaya' via WhatsApp!",
  "🔥 Limited Stock Alert: Only 2 left of the 'Classic Noir Nida Abaya' in size M!",
  "✨ Someone in Doha added the 'Celestial Pearl Organza Abaya' to their wishlist.",
  "💡 Style Tip: Layer the 'Sage Whisper Silk Satin Abaya' with our premium linen inner slip.",
  "✨ A customer in Jumeirah just ordered the 'Royal Emerald Velvet Trimmed Abaya'!",
  "✨ Handcrafted Quality: All Nihaya abayas are custom tailored with premium Korean & Saudi fabrics.",
  "🔥 Trending Now: 'Sand Textured Crêpe Wrap Abaya' is the most viewed item today!"
];

class NotificationSystem {
  constructor() {
    this.container = null;
    this.timer = null;
    this.init();
  }

  init() {
    // Create notification container if it doesn't exist
    document.addEventListener('DOMContentLoaded', () => {
      this.createContainer();
      this.setupListeners();
      this.startSimulatedNotifications();
    });
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.id = 'nihaya-notification-container';

    const header = document.querySelector('header.sticky-top, header');
    const headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 80;
    const isMobile = window.innerWidth <= 767.98;

    this.container.style.cssText = `
      position: fixed;
      ${isMobile ? 'bottom: 84px; top: auto; left: 12px; right: 12px;' : `top: ${headerHeight + 14}px; right: 24px; left: auto; bottom: auto;`}
      z-index: 1100;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: ${isMobile ? 'calc(100% - 24px)' : '380px'};
      width: calc(100% - ${isMobile ? '24px' : '48px'});
      pointer-events: none;
      margin: 0;
    `;
    document.body.appendChild(this.container);
  }

  setupListeners() {
    // Listen for custom trigger notifications
    window.addEventListener('nihaya-toast', (e) => {
      if (e.detail && e.detail.message) {
        this.show(e.detail.message, e.detail.type || 'info');
      }
    });

    // Listen to settings changes to adapt intervals or toggle notifications
    window.addEventListener('settings-updated', (e) => {
      this.startSimulatedNotifications();
    });
  }

  show(message, type = 'info') {
    if (!this.container) this.createContainer();

    const escapeText = (text) => String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const content = typeof message === 'object' && message !== null
      ? {
          title: message.title || '',
          subtitle: message.subtitle || '',
          footer: message.footer || ''
        }
      : null;

    const toast = document.createElement('div');
    toast.className = `nihaya-toast toast-${type}`;

    let icon = '✦';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '✕';
    if (type === 'info') icon = 'ℹ';

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-main">
        <div class="toast-title">${content ? escapeText(content.title) : escapeText(message)}</div>
        ${content && content.subtitle ? `<div class="toast-subtitle">${escapeText(content.subtitle)}</div>` : ''}
        ${content && content.footer ? `<div class="toast-footer">${escapeText(content.footer)}</div>` : ''}
      </div>
      <button class="toast-close" type="button" aria-label="Dismiss notification">&times;</button>
    `;

    toast.style.cssText = `
      background: var(--toast-bg, rgba(255, 255, 255, 0.8));
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border: 1px solid rgba(197, 185, 165, 0.22);
      color: var(--toast-text, #4A4A4A);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.08);
      padding: 16px 14px 16px 16px;
      border-radius: 20px;
      display: flex;
      align-items: flex-start;
      gap: 14px;
      pointer-events: auto;
      transform: translateX(120%);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
      opacity: 0;
      position: relative;
      min-height: 74px;
    `;

    this.container.appendChild(toast);

    const closeButton = toast.querySelector('.toast-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        toast.style.transform = 'translateX(120%)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 240);
      });
    }

    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    }, 10);

    setTimeout(() => {
      toast.style.transform = 'translateX(120%)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 5500);
  }

  startSimulatedNotifications() {
    // Clear existing interval
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    // Check if notifications are enabled
    const settings = typeof getSettings === 'function' ? getSettings() : { notificationsEnabled: true, notificationFrequency: 'medium' };
    if (!settings.notificationsEnabled) return;

    // Set duration based on frequency
    let interval = 25000; // Medium
    if (settings.notificationFrequency === 'high') interval = 12000;
    if (settings.notificationFrequency === 'low') interval = 45000;

    // Start timer
    this.timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * MARKETING_NOTIFICATIONS.length);
      const msg = MARKETING_NOTIFICATIONS[randomIndex];
      this.show(msg, 'info');
    }, interval);
  }
}

// Instantiate notifications
const NihayaNotifications = new NotificationSystem();

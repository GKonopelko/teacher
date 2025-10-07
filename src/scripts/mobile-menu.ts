export interface MobileMenuOptions {
  buttonId?: string;
  menuId?: string;
  breakpoint?: number;
  onOpen?: () => void;
}

export function initMobileMenu(options: MobileMenuOptions = {}): void {
  const { buttonId = 'headerBurger', menuId = 'mobileMenu', breakpoint = 768, onOpen } = options;

  const button = document.getElementById(buttonId);
  const menu = document.getElementById(menuId);

  if (!button || !menu) return;

  let isOpen = false;
  let previousActiveElement: Element | null = null;
  let removeTrapFocus: (() => void) | null = null;

  const toggleBodyScroll = (disable: boolean): void => {
    if (disable) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    }
  };

  const trapFocus = (menuElement: HTMLElement): (() => void) => {
    const focusableElements = menuElement.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return () => {};

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeydown = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    menuElement.addEventListener('keydown', handleKeydown);
    return () => menuElement.removeEventListener('keydown', handleKeydown);
  };

  const openMenu = (): void => {
    if (isOpen) return;

    isOpen = true;
    previousActiveElement = document.activeElement;

    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Закрыть меню');
    menu.setAttribute('aria-hidden', 'false');

    button.classList.add('active');
    menu.classList.add('active');

    toggleBodyScroll(true);
    removeTrapFocus = trapFocus(menu);

    setTimeout(() => {
      const firstLink = menu.querySelector('a');
      if (firstLink) (firstLink as HTMLElement).focus();
    }, 100);

    onOpen?.();
  };

  const closeMenu = (): void => {
    if (!isOpen) return;

    isOpen = false;

    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Открыть меню');
    menu.setAttribute('aria-hidden', 'true');
    button.classList.remove('active');
    menu.classList.remove('active');

    setTimeout(() => {
      toggleBodyScroll(false);
    }, 400);

    removeTrapFocus?.();
    removeTrapFocus = null;

    if (previousActiveElement) {
      (previousActiveElement as HTMLElement).focus();
    }
  };

  const toggleMenu = (): void => {
    isOpen ? closeMenu() : openMenu();
  };

  const handleButtonClick = (): void => toggleMenu();
  const handleLinkClick = (): void => closeMenu();
  const handleOverlayClick = (e: MouseEvent): void => {
    if (e.target === menu) closeMenu();
  };

  let resizeTimeout: number;
  const handleResize = (): void => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      if (window.innerWidth > breakpoint && isOpen) closeMenu();
    }, 100);
  };

  const handleEscapeKey = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  };

  button.addEventListener('click', handleButtonClick);
  menu.addEventListener('click', handleOverlayClick);

  menu.querySelectorAll('.nav-item').forEach((link) => {
    link.addEventListener('click', handleLinkClick);
  });

  document.addEventListener('keydown', handleEscapeKey);
  window.addEventListener('resize', handleResize);
}

export default initMobileMenu;

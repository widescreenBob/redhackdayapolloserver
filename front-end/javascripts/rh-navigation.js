class NavDropdownExpandEvent extends Event {
  constructor (active, dropdown) {
    super('expand', { bubbles: true, cancelable: true });
    this.active = active;
    this.dropdown = dropdown;
  }
}

class RhNavigation {
  #element;
  #nav;
  #mobileMenu;
  #mobileMenuButton;
  #mobileMenuState = false;
  #overlay;
  #observer;
  #dropdowns = [];
  #rtiItems = [];
  #rtiActiveItem;
  #rtiGainedInitialFocus = false;
  #rtiFocusableSelector = '.rh-navigation-menu .rh-navigation-dropdown > a, .rh-navigation-menu-primary > ul > li > a, .rh-navigation-menu-secondary > ul > li > a';

  get #activeDropdown () {
    const active = [...this.#dropdowns].map(dropdown => {
      return dropdown.parentElement?.hasAttribute('active');
    });
    return active.includes(true);
  }

  get #isCompact () {
    return (this.#element?.getBoundingClientRect().width ?? 0) <= 992;
  }

  get #rtiFocusableItems () {
    if (!this.#element) {
      return;
    }
    return [...this.#element.querySelectorAll(this.#rtiFocusableSelector)];
  }

  get #rtiActiveIndex () {
    return !!this.#rtiFocusableItems && !!this.#rtiActiveItem
      ? this.#rtiFocusableItems.indexOf(this.#rtiActiveItem)
      : -1;
  }

  get #rtiFirstItem () {
    return this.#rtiFocusableItems?.at(0);
  }

  get #rtiLastItem () {
    return this.#rtiFocusableItems?.at(-1);
  }

  get #rtiNextItem () {
    if (!this.#rtiFocusableItems) {
      return;
    }
    return this.#rtiActiveIndex >= this.#rtiFocusableItems.length - 1
      ? this.#rtiFirstItem
      : this.#rtiFocusableItems[this.#rtiActiveIndex + 1];
  }

  get #rtiPrevItem () {
    if (!this.#rtiFocusableItems) {
      return;
    }
    return this.#rtiActiveIndex > 0
      ? this.#rtiFocusableItems[this.#rtiActiveIndex - 1]
      : this.#rtiLastItem;
  }

  constructor (selectorId) {
    this.#element = document.querySelector(selectorId);
    if (!this.#element) {
      /* eslint-disable no-console */
      console.warn('No element found with given selector');
      return;
    }
    this.#nav = this.#element.querySelector('nav');
    this.#dropdowns = [
      ...this.#element.querySelectorAll(
        '.rh-navigation-menu .rh-navigation-dropdown > a'
      )
    ];
    this.#mobileMenu = this.#element.querySelector('.rh-navigation-menu');
    this.#mobileMenuButton = this.#element.querySelector(
      '.rh-navigation-mobile-menu-button button'
    );
    if (this.#mobileMenu) {
      this.#rtiItems =
        [
          ...this.#mobileMenu.querySelectorAll(
            '.rh-navigation-dropdown > a, :scope > *:is(.rh-navigation-menu-primary, .rh-navigation-menu-secondary) > ul > li > a'
          )
        ] ?? [];
    }
    this.#createOverlay();
    this.#init();
  }

  #init () {
    if (!this.#element) {
      return;
    }

    // click listeners
    this.#mobileMenuButton?.addEventListener(
      'click',
      this.#onMobileMenuButtonClick.bind(this)
    );

    if (this.#dropdowns.length > 0) {
      [...this.#dropdowns].map(dropdown => {
        dropdown.addEventListener('click', this.#onDropdownClick.bind(this));
        // aria-expanded on dropdowns
        dropdown.setAttribute('aria-expanded', 'false');
      });
    }

    // key bindings
    this.#element?.addEventListener('keydown', this.#onKeydown.bind(this));
    window.addEventListener('keyup', this.#onKeyup.bind(this));
    this.#observer = new ResizeObserver(entries => {
      this.#onResize();
    });
    this.#observer.observe(this.#element);
    // RTI
    this.#mobileMenu?.addEventListener(
      'focusin',
      () => {
        this.#rtiGainedInitialFocus = true;
      },
      { once: true }
    );
    this.#rtiUpdateItems();
  }

  #onMobileMenuButtonClick () {
    this.#mobileMenuState =
      this.#mobileMenuButton?.getAttribute('aria-expanded') !== 'true';
    // toggleState
    if (this.#mobileMenuState) {
      this.#openMobileMenu();
      this.#openOverlay();
    } else {
      this.#closeMobileMenu();
      this.#closeOverlay();
    }
  }

  #openMobileMenu () {
    this.#mobileMenuState = true;
    this.#mobileMenuButton?.setAttribute('aria-expanded', 'true');
    this.#mobileMenu?.setAttribute('active', '');
  }

  #closeMobileMenu () {
    this.#mobileMenuState = false;
    this.#mobileMenuButton?.setAttribute('aria-expanded', 'false');
    this.#mobileMenu?.removeAttribute('active');
  }

  #onDropdownClick (event) {
    event.preventDefault();
    // close any prior opened menus
    const dropdownLink = event.target;
    if (!dropdownLink || !dropdownLink.parentElement) {
      return;
    }
    this.#closeDropdowns(dropdownLink);
    if (!dropdownLink.parentElement.hasAttribute('active')) {
      dropdownLink.parentElement.setAttribute('active', '');
      dropdownLink.setAttribute('aria-expanded', 'true');
      this.#element?.dispatchEvent(
        new NavDropdownExpandEvent(true, dropdownLink.parentElement)
      );
      if (this.#isCompact) {
        return;
      }
      this.#openOverlay();
    } else {
      dropdownLink.parentElement.removeAttribute('active');
      dropdownLink.setAttribute('aria-expanded', 'false');
      this.#element?.dispatchEvent(
        new NavDropdownExpandEvent(false, dropdownLink.parentElement)
      );
      if (this.#isCompact) {
        return;
      }
      this.#closeOverlay();
    }
  }

  #closeDropdowns (except = null) {
    [...this.#dropdowns].map(dropdown => {
      if (dropdown !== except) {
        dropdown.parentElement?.removeAttribute('active');
      }
    });
  }

  #closeDropdown (dropdown) {
    if (dropdown.hasAttribute('active') === false) {
      return;
    }
    dropdown.removeAttribute('active');
  }

  #createOverlay () {
    this.#overlay = document.createElement('div');
    const overlayClass = 'rh-navigation-overlay';
    this.#overlay.classList.add(overlayClass);
    this.#nav?.after(this.#overlay);
    this.#overlay.addEventListener('click', this.close.bind(this));
  }

  #openOverlay () {
    this.#overlay?.setAttribute('open', '');
  }

  #closeOverlay () {
    this.#overlay?.removeAttribute('open');
  }

  #onResize () {
    if (this.#isCompact) {
      // going to mobile
      if (this.#activeDropdown) {
        this.#openMobileMenu();
        this.#openOverlay();
      }
    } else {
      // going to desktop
      this.#closeMobileMenu();
      if (!this.#activeDropdown) {
        this.#closeOverlay();
      }
    }
  }

  #onKeydown (event) {
    let shouldPreventDefault = false;
    switch (event.key) {
      case 'Escape': {
        if (this.#isCompact) {
          this.#mobileMenuButton?.focus();
        } else {
          this.#rtiActiveItem?.focus();
        }
        this.close();
        break;
      }
      case 'Tab':
        this.#onTab(event);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        if (!this.#rtiPrevItem) {
          return;
        }
        this.#rtiSetActiveItem(this.#rtiPrevItem);
        shouldPreventDefault = true;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        if (!this.#rtiNextItem) {
          return;
        }
        this.#rtiSetActiveItem(this.#rtiNextItem);
        shouldPreventDefault = true;
        break;
      case 'Home':
        if (!this.#rtiFirstItem) {
          return;
        }
        this.#rtiSetActiveItem(this.#rtiFirstItem);
        shouldPreventDefault = true;
        break;
      case 'End':
        if (!this.#rtiLastItem) {
          return;
        }
        this.#rtiSetActiveItem(this.#rtiLastItem);
        shouldPreventDefault = true;
        break;
      default:
        break;
    }
    if (shouldPreventDefault) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  #onKeyup (event) {
    switch (event.key) {
      case 'Tab':
        this.#onTabKeyup(event);
        break;
    }
  }

  #focusableChildElements (parent) {
    return parent.querySelectorAll(`:not(:scope), a,
                                    button:not([disabled]),
                                    input:not([disabled]),
                                    select:not([disabled]),
                                    textarea:not([disabled]),
                                    [tabindex]:not([tabindex="-1"]):not([disabled]),
                                    details:not([disabled]),
                                    summary:not(:disabled)`);
  }

  #onTab (event) {
    const target = event.target;
    const dropdownParent = this.#dropdowns.find(dropdown =>
      dropdown.parentElement?.contains(target)
    )?.parentElement;
    if (!dropdownParent) {
      return;
    }
    const focusableChildren = this.#focusableChildElements(dropdownParent);
    if (!focusableChildren) {
      return;
    }

    if (event.shiftKey) {
      const firstFocusable = focusableChildren[0].contains(target);
      if (!firstFocusable) {

      } else {
        this.#closeDropdown(dropdownParent);
        if (!this.#rtiPrevItem) {
          return;
        }
        this.#rtiSetActiveItem(this.#rtiPrevItem);
        this.#rtiActiveItem?.focus();
      }
    } else {
      const lastFocusable = focusableChildren[
        focusableChildren.length - 1
      ].contains(target);
      if (!lastFocusable) {
        return;
      }
      event.preventDefault();
      this.#closeDropdown(dropdownParent);

      if (!this.#rtiNextItem) {
        return;
      }
      this.#rtiSetActiveItem(this.#rtiNextItem);
      this.#rtiActiveItem?.focus();
    }
  }

  #onTabKeyup (event) {
    if (!this.#element) {
      return;
    }
    const { target } = event;
    if (!this.#element.contains(target)) {
      this.#closeMobileMenu();
      this.#closeOverlay();
    }
  }

  #rtiUpdateItems () {
    if (!this.#rtiFirstItem) {
      return;
    }
    this.#rtiSetActiveItem(this.#rtiFirstItem);
  }

  #rtiSetActiveItem (item) {
    this.#rtiActiveItem = item;
    for (const item of this.#rtiItems) {
      item.tabIndex = this.#rtiActiveItem === item ? 0 : -1;
    }
    if (this.#rtiGainedInitialFocus) {
      this.#rtiActiveItem?.focus();
    }
  }

  close () {
    if (this.#isCompact) {
      this.#closeMobileMenu();
    }
    this.#closeDropdowns();
    this.#closeOverlay();
  }
}

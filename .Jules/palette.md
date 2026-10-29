## 2025-05-18 - Modal Dialog Accessibility & Body Scroll Lock
**Learning:** In React single-page applications with multiple modal overlays, preview/detail modals often lack standard keyboard close handling (`Escape` key) and background scroll locking, unlike primary drawers/dialogs.
**Action:** When implementing modal overlays or quick view popups, always include an `useEffect` hook to lock `document.body.style.overflow`, add an `Escape` key listener, include an explicit close button with `aria-label`, and use `aria-labelledby` referencing the modal title.

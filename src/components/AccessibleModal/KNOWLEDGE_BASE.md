# Modal Component Knowledge Base

## Key Concepts

### 1. Modal Dialog Purpose & Best Practices
- Interrupts the main workflow intentionally
- Used for important interactions requiring immediate attention
- Examples from our implementation:
  - Confirmation dialogs
  - Forms
  - Important messages
- When to use:
  - Critical user decisions
  - Required form input
  - Important notifications
- When not to use:
  - Non-critical information
  - Marketing content
  - Optional interactions

### 2. Focus Management Implementation
- Using the useFocusTrap hook for reliable focus management
- Key components:
  ```typescript
  const useFocusTrap = ({ isOpen, onClose }) => {
    // Store previous focus
    const previousActiveElement = useRef<HTMLElement | null>(null);
    
    // Set initial focus on first interactive element
    const setInitialFocus = useCallback(() => {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements?.length) {
        focusableElements[0].focus();
      }
    }, []);

    // Restore focus on close
    const restoreFocus = useCallback(() => {
      previousActiveElement.current?.focus();
    }, []);
  };
  ```

### 3. ARIA Implementation Guide
Currently implemented:
```tsx
<div 
  ref={modalRef}
  role="dialog"
  aria-modal="true"
  aria-labelledby={titleId}
  aria-describedby={descriptionId}
  className="modal-overlay"
>
  <div className="modal-content">
    <header>
      <h2 id={titleId}>Modal Title</h2>
      <button aria-label="Close modal">×</button>
    </header>
    <main id={descriptionId}>Content</main>
  </div>
</div>
```

### 4. Keyboard Navigation
Currently implemented:
- Escape key closes modal
- Tab/Shift+Tab cycles through focusable elements
- Focus trap prevents focus from leaving modal
- Return focus to trigger element on close

Implementation details:
```typescript
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && onClose) {
    onClose();
    return;
  }

  if (event.key === 'Tab') {
    // Focus trap logic
    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      event.preventDefault();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      event.preventDefault();
    }
  }
};
```

### 5. Animation Support
Currently implemented:
```css
@media (prefers-reduced-motion: no-preference) {
  .modal-backdrop {
    animation: fadeIn 0.2s ease-out;
  }

  .modal-content {
    animation: slideIn 0.2s ease-out;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 6. Testing Strategies
Currently implemented tests:
```typescript
// Basic rendering
it('should not show modal content when closed', () => {
  render(<AccessibleModal />);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

// ARIA attributes
it('should have proper ARIA attributes when open', () => {
  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-modal', 'true');
  expect(dialog).toHaveAttribute('aria-labelledby');
  expect(dialog).toHaveAttribute('aria-describedby');
});

// Focus management
it('should trap focus within modal when open', () => {
  const firstElement = getFocusableElements()[0];
  const lastElement = getFocusableElements()[lastIndex];
  
  lastElement.focus();
  fireEvent.keyDown(lastElement, { key: 'Tab' });
  expect(document.activeElement).toBe(firstElement);
});
```

### 7. Common Issues & Solutions

#### Focus Management
- Issue: Focus getting trapped in browser UI
  - Solution: Ensure all focusable elements are properly identified
  - Solution: Use established focusable element selectors

- Issue: Focus not returning to trigger
  - Solution: Store trigger reference before opening
  - Solution: Use useRef for persistent reference

#### Screen Reader Support
- Issue: Modal not announced properly
  - Solution: Proper ARIA labeling
  - Solution: Clear heading structure

- Issue: Background content interfering
  - Solution: aria-hidden management
  - Solution: Consider using inert attribute

#### Animation Accessibility
- Issue: Motion sensitivity
  - Solution: prefers-reduced-motion media query
  - Solution: Minimal, subtle animations

## Resources
1. [W3C Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
2. [MDN Dialog Role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role)
3. [WCAG 2.1 Focus Management](https://www.w3.org/WAI/WCAG21/Understanding/focus-management.html)
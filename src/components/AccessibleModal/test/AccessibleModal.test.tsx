import { describe, expect, it, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { axe } from 'vitest-axe';
import AccessibleModal from '../AccessibleModal';

describe('AccessibleModal', () => {
  afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  // Basic rendering tests
  it('should not show modal content when closed', () => {
    render(<AccessibleModal />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should show modal content when open button is clicked', () => {
    const { container } = render(<AccessibleModal />);
    const openButton = container.querySelector('.open-modal-button') as HTMLElement;
    fireEvent.click(openButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  // Accessibility tests
  it('should pass basic accessibility tests', async () => {
    const { container } = render(<AccessibleModal />);
    const results = await axe(container);
    expect(results.violations.length).toBe(0);
  });

  it('should have proper ARIA attributes when open', () => {
    const { container } = render(<AccessibleModal />);
    const openButton = container.querySelector('.open-modal-button') as HTMLElement;
    fireEvent.click(openButton);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');
  });

  // Keyboard interaction tests
  it('should close on escape key press', () => {
    const { container } = render(<AccessibleModal />);
    const openButton = container.querySelector('.open-modal-button') as HTMLElement;
    fireEvent.click(openButton);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should trap focus within modal when open', () => {
    const { container } = render(<AccessibleModal />);
    const openButton = container.querySelector('.open-modal-button') as HTMLElement;
    fireEvent.click(openButton);
    
    const dialog = screen.getByRole('dialog');
    const focusableElements = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    // Check if focus is trapped at the end
    lastElement.focus();
    fireEvent.keyDown(lastElement, { key: 'Tab' });
    expect(document.activeElement).toBe(firstElement);
    
    // Check if focus is trapped at the beginning
    firstElement.focus();
    fireEvent.keyDown(firstElement, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(lastElement);
  });

  // Focus management tests
  it('should move focus to first focusable element when opened', () => {
    const { container } = render(<AccessibleModal />);
    const openButton = container.querySelector('.open-modal-button') as HTMLElement;
    openButton.focus();
    fireEvent.click(openButton);
    
    const closeButton = screen.getByLabelText('Close modal');
    expect(document.activeElement).toBe(closeButton);
  });

  it('should return focus to trigger element when closed', () => {
    const { container } = render(<AccessibleModal />);
    const openButton = container.querySelector('.open-modal-button') as HTMLElement;
    openButton.focus();
    fireEvent.click(openButton);
    
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    
    expect(document.activeElement).toBe(openButton);
  });
});
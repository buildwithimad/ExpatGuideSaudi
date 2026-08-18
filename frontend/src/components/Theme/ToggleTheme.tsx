'use client';

import AppIcon from '@/components/ui/AppIcon';
import { useTheme } from 'next-themes';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

// ============================================================================
// Types & Constants
// ============================================================================

type ThemeOption = 'light' | 'dark' | 'system';

interface ThemeDefinition {
  id: ThemeOption;
  label: string;
  icon: string;
}

const THEMES: ThemeDefinition[] = [
  { id: 'light', label: 'Light', icon: 'SunIcon' },
  { id: 'dark', label: 'Dark', icon: 'MoonIcon' },
  { id: 'system', label: 'System', icon: 'ComputerDesktopIcon' },
];

// ============================================================================
// Helper Components
// ============================================================================

// Extracted to prevent unnecessary re-renders of the menu items
const MenuItem = memo(({ 
  theme, 
  isActive, 
  onClick 
}: { 
  theme: ThemeDefinition; 
  isActive: boolean; 
  onClick: (id: ThemeOption) => void;
}) => (
  <button
    role="menuitemradio"
    aria-checked={isActive}
    tabIndex={-1} // Handled by keyboard navigation logic
    onClick={() => onClick(theme.id)}
    className={`group flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-[14px] transition-all duration-200 outline-none focus-visible:bg-muted/70 ${
      isActive
        ? 'bg-muted/80 text-foreground font-semibold'
        : 'text-muted-foreground font-medium hover:bg-muted/50 hover:text-foreground'
    }`}
  >
    <AppIcon 
      name={theme.icon} 
      size={16} 
      className={`transition-colors duration-200 ${
        isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
      }`} 
    />
    <span className="flex-1 text-left">{theme.label}</span>
    
    {/* Premium minimal active indicator */}
    <div 
      className={`h-1.5 w-1.5 rounded-full bg-foreground transition-all duration-200 ease-[0.22,1,0.36,1] ${
        isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`} 
      aria-hidden="true"
    />
  </button>
));
MenuItem.displayName = 'MenuItem';

// ============================================================================
// Main Component
// ============================================================================

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Prevent hydration mismatch & layout shift
  useEffect(() => {
    setMounted(true);
  }, []);

  // ==========================================================================
  // Interactions & Accessibility
  // ==========================================================================

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSelect = useCallback((selectedId: ThemeOption) => {
    setTheme(selectedId);
    closeMenu();
    // Return focus to trigger after selection for accessibility
    triggerRef.current?.focus();
  }, [setTheme, closeMenu]);

  // Click outside listener
  useEffect(() => {
    if (!open) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, closeMenu]);

  // Keyboard navigation listener
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!open) return;

    const items = Array.from(menuRef.current?.querySelectorAll('[role="menuitemradio"]') || []) as HTMLElement[];
    if (!items.length) return;

    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        closeMenu();
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[prevIndex]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        items[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
    }
  }, [open, closeMenu]);

  // Manage focus when opening
  useEffect(() => {
    if (open) {
      // Use requestAnimationFrame to ensure the menu is mounted and visible before focusing
      requestAnimationFrame(() => {
        const activeItem = menuRef.current?.querySelector('[aria-checked="true"]') as HTMLElement;
        const firstItem = menuRef.current?.querySelector('[role="menuitemradio"]') as HTMLElement;
        (activeItem || firstItem)?.focus();
      });
    }
  }, [open]);

  // ==========================================================================
  // Render
  // ==========================================================================

  // Skeleton to prevent layout shift during SSR hydration (maintains exact 36x36 size)
  if (!mounted) {
    return (
      <div className="h-9 w-9" aria-hidden="true" />
    );
  }

  const currentIcon = resolvedTheme === 'dark' 
    ? 'MoonIcon' 
    : resolvedTheme === 'light' 
      ? 'SunIcon' 
      : 'ComputerDesktopIcon';

  return (
    <div 
      className="relative" 
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Toggle theme"
        className={`group relative flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          open 
            ? 'bg-muted/70 text-foreground' 
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 active:scale-95'
        }`}
      >
        {/* Overlaid icons for seamless, pure-CSS fading transitions */}
        <div className="relative flex h-full w-full items-center justify-center transition-colors duration-200">
          <div className={`absolute transition-all duration-300 ease-[0.22,1,0.36,1] ${currentIcon === 'SunIcon' ? 'opacity-100 scale-100' : 'opacity-0 scale-50 -rotate-45'}`}>
            <AppIcon name="SunIcon" size={19} />
          </div>
          <div className={`absolute transition-all duration-300 ease-[0.22,1,0.36,1] ${currentIcon === 'MoonIcon' ? 'opacity-100 scale-100' : 'opacity-0 scale-50 rotate-45'}`}>
            <AppIcon name="MoonIcon" size={19} />
          </div>
          <div className={`absolute transition-all duration-300 ease-[0.22,1,0.36,1] ${currentIcon === 'ComputerDesktopIcon' ? 'opacity-100 scale-100' : 'opacity-0 scale-50 translate-y-1'}`}>
            <AppIcon name="ComputerDesktopIcon" size={19} />
          </div>
        </div>
      </button>

      {/* Floating Menu */}
      <div
        ref={menuRef}
        role="menu"
        aria-orientation="vertical"
        className={`absolute right-0 top-full mt-2 w-[160px] origin-top-right rounded-xl border border-border bg-background p-1.5 shadow-md transition-all duration-200 ease-[0.22,1,0.36,1] z-50 ${
          open
            ? 'visible opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'invisible opacity-0 scale-[0.96] -translate-y-1.5 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-0.5">
          {THEMES.map((themeOption) => (
            <MenuItem
              key={themeOption.id}
              theme={themeOption}
              isActive={theme === themeOption.id}
              onClick={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
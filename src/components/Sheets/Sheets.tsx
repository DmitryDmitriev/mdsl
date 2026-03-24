import type { HTMLAttributes, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { spacing, stack, radius } from '@/tokens';
import { semantic } from '@/tokens/colors';

export type SheetsAnchor = 'bottom' | 'top';
export type SheetsSize = 'full' | 'half' | 'auto';

export interface SheetsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Открыта ли панель */
  open: boolean;
  /** Вызывается при запросе закрытия (backdrop, Escape, кнопка закрытия) */
  onClose?: () => void;
  /** Сторона появления: bottom (по умолчанию) или top */
  anchor?: SheetsAnchor;
  /** Размер панели: full (100%), half (50%), auto (по контенту) */
  size?: SheetsSize;
  /** Показывать ручку (handle) сверху */
  withHandle?: boolean;
  /** Показывать хедер с заголовком и кнопкой закрытия */
  withHeader?: boolean;
  /** Заголовок хедера */
  title?: ReactNode;
  /** Контент панели */
  children?: ReactNode;
  /** Закрывать по клику на подложку (по умолчанию true) */
  closeOnBackdropClick?: boolean;
  /** Контейнер для портала (по умолчанию document.body) */
  container?: HTMLElement | null;
}

const handleStyle: React.CSSProperties = {
  width: spacing[10],
  height: spacing[1],
  borderRadius: radius.pill,
  background: semantic.text.tertiary,
  flexShrink: 0,
};

function getPanelHeight(size: SheetsSize): string {
  switch (size) {
    case 'full':
      return '100%';
    case 'half':
      return '50%';
    case 'auto':
    default:
      return 'auto';
  }
}

function getPanelMaxHeight(size: SheetsSize): string {
  if (size === 'auto') return '90dvh';
  return 'none';
}

export function Sheets({
  open,
  onClose,
  anchor = 'bottom',
  size = 'auto',
  withHandle = true,
  withHeader = false,
  title,
  children,
  closeOnBackdropClick = true,
  container = typeof document !== 'undefined' ? document.body : null,
  style,
  ...rest
}: SheetsProps) {
  if (!open) return null;

  const isBottom = anchor === 'bottom';
  const panelHeight = getPanelHeight(size);
  const panelMaxHeight = getPanelMaxHeight(size);

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: semantic.background.overlay,
    zIndex: 1000,
    animation: 'sheets-backdrop-in 0.2s ease-out',
  };

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    right: 0,
    width: '100%',
    height: panelHeight,
    maxHeight: panelMaxHeight,
    background: semantic.surface.primary,
    borderRadius: isBottom ? `${radius.overlay}px ${radius.overlay}px 0 0` : `0 0 ${radius.overlay}px ${radius.overlay}px`,
    boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: isBottom ? 'sheets-panel-in-bottom 0.25s ease-out' : 'sheets-panel-in-top 0.25s ease-out',
    ...(isBottom ? { bottom: 0 } : { top: 0 }),
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose?.();
  };

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={withHeader && title ? 'sheets-title' : undefined}
      onKeyDown={handleKeyDown}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, pointerEvents: 'none' }}
    >
      <div
        role="presentation"
        style={{ ...backdropStyle, pointerEvents: closeOnBackdropClick ? 'auto' : 'none' }}
        onClick={closeOnBackdropClick ? onClose : undefined}
        onKeyDown={handleKeyDown}
      />
      <div
        style={{ ...panelStyle, pointerEvents: 'auto' }}
        onClick={(e) => e.stopPropagation()}
        {...rest}
      >
        {withHandle && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: stack.sm,
              paddingBottom: stack.sm,
              flexShrink: 0,
            }}
          >
            <div style={handleStyle} aria-hidden />
          </div>
        )}
        {withHeader && (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: spacing[2],
                paddingLeft: spacing[4],
                paddingRight: spacing[4],
                paddingTop: spacing[3],
                paddingBottom: spacing[3],
                flexShrink: 0,
              }}
            >
              {title != null && (
                <span
                  id="sheets-title"
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    lineHeight: '22px',
                    color: semantic.text.primary,
                  }}
                >
                  {title}
                </span>
              )}
              {onClose && (
                <button
                  type="button"
                  aria-label="Закрыть"
                  onClick={onClose}
                  style={{
                    width: 24,
                    height: 24,
                    padding: 0,
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: semantic.text.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: radius.controlMd,
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <div
              style={{
                height: 1,
                background: semantic.border.default,
                flexShrink: 0,
              }}
            />
          </>
        )}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            paddingTop: stack.md,
            paddingBottom: stack.md,
            paddingLeft: spacing[4],
            paddingRight: spacing[4],
            color: semantic.text.primary,
            ...style,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );

  if (container) {
    return createPortal(content, container);
  }
  return content;
}

import type { HTMLAttributes } from 'react';
import { spacing, radius, size as sizeTokens } from '@/tokens';
import { semantic } from '@/tokens/colors';

export type BadgeVariant = keyof typeof semantic.decor;
export type BadgeSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg';
export type BadgeShape = 'pill' | 'rounded';

/**
 * Размеры бейджа по шкале size/* (docs/badge-spec.md §3):
 * - 2xs: 16px (size/2xs) — микро-индикаторы, dot-каунтеры
 * - xs: 20px (size/xs) — каунтеры в trailing list items
 * - sm: 32px (size/sm) — компактный бейдж
 * - md: 40px (size/md) — стандартный бейдж
 * - lg: 48px (size/lg) — крупный бейдж
 */
const sizeStyles: Record<BadgeSize, React.CSSProperties & { iconSize: number }> = {
  '2xs': {
    height: sizeTokens['2xs'], // 16px
    paddingTop: spacing[1],
    paddingBottom: spacing[1],
    paddingLeft: spacing[1],
    paddingRight: spacing[1],
    gap: spacing[1],
    fontSize: 10,
    lineHeight: '12px',
    iconSize: 12,
  },
  xs: {
    height: sizeTokens.xs, // 20px
    paddingTop: spacing[1],
    paddingBottom: spacing[1],
    paddingLeft: spacing[1],
    paddingRight: spacing[1],
    gap: spacing[1],
    fontSize: 10,
    lineHeight: '12px',
    iconSize: 12,
  },
  sm: {
    height: sizeTokens.sm, // 32px
    paddingTop: spacing[2],
    paddingBottom: spacing[2],
    paddingLeft: spacing[2],
    paddingRight: spacing[2],
    gap: spacing[1],
    fontSize: 12,
    lineHeight: '16px',
    iconSize: 16,
  },
  md: {
    height: sizeTokens.md, // 40px
    paddingTop: spacing[3],
    paddingBottom: spacing[3],
    paddingLeft: spacing[2],
    paddingRight: spacing[2],
    gap: spacing[1],
    fontSize: 14,
    lineHeight: '20px',
    iconSize: 24,
  },
  lg: {
    height: sizeTokens.lg, // 48px
    paddingTop: spacing[4],
    paddingBottom: spacing[4],
    paddingLeft: spacing[3],
    paddingRight: spacing[3],
    gap: spacing[1],
    fontSize: 14,
    lineHeight: '20px',
    iconSize: 24,
  },
};

function getVariantStyles(variant: BadgeVariant): React.CSSProperties {
  const { bg, text } = semantic.decor[variant];
  return {
    background: bg,
    color: text,
  };
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Семантический вариант (decor: good, info, warning, negative, question, answer, admin) */
  variant?: BadgeVariant;
  /** Размер: 2xs (16px), xs (20px), sm (32px), md (40px), lg (48px) */
  size?: BadgeSize;
  /** Форма: pill (капсула) или rounded (скруглённый прямоугольник) */
  shape?: BadgeShape;
  /** Иконка слева от текста */
  icon?: React.ReactNode;
  /** Каунтер справа от текста (число или строка) */
  counter?: React.ReactNode;
  children?: React.ReactNode;
}

export function Badge({
  variant = 'question',
  size = 'sm',
  shape = 'pill',
  icon,
  counter,
  children,
  style,
  ...rest
}: BadgeProps) {
  const { iconSize, ...sizeStyle } = sizeStyles[size];
  const variantStyle = getVariantStyles(variant);
  const borderRadius = shape === 'pill' ? radius.pill : radius.controlMd;

  return (
    <span
      role="status"
      style={{
        fontFamily: 'var(--font-family, system-ui)',
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        borderRadius,
        ...sizeStyle,
        ...variantStyle,
        ...style,
      }}
      {...rest}
    >
      {icon != null && (
        <span style={{ display: 'flex', flexShrink: 0, width: iconSize, height: iconSize }}>
          {icon}
        </span>
      )}
      {children != null && <span>{children}</span>}
      {counter != null && <span>{counter}</span>}
    </span>
  );
}

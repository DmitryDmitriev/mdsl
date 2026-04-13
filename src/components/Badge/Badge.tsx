import type { HTMLAttributes } from 'react';
import { spacing, radius, size } from '@/tokens';
import { semantic } from '@/tokens/colors';

export type BadgeVariant = keyof typeof semantic.decor;
export type BadgeSize = 'xs' | 'sm' | 'md';
export type BadgeShape = 'pill' | 'rounded';

/** Размеры по шкале size: xs = size/md (32), sm = size/lg (40), md = size/xl (48). */
const sizeStyles: Record<BadgeSize, React.CSSProperties> = {
  xs: {
    height: size.md, // 32px — size/md
    paddingTop: spacing[2],
    paddingBottom: spacing[2],
    paddingLeft: spacing[2],
    paddingRight: spacing[2],
    gap: spacing[1],
    fontSize: 12,
    lineHeight: '16px',
  },
  sm: {
    height: size.lg, // 40px — size/lg
    paddingTop: spacing[3],
    paddingBottom: spacing[3],
    paddingLeft: spacing[2], // 8 px — docs/badge-spec.md
    paddingRight: spacing[2],
    gap: spacing[1],
    fontSize: 14,
    lineHeight: '20px',
  },
  md: {
    height: size.xl, // 48px — size/xl
    paddingTop: spacing[4],
    paddingBottom: spacing[4],
    paddingLeft: spacing[3],
    paddingRight: spacing[3],
    gap: spacing[1],
    fontSize: 14,
    lineHeight: '20px', // Body 2 Medium — docs/badge-spec.md
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
  /** Размер: xs (32 px), sm (40 px), md (48 px) — по size/md / size/lg / size/xl */
  size?: BadgeSize;
  /** Форма: pill (капсула) или rounded (скруглённый прямоугольник) */
  shape?: BadgeShape;
  /** Иконка слева от текста */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function Badge({
  variant = 'question',
  size = 'md',
  shape = 'pill',
  icon,
  children,
  style,
  ...rest
}: BadgeProps) {
  const sizeStyle = sizeStyles[size];
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
      {icon != null && <span style={{ display: 'flex', flexShrink: 0 }}>{icon}</span>}
      {children != null && <span>{children}</span>}
    </span>
  );
}

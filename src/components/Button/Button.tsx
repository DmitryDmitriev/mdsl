import type { ButtonHTMLAttributes } from 'react';
import { height, buttonPaddingX, buttonGap, radius, borderWidth } from '@/tokens';
import { semantic } from '@/tokens/colors';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  xs: {
    height: height.xs,
    paddingLeft: buttonPaddingX.xs,
    paddingRight: buttonPaddingX.xs,
    gap: buttonGap.xs,
    borderRadius: radius.controlMd,
    fontSize: 12,
    lineHeight: '16px',
  },
  sm: {
    height: height.sm,
    paddingLeft: buttonPaddingX.sm,
    paddingRight: buttonPaddingX.sm,
    gap: buttonGap.sm,
    borderRadius: radius.controlLg,
    fontSize: 14,
    lineHeight: '20px',
  },
  md: {
    height: height.md,
    paddingLeft: buttonPaddingX.md,
    paddingRight: buttonPaddingX.md,
    gap: buttonGap.md,
    borderRadius: radius.controlLg,
    fontSize: 14,
    lineHeight: '20px',
  },
  lg: {
    height: height.lg,
    paddingLeft: buttonPaddingX.lg,
    paddingRight: buttonPaddingX.lg,
    gap: buttonGap.lg,
    borderRadius: radius.controlLg,
    fontSize: 16,
    lineHeight: '24px',
  },
};

function outlineStrokeW(size: ButtonSize): number {
  return size === 'xs' ? borderWidth.default : borderWidth.emphasis;
}

function getVariantStyles(
  variant: ButtonVariant,
  disabled: boolean,
  size: ButtonSize
): React.CSSProperties {
  const outlineW = outlineStrokeW(size);
  if (disabled) {
    return {
      background: variant === 'primary' || variant === 'secondary' ? semantic.background.tertiary : 'transparent',
      color: semantic.text.tertiary,
      border:
        variant === 'outline'
          ? `${outlineW}px solid ${semantic.border.disabled}`
          : '1px solid transparent',
    };
  }
  switch (variant) {
    case 'primary':
      return {
        background: semantic.accent.primary,
        color: semantic.text.inverted,
        border: '1px solid transparent',
      };
    case 'secondary':
      return {
        background: semantic.accent.secondary,
        color: semantic.text.primary,
        border: `1px solid ${semantic.border.default}`,
      };
    case 'outline':
      return {
        background: 'transparent',
        color: semantic.text.primary,
        border: `${outlineW}px solid ${semantic.border.default}`,
      };
    case 'ghost':
      return {
        background: 'transparent',
        color: semantic.text.primary,
        border: '1px solid transparent',
      };
  }
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
}

export function Button({
  size = 'md',
  variant = 'primary',
  icon,
  iconPosition = 'left',
  disabled = false,
  children,
  style,
  ...rest
}: ButtonProps) {
  const sizeStyle = sizeStyles[size];
  const variantStyle = getVariantStyles(variant, disabled, size);
  const isIconOnly = !children && icon;

  return (
    <button
      type="button"
      disabled={disabled}
      style={{
        fontFamily: 'var(--font-family, system-ui)',
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        minWidth: isIconOnly ? sizeStyle.height : undefined,
        ...sizeStyle,
        ...variantStyle,
        ...style,
      }}
      {...rest}
    >
      {icon && iconPosition === 'left' && <span style={{ display: 'flex' }}>{icon}</span>}
      {children && <span>{children}</span>}
      {icon && iconPosition === 'right' && <span style={{ display: 'flex' }}>{icon}</span>}
    </button>
  );
}

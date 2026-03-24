import { useState, type CSSProperties, type ImgHTMLAttributes } from 'react';
import { height, radius, spacing } from '@/tokens';
import { semantic } from '@/tokens/colors';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';
export type AvatarStatus = 'online' | 'offline' | 'away';

const sizeMap = {
  xs: height.xs,
  sm: height.sm,
  md: height.md,
  lg: height.lg,
} as const;

/** Размер шрифта инициалов по размеру аватара (TYPOGRAPHY.md) */
const initialFontSize: Record<AvatarSize, number> = {
  xs: 12,
  sm: 14,
  md: 14,
  lg: 16,
};

const initialLineHeight: Record<AvatarSize, number> = {
  xs: 16,
  sm: 16,
  md: 20,
  lg: 24,
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getStatusColor(status: AvatarStatus): string {
  switch (status) {
    case 'online':
      return semantic.accent.positive;
    case 'offline':
      return semantic.text.tertiary;
    case 'away':
      return semantic.accent.warning;
  }
}

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  /** URL изображения. При отсутствии или ошибке показываются инициалы из name */
  src?: string | null;
  /** Описание для доступности (имя пользователя) */
  alt?: string;
  /** Имя для инициалов при fallback (например, "Иван Петров" → "ИП") */
  name?: string;
  /** Размер: xs (32), sm (40), md (48), lg (56) — height/xs..height/lg */
  size?: AvatarSize;
  /** Индикатор статуса в углу */
  status?: AvatarStatus;
  /** Показывать обводку (border/default) */
  showBorder?: boolean;
  /** Дополнительные стили для корневого элемента */
  style?: CSSProperties;
}

export function Avatar({
  src,
  alt = '',
  name = '',
  size = 'md',
  status,
  showBorder = false,
  style,
  ...imgProps
}: AvatarProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const sizePx = sizeMap[size];
  const showImage = Boolean(src && !imgFailed);
  const initials = getInitials(name);

  const rootStyle: CSSProperties = {
    position: 'relative',
    width: sizePx,
    height: sizePx,
    minWidth: sizePx,
    minHeight: sizePx,
    borderRadius: radius.pill,
    overflow: 'hidden',
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: semantic.background.secondary,
    border: showBorder ? `1px solid ${semantic.border.default}` : undefined,
    fontFamily: 'var(--font-family, system-ui)',
    fontWeight: 500,
    fontSize: initialFontSize[size],
    lineHeight: initialLineHeight[size],
    color: semantic.text.primary,
    ...style,
  };

  const statusSize = Math.max(spacing[2], Math.round(sizePx * 0.25));
  const statusStyle: CSSProperties = status
    ? {
        position: 'absolute',
        right: spacing[1],
        bottom: spacing[1],
        width: statusSize,
        height: statusSize,
        borderRadius: 999,
        backgroundColor: getStatusColor(status),
        border: `2px solid ${semantic.background.primary}`,
        boxSizing: 'border-box',
      }
    : {};

  return (
    <span style={rootStyle} role="img" aria-label={alt || name || 'Аватар'}>
      {showImage ? (
        <img
          src={src!}
          alt={alt}
          {...imgProps}
          onError={() => setImgFailed(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      ) : (
        initials && <span style={{ userSelect: 'none' }}>{initials}</span>
      )}
      {status && <span style={statusStyle} aria-hidden />}
    </span>
  );
}

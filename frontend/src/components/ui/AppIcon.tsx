'use client';

import * as HeroIcons from '@heroicons/react/24/outline';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import * as HeroIconsSolid from '@heroicons/react/24/solid';
import React from 'react';
import type { IconType } from 'react-icons';

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTelegramPlane,
    FaTiktok,
    FaWhatsapp,
    FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

type IconVariant = 'outline' | 'solid';

interface IconProps {
  name: string;
  variant?: IconVariant;
  size?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  [key: string]: any;
}

const socialIcons: Record<string, IconType> = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  X: FaXTwitter,
  LinkedIn: FaLinkedinIn,
  YouTube: FaYoutube,
  TikTok: FaTiktok,
  Telegram: FaTelegramPlane,
  Whatsapp: FaWhatsapp
};

function Icon({
  name,
  variant = 'outline',
  size = 24,
  className = '',
  onClick,
  disabled = false,
  ...props
}: IconProps) {
  /* ---------------------------------------------------------------------- */
  /* Social Icons                                                           */
  /* ---------------------------------------------------------------------- */

  const SocialIcon = socialIcons[name];

  if (SocialIcon) {
    return (
      <SocialIcon
  size={size}
  className={`
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${onClick ? 'cursor-pointer hover:opacity-80' : ''}
    ${className}
  `}
  onClick={disabled ? undefined : onClick}
  {...props}
/>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* Heroicons                                                              */
  /* ---------------------------------------------------------------------- */

  const iconSet = variant === 'solid' ? HeroIconsSolid : HeroIcons;

  const IconComponent =
    iconSet[name as keyof typeof iconSet] as React.ComponentType<any>;

  /* ---------------------------------------------------------------------- */
  /* Fallback                                                               */
  /* ---------------------------------------------------------------------- */

  if (!IconComponent) {
    return (
      <QuestionMarkCircleIcon
        width={size}
        height={size}
        className={`
          text-gray-400
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
        onClick={disabled ? undefined : onClick}
        {...props}
      />
    );
  }

  /* ---------------------------------------------------------------------- */
  /* Render Heroicon                                                        */
  /* ---------------------------------------------------------------------- */

  return (
    <IconComponent
      width={size}
      height={size}
      className={`
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${onClick ? 'cursor-pointer hover:opacity-80' : ''}
        ${className}
      `}
      onClick={disabled ? undefined : onClick}
      {...props}
    />
  );
}

export default Icon;
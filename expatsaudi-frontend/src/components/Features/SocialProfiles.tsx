'use client';

import { memo, useState } from 'react';
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTelegramPlane,
    FaTiktok,
    FaYoutube,
} from 'react-icons/fa';
import { FaShareNodes, FaXTwitter } from 'react-icons/fa6';

interface SocialProfiles {
  facebook?: string | null;
  instagram?: string | null;
  x?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
  telegram?: string | null;
}

interface SocialLinksProps {
  socialProfiles?: SocialProfiles | null;
}

const socialPlatforms = [
  { key: 'facebook', label: 'Facebook', icon: FaFacebookF },
  { key: 'instagram', label: 'Instagram', icon: FaInstagram },
  { key: 'x', label: 'X', icon: FaXTwitter },
  { key: 'linkedin', label: 'LinkedIn', icon: FaLinkedinIn },
  { key: 'youtube', label: 'YouTube', icon: FaYoutube },
  { key: 'tiktok', label: 'TikTok', icon: FaTiktok },
  { key: 'telegram', label: 'Telegram', icon: FaTelegramPlane },
] as const;

function SocialLinks({ socialProfiles }: SocialLinksProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!socialProfiles) return null;

  const availableSocials = socialPlatforms.filter(
    (social) => socialProfiles[social.key],
  );

  if (availableSocials.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-4 z-50 -translate-y-1/2 sm:left-5">
      <div className="flex flex-col items-center gap-2">
        {/* Social Icons */}
        <div
          className={`
            flex flex-col items-center gap-2
            overflow-hidden
            transition-all duration-300 ease-out
            ${
              isOpen
                ? 'max-h-[420px] translate-y-0 opacity-100'
                : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'
            }
          `}
        >
          {availableSocials.map((social) => {
            const Icon = social.icon;
            const href = socialProfiles[social.key];

            if (!href) return null;

            return (
              <a
                key={social.key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow URExpat on ${social.label}`}
                title={social.label}
                className="
                  group relative
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-full
                  text-secondary
                  transition-all duration-200
                  hover:bg-primary
                  hover:text-primary-foreground
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary/20
                "
              >
                <Icon className="text-[17px]" />

                {/* Tooltip */}
                <span
                  className="
                    pointer-events-none
                    absolute left-full top-1/2
                    ml-2
                    -translate-y-1/2 translate-x-1
                    whitespace-nowrap
                    rounded-md
                    bg-secondary
                    px-2.5 py-1.5
                    text-[11px] font-medium
                    text-secondary-foreground
                    opacity-0
                    transition-all duration-150
                    group-hover:translate-x-0
                    group-hover:opacity-100
                  "
                >
                  {social.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={
            isOpen ? 'Hide social media links' : 'Show social media links'
          }
          aria-expanded={isOpen}
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-full
            bg-primary
            text-primary-foreground
            transition-all duration-200
            hover:bg-accent
            hover:text-accent-foreground
            
          "
        >
          <FaShareNodes
            className={`
              text-[17px]
              transition-transform duration-300
              ${isOpen ? 'rotate-90' : 'rotate-0'}
            `}
          />
        </button>
      </div>
    </div>
  );
}

export default memo(SocialLinks);
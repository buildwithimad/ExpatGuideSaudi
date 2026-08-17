import Image from 'next/image';

import AppImage from '@/components/ui/AppImage';
import type { Locale } from '@/lib/i18n-config';
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaWhatsapp,
    FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface MaintenancePageProps {
  locale: Locale;
  settings: any;
}

export default function MaintenancePage({
  locale,
  settings,
}: MaintenancePageProps) {
  const content = {
    en: {
      title: 'The site is currently down for maintenance',
      description:
        'We apologize for any inconvenience caused. We’re making a few improvements and will be back soon.',
      note: 'Thank you for your patience.',
      contact: 'You can contact us:',
      phone: 'Phone',
      email: 'Email',
    },

    ar: {
      title: 'الموقع متوقف حاليًا للصيانة',
      description:
        'نعتذر عن أي إزعاج قد يسببه ذلك. نقوم حاليًا بإجراء بعض التحسينات وسنعود قريبًا.',
      note: 'شكرًا لصبركم.',
      contact: 'يمكنكم التواصل معنا:',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
    },

    ur: {
      title: 'ویب سائٹ فی الحال دیکھ بھال کے لیے بند ہے',
      description:
        'ہم کسی بھی زحمت کے لیے معذرت خواہ ہیں۔ ہم ویب سائٹ میں کچھ بہتری کر رہے ہیں اور جلد واپس آئیں گے۔',
      note: 'آپ کے صبر کا شکریہ۔',
      contact: 'آپ ہم سے رابطہ کر سکتے ہیں:',
      phone: 'فون',
      email: 'ای میل',
    },

    hi: {
      title: 'वेबसाइट वर्तमान में रखरखाव के लिए बंद है',
      description:
        'हमें हुई किसी भी असुविधा के लिए खेद है। हम कुछ सुधार कर रहे हैं और जल्द वापस आएंगे।',
      note: 'आपके धैर्य के लिए धन्यवाद।',
      contact: 'आप हमसे संपर्क कर सकते हैं:',
      phone: 'फोन',
      email: 'ईमेल',
    },

    bn: {
      title: 'ওয়েবসাইটটি বর্তমানে রক্ষণাবেক্ষণের জন্য বন্ধ রয়েছে',
      description:
        'অসুবিধার জন্য আমরা দুঃখিত। আমরা কিছু উন্নতির কাজ করছি এবং শীঘ্রই ফিরে আসব।',
      note: 'আপনার ধৈর্যের জন্য ধন্যবাদ।',
      contact: 'আপনি আমাদের সাথে যোগাযোগ করতে পারেন:',
      phone: 'ফোন',
      email: 'ইমেইল',
    },

    tl: {
      title: 'Ang site ay kasalukuyang naka-maintenance',
      description:
        'Humihingi kami ng paumanhin sa anumang abala. Gumagawa kami ng ilang pagpapabuti at babalik kami sa lalong madaling panahon.',
      note: 'Salamat sa inyong pasensya.',
      contact: 'Maaari ninyo kaming makontak:',
      phone: 'Telepono',
      email: 'Email',
    },
  };

  const current = content[locale] ?? content.en;

  const isRTL = locale === 'ar' || locale === 'ur';

  /* ---------------------------------------------------------------------- */
  /* CMS Branding                                                           */
  /* ---------------------------------------------------------------------- */

  const branding = settings?.branding;

  const siteName = branding?.identity?.siteName || 'URExpat';

  const primaryLogo = branding?.logos?.primaryLogo;

  const whiteLogo = branding?.logos?.whiteLogo;

  const primaryLogoUrl =
    typeof primaryLogo === 'object' ? primaryLogo?.url : undefined;

  const whiteLogoUrl =
    typeof whiteLogo === 'object' ? whiteLogo?.url : undefined;

  const primaryLogoAlt =
    typeof primaryLogo === 'object' ? primaryLogo?.alt || siteName : siteName;

  const whiteLogoAlt =
    typeof whiteLogo === 'object' ? whiteLogo?.alt || siteName : siteName;

  /* ---------------------------------------------------------------------- */
  /* Social Profiles                                                        */
  /* ---------------------------------------------------------------------- */

  const socialProfiles = settings?.social?.socialProfiles || {};

  const socialLinks = [
    {
      key: 'facebook',
      name: 'Facebook',
      url: socialProfiles.facebook,
      Icon: FaFacebookF,
    },
    {
      key: 'instagram',
      name: 'Instagram',
      url: socialProfiles.instagram,
      Icon: FaInstagram,
    },
    {
      key: 'x',
      name: 'X',
      url: socialProfiles.x,
      Icon: FaXTwitter,
    },
    {
      key: 'linkedin',
      name: 'LinkedIn',
      url: socialProfiles.linkedin,
      Icon: FaLinkedinIn,
    },
    {
      key: 'youtube',
      name: 'YouTube',
      url: socialProfiles.youtube,
      Icon: FaYoutube,
    },
    {
      key: 'whatsapp',
      name: 'WhatsApp',
      url: socialProfiles.whatsapp,
      Icon: FaWhatsapp,
    },
  ].filter((social) => Boolean(social.url));

  return (
    <main
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary selection:text-primary-foreground"
    >
      

      <div className="flex flex-1 flex-col items-center justify-center px-4 pt-10 sm:pt-14 md:pt-16">
        
        {/* Top Center Logo */}
        <div className="mb-8 flex justify-center sm:mb-12">
          {primaryLogoUrl && (
            <Image
              src={primaryLogoUrl}
              alt={primaryLogoAlt}
              width={220}
              height={80}
              priority
              className="h-auto w-[140px] object-contain sm:w-[170px] md:w-[190px] dark:hidden"
            />
          )}

          {whiteLogoUrl && (
            <Image
              src={whiteLogoUrl}
              alt={whiteLogoAlt}
              width={220}
              height={80}
              priority
              className="hidden h-auto w-[140px] object-contain sm:w-[170px] md:w-[190px] dark:block"
            />
          )}

          {!primaryLogoUrl && !whiteLogoUrl && (
            <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {siteName}
            </span>
          )}
        </div>

        {/* Text Content Block */}
        <div className="mx-auto max-w-[850px] text-center">
          <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[54px]">
            {current.title}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
            {current.description}
          </p>

          <p className="mt-3 text-sm font-medium text-muted-foreground/80 sm:text-base">
            {current.note}
          </p>
        </div>

        {/* ================================================================ */}
        {/* BROKEN CONNECTION ILLUSTRATION (Flat Vector SVG)                 */}
        {/* ================================================================ */}

        <div className="my-8 w-full max-w-[1000px] overflow-hidden px-2 sm:my-12 md:my-16">
          <svg
            viewBox="0 0 1000 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto max-h-[180px] sm:max-h-[220px] md:max-h-[240px] ltr:rotate-0 rtl:scale-x-[-1]"
            aria-hidden="true"
          >
            {/* ------------------------------------------------------------ */}
            {/* LEFT CABLE & MALE PLUG (Primary Color)                       */}
            {/* ------------------------------------------------------------ */}
            <g className="text-primary fill-current stroke-current">
              {/* Main horizontal line entering from far left */}
              <path
                d="M 0 120 L 210 120 C 230 120 235 155 255 155 L 315 155 C 330 155 335 150 335 150"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Plug Base / Neck */}
              <rect x="330" y="132" width="22" height="36" rx="4" stroke="none" />

              {/* Plug Main Body */}
              <path
                d="M 350 115 C 350 110 355 105 362 105 L 430 105 C 440 105 445 110 445 120 L 445 180 C 445 190 440 195 430 195 L 362 195 C 355 195 350 190 350 185 Z"
                stroke="none"
              />

              {/* Plug Pins (Prongs) */}
              <rect x="445" y="125" width="32" height="14" rx="3" stroke="none" />
              <rect x="445" y="161" width="32" height="14" rx="3" stroke="none" />
            </g>

            {/* ------------------------------------------------------------ */}
            {/* SPARK / DISCONNECT PARTICLES                                 */}
            {/* ------------------------------------------------------------ */}
            <g className="text-primary fill-current stroke-none">
              <path d="M 488 95 C 495 90 505 92 502 102 C 495 105 488 100 488 95 Z" />
              <path d="M 508 72 C 518 70 522 80 514 85 C 506 82 504 74 508 72 Z" />
            </g>
            <g className="text-foreground fill-current stroke-none">
              <path d="M 518 152 C 525 145 532 152 528 160 C 520 162 514 156 518 152 Z" />
              <path d="M 495 180 C 502 175 510 182 504 190 C 495 188 492 182 495 180 Z" />
            </g>

            {/* ------------------------------------------------------------ */}
            {/* RIGHT CABLE & FEMALE SOCKET (Secondary Color)                */}
            {/* ------------------------------------------------------------ */}
            <g className="text-foreground fill-current stroke-current">
              {/* Socket Main Body */}
              <path
                d="M 554 110 C 554 105 558 100 565 100 L 630 100 C 638 100 642 105 642 110 L 642 190 C 642 195 638 200 630 200 L 565 200 C 558 200 554 195 554 190 Z"
                stroke="none"
              />

              {/* Socket Neck / Base */}
              <rect x="642" y="127" width="22" height="46" rx="4" stroke="none" />

              {/* Main horizontal line exiting to far right */}
              <path
                d="M 662 150 C 670 150 675 115 695 115 L 755 115 C 775 115 780 120 780 120 L 1000 120"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          </svg>
        </div>
      </div>

      

      <footer className="w-full border-t border-border bg-background py-5">
  <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-sm">

    {/* Left: Site Name */}
    <div className="flex items-center">
  {primaryLogoUrl && (
    <AppImage
      src={primaryLogoUrl}
      alt={primaryLogoAlt}
      width={220}
      height={80}
      priority
      className="h-auto w-[90px] object-contain dark:hidden"
    />
  )}

  {whiteLogoUrl && (
    <AppImage
      src={whiteLogoUrl}
      alt={whiteLogoAlt}
      width={220}
      height={80}
      priority
      className="hidden h-auto w-[90px] object-contain dark:block"
    />
  )}

  {!primaryLogoUrl && !whiteLogoUrl && (
    <span className="font-medium text-foreground/80">
      {siteName}
    </span>
  )}
</div>

    {/* Center: Message */}
    <div className="text-center">
      {current.note}
    </div>

    {/* Right: Social Icons */}
    {socialLinks.length > 0 && (
      <div className="flex items-center gap-3">
        {socialLinks.map((social) => {
          const SocialIcon = social.Icon;

          return (
            <a
              key={social.key}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-foreground hover:text-foreground"
            >
              <SocialIcon
                size={14}
                aria-hidden="true"
              />
            </a>
          );
        })}
      </div>
    )}

  </div>
</footer>
    </main>
  );
}
import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';
import SectionTitle from '../../components/SectionTitle';
import RevealWrapper from '../../components/RevealWrapper';
import NewsletterSection from '../../components/NewsletterSection';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://expatsaudi5308.builtwithrocket.new';

  return {
    title: dict.metadata.about.title,
    description: dict.metadata.about.description,
    alternates: {
      canonical: `/${locale}/about`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/about`])),
    },
    openGraph: {
      url: `${siteUrl}/${locale}/about`,
    },
  };
}

export default async function LocaleAboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  const stats = [
    { value: '120+', label: dict.about.stats.guides },
    { value: '24', label: dict.about.stats.categories },
    { value: '2026', label: dict.about.stats.founded },
    { value: '100%', label: dict.about.stats.free },
  ];

  const editorialStandards = [
    {
      icon: 'DocumentCheckIcon',
      title: 'Primary Source Verification',
      description:
        locale === 'ar' ?'يُراجَع كل دليل مقارنةً بالبوابات الحكومية السعودية الرسمية — وزارة الموارد البشرية وأبشر والجوازات والمجلس الصحي وسما والوزارات ذات الصلة — قبل النشر.' :'Every guide is cross-referenced against official Saudi government portals — HRSD, Absher, Jawazat, CCHI, SAMA, and relevant ministries — before publication.',
    },
    {
      icon: 'ArrowPathIcon',
      title: 'Regular Content Updates',
      description:
        locale === 'ar' ?'تتغير الأنظمة السعودية بشكل متكرر. نراجع أدلتنا ونحدّثها كلما عدّلت الحكومة السعودية السياسات أو الرسوم أو الإجراءات.' :'Saudi regulations change frequently. We review and update our guides whenever official policies, fees, or procedures are modified by the Saudi government.',
    },
    {
      icon: 'UserGroupIcon',
      title: 'Community-Informed',
      description:
        locale === 'ar' ?'نستمع إلى مجتمع المغتربين. التجارب الواقعية والحالات الاستثنائية التي يبلّغ عنها القراء تساعدنا على تحديد الثغرات وتحسين الدقة.' :'We listen to the expat community. Real-world experiences and edge cases reported by readers help us identify gaps and improve accuracy.',
    },
    {
      icon: 'ShieldCheckIcon',
      title: 'No Misinformation Policy',
      description:
        locale === 'ar' ?'لا ننشر معلومات تخمينية أو غير موثّقة. إذا لم نكن متأكدين من نظام ما، نُحيل مباشرةً إلى المصدر الرسمي بدلاً من التخمين.' :'We do not publish speculative or unverified information. If we are uncertain about a regulation, we link directly to the official source rather than guess.',
    },
  ];

  const whoWeHelp = [
    {
      icon: 'BriefcaseIcon',
      title: locale === 'ar' ? 'المهنيون العاملون' : 'Working Professionals',
      description:
        locale === 'ar' ?'المغتربون بتأشيرات عمل يتعاملون مع الإقامة وقانون العمل وحقوق التوظيف.' :'Expats on work visas navigating Iqama, labor law, and employment rights.',
    },
    {
      icon: 'HomeModernIcon',
      title: locale === 'ar' ? 'الأسر' : 'Families',
      description:
        locale === 'ar' ?'أسر المغتربين التي تتعامل مع تأشيرات التابعين والمدارس والسكن والرعاية الصحية.' :'Expat families dealing with dependent visas, schools, housing, and healthcare.',
    },
    {
      icon: 'AcademicCapIcon',
      title: locale === 'ar' ? 'الوافدون الجدد' : 'New Arrivals',
      description:
        locale === 'ar' ?'الأشخاص الذين ينتقلون إلى المملكة للمرة الأولى ويحتاجون إلى فهم الأساسيات بسرعة.' :'People relocating to Saudi Arabia for the first time who need to understand the basics quickly.',
    },
    {
      icon: 'ClockIcon',
      title: locale === 'ar' ? 'المقيمون منذ فترة طويلة' : 'Long-Term Residents',
      description:
        locale === 'ar' ?'المغتربون ذوو الخبرة الذين يتابعون التغييرات التنظيمية والخدمات الحكومية الجديدة.' :'Experienced expats staying current with regulatory changes and new government services.',
    },
  ];

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <main className="pt-16 md:pt-[68px]">
        {/* Hero */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="container-editorial">
            <div className="max-w-3xl">
              <span className="label-caps text-primary mb-4 block">{dict.about.label}</span>
              <h1 className="text-hero text-foreground mb-6">{dict.about.heroTitle}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">{dict.about.heroDescription}</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border py-12 section-bg">
          <div className="container-editorial">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
              {stats.map((stat) => (
                <RevealWrapper key={stat.label} type="fade">
                  <div className="bg-background px-6 py-8 text-center">
                    <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section id="mission" className="border-b border-border py-16 md:py-20">
          <div className="container-editorial">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionTitle label={dict.about.mission.label} title={dict.about.mission.title} />
              </div>
              <div className="lg:col-span-8 space-y-5">
                <p className="prose-editorial text-muted-foreground">
                  {locale === 'ar' ?'تستضيف المملكة العربية السعودية أكثر من 13 مليون مغترب — ما يقارب 40% من إجمالي السكان. ومع ذلك، لا يزال التعامل مع الأنظمة البيروقراطية وقوانين العمل وإجراءات التأشيرة والخدمات الحكومية أمراً بالغ الصعوبة على معظمهم. كثيراً ما تكون المعلومات الرسمية مدفونة في بوابات حكومية باللغة العربية فقط، أو مبعثرة في منتديات قديمة، أو مخفية خلف مستشارين مكلفين.' :'Saudi Arabia is home to over 13 million expatriates — nearly 40% of the total population. Yet for most of them, navigating the Kingdom\'s bureaucratic systems, labor laws, visa processes, and government services remains unnecessarily difficult. Official information is often buried in Arabic-only government portals, scattered across outdated forums, or hidden behind expensive consultants.'}
                </p>
                <p className="prose-editorial text-muted-foreground">
                  {locale === 'ar' ?'ExpatSaudi موجود لتغيير ذلك. نؤمن بأن كل مغترب يستحق الوصول إلى معلومات واضحة ودقيقة ومحدّثة بلغة سهلة — مجاناً تاماً. مهمتنا أن نكون المورد الإنجليزي الأكثر موثوقية وشمولاً وتنظيماً للمغتربين الذين يعيشون ويعملون في المملكة.' :'ExpatSaudi exists to fix that. We believe every expatriate deserves access to clear, accurate, and up-to-date information in plain English — completely free. Our mission is to be the most trusted, comprehensive, and well-organized English-language resource for expats living and working in Saudi Arabia.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why We Built This */}
        <section className="border-b border-border py-16 md:py-20 section-bg">
          <div className="container-editorial">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionTitle label={dict.about.story.label} title={dict.about.story.title} />
              </div>
              <div className="lg:col-span-8 space-y-5">
                <p className="prose-editorial text-muted-foreground">
                  {locale === 'ar' ?'فريق تأسيس ExpatSaudi مغتربون بأنفسهم. بيننا مجتمعين أكثر من 30 عاماً من العيش والعمل في المملكة عبر مدن متعددة — الرياض وجدة والخبر والدمام. عشنا شخصياً حيرة تجديد الإقامة للمرة الأولى، وقلق فهم مستحقات نهاية الخدمة، وإحباط العثور على معلومات متضاربة عبر الإنترنت.' :'The founding team of ExpatSaudi are expatriates ourselves. Between us, we have collectively spent over 30 years living and working in Saudi Arabia across multiple cities — Riyadh, Jeddah, Al Khobar, and Dammam. We have personally experienced the confusion of renewing an Iqama for the first time, the anxiety of understanding End of Service entitlements, and the frustration of finding contradictory information online.'}
                </p>
                <p className="prose-editorial text-muted-foreground">
                  {locale === 'ar' ?'بدأنا ExpatSaudi كالمورد الذي كنا نتمنى وجوده حين وصلنا. مع الوقت، تطوّر إلى شيء أكبر: منصة منظّمة ذات صرامة تحريرية يعتمد عليها آلاف المغتربين الآن للحصول على معلومات دقيقة وحديثة عن الحياة في المملكة.' :'We started ExpatSaudi as the resource we wished had existed when we first arrived. Over time, it evolved into something larger: a structured, editorially rigorous platform that thousands of expats now rely on for accurate, current information about life in the Kingdom.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Standards */}
        <section id="standards" className="border-b border-border py-16 md:py-20">
          <div className="container-editorial">
            <SectionTitle
              label={dict.about.standards.label}
              title={dict.about.standards.title}
              description={dict.about.standards.description}
              className="mb-10"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {editorialStandards.map((standard, i) => (
                <RevealWrapper key={standard.title} delay={i * 80} type="up">
                  <div className="bg-background p-8 flex flex-col gap-4 h-full">
                    <div className="w-9 h-9 bg-muted flex items-center justify-center">
                      <Icon
                        name={standard.icon as Parameters<typeof Icon>[0]['name']}
                        size={18}
                        className="text-accent"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-2">{standard.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{standard.description}</p>
                    </div>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Help */}
        <section className="border-b border-border py-16 md:py-20 section-bg">
          <div className="container-editorial">
            <SectionTitle
              label={dict.about.audience.label}
              title={dict.about.audience.title}
              description={dict.about.audience.description}
              className="mb-10"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
              {whoWeHelp.map((item, i) => (
                <RevealWrapper key={item.title} delay={i * 70} type="up">
                  <div className="bg-background p-6 flex flex-col gap-3 h-full">
                    <div className="w-9 h-9 bg-muted flex items-center justify-center">
                      <Icon
                        name={item.icon as Parameters<typeof Icon>[0]['name']}
                        size={18}
                        className="text-primary"
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="border-b border-border py-16 md:py-20">
          <div className="container-editorial">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionTitle label={dict.about.vision.label} title={dict.about.vision.title} />
              </div>
              <div className="lg:col-span-8 space-y-5">
                <p className="prose-editorial text-muted-foreground">
                  {locale === 'ar' ?'يتطور ExpatSaudi ليصبح منصة رقمية شاملة — لا مجرد موقع معلومات. تتضمن خارطة طريقنا أدوات مجانية مصممة خصيصاً للمغتربين في المملكة: فاحص انتهاء الإقامة وحاسبة نهاية الخدمة وحاسبة رسوم التأشيرة وحاسبة الراتب ومحوّل التقويم الهجري-الميلادي.' :'ExpatSaudi is growing into a comprehensive digital platform — not just an information website. Our roadmap includes free online tools specifically designed for expats in Saudi Arabia: an Iqama expiry checker, EOSB calculator, visa fee calculator, salary calculator, and Saudi Hijri-Gregorian calendar converter.'}
                </p>
                <p className="prose-editorial text-muted-foreground">
                  {locale === 'ar' ?'نبني أيضاً منتدى مجتمعياً حيث يمكن للمغتربين مشاركة تجاربهم الواقعية وطرح الأسئلة ومساعدة بعضهم في التعامل مع الحياة في المملكة. ستبقى جميع هذه الميزات مجانية تماماً.' :'We are also building a community forum where expats can share real-world experiences, ask questions, and help each other navigate life in the Kingdom. All of these features will remain completely free.'}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {(locale === 'ar'
                    ? ['أدوات مجانية', 'منتدى مجتمعي', 'تطبيق جوال', 'نسخة عربية', 'لوحة وظائف', 'قوائم سكن']
                    : ['Free Tools', 'Community Forum', 'Mobile App', 'Arabic Version', 'Job Board', 'Housing Listings']
                  ).map((item) => (
                    <span key={item} className="badge-gray">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-b border-border py-16 md:py-20 section-bg">
          <div className="container-editorial">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <SectionTitle label={dict.about.contact.label} title={dict.about.contact.title} />
              </div>
              <div className="lg:col-span-8">
                <div className="grid sm:grid-cols-2 gap-px bg-border">
                  {[
                    { icon: 'EnvelopeIcon', label: locale === 'ar' ? 'التحرير' : 'Editorial', value: 'editorial@expatsaudi.com' },
                    { icon: 'ChatBubbleLeftIcon', label: locale === 'ar' ? 'استفسارات عامة' : 'General Enquiries', value: 'hello@expatsaudi.com' },
                    { icon: 'ExclamationCircleIcon', label: locale === 'ar' ? 'الإبلاغ عن خطأ' : 'Report an Error', value: 'corrections@expatsaudi.com' },
                    { icon: 'MegaphoneIcon', label: locale === 'ar' ? 'الشراكات' : 'Partnerships', value: 'partners@expatsaudi.com' },
                  ].map((item) => (
                    <div key={item.label} className="bg-background p-6 flex items-start gap-4">
                      <div className="w-8 h-8 bg-muted flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="label-caps text-muted-foreground mb-1">{item.label}</p>
                        <p className="text-sm font-medium text-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <NewsletterSection dict={dict} />
      </main>
      <Footer locale={locale as Locale} dict={dict} />
    </>
  );
}

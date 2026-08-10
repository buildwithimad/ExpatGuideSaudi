'use client';

import Icon from '@/components/ui/AppIcon';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';

import NewsletterSection from '../../components/NewsletterSection';
import RevealWrapper from '../../components/RevealWrapper';
import SectionTitle from '../../components/SectionTitle';

type Dictionary = Awaited<
  ReturnType<typeof getDictionary>
>;

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export default function AboutPageContent({
  locale,
  dict,
}: Props) {
  const stats = [
    {
      value: '120+',
      label: dict.about.stats.guides,
    },
    {
      value: '24',
      label: dict.about.stats.categories,
    },
    {
      value: '2026',
      label: dict.about.stats.founded,
    },
    {
      value: '100%',
      label: dict.about.stats.free,
    },
  ];

  const editorialStandards = [
    {
      icon: 'DocumentCheckIcon',
      title: 'Primary Source Verification',
      description:
        locale === 'ar'
          ? 'يُراجَع كل دليل مقارنةً بالبوابات الحكومية السعودية الرسمية — وزارة الموارد البشرية وأبشر والجوازات والمجلس الصحي وسما والوزارات ذات الصلة — قبل النشر.'
          : 'Every guide is cross-referenced against official Saudi government portals — HRSD, Absher, Jawazat, CCHI, SAMA, and relevant ministries — before publication.',
    },
    {
      icon: 'ArrowPathIcon',
      title: 'Regular Content Updates',
      description:
        locale === 'ar'
          ? 'تتغير الأنظمة السعودية بشكل متكرر. نراجع أدلتنا ونحدّثها كلما عدّلت الحكومة السعودية السياسات أو الرسوم أو الإجراءات.'
          : 'Saudi regulations change frequently. We review and update our guides whenever official policies, fees, or procedures are modified by the Saudi government.',
    },
    {
      icon: 'UserGroupIcon',
      title: 'Community-Informed',
      description:
        locale === 'ar'
          ? 'نستمع إلى مجتمع المغتربين. التجارب الواقعية والحالات الاستثنائية التي يبلّغ عنها القراء تساعدنا على تحديد الثغرات وتحسين الدقة.'
          : 'We listen to the expat community. Real-world experiences and edge cases reported by readers help us identify gaps and improve accuracy.',
    },
    {
      icon: 'ShieldCheckIcon',
      title: 'No Misinformation Policy',
      description:
        locale === 'ar'
          ? 'لا ننشر معلومات تخمينية أو غير موثّقة. إذا لم نكن متأكدين من نظام ما، نُحيل مباشرةً إلى المصدر الرسمي بدلاً من التخمين.'
          : 'We do not publish speculative or unverified information. If we are uncertain about a regulation, we link directly to the official source rather than guess.',
    },
  ];

  const whoWeHelp = [
    {
      icon: 'BriefcaseIcon',
      title:
        locale === 'ar'
          ? 'المهنيون العاملون'
          : 'Working Professionals',
      description:
        locale === 'ar'
          ? 'المغتربون بتأشيرات عمل يتعاملون مع الإقامة وقانون العمل وحقوق التوظيف.'
          : 'Expats on work visas navigating Iqama, labor law, and employment rights.',
    },
    {
      icon: 'HomeModernIcon',
      title:
        locale === 'ar'
          ? 'الأسر'
          : 'Families',
      description:
        locale === 'ar'
          ? 'أسر المغتربين التي تتعامل مع تأشيرات التابعين والمدارس والسكن والرعاية الصحية.'
          : 'Expat families dealing with dependent visas, schools, housing, and healthcare.',
    },
    {
      icon: 'AcademicCapIcon',
      title:
        locale === 'ar'
          ? 'الوافدون الجدد'
          : 'New Arrivals',
      description:
        locale === 'ar'
          ? 'الأشخاص الذين ينتقلون إلى المملكة للمرة الأولى ويحتاجون إلى فهم الأساسيات بسرعة.'
          : 'People relocating to Saudi Arabia for the first time who need to understand the basics quickly.',
    },
    {
      icon: 'ClockIcon',
      title:
        locale === 'ar'
          ? 'المقيمون منذ فترة طويلة'
          : 'Long-Term Residents',
      description:
        locale === 'ar'
          ? 'المغتربون ذوو الخبرة الذين يتابعون التغييرات التنظيمية والخدمات الحكومية الجديدة.'
          : 'Experienced expats staying current with regulatory changes and new government services.',
    },
  ];

  return (
    <>
      <main className="pt-16 md:pt-[68px]">
        {/* ---------------------------------------------------------------- */}
        {/* Hero                                                             */}
        {/* ---------------------------------------------------------------- */}

        <section className="border-b border-border py-16 md:py-24">
          <div className="container-editorial">
            <div className="max-w-3xl">
              <span className="label-caps mb-4 block text-primary">
                {dict.about.label}
              </span>

              <h1 className="text-hero mb-6 text-foreground">
                {dict.about.heroTitle}
              </h1>

              <p className="text-xl leading-relaxed text-muted-foreground">
                {dict.about.heroDescription}
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Stats                                                            */}
        {/* ---------------------------------------------------------------- */}

        <section className="section-bg border-b border-border py-12">
          <div className="container-editorial">
            <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
              {stats.map((stat) => (
                <RevealWrapper
                  key={stat.label}
                  type="fade"
                >
                  <div className="bg-background px-6 py-8 text-center">
                    <p className="mb-2 text-3xl font-bold text-primary">
                      {stat.value}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Mission                                                          */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="mission"
          className="border-b border-border py-16 md:py-20"
        >
          <div className="container-editorial">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionTitle
                  label={dict.about.mission.label}
                  title={dict.about.mission.title}
                />
              </div>

              <div className="space-y-5 lg:col-span-8">
                <p className="prose-editorial text-muted-foreground">
                  {locale === 'ar'
                    ? 'تستضيف المملكة العربية السعودية أكثر من 13 مليون مغترب — ما يقارب 40% من إجمالي السكان. ومع ذلك، لا يزال التعامل مع الأنظمة البيروقراطية وقوانين العمل وإجراءات التأشيرة والخدمات الحكومية أمراً بالغ الصعوبة على معظمهم. كثيراً ما تكون المعلومات الرسمية مدفونة في بوابات حكومية باللغة العربية فقط، أو مبعثرة في منتديات قديمة، أو مخفية خلف مستشارين مكلفين.'
                    : "Saudi Arabia is home to over 13 million expatriates — nearly 40% of the total population. Yet for most of them, navigating the Kingdom's bureaucratic systems, labor laws, visa processes, and government services remains unnecessarily difficult. Official information is often buried in Arabic-only government portals, scattered across outdated forums, or hidden behind expensive consultants."}
                </p>

                <p className="prose-editorial text-muted-foreground">
                  {locale === 'ar'
                    ? 'ExpatSaudi موجود لتغيير ذلك. نؤمن بأن كل مغترب يستحق الوصول إلى معلومات واضحة ودقيقة ومحدّثة بلغة سهلة — مجاناً تاماً. مهمتنا أن نكون المورد الإنجليزي الأكثر موثوقية وشمولاً وتنظيماً للمغتربين الذين يعيشون ويعملون في المملكة.'
                    : 'ExpatSaudi exists to fix that. We believe every expatriate deserves access to clear, accurate, and up-to-date information in plain English — completely free. Our mission is to be the most trusted, comprehensive, and well-organized English-language resource for expats living and working in Saudi Arabia.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Why We Built This                                               */}
        {/* ---------------------------------------------------------------- */}

        <section className="section-bg border-b border-border py-16 md:py-20">
          <div className="container-editorial">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionTitle
                  label={dict.about.story.label}
                  title={dict.about.story.title}
                />
              </div>

              <div className="space-y-5 lg:col-span-8">
                <p className="prose-editorial text-muted-foreground">
                  {locale === 'ar'
                    ? 'فريق تأسيس ExpatSaudi مغتربون بأنفسهم. بيننا مجتمعين أكثر من 30 عاماً من العيش والعمل في المملكة عبر مدن متعددة — الرياض وجدة والخبر والدمام. عشنا شخصياً حيرة تجديد الإقامة للمرة الأولى، وقلق فهم مستحقات نهاية الخدمة، وإحباط العثور على معلومات متضاربة عبر الإنترنت.'
                    : 'The founding team of ExpatSaudi are expatriates ourselves. Between us, we have collectively spent over 30 years living and working in Saudi Arabia across multiple cities — Riyadh, Jeddah, Al Khobar, and Dammam. We have personally experienced the confusion of renewing an Iqama for the first time, the anxiety of understanding End of Service entitlements, and the frustration of finding contradictory information online.'}
                </p>

                <p className="prose-editorial text-muted-foreground">
                  {locale === 'ar'
                    ? 'بدأنا ExpatSaudi كالمورد الذي كنا نتمنى وجوده حين وصلنا. مع الوقت، تطوّر إلى شيء أكبر: منصة منظّمة ذات صرامة تحريرية يعتمد عليها آلاف المغتربين الآن للحصول على معلومات دقيقة وحديثة عن الحياة في المملكة.'
                    : 'We started ExpatSaudi as the resource we wished had existed when we first arrived. Over time, it evolved into something larger: a structured, editorially rigorous platform that thousands of expats now rely on for accurate, current information about life in the Kingdom.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Editorial Standards                                             */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="standards"
          className="border-b border-border py-16 md:py-20"
        >
          <div className="container-editorial">
            <SectionTitle
              label={dict.about.standards.label}
              title={dict.about.standards.title}
              description={dict.about.standards.description}
              className="mb-10"
            />

            <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
              {editorialStandards.map(
                (standard, i) => (
                  <RevealWrapper
                    key={standard.title}
                    delay={i * 80}
                    type="up"
                  >
                    <div className="flex h-full flex-col gap-4 bg-background p-8">
                      <div className="flex h-9 w-9 items-center justify-center bg-muted">
                        <Icon
                          name={
                            standard.icon as Parameters<
                              typeof Icon
                            >[0]['name']
                          }
                          size={18}
                          className="text-accent"
                        />
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-semibold text-foreground">
                          {standard.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {standard.description}
                        </p>
                      </div>
                    </div>
                  </RevealWrapper>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Who We Help                                                     */}
        {/* ---------------------------------------------------------------- */}

        <section className="section-bg border-b border-border py-16 md:py-20">
          <div className="container-editorial">
            <SectionTitle
              label={dict.about.audience.label}
              title={dict.about.audience.title}
              description={dict.about.audience.description}
              className="mb-10"
            />

            <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
              {whoWeHelp.map(
                (item, i) => (
                  <RevealWrapper
                    key={item.title}
                    delay={i * 70}
                    type="up"
                  >
                    <div className="flex h-full flex-col gap-3 bg-background p-6">
                      <div className="flex h-9 w-9 items-center justify-center bg-muted">
                        <Icon
                          name={
                            item.icon as Parameters<
                              typeof Icon
                            >[0]['name']
                          }
                          size={18}
                          className="text-primary"
                        />
                      </div>

                      <h3 className="text-sm font-semibold text-foreground">
                        {item.title}
                      </h3>

                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </RevealWrapper>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Future Vision                                                   */}
        {/* ---------------------------------------------------------------- */}

        <section className="border-b border-border py-16 md:py-20">
          <div className="container-editorial">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionTitle
                  label={dict.about.vision.label}
                  title={dict.about.vision.title}
                />
              </div>

              <div className="space-y-5 lg:col-span-8">
                <p className="prose-editorial text-muted-foreground">
                  {locale === 'ar'
                    ? 'يتطور ExpatSaudi ليصبح منصة رقمية شاملة — لا مجرد موقع معلومات. تتضمن خارطة طريقنا أدوات مجانية مصممة خصيصاً للمغتربين في المملكة: فاحص انتهاء الإقامة وحاسبة نهاية الخدمة وحاسبة رسوم التأشيرة وحاسبة الراتب ومحوّل التقويم الهجري-الميلادي.'
                    : 'ExpatSaudi is growing into a comprehensive digital platform — not just an information website. Our roadmap includes free online tools specifically designed for expats in Saudi Arabia: an Iqama expiry checker, EOSB calculator, visa fee calculator, salary calculator, and Saudi Hijri-Gregorian calendar converter.'}
                </p>

                <p className="prose-editorial text-muted-foreground">
                  {locale === 'ar'
                    ? 'نبني أيضاً منتدى مجتمعياً حيث يمكن للمغتربين مشاركة تجاربهم الواقعية وطرح الأسئلة ومساعدة بعضهم في التعامل مع الحياة في المملكة. ستبقى جميع هذه الميزات مجانية تماماً.'
                    : 'We are also building a community forum where expats can share real-world experiences, ask questions, and help each other navigate life in the Kingdom. All of these features will remain completely free.'}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {(locale === 'ar'
                    ? [
                        'أدوات مجانية',
                        'منتدى مجتمعي',
                        'تطبيق جوال',
                        'نسخة عربية',
                        'لوحة وظائف',
                        'قوائم سكن',
                      ]
                    : [
                        'Free Tools',
                        'Community Forum',
                        'Mobile App',
                        'Arabic Version',
                        'Job Board',
                        'Housing Listings',
                      ]
                  ).map((item) => (
                    <span
                      key={item}
                      className="badge-gray"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Contact                                                         */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="contact"
          className="section-bg border-b border-border py-16 md:py-20"
        >
          <div className="container-editorial">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionTitle
                  label={dict.about.contact.label}
                  title={dict.about.contact.title}
                />
              </div>

              <div className="lg:col-span-8">
                <div className="grid gap-px bg-border sm:grid-cols-2">
                  {[
                    {
                      icon: 'EnvelopeIcon',
                      label:
                        locale === 'ar'
                          ? 'التحرير'
                          : 'Editorial',
                      value:
                        'editorial@expatsaudi.com',
                    },
                    {
                      icon: 'ChatBubbleLeftIcon',
                      label:
                        locale === 'ar'
                          ? 'استفسارات عامة'
                          : 'General Enquiries',
                      value:
                        'hello@expatsaudi.com',
                    },
                    {
                      icon: 'ExclamationCircleIcon',
                      label:
                        locale === 'ar'
                          ? 'الإبلاغ عن خطأ'
                          : 'Report an Error',
                      value:
                        'corrections@expatsaudi.com',
                    },
                    {
                      icon: 'MegaphoneIcon',
                      label:
                        locale === 'ar'
                          ? 'الشراكات'
                          : 'Partnerships',
                      value:
                        'partners@expatsaudi.com',
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 bg-background p-6"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-muted">
                        <Icon
                          name={
                            item.icon as Parameters<
                              typeof Icon
                            >[0]['name']
                          }
                          size={16}
                          className="text-primary"
                        />
                      </div>

                      <div>
                        <p className="label-caps mb-1 text-muted-foreground">
                          {item.label}
                        </p>

                        <p className="text-sm font-medium text-foreground">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Newsletter                                                       */}
        {/* ---------------------------------------------------------------- */}

        <NewsletterSection dict={dict} />
      </main>
    </>
  );
}
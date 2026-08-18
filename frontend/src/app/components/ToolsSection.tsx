import Icon from '@/components/ui/AppIcon';
import type { Dictionary } from '@/lib/dictionary';
import RevealWrapper from './RevealWrapper';
import SectionTitle from './SectionTitle';

const toolKeys = ['iqamaChecker', 'visaCalc', 'salaryCalc', 'eosCalc', 'leaveCalc', 'currencyConv', 'calendarConv'] as const;
const toolIcons = ['IdentificationIcon', 'DocumentTextIcon', 'BanknotesIcon', 'CalculatorIcon', 'CalendarDaysIcon', 'CurrencyDollarIcon', 'CalendarIcon'];

interface ToolsSectionProps {
  dict?: Dictionary;
}

export default function ToolsSection({ dict }: ToolsSectionProps) {
  const t = dict?.tools;

  const tools = toolKeys.map((key, i) => ({
    icon: toolIcons[i],
    name: t?.items?.[key]?.name ?? key,
    description: t?.items?.[key]?.description ?? '',
  }));

  return (
    <section id="tools" className="py-16 md:py-20 border-b border-border">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionTitle
            label={t?.label ?? 'Saudi Tools'}
            title={t?.title ?? 'Free Calculators & Tools'}
            description={t?.description ?? 'Practical tools built specifically for expats in Saudi Arabia. All tools are free, no account required.'}
          />
          <span className="badge self-start md:self-auto">{t?.comingSoon ?? 'Coming Soon'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {tools.slice(0, 6).map((tool, i) => (
            <RevealWrapper key={tool.name} delay={i * 50} type="fade">
              <div className="tool-card flex flex-col gap-4 h-full bg-muted">
                <div className="flex items-start justify-between gap-4">
                  <div className="w-10 h-10 bg-background border border-border flex items-center justify-center flex-shrink-0">
                    <Icon name={tool.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-primary" />
                  </div>
                  <span className="badge flex-shrink-0">{t?.comingSoon ?? 'Coming Soon'}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{tool.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                </div>
              </div>
            </RevealWrapper>
          ))}

          <RevealWrapper delay={300} type="fade" className="sm:col-span-2 lg:col-span-3">
            <div className="tool-card flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-muted border-0">
              <div className="flex items-start gap-4 flex-grow">
                <div className="w-10 h-10 bg-background border border-border flex items-center justify-center flex-shrink-0">
                  <Icon name="CalendarIcon" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{tools[6].name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">{tools[6].description}</p>
                </div>
              </div>
              <span className="badge flex-shrink-0">{t?.comingSoon ?? 'Coming Soon'}</span>
            </div>
          </RevealWrapper>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          <Icon name="InformationCircleIcon" size={14} className="text-muted-foreground inline me-1.5 mb-0.5" />
          {t?.notice ?? 'All tools will be completely free. We are currently building and verifying each calculator against official Saudi government formulas.'}
        </p>
      </div>
    </section>
  );
}
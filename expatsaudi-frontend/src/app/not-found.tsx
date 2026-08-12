'use client';

import Icon from '@/components/ui/AppIcon';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    const handleGoHome = () => {
        router?.push('/');
    };

    const handleGoBack = () => {
        if (typeof window !== 'undefined') {
            window.history?.back();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 sm:p-6">
            <div className="text-center max-w-md w-full">
                <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="relative">
                        <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold text-primary opacity-20">404</h1>
                    </div>
                </div>

                <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-foreground mb-1.5 sm:mb-2">
                    Page Not Found
                </h2>
                <p className="text-[13px] sm:text-sm md:text-base text-muted-foreground mb-6 sm:mb-8 px-2">
                    The page you're looking for doesn't exist. Let's get you back!
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <button
                        onClick={handleGoBack}
                        className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 sm:gap-2 bg-primary text-primary-foreground px-4 py-2.5 sm:px-6 sm:py-3 text-[13px] sm:text-sm rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                    >
                        <Icon name="ArrowLeftIcon" size={16} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Go Back
                    </button>

                    <button
                        onClick={handleGoHome}
                        className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 sm:gap-2 border border-border bg-background text-foreground px-4 py-2.5 sm:px-6 sm:py-3 text-[13px] sm:text-sm rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                    >
                        <Icon name="HomeIcon" size={16} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
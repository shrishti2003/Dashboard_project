import React from 'react';
import { cn } from '@/lib/utils';

interface KPICardProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: React.ReactNode;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    className?: string;
}

export function KPICard({ title, value, description, icon, trend, trendValue, className }: KPICardProps) {
    return (
        <div className={cn(
            "bg-card p-6 rounded-xl shadow-sm border border-border flex flex-col transition-all duration-300 hover:shadow-md",
            className
        )}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</h3>
                {icon && <div className="text-primary/80 bg-primary/10 p-2 rounded-lg">{icon}</div>}
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground tracking-tight">{value}</span>
                {trendValue && (
                    <span className={cn(
                        "text-xs font-bold px-2 py-0.5 rounded-full",
                        trend === 'up' ? "text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400" :
                            trend === 'down' ? "text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400" :
                                "text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
                    )}>
                        {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '−'} {trendValue}
                    </span>
                )}
            </div>
            {description && (
                <p className="mt-3 text-xs text-muted-foreground font-medium">{description}</p>
            )}
        </div>
    );
}

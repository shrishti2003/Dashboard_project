"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AgeDistributionChartProps {
    data: { ageGroup: string; count: number }[];
}

export function AgeDistributionChart({ data }: AgeDistributionChartProps) {
    return (
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border h-96 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-foreground mb-6 tracking-tight">Age Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                    <XAxis dataKey="ageGroup" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--color-popover)',
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-popover-foreground)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                        cursor={{ fill: 'var(--color-muted)', opacity: 0.4 }}
                    />
                    <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

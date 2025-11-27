"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StressLevelChartProps {
    data: { level: string; healthy: number; diseased: number }[];
}

export function StressLevelChart({ data }: StressLevelChartProps) {
    return (
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border h-96 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-foreground mb-6 tracking-tight">Stress Level Impact</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                    <XAxis dataKey="level" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--color-popover)',
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-popover-foreground)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                        itemStyle={{ color: 'var(--color-foreground)' }}
                        cursor={{ fill: 'var(--color-muted)', opacity: 0.4 }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="healthy" name="Healthy" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} barSize={40} />
                    <Bar dataKey="diseased" name="Heart Disease" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

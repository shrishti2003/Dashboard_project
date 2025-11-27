"use client";

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DonutChartProps {
    title: string;
    data: { name: string; value: number }[];
    colors?: string[];
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export function DonutChart({ title, data, colors = COLORS }: DonutChartProps) {
    return (
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border h-80 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-foreground mb-4 tracking-tight">{title}</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        stroke="var(--color-card)"
                        strokeWidth={2}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--color-popover)',
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-popover-foreground)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                        itemStyle={{ color: 'var(--color-foreground)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

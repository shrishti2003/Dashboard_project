"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RiskFactorsChartProps {
    data: { status: string; avgCholesterol: number; avgBP: number }[];
}

export function RiskFactorsChart({ data }: RiskFactorsChartProps) {
    return (
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border h-96 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-foreground mb-6 tracking-tight">Risk Factors Comparison (Avg)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                    <XAxis dataKey="status" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
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
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="avgCholesterol" name="Cholesterol" fill="#8884d8" radius={[4, 4, 0, 0]} barSize={30} />
                    <Bar dataKey="avgBP" name="Blood Pressure" fill="#82ca9d" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

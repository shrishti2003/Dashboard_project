"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { DashboardShell } from '@/components/dashboard-shell';
import { KPICard } from '@/components/kpi-card';
import { FilterBar } from '@/components/filters';
import { AgeDistributionChart } from '@/components/charts/age-distribution-chart';
import { RiskFactorsChart } from '@/components/charts/risk-factors-chart';
import { DonutChart } from '@/components/charts/donut-chart';
import { StressLevelChart } from '@/components/charts/stress-level-chart';
import { fetchHeartDiseaseData, type HeartDiseaseRecord } from '@/lib/data';
import { Users, Activity, Heart, AlertTriangle, Scale, Droplet } from 'lucide-react';
import { ThemeProvider } from '@/components/theme-provider';

export default function DashboardPage() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="heart-dashboard-theme">
      <DashboardContent />
    </ThemeProvider>
  );
}

function DashboardContent() {
  const [data, setData] = useState<HeartDiseaseRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedSmoking, setSelectedSmoking] = useState('All');
  const [selectedHeartDisease, setSelectedHeartDisease] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState('All');
  const [selectedDiabetes, setSelectedDiabetes] = useState('All');
  const [selectedFamilyHistory, setSelectedFamilyHistory] = useState('All');

  useEffect(() => {
    async function loadData() {
      try {
        const records = await fetchHeartDiseaseData();
        setData(records);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter Data
  const filteredData = useMemo(() => {
    return data.filter(record => {
      if (selectedGender !== 'All' && record.Gender !== selectedGender) return false;
      if (selectedSmoking !== 'All' && record.Smoking !== selectedSmoking) return false;
      if (selectedHeartDisease !== 'All' && record["Heart Disease Status"] !== selectedHeartDisease) return false;
      if (selectedExercise !== 'All' && record["Exercise Habits"] !== selectedExercise) return false;
      if (selectedDiabetes !== 'All' && record.Diabetes !== selectedDiabetes) return false;
      if (selectedFamilyHistory !== 'All' && record["Family Heart Disease"] !== selectedFamilyHistory) return false;
      return true;
    });
  }, [data, selectedGender, selectedSmoking, selectedHeartDisease, selectedExercise, selectedDiabetes, selectedFamilyHistory]);

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalPatients = filteredData.length;
    const avgAge = totalPatients > 0 ? filteredData.reduce((acc, r) => acc + r.Age, 0) / totalPatients : 0;
    const heartDiseaseCount = filteredData.filter(r => r["Heart Disease Status"] === 'Yes').length;
    const heartDiseaseRate = totalPatients > 0 ? (heartDiseaseCount / totalPatients) * 100 : 0;
    const avgCholesterol = totalPatients > 0 ? filteredData.reduce((acc, r) => acc + r["Cholesterol Level"], 0) / totalPatients : 0;
    const avgBMI = totalPatients > 0 ? filteredData.reduce((acc, r) => acc + r.BMI, 0) / totalPatients : 0;
    const diabetesCount = filteredData.filter(r => r.Diabetes === 'Yes').length;
    const diabetesRate = totalPatients > 0 ? (diabetesCount / totalPatients) * 100 : 0;

    return {
      totalPatients,
      avgAge: avgAge.toFixed(1),
      heartDiseaseRate: heartDiseaseRate.toFixed(1),
      avgCholesterol: avgCholesterol.toFixed(0),
      avgBMI: avgBMI.toFixed(1),
      diabetesRate: diabetesRate.toFixed(1)
    };
  }, [filteredData]);

  // Chart Data Preparation
  const ageData = useMemo(() => {
    const groups: Record<string, number> = {};
    filteredData.forEach(r => {
      const ageGroup = Math.floor(r.Age / 10) * 10;
      const label = `${ageGroup}s`;
      groups[label] = (groups[label] || 0) + 1;
    });
    return Object.entries(groups)
      .map(([ageGroup, count]) => ({ ageGroup, count }))
      .sort((a, b) => a.ageGroup.localeCompare(b.ageGroup));
  }, [filteredData]);

  const riskData = useMemo(() => {
    const statusGroups = ['Yes', 'No'];
    return statusGroups.map(status => {
      const groupData = filteredData.filter(r => r["Heart Disease Status"] === status);
      const count = groupData.length;
      const avgCholesterol = count > 0 ? groupData.reduce((acc, r) => acc + r["Cholesterol Level"], 0) / count : 0;
      const avgBP = count > 0 ? groupData.reduce((acc, r) => acc + r["Blood Pressure"], 0) / count : 0;
      return {
        status: status === 'Yes' ? 'Heart Disease' : 'Healthy',
        avgCholesterol: Math.round(avgCholesterol),
        avgBP: Math.round(avgBP)
      };
    });
  }, [filteredData]);

  const lifestyleData = useMemo(() => {
    const smoking = [
      { name: 'Smoker', value: filteredData.filter(r => r.Smoking === 'Yes').length },
      { name: 'Non-Smoker', value: filteredData.filter(r => r.Smoking === 'No').length }
    ];
    const alcohol = [
      { name: 'High', value: filteredData.filter(r => r["Alcohol Consumption"] === 'High').length },
      { name: 'Medium', value: filteredData.filter(r => r["Alcohol Consumption"] === 'Medium').length },
      { name: 'Low', value: filteredData.filter(r => r["Alcohol Consumption"] === 'Low').length }
    ];
    return { smoking, alcohol };
  }, [filteredData]);

  const stressData = useMemo(() => {
    const levels = ['Low', 'Medium', 'High'];
    return levels.map(level => {
      const group = filteredData.filter(r => r["Stress Level"] === level);
      const healthy = group.filter(r => r["Heart Disease Status"] === 'No').length;
      const diseased = group.filter(r => r["Heart Disease Status"] === 'Yes').length;
      return { level, healthy, diseased };
    });
  }, [filteredData]);

  // Filter Options
  const filterOptions = useMemo(() => {
    const genders = Array.from(new Set(data.map(r => r.Gender))).filter(Boolean).sort();
    const smokingStatus = Array.from(new Set(data.map(r => r.Smoking))).filter(Boolean).sort();
    const heartDiseaseStatus = Array.from(new Set(data.map(r => r["Heart Disease Status"]))).filter(Boolean).sort();
    const exerciseHabits = Array.from(new Set(data.map(r => r["Exercise Habits"]))).filter(Boolean).sort();
    const diabetesStatus = Array.from(new Set(data.map(r => r.Diabetes))).filter(Boolean).sort();
    const familyHistory = Array.from(new Set(data.map(r => r["Family Heart Disease"]))).filter(Boolean).sort();

    return { genders, smokingStatus, heartDiseaseStatus, exerciseHabits, diabetesStatus, familyHistory };
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <DashboardShell>
      <FilterBar
        genders={filterOptions.genders}
        selectedGender={selectedGender}
        onGenderChange={setSelectedGender}
        smokingStatus={filterOptions.smokingStatus}
        selectedSmoking={selectedSmoking}
        onSmokingChange={setSelectedSmoking}
        heartDiseaseStatus={filterOptions.heartDiseaseStatus}
        selectedHeartDisease={selectedHeartDisease}
        onHeartDiseaseChange={setSelectedHeartDisease}
        exerciseHabits={filterOptions.exerciseHabits}
        selectedExercise={selectedExercise}
        onExerciseChange={setSelectedExercise}
        diabetesStatus={filterOptions.diabetesStatus}
        selectedDiabetes={selectedDiabetes}
        onDiabetesChange={setSelectedDiabetes}
        familyHistory={filterOptions.familyHistory}
        selectedFamilyHistory={selectedFamilyHistory}
        onFamilyHistoryChange={setSelectedFamilyHistory}
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Total Patients"
          value={kpis.totalPatients}
          icon={<Users className="h-5 w-5" />}
        />
        <KPICard
          title="Avg Age"
          value={kpis.avgAge}
          icon={<Activity className="h-5 w-5" />}
        />
        <KPICard
          title="Avg BMI"
          value={kpis.avgBMI}
          icon={<Scale className="h-5 w-5" />}
        />
        <KPICard
          title="Diabetes Rate"
          value={`${kpis.diabetesRate}%`}
          icon={<Droplet className="h-5 w-5" />}
          trend={Number(kpis.diabetesRate) > 15 ? 'down' : 'neutral'}
          trendValue={Number(kpis.diabetesRate) > 15 ? 'High' : 'Normal'}
        />
        <KPICard
          title="Avg Cholesterol"
          value={kpis.avgCholesterol}
          icon={<AlertTriangle className="h-5 w-5" />}
        />
        <KPICard
          title="Heart Disease Rate"
          value={`${kpis.heartDiseaseRate}%`}
          icon={<Heart className="h-5 w-5" />}
          trend={Number(kpis.heartDiseaseRate) > 30 ? 'down' : 'neutral'}
          trendValue={Number(kpis.heartDiseaseRate) > 30 ? 'Critical' : 'Normal'}
          className={Number(kpis.heartDiseaseRate) > 50 ? 'border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/30' : ''}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgeDistributionChart data={ageData} />
        <RiskFactorsChart data={riskData} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DonutChart title="Smoking Habits" data={lifestyleData.smoking} colors={['#EF4444', '#10B981']} />
        <DonutChart title="Alcohol Consumption" data={lifestyleData.alcohol} />
        <StressLevelChart data={stressData} />
      </div>
    </DashboardShell>
  );
}

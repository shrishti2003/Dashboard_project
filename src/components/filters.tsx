import React from 'react';
import { Filter } from 'lucide-react';

interface FilterBarProps {
    genders: string[];
    selectedGender: string;
    onGenderChange: (value: string) => void;

    smokingStatus: string[];
    selectedSmoking: string;
    onSmokingChange: (value: string) => void;

    heartDiseaseStatus: string[];
    selectedHeartDisease: string;
    onHeartDiseaseChange: (value: string) => void;

    exerciseHabits: string[];
    selectedExercise: string;
    onExerciseChange: (value: string) => void;

    diabetesStatus: string[];
    selectedDiabetes: string;
    onDiabetesChange: (value: string) => void;

    familyHistory: string[];
    selectedFamilyHistory: string;
    onFamilyHistoryChange: (value: string) => void;
}

export function FilterBar({
    genders,
    selectedGender,
    onGenderChange,
    smokingStatus,
    selectedSmoking,
    onSmokingChange,
    heartDiseaseStatus,
    selectedHeartDisease,
    onHeartDiseaseChange,
    exerciseHabits,
    selectedExercise,
    onExerciseChange,
    diabetesStatus,
    selectedDiabetes,
    onDiabetesChange,
    familyHistory,
    selectedFamilyHistory,
    onFamilyHistoryChange
}: FilterBarProps) {
    return (
        <div className="bg-card p-5 rounded-xl shadow-sm border border-border mb-6 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-4 text-foreground">
                <Filter className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider">Data Filters</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <SelectGroup label="Gender" value={selectedGender} onChange={onGenderChange} options={genders} />
                <SelectGroup label="Smoking" value={selectedSmoking} onChange={onSmokingChange} options={smokingStatus} />
                <SelectGroup label="Heart Disease" value={selectedHeartDisease} onChange={onHeartDiseaseChange} options={heartDiseaseStatus} />
                <SelectGroup label="Exercise" value={selectedExercise} onChange={onExerciseChange} options={exerciseHabits} />
                <SelectGroup label="Diabetes" value={selectedDiabetes} onChange={onDiabetesChange} options={diabetesStatus} />
                <SelectGroup label="Family History" value={selectedFamilyHistory} onChange={onFamilyHistoryChange} options={familyHistory} />
            </div>
        </div>
    );
}

function SelectGroup({ label, value, onChange, options }: { label: string, value: string, onChange: (v: string) => void, options: string[] }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground ml-1">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full rounded-lg border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2.5 border transition-colors"
            >
                <option value="All">All</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    );
}

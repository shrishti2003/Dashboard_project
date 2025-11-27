import Papa from 'papaparse';

export interface HeartDiseaseRecord {
    Age: number;
    Gender: string;
    "Blood Pressure": number;
    "Cholesterol Level": number;
    "Exercise Habits": string;
    Smoking: string;
    "Family Heart Disease": string;
    Diabetes: string;
    BMI: number;
    "High Blood Pressure": string;
    "Low HDL Cholesterol": string;
    "High LDL Cholesterol": string;
    "Alcohol Consumption": string;
    "Stress Level": string;
    "Sleep Hours": number;
    "Sugar Consumption": string;
    "Triglyceride Level": number;
    "Fasting Blood Sugar": number;
    "CRP Level": number;
    "Homocysteine Level": number;
    "Heart Disease Status": string;
}

export async function fetchHeartDiseaseData(): Promise<HeartDiseaseRecord[]> {
    const response = await fetch('/data/heart_disease.csv');
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
                resolve(results.data as HeartDiseaseRecord[]);
            },
            error: (error: Error) => {
                reject(error);
            },
        });
    });
}

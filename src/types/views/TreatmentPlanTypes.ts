type TreatmentPlan = {
  id: string;
  name: string;
  programType: 'daily' | 'weekly';
  startDate: string;
  endDate: string;
  assignedToEmail: string;
  assignedByEmail: string;
  assignedTo: string;
  assignedBy: string;
  createdAt: string;
}

type TableHeader = {
  title: string;
  align: 'start' | 'end' | 'center';
  key: keyof TreatmentPlan | 'options';
  sortable: boolean;
}

export type RepetitionConfig = {
  sets: number;
  min: string;
  sec: string;
  duration?: number;
}

export type Exercise = {
  id: string;
  title: string;
  thumbnail: string;
  repetitionConfig: RepetitionConfig;
  schedule?: number[][];
  expanded?: boolean
}

export type FormValues = {
  userId: string;
  treatmentPlanType: 'daily' | 'weekly';
  startDate: string;
  endDate: string;
  programName: string;
  exercises: Exercise[];
  planId ?: any
}

export type User = {
  id: string;
  email: string;
  name: string;
}

export type TreatmentPlanType = {
  value: 'daily' | 'weekly';
  title: string;
}

export type Header = {
  title: string;
  key: string;
  align: 'start' | 'center';
  sortable: boolean;
}

export type TreatmentPlanPayload = {
  name: string;
  videos: {
    id: string;
    repetitionConfig: {
      sets: number;
      duration: number;
    };
    schedule?: number[][];
  }[];
  startDate: string;
  endDate: string;
  userIds: string[];
  type: 'daily' | 'weekly';
  id?: string | number
}

export type { TreatmentPlan, TableHeader }
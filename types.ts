
export interface RoutineTask {
  time: string;
  activity: string;
  description: string;
  focus: 'mind' | 'body' | 'career' | 'spirit';
}

export interface HabitGoal {
  habit: string;
  frequency: string;
  benefit: string;
}

export interface DaySchedule {
  day: string;
  focus: string;
  keyTask: string;
}

export interface LifePlan {
  morningRoutine: RoutineTask[];
  afternoonRoutine: RoutineTask[];
  eveningRoutine: RoutineTask[];
  habits: HabitGoal[];
  weeklyGoals: string[];
  growthMindsetTip: string;
  weeklySchedule: DaySchedule[];
}

export interface UserPreferences {
  name: string;
  mainGoal: string;
  currentStruggle: string;
  energyLevel: 'low' | 'moderate' | 'high';
  tone: 'gentle' | 'disciplined' | 'motivational';
}

// New types for dashboard
export interface Folder {
  id: string;
  name: string;
  createdAt: any;
}

export interface File {
  id: string;
  name: string;
  folderId?: string;
  size: number;
  createdAt: any;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: any;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  createdAt: any;
}


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

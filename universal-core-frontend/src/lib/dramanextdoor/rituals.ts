export interface Ritual {
  id: string;
  name: string;
  description: string;
  moodEffect?: number;
  tensionEffect?: number;
}

export const RITUALS: Ritual[] = [
  {
    id: "morning_check",
    name: "Morning Emotional Check-In",
    description: "A quick grounding ritual to stabilize your emotional baseline.",
    moodEffect: +5,
  },
  {
    id: "evening_release",
    name: "Evening Emotional Release",
    description: "Let go of accumulated tension from the day.",
    tensionEffect: -0.1,
  },
];

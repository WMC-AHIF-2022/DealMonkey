export interface Habit {
    id: number;
    title: string;
    frequency: string;
    reminder: string;
    category: string;
    color: string;
    userId: number;
}
export interface Setting {
    id: number;
    theme: string;
    userProfile: string;
    userId: string;
}
export interface Statistic {
    userId: number;
    currentStreak: number;
    highestStreak: number;
    pointsMultiplier: number;
}
export interface Task {
    id: number,
    title: string,
    category: string,
    color: string,
    userId: number,
}
export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    birthdate: string;
    points: number;
    level: number;
    registrationDate: string;
}
export interface loginAuthResult {
    ok: boolean;
    id: number;
}
export interface Todo {
    id: number,
    title: string,
    category: string,
    color: string,
    userId: number,
    priority: string
}
export interface Progress {
    userId: number,
    points: number,
    experience: number
}
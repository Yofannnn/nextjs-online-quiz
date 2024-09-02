export interface UserType {
  name: string;
  email: string;
  password: string;
  role?: string;
  scores?: { quizId: string; score: number }[];
}

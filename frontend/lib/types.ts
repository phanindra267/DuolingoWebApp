export interface Language { id: number; name: string; }
export interface Unit { id: number; language_id: number; title: string; order: number; }
export interface Skill { id: number; unit_id: number; title: string; description?: string; lock_status: string; progress: number; xp_reward: number; }
export interface Lesson { id: number; skill_id: number; title: string; order: number; }
export interface Exercise { id: number; lesson_id: number; type: string; content_json: string; answer_json: string; }
export interface User { id: number; username: string; xp: number; streak: number; hearts: number; last_active?: string; }

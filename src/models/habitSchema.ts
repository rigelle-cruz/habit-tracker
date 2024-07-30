import { z } from 'zod';

export const HabitSchema = z.object({
	id: z.string(),
	text: z.string().min(1, "Habit text can't be empty!"),
	completed: z.boolean(),
});

export type Habit = z.infer<typeof HabitSchema>;

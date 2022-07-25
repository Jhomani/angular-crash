import { Task } from './models/Task.model'

export interface AppState {
    readonly task: Task[];
}
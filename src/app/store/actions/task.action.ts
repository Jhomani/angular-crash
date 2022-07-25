import { Action } from '@ngrx/store';
import { Task } from '../models/Task.model';
import {ADD_TASK, REMOVE_TASK} from '../constants/task.constant';

export class AddTask implements Action {
    readonly type = ADD_TASK

    constructor(public payload: Task) {}
}

export class RemoveTask implements Action {
    readonly type = REMOVE_TASK

    constructor(public payload: number) {}
}

export type Actions = AddTask | RemoveTask
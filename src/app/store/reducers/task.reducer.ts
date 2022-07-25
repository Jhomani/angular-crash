import { Task } from '../models/Task.model';
import {Actions} from '../actions/task.action';
import {ADD_TASK, REMOVE_TASK} from '../constants/task.constant';

const initialState: Task = {
  text: '',
  day: '',
  reminder: false,
}

export const task = (state = [initialState], action: Actions) => {
  switch(action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case REMOVE_TASK:
      state.splice(action.payload, 1)
      return state;
    default:
      return state;
  }
}
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { TasksList } from '../../components/TasksList';

let tasks: {
  id: number;
  title: string;
  done: boolean;
}[] = [];

let mockedRemoveTask: jest.Mock;
let mockedToggleTaskDone: jest.Mock;
let mockedEditTask: jest.Mock;

describe('MyTasksList', () => {

  beforeAll(() => {
    tasks = [
      {
        id: new Date().getTime(),
        title: 'Primeiro todo',
        done: false
      },
      {
        id: new Date().getTime() + 1,
        title: 'Segundo todo',
        done: false
      },
      {
        id: new Date().getTime() + 2,
        title: 'Terceiro todo',
        done: true
      },
    ];

    mockedRemoveTask = jest.fn();
    mockedToggleTaskDone = jest.fn();
    mockedEditTask = jest.fn();
  });

  it('should be able to render all tasks', () => {
    const { getByDisplayValue } = render(
      <TasksList 
        tasks={tasks} 
        removeTask={mockedRemoveTask} 
        toggleTaskDone={mockedToggleTaskDone}
        editTask={mockedEditTask}
      />
    )
    
    getByDisplayValue('Primeiro todo');
    getByDisplayValue('Segundo todo');
    getByDisplayValue('Terceiro todo');
  });
})
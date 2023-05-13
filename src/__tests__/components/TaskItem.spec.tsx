import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { TaskItem } from '../../components/TaskItem';

let task: {
  id: number;
  title: string;
  done: boolean;
};

let mockedRemoveTask: jest.Mock;
let mockedToggleTaskDone: jest.Mock;
let mockedEditTask: jest.Mock;

describe('TaskItem', () => {

  beforeAll(() => {
    task = {
      id: 1,
      title: 'Primeiro todo',
      done: false
    };

    mockedRemoveTask = jest.fn();
    mockedToggleTaskDone = jest.fn();
    mockedEditTask = jest.fn();
  });

  it('should be able to render a task with "Primeiro todo" text', () => {
    const { getByDisplayValue } = render(
      <TaskItem 
        task={task} 
        removeTask={mockedRemoveTask} 
        toggleTaskDone={mockedToggleTaskDone}
        editTask={mockedEditTask}
      />
    )
    
    getByDisplayValue('Primeiro todo');
  });

  it('should be able to call the "removeTask" function with the taskId parameter in the click event of the trash button', () => {
    const { getByTestId } = render(
      <TaskItem 
        task={task} 
        removeTask={mockedRemoveTask} 
        toggleTaskDone={mockedToggleTaskDone}
        editTask={mockedEditTask}
      />
    )
    const firstTaskTrashIcon = getByTestId(`trash-${task.id}`);

    fireEvent(firstTaskTrashIcon, 'press');

    expect(mockedRemoveTask).toHaveBeenCalledWith(task.id);
  });

  it('should be able to call the "toggleTaskDone" function with the taskId parameter in the click event on the task Item', () => {    
    const { debug, getByTestId } = render(
      <TaskItem 
        task={task} 
        removeTask={mockedRemoveTask} 
        toggleTaskDone={mockedToggleTaskDone}
        editTask={mockedEditTask}
      />
    )

    const taskItem = getByTestId(`taskItem-${task.id}`);

    fireEvent.press(taskItem);

    expect(mockedToggleTaskDone).toHaveBeenCalledWith(task.id);
  });

  it('should be able to call the "editTask" function with the taskId parameter in the click event on the button edit', async () => {    
    const { queryByDisplayValue, getByTestId, getByDisplayValue, rerender } = render(
      <TaskItem 
        task={task} 
        removeTask={mockedRemoveTask} 
        toggleTaskDone={mockedToggleTaskDone}
        editTask={mockedEditTask}
      />
    )
    const editTaskItemButton = getByTestId(`editTaskItemButton-${task.id}`);
    fireEvent(editTaskItemButton, 'press');

    const inputTaskItem = getByDisplayValue('Primeiro todo')
    fireEvent.changeText(inputTaskItem, 'Segundo todo');
    fireEvent(inputTaskItem, 'submitEditing');

    const editedTask = {
      id: 1,
      title: 'Segundo todo',
      done: false
    };

    rerender(
      <TaskItem 
        task={editedTask} 
        removeTask={mockedRemoveTask} 
        toggleTaskDone={mockedToggleTaskDone}
        editTask={mockedEditTask}
      />
    )

    expect(mockedEditTask).toHaveBeenCalled();
    expect(queryByDisplayValue('Primeiro todo')).toBeNull();
    expect(getByDisplayValue('Segundo todo'));
  });

  it('should be able cancel a call to edit a task', async () => {    
    const { queryByDisplayValue, getByTestId, getByDisplayValue } = render(
      <TaskItem 
        task={task} 
        removeTask={mockedRemoveTask} 
        toggleTaskDone={mockedToggleTaskDone}
        editTask={mockedEditTask}
      />
    )

    const editTaskItemButton = getByTestId(`editTaskItemButton-${task.id}`);
    fireEvent(editTaskItemButton, 'press');

    const inputTaskItem = getByDisplayValue('Primeiro todo')
    fireEvent.changeText(inputTaskItem, 'Segundo todo');
    
    const cancelEditTaskItemButton = getByTestId(`cancelEditTaskItemButton-${task.id}`);
    fireEvent(cancelEditTaskItemButton, 'press');

    expect(getByDisplayValue('Primeiro todo'));
    expect(queryByDisplayValue('Segundo todo'));
  });
})
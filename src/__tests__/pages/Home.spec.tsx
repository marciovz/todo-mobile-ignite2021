import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { Home } from '../../pages/Home';

describe('Home', () => {
  it('should be able to render new added tasks', () => {
    const { getByPlaceholderText, getByText, getByDisplayValue } = render(<Home />);
    const inputElement = getByPlaceholderText('Adicionar novo todo...');

    expect(getByText('0 tarefas'));

    fireEvent.changeText(inputElement, 'Primeira tarefa');
    fireEvent(inputElement, 'submitEditing');

    expect(getByDisplayValue('Primeira tarefa'))
    expect(getByText('1 tarefa'));

    fireEvent.changeText(inputElement, 'Segunda tarefa');
    fireEvent(inputElement, 'submitEditing');

    expect(getByDisplayValue('Primeira tarefa'));
    expect(getByDisplayValue('Segunda tarefa'));
    expect(getByText('2 tarefas'));
  });

  it('should not be able to add a task that already exists', () =>{
    const { getByPlaceholderText, getByDisplayValue, getByText } = render(<Home />);

    const inputAddTasks = getByPlaceholderText('Adicionar novo todo...');
    fireEvent.changeText(inputAddTasks, 'Primeiro todo');
    fireEvent(inputAddTasks, 'submitEditing');

    expect(getByDisplayValue('Primeiro todo'));

    fireEvent.changeText(inputAddTasks, 'Primeiro todo');
    fireEvent(inputAddTasks, 'submitEditing');

    expect(getByDisplayValue('Primeiro todo'));
    expect(getByText('1 tarefa'));
  });

  it('should be able to render tasks as done and undone', () => {
    const { getByPlaceholderText, getByTestId, getByDisplayValue } = render(<Home />);
    const inputElement = getByPlaceholderText('Adicionar novo todo...');

    fireEvent.changeText(inputElement, 'Primeira tarefa');
    fireEvent(inputElement, 'submitEditing');

    const inputTaskItem = getByDisplayValue('Primeira tarefa');
    const taskId = inputTaskItem.props.testID;

    const buttonElement = getByTestId(`taskItem-${taskId}`);
    const markerElement = getByTestId(`marker-${taskId}`);
    
    expect(buttonElement).toHaveStyle({
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 12,
      margin: 0,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    });
    expect(markerElement).toHaveStyle({
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center',
    });
    expect(inputTaskItem).toHaveStyle({
      color: '#666',
    });

    fireEvent.press(buttonElement);

    expect(markerElement).toHaveStyle({
      backgroundColor: '#1DB863'
    });
    expect(inputTaskItem).toHaveStyle({
      color: '#1DB863',
      textDecorationLine: 'line-through'
    });
  });

  it('should be able to remove tasks after the trash icon was pressed', () => {
    const { getByPlaceholderText, getByText, getByTestId, findByTestId, getByDisplayValue, queryByDisplayValue } = render(<Home />);
    const inputElement = getByPlaceholderText('Adicionar novo todo...');

    fireEvent.changeText(inputElement, 'Primeira tarefa');
    fireEvent(inputElement, 'submitEditing');
    
    fireEvent.changeText(inputElement, 'Segunda tarefa');
    fireEvent(inputElement, 'submitEditing');

    const inputFirstTask = getByDisplayValue('Primeira tarefa');
    const firstTaskId = inputFirstTask.props.testID;

    const firstTaskTrashIcon = getByTestId(`trash-${firstTaskId}`);
    fireEvent(firstTaskTrashIcon, 'press');

    const confirmRemoveTaskModalButton =   getByTestId('confirm-remove-task-button');
    fireEvent.press(confirmRemoveTaskModalButton);      
    
    expect(queryByDisplayValue('Primeira tarefa')).toBeNull();
    expect(getByDisplayValue('Segunda tarefa'));
    expect(getByText('1 tarefa'));
  });

  it('should be able to edit a task', () => {
    const { debug, getByDisplayValue, getByTestId, getByPlaceholderText, queryByDisplayValue} = render(<Home />);

    const inputAddTask = getByPlaceholderText('Adicionar novo todo...');

    fireEvent.changeText(inputAddTask, 'Primeira todo');
    fireEvent(inputAddTask, 'submitEditing')

    expect(getByDisplayValue('Primeira todo'));

    const inputEditTaskItem = getByDisplayValue('Primeira todo');
    const taskId = inputEditTaskItem.props.testID;
    
    const buttonEditTaskItem = getByTestId(`editTaskItemButton-${taskId}`);
    fireEvent(buttonEditTaskItem, 'press');
    
    fireEvent.changeText(inputEditTaskItem, 'Segunda todo');
    fireEvent(inputEditTaskItem, 'submitEditing');

    expect(queryByDisplayValue('Primeira todo')).toBeNull();
    expect(getByDisplayValue('Segunda todo'));
  });

  it('should not be able to edit a task with the same name as another existing one', async () => {
    const { getByText, getByDisplayValue, findByDisplayValue, getByTestId, getByPlaceholderText} = render(<Home />);

    const inputAddTask = getByPlaceholderText('Adicionar novo todo...');

    fireEvent.changeText(inputAddTask, 'Primeira todo');
    fireEvent(inputAddTask, 'submitEditing')
    expect(getByDisplayValue('Primeira todo'));

    fireEvent.changeText(inputAddTask, 'Segunda todo');
    fireEvent(inputAddTask, 'submitEditing');
    expect(getByDisplayValue('Segunda todo'));

    const inputEditTaskItem = getByDisplayValue('Primeira todo');
    const taskId = inputEditTaskItem.props.testID;
    
    const buttonEditTaskItem = getByTestId(`editTaskItemButton-${taskId}`);
    fireEvent(buttonEditTaskItem, 'press');

    fireEvent.changeText(inputEditTaskItem, 'Segunda todo');
    fireEvent(inputEditTaskItem, 'submitEditing');

    expect(getByTestId('modal-edit-task-error'));

    const buttonCloseModalEditTaskError = getByTestId('close-modal-edit-task-error-button');
    fireEvent(buttonCloseModalEditTaskError, 'press');

    expect(getByDisplayValue('Primeira todo'));
    expect(getByDisplayValue('Segunda todo'));
    expect(getByText('2 tarefas'));    
  });
})
import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { Task } from '../components/TaskItem';
import { TodoInput } from '../components/TodoInput';
import { AlertModal } from '../components/AlertModal';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalRemoveTasklOpen, setModalRemoveTaskOpen] = useState(false);
  const [modalEditTaskErrorOpen, setModalEditTaskErrorOpen] = useState(false);
  const [taskIdSelected, setTaskIdSelected] = useState<number | null>(null);

  
  function handleAddTask(newTaskTitle: string) {
    const taskFinded = tasks.find(taskItem => taskItem.title === newTaskTitle);

    if (taskFinded) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
    }

    setTasks(prevState => [
      ...prevState,
      {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
    ])
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = tasks.map(task => ({...task}));

    const taskToEdit = newTasks.find(taskItem => taskItem.id === id);

    if (!taskToEdit) return;

    taskToEdit.done = !taskToEdit.done;

    setTasks(newTasks);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => ({...task}));
    
    const taskFinded = updatedTasks.find(taskItem => taskItem.title === taskNewTitle);
    
    if (taskFinded) {
      return setModalEditTaskErrorOpen(true);
      
    } 
    

      const taskToBeUpdated = updatedTasks.find(task => task.id === taskId);
  
      if (taskToBeUpdated) {
        taskToBeUpdated.title = taskNewTitle;
      }
    

    setTasks(updatedTasks);
  }

  function handleConfirmRemoveTask(id: number) {
    setTaskIdSelected(id)
    setModalRemoveTaskOpen(true);
  }

  function handleRemoveTask() {
    const newListUpdated = tasks.filter( taskItem => taskItem.id !== taskIdSelected);
    setTasks(newListUpdated);
    handleCloseRemoveTaskModal();
  }

  function handleCloseRemoveTaskModal() {
    setTaskIdSelected(null)
    setModalRemoveTaskOpen(false);
  }

  function handleCloseEditTaskErrorModal() {
    setModalEditTaskErrorOpen(false);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleConfirmRemoveTask} 
      />

      <Modal 
        testID="modal-remove-task" 
        visible={modalRemoveTasklOpen}
        transparent={true}  
      >
        <AlertModal 
          title='Remover item' 
          content='Tem certeza que você deseja remover esse item?'
          buttons={[
            {
              title: 'Cancel',
              buttonStyle: 'cancel',
              onPress: handleCloseRemoveTaskModal
            },
            {
              testId: 'confirm-remove-task-button',
              title: 'Remover',
              buttonStyle: 'confirm',
              onPress: handleRemoveTask
            }
          ]}
        />  
      </Modal>

      <Modal 
        testID="modal-edit-task-error" 
        visible={modalEditTaskErrorOpen}
        transparent={true}  
      >
        <AlertModal 
          title='Ops... ' 
          content='Tarefa já existente. Tente outro nome.?'
          buttons={[
            {
              testId: 'close-modal-edit-task-error-button',
              title: 'OK',
              buttonStyle: 'confirm',
              onPress: handleCloseEditTaskErrorModal
            }
          ]}
        />  
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
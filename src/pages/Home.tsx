import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { Task } from '../components/TaskItem';
import { TodoInput } from '../components/TodoInput';
import { AlertModal } from '../components/AlertModal';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modaRemoveTasklOpen, setModalRemoveTaskOpen] = useState(false);
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
    const tasksUpdated = tasks;
    const indexTask = tasksUpdated.findIndex(taskItem => taskItem.id === id);

    if (indexTask < 0) return;
    tasksUpdated[indexTask].done = !tasksUpdated[indexTask].done;

    setTasks([ ...tasksUpdated]);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const taskFinded = tasks.find(taskItem => taskItem.title === taskNewTitle);

    if (taskFinded) {
      return Alert.alert('Task já cadastrada', 'Você não pode renomear uma task com o mesmo nome');
    }

    const updatedTasks = tasks.map(task => ({...task}));
    
    const taskToBeUpdated = updatedTasks.find(task => task.id === taskId);

    if (!taskToBeUpdated) return;

    taskToBeUpdated.title = taskNewTitle;

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
    // Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
    //   {
    //     text: 'Não',
    //     style: 'cancel'
    //   },
    //   {
    //     text: 'Sim',
    //     onPress: () => {
    //       const newListUpdated = tasks.filter( taskItem => taskItem.id !== id);
    //       setTasks(newListUpdated);
    //     }
    //   }
    // ]);
  }

  function handleCloseRemoveTaskModal() {
    setTaskIdSelected(null)
    setModalRemoveTaskOpen(false);
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
        visible={modaRemoveTasklOpen}
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
              title: 'Remover',
              buttonStyle: 'confirm',
              onPress: handleRemoveTask
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
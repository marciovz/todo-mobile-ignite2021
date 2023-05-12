import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { Task } from '../components/TaskItem';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

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

    const tasksUpdated = tasks;
    const indexTask = tasksUpdated.findIndex(taskItem => taskItem.id === taskId);

    if (indexTask < 0) return;
    tasksUpdated[indexTask].title = taskNewTitle;

    setTasks([ ...tasksUpdated]);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        text: 'Sim',
        onPress: () => {
          const newListUpdated = tasks.filter( taskItem => taskItem.id !== id);
          setTasks(newListUpdated);
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
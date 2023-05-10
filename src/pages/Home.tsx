import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
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

  function handleRemoveTask(id: number) {
    const newListUpdated = tasks.filter( taskItem => taskItem.id !== id);
    setTasks(newListUpdated);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
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
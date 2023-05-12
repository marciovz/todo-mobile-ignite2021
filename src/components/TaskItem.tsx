import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';
import penIcon from '../assets/icons/pen/pen.png';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
  removeTask: (id: number) => void;  
}

export function TaskItem({ index, task, toggleTaskDone, editTask, removeTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [ title, setTitle] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTitle(task.title);
    setIsEditing(false);
  } 
  
  function handleSubmitEditing() {
    editTask(task.id, title);
    setIsEditing(false);
  }

  useEffect(() => {
    if(textInputRef.current) {
      if(isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
          disabled={isEditing}
        >
          <View 
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            editable={isEditing}
            value={title}
            onChangeText={setTitle}
            onSubmitEditing={handleSubmitEditing}
            selectTextOnFocus={true}
            onBlur={handleCancelEditing}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{ paddingHorizontal: 24, flexDirection: 'row' }}
        
      >
        {
          isEditing ? (
            <TouchableOpacity
              onPress={handleCancelEditing}
            >
              <Icon 
                name="x"
                size={24}
                color="#B2B2B2"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleStartEditing}
            >
              <Image source={penIcon} width={24} />
            </TouchableOpacity>
          )
        }

        <View style={styles.divisor} />


        <TouchableOpacity
          testID={`trash-${index}`}         
          disabled={isEditing}
          onPress={() => removeTask(task.id)}
        >
          <Image 
            source={trashIcon} 
            width={24}
            height={24} 
            style={{ opacity: isEditing ? 0.2 : 1 }} 
          />
        </TouchableOpacity>
      </View>
    </>        
  )
}


const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    margin: 0,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
    padding: 0,
    textDecorationLine: 'none'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
    padding: 0,
  },
  divisor: {
    width: 1,
    height: 24,
    marginHorizontal: 12, 
    backgroundColor: '#c4c4c4',
  }
})
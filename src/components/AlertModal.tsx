import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface ButtonsProps {
  testId?: string;
  title: string;
  buttonStyle: 'cancel' | 'confirm';
  onPress: () => void
}

interface AlertModalProps {
  title: string;
  content: string;
  buttons: ButtonsProps[];
}

export function AlertModal({ title, content, buttons }: AlertModalProps) {

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.contentText}>{content}</Text>
        <View style={styles.footer}>
          {
            buttons.map(buttonItem => (
              <TouchableOpacity
                style={[styles.button, buttonItem.buttonStyle === 'confirm' ? styles.buttonConfirm : styles.buttonCancel]}
                onPress={buttonItem.onPress}>
                <Text style={styles.buttonText}>{buttonItem.title}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    minHeight: '50%',
    margin: 20,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    padding: 35,
    margin: 0,
    backgroundColor: '#8257E5',
  },
  title: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  contentText: {
    padding: 35,
  },
  footer: {
    padding: 35,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonCancel: {
    backgroundColor: '#52904d',
  },
  buttonConfirm: {
    backgroundColor: 'red',
    
  },
  buttonText: {
    color: '#f8f8f8',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});


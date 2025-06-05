import { MaterialIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { Alert, FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Task, useTasks } from './hooks/useTasks';

const TasksScreen = () => {
    const [task, setTask] = useState('');
    const { tasks, addTask, toggleTaskDone, removeTask } = useTasks();

    const confirmRemoveTask = (id: string) => {
        const confirmMessage = 'Weet je zeker dat je deze taak wilt verwijderen?';
        if (Platform.OS === 'web') {
            if (window.confirm(confirmMessage)) {
                removeTask(id);
            }
        } else {
            Alert.alert(
                'Taak verwijderen',
                confirmMessage,
                [
                    { text: 'Annuleren', style: 'cancel' },
                    { text: 'Verwijderen', style: 'destructive', onPress: () => removeTask(id) },
                ]
            );
        }
    };

    const renderItem = ({ item }: { item: Task }) => (
        <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleTaskDone(item.id)} style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Checkbox
                    style={{ marginRight: 10 }}
                    value={item.done}
                    onValueChange={() => toggleTaskDone(item.id)}
                />
                <Text style={item.done ? styles.taskDone : undefined}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmRemoveTask(item.id)}>
                <MaterialIcons
                    name="delete"
                    size={24}
                    color={styles.button.backgroundColor as string}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a new task"
                    value={task}
                    onChangeText={setTask}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        addTask(task);
                        setTask('');
                    }}
                >
                    <Text style={styles.buttonText}>Add Task</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9bbd0', // Lichte achtergrondkleur
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    input: {
        flex: 1, // Zorgt dat de input alle ruimte neemt
        borderWidth: 1,
        borderColor: '#e36187',
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 4,
        marginRight: 8, // Ruimte tussen input en knop
        marginBottom: 0, // Verwijder dubbele margin
    },
    button: {
        backgroundColor: '#e36187',
        paddingVertical: 10,
        paddingHorizontal: 16, // Maak de knop minder breed
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff', // Witte tekstkleur
        fontWeight: 'bold',
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e36187', // Donkere accentkleur
        backgroundColor: '#fff', // Witte achtergrond voor taken
        borderRadius: 4,
        marginBottom: 8,
    },
    taskDone: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
});

export default TasksScreen;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export interface Task {
    id: string;
    title: string;
    done: boolean;
    date_added: Date;
}

const STORAGE_KEY = 'TASKS';

export default function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const loadTasks = async () => {
            const json = await AsyncStorage.getItem(STORAGE_KEY);
            if (json) {
                const parsed = JSON.parse(json);
                setTasks(parsed.map((t: any) => ({ ...t, date_added: new Date(t.date_added) })));
            }
        };
        loadTasks();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title: string) => {
        if (title.trim()) {
            setTasks([{
                id: Date.now().toString(),
                title,
                done: false,
                date_added: new Date()
            }, ...tasks]);
        }
    };

    const toggleTaskDone = (id: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, done: !task.done } : task
        ));
    };

    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const getSortedTasks = () => {
        return [...tasks]
            .sort((a, b) => b.date_added.getTime() - a.date_added.getTime())
            .sort((a, b) => Number(a.done) - Number(b.done));
    };

    return { tasks: getSortedTasks(), addTask, toggleTaskDone, removeTask };
}
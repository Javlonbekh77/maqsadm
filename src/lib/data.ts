
'use server';

import type { User, Group, Task, TaskHistory, WeeklyMeeting } from './types';
import { subDays, format } from 'date-fns';
import { db } from './firebase-admin';
import { PlaceHolderImages as placeholderImagesData } from './placeholder-images';
import type { DocumentData, QuerySnapshot } from 'firebase-admin/firestore';


// --- In-memory store ---

// Directly use the imported JSON data
export const PlaceHolderImages: {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
}[] = placeholderImagesData;

let dataSeeded = false;

const seedData = async () => {
  if (!db || dataSeeded) {
    if (dataSeeded) console.log("Data already seeded.");
    return;
  }
  console.log("Seeding initial data to Firestore...");

  try {
    const usersSnapshot = await db.collection('users').limit(1).get();
    if (!usersSnapshot.empty) {
      console.log("Data already exists. Skipping seed.");
      dataSeeded = true;
      return;
    }

    const getUserAvatar = (id: string) => placeholderImagesData.find((img) => img.id === id)?.imageUrl || '';
    const getGroupImage = (id: string) => placeholderImagesData.find((img) => img.id === id)?.imageUrl || '';
    const getGroupImageHint = (id: string) => placeholderImagesData.find((img) => img.id === id)?.imageHint || '';

    const generateTaskHistory = (tasks: {taskId: string, frequency: number}[]): TaskHistory[] => {
        const history: TaskHistory[] = [];
        const today = new Date();
        for (let i = 0; i < 30; i++) {
            const date = subDays(today, i);
            tasks.forEach(taskInfo => {
                 if (Math.random() < taskInfo.frequency) {
                    history.push({ taskId: taskInfo.taskId, date: format(date, 'yyyy-MM-dd') });
                }
            })
        }
        return history;
    }

    const initialUsers: Omit<User, 'firebaseId'>[] = [
      {
        id: 'user-1',
        fullName: 'Sarah Johnson',
        avatarUrl: getUserAvatar('user1'),
        coins: 1250,
        goals: 'Run a 5k, read 12 books this year',
        habits: 'Morning jogs, reading before bed',
        groups: ['group-1', 'group-2'],
        occupation: 'Graphic Designer at Studio Ghibli',
        taskHistory: generateTaskHistory([{taskId: 'task-1', frequency: 0.8}, {taskId: 'task-3', frequency: 0.9}]),
      },
      {
        id: 'user-2',
        fullName: 'David Martinez',
        avatarUrl: getUserAvatar('user2'),
        coins: 980,
        goals: 'Learn Next.js, contribute to an open-source project',
        habits: 'Daily coding challenges, reviewing pull requests',
        groups: ['group-3'],
        occupation: 'Student at Astrum IT Academy',
        taskHistory: generateTaskHistory([{taskId: 'task-5', frequency: 0.7}]),
      },
      {
        id: 'user-3',
        fullName: 'Emily White',
        avatarUrl: getUserAvatar('user3'),
        coins: 1500,
        goals: 'Workout 4 times a week',
        habits: 'Gym sessions, meal prepping',
        groups: ['group-1', 'group-4'],
        occupation: 'Fitness Coach at Ecofit',
        taskHistory: generateTaskHistory([{taskId: 'task-1', frequency: 0.6}, {taskId: 'task-7', frequency: 0.95}]),
      },
      {
        id: 'user-4',
        fullName: 'Michael Brown',
        avatarUrl: getUserAvatar('user4'),
        coins: 720,
        goals: 'Read more classic literature',
        habits: 'Weekend reading sprints',
        groups: ['group-2'],
        occupation: 'Librarian at National Library',
        taskHistory: generateTaskHistory([{taskId: 'task-3', frequency: 0.5}]),
      },
    ];

    const initialGroups: Omit<Group, 'firebaseId'>[] = [
      {
        id: 'group-1',
        name: 'Morning Runners',
        description: 'A group for early birds who love to start their day with a run.',
        imageUrl: getGroupImage('group1'),
        imageHint: getGroupImageHint('group1'),
        members: ['user-1', 'user-3'],
        adminId: 'user-1',
      },
      {
        id: 'group-2',
        name: 'Book Worms Society',
        description: 'Discussing a new book every month. From classics to modern sci-fi.',
        imageUrl: getGroupImage('group2'),
        imageHint: getGroupImageHint('group2'),
        members: ['user-1', 'user-4'],
        adminId: 'user-4',
      },
      {
        id: 'group-3',
        name: 'Code Crafters',
        description: 'For developers passionate about building amazing things with code.',
        imageUrl: getGroupImage('group3'),
        imageHint: getGroupImageHint('group3'),
        members: ['user-2'],
        adminId: 'user-2',
      },
        {
        id: 'group-4',
        name: 'Fitness Fanatics',
        description: 'Share workout plans, nutrition tips, and stay accountable.',
        imageUrl: getGroupImage('group4'),
        imageHint: getGroupImageHint('group4'),
        members: ['user-3'],
        adminId: 'user-3',
      },
    ];

    const initialTasks: Omit<Task, 'firebaseId'>[] = [
      {
        id: 'task-1',
        groupId: 'group-1',
        title: 'Complete a 3-mile run',
        description: 'Log a run of at least 3 miles. Share your time if you feel like it!',
        coins: 50,
      },
      {
        id: 'task-2',
        groupId: 'group-1',
        title: 'Post a sunrise picture from your run',
        description: 'Share the beauty of the morning with the group.',
        coins: 20,
      },
      {
        id: 'task-3',
        groupId: 'group-2',
        title: 'Finish this month\'s book',
        description: 'Complete "Dune" by Frank Herbert and prepare for the discussion.',
        coins: 100,
      },
      {
        id: 'task-4',
        groupId: 'group-2',
        title: 'Share a quote from the book',
        description: 'Post your favorite quote in the group chat.',
        coins: 15,
      },
      {
        id: 'task-5',
        groupId: 'group-3',
        title: 'Solve a LeetCode problem',
        description: 'Pick a problem (medium difficulty) and share your solution.',
        coins: 75,
      },
      {
        id: 'task-6',
        groupId: 'group-3',
        title: 'Review a PR',
        description: 'Provide a constructive review on a project PR.',
        coins: 40,
      },
      {
          id: 'task-7',
          groupId: 'group-4',
          title: 'Complete 3 workouts this week',
          description: 'Log at least 3 separate workout sessions.',
          coins: 80,
      },
      {
          id: 'task-8',
          groupId: 'group-4',
          title: 'Share a healthy recipe',
          description: 'Post a recipe you love in the group resources.',
          coins: 25,
      }
    ];

    const initialMeetings: Omit<WeeklyMeeting, 'firebaseId'>[] = [
      { id: 'meet-1', groupId: 'group-1', title: 'Weekly Sync & Motivation', day: 'Mondays', time: '8:00 AM', url: 'https://meet.google.com' },
      { id: 'meet-2', groupId: 'group-2', title: 'Book Discussion: Dune Ch. 1-5', day: 'Wednesdays', time: '7:00 PM', url: 'https://meet.google.com' },
      { id: 'meet-3', groupId: 'group-3', title: 'Code Review & Pairing Session', day: 'Thursdays', time: '4:00 PM', url: 'https://meet.google.com' },
      { id: 'meet-4', groupId: 'group-4', title: 'Workout Plan Review', day: 'Sundays', time: '10:00 AM', url: 'https://meet.google.com' },
    ];
    
    const batch = db.batch();
    initialUsers.forEach(user => batch.set(db.collection('users').doc(user.id), user));
    initialGroups.forEach(group => batch.set(db.collection('groups').doc(group.id), group));
    initialTasks.forEach(task => batch.set(db.collection('tasks').doc(task.id), task));
    initialMeetings.forEach(meeting => batch.set(db.collection('meetings').doc(meeting.id), meeting));
    await batch.commit();

    console.log("Initial data seeded successfully.");
    dataSeeded = true;
  } catch (error) {
    console.error("Error seeding data: ", error);
  }
};

seedData();


const mapDocToData = <T>(doc: DocumentData): T => {
    const data = doc.data() as T;
    return { ...data, firebaseId: doc.id };
}

const mapQueryToData = <T>(snapshot: QuerySnapshot): T[] => {
    return snapshot.docs.map(doc => mapDocToData<T>(doc));
}

// --- Data Access Functions ---

export const getGroups = async (): Promise<Group[]> => {
  if (!db) return [];
  try {
    const snapshot = await db.collection('groups').get();
    return mapQueryToData<Group>(snapshot);
  } catch (error) {
    console.error("Error fetching groups:", error);
    return [];
  }
};

export const getGroupById = async (id: string): Promise<Group | undefined> => {
  if (!db) return undefined;
  try {
    const doc = await db.collection('groups').doc(id).get();
    if (!doc.exists) return undefined;
    return mapDocToData<Group>(doc);
  } catch (error) {
    console.error(`Error fetching group ${id}:`, error);
    return undefined;
  }
};

export const getTasksByGroupId = async (groupId: string): Promise<Task[]> => {
  if (!db) return [];
  try {
    const snapshot = await db.collection('tasks').where('groupId', '==', groupId).get();
    return mapQueryToData<Task>(snapshot);
  } catch (error) {
    console.error(`Error fetching tasks for group ${groupId}:`, error);
    return [];
  }
};

export const getMeetingsByGroupId = async (groupId: string): Promise<WeeklyMeeting[]> => {
  if (!db) return [];
  try {
    const snapshot = await db.collection('meetings').where('groupId', '==', groupId).get();
    return mapQueryToData<WeeklyMeeting>(snapshot);
  } catch (error) {
    console.error(`Error fetching meetings for group ${groupId}:`, error);
    return [];
  }
};

export const getUsers = async (): Promise<User[]> => {
  if (!db) return [];
  try {
    const snapshot = await db.collection('users').get();
    return mapQueryToData<User>(snapshot);
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  if (!db) return undefined;
  try {
    const doc = await db.collection('users').doc(id).get();
    if (!doc.exists) return undefined;
    return mapDocToData<User>(doc);
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    return undefined;
  }
};

export const getTopUsers = async (): Promise<User[]> => {
  if (!db) return [];
  try {
    const snapshot = await db.collection('users').orderBy('coins', 'desc').limit(10).get();
    return mapQueryToData<User>(snapshot);
  } catch (error) {
    console.error("Error fetching top users:", error);
    return [];
  }
};

export const getTopGroups = async (): Promise<(Group & { coins: number })[]> => {
    if (!db) return [];
    try {
        const groups = await getGroups();
        const users = await getUsers();

        return groups.map(group => {
            const groupCoins = group.members.reduce((total, memberId) => {
                const user = users.find(u => u.id === memberId);
                return total + (user?.coins || 0);
            }, 0);
            return { ...group, coins: groupCoins };
        }).sort((a, b) => b.coins - a.coins).slice(0, 10);
    } catch (error) {
        console.error("Error fetching top groups:", error);
        return [];
    }
};

export const getUserTasks = async (userId: string) => {
    if (!db) return [];
    try {
      const user = await getUserById(userId);
      if (!user) return [];
      
      const today = format(new Date(), 'yyyy-MM-dd');
      
      const tasksSnapshot = await db.collection('tasks').where('groupId', 'in', user.groups).get();
      const allTasks = mapQueryToData<Task>(tasksSnapshot);
      
      const userTasksWithDetails = await Promise.all(allTasks.map(async task => {
          const group = await getGroupById(task.groupId);
          const isCompletedToday = user.taskHistory.some(h => h.taskId === task.id && h.date === today);
          return {
              ...task,
              groupName: group?.name || 'Unknown Group',
              isCompleted: isCompletedToday,
          };
      }));

      return userTasksWithDetails;
    } catch (error) {
      console.error(`Error fetching user tasks for ${userId}:`, error);
      return [];
    }
};

export const getGoalMates = async (userId: string): Promise<User[]> => {
    if (!db) return [];
    try {
        const currentUser = await getUserById(userId);
        if (!currentUser) return [];

        const groupIds = currentUser.groups;
        const goalMatesMap = new Map<string, User>();

        for (const groupId of groupIds) {
            const group = await getGroupById(groupId);
            if (group) {
                for (const memberId of group.members) {
                    if (memberId !== userId) {
                        const user = await getUserById(memberId);
                        if (user && !goalMatesMap.has(user.id)) {
                            goalMatesMap.set(user.id, user);
                        }
                    }
                }
            }
        }
        return Array.from(goalMatesMap.values());
    } catch (error) {
        console.error(`Error fetching goal mates for ${userId}:`, error);
        return [];
    }
};

// --- Mutation functions ---

export const addUserToGroup = async (userId: string, groupId: string): Promise<void> => {
    if (!db) return;
    try {
        const userRef = db.collection('users').doc(userId);
        const groupRef = db.collection('groups').doc(groupId);
        const userDoc = await userRef.get();
        const groupDoc = await groupRef.get();

        if (userDoc.exists && groupDoc.exists) {
            const userData = userDoc.data() as User;
            const groupData = groupDoc.data() as Group;

            if (!userData.groups.includes(groupId)) {
                await userRef.update({ groups: [...userData.groups, groupId] });
            }
            if (!groupData.members.includes(userId)) {
                 await groupRef.update({ members: [...groupData.members, userId] });
            }
        }
    } catch (error) {
        console.error(`Error adding user ${userId} to group ${groupId}:`, error);
    }
};

export const completeUserTask = async (userId: string, taskId: string, coins: number): Promise<void> => {
  if (!db) return;
  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    
    if (userDoc.exists) {
      const userData = userDoc.data() as User;
      const today = format(new Date(), 'yyyy-MM-dd');
      
      const alreadyCompleted = userData.taskHistory.some(
        h => h.taskId === taskId && h.date === today
      );
      
      if (!alreadyCompleted) {
        await userRef.update({
          coins: (userData.coins || 0) + coins,
          taskHistory: [...userData.taskHistory, { taskId, date: today }],
        });
      }
    }
  } catch (error) {
     console.error(`Error completing task ${taskId} for user ${userId}:`, error);
  }
};

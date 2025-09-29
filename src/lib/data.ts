import type { User, Group, Task, TaskHistory } from './types';
import { PlaceHolderImages } from './placeholder-images';
import { subDays, format } from 'date-fns';
import { db } from './firebase';
import { collection, getDocs, writeBatch, query, where } from "firebase/firestore";

const getUserAvatar = (id: string) => PlaceHolderImages.find((img) => img.id === id)?.imageUrl || '';
const getGroupImage = (id: string) => PlaceHolderImages.find((img) => img.id === id)?.imageUrl || '';
const getGroupImageHint = (id: string) => PlaceHolderImages.find((img) => img.id === id)?.imageHint || '';


// Generate some fake task history
const generateTaskHistory = (tasks: {taskId: string, frequency: number}[]): TaskHistory[] => {
    const history: TaskHistory[] = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) { // last 30 days
        const date = subDays(today, i);
        tasks.forEach(taskInfo => {
             if (Math.random() < taskInfo.frequency) {
                history.push({ taskId: taskInfo.taskId, date: format(date, 'yyyy-MM-dd') });
            }
        })
    }
    return history;
}

// --- STATIC MOCK DATA (Used for seeding Firestore) ---

let initialUsers: User[] = [
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

let initialGroups: Group[] = [
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

let initialTasks: Task[] = [
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

// --- DATA SEEDING (ONE-TIME) ---

// This function seeds the database with initial data if it's empty.
// In a real app, this would be handled by a separate script or admin interface.
async function seedDatabase() {
    const groupsCollection = collection(db, "groups");
    const groupsSnapshot = await getDocs(groupsCollection);
    if (groupsSnapshot.empty) {
        console.log("Database is empty. Seeding initial data...");
        const batch = writeBatch(db);
        
        initialGroups.forEach(group => {
            const docRef = collection(db, "groups").doc();
            batch.set(docRef, group);
        });
        initialTasks.forEach(task => {
            const docRef = collection(db, "tasks").doc();
            batch.set(docRef, task);
        });
        initialUsers.forEach(user => {
            const docRef = collection(db, "users").doc();
            batch.set(docRef, user);
        });

        await batch.commit();
        console.log("Database seeded successfully!");
    } else {
        console.log("Database already contains data. Skipping seed.");
    }
}


// --- FIRESTORE DATA FUNCTIONS ---

export const getGroups = async (): Promise<Group[]> => {
  await seedDatabase(); // Ensure DB is seeded before fetching
  const groupsCollection = collection(db, 'groups');
  const groupSnapshot = await getDocs(groupsCollection);
  const groupList = groupSnapshot.docs.map(doc => ({
    firebaseId: doc.id,
    ...doc.data()
  } as Group));
  return groupList;
};

// --- STATIC DATA FUNCTIONS (to be replaced) ---

let users: User[] = initialUsers;
let groups: Group[] = initialGroups;
let tasks: Task[] = initialTasks;

export const getGroupById = (id: string) => groups.find((g) => g.id === id);
export const getTasksByGroupId = (groupId: string) => tasks.filter((t) => t.groupId === groupId);
export const getUsers = () => users;
export const getUserById = (id: string) => users.find((u) => u.id === id);
export const getTopUsers = () => [...users].sort((a, b) => b.coins - a.coins).slice(0, 10);
export const getTopGroups = () => {
    return groups.map(group => {
        const groupCoins = group.members.reduce((total, memberId) => {
            const user = getUserById(memberId);
            return total + (user?.coins || 0);
        }, 0);
        return { ...group, coins: groupCoins };
    }).sort((a, b) => b.coins - a.coins).slice(0, 10);
};

export const getUserTasks = (userId: string) => {
    const user = getUserById(userId);
    if (!user) return [];
    
    // In a real app, this logic would be more complex
    const today = format(new Date(), 'yyyy-MM-dd');
    
    return tasks
        .filter(task => user.groups.includes(task.groupId))
        .map(task => {
            const group = getGroupById(task.groupId);
            const isCompletedToday = user.taskHistory.some(h => h.taskId === task.id && h.date === today);
            return {
                ...task,
                groupName: group?.name || 'Unknown Group',
                isCompleted: isCompletedToday,
            }
        });
};

export const getGoalMates = (userId: string): User[] => {
    const currentUser = getUserById(userId);
    if (!currentUser) return [];

    const groupIds = currentUser.groups;
    const goalMatesMap = new Map<string, User>();

    groupIds.forEach(groupId => {
        const group = getGroupById(groupId);
        group?.members.forEach(memberId => {
            if (memberId !== userId) {
                const user = getUserById(memberId);
                if (user) {
                    goalMatesMap.set(user.id, user);
                }
            }
        });
    });

    return Array.from(goalMatesMap.values());
};

// Mutation functions (for client-side state updates)
export const addUserToGroup = (userId: string, groupId: string) => {
    users = users.map(user => {
        if (user.id === userId && !user.groups.includes(groupId)) {
            return { ...user, groups: [...user.groups, groupId] };
        }
        return user;
    });

    groups = groups.map(group => {
        if (group.id === groupId && !group.members.includes(userId)) {
            return { ...group, members: [...group.members, userId] };
        }
        return group;
    });
};

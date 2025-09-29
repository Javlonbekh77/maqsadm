export type Task = {
  id: string;
  title: string;
  description: string;
  coins: number;
  groupId: string;
};

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  coins: number;
  goals: string;
  habits: string;
  groups: string[]; // array of group IDs
};

export type Group = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  members: string[]; // array of user IDs
  adminId: string;
};

// Represents a user's specific task from a group they've joined
export type UserTask = Task & {
  groupName: string;
  isCompleted: boolean;
};

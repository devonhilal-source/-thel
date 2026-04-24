export interface User {
  id: string;
  username: string;
  name: string;
  bio: string;
  photoUrl: string;
  skillTags: string[];
  stats: {
    posts: number;
    votes: number;
    challengeWins: number;
  };
}

export interface Poem {
  id: string;
  authorId: string;
  title: string;
  content: string;
  mood?: string;
  tags: string[];
  publishedAt: string;
  upvotes: number;
  isDraft: boolean;
  version: number;
}

export interface Comment {
  id: string;
  poemId: string;
  authorId: string;
  content: string;
  createdAt: string;
  highlightedLines?: number[];
}

export interface Challenge {
  id: string;
  prompt: string;
  title: string;
  deadline: string;
  imageUrl: string;
  issueNumber: number;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  participantIds: string[];
  lastMessage?: Message;
}

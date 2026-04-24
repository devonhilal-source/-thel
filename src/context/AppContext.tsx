import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Poem, Challenge, Chat, Message } from "../types";
import { io, Socket } from "socket.io-client";
import { auth, db, googleProvider, handleFirestoreError } from "../lib/firebase";
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  addDoc, 
  serverTimestamp,
  setDoc,
  doc,
  getDoc
} from "firebase/firestore";

interface AppContextType {
  currentUser: User | null;
  authLoading: boolean;
  poems: Poem[];
  challenges: Challenge[];
  chats: Chat[];
  messages: Message[];
  socket: Socket | null;
  login: (provider?: "google" | "anonymous") => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  addPoem: (poem: Omit<Poem, "id" | "publishedAt" | "authorId">) => Promise<void>;
  sendMessage: (chatId: string, content: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [poems, setPoems] = useState<Poem[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Auth Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setAuthLoading(true);
      if (fbUser) {
        // Check if user exists in Firestore
        const userDocRef = doc(db, "users", fbUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setCurrentUser(userDoc.data() as User);
        } else {
          // Create new user profile
          const newUser: User = {
            id: fbUser.uid,
            username: fbUser.email?.split("@")[0] || fbUser.displayName?.toLowerCase().replace(/\s+/g, "_") || `poet_${fbUser.uid.slice(0, 5)}`,
            name: fbUser.displayName || fbUser.email?.split("@")[0] || "Anonymous Poet",
            bio: "A new voice in the anthology.",
            photoUrl: fbUser.photoURL || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=256",
            skillTags: [],
            stats: { posts: 0, votes: 0, challengeWins: 0 }
          };
          await setDoc(userDocRef, newUser);
          setCurrentUser(newUser);
        }
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Real-time Data Fetching
  useEffect(() => {
    const q = query(collection(db, "poems"), orderBy("publishedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const poemList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Poem));
      setPoems(poemList);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "challenges"), orderBy("issueNumber", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const challengeList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Challenge));
      setChallenges(challengeList);
    });
    return () => unsubscribe();
  }, []);

  // Socket.IO Support (Hybrid)
  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);
    return () => { newSocket.close(); };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("new-message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, [socket]);

  const login = async (provider: "google" | "anonymous" = "google") => {
    try {
      if (provider === "anonymous") {
        const { signInAnonymously } = await import("firebase/auth");
        await signInAnonymously(auth);
        return;
      }

      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      console.error("Sign-in failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const addPoem = async (poemData: any) => {
    if (!currentUser) return;
    try {
      await addDoc(collection(db, "poems"), {
        ...poemData,
        authorId: currentUser.id,
        publishedAt: new Date().toISOString(),
        upvotes: 0,
        version: 1
      });
    } catch (error) {
      handleFirestoreError(error, "create", "poems");
    }
  };

  const sendMessage = async (chatId: string, content: string) => {
    if (!currentUser) return;
    try {
      const msgData: Omit<Message, "id"> = {
        chatId,
        senderId: currentUser.id,
        content,
        timestamp: new Date().toISOString()
      };
      
      // Store in Firestore first (Persistence)
      await addDoc(collection(db, `chats/${chatId}/messages`), msgData);
      
      // Emit via socket for real-time (Speed)
      if (socket) {
        socket.emit("send-message", { ...msgData, id: Math.random().toString() });
      }
    } catch (error) {
      handleFirestoreError(error, "create", `chats/${chatId}/messages`);
    }
  };

  return (
    <AppContext.Provider value={{ 
      currentUser, 
      authLoading,
      poems, 
      challenges, 
      chats, 
      messages, 
      socket, 
      login, 
      signUpWithEmail,
      signInWithEmail,
      logout,
      addPoem, 
      sendMessage 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};

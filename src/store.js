import { create } from 'zustand';
import { encryptMessage, decryptMessage } from './utils/encryption';

const useStore = create((set, get) => ({
  messages: [],
  contacts: [],
  currentChat: null,
  stories: [],
  currentCall: null,
  groups: [],

  // Message handling
  addMessage: async (message) => {
    const encrypted = await encryptMessage(JSON.stringify(message));
    set((state) => ({
      messages: [...state.messages, { ...message, encrypted }]
    }));
  },

  // Message reactions
  addReaction: (messageId, reaction) => set((state) => ({
    messages: state.messages.map(msg =>
      msg.id === messageId
        ? { ...msg, reactions: [...(msg.reactions || []), reaction] }
        : msg
    )
  })),

  // Stories
  addStory: (story) => set((state) => ({
    stories: [...state.stories, story]
  })),

  // Calls
  startCall: (contact, type = 'voice') => set({
    currentCall: {
      contact,
      type,
      startTime: new Date(),
      isMuted: false,
      isVideoOff: false
    }
  }),

  endCall: () => set({ currentCall: null }),

  toggleMute: () => set((state) => ({
    currentCall: state.currentCall
      ? { ...state.currentCall, isMuted: !state.currentCall.isMuted }
      : null
  })),

  toggleVideo: () => set((state) => ({
    currentCall: state.currentCall
      ? { ...state.currentCall, isVideoOff: !state.currentCall.isVideoOff }
      : null
  })),

  // Groups
  createGroup: (group) => set((state) => ({
    groups: [...state.groups, { ...group, id: Date.now() }]
  })),

  addMemberToGroup: (groupId, member) => set((state) => ({
    groups: state.groups.map(group =>
      group.id === groupId
        ? { ...group, members: [...group.members, member] }
        : group
    )
  })),

  // Chat management
  setCurrentChat: (chat) => set({ currentChat: chat }),
}));

export default useStore;
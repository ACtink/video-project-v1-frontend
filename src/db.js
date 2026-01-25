import Dexie from "dexie";

export const db = new Dexie("chat_app");

db.version(1).stores({
  messages: `
    _id,
    senderId,
    receiverId,
    status,
    createdAt
  `,
});

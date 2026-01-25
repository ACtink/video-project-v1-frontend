import { db } from "../db";

export async function saveMessage(data) {

  console.log("Saving message to IndexedDB:", data);
  await db.messages.put({
    _id: data.message.messageId, // primary key
    type: data.type,

    // store raw message object
    messageId: data.message.messageId,
    to: data.message.to,
    from: data.message.from,
    text: data.message.text,
    createdAt: new Date(data.message.createdAt).getTime(),
  });
}

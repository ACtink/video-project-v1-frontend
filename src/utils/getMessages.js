


import { db } from "../db";



export async function getChatMessages(myId, otherId) {
  return await db.messages
    .where("createdAt")
    .above(0)
    .filter(
      (m) =>
        (m.from === myId && m.to === otherId) ||
        (m.from === otherId && m.to === myId),
    )
    .toArray();
}

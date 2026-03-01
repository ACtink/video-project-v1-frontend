// import React from "react";

// const MessageBubble = React.memo(({ msg, isMe, otherUser, user }) => {
//   return (
//     <div
//       className={`flex items-end gap-2 ${
//         isMe ? "justify-end" : "justify-start"
//       }`}
//     >
//       {!isMe && (
//         <div className="w-6 h-6 rounded-full bg-neutral-600 flex items-center justify-center text-xs font-semibold text-white">
//           {otherUser.username?.[0]?.toUpperCase()}
//         </div>
//       )}

//       <div
//         className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm text-white ${
//           isMe ? "bg-indigo-600" : "bg-white/20"
//         }`}
//       >
//         {msg.text}
//       </div>

//       {isMe && (
//         <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-semibold text-white">
//           {user.username?.[0]?.toUpperCase()}
//         </div>
//       )}
//     </div>
//   );
// });

// export default MessageBubble;

import React from "react";

const MessageBubble = React.memo(function MessageBubble({
  msg,
  isMe,
  otherUser,
  user,
}) {
  return (
    <div
      className={`flex items-end gap-2 ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      {!isMe && (
        <div className="w-6 h-6 rounded-full bg-neutral-600 flex items-center justify-center text-xs font-semibold text-white">
          {otherUser.username?.[0]?.toUpperCase()}
        </div>
      )}

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm text-white ${
          isMe ? "bg-indigo-600" : "bg-white/20"
        }`}
      >
        {msg.text}
      </div>

      {isMe && (
        <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-semibold text-white">
          {user.username?.[0]?.toUpperCase()}
        </div>
      )}
    </div>
  );
});

export default MessageBubble;
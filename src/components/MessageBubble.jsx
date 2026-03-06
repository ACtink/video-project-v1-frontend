import React from "react";

const MessageBubble = React.memo(function MessageBubble({
  msg,
  isMe,
  otherUser,
  user,
}) {
 

  return (
    <div
      className={`flex items-end gap-2 min-w-0 ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      {!isMe && (
        <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-600 shrink-0">
          {otherUser?.profilePicture ? (
            <img
              src={otherUser.profilePicture}
              alt={otherUser.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
              {otherUser.username?.[0]?.toUpperCase()}
            </div>
          )}
        </div>
      )}

      <div
        className={`min-w-14 max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed text-white break-words shadow-sm backdrop-blur-sm ${
          isMe ? "bg-indigo-600/95 rounded-br-md" : "bg-white/20 rounded-bl-md"
        }`}
      >
        {msg.image && (
          <img
            src={msg.image}
            alt="message"
            className="rounded-xl mb-2 max-h-64 object-cover"
          />
        )}

        {msg.text && <div className="tracking-wide">{msg.text}</div>}
      </div>

      {isMe && (
        <div className="w-6 h-6 rounded-full overflow-hidden bg-indigo-600 shrink-0">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
              {user.username?.[0]?.toUpperCase()}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default MessageBubble;

// // import { ArrowLeft, Send, Smile } from "lucide-react";
// // import {
// //   useContext,
// //   useState,
// //   useEffect,
// //   useRef,
// //   useCallback,
// //   useMemo,
// // } from "react";
// // import { createPortal } from "react-dom";
// // import { v4 as uuidv4 } from "uuid";
// // import { websocketContext } from "../../context/WebSocket";
// // import { useAuth } from "../../hooks/useAuth";
// // import fetchData from "../../utils/fetchData";
// // import MessageBubble from "../MessageBubble";
// // import ChatOptionsPopup from "../ChatOptionsPopup";
// // import { useNavigate } from "react-router-dom";

// // // ─────────────────────────────────────────────────────────────────────────────
// // // Platform detection
// // // ─────────────────────────────────────────────────────────────────────────────

// // const UA = typeof navigator !== "undefined" ? navigator.userAgent : "";
// // const IS_ANDROID = /Android/i.test(UA);

// // // ─────────────────────────────────────────────────────────────────────────────
// // // Viewport meta management
// // //
// // //   iOS  → resizes-visual: visual viewport shrinks, layout viewport stays.
// // //          We track visualViewport.height and apply it as explicit height.
// // //
// // //   Android → resizes-content: layout viewport shrinks automatically.
// // //          h-full flex column compresses by itself. No JS height needed.
// // // ─────────────────────────────────────────────────────────────────────────────

// // function useViewportMeta() {
// //   useEffect(() => {
// //     let meta = document.querySelector('meta[name="viewport"]');
// //     const prev = meta?.getAttribute("content") ?? "";
// //     if (!meta) {
// //       meta = document.createElement("meta");
// //       meta.name = "viewport";
// //       document.head.appendChild(meta);
// //     }
// //     const value = IS_ANDROID
// //       ? "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content"
// //       : "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-visual";
// //     meta.setAttribute("content", value);
// //     return () => meta.setAttribute("content", prev);
// //   }, []);
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // Shared constants
// // // ─────────────────────────────────────────────────────────────────────────────

// // const EMOJI_LIST = [
// //   "😀","😂","😍","🥰","😎","🤔","😭","😡","🥺","😴",
// //   "👍","👎","❤️","🔥","✨","🎉","🙏","💯","😊","🤣",
// //   "😘","🥳","😤","🤯","😇","🤗","😏","🙄","😬","🤝",
// //   "👀","💀","🫡","🫠","🥹","😮","😱","🤌","💪","👏",
// //   "🍕","🎮","🎵","⚡","🌙","☀️","🌈","💫","🚀","🎯",
// // ];

// // // ─────────────────────────────────────────────────────────────────────────────
// // // Shared textarea attributes that suppress Android suggestions/password strip
// // //
// // // autoComplete="off"         → hides password manager icon on the strip
// // // autoCorrect="off"          → reduces strip on some Android keyboards
// // // autoCapitalize="sentences" → keeps normal capitalisation
// // // spellCheck={false}         → no red underlines
// // // data-form-type="other"     → tells password managers to ignore this field
// // // enterKeyHint="send"        → shows "Send" label on the keyboard return key
// // // ─────────────────────────────────────────────────────────────────────────────

// // const TEXTAREA_PROPS = {
// //   autoComplete: "off",
// //   autoCorrect: "off",
// //   autoCapitalize: "sentences",
// //   spellCheck: false,
// //   "data-form-type": "other",
// //   enterKeyHint: "send",
// // };

// // // ─────────────────────────────────────────────────────────────────────────────
// // // MessageStatus
// // // ─────────────────────────────────────────────────────────────────────────────

// // function MessageStatus({ status }) {
// //   if (status === "blocked") {
// //     return <span style={{ fontSize: 10, color: "#f87171" }}>Not delivered</span>;
// //   }
// //   if (status === "sending" || status === "sent") {
// //     return (
// //       <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
// //         <path d="M1 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// //       </svg>
// //     );
// //   }
// //   if (status === "read") {
// //     return (
// //       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
// //         <path d="M1 5l3 3 5-6" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// //         <path d="M6 5l3 3 5-6" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// //       </svg>
// //     );
// //   }
// //   if (status === "delivered") {
// //     return (
// //       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
// //         <path d="M1 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// //         <path d="M6 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// //       </svg>
// //     );
// //   }
// //   return (
// //     <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
// //       <path d="M1 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// //     </svg>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // MessageSkeleton
// // // ─────────────────────────────────────────────────────────────────────────────

// // function MessageSkeleton() {
// //   return (
// //     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
// //       <div className="flex items-end gap-2">
// //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// //         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
// //       </div>
// //       <div className="flex justify-end">
// //         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
// //       </div>
// //       <div className="flex items-end gap-2">
// //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// //         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
// //       </div>
// //       <div className="flex justify-end">
// //         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
// //       </div>
// //       <div className="flex items-end gap-2">
// //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// //         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
// //       </div>
// //       <div className="flex justify-end">
// //         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
// //       </div>
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // useConversation — all data/WS logic
// // // ─────────────────────────────────────────────────────────────────────────────

// // function useConversation({ chat, onNewMessage, onClearMessages }) {
// //   const { user } = useAuth();
// //   const navigate = useNavigate();
// //   const myUserId = user._id;
// //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);
// //   const conversationId = chat._id.toString();
// //   const receiverId = otherUser?._id;

// //   const { sendSignal, messages, setMessages, markAsRead, setCurrentConversation } = useContext(websocketContext);

// //   const [text, setText] = useState("");
// //   const [cursor, setCursor] = useState(null);
// //   const [loadingMore, setLoadingMore] = useState(false);
// //   const [fetchingMessages, setFetchingMessages] = useState(true);
// //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// //   const [showChatOptions, setShowChatOptions] = useState(false);
// //   const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
// //   const [chatTheme, setChatTheme] = useState({ id: "default", label: "Default", bg: "#0a0a0a" });
// //   const [isBlocked, setIsBlocked] = useState(false);
// //   const [hasMore, setHasMore] = useState(true);

// //   const messagesContainerRef = useRef(null);
// //   const shouldAutoScrollRef = useRef(true);
// //   const textareaRef = useRef(null);
// //   const emojiPickerRef = useRef(null);
// //   const chatOptionsRef = useRef(null);
// //   const readMarkedRef = useRef(false);

// //   useEffect(() => {
// //     if (!receiverId) return;
// //     let cancelled = false;
// //     fetchData(`/api/users/${receiverId}/block-status`, { credentials: "include" })
// //       .then((r) => r.json())
// //       .then((data) => { if (!cancelled) setIsBlocked(data.isBlocked); })
// //       .catch((err) => console.error("Failed to fetch block status", err));
// //     return () => { cancelled = true; };
// //   }, [receiverId]);

// //   useEffect(() => {
// //     setCurrentConversation(conversationId);
// //     return () => setCurrentConversation(null);
// //   }, [conversationId, setCurrentConversation]);

// //   useEffect(() => {
// //     setHasMore(true);
// //     setCursor(null);
// //     setFetchingMessages(true);
// //     setShowEmojiPicker(false);
// //     setShowChatOptions(false);
// //     setIsBlocked(false);
// //     readMarkedRef.current = false;
// //     shouldAutoScrollRef.current = true;
// //   }, [conversationId]);

// //   const doMarkRead = useCallback(() => {
// //     const convMessages = messages[conversationId] || [];
// //     const hasUnread = convMessages.some((m) => m.from !== myUserId && m.status !== "read");
// //     if (!hasUnread) return;
// //     setMessages((prev) => ({
// //       ...prev,
// //       [conversationId]: (prev[conversationId] || []).map((m) =>
// //         m.from !== myUserId && m.status !== "read" ? { ...m, status: "read" } : m
// //       ),
// //     }));
// //     markAsRead(conversationId);
// //     if (!readMarkedRef.current) {
// //       readMarkedRef.current = true;
// //       fetchData(`/api/chat/conversations/${conversationId}/read`, { method: "PATCH", credentials: "include" }).catch(() => {});
// //     }
// //   }, [conversationId, messages, myUserId, markAsRead, setMessages]);

// //   useEffect(() => {
// //     doMarkRead();
// //     readMarkedRef.current = false;
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [conversationId, messages[conversationId]?.length]);

// //   useEffect(() => {
// //     const h = (e) => {
// //       if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target))
// //         setShowEmojiPicker(false);
// //     };
// //     document.addEventListener("mousedown", h);
// //     return () => document.removeEventListener("mousedown", h);
// //   }, []);

// //   const handleToggleChatOptions = useCallback(() => {
// //     if (!showChatOptions && chatOptionsRef.current) {
// //       const rect = chatOptionsRef.current.getBoundingClientRect();
// //       setPopupPos({ top: rect.bottom + 6, right: window.innerWidth - rect.right });
// //     }
// //     setShowChatOptions((v) => !v);
// //   }, [showChatOptions]);

// //   const insertEmoji = useCallback((emoji) => {
// //     const ta = textareaRef.current;
// //     if (!ta) { setText((prev) => prev + emoji); return; }
// //     const start = ta.selectionStart;
// //     const end = ta.selectionEnd;
// //     const newText = text.slice(0, start) + emoji + text.slice(end);
// //     setText(newText);
// //     requestAnimationFrame(() => {
// //       ta.focus();
// //       ta.selectionStart = start + emoji.length;
// //       ta.selectionEnd = start + emoji.length;
// //       ta.style.height = "auto";
// //       ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
// //     });
// //   }, [text]);

// //   const handleSend = useCallback(async () => {
// //     if (!text.trim() || isBlocked) return;
// //     const messageId = uuidv4();
// //     const createdAt = Date.now();
// //     const messageText = text;
// //     setMessages((prev) => {
// //       const existing = prev[conversationId] || [];
// //       return {
// //         ...prev,
// //         [conversationId]: [...existing, { messageId, conversationId, from: myUserId, to: receiverId, text: messageText, status: "sending", createdAt }],
// //       };
// //     });
// //     sendSignal({ type: "chat_message", messageId, conversationId, to: receiverId, text: messageText, createdAt });
// //     onNewMessage?.(conversationId, messageText);
// //     setText("");
// //     setShowEmojiPicker(false);
// //     if (textareaRef.current) textareaRef.current.style.height = "auto";
// //     shouldAutoScrollRef.current = true;
// //   }, [text, isBlocked, conversationId, myUserId, receiverId, sendSignal, setMessages, onNewMessage]);

// //   const loadOlderMessages = useCallback(async () => {
// //     if (!cursor || loadingMore) return;
// //     setLoadingMore(true);
// //     const el = messagesContainerRef.current;
// //     const scrollHeightBefore = el ? el.scrollHeight : 0;
// //     try {
// //       const res = await fetchData(`/api/chat/messages/${conversationId}?cursor=${cursor}`, { credentials: "include" });
// //       const data = await res.json();
// //       const arr = Array.isArray(data) ? data : data.messages || [];
// //       if (arr.length < 50) setHasMore(false);
// //       const formatted = arr.map((msg) => ({
// //         messageId: msg.messageId, conversationId,
// //         from: msg.senderId, to: msg.receiverId,
// //         text: msg.text, status: msg.status || "sent",
// //         createdAt: new Date(msg.createdAt).getTime(),
// //       }));
// //       shouldAutoScrollRef.current = false;
// //       setMessages((prev) => {
// //         const existing = prev[conversationId] || [];
// //         const ids = new Set(existing.map((m) => m.messageId));
// //         return { ...prev, [conversationId]: [...formatted.filter((m) => !ids.has(m.messageId)), ...existing] };
// //       });
// //       if (arr.length > 0) setCursor(arr[0].createdAt);
// //       setTimeout(() => { if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore; }, 50);
// //     } catch (err) { console.error("Failed loading older messages", err); }
// //     setLoadingMore(false);
// //   }, [cursor, loadingMore, conversationId, setMessages]);

// //   useEffect(() => {
// //     const el = messagesContainerRef.current;
// //     if (!el) return;
// //     const h = () => { shouldAutoScrollRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 150; };
// //     el.addEventListener("scroll", h, { passive: true });
// //     return () => el.removeEventListener("scroll", h);
// //   }, []);

// //   const scrollToBottom = useCallback((force = false) => {
// //     const el = messagesContainerRef.current;
// //     if (!el) return;
// //     if (!force && !shouldAutoScrollRef.current) return;
// //     requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
// //   }, []);

// //   useEffect(() => {
// //     if (!conversationId) return;
// //     let cancelled = false;
// //     const fetch_ = async () => {
// //       try {
// //         const res = await fetchData(`/api/chat/messages/${conversationId}`, { credentials: "include" });
// //         const data = await res.json();
// //         const arr = Array.isArray(data) ? data : data.messages || [];
// //         if (arr.length < 50) setHasMore(false);
// //         const formatted = arr.map((msg) => ({
// //           messageId: msg.messageId, conversationId,
// //           from: msg.senderId, to: msg.receiverId,
// //           text: msg.text, status: msg.status || "sent",
// //           createdAt: new Date(msg.createdAt).getTime(),
// //         }));
// //         if (arr.length > 0) setCursor(arr[0].createdAt);
// //         if (!cancelled) {
// //           setMessages((prev) => {
// //             const existing = prev[conversationId] || [];
// //             const ids = new Set(existing.map((m) => m.messageId));
// //             return { ...prev, [conversationId]: [...existing, ...formatted.filter((m) => !ids.has(m.messageId))] };
// //           });
// //           requestAnimationFrame(() => {
// //             const el = messagesContainerRef.current;
// //             if (el) el.scrollTop = el.scrollHeight;
// //           });
// //         }
// //       } catch (err) { console.error("Failed to fetch messages", err); }
// //       finally { if (!cancelled) setFetchingMessages(false); }
// //     };
// //     fetch_();
// //     return () => { cancelled = true; };
// //   }, [conversationId]);

// //   const convMessageCount = messages[conversationId]?.length ?? 0;
// //   useEffect(() => {
// //     scrollToBottom(false);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [convMessageCount]);

// //   return {
// //     user, navigate, myUserId, otherUser, conversationId, receiverId,
// //     messages, setMessages, text, setText, loadingMore, fetchingMessages,
// //     showEmojiPicker, setShowEmojiPicker, showChatOptions, setShowChatOptions,
// //     popupPos, chatTheme, setChatTheme, isBlocked, setIsBlocked, hasMore,
// //     messagesContainerRef, textareaRef, emojiPickerRef, chatOptionsRef,
// //     handleSend, handleToggleChatOptions, insertEmoji, loadOlderMessages, scrollToBottom,
// //   };
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // ChatHeader
// // // ─────────────────────────────────────────────────────────────────────────────

// // function ChatHeader({ otherUser, isBlocked, navigate, chatOptionsRef, handleToggleChatOptions, onBack }) {
// //   const { onlineUsers } = useContext(websocketContext);
// //   const isOnline = onlineUsers?.has(otherUser?._id?.toString());

// //   return (
// //     <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
// //       <button
// //         onClick={onBack}
// //         className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
// //       >
// //         <ArrowLeft size={18} />
// //       </button>
// //       <div
// //         onClick={() => navigate(`/profile/${otherUser.username}`)}
// //         className="relative w-9 h-9 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-150"
// //       >
// //         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center">
// //           {otherUser.profilePicture ? (
// //             <img
// //               src={otherUser.profilePicture}
// //               alt={otherUser.username}
// //               className="w-full h-full object-cover"
// //             />
// //           ) : (
// //             <span className="text-sm font-semibold text-white">
// //               {otherUser.username?.[0]?.toUpperCase()}
// //             </span>
// //           )}
// //         </div>
// //         <span
// //           className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-[#1a1a2e] ${isOnline ? "bg-green-400" : "bg-neutral-600"}`}
// //         />
// //       </div>
// //       <div className="flex flex-col flex-1 min-w-0">
// //         <h3
// //           onClick={() => navigate(`/profile/${otherUser.username}`)}
// //           className="font-semibold text-sm text-white truncate cursor-pointer hover:text-white/70 transition-colors duration-150"
// //         >
// //           {otherUser.username}
// //         </h3>
// //         {isBlocked && (
// //           <span className="text-[10px] text-red-400/80 font-medium tracking-wide">
// //             Blocked
// //           </span>
// //         )}
// //       </div>
// //       <div ref={chatOptionsRef} className="relative flex-shrink-0">
// //         <button
// //           onClick={handleToggleChatOptions}
// //           className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
// //         >
// //           <svg
// //             width="16"
// //             height="16"
// //             viewBox="0 0 24 24"
// //             fill="none"
// //             stroke="currentColor"
// //             strokeWidth="2"
// //             strokeLinecap="round"
// //           >
// //             <circle cx="12" cy="5" r="1" />
// //             <circle cx="12" cy="12" r="1" />
// //             <circle cx="12" cy="19" r="1" />
// //           </svg>
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // MessageList
// // // ─────────────────────────────────────────────────────────────────────────────

// // function MessageList({ messagesContainerRef, fetchingMessages, hasMore, messages, conversationId, loadOlderMessages, loadingMore, myUserId, otherUser, user, chatTheme }) {
// //   if (fetchingMessages) {
// //     return <div className="flex-1 overflow-hidden"><MessageSkeleton /></div>;
// //   }
// //   return (
// //     <div
// //       ref={messagesContainerRef}
// //       className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
// //       style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch", background: chatTheme.bg, transition: "background 0.3s ease" }}
// //     >
// //       {hasMore && messages[conversationId]?.length > 0 && (
// //         <div className="flex justify-center mb-2">
// //           <button onClick={loadOlderMessages} disabled={loadingMore}
// //             className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide disabled:opacity-50">
// //             {loadingMore ? "Loading…" : "Load older messages"}
// //           </button>
// //         </div>
// //       )}
// //       {(!messages[conversationId] || messages[conversationId].length === 0) && (
// //         <div className="text-center text-white/60 text-sm">Start a conversation with {otherUser.username}</div>
// //       )}
// //       {(messages[conversationId] || []).map((msg) => (
// //         <MessageBubble key={msg.messageId} msg={msg} isMe={msg.from === myUserId} otherUser={otherUser} user={user} />
// //       ))}
// //       <div className="h-2" />
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // BlockedBanner
// // // ─────────────────────────────────────────────────────────────────────────────

// // function BlockedBanner({ otherUser }) {
// //   return (
// //     <div className="flex-shrink-0 px-4 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center gap-3">
// //       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //         <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
// //       </svg>
// //       <p className="text-sm text-white/40 text-center">
// //         You have blocked <span className="text-white/60 font-medium">{otherUser.username}</span>. They can no longer message you.
// //       </p>
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // EmojiPicker
// // // ─────────────────────────────────────────────────────────────────────────────

// // function EmojiPicker({ emojiPickerRef, insertEmoji }) {
// //   return (
// //     <div
// //       ref={emojiPickerRef}
// //       className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
// //       style={{ maxHeight: IS_ANDROID ? 220 : 280, overflowY: "auto", overscrollBehavior: "contain" }}
// //     >
// //       <div className="grid grid-cols-10 gap-1">
// //         {EMOJI_LIST.map((emoji) => (
// //           <button key={emoji} onClick={() => insertEmoji(emoji)}
// //             className="w-8 h-8 flex items-center justify-center text-[18px] rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100">
// //             {emoji}
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // InputBarIOS
// // //
// // // safe-area: env(safe-area-inset-bottom) self-corrects to 0 when keyboard
// // // is open on iOS (home bar slides away). Apply unconditionally — no JS needed.
// // // fontSize 16px is mandatory — below this iOS Safari auto-zooms on focus.
// // // ─────────────────────────────────────────────────────────────────────────────

// // function InputBarIOS({ text, setText, textareaRef, emojiPickerRef, showEmojiPicker, setShowEmojiPicker, insertEmoji, handleSend }) {
// //   return (
// //     <div
// //       className="flex-shrink-0 border-t border-white/10 bg-white/5 backdrop-blur-sm relative"
// //       style={{
// //         paddingTop: 10,
// //         paddingLeft: 12,
// //         paddingRight: 12,
// //         paddingBottom: "max(10px, env(safe-area-inset-bottom, 0px))",
// //       }}
// //     >
// //       {showEmojiPicker && <EmojiPicker emojiPickerRef={emojiPickerRef} insertEmoji={insertEmoji} />}
// //       <div className="flex items-end gap-2">
// //         <button
// //           onClick={() => setShowEmojiPicker((prev) => !prev)}
// //           className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
// //             showEmojiPicker ? "bg-indigo-600 border-indigo-500 text-white" : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
// //           }`}
// //         >
// //           <Smile size={17} />
// //         </button>
// //         <textarea
// //           ref={textareaRef}
// //           rows={1}
// //           value={text}
// //           onChange={(e) => {
// //             setText(e.target.value);
// //             e.target.style.height = "auto";
// //             e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
// //           }}
// //           onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
// //           placeholder="Type a message…"
// //           className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
// //           style={{ maxHeight: "112px", fontSize: "16px" }}
// //           {...TEXTAREA_PROPS}
// //         />
// //         <button onClick={handleSend} disabled={!text.trim()}
// //           className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed">
// //           <Send size={16} className="text-white ml-0.5" />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // InputBarAndroid
// // //
// // // GAP FIX: paddingBottom = 0 when keyboard is open.
// // // resizes-content already positions the bottom of the layout viewport flush
// // // against the top of the keyboard. Any additional padding here creates the
// // // gap the user was seeing. When keyboard is closed we restore safe-area.
// // //
// // // NO backdropFilter — it creates a GPU compositing layer whose boundary
// // // with the keyboard renders as a white strip on Android Chrome.
// // // ─────────────────────────────────────────────────────────────────────────────

// // function InputBarAndroid({ text, setText, textareaRef, emojiPickerRef, showEmojiPicker, setShowEmojiPicker, insertEmoji, handleSend, keyboardOpen }) {
// //   return (
// //     <div
// //       className="flex-shrink-0 border-t border-white/10 relative"
// //       style={{
// //         paddingTop: 10,
// //         paddingLeft: 12,
// //         paddingRight: 12,
// //         // Zero when keyboard open — resizes-content already handles positioning.
// //         // Restores nav bar inset when keyboard is closed.
// //         paddingBottom: keyboardOpen ? 0 : "env(safe-area-inset-bottom, 0px)",
// //         backgroundColor: "rgba(15, 15, 20, 0.98)",
// //         // No backdropFilter — causes white strip at keyboard boundary
// //       }}
// //     >
// //       {showEmojiPicker && <EmojiPicker emojiPickerRef={emojiPickerRef} insertEmoji={insertEmoji} />}
// //       <div className="flex items-end gap-2 py-2">
// //         <button
// //           onClick={() => setShowEmojiPicker((prev) => !prev)}
// //           className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
// //             showEmojiPicker ? "bg-indigo-600 border-indigo-500 text-white" : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
// //           }`}
// //         >
// //           <Smile size={17} />
// //         </button>
// //         <textarea
// //           ref={textareaRef}
// //           rows={1}
// //           value={text}
// //           onChange={(e) => {
// //             setText(e.target.value);
// //             e.target.style.height = "auto";
// //             e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
// //           }}
// //           onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
// //           placeholder="Type a message…"
// //           className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
// //           style={{ maxHeight: "112px", fontSize: "16px" }}
// //           inputMode="text"
// //           {...TEXTAREA_PROPS}
// //         />
// //         <button onClick={handleSend} disabled={!text.trim()}
// //           className="flex-shrink-0 w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed">
// //           <Send size={16} className="text-white ml-0.5" />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // iOS CHATBOX VARIANT
// // //
// // // KEY FIX — containerHeight race condition:
// // //   Previously: initialise from vv.height, update on "resize".
// // //   Problem: the first resize fires mid-animation with a partial height,
// // //   the layout snaps to the wrong size and keyboard covers content.
// // //
// // //   Fix: debounce the height update by 100ms so we only apply the final
// // //   settled height after the keyboard animation completes. Also listen to
// // //   visualViewport "scroll" (fires when iOS scrolls the page for the keyboard)
// // //   so we catch all keyboard-open scenarios.
// // // ─────────────────────────────────────────────────────────────────────────────

// // function ChatBoxIOS({ chat, onBack, onNewMessage, onClearMessages }) {
// //   useViewportMeta();

// //   const conv = useConversation({ chat, onNewMessage, onClearMessages });
// //   const {
// //     user, navigate, myUserId, otherUser, conversationId, receiverId,
// //     messages, setMessages, text, setText, loadingMore, fetchingMessages,
// //     showEmojiPicker, setShowEmojiPicker, showChatOptions, setShowChatOptions,
// //     popupPos, chatTheme, setChatTheme, isBlocked, setIsBlocked, hasMore,
// //     messagesContainerRef, textareaRef, emojiPickerRef, chatOptionsRef,
// //     handleSend, handleToggleChatOptions, insertEmoji, loadOlderMessages,
// //   } = conv;

// //   const [containerHeight, setContainerHeight] = useState(
// //     () => window.visualViewport?.height ?? window.innerHeight
// //   );
// //   const timerRef = useRef(null);

// //   useEffect(() => {
// //     const vv = window.visualViewport;
// //     if (!vv) return;

// //     const update = () => {
// //       // 100ms debounce: skip intermediate animation frames, apply final height only
// //       clearTimeout(timerRef.current);
// //       timerRef.current = setTimeout(() => {
// //         setContainerHeight(vv.height);
// //         requestAnimationFrame(() => {
// //           const el = messagesContainerRef.current;
// //           if (el) el.scrollTop = el.scrollHeight;
// //         });
// //       }, 100);
// //     };

// //     vv.addEventListener("resize", update);
// //     vv.addEventListener("scroll", update); // catches keyboard-triggered page scroll
// //     return () => {
// //       vv.removeEventListener("resize", update);
// //       vv.removeEventListener("scroll", update);
// //       clearTimeout(timerRef.current);
// //     };
// //   }, [messagesContainerRef]);

// //   if (!otherUser) return null;

// //   return (
// //     <div
// //       className="flex flex-col w-full overflow-hidden"
// //       style={{ height: containerHeight, maxHeight: containerHeight }}
// //     >
// //       <ChatHeader
// //         otherUser={otherUser} isBlocked={isBlocked} navigate={navigate}
// //         chatOptionsRef={chatOptionsRef} handleToggleChatOptions={handleToggleChatOptions}
// //         onBack={onBack}
// //       />
// //       <MessageList
// //         messagesContainerRef={messagesContainerRef} fetchingMessages={fetchingMessages}
// //         hasMore={hasMore} messages={messages} conversationId={conversationId}
// //         loadOlderMessages={loadOlderMessages} loadingMore={loadingMore}
// //         myUserId={myUserId} otherUser={otherUser} user={user} chatTheme={chatTheme}
// //       />
// //       {isBlocked
// //         ? <BlockedBanner otherUser={otherUser} />
// //         : <InputBarIOS
// //             text={text} setText={setText} textareaRef={textareaRef}
// //             emojiPickerRef={emojiPickerRef} showEmojiPicker={showEmojiPicker}
// //             setShowEmojiPicker={setShowEmojiPicker} insertEmoji={insertEmoji}
// //             handleSend={handleSend}
// //           />
// //       }
// //       {showChatOptions && createPortal(
// //         <div style={{ position: "fixed", top: popupPos.top, right: popupPos.right, zIndex: 99999 }}>
// //           <ChatOptionsPopup
// //             onClose={() => setShowChatOptions(false)}
// //             onClearChat={() => { setMessages((prev) => ({ ...prev, [conversationId]: [] })); onClearMessages?.(conversationId); }}
// //             onBlock={() => setIsBlocked(true)}
// //             onThemeChange={(theme) => setChatTheme(theme)}
// //             currentTheme={chatTheme}
// //             anchorRef={chatOptionsRef}
// //             conversationId={conversationId}
// //             otherUserId={receiverId}
// //             isBlocked={isBlocked}
// //             onUnblock={() => setIsBlocked(false)}
// //           />
// //         </div>,
// //         document.body,
// //       )}
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // ANDROID CHATBOX VARIANT
// // //
// // // KEY FIX — reliable keyboard detection:
// // //   Use visualViewport.height (not document.documentElement.clientHeight).
// // //   clientHeight can be stale on some Android WebViews at mount time.
// // //   visualViewport.height is always accurate and updates reliably.
// // //
// // //   baseHeight is captured 50ms after mount (async) because some Android
// // //   browsers report a wrong clientHeight synchronously before first paint.
// // // ─────────────────────────────────────────────────────────────────────────────

// // function ChatBoxAndroid({ chat, onBack, onNewMessage, onClearMessages }) {
// //   useViewportMeta();

// //   const conv = useConversation({ chat, onNewMessage, onClearMessages });
// //   const {
// //     user, navigate, myUserId, otherUser, conversationId, receiverId,
// //     messages, setMessages, text, setText, loadingMore, fetchingMessages,
// //     showEmojiPicker, setShowEmojiPicker, showChatOptions, setShowChatOptions,
// //     popupPos, chatTheme, setChatTheme, isBlocked, setIsBlocked, hasMore,
// //     messagesContainerRef, textareaRef, emojiPickerRef, chatOptionsRef,
// //     handleSend, handleToggleChatOptions, insertEmoji, loadOlderMessages,
// //   } = conv;

// //   const [keyboardOpen, setKeyboardOpen] = useState(false);
// //   const baseHeightRef = useRef(0);
// //   const scrollTimerRef = useRef(null);

// //   useEffect(() => {
// //     const vv = window.visualViewport;
// //     if (!vv) return;

// //     // Capture true base height after first paint (async to avoid stale value)
// //     const initTimer = setTimeout(() => {
// //       baseHeightRef.current = vv.height;
// //     }, 50);

// //     const onResize = () => {
// //       if (!baseHeightRef.current) return;
// //       const isOpen = baseHeightRef.current - vv.height > 120;
// //       setKeyboardOpen(isOpen);

// //       if (isOpen) {
// //         // Debounce — Android fires resize 30-60x during keyboard animation
// //         clearTimeout(scrollTimerRef.current);
// //         scrollTimerRef.current = setTimeout(() => {
// //           requestAnimationFrame(() => {
// //             const el = messagesContainerRef.current;
// //             if (el) el.scrollTop = el.scrollHeight;
// //           });
// //         }, 150);
// //       }
// //     };

// //     vv.addEventListener("resize", onResize, { passive: true });
// //     return () => {
// //       vv.removeEventListener("resize", onResize);
// //       clearTimeout(initTimer);
// //       clearTimeout(scrollTimerRef.current);
// //     };
// //   }, [messagesContainerRef]);

// //   if (!otherUser) return null;

// //   return (
// //     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
// //       <ChatHeader
// //         otherUser={otherUser} isBlocked={isBlocked} navigate={navigate}
// //         chatOptionsRef={chatOptionsRef} handleToggleChatOptions={handleToggleChatOptions}
// //         onBack={onBack}
// //       />
// //       <MessageList
// //         messagesContainerRef={messagesContainerRef} fetchingMessages={fetchingMessages}
// //         hasMore={hasMore} messages={messages} conversationId={conversationId}
// //         loadOlderMessages={loadOlderMessages} loadingMore={loadingMore}
// //         myUserId={myUserId} otherUser={otherUser} user={user} chatTheme={chatTheme}
// //       />
// //       {isBlocked
// //         ? <BlockedBanner otherUser={otherUser} />
// //         : <InputBarAndroid
// //             text={text} setText={setText} textareaRef={textareaRef}
// //             emojiPickerRef={emojiPickerRef} showEmojiPicker={showEmojiPicker}
// //             setShowEmojiPicker={setShowEmojiPicker} insertEmoji={insertEmoji}
// //             handleSend={handleSend} keyboardOpen={keyboardOpen}
// //           />
// //       }
// //       {showChatOptions && createPortal(
// //         <div style={{ position: "fixed", top: popupPos.top, right: popupPos.right, zIndex: 99999 }}>
// //           <ChatOptionsPopup
// //             onClose={() => setShowChatOptions(false)}
// //             onClearChat={() => { setMessages((prev) => ({ ...prev, [conversationId]: [] })); onClearMessages?.(conversationId); }}
// //             onBlock={() => setIsBlocked(true)}
// //             onThemeChange={(theme) => setChatTheme(theme)}
// //             currentTheme={chatTheme}
// //             anchorRef={chatOptionsRef}
// //             conversationId={conversationId}
// //             otherUserId={receiverId}
// //             isBlocked={isBlocked}
// //             onUnblock={() => setIsBlocked(false)}
// //           />
// //         </div>,
// //         document.body,
// //       )}
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // Public export
// // // ─────────────────────────────────────────────────────────────────────────────

// // function ChatBox(props) {
// //   const Variant = useMemo(() => (IS_ANDROID ? ChatBoxAndroid : ChatBoxIOS), []);
// //   return <Variant {...props} />;
// // }

// // export default ChatBox;

// import { ArrowLeft, Send, Smile } from "lucide-react";
// import {
//   useContext,
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
//   useMemo,
// } from "react";
// import { createPortal } from "react-dom";
// import { v4 as uuidv4 } from "uuid";
// import { websocketContext } from "../../context/WebSocket";
// import { useAuth } from "../../hooks/useAuth";
// import fetchData from "../../utils/fetchData";
// import MessageBubble from "../MessageBubble";
// import ChatOptionsPopup from "../ChatOptionsPopup";
// import { useNavigate } from "react-router-dom";

// const UA = typeof navigator !== "undefined" ? navigator.userAgent : "";
// const IS_ANDROID = /Android/i.test(UA);

// function useViewportMeta() {
//   useEffect(() => {
//     let meta = document.querySelector('meta[name="viewport"]');
//     const prev = meta?.getAttribute("content") ?? "";
//     if (!meta) {
//       meta = document.createElement("meta");
//       meta.name = "viewport";
//       document.head.appendChild(meta);
//     }
//     const value = IS_ANDROID
//       ? "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content"
//       : "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-visual";
//     meta.setAttribute("content", value);
//     return () => meta.setAttribute("content", prev);
//   }, []);
// }

// const EMOJI_LIST = [
//   "😀",
//   "😂",
//   "😍",
//   "🥰",
//   "😎",
//   "🤔",
//   "😭",
//   "😡",
//   "🥺",
//   "😴",
//   "👍",
//   "👎",
//   "❤️",
//   "🔥",
//   "✨",
//   "🎉",
//   "🙏",
//   "💯",
//   "😊",
//   "🤣",
//   "😘",
//   "🥳",
//   "😤",
//   "🤯",
//   "😇",
//   "🤗",
//   "😏",
//   "🙄",
//   "😬",
//   "🤝",
//   "👀",
//   "💀",
//   "🫡",
//   "🫠",
//   "🥹",
//   "😮",
//   "😱",
//   "🤌",
//   "💪",
//   "👏",
//   "🍕",
//   "🎮",
//   "🎵",
//   "⚡",
//   "🌙",
//   "☀️",
//   "🌈",
//   "💫",
//   "🚀",
//   "🎯",
// ];

// const TEXTAREA_PROPS = {
//   autoComplete: "off",
//   autoCorrect: "off",
//   autoCapitalize: "sentences",
//   spellCheck: false,
//   "data-form-type": "other",
//   enterKeyHint: "send",
// };

// function MessageStatus({ status }) {
//   if (status === "blocked") {
//     return (
//       <span style={{ fontSize: 10, color: "#f87171" }}>Not delivered</span>
//     );
//   }
//   if (status === "sending" || status === "sent") {
//     return (
//       <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//         <path
//           d="M1 5l3 3 5-6"
//           stroke="rgba(255,255,255,0.35)"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   }
//   if (status === "read") {
//     return (
//       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
//         <path
//           d="M1 5l3 3 5-6"
//           stroke="#60a5fa"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M6 5l3 3 5-6"
//           stroke="#60a5fa"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   }
//   if (status === "delivered") {
//     return (
//       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
//         <path
//           d="M1 5l3 3 5-6"
//           stroke="rgba(255,255,255,0.35)"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M6 5l3 3 5-6"
//           stroke="rgba(255,255,255,0.35)"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   }
//   return (
//     <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//       <path
//         d="M1 5l3 3 5-6"
//         stroke="rgba(255,255,255,0.35)"
//         strokeWidth="1.6"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// function MessageSkeleton() {
//   return (
//     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//     </div>
//   );
// }

// function useConversation({ chat, onNewMessage, onClearMessages }) {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const myUserId = user._id;
//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);
//   const conversationId = chat._id.toString();
//   const receiverId = otherUser?._id;

//   const {
//     sendSignal,
//     messages,
//     setMessages,
//     markAsRead,
//     setCurrentConversation,
//   } = useContext(websocketContext);

//   const [text, setText] = useState("");
//   const [cursor, setCursor] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [fetchingMessages, setFetchingMessages] = useState(true);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showChatOptions, setShowChatOptions] = useState(false);
//   const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
//   const [chatTheme, setChatTheme] = useState({
//     id: "default",
//     label: "Default",
//     bg: "#0a0a0a",
//   });
//   const [isBlocked, setIsBlocked] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const messagesContainerRef = useRef(null);
//   const shouldAutoScrollRef = useRef(true);
//   const textareaRef = useRef(null);
//   const emojiPickerRef = useRef(null);
//   const chatOptionsRef = useRef(null);
//   const readMarkedRef = useRef(false);

//   useEffect(() => {
//     if (!receiverId) return;
//     let cancelled = false;
//     fetchData(`/api/users/${receiverId}/block-status`, {
//       credentials: "include",
//     })
//       .then((r) => r.json())
//       .then((data) => {
//         if (!cancelled) setIsBlocked(data.isBlocked);
//       })
//       .catch((err) => console.error("Failed to fetch block status", err));
//     return () => {
//       cancelled = true;
//     };
//   }, [receiverId]);

//   useEffect(() => {
//     setCurrentConversation(conversationId);
//     return () => setCurrentConversation(null);
//   }, [conversationId, setCurrentConversation]);

//   useEffect(() => {
//     setHasMore(true);
//     setCursor(null);
//     setFetchingMessages(true);
//     setShowEmojiPicker(false);
//     setShowChatOptions(false);
//     setIsBlocked(false);
//     readMarkedRef.current = false;
//     shouldAutoScrollRef.current = true;
//   }, [conversationId]);

//   const doMarkRead = useCallback(() => {
//     const convMessages = messages[conversationId] || [];
//     const hasUnread = convMessages.some(
//       (m) => m.from !== myUserId && m.status !== "read",
//     );
//     if (!hasUnread) return;
//     setMessages((prev) => ({
//       ...prev,
//       [conversationId]: (prev[conversationId] || []).map((m) =>
//         m.from !== myUserId && m.status !== "read"
//           ? { ...m, status: "read" }
//           : m,
//       ),
//     }));
//     markAsRead(conversationId);
//     if (!readMarkedRef.current) {
//       readMarkedRef.current = true;
//       fetchData(`/api/chat/conversations/${conversationId}/read`, {
//         method: "PATCH",
//         credentials: "include",
//       }).catch(() => {});
//     }
//   }, [conversationId, messages, myUserId, markAsRead, setMessages]);

//   useEffect(() => {
//     doMarkRead();
//     readMarkedRef.current = false;
//   }, [conversationId, messages[conversationId]?.length]);

//   useEffect(() => {
//     const h = (e) => {
//       if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target))
//         setShowEmojiPicker(false);
//     };
//     document.addEventListener("mousedown", h);
//     return () => document.removeEventListener("mousedown", h);
//   }, []);

//   const handleToggleChatOptions = useCallback(() => {
//     if (!showChatOptions && chatOptionsRef.current) {
//       const rect = chatOptionsRef.current.getBoundingClientRect();
//       setPopupPos({
//         top: rect.bottom + 6,
//         right: window.innerWidth - rect.right,
//       });
//     }
//     setShowChatOptions((v) => !v);
//   }, [showChatOptions]);

//   const insertEmoji = useCallback(
//     (emoji) => {
//       const ta = textareaRef.current;
//       if (!ta) {
//         setText((prev) => prev + emoji);
//         return;
//       }
//       const start = ta.selectionStart;
//       const end = ta.selectionEnd;
//       const newText = text.slice(0, start) + emoji + text.slice(end);
//       setText(newText);
//       requestAnimationFrame(() => {
//         ta.focus();
//         ta.selectionStart = start + emoji.length;
//         ta.selectionEnd = start + emoji.length;
//         ta.style.height = "auto";
//         ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
//       });
//     },
//     [text],
//   );

//   const handleSend = useCallback(async () => {
//     if (!text.trim() || isBlocked) return;
//     const messageId = uuidv4();
//     const createdAt = Date.now();
//     const messageText = text;
//     setMessages((prev) => {
//       const existing = prev[conversationId] || [];
//       return {
//         ...prev,
//         [conversationId]: [
//           ...existing,
//           {
//             messageId,
//             conversationId,
//             from: myUserId,
//             to: receiverId,
//             text: messageText,
//             status: "sending",
//             createdAt,
//           },
//         ],
//       };
//     });
//     sendSignal({
//       type: "chat_message",
//       messageId,
//       conversationId,
//       to: receiverId,
//       text: messageText,
//       createdAt,
//     });
//     onNewMessage?.(conversationId, messageText);
//     setText("");
//     setShowEmojiPicker(false);
//     if (textareaRef.current) textareaRef.current.style.height = "auto";
//     shouldAutoScrollRef.current = true;
//   }, [
//     text,
//     isBlocked,
//     conversationId,
//     myUserId,
//     receiverId,
//     sendSignal,
//     setMessages,
//     onNewMessage,
//   ]);

//   const loadOlderMessages = useCallback(async () => {
//     if (!cursor || loadingMore) return;
//     setLoadingMore(true);
//     const el = messagesContainerRef.current;
//     const scrollHeightBefore = el ? el.scrollHeight : 0;
//     try {
//       const res = await fetchData(
//         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
//         { credentials: "include" },
//       );
//       const data = await res.json();
//       const arr = Array.isArray(data) ? data : data.messages || [];
//       if (arr.length < 50) setHasMore(false);
//       const formatted = arr.map((msg) => ({
//         messageId: msg.messageId,
//         conversationId,
//         from: msg.senderId,
//         to: msg.receiverId,
//         text: msg.text,
//         status: msg.status || "sent",
//         createdAt: new Date(msg.createdAt).getTime(),
//       }));
//       shouldAutoScrollRef.current = false;
//       setMessages((prev) => {
//         const existing = prev[conversationId] || [];
//         const ids = new Set(existing.map((m) => m.messageId));
//         return {
//           ...prev,
//           [conversationId]: [
//             ...formatted.filter((m) => !ids.has(m.messageId)),
//             ...existing,
//           ],
//         };
//       });
//       if (arr.length > 0) setCursor(arr[0].createdAt);
//       setTimeout(() => {
//         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
//       }, 50);
//     } catch (err) {
//       console.error("Failed loading older messages", err);
//     }
//     setLoadingMore(false);
//   }, [cursor, loadingMore, conversationId, setMessages]);

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     const h = () => {
//       shouldAutoScrollRef.current =
//         el.scrollHeight - el.scrollTop - el.clientHeight < 150;
//     };
//     el.addEventListener("scroll", h, { passive: true });
//     return () => el.removeEventListener("scroll", h);
//   }, []);

//   const scrollToBottom = useCallback((force = false) => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     if (!force && !shouldAutoScrollRef.current) return;
//     requestAnimationFrame(() => {
//       el.scrollTop = el.scrollHeight;
//     });
//   }, []);

//   useEffect(() => {
//     if (!conversationId) return;
//     let cancelled = false;
//     const fetch_ = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         const arr = Array.isArray(data) ? data : data.messages || [];
//         if (arr.length < 50) setHasMore(false);
//         const formatted = arr.map((msg) => ({
//           messageId: msg.messageId,
//           conversationId,
//           from: msg.senderId,
//           to: msg.receiverId,
//           text: msg.text,
//           status: msg.status || "sent",
//           createdAt: new Date(msg.createdAt).getTime(),
//         }));
//         if (arr.length > 0) setCursor(arr[0].createdAt);
//         if (!cancelled) {
//           setMessages((prev) => {
//             const existing = prev[conversationId] || [];
//             const ids = new Set(existing.map((m) => m.messageId));
//             return {
//               ...prev,
//               [conversationId]: [
//                 ...existing,
//                 ...formatted.filter((m) => !ids.has(m.messageId)),
//               ],
//             };
//           });
//           requestAnimationFrame(() => {
//             const el = messagesContainerRef.current;
//             if (el) el.scrollTop = el.scrollHeight;
//           });
//         }
//       } catch (err) {
//         console.error("Failed to fetch messages", err);
//       } finally {
//         if (!cancelled) setFetchingMessages(false);
//       }
//     };
//     fetch_();
//     return () => {
//       cancelled = true;
//     };
//   }, [conversationId]);

//   const convMessageCount = messages[conversationId]?.length ?? 0;
//   useEffect(() => {
//     scrollToBottom(false);
//   }, [convMessageCount]);

//   return {
//     user,
//     navigate,
//     myUserId,
//     otherUser,
//     conversationId,
//     receiverId,
//     messages,
//     setMessages,
//     text,
//     setText,
//     loadingMore,
//     fetchingMessages,
//     showEmojiPicker,
//     setShowEmojiPicker,
//     showChatOptions,
//     setShowChatOptions,
//     popupPos,
//     chatTheme,
//     setChatTheme,
//     isBlocked,
//     setIsBlocked,
//     hasMore,
//     messagesContainerRef,
//     textareaRef,
//     emojiPickerRef,
//     chatOptionsRef,
//     handleSend,
//     handleToggleChatOptions,
//     insertEmoji,
//     loadOlderMessages,
//     scrollToBottom,
//   };
// }

// // ─── ChatHeader ───────────────────────────────────────────────────────────────

// function ChatHeader({
//   otherUser,
//   isBlocked,
//   navigate,
//   chatOptionsRef,
//   handleToggleChatOptions,
//   onBack,
// }) {
//   const { onlineUsers } = useContext(websocketContext);
//   const isOnline = onlineUsers?.has(otherUser?._id?.toString());

//   return (
//     <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
//       <button
//         onClick={onBack}
//         className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
//       >
//         <ArrowLeft size={18} />
//       </button>

//       {/* Avatar with gradient border ring */}
//       <div
//         onClick={() => navigate(`/profile/${otherUser.username}`)}
//         className="relative flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity duration-150"
//         style={{ width: 42, height: 42 }}
//       >
//         {/* Gradient ring */}
//         {isOnline && (
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               borderRadius: "50%",
//               padding: 2.5,
//               background: "linear-gradient(135deg, #22c55e, #16a34a)",
//               WebkitMask:
//                 "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
//               WebkitMaskComposite: "xor",
//               maskComposite: "exclude",
//             }}
//           />
//         )}
//         {/* Avatar */}
//         <div
//           className="absolute rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center"
//           style={{ inset: 2.5 }}
//         >
//           {otherUser.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-sm font-semibold text-white">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </span>
//           )}
//         </div>

//         {/* Online dot */}
//         <span
//           className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${
//             isOnline ? "bg-green-400" : "bg-neutral-400"
//           }`}
//         />
//       </div>

//       <div className="flex flex-col flex-1 min-w-0">
//         <h3
//           onClick={() => navigate(`/profile/${otherUser.username}`)}
//           className="font-semibold text-sm text-white truncate cursor-pointer hover:text-white/70 transition-colors duration-150"
//         >
//           {otherUser.username}
//         </h3>
//         {isBlocked ? (
//           <span className="text-[10px] text-red-400/80 font-medium tracking-wide">
//             Blocked
//           </span>
//         ) : (
//           ""
//         )}
//       </div>

//       <div ref={chatOptionsRef} className="relative flex-shrink-0">
//         <button
//           onClick={handleToggleChatOptions}
//           className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
//         >
//           <svg
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//           >
//             <circle cx="12" cy="5" r="1" />
//             <circle cx="12" cy="12" r="1" />
//             <circle cx="12" cy="19" r="1" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── MessageList ──────────────────────────────────────────────────────────────

// function MessageList({
//   messagesContainerRef,
//   fetchingMessages,
//   hasMore,
//   messages,
//   conversationId,
//   loadOlderMessages,
//   loadingMore,
//   myUserId,
//   otherUser,
//   user,
//   chatTheme,
// }) {
//   if (fetchingMessages) {
//     return (
//       <div className="flex-1 overflow-hidden">
//         <MessageSkeleton />
//       </div>
//     );
//   }
//   return (
//     <div
//       ref={messagesContainerRef}
//       className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
//       style={{
//         overscrollBehavior: "contain",
//         WebkitOverflowScrolling: "touch",
//         background: chatTheme.bg,
//         transition: "background 0.3s ease",
//       }}
//     >
//       {hasMore && messages[conversationId]?.length > 0 && (
//         <div className="flex justify-center mb-2">
//           <button
//             onClick={loadOlderMessages}
//             disabled={loadingMore}
//             className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide disabled:opacity-50"
//           >
//             {loadingMore ? "Loading…" : "Load older messages"}
//           </button>
//         </div>
//       )}
//       {(!messages[conversationId] || messages[conversationId].length === 0) && (
//         <div className="text-center text-white/60 text-sm">
//           Start a conversation with {otherUser.username}
//         </div>
//       )}
//       {(messages[conversationId] || []).map((msg) => (
//         <MessageBubble
//           key={msg.messageId}
//           msg={msg}
//           isMe={msg.from === myUserId}
//           otherUser={otherUser}
//           user={user}
//         />
//       ))}
//       <div className="h-2" />
//     </div>
//   );
// }

// // ─── BlockedBanner ────────────────────────────────────────────────────────────

// function BlockedBanner({ otherUser }) {
//   return (
//     <div className="flex-shrink-0 px-4 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center gap-3">
//       <svg
//         width="16"
//         height="16"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="#f87171"
//         strokeWidth="1.8"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <circle cx="12" cy="12" r="10" />
//         <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//       </svg>
//       <p className="text-sm text-white/40 text-center">
//         You have blocked{" "}
//         <span className="text-white/60 font-medium">{otherUser.username}</span>.
//         They can no longer message you.
//       </p>
//     </div>
//   );
// }

// // ─── EmojiPicker ─────────────────────────────────────────────────────────────

// function EmojiPicker({ emojiPickerRef, insertEmoji }) {
//   return (
//     <div
//       ref={emojiPickerRef}
//       className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
//       style={{
//         maxHeight: IS_ANDROID ? 220 : 280,
//         overflowY: "auto",
//         overscrollBehavior: "contain",
//       }}
//     >
//       <div className="grid grid-cols-10 gap-1">
//         {EMOJI_LIST.map((emoji) => (
//           <button
//             key={emoji}
//             onClick={() => insertEmoji(emoji)}
//             className="w-8 h-8 flex items-center justify-center text-[18px] rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100"
//           >
//             {emoji}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── InputBarIOS ──────────────────────────────────────────────────────────────

// function InputBarIOS({
//   text,
//   setText,
//   textareaRef,
//   emojiPickerRef,
//   showEmojiPicker,
//   setShowEmojiPicker,
//   insertEmoji,
//   handleSend,
// }) {
//   return (
//     <div
//       className="flex-shrink-0 border-t border-white/10 bg-white/5 backdrop-blur-sm relative"
//       style={{
//         paddingTop: 10,
//         paddingLeft: 12,
//         paddingRight: 12,
//         paddingBottom: "max(10px, env(safe-area-inset-bottom, 0px))",
//       }}
//     >
//       {showEmojiPicker && (
//         <EmojiPicker
//           emojiPickerRef={emojiPickerRef}
//           insertEmoji={insertEmoji}
//         />
//       )}
//       <div className="flex items-end gap-2">
//         <button
//           onClick={() => setShowEmojiPicker((prev) => !prev)}
//           className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
//             showEmojiPicker
//               ? "bg-indigo-600 border-indigo-500 text-white"
//               : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
//           }`}
//         >
//           <Smile size={17} />
//         </button>
//         <textarea
//           ref={textareaRef}
//           rows={1}
//           value={text}
//           onChange={(e) => {
//             setText(e.target.value);
//             e.target.style.height = "auto";
//             e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
//           }}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               handleSend();
//             }
//           }}
//           placeholder="Type a message…"
//           className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
//           style={{ maxHeight: "112px", fontSize: "16px" }}
//           {...TEXTAREA_PROPS}
//         />
//         <button
//           onClick={handleSend}
//           disabled={!text.trim()}
//           className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
//         >
//           <Send size={16} className="text-white ml-0.5" />
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── InputBarAndroid ──────────────────────────────────────────────────────────

// function InputBarAndroid({
//   text,
//   setText,
//   textareaRef,
//   emojiPickerRef,
//   showEmojiPicker,
//   setShowEmojiPicker,
//   insertEmoji,
//   handleSend,
//   keyboardOpen,
// }) {
//   return (
//     <div
//       className="flex-shrink-0 border-t border-white/10 relative"
//       style={{
//         paddingTop: 10,
//         paddingLeft: 12,
//         paddingRight: 12,
//         paddingBottom: keyboardOpen ? 0 : "env(safe-area-inset-bottom, 0px)",
//         backgroundColor: "rgba(15, 15, 20, 0.98)",
//       }}
//     >
//       {showEmojiPicker && (
//         <EmojiPicker
//           emojiPickerRef={emojiPickerRef}
//           insertEmoji={insertEmoji}
//         />
//       )}
//       <div className="flex items-end gap-2 py-2">
//         <button
//           onClick={() => setShowEmojiPicker((prev) => !prev)}
//           className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
//             showEmojiPicker
//               ? "bg-indigo-600 border-indigo-500 text-white"
//               : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
//           }`}
//         >
//           <Smile size={17} />
//         </button>
//         <textarea
//           ref={textareaRef}
//           rows={1}
//           value={text}
//           onChange={(e) => {
//             setText(e.target.value);
//             e.target.style.height = "auto";
//             e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
//           }}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               handleSend();
//             }
//           }}
//           placeholder="Type a message…"
//           className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
//           style={{ maxHeight: "112px", fontSize: "16px" }}
//           inputMode="text"
//           {...TEXTAREA_PROPS}
//         />
//         <button
//           onClick={handleSend}
//           disabled={!text.trim()}
//           className="flex-shrink-0 w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
//         >
//           <Send size={16} className="text-white ml-0.5" />
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── ChatBoxIOS ───────────────────────────────────────────────────────────────

// function ChatBoxIOS({ chat, onBack, onNewMessage, onClearMessages }) {
//   useViewportMeta();
//   const conv = useConversation({ chat, onNewMessage, onClearMessages });
//   const {
//     user,
//     navigate,
//     myUserId,
//     otherUser,
//     conversationId,
//     receiverId,
//     messages,
//     setMessages,
//     text,
//     setText,
//     loadingMore,
//     fetchingMessages,
//     showEmojiPicker,
//     setShowEmojiPicker,
//     showChatOptions,
//     setShowChatOptions,
//     popupPos,
//     chatTheme,
//     setChatTheme,
//     isBlocked,
//     setIsBlocked,
//     hasMore,
//     messagesContainerRef,
//     textareaRef,
//     emojiPickerRef,
//     chatOptionsRef,
//     handleSend,
//     handleToggleChatOptions,
//     insertEmoji,
//     loadOlderMessages,
//   } = conv;

//   const [containerHeight, setContainerHeight] = useState(
//     () => window.visualViewport?.height ?? window.innerHeight,
//   );
//   const timerRef = useRef(null);

//   useEffect(() => {
//     const vv = window.visualViewport;
//     if (!vv) return;
//     const update = () => {
//       clearTimeout(timerRef.current);
//       timerRef.current = setTimeout(() => {
//         setContainerHeight(vv.height);
//         requestAnimationFrame(() => {
//           const el = messagesContainerRef.current;
//           if (el) el.scrollTop = el.scrollHeight;
//         });
//       }, 100);
//     };
//     vv.addEventListener("resize", update);
//     vv.addEventListener("scroll", update);
//     return () => {
//       vv.removeEventListener("resize", update);
//       vv.removeEventListener("scroll", update);
//       clearTimeout(timerRef.current);
//     };
//   }, [messagesContainerRef]);

//   if (!otherUser) return null;

//   return (
//     <div
//       className="flex flex-col w-full overflow-hidden"
//       style={{ height: containerHeight, maxHeight: containerHeight }}
//     >
//       <ChatHeader
//         otherUser={otherUser}
//         isBlocked={isBlocked}
//         navigate={navigate}
//         chatOptionsRef={chatOptionsRef}
//         handleToggleChatOptions={handleToggleChatOptions}
//         onBack={onBack}
//       />
//       <MessageList
//         messagesContainerRef={messagesContainerRef}
//         fetchingMessages={fetchingMessages}
//         hasMore={hasMore}
//         messages={messages}
//         conversationId={conversationId}
//         loadOlderMessages={loadOlderMessages}
//         loadingMore={loadingMore}
//         myUserId={myUserId}
//         otherUser={otherUser}
//         user={user}
//         chatTheme={chatTheme}
//       />
//       {isBlocked ? (
//         <BlockedBanner otherUser={otherUser} />
//       ) : (
//         <InputBarIOS
//           text={text}
//           setText={setText}
//           textareaRef={textareaRef}
//           emojiPickerRef={emojiPickerRef}
//           showEmojiPicker={showEmojiPicker}
//           setShowEmojiPicker={setShowEmojiPicker}
//           insertEmoji={insertEmoji}
//           handleSend={handleSend}
//         />
//       )}
//       {showChatOptions &&
//         createPortal(
//           <div
//             style={{
//               position: "fixed",
//               top: popupPos.top,
//               right: popupPos.right,
//               zIndex: 99999,
//             }}
//           >
//             <ChatOptionsPopup
//               onClose={() => setShowChatOptions(false)}
//               onClearChat={() => {
//                 setMessages((prev) => ({ ...prev, [conversationId]: [] }));
//                 onClearMessages?.(conversationId);
//               }}
//               onBlock={() => setIsBlocked(true)}
//               onThemeChange={(theme) => setChatTheme(theme)}
//               currentTheme={chatTheme}
//               anchorRef={chatOptionsRef}
//               conversationId={conversationId}
//               otherUserId={receiverId}
//               isBlocked={isBlocked}
//               onUnblock={() => setIsBlocked(false)}
//             />
//           </div>,
//           document.body,
//         )}
//     </div>
//   );
// }

// // ─── ChatBoxAndroid ───────────────────────────────────────────────────────────

// function ChatBoxAndroid({ chat, onBack, onNewMessage, onClearMessages }) {
//   useViewportMeta();
//   const conv = useConversation({ chat, onNewMessage, onClearMessages });
//   const {
//     user,
//     navigate,
//     myUserId,
//     otherUser,
//     conversationId,
//     receiverId,
//     messages,
//     setMessages,
//     text,
//     setText,
//     loadingMore,
//     fetchingMessages,
//     showEmojiPicker,
//     setShowEmojiPicker,
//     showChatOptions,
//     setShowChatOptions,
//     popupPos,
//     chatTheme,
//     setChatTheme,
//     isBlocked,
//     setIsBlocked,
//     hasMore,
//     messagesContainerRef,
//     textareaRef,
//     emojiPickerRef,
//     chatOptionsRef,
//     handleSend,
//     handleToggleChatOptions,
//     insertEmoji,
//     loadOlderMessages,
//   } = conv;

//   const [keyboardOpen, setKeyboardOpen] = useState(false);
//   const baseHeightRef = useRef(0);
//   const scrollTimerRef = useRef(null);

//   useEffect(() => {
//     const vv = window.visualViewport;
//     if (!vv) return;
//     const initTimer = setTimeout(() => {
//       baseHeightRef.current = vv.height;
//     }, 50);
//     const onResize = () => {
//       if (!baseHeightRef.current) return;
//       const isOpen = baseHeightRef.current - vv.height > 120;
//       setKeyboardOpen(isOpen);
//       if (isOpen) {
//         clearTimeout(scrollTimerRef.current);
//         scrollTimerRef.current = setTimeout(() => {
//           requestAnimationFrame(() => {
//             const el = messagesContainerRef.current;
//             if (el) el.scrollTop = el.scrollHeight;
//           });
//         }, 150);
//       }
//     };
//     vv.addEventListener("resize", onResize, { passive: true });
//     return () => {
//       vv.removeEventListener("resize", onResize);
//       clearTimeout(initTimer);
//       clearTimeout(scrollTimerRef.current);
//     };
//   }, [messagesContainerRef]);

//   if (!otherUser) return null;

//   return (
//     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
//       <ChatHeader
//         otherUser={otherUser}
//         isBlocked={isBlocked}
//         navigate={navigate}
//         chatOptionsRef={chatOptionsRef}
//         handleToggleChatOptions={handleToggleChatOptions}
//         onBack={onBack}
//       />
//       <MessageList
//         messagesContainerRef={messagesContainerRef}
//         fetchingMessages={fetchingMessages}
//         hasMore={hasMore}
//         messages={messages}
//         conversationId={conversationId}
//         loadOlderMessages={loadOlderMessages}
//         loadingMore={loadingMore}
//         myUserId={myUserId}
//         otherUser={otherUser}
//         user={user}
//         chatTheme={chatTheme}
//       />
//       {isBlocked ? (
//         <BlockedBanner otherUser={otherUser} />
//       ) : (
//         <InputBarAndroid
//           text={text}
//           setText={setText}
//           textareaRef={textareaRef}
//           emojiPickerRef={emojiPickerRef}
//           showEmojiPicker={showEmojiPicker}
//           setShowEmojiPicker={setShowEmojiPicker}
//           insertEmoji={insertEmoji}
//           handleSend={handleSend}
//           keyboardOpen={keyboardOpen}
//         />
//       )}
//       {showChatOptions &&
//         createPortal(
//           <div
//             style={{
//               position: "fixed",
//               top: popupPos.top,
//               right: popupPos.right,
//               zIndex: 99999,
//             }}
//           >
//             <ChatOptionsPopup
//               onClose={() => setShowChatOptions(false)}
//               onClearChat={() => {
//                 setMessages((prev) => ({ ...prev, [conversationId]: [] }));
//                 onClearMessages?.(conversationId);
//               }}
//               onBlock={() => setIsBlocked(true)}
//               onThemeChange={(theme) => setChatTheme(theme)}
//               currentTheme={chatTheme}
//               anchorRef={chatOptionsRef}
//               conversationId={conversationId}
//               otherUserId={receiverId}
//               isBlocked={isBlocked}
//               onUnblock={() => setIsBlocked(false)}
//             />
//           </div>,
//           document.body,
//         )}
//     </div>
//   );
// }

// function ChatBox(props) {
//   const Variant = useMemo(() => (IS_ANDROID ? ChatBoxAndroid : ChatBoxIOS), []);
//   return <Variant {...props} />;
// }

// export default ChatBox;

// import { ArrowLeft, Send, Smile } from "lucide-react";
// import {
//   useContext,
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
//   useMemo,
// } from "react";
// import { createPortal } from "react-dom";
// import { v4 as uuidv4 } from "uuid";
// import { websocketContext } from "../../context/WebSocket";
// import { useAuth } from "../../hooks/useAuth";
// import fetchData from "../../utils/fetchData";
// import MessageBubble from "../MessageBubble";
// import ChatOptionsPopup from "../ChatOptionsPopup";
// import { useNavigate } from "react-router-dom";

// const UA = typeof navigator !== "undefined" ? navigator.userAgent : "";
// const IS_ANDROID = /Android/i.test(UA);

// function useViewportMeta() {
//   useEffect(() => {
//     let meta = document.querySelector('meta[name="viewport"]');
//     const prev = meta?.getAttribute("content") ?? "";
//     if (!meta) {
//       meta = document.createElement("meta");
//       meta.name = "viewport";
//       document.head.appendChild(meta);
//     }
//     const value = IS_ANDROID
//       ? "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content"
//       : "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-visual";
//     meta.setAttribute("content", value);
//     return () => meta.setAttribute("content", prev);
//   }, []);
// }

// const EMOJI_LIST = [
//   "😀",
//   "😂",
//   "😍",
//   "🥰",
//   "😎",
//   "🤔",
//   "😭",
//   "😡",
//   "🥺",
//   "😴",
//   "👍",
//   "👎",
//   "❤️",
//   "🔥",
//   "✨",
//   "🎉",
//   "🙏",
//   "💯",
//   "😊",
//   "🤣",
//   "😘",
//   "🥳",
//   "😤",
//   "🤯",
//   "😇",
//   "🤗",
//   "😏",
//   "🙄",
//   "😬",
//   "🤝",
//   "👀",
//   "💀",
//   "🫡",
//   "🫠",
//   "🥹",
//   "😮",
//   "😱",
//   "🤌",
//   "💪",
//   "👏",
//   "🍕",
//   "🎮",
//   "🎵",
//   "⚡",
//   "🌙",
//   "☀️",
//   "🌈",
//   "💫",
//   "🚀",
//   "🎯",
// ];

// // FIX 1: enterKeyHint changed from "send" to "enter" so mobile keyboard shows a newline key
// const TEXTAREA_PROPS = {
//   autoComplete: "off",
//   autoCorrect: "off",
//   autoCapitalize: "sentences",
//   spellCheck: false,
//   "data-form-type": "other",
//   enterKeyHint: "enter",
// };

// function MessageStatus({ status }) {
//   if (status === "blocked") {
//     return (
//       <span style={{ fontSize: 10, color: "#f87171" }}>Not delivered</span>
//     );
//   }
//   if (status === "sending" || status === "sent") {
//     return (
//       <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//         <path
//           d="M1 5l3 3 5-6"
//           stroke="rgba(255,255,255,0.35)"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   }
//   if (status === "read") {
//     return (
//       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
//         <path
//           d="M1 5l3 3 5-6"
//           stroke="#60a5fa"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M6 5l3 3 5-6"
//           stroke="#60a5fa"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   }
//   if (status === "delivered") {
//     return (
//       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
//         <path
//           d="M1 5l3 3 5-6"
//           stroke="rgba(255,255,255,0.35)"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M6 5l3 3 5-6"
//           stroke="rgba(255,255,255,0.35)"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   }
//   return (
//     <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//       <path
//         d="M1 5l3 3 5-6"
//         stroke="rgba(255,255,255,0.35)"
//         strokeWidth="1.6"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// function MessageSkeleton() {
//   return (
//     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//     </div>
//   );
// }

// function useConversation({ chat, onNewMessage, onClearMessages }) {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const myUserId = user._id;
//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);
//   const conversationId = chat._id.toString();
//   const receiverId = otherUser?._id;

//   const {
//     sendSignal,
//     messages,
//     setMessages,
//     markAsRead,
//     setCurrentConversation,
//   } = useContext(websocketContext);

//   const [text, setText] = useState("");
//   const [cursor, setCursor] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [fetchingMessages, setFetchingMessages] = useState(true);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showChatOptions, setShowChatOptions] = useState(false);
//   const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
//   const [chatTheme, setChatTheme] = useState({
//     id: "default",
//     label: "Default",
//     bg: "#0a0a0a",
//   });
//   const [isBlocked, setIsBlocked] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const messagesContainerRef = useRef(null);
//   const shouldAutoScrollRef = useRef(true);
//   const textareaRef = useRef(null);
//   const emojiPickerRef = useRef(null);
//   const chatOptionsRef = useRef(null);
//   const readMarkedRef = useRef(false);

//   useEffect(() => {
//     if (!receiverId) return;
//     let cancelled = false;
//     fetchData(`/api/users/${receiverId}/block-status`, {
//       credentials: "include",
//     })
//       .then((r) => r.json())
//       .then((data) => {
//         if (!cancelled) setIsBlocked(data.isBlocked);
//       })
//       .catch((err) => console.error("Failed to fetch block status", err));
//     return () => {
//       cancelled = true;
//     };
//   }, [receiverId]);

//   useEffect(() => {
//     setCurrentConversation(conversationId);
//     return () => setCurrentConversation(null);
//   }, [conversationId, setCurrentConversation]);

//   useEffect(() => {
//     setHasMore(true);
//     setCursor(null);
//     setFetchingMessages(true);
//     setShowEmojiPicker(false);
//     setShowChatOptions(false);
//     setIsBlocked(false);
//     readMarkedRef.current = false;
//     shouldAutoScrollRef.current = true;
//   }, [conversationId]);

//   const doMarkRead = useCallback(() => {
//     const convMessages = messages[conversationId] || [];
//     const hasUnread = convMessages.some(
//       (m) => m.from !== myUserId && m.status !== "read",
//     );
//     if (!hasUnread) return;
//     setMessages((prev) => ({
//       ...prev,
//       [conversationId]: (prev[conversationId] || []).map((m) =>
//         m.from !== myUserId && m.status !== "read"
//           ? { ...m, status: "read" }
//           : m,
//       ),
//     }));
//     markAsRead(conversationId);
//     if (!readMarkedRef.current) {
//       readMarkedRef.current = true;
//       fetchData(`/api/chat/conversations/${conversationId}/read`, {
//         method: "PATCH",
//         credentials: "include",
//       }).catch(() => {});
//     }
//   }, [conversationId, messages, myUserId, markAsRead, setMessages]);

//   useEffect(() => {
//     doMarkRead();
//     readMarkedRef.current = false;
//   }, [conversationId, messages[conversationId]?.length]);

//   useEffect(() => {
//     const h = (e) => {
//       if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target))
//         setShowEmojiPicker(false);
//     };
//     document.addEventListener("mousedown", h);
//     return () => document.removeEventListener("mousedown", h);
//   }, []);

//   const handleToggleChatOptions = useCallback(() => {
//     if (!showChatOptions && chatOptionsRef.current) {
//       const rect = chatOptionsRef.current.getBoundingClientRect();
//       setPopupPos({
//         top: rect.bottom + 6,
//         right: window.innerWidth - rect.right,
//       });
//     }
//     setShowChatOptions((v) => !v);
//   }, [showChatOptions]);

//   const insertEmoji = useCallback(
//     (emoji) => {
//       const ta = textareaRef.current;
//       if (!ta) {
//         setText((prev) => prev + emoji);
//         return;
//       }
//       const start = ta.selectionStart;
//       const end = ta.selectionEnd;
//       const newText = text.slice(0, start) + emoji + text.slice(end);
//       setText(newText);
//       requestAnimationFrame(() => {
//         ta.focus();
//         ta.selectionStart = start + emoji.length;
//         ta.selectionEnd = start + emoji.length;
//         ta.style.height = "auto";
//         ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
//       });
//     },
//     [text],
//   );

//   const handleSend = useCallback(async () => {
//     if (!text.trim() || isBlocked) return;
//     const messageId = uuidv4();
//     const createdAt = Date.now();
//     const messageText = text;
//     setMessages((prev) => {
//       const existing = prev[conversationId] || [];
//       return {
//         ...prev,
//         [conversationId]: [
//           ...existing,
//           {
//             messageId,
//             conversationId,
//             from: myUserId,
//             to: receiverId,
//             text: messageText,
//             status: "sending",
//             createdAt,
//           },
//         ],
//       };
//     });
//     sendSignal({
//       type: "chat_message",
//       messageId,
//       conversationId,
//       to: receiverId,
//       text: messageText,
//       createdAt,
//     });
//     onNewMessage?.(conversationId, messageText);
//     setText("");
//     setShowEmojiPicker(false);
//     if (textareaRef.current) textareaRef.current.style.height = "auto";
//     shouldAutoScrollRef.current = true;
//   }, [
//     text,
//     isBlocked,
//     conversationId,
//     myUserId,
//     receiverId,
//     sendSignal,
//     setMessages,
//     onNewMessage,
//   ]);

//   const loadOlderMessages = useCallback(async () => {
//     if (!cursor || loadingMore) return;
//     setLoadingMore(true);
//     const el = messagesContainerRef.current;
//     const scrollHeightBefore = el ? el.scrollHeight : 0;
//     try {
//       const res = await fetchData(
//         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
//         { credentials: "include" },
//       );
//       const data = await res.json();
//       const arr = Array.isArray(data) ? data : data.messages || [];
//       if (arr.length < 50) setHasMore(false);
//       const formatted = arr.map((msg) => ({
//         messageId: msg.messageId,
//         conversationId,
//         from: msg.senderId,
//         to: msg.receiverId,
//         text: msg.text,
//         status: msg.status || "sent",
//         createdAt: new Date(msg.createdAt).getTime(),
//       }));
//       shouldAutoScrollRef.current = false;
//       setMessages((prev) => {
//         const existing = prev[conversationId] || [];
//         const ids = new Set(existing.map((m) => m.messageId));
//         return {
//           ...prev,
//           [conversationId]: [
//             ...formatted.filter((m) => !ids.has(m.messageId)),
//             ...existing,
//           ],
//         };
//       });
//       if (arr.length > 0) setCursor(arr[0].createdAt);
//       setTimeout(() => {
//         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
//       }, 50);
//     } catch (err) {
//       console.error("Failed loading older messages", err);
//     }
//     setLoadingMore(false);
//   }, [cursor, loadingMore, conversationId, setMessages]);

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     const h = () => {
//       shouldAutoScrollRef.current =
//         el.scrollHeight - el.scrollTop - el.clientHeight < 150;
//     };
//     el.addEventListener("scroll", h, { passive: true });
//     return () => el.removeEventListener("scroll", h);
//   }, []);

//   const scrollToBottom = useCallback((force = false) => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     if (!force && !shouldAutoScrollRef.current) return;
//     requestAnimationFrame(() => {
//       el.scrollTop = el.scrollHeight;
//     });
//   }, []);

//   useEffect(() => {
//     if (!conversationId) return;
//     let cancelled = false;
//     const fetch_ = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         const arr = Array.isArray(data) ? data : data.messages || [];
//         if (arr.length < 50) setHasMore(false);
//         const formatted = arr.map((msg) => ({
//           messageId: msg.messageId,
//           conversationId,
//           from: msg.senderId,
//           to: msg.receiverId,
//           text: msg.text,
//           status: msg.status || "sent",
//           createdAt: new Date(msg.createdAt).getTime(),
//         }));
//         if (arr.length > 0) setCursor(arr[0].createdAt);
//         if (!cancelled) {
//           setMessages((prev) => {
//             const existing = prev[conversationId] || [];
//             const ids = new Set(existing.map((m) => m.messageId));
//             return {
//               ...prev,
//               [conversationId]: [
//                 ...existing,
//                 ...formatted.filter((m) => !ids.has(m.messageId)),
//               ],
//             };
//           });
//           requestAnimationFrame(() => {
//             const el = messagesContainerRef.current;
//             if (el) el.scrollTop = el.scrollHeight;
//           });
//         }
//       } catch (err) {
//         console.error("Failed to fetch messages", err);
//       } finally {
//         if (!cancelled) setFetchingMessages(false);
//       }
//     };
//     fetch_();
//     return () => {
//       cancelled = true;
//     };
//   }, [conversationId]);

//   const convMessageCount = messages[conversationId]?.length ?? 0;
//   useEffect(() => {
//     scrollToBottom(false);
//   }, [convMessageCount]);

//   return {
//     user,
//     navigate,
//     myUserId,
//     otherUser,
//     conversationId,
//     receiverId,
//     messages,
//     setMessages,
//     text,
//     setText,
//     loadingMore,
//     fetchingMessages,
//     showEmojiPicker,
//     setShowEmojiPicker,
//     showChatOptions,
//     setShowChatOptions,
//     popupPos,
//     chatTheme,
//     setChatTheme,
//     isBlocked,
//     setIsBlocked,
//     hasMore,
//     messagesContainerRef,
//     textareaRef,
//     emojiPickerRef,
//     chatOptionsRef,
//     handleSend,
//     handleToggleChatOptions,
//     insertEmoji,
//     loadOlderMessages,
//     scrollToBottom,
//   };
// }

// // ─── ChatHeader ───────────────────────────────────────────────────────────────

// function ChatHeader({
//   otherUser,
//   isBlocked,
//   navigate,
//   chatOptionsRef,
//   handleToggleChatOptions,
//   onBack,
// }) {
//   const { onlineUsers } = useContext(websocketContext);
//   const isOnline = onlineUsers?.has(otherUser?._id?.toString());

//   return (
//     <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
//       <button
//         onClick={onBack}
//         className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
//       >
//         <ArrowLeft size={18} />
//       </button>

//       {/* Avatar with gradient border ring */}
//       <div
//         onClick={() => navigate(`/profile/${otherUser.username}`)}
//         className="relative flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity duration-150"
//         style={{ width: 42, height: 42 }}
//       >
//         {/* Gradient ring */}

//         {/* Avatar */}
//         <div
//           className="absolute rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center"
//           style={{ inset: 2.5 }}
//         >
//           {otherUser.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-sm font-semibold text-white">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </span>
//           )}
//         </div>

//         {/* Online dot */}
//         <span
//           className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${
//             isOnline ? "bg-green-400" : "bg-neutral-400"
//           }`}
//         />
//       </div>

//       <div className="flex flex-col flex-1 min-w-0">
//         <h3
//           onClick={() => navigate(`/profile/${otherUser.username}`)}
//           className="font-semibold text-sm text-white truncate cursor-pointer hover:text-white/70 transition-colors duration-150"
//         >
//           {otherUser.username}
//         </h3>
//         {isBlocked ? (
//           <span className="text-[10px] text-red-400/80 font-medium tracking-wide">
//             Blocked
//           </span>
//         ) : (
//           ""
//         )}
//       </div>

//       <div ref={chatOptionsRef} className="relative flex-shrink-0">
//         <button
//           onClick={handleToggleChatOptions}
//           className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
//         >
//           <svg
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//           >
//             <circle cx="12" cy="5" r="1" />
//             <circle cx="12" cy="12" r="1" />
//             <circle cx="12" cy="19" r="1" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── MessageList ──────────────────────────────────────────────────────────────

// function MessageList({
//   messagesContainerRef,
//   fetchingMessages,
//   hasMore,
//   messages,
//   conversationId,
//   loadOlderMessages,
//   loadingMore,
//   myUserId,
//   otherUser,
//   user,
//   chatTheme,
// }) {
//   if (fetchingMessages) {
//     return (
//       <div className="flex-1 overflow-hidden">
//         <MessageSkeleton />
//       </div>
//     );
//   }
//   return (
//     <div
//       ref={messagesContainerRef}
//       className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
//       style={{
//         overscrollBehavior: "contain",
//         WebkitOverflowScrolling: "touch",
//         background: chatTheme.bg,
//         transition: "background 0.3s ease",
//       }}
//     >
//       {hasMore && messages[conversationId]?.length > 0 && (
//         <div className="flex justify-center mb-2">
//           <button
//             onClick={loadOlderMessages}
//             disabled={loadingMore}
//             className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide disabled:opacity-50"
//           >
//             {loadingMore ? "Loading…" : "Load older messages"}
//           </button>
//         </div>
//       )}
//       {(!messages[conversationId] || messages[conversationId].length === 0) && (
//         <div className="text-center text-white/60 text-sm">
//           Start a conversation with {otherUser.username}
//         </div>
//       )}
//       {(messages[conversationId] || []).map((msg) => (
//         <MessageBubble
//           key={msg.messageId}
//           msg={msg}
//           isMe={msg.from === myUserId}
//           otherUser={otherUser}
//           user={user}
//         />
//       ))}
//       <div className="h-2" />
//     </div>
//   );
// }

// // ─── BlockedBanner ────────────────────────────────────────────────────────────

// function BlockedBanner({ otherUser }) {
//   return (
//     <div className="flex-shrink-0 px-4 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center gap-3">
//       <svg
//         width="16"
//         height="16"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="#f87171"
//         strokeWidth="1.8"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <circle cx="12" cy="12" r="10" />
//         <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//       </svg>
//       <p className="text-sm text-white/40 text-center">
//         You have blocked{" "}
//         <span className="text-white/60 font-medium">{otherUser.username}</span>.
//         They can no longer message you.
//       </p>
//     </div>
//   );
// }

// // ─── EmojiPicker ─────────────────────────────────────────────────────────────

// function EmojiPicker({ emojiPickerRef, insertEmoji }) {
//   return (
//     <div
//       ref={emojiPickerRef}
//       className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
//       style={{
//         maxHeight: IS_ANDROID ? 220 : 280,
//         overflowY: "auto",
//         overscrollBehavior: "contain",
//       }}
//     >
//       <div className="grid grid-cols-10 gap-1">
//         {EMOJI_LIST.map((emoji) => (
//           <button
//             key={emoji}
//             onClick={() => insertEmoji(emoji)}
//             className="w-8 h-8 flex items-center justify-center text-[18px] rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100"
//           >
//             {emoji}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── InputBarIOS ──────────────────────────────────────────────────────────────

// function InputBarIOS({
//   text,
//   setText,
//   textareaRef,
//   emojiPickerRef,
//   showEmojiPicker,
//   setShowEmojiPicker,
//   insertEmoji,
//   handleSend,
// }) {
//   return (
//     <div
//       className="flex-shrink-0 border-t border-white/10 bg-white/5 backdrop-blur-sm relative"
//       style={{
//         paddingTop: 10,
//         paddingLeft: 12,
//         paddingRight: 12,
//         paddingBottom: "max(10px, env(safe-area-inset-bottom, 0px))",
//       }}
//     >
//       {showEmojiPicker && (
//         <EmojiPicker
//           emojiPickerRef={emojiPickerRef}
//           insertEmoji={insertEmoji}
//         />
//       )}
//       <div className="flex items-end gap-2">
//         <button
//           onClick={() => setShowEmojiPicker((prev) => !prev)}
//           className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
//             showEmojiPicker
//               ? "bg-indigo-600 border-indigo-500 text-white"
//               : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
//           }`}
//         >
//           <Smile size={17} />
//         </button>
//         <textarea
//           ref={textareaRef}
//           rows={1}
//           value={text}
//           onChange={(e) => {
//             setText(e.target.value);
//             e.target.style.height = "auto";
//             e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
//           }}
//           placeholder="Type a message…"
//           className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
//           style={{ maxHeight: "112px", fontSize: "16px" }}
//           {...TEXTAREA_PROPS}
//         />
//         <button
//           onClick={handleSend}
//           disabled={!text.trim()}
//           className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
//         >
//           <Send size={16} className="text-white ml-0.5" />
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── InputBarAndroid ──────────────────────────────────────────────────────────

// function InputBarAndroid({
//   text,
//   setText,
//   textareaRef,
//   emojiPickerRef,
//   showEmojiPicker,
//   setShowEmojiPicker,
//   insertEmoji,
//   handleSend,
//   keyboardOpen,
// }) {
//   return (
//     <div
//       className="flex-shrink-0 border-t border-white/10 relative"
//       style={{
//         paddingTop: 10,
//         paddingLeft: 12,
//         paddingRight: 12,
//         paddingBottom: keyboardOpen ? 0 : "env(safe-area-inset-bottom, 0px)",
//         backgroundColor: "rgba(15, 15, 20, 0.98)",
//       }}
//     >
//       {showEmojiPicker && (
//         <EmojiPicker
//           emojiPickerRef={emojiPickerRef}
//           insertEmoji={insertEmoji}
//         />
//       )}
//       <div className="flex items-end gap-2 py-2">
//         <button
//           onClick={() => setShowEmojiPicker((prev) => !prev)}
//           className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
//             showEmojiPicker
//               ? "bg-indigo-600 border-indigo-500 text-white"
//               : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
//           }`}
//         >
//           <Smile size={17} />
//         </button>
//         <textarea
//           ref={textareaRef}
//           rows={1}
//           value={text}
//           onChange={(e) => {
//             setText(e.target.value);
//             e.target.style.height = "auto";
//             e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
//           }}
//           placeholder="Type a message…"
//           className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
//           style={{ maxHeight: "112px", fontSize: "16px" }}
//           inputMode="text"
//           {...TEXTAREA_PROPS}
//         />
//         <button
//           onClick={handleSend}
//           disabled={!text.trim()}
//           className="flex-shrink-0 w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
//         >
//           <Send size={16} className="text-white ml-0.5" />
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── ChatBoxIOS ───────────────────────────────────────────────────────────────

// function ChatBoxIOS({ chat, onBack, onNewMessage, onClearMessages }) {
//   useViewportMeta();
//   const conv = useConversation({ chat, onNewMessage, onClearMessages });
//   const {
//     user,
//     navigate,
//     myUserId,
//     otherUser,
//     conversationId,
//     receiverId,
//     messages,
//     setMessages,
//     text,
//     setText,
//     loadingMore,
//     fetchingMessages,
//     showEmojiPicker,
//     setShowEmojiPicker,
//     showChatOptions,
//     setShowChatOptions,
//     popupPos,
//     chatTheme,
//     setChatTheme,
//     isBlocked,
//     setIsBlocked,
//     hasMore,
//     messagesContainerRef,
//     textareaRef,
//     emojiPickerRef,
//     chatOptionsRef,
//     handleSend,
//     handleToggleChatOptions,
//     insertEmoji,
//     loadOlderMessages,
//   } = conv;

//   const [containerHeight, setContainerHeight] = useState(
//     () => window.visualViewport?.height ?? window.innerHeight,
//   );
//   const timerRef = useRef(null);

//   useEffect(() => {
//     const vv = window.visualViewport;
//     if (!vv) return;
//     // FIX 2: debounce reduced to 0ms to eliminate gap between keyboard and input bar
//     const update = () => {
//       clearTimeout(timerRef.current);
//       timerRef.current = setTimeout(() => {
//         setContainerHeight(vv.height);
//         requestAnimationFrame(() => {
//           const el = messagesContainerRef.current;
//           if (el) el.scrollTop = el.scrollHeight;
//         });
//       }, 0);
//     };
//     vv.addEventListener("resize", update);
//     vv.addEventListener("scroll", update);
//     return () => {
//       vv.removeEventListener("resize", update);
//       vv.removeEventListener("scroll", update);
//       clearTimeout(timerRef.current);
//     };
//   }, [messagesContainerRef]);

//   if (!otherUser) return null;

//   return (
//     <div
//       className="flex flex-col w-full overflow-hidden"
//       style={{ height: containerHeight, maxHeight: containerHeight }}
//     >
//       <ChatHeader
//         otherUser={otherUser}
//         isBlocked={isBlocked}
//         navigate={navigate}
//         chatOptionsRef={chatOptionsRef}
//         handleToggleChatOptions={handleToggleChatOptions}
//         onBack={onBack}
//       />
//       <MessageList
//         messagesContainerRef={messagesContainerRef}
//         fetchingMessages={fetchingMessages}
//         hasMore={hasMore}
//         messages={messages}
//         conversationId={conversationId}
//         loadOlderMessages={loadOlderMessages}
//         loadingMore={loadingMore}
//         myUserId={myUserId}
//         otherUser={otherUser}
//         user={user}
//         chatTheme={chatTheme}
//       />
//       {isBlocked ? (
//         <BlockedBanner otherUser={otherUser} />
//       ) : (
//         <InputBarIOS
//           text={text}
//           setText={setText}
//           textareaRef={textareaRef}
//           emojiPickerRef={emojiPickerRef}
//           showEmojiPicker={showEmojiPicker}
//           setShowEmojiPicker={setShowEmojiPicker}
//           insertEmoji={insertEmoji}
//           handleSend={handleSend}
//         />
//       )}
//       {showChatOptions &&
//         createPortal(
//           <div
//             style={{
//               position: "fixed",
//               top: popupPos.top,
//               right: popupPos.right,
//               zIndex: 99999,
//             }}
//           >
//             <ChatOptionsPopup
//               onClose={() => setShowChatOptions(false)}
//               onClearChat={() => {
//                 setMessages((prev) => ({ ...prev, [conversationId]: [] }));
//                 onClearMessages?.(conversationId);
//               }}
//               onBlock={() => setIsBlocked(true)}
//               onThemeChange={(theme) => setChatTheme(theme)}
//               currentTheme={chatTheme}
//               anchorRef={chatOptionsRef}
//               conversationId={conversationId}
//               otherUserId={receiverId}
//               isBlocked={isBlocked}
//               onUnblock={() => setIsBlocked(false)}
//             />
//           </div>,
//           document.body,
//         )}
//     </div>
//   );
// }

// // ─── ChatBoxAndroid ───────────────────────────────────────────────────────────

// function ChatBoxAndroid({ chat, onBack, onNewMessage, onClearMessages }) {
//   useViewportMeta();
//   const conv = useConversation({ chat, onNewMessage, onClearMessages });
//   const {
//     user,
//     navigate,
//     myUserId,
//     otherUser,
//     conversationId,
//     receiverId,
//     messages,
//     setMessages,
//     text,
//     setText,
//     loadingMore,
//     fetchingMessages,
//     showEmojiPicker,
//     setShowEmojiPicker,
//     showChatOptions,
//     setShowChatOptions,
//     popupPos,
//     chatTheme,
//     setChatTheme,
//     isBlocked,
//     setIsBlocked,
//     hasMore,
//     messagesContainerRef,
//     textareaRef,
//     emojiPickerRef,
//     chatOptionsRef,
//     handleSend,
//     handleToggleChatOptions,
//     insertEmoji,
//     loadOlderMessages,
//   } = conv;

//   const [keyboardOpen, setKeyboardOpen] = useState(false);
//   const baseHeightRef = useRef(0);
//   const scrollTimerRef = useRef(null);

//   useEffect(() => {
//     const vv = window.visualViewport;
//     if (!vv) return;
//     const initTimer = setTimeout(() => {
//       baseHeightRef.current = vv.height;
//     }, 50);
//     const onResize = () => {
//       if (!baseHeightRef.current) return;
//       const isOpen = baseHeightRef.current - vv.height > 120;
//       setKeyboardOpen(isOpen);
//       if (isOpen) {
//         clearTimeout(scrollTimerRef.current);
//         // FIX 3: reduced from 150ms to 50ms to close the gap on Android
//         scrollTimerRef.current = setTimeout(() => {
//           requestAnimationFrame(() => {
//             const el = messagesContainerRef.current;
//             if (el) el.scrollTop = el.scrollHeight;
//           });
//         }, 50);
//       }
//     };
//     vv.addEventListener("resize", onResize, { passive: true });
//     return () => {
//       vv.removeEventListener("resize", onResize);
//       clearTimeout(initTimer);
//       clearTimeout(scrollTimerRef.current);
//     };
//   }, [messagesContainerRef]);

//   if (!otherUser) return null;

//   return (
//     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
//       <ChatHeader
//         otherUser={otherUser}
//         isBlocked={isBlocked}
//         navigate={navigate}
//         chatOptionsRef={chatOptionsRef}
//         handleToggleChatOptions={handleToggleChatOptions}
//         onBack={onBack}
//       />
//       <MessageList
//         messagesContainerRef={messagesContainerRef}
//         fetchingMessages={fetchingMessages}
//         hasMore={hasMore}
//         messages={messages}
//         conversationId={conversationId}
//         loadOlderMessages={loadOlderMessages}
//         loadingMore={loadingMore}
//         myUserId={myUserId}
//         otherUser={otherUser}
//         user={user}
//         chatTheme={chatTheme}
//       />
//       {isBlocked ? (
//         <BlockedBanner otherUser={otherUser} />
//       ) : (
//         <InputBarAndroid
//           text={text}
//           setText={setText}
//           textareaRef={textareaRef}
//           emojiPickerRef={emojiPickerRef}
//           showEmojiPicker={showEmojiPicker}
//           setShowEmojiPicker={setShowEmojiPicker}
//           insertEmoji={insertEmoji}
//           handleSend={handleSend}
//           keyboardOpen={keyboardOpen}
//         />
//       )}
//       {showChatOptions &&
//         createPortal(
//           <div
//             style={{
//               position: "fixed",
//               top: popupPos.top,
//               right: popupPos.right,
//               zIndex: 99999,
//             }}
//           >
//             <ChatOptionsPopup
//               onClose={() => setShowChatOptions(false)}
//               onClearChat={() => {
//                 setMessages((prev) => ({ ...prev, [conversationId]: [] }));
//                 onClearMessages?.(conversationId);
//               }}
//               onBlock={() => setIsBlocked(true)}
//               onThemeChange={(theme) => setChatTheme(theme)}
//               currentTheme={chatTheme}
//               anchorRef={chatOptionsRef}
//               conversationId={conversationId}
//               otherUserId={receiverId}
//               isBlocked={isBlocked}
//               onUnblock={() => setIsBlocked(false)}
//             />
//           </div>,
//           document.body,
//         )}
//     </div>
//   );
// }

// function ChatBox(props) {
//   const Variant = useMemo(() => (IS_ANDROID ? ChatBoxAndroid : ChatBoxIOS), []);
//   return <Variant {...props} />;
// }

// export default ChatBox;

import { ArrowLeft, Send, Smile } from "lucide-react";
import {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import { websocketContext } from "../../context/WebSocket";
import { useAuth } from "../../hooks/useAuth";
import fetchData from "../../utils/fetchData";
import MessageBubble from "../MessageBubble";
import ChatOptionsPopup from "../ChatOptionsPopup";
import { useNavigate } from "react-router-dom";

const UA = typeof navigator !== "undefined" ? navigator.userAgent : "";
const IS_ANDROID = /Android/i.test(UA);

function useViewportMeta() {
  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]');
    const prev = meta?.getAttribute("content") ?? "";
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "viewport";
      document.head.appendChild(meta);
    }
    const value = IS_ANDROID
      ? "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content"
      : "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-visual";
    meta.setAttribute("content", value);
    return () => meta.setAttribute("content", prev);
  }, []);
}

const EMOJI_LIST = [
  "😀",
  "😂",
  "😍",
  "🥰",
  "😎",
  "🤔",
  "😭",
  "😡",
  "🥺",
  "😴",
  "👍",
  "👎",
  "❤️",
  "🔥",
  "✨",
  "🎉",
  "🙏",
  "💯",
  "😊",
  "🤣",
  "😘",
  "🥳",
  "😤",
  "🤯",
  "😇",
  "🤗",
  "😏",
  "🙄",
  "😬",
  "🤝",
  "👀",
  "💀",
  "🫡",
  "🫠",
  "🥹",
  "😮",
  "😱",
  "🤌",
  "💪",
  "👏",
  "🍕",
  "🎮",
  "🎵",
  "⚡",
  "🌙",
  "☀️",
  "🌈",
  "💫",
  "🚀",
  "🎯",
];

const TEXTAREA_PROPS = {
  autoComplete: "off",
  autoCorrect: "off",
  autoCapitalize: "sentences",
  spellCheck: false,
  "data-form-type": "other",
  enterKeyHint: "enter",
};

function MessageStatus({ status }) {
  if (status === "blocked") {
    return (
      <span style={{ fontSize: 10, color: "#f87171" }}>Not delivered</span>
    );
  }
  if (status === "sending" || status === "sent") {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M1 5l3 3 5-6"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (status === "read") {
    return (
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
        <path
          d="M1 5l3 3 5-6"
          stroke="#60a5fa"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 5l3 3 5-6"
          stroke="#60a5fa"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (status === "delivered") {
    return (
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
        <path
          d="M1 5l3 3 5-6"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 5l3 3 5-6"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M1 5l3 3 5-6"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessageSkeleton() {
  return (
    <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
      <div className="flex items-end gap-2">
        <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
        <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
      </div>
      <div className="flex justify-end">
        <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
      </div>
      <div className="flex items-end gap-2">
        <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
        <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
      </div>
      <div className="flex justify-end">
        <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
      </div>
      <div className="flex items-end gap-2">
        <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
        <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
      </div>
      <div className="flex justify-end">
        <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
      </div>
    </div>
  );
}

function useConversation({ chat, onNewMessage, onClearMessages }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const myUserId = user._id;
  const otherUser = chat.participants?.find((p) => p._id !== myUserId);
  const conversationId = chat._id.toString();
  const receiverId = otherUser?._id;

  const {
    sendSignal,
    messages,
    setMessages,
    markAsRead,
    setCurrentConversation,
  } = useContext(websocketContext);

  const [text, setText] = useState("");
  const [cursor, setCursor] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [fetchingMessages, setFetchingMessages] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
  const [chatTheme, setChatTheme] = useState({
    id: "default",
    label: "Default",
    bg: "#0a0a0a",
  });
  const [isBlocked, setIsBlocked] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const messagesContainerRef = useRef(null);
  const shouldAutoScrollRef = useRef(true);
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const chatOptionsRef = useRef(null);
  const readMarkedRef = useRef(false);

  useEffect(() => {
    if (!receiverId) return;
    let cancelled = false;
    fetchData(`/api/users/${receiverId}/block-status`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setIsBlocked(data.isBlocked);
      })
      .catch((err) => console.error("Failed to fetch block status", err));
    return () => {
      cancelled = true;
    };
  }, [receiverId]);

  useEffect(() => {
    setCurrentConversation(conversationId);
    return () => setCurrentConversation(null);
  }, [conversationId, setCurrentConversation]);

  useEffect(() => {
    setHasMore(true);
    setCursor(null);
    setFetchingMessages(true);
    setShowEmojiPicker(false);
    setShowChatOptions(false);
    setIsBlocked(false);
    readMarkedRef.current = false;
    shouldAutoScrollRef.current = true;
  }, [conversationId]);

  const doMarkRead = useCallback(() => {
    const convMessages = messages[conversationId] || [];
    const hasUnread = convMessages.some(
      (m) => m.from !== myUserId && m.status !== "read",
    );
    if (!hasUnread) return;
    setMessages((prev) => ({
      ...prev,
      [conversationId]: (prev[conversationId] || []).map((m) =>
        m.from !== myUserId && m.status !== "read"
          ? { ...m, status: "read" }
          : m,
      ),
    }));
    markAsRead(conversationId);
    if (!readMarkedRef.current) {
      readMarkedRef.current = true;
      fetchData(`/api/chat/conversations/${conversationId}/read`, {
        method: "PATCH",
        credentials: "include",
      }).catch(() => {});
    }
  }, [conversationId, messages, myUserId, markAsRead, setMessages]);

  useEffect(() => {
    doMarkRead();
    readMarkedRef.current = false;
  }, [conversationId, messages[conversationId]?.length]);

  useEffect(() => {
    const h = (e) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target))
        setShowEmojiPicker(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleToggleChatOptions = useCallback(() => {
    if (!showChatOptions && chatOptionsRef.current) {
      const rect = chatOptionsRef.current.getBoundingClientRect();
      setPopupPos({
        top: rect.bottom + 6,
        right: window.innerWidth - rect.right,
      });
    }
    setShowChatOptions((v) => !v);
  }, [showChatOptions]);

  const insertEmoji = useCallback(
    (emoji) => {
      const ta = textareaRef.current;
      if (!ta) {
        setText((prev) => prev + emoji);
        return;
      }
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newText = text.slice(0, start) + emoji + text.slice(end);
      setText(newText);
      requestAnimationFrame(() => {
        ta.focus();
        ta.selectionStart = start + emoji.length;
        ta.selectionEnd = start + emoji.length;
        ta.style.height = "auto";
        ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
      });
    },
    [text],
  );

  const handleSend = useCallback(async () => {
    if (!text.trim() || isBlocked) return;
    const messageId = uuidv4();
    const createdAt = Date.now();
    const messageText = text;
    setMessages((prev) => {
      const existing = prev[conversationId] || [];
      return {
        ...prev,
        [conversationId]: [
          ...existing,
          {
            messageId,
            conversationId,
            from: myUserId,
            to: receiverId,
            text: messageText,
            status: "sending",
            createdAt,
          },
        ],
      };
    });
    sendSignal({
      type: "chat_message",
      messageId,
      conversationId,
      to: receiverId,
      text: messageText,
      createdAt,
    });
    onNewMessage?.(conversationId, messageText);
    setText("");
    setShowEmojiPicker(false);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    shouldAutoScrollRef.current = true;
  }, [
    text,
    isBlocked,
    conversationId,
    myUserId,
    receiverId,
    sendSignal,
    setMessages,
    onNewMessage,
  ]);

  const loadOlderMessages = useCallback(async () => {
    if (!cursor || loadingMore) return;
    setLoadingMore(true);
    const el = messagesContainerRef.current;
    const scrollHeightBefore = el ? el.scrollHeight : 0;
    try {
      const res = await fetchData(
        `/api/chat/messages/${conversationId}?cursor=${cursor}`,
        { credentials: "include" },
      );
      const data = await res.json();
      const arr = Array.isArray(data) ? data : data.messages || [];
      if (arr.length < 50) setHasMore(false);
      const formatted = arr.map((msg) => ({
        messageId: msg.messageId,
        conversationId,
        from: msg.senderId,
        to: msg.receiverId,
        text: msg.text,
        status: msg.status || "sent",
        createdAt: new Date(msg.createdAt).getTime(),
      }));
      shouldAutoScrollRef.current = false;
      setMessages((prev) => {
        const existing = prev[conversationId] || [];
        const ids = new Set(existing.map((m) => m.messageId));
        return {
          ...prev,
          [conversationId]: [
            ...formatted.filter((m) => !ids.has(m.messageId)),
            ...existing,
          ],
        };
      });
      if (arr.length > 0) setCursor(arr[0].createdAt);
      setTimeout(() => {
        if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
      }, 50);
    } catch (err) {
      console.error("Failed loading older messages", err);
    }
    setLoadingMore(false);
  }, [cursor, loadingMore, conversationId, setMessages]);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const h = () => {
      shouldAutoScrollRef.current =
        el.scrollHeight - el.scrollTop - el.clientHeight < 150;
    };
    el.addEventListener("scroll", h, { passive: true });
    return () => el.removeEventListener("scroll", h);
  }, []);

  const scrollToBottom = useCallback((force = false) => {
    const el = messagesContainerRef.current;
    if (!el) return;
    if (!force && !shouldAutoScrollRef.current) return;
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, []);

  useEffect(() => {
    if (!conversationId) return;
    let cancelled = false;
    const fetch_ = async () => {
      try {
        const res = await fetchData(`/api/chat/messages/${conversationId}`, {
          credentials: "include",
        });
        const data = await res.json();
        const arr = Array.isArray(data) ? data : data.messages || [];
        if (arr.length < 50) setHasMore(false);
        const formatted = arr.map((msg) => ({
          messageId: msg.messageId,
          conversationId,
          from: msg.senderId,
          to: msg.receiverId,
          text: msg.text,
          status: msg.status || "sent",
          createdAt: new Date(msg.createdAt).getTime(),
        }));
        if (arr.length > 0) setCursor(arr[0].createdAt);
        if (!cancelled) {
          setMessages((prev) => {
            const existing = prev[conversationId] || [];
            const ids = new Set(existing.map((m) => m.messageId));
            return {
              ...prev,
              [conversationId]: [
                ...existing,
                ...formatted.filter((m) => !ids.has(m.messageId)),
              ],
            };
          });
          requestAnimationFrame(() => {
            const el = messagesContainerRef.current;
            if (el) el.scrollTop = el.scrollHeight;
          });
        }
      } catch (err) {
        console.error("Failed to fetch messages", err);
      } finally {
        if (!cancelled) setFetchingMessages(false);
      }
    };
    fetch_();
    return () => {
      cancelled = true;
    };
  }, [conversationId]);

  const convMessageCount = messages[conversationId]?.length ?? 0;
  useEffect(() => {
    scrollToBottom(false);
  }, [convMessageCount]);

  return {
    user,
    navigate,
    myUserId,
    otherUser,
    conversationId,
    receiverId,
    messages,
    setMessages,
    text,
    setText,
    loadingMore,
    fetchingMessages,
    showEmojiPicker,
    setShowEmojiPicker,
    showChatOptions,
    setShowChatOptions,
    popupPos,
    chatTheme,
    setChatTheme,
    isBlocked,
    setIsBlocked,
    hasMore,
    messagesContainerRef,
    textareaRef,
    emojiPickerRef,
    chatOptionsRef,
    handleSend,
    handleToggleChatOptions,
    insertEmoji,
    loadOlderMessages,
    scrollToBottom,
  };
}

// ─── ChatHeader ───────────────────────────────────────────────────────────────

function ChatHeader({
  otherUser,
  isBlocked,
  navigate,
  chatOptionsRef,
  handleToggleChatOptions,
  onBack,
}) {
  const { onlineUsers } = useContext(websocketContext);
  const isOnline = onlineUsers?.has(otherUser?._id?.toString());

  return (
    <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
      <button
        onClick={onBack}
        className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
      >
        <ArrowLeft size={18} />
      </button>

      <div
        onClick={() => navigate(`/profile/${otherUser.username}`)}
        className="relative flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity duration-150"
        style={{ width: 42, height: 42 }}
      >
        <div
          className="absolute rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center ring-2 ring-neutral-700"
          style={{ inset: 2.5 }}
        >
          {otherUser.profilePicture ? (
            <img
              src={otherUser.profilePicture}
              alt={otherUser.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-white">
              {otherUser.username?.[0]?.toUpperCase()}
            </span>
          )}
        </div>

        <span
          className={`absolute bottom-1 -right-1 w-3 h-3 rounded-full ${
            isOnline ? "bg-green-400" : "bg-neutral-400"
          }`}
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <h3
          onClick={() => navigate(`/profile/${otherUser.username}`)}
          className="font-semibold text-sm text-white truncate cursor-pointer hover:text-white/70 transition-colors duration-150"
        >
          {otherUser.username}
        </h3>
        {isBlocked ? (
          <span className="text-xs text-red-400/80 font-medium tracking-wide">
            Blocked
          </span>
        ) : (
          ""
        )}
      </div>

      <div ref={chatOptionsRef} className="relative flex-shrink-0">
        <button
          onClick={handleToggleChatOptions}
          className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── MessageList ──────────────────────────────────────────────────────────────

function MessageList({
  messagesContainerRef,
  fetchingMessages,
  hasMore,
  messages,
  conversationId,
  loadOlderMessages,
  loadingMore,
  myUserId,
  otherUser,
  user,
  chatTheme,
}) {
  if (fetchingMessages) {
    return (
      <div className="flex-1 overflow-hidden">
        <MessageSkeleton />
      </div>
    );
  }
  return (
    <div
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
      style={{
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        background: chatTheme.bg,
        transition: "background 0.3s ease",
      }}
    >
      {hasMore && messages[conversationId]?.length > 0 && (
        <div className="flex justify-center mb-2">
          <button
            onClick={loadOlderMessages}
            disabled={loadingMore}
            className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide disabled:opacity-50"
          >
            {loadingMore ? "Loading…" : "Load older messages"}
          </button>
        </div>
      )}
      {(!messages[conversationId] || messages[conversationId].length === 0) && (
        <div className="text-center text-white/60 text-sm">
          Start a conversation with {otherUser.username}
        </div>
      )}
      {(messages[conversationId] || []).map((msg) => (
        <MessageBubble
          key={msg.messageId}
          msg={msg}
          isMe={msg.from === myUserId}
          otherUser={otherUser}
          user={user}
        />
      ))}
      <div className="h-2" />
    </div>
  );
}

// ─── BlockedBanner ────────────────────────────────────────────────────────────

function BlockedBanner({ otherUser }) {
  return (
    <div className="flex-shrink-0 px-4 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center gap-3">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f87171"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
      <p className="text-sm text-white/40 text-center">
        You have blocked{" "}
        <span className="text-white/60 font-medium">{otherUser.username}</span>.
        They can no longer message you.
      </p>
    </div>
  );
}

// ─── EmojiPicker ─────────────────────────────────────────────────────────────

function EmojiPicker({ emojiPickerRef, insertEmoji }) {
  return (
    <div
      ref={emojiPickerRef}
      className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
      style={{
        maxHeight: IS_ANDROID ? 220 : 280,
        overflowY: "auto",
        overscrollBehavior: "contain",
      }}
    >
      <div className="grid grid-cols-10 gap-1">
        {EMOJI_LIST.map((emoji) => (
          <button
            key={emoji}
            onClick={() => insertEmoji(emoji)}
            className="w-8 h-8 flex items-center justify-center text-lg rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── InputBarIOS ──────────────────────────────────────────────────────────────

function InputBarIOS({
  text,
  setText,
  textareaRef,
  emojiPickerRef,
  showEmojiPicker,
  setShowEmojiPicker,
  insertEmoji,
  handleSend,
}) {
  return (
    <div
      className="flex-shrink-0 border-t border-white/10 bg-white/5 backdrop-blur-sm relative"
      style={{
        paddingTop: 10,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: "max(10px, env(safe-area-inset-bottom, 0px))",
      }}
    >
      {showEmojiPicker && (
        <EmojiPicker
          emojiPickerRef={emojiPickerRef}
          insertEmoji={insertEmoji}
        />
      )}
      <div className="flex items-end gap-2">
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
            showEmojiPicker
              ? "bg-indigo-600 border-indigo-500 text-white"
              : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
          }`}
        >
          <Smile size={17} />
        </button>
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
          }}
          placeholder="Type a message…"
          className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
          style={{ maxHeight: "112px", fontSize: "1rem" }}
          {...TEXTAREA_PROPS}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Send size={16} className="text-white ml-0.5" />
        </button>
      </div>
    </div>
  );
}

// ─── InputBarAndroid ──────────────────────────────────────────────────────────

function InputBarAndroid({
  text,
  setText,
  textareaRef,
  emojiPickerRef,
  showEmojiPicker,
  setShowEmojiPicker,
  insertEmoji,
  handleSend,
  keyboardOpen,
}) {
  return (
    <div
      className="flex-shrink-0 border-t border-white/10 relative"
      style={{
        paddingTop: 10,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: keyboardOpen ? 0 : "env(safe-area-inset-bottom, 0px)",
        backgroundColor: "rgba(15, 15, 20, 0.98)",
      }}
    >
      {showEmojiPicker && (
        <EmojiPicker
          emojiPickerRef={emojiPickerRef}
          insertEmoji={insertEmoji}
        />
      )}
      <div className="flex items-end gap-2 py-2">
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
            showEmojiPicker
              ? "bg-indigo-600 border-indigo-500 text-white"
              : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
          }`}
        >
          <Smile size={17} />
        </button>
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
          }}
          placeholder="Type a message…"
          className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
          style={{ maxHeight: "112px", fontSize: "1rem" }}
          inputMode="text"
          {...TEXTAREA_PROPS}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="flex-shrink-0 w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Send size={16} className="text-white ml-0.5" />
        </button>
      </div>
    </div>
  );
}

// ─── ChatBoxIOS ───────────────────────────────────────────────────────────────

function ChatBoxIOS({ chat, onBack, onNewMessage, onClearMessages }) {
  useViewportMeta();
  const conv = useConversation({ chat, onNewMessage, onClearMessages });
  const {
    user,
    navigate,
    myUserId,
    otherUser,
    conversationId,
    receiverId,
    messages,
    setMessages,
    text,
    setText,
    loadingMore,
    fetchingMessages,
    showEmojiPicker,
    setShowEmojiPicker,
    showChatOptions,
    setShowChatOptions,
    popupPos,
    chatTheme,
    setChatTheme,
    isBlocked,
    setIsBlocked,
    hasMore,
    messagesContainerRef,
    textareaRef,
    emojiPickerRef,
    chatOptionsRef,
    handleSend,
    handleToggleChatOptions,
    insertEmoji,
    loadOlderMessages,
  } = conv;

  const [containerHeight, setContainerHeight] = useState(
    () => window.visualViewport?.height ?? window.innerHeight,
  );
  const timerRef = useRef(null);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setContainerHeight(vv.height);
        requestAnimationFrame(() => {
          const el = messagesContainerRef.current;
          if (el) el.scrollTop = el.scrollHeight;
        });
      }, 0);
    };
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      clearTimeout(timerRef.current);
    };
  }, [messagesContainerRef]);

  if (!otherUser) return null;

  return (
    <div
      className="flex flex-col w-full overflow-hidden"
      style={{ height: containerHeight, maxHeight: containerHeight }}
    >
      <ChatHeader
        otherUser={otherUser}
        isBlocked={isBlocked}
        navigate={navigate}
        chatOptionsRef={chatOptionsRef}
        handleToggleChatOptions={handleToggleChatOptions}
        onBack={onBack}
      />
      <MessageList
        messagesContainerRef={messagesContainerRef}
        fetchingMessages={fetchingMessages}
        hasMore={hasMore}
        messages={messages}
        conversationId={conversationId}
        loadOlderMessages={loadOlderMessages}
        loadingMore={loadingMore}
        myUserId={myUserId}
        otherUser={otherUser}
        user={user}
        chatTheme={chatTheme}
      />
      {isBlocked ? (
        <BlockedBanner otherUser={otherUser} />
      ) : (
        <InputBarIOS
          text={text}
          setText={setText}
          textareaRef={textareaRef}
          emojiPickerRef={emojiPickerRef}
          showEmojiPicker={showEmojiPicker}
          setShowEmojiPicker={setShowEmojiPicker}
          insertEmoji={insertEmoji}
          handleSend={handleSend}
        />
      )}
      {showChatOptions &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: popupPos.top,
              right: popupPos.right,
              zIndex: 99999,
            }}
          >
            <ChatOptionsPopup
              onClose={() => setShowChatOptions(false)}
              onClearChat={() => {
                setMessages((prev) => ({ ...prev, [conversationId]: [] }));
                onClearMessages?.(conversationId);
              }}
              onBlock={() => setIsBlocked(true)}
              onThemeChange={(theme) => setChatTheme(theme)}
              currentTheme={chatTheme}
              anchorRef={chatOptionsRef}
              conversationId={conversationId}
              otherUserId={receiverId}
              isBlocked={isBlocked}
              onUnblock={() => setIsBlocked(false)}
            />
          </div>,
          document.body,
        )}
    </div>
  );
}

// ─── ChatBoxAndroid ───────────────────────────────────────────────────────────

function ChatBoxAndroid({ chat, onBack, onNewMessage, onClearMessages }) {
  useViewportMeta();
  const conv = useConversation({ chat, onNewMessage, onClearMessages });
  const {
    user,
    navigate,
    myUserId,
    otherUser,
    conversationId,
    receiverId,
    messages,
    setMessages,
    text,
    setText,
    loadingMore,
    fetchingMessages,
    showEmojiPicker,
    setShowEmojiPicker,
    showChatOptions,
    setShowChatOptions,
    popupPos,
    chatTheme,
    setChatTheme,
    isBlocked,
    setIsBlocked,
    hasMore,
    messagesContainerRef,
    textareaRef,
    emojiPickerRef,
    chatOptionsRef,
    handleSend,
    handleToggleChatOptions,
    insertEmoji,
    loadOlderMessages,
  } = conv;

  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const baseHeightRef = useRef(0);
  const scrollTimerRef = useRef(null);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const initTimer = setTimeout(() => {
      baseHeightRef.current = vv.height;
    }, 50);
    const onResize = () => {
      if (!baseHeightRef.current) return;
      const isOpen = baseHeightRef.current - vv.height > 120;
      setKeyboardOpen(isOpen);
      if (isOpen) {
        clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = setTimeout(() => {
          requestAnimationFrame(() => {
            const el = messagesContainerRef.current;
            if (el) el.scrollTop = el.scrollHeight;
          });
        }, 50);
      }
    };
    vv.addEventListener("resize", onResize, { passive: true });
    return () => {
      vv.removeEventListener("resize", onResize);
      clearTimeout(initTimer);
      clearTimeout(scrollTimerRef.current);
    };
  }, [messagesContainerRef]);

  if (!otherUser) return null;

  return (
    <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
      <ChatHeader
        otherUser={otherUser}
        isBlocked={isBlocked}
        navigate={navigate}
        chatOptionsRef={chatOptionsRef}
        handleToggleChatOptions={handleToggleChatOptions}
        onBack={onBack}
      />
      <MessageList
        messagesContainerRef={messagesContainerRef}
        fetchingMessages={fetchingMessages}
        hasMore={hasMore}
        messages={messages}
        conversationId={conversationId}
        loadOlderMessages={loadOlderMessages}
        loadingMore={loadingMore}
        myUserId={myUserId}
        otherUser={otherUser}
        user={user}
        chatTheme={chatTheme}
      />
      {isBlocked ? (
        <BlockedBanner otherUser={otherUser} />
      ) : (
        <InputBarAndroid
          text={text}
          setText={setText}
          textareaRef={textareaRef}
          emojiPickerRef={emojiPickerRef}
          showEmojiPicker={showEmojiPicker}
          setShowEmojiPicker={setShowEmojiPicker}
          insertEmoji={insertEmoji}
          handleSend={handleSend}
          keyboardOpen={keyboardOpen}
        />
      )}
      {showChatOptions &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: popupPos.top,
              right: popupPos.right,
              zIndex: 99999,
            }}
          >
            <ChatOptionsPopup
              onClose={() => setShowChatOptions(false)}
              onClearChat={() => {
                setMessages((prev) => ({ ...prev, [conversationId]: [] }));
                onClearMessages?.(conversationId);
              }}
              onBlock={() => setIsBlocked(true)}
              onThemeChange={(theme) => setChatTheme(theme)}
              currentTheme={chatTheme}
              anchorRef={chatOptionsRef}
              conversationId={conversationId}
              otherUserId={receiverId}
              isBlocked={isBlocked}
              onUnblock={() => setIsBlocked(false)}
            />
          </div>,
          document.body,
        )}
    </div>
  );
}

function ChatBox(props) {
  const Variant = useMemo(() => (IS_ANDROID ? ChatBoxAndroid : ChatBoxIOS), []);
  return <Variant {...props} />;
}

export default ChatBox;
// // // // import React, { useState, useEffect, useCallback } from "react";
// // // // import fetchData from "../utils/fetchData";

// // // // // ─── Constants ────────────────────────────────────────────────────────────────

// // // // const TABS = ["All", "Likes", "Comments", "Follows", "Messages", "Mentions"];

// // // // // Maps each tab to the DB `type` values it covers
// // // // const TAB_TYPE_MAP = {
// // // //   Likes: ["like"],
// // // //   Comments: ["comment"],
// // // //   Follows: ["follow_request", "follow_accepted"],
// // // //   Messages: ["message"],
// // // //   Mentions: ["mention"],
// // // // };

// // // // const AVATAR_PALETTE = [
// // // //   { bg: "#1a1033", fg: "#9d8fef" },
// // // //   { bg: "#0c2820", fg: "#4ec9a0" },
// // // //   { bg: "#2a1008", fg: "#e8845a" },
// // // //   { bg: "#0b1c30", fg: "#6aade8" },
// // // //   { bg: "#271a04", fg: "#e8952a" },
// // // //   { bg: "#28091a", fg: "#e87daa" },
// // // // ];

// // // // // ─── Pure view helpers ────────────────────────────────────────────────────────

// // // // function getInitials(name = "") {
// // // //   return (
// // // //     name
// // // //       .trim()
// // // //       .split(/\s+/)
// // // //       .map((w) => w[0] ?? "")
// // // //       .join("")
// // // //       .slice(0, 2)
// // // //       .toUpperCase() || "?"
// // // //   );
// // // // }

// // // // function getAvatarStyle(id = "") {
// // // //   const hash = String(id)
// // // //     .split("")
// // // //     .reduce((acc, c) => acc + c.charCodeAt(0), 0);
// // // //   return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
// // // // }

// // // // function formatTime(dateStr) {
// // // //   const diff = Date.now() - new Date(dateStr).getTime();
// // // //   const mins = Math.floor(diff / 60_000);
// // // //   if (mins < 1) return "now";
// // // //   if (mins < 60) return `${mins}m`;
// // // //   const hrs = Math.floor(mins / 60);
// // // //   if (hrs < 24) return `${hrs}h`;
// // // //   const days = Math.floor(hrs / 24);
// // // //   if (days === 1) return "yesterday";
// // // //   return `${days}d`;
// // // // }

// // // // function isYesterday(dateStr) {
// // // //   const diff = Math.floor(
// // // //     (Date.now() - new Date(dateStr).getTime()) / 86_400_000,
// // // //   );
// // // //   return diff === 1;
// // // // }

// // // // function getNotifMessage(type) {
// // // //   switch (type) {
// // // //     case "follow_request":
// // // //       return "sent you a follow request";
// // // //     case "follow_accepted":
// // // //       return "accepted your follow request";
// // // //     case "like":
// // // //       return "liked your post";
// // // //     case "comment":
// // // //       return "commented on your post";
// // // //     case "message":
// // // //       return "sent you a message";
// // // //     case "mention":
// // // //       return "mentioned you in a post";
// // // //     default:
// // // //       return `sent you a ${type}`;
// // // //   }
// // // // }

// // // // function getCategory(type) {
// // // //   switch (type) {
// // // //     case "follow_request":
// // // //     case "follow_accepted":
// // // //       return "follows";
// // // //     case "like":
// // // //       return "likes";
// // // //     case "comment":
// // // //       return "comments";
// // // //     case "message":
// // // //       return "messages";
// // // //     case "mention":
// // // //       return "mentions";
// // // //     default:
// // // //       return type;
// // // //   }
// // // // }

// // // // // ─── useWindowWidth ───────────────────────────────────────────────────────────

// // // // function useWindowWidth() {
// // // //   const [w, setW] = useState(
// // // //     typeof window !== "undefined" ? window.innerWidth : 1200,
// // // //   );
// // // //   useEffect(() => {
// // // //     const h = () => setW(window.innerWidth);
// // // //     window.addEventListener("resize", h);
// // // //     return () => window.removeEventListener("resize", h);
// // // //   }, []);
// // // //   return w;
// // // // }

// // // // // ─── Button style helper ──────────────────────────────────────────────────────

// // // // function btnStyle(variant, extra = {}) {
// // // //   const base = {
// // // //     borderRadius: 8,
// // // //     fontSize: 12,
// // // //     fontWeight: 500,
// // // //     cursor: "pointer",
// // // //     fontFamily: "inherit",
// // // //     transition: "opacity 0.15s",
// // // //     ...extra,
// // // //   };
// // // //   if (variant === "primary")
// // // //     return { ...base, background: "#4a41a8", color: "#fff", border: "none" };
// // // //   if (variant === "danger")
// // // //     return {
// // // //       ...base,
// // // //       background: "transparent",
// // // //       color: "#c0392b",
// // // //       border: "1px solid #2a1010",
// // // //     };
// // // //   return {
// // // //     ...base,
// // // //     background: "transparent",
// // // //     color: "#666",
// // // //     border: "1px solid #2a2a2a",
// // // //   };
// // // // }

// // // // // ─── Avatar ───────────────────────────────────────────────────────────────────

// // // // function Avatar({ name, senderId, profilePicture, size = 40 }) {
// // // //   const { bg, fg } = getAvatarStyle(senderId);
// // // //   if (profilePicture) {
// // // //     return (
// // // //       <img
// // // //         src={profilePicture}
// // // //         alt={name}
// // // //         style={{
// // // //           width: size,
// // // //           height: size,
// // // //           borderRadius: "50%",
// // // //           objectFit: "cover",
// // // //           flexShrink: 0,
// // // //         }}
// // // //       />
// // // //     );
// // // //   }
// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         width: size,
// // // //         height: size,
// // // //         borderRadius: "50%",
// // // //         background: bg,
// // // //         color: fg,
// // // //         flexShrink: 0,
// // // //         display: "flex",
// // // //         alignItems: "center",
// // // //         justifyContent: "center",
// // // //         fontSize: size * 0.35,
// // // //         fontWeight: 700,
// // // //         letterSpacing: "-0.02em",
// // // //       }}
// // // //     >
// // // //       {getInitials(name)}
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── NotificationCard ─────────────────────────────────────────────────────────

// // // // function NotificationCard({
// // // //   notif,
// // // //   selected,
// // // //   onSelect,
// // // //   onRead,
// // // //   onAccept,
// // // //   onDecline,
// // // //   compact,
// // // // }) {
// // // //   const isSelected = selected?._id === notif._id;
// // // //   const sender = notif.sender ?? {};
// // // //   const senderName = sender.username || "Unknown";
// // // //   const message = getNotifMessage(notif.type);
// // // //   const time = formatTime(notif.createdAt);
// // // //   const isPending =
// // // //     notif.type === "follow_request" && notif.status === "pending";

// // // //   return (
// // // //     <div
// // // //       onClick={() => {
// // // //         onSelect(notif);
// // // //         if (!notif.read) onRead(notif._id);
// // // //       }}
// // // //       style={{
// // // //         position: "relative",
// // // //         borderRadius: 12,
// // // //         padding: compact ? "10px 12px" : "12px 14px",
// // // //         display: "flex",
// // // //         gap: 11,
// // // //         cursor: "pointer",
// // // //         background: isSelected ? "#1c1840" : "transparent",
// // // //         border: `1px solid ${isSelected ? "#4a41a8" : notif.read ? "#1a1a1a" : "#2e2a5e"}`,
// // // //         transition: "background 0.15s, border-color 0.15s",
// // // //       }}
// // // //       onMouseEnter={(e) => {
// // // //         if (!isSelected) e.currentTarget.style.background = "#141414";
// // // //       }}
// // // //       onMouseLeave={(e) => {
// // // //         if (!isSelected) e.currentTarget.style.background = "transparent";
// // // //       }}
// // // //     >
// // // //       <Avatar
// // // //         name={senderName}
// // // //         senderId={sender._id}
// // // //         profilePicture={sender.profilePicture}
// // // //         size={compact ? 34 : 38}
// // // //       />

// // // //       <div style={{ flex: 1, minWidth: 0 }}>
// // // //         <div
// // // //           style={{
// // // //             display: "flex",
// // // //             justifyContent: "space-between",
// // // //             alignItems: "baseline",
// // // //             marginBottom: 2,
// // // //           }}
// // // //         >
// // // //           <span
// // // //             style={{
// // // //               fontSize: 13,
// // // //               fontWeight: 600,
// // // //               color: "#e0e0e0",
// // // //               overflow: "hidden",
// // // //               textOverflow: "ellipsis",
// // // //               whiteSpace: "nowrap",
// // // //               maxWidth: "68%",
// // // //             }}
// // // //           >
// // // //             {senderName}
// // // //           </span>
// // // //           <span style={{ fontSize: 11, color: "#404040", flexShrink: 0 }}>
// // // //             {time}
// // // //           </span>
// // // //         </div>

// // // //         <p
// // // //           style={{
// // // //             fontSize: 12.5,
// // // //             color: "#555",
// // // //             lineHeight: 1.45,
// // // //             overflow: "hidden",
// // // //             textOverflow: "ellipsis",
// // // //             whiteSpace: compact ? "nowrap" : "normal",
// // // //           }}
// // // //         >
// // // //           {message}
// // // //         </p>

// // // //         {/* Accept / Decline buttons — only for pending follow requests in non-compact view */}
// // // //         {isPending && !compact && (
// // // //           <div style={{ display: "flex", gap: 6, marginTop: 9 }}>
// // // //             <button
// // // //               onClick={(e) => {
// // // //                 e.stopPropagation();
// // // //                 onAccept(notif._id);
// // // //               }}
// // // //               style={{ ...btnStyle("primary"), flex: 1, padding: "7px 0" }}
// // // //             >
// // // //               Accept
// // // //             </button>
// // // //             <button
// // // //               onClick={(e) => {
// // // //                 e.stopPropagation();
// // // //                 onDecline(notif._id);
// // // //               }}
// // // //               style={{ ...btnStyle("ghost"), flex: 1, padding: "7px 0" }}
// // // //             >
// // // //               Decline
// // // //             </button>
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {!notif.read && (
// // // //         <div
// // // //           style={{
// // // //             width: 7,
// // // //             height: 7,
// // // //             borderRadius: "50%",
// // // //             background: "#7c6fe0",
// // // //             position: "absolute",
// // // //             top: 14,
// // // //             right: 14,
// // // //             boxShadow: "0 0 6px #7c6fe066",
// // // //           }}
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── Chip ─────────────────────────────────────────────────────────────────────

// // // // function Chip({ label, dim }) {
// // // //   return (
// // // //     <span
// // // //       style={{
// // // //         fontSize: 11,
// // // //         padding: "4px 11px",
// // // //         borderRadius: 20,
// // // //         background: dim ? "#141414" : "#1c1840",
// // // //         color: dim ? "#383838" : "#8a80d8",
// // // //         border: `1px solid ${dim ? "#1e1e1e" : "#2a2560"}`,
// // // //         textTransform: "capitalize",
// // // //         letterSpacing: "0.02em",
// // // //       }}
// // // //     >
// // // //       {label}
// // // //     </span>
// // // //   );
// // // // }

// // // // // ─── DetailPanel ─────────────────────────────────────────────────────────────

// // // // function DetailPanel({ notif, onAccept, onDecline, onDelete }) {
// // // //   if (!notif) {
// // // //     return (
// // // //       <div
// // // //         style={{
// // // //           flex: 1,
// // // //           display: "flex",
// // // //           flexDirection: "column",
// // // //           alignItems: "center",
// // // //           justifyContent: "center",
// // // //           gap: 12,
// // // //         }}
// // // //       >
// // // //         <div
// // // //           style={{
// // // //             width: 44,
// // // //             height: 44,
// // // //             borderRadius: "50%",
// // // //             border: "1px solid #1e1e1e",
// // // //             display: "flex",
// // // //             alignItems: "center",
// // // //             justifyContent: "center",
// // // //           }}
// // // //         >
// // // //           <svg
// // // //             width="18"
// // // //             height="18"
// // // //             viewBox="0 0 24 24"
// // // //             fill="none"
// // // //             stroke="#2a2a2a"
// // // //             strokeWidth="1.5"
// // // //           >
// // // //             <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
// // // //             <path d="M13.73 21a2 2 0 0 1-3.46 0" />
// // // //           </svg>
// // // //         </div>
// // // //         <p style={{ fontSize: 12, color: "#2e2e2e" }}>Select a notification</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const sender = notif.sender ?? {};
// // // //   const senderName = sender.username || "Unknown";
// // // //   const message = getNotifMessage(notif.type);
// // // //   const category = getCategory(notif.type);
// // // //   const time = formatTime(notif.createdAt);
// // // //   const isPending =
// // // //     notif.type === "follow_request" && notif.status === "pending";

// // // //   return (
// // // //     <div style={{ flex: 1, padding: "36px 40px", overflowY: "auto" }}>
// // // //       {/* Header row */}
// // // //       <div
// // // //         style={{
// // // //           display: "flex",
// // // //           alignItems: "center",
// // // //           gap: 16,
// // // //           marginBottom: 32,
// // // //         }}
// // // //       >
// // // //         <Avatar
// // // //           name={senderName}
// // // //           senderId={sender._id}
// // // //           profilePicture={sender.profilePicture}
// // // //           size={52}
// // // //         />
// // // //         <div style={{ flex: 1 }}>
// // // //           <p
// // // //             style={{
// // // //               fontSize: 17,
// // // //               fontWeight: 600,
// // // //               color: "#f0f0f0",
// // // //               marginBottom: 3,
// // // //             }}
// // // //           >
// // // //             {senderName}
// // // //           </p>
// // // //         </div>
// // // //         <span style={{ fontSize: 11, color: "#303030" }}>{time} ago</span>
// // // //       </div>

// // // //       {/* Message */}
// // // //       <div
// // // //         style={{
// // // //           background: "#0f0f0f",
// // // //           border: "1px solid #1a1a1a",
// // // //           borderRadius: 12,
// // // //           padding: "18px 20px",
// // // //           marginBottom: 24,
// // // //         }}
// // // //       >
// // // //         <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7 }}>
// // // //           <span style={{ color: "#ccc", fontWeight: 500 }}>{senderName}</span>{" "}
// // // //           {message}.
// // // //         </p>
// // // //       </div>

// // // //       {/* Accept / Decline */}
// // // //       {isPending && (
// // // //         <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
// // // //           <button
// // // //             onClick={() => onAccept(notif._id)}
// // // //             style={{
// // // //               ...btnStyle("primary"),
// // // //               flex: 1,
// // // //               padding: "11px 0",
// // // //               fontSize: 13,
// // // //               borderRadius: 10,
// // // //             }}
// // // //           >
// // // //             Accept Request
// // // //           </button>
// // // //           <button
// // // //             onClick={() => onDecline(notif._id)}
// // // //             style={{
// // // //               ...btnStyle("ghost"),
// // // //               flex: 1,
// // // //               padding: "11px 0",
// // // //               fontSize: 13,
// // // //               borderRadius: 10,
// // // //             }}
// // // //           >
// // // //             Decline
// // // //           </button>
// // // //         </div>
// // // //       )}

// // // //       {/* Delete button */}
// // // //       <button
// // // //         onClick={() => onDelete(notif._id)}
// // // //         style={{
// // // //           ...btnStyle("danger"),
// // // //           width: "100%",
// // // //           padding: "10px 0",
// // // //           fontSize: 13,
// // // //           borderRadius: 10,
// // // //           marginBottom: 28,
// // // //         }}
// // // //       >
// // // //         Delete notification
// // // //       </button>

// // // //       {/* Meta chips */}
// // // //       <div
// // // //         style={{
// // // //           borderTop: "1px solid #141414",
// // // //           paddingTop: 20,
// // // //           display: "flex",
// // // //           gap: 8,
// // // //           flexWrap: "wrap",
// // // //         }}
// // // //       >
// // // //         <Chip label={category} />
// // // //         <Chip label={notif.read ? "Read" : "Unread"} dim={notif.read} />
// // // //         {notif.status && notif.status !== "pending" && (
// // // //           <Chip label={notif.status} />
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── Skeleton card ────────────────────────────────────────────────────────────

// // // // function SkeletonCard() {
// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         borderRadius: 12,
// // // //         padding: "12px 14px",
// // // //         display: "flex",
// // // //         gap: 11,
// // // //         border: "1px solid #161616",
// // // //       }}
// // // //     >
// // // //       <div
// // // //         style={{
// // // //           width: 38,
// // // //           height: 38,
// // // //           borderRadius: "50%",
// // // //           background: "#181818",
// // // //           flexShrink: 0,
// // // //         }}
// // // //       />
// // // //       <div
// // // //         style={{
// // // //           flex: 1,
// // // //           display: "flex",
// // // //           flexDirection: "column",
// // // //           gap: 7,
// // // //           justifyContent: "center",
// // // //         }}
// // // //       >
// // // //         <div
// // // //           style={{
// // // //             height: 11,
// // // //             width: "45%",
// // // //             borderRadius: 6,
// // // //             background: "#181818",
// // // //           }}
// // // //         />
// // // //         <div
// // // //           style={{
// // // //             height: 10,
// // // //             width: "70%",
// // // //             borderRadius: 6,
// // // //             background: "#141414",
// // // //           }}
// // // //         />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── NotifList ────────────────────────────────────────────────────────────────

// // // // function NotifList({
// // // //   filtered,
// // // //   activeTab,
// // // //   setActiveTab,
// // // //   unreadCount,
// // // //   clearCategory,
// // // //   selected,
// // // //   setSelected,
// // // //   markRead,
// // // //   handleAccept,
// // // //   handleDecline,
// // // //   compact,
// // // //   loading,
// // // // }) {
// // // //   const todayItems = filtered.filter((n) => !isYesterday(n.createdAt));
// // // //   const yesterdayItems = filtered.filter((n) => isYesterday(n.createdAt));
// // // //   const hasAny = filtered.length > 0;

// // // //   const DateLabel = ({ text }) => (
// // // //     <p
// // // //       style={{
// // // //         fontSize: 10.5,
// // // //         color: "#333",
// // // //         padding: "8px 2px 4px",
// // // //         fontWeight: 600,
// // // //         letterSpacing: "0.06em",
// // // //         textTransform: "uppercase",
// // // //       }}
// // // //     >
// // // //       {text}
// // // //     </p>
// // // //   );

// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         display: "flex",
// // // //         flexDirection: "column",
// // // //         height: "100%",
// // // //         overflow: "hidden",
// // // //       }}
// // // //     >
// // // //       {/* Header */}
// // // //       <div
// // // //         style={{
// // // //           padding: compact ? "14px 14px 10px" : "18px 16px 12px",
// // // //           borderBottom: "1px solid #181818",
// // // //           flexShrink: 0,
// // // //         }}
// // // //       >
// // // //         <div
// // // //           style={{
// // // //             display: "flex",
// // // //             alignItems: "center",
// // // //             justifyContent: "space-between",
// // // //             marginBottom: 14,
// // // //           }}
// // // //         >
// // // //           <h1
// // // //             style={{
// // // //               fontSize: compact ? 15 : 17,
// // // //               fontWeight: 600,
// // // //               color: "#e0e0e0",
// // // //               letterSpacing: "-0.02em",
// // // //             }}
// // // //           >
// // // //             Notifications
// // // //           </h1>
// // // //           <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
// // // //             {unreadCount > 0 && (
// // // //               <span
// // // //                 style={{
// // // //                   fontSize: 11,
// // // //                   background: "#1c1840",
// // // //                   color: "#8a80d8",
// // // //                   padding: "3px 9px",
// // // //                   borderRadius: 20,
// // // //                   border: "1px solid #2a2560",
// // // //                 }}
// // // //               >
// // // //                 {unreadCount}
// // // //               </span>
// // // //             )}
// // // //             {/* "Clear all" deletes all notifications in the current tab/category */}
// // // //             {hasAny && (
// // // //               <button
// // // //                 onClick={clearCategory}
// // // //                 style={{
// // // //                   fontSize: 11,
// // // //                   color: "#555",
// // // //                   background: "transparent",
// // // //                   border: "1px solid #222",
// // // //                   borderRadius: 7,
// // // //                   padding: "4px 9px",
// // // //                   cursor: "pointer",
// // // //                   fontFamily: "inherit",
// // // //                 }}
// // // //                 title={
// // // //                   activeTab === "All"
// // // //                     ? "Delete all notifications"
// // // //                     : `Delete all ${activeTab.toLowerCase()} notifications`
// // // //                 }
// // // //               >
// // // //                 Clear {activeTab === "All" ? "all" : activeTab.toLowerCase()}
// // // //               </button>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         {/* Tabs */}
// // // //         <div
// // // //           style={{
// // // //             display: "flex",
// // // //             gap: 5,
// // // //             overflowX: "auto",
// // // //             scrollbarWidth: "none",
// // // //           }}
// // // //         >
// // // //           {TABS.map((tab) => (
// // // //             <button
// // // //               key={tab}
// // // //               onClick={() => setActiveTab(tab)}
// // // //               style={{
// // // //                 flexShrink: 0,
// // // //                 fontSize: 11.5,
// // // //                 padding: "4px 11px",
// // // //                 borderRadius: 20,
// // // //                 cursor: "pointer",
// // // //                 border: "1px solid",
// // // //                 fontFamily: "inherit",
// // // //                 transition: "all 0.15s",
// // // //                 ...(activeTab === tab
// // // //                   ? {
// // // //                       background: "#e0e0e0",
// // // //                       color: "#0d0d0d",
// // // //                       borderColor: "#e0e0e0",
// // // //                       fontWeight: 600,
// // // //                     }
// // // //                   : {
// // // //                       background: "transparent",
// // // //                       color: "#444",
// // // //                       borderColor: "#1e1e1e",
// // // //                     }),
// // // //               }}
// // // //             >
// // // //               {tab}
// // // //             </button>
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       {/* List */}
// // // //       <div
// // // //         style={{
// // // //           flex: 1,
// // // //           overflowY: "auto",
// // // //           padding: "8px 10px",
// // // //           display: "flex",
// // // //           flexDirection: "column",
// // // //           gap: 3,
// // // //           scrollbarWidth: "thin",
// // // //           scrollbarColor: "#1e1e1e transparent",
// // // //         }}
// // // //       >
// // // //         {loading ? (
// // // //           <div
// // // //             style={{
// // // //               display: "flex",
// // // //               flexDirection: "column",
// // // //               gap: 6,
// // // //               padding: "8px 0",
// // // //             }}
// // // //           >
// // // //             {[...Array(5)].map((_, i) => (
// // // //               <SkeletonCard key={i} />
// // // //             ))}
// // // //           </div>
// // // //         ) : filtered.length === 0 ? (
// // // //           <p
// // // //             style={{
// // // //               textAlign: "center",
// // // //               padding: "52px 0",
// // // //               color: "#2e2e2e",
// // // //               fontSize: 13,
// // // //             }}
// // // //           >
// // // //             Nothing here yet
// // // //           </p>
// // // //         ) : (
// // // //           <>
// // // //             {todayItems.length > 0 && (
// // // //               <>
// // // //                 {activeTab === "All" && <DateLabel text="Today" />}
// // // //                 {todayItems.map((n) => (
// // // //                   <NotificationCard
// // // //                     key={n._id}
// // // //                     notif={n}
// // // //                     selected={selected}
// // // //                     compact={compact}
// // // //                     onSelect={setSelected}
// // // //                     onRead={markRead}
// // // //                     onAccept={handleAccept}
// // // //                     onDecline={handleDecline}
// // // //                   />
// // // //                 ))}
// // // //               </>
// // // //             )}
// // // //             {yesterdayItems.length > 0 && (
// // // //               <>
// // // //                 {activeTab === "All" && <DateLabel text="Yesterday" />}
// // // //                 {yesterdayItems.map((n) => (
// // // //                   <NotificationCard
// // // //                     key={n._id}
// // // //                     notif={n}
// // // //                     selected={selected}
// // // //                     compact={compact}
// // // //                     onSelect={setSelected}
// // // //                     onRead={markRead}
// // // //                     onAccept={handleAccept}
// // // //                     onDecline={handleDecline}
// // // //                   />
// // // //                 ))}
// // // //               </>
// // // //             )}
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── Main Page ────────────────────────────────────────────────────────────────

// // // // export default function NotificationsPage() {
// // // //   const width = useWindowWidth();
// // // //   const [notifications, setNotifications] = useState([]);
// // // //   const [activeTab, setActiveTab] = useState("All");
// // // //   const [selected, setSelected] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);

// // // //   // ── Fetch ──────────────────────────────────────────────────────────────────
// // // //   const fetchNotifications = useCallback(async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const res = await fetchData("/api/notifications", {
// // // //         credentials: "include",
// // // //       });
// // // //       if (!res.ok) throw new Error("Failed to fetch notifications");
// // // //       setNotifications(await res.json());
// // // //     } catch (err) {
// // // //       setError(err.message);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     fetchNotifications();
// // // //   }, [fetchNotifications]);

// // // //   // ── Layout breakpoints ─────────────────────────────────────────────────────
// // // //   const isMobile = width < 768;
// // // //   const isTablet = width >= 768 && width < 1100;

// // // //   // ── Derived state ──────────────────────────────────────────────────────────
// // // //   const filtered =
// // // //     activeTab === "All"
// // // //       ? notifications
// // // //       : notifications.filter((n) => TAB_TYPE_MAP[activeTab]?.includes(n.type));

// // // //   const unreadCount = notifications.filter((n) => !n.read).length;

// // // //   // ── Handlers ───────────────────────────────────────────────────────────────

// // // //   const markRead = async (id) => {
// // // //     setNotifications((prev) =>
// // // //       prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
// // // //     );
// // // //     try {
// // // //       await fetchData(`/api/notifications/${id}/read`, {
// // // //         method: "PATCH",
// // // //         credentials: "include",
// // // //       });
// // // //     } catch (err) {
// // // //       console.error("Failed to mark as read:", err);
// // // //     }
// // // //   };

// // // //   // "Clear" button: marks all in category as read, then deletes them
// // // //   const clearCategory = async () => {
// // // //     const typesToClear = activeTab === "All" ? null : TAB_TYPE_MAP[activeTab];
// // // //     const typeParam = typesToClear ? `?types=${typesToClear.join(",")}` : "";

// // // //     // Optimistic update — remove from state immediately
// // // //     setNotifications((prev) =>
// // // //       typesToClear ? prev.filter((n) => !typesToClear.includes(n.type)) : [],
// // // //     );
// // // //     setSelected(null);

// // // //     try {
// // // //       // Mark as read first, then delete
// // // //       await fetchData(`/api/notifications/read-all${typeParam}`, {
// // // //         method: "POST",
// // // //         credentials: "include",
// // // //       });
// // // //       await fetchData(`/api/notifications${typeParam}`, {
// // // //         method: "DELETE",
// // // //         credentials: "include",
// // // //       });
// // // //     } catch (err) {
// // // //       console.error("Failed to clear notifications:", err);
// // // //       fetchNotifications();
// // // //     }
// // // //   };

// // // //   // Delete a single notification
// // // //   const handleDelete = async (id) => {
// // // //     setNotifications((prev) => prev.filter((n) => n._id !== id));
// // // //     if (selected?._id === id) setSelected(null);
// // // //     try {
// // // //       await fetchData(`/api/notifications/${id}`, {
// // // //         method: "DELETE",
// // // //         credentials: "include",
// // // //       });
// // // //     } catch (err) {
// // // //       console.error("Failed to delete notification:", err);
// // // //       fetchNotifications();
// // // //     }
// // // //   };

// // // //   // Accept follow request — mark as accepted (buttons disappear), keep in list
// // // //   const handleAccept = async (id) => {
// // // //     setNotifications((prev) =>
// // // //       prev.map((n) => (n._id === id ? { ...n, status: "accepted" } : n)),
// // // //     );
// // // //     if (selected?._id === id)
// // // //       setSelected((s) => ({ ...s, status: "accepted" }));
// // // //     try {
// // // //       await fetchData(`/api/notifications/${id}/accept`, {
// // // //         method: "POST",
// // // //         credentials: "include",
// // // //       });
// // // //     } catch (err) {
// // // //       if (err.status === 404) {
// // // //         // Sender already cancelled — remove the stale notification silently
// // // //         setNotifications((prev) => prev.filter((n) => n._id !== id));
// // // //         if (selected?._id === id) setSelected(null);
// // // //         return;
// // // //       }
// // // //       console.error("Accept error:", err);
// // // //       fetchNotifications();
// // // //     }
// // // //   };

// // // //   const handleDecline = async (id) => {
// // // //     setNotifications((prev) => prev.filter((n) => n._id !== id));
// // // //     if (selected?._id === id) setSelected(null);
// // // //     try {
// // // //       await fetchData(`/api/notifications/${id}/decline`, {
// // // //         method: "POST",
// // // //         credentials: "include",
// // // //       });
// // // //     } catch (err) {
// // // //       if (err.status === 404) {
// // // //         // Sender already cancelled — UI is already correct, nothing to do
// // // //         return;
// // // //       }
// // // //       console.error("Decline error:", err);
// // // //       fetchNotifications();
// // // //     }
// // // //   };

// // // //   // ── Shared list props ──────────────────────────────────────────────────────
// // // //   const listProps = {
// // // //     filtered,
// // // //     activeTab,
// // // //     setActiveTab,
// // // //     unreadCount,
// // // //     clearCategory,
// // // //     selected,
// // // //     setSelected,
// // // //     markRead,
// // // //     handleAccept,
// // // //     handleDecline,
// // // //     loading,
// // // //   };

// // // //   const pageStyle = {
// // // //     fontFamily: "'DM Sans', -apple-system, sans-serif",
// // // //     background: "#0a0a0a",
// // // //     color: "#e0e0e0",
// // // //   };

// // // //   // ── Error state ────────────────────────────────────────────────────────────
// // // //   if (error) {
// // // //     return (
// // // //       <div
// // // //         style={{
// // // //           ...pageStyle,
// // // //           minHeight: "100vh",
// // // //           display: "flex",
// // // //           alignItems: "center",
// // // //           justifyContent: "center",
// // // //         }}
// // // //       >
// // // //         <div style={{ textAlign: "center" }}>
// // // //           <p style={{ color: "#c0392b", fontSize: 14, marginBottom: 12 }}>
// // // //             Failed to load notifications
// // // //           </p>
// // // //           <button
// // // //             onClick={fetchNotifications}
// // // //             style={{ ...btnStyle("primary"), padding: "8px 20px" }}
// // // //           >
// // // //             Retry
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // ── Mobile ─────────────────────────────────────────────────────────────────
// // // //   if (isMobile) {
// // // //     return (
// // // //       <div style={{ ...pageStyle, minHeight: "100vh" }}>
// // // //         <div style={{ background: "#0d0d0d", minHeight: "100vh" }}>
// // // //           <NotifList {...listProps} compact={false} />
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // ── Tablet ─────────────────────────────────────────────────────────────────
// // // //   if (isTablet) {
// // // //     return (
// // // //       <div
// // // //         style={{
// // // //           ...pageStyle,
// // // //           height: "100vh",
// // // //           display: "flex",
// // // //           overflow: "hidden",
// // // //         }}
// // // //       >
// // // //         <div
// // // //           style={{
// // // //             width: 320,
// // // //             background: "#0d0d0d",
// // // //             borderRight: "1px solid #181818",
// // // //             flexShrink: 0,
// // // //             display: "flex",
// // // //             flexDirection: "column",
// // // //           }}
// // // //         >
// // // //           <NotifList {...listProps} compact={true} />
// // // //         </div>
// // // //         <div
// // // //           style={{
// // // //             flex: 1,
// // // //             background: "#0a0a0a",
// // // //             display: "flex",
// // // //             flexDirection: "column",
// // // //             overflow: "hidden",
// // // //           }}
// // // //         >
// // // //           <DetailPanel
// // // //             notif={selected}
// // // //             onAccept={handleAccept}
// // // //             onDecline={handleDecline}
// // // //             onDelete={handleDelete}
// // // //           />
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // ── Desktop ────────────────────────────────────────────────────────────────
// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         ...pageStyle,
// // // //         height: "100vh",
// // // //         display: "flex",
// // // //         overflow: "hidden",
// // // //       }}
// // // //     >
// // // //       <div
// // // //         style={{
// // // //           width: 360,
// // // //           background: "#0d0d0d",
// // // //           borderRight: "1px solid #181818",
// // // //           flexShrink: 0,
// // // //           display: "flex",
// // // //           flexDirection: "column",
// // // //         }}
// // // //       >
// // // //         <NotifList {...listProps} compact={true} />
// // // //       </div>
// // // //       <div
// // // //         style={{
// // // //           flex: 1,
// // // //           background: "#0a0a0a",
// // // //           display: "flex",
// // // //           flexDirection: "column",
// // // //           overflow: "hidden",
// // // //         }}
// // // //       >
// // // //         <DetailPanel
// // // //           notif={selected}
// // // //           onAccept={handleAccept}
// // // //           onDecline={handleDecline}
// // // //           onDelete={handleDelete}
// // // //         />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import React, {
// // //   useState,
// // //   useEffect,
// // //   useCallback,
// // //   useLayoutEffect,
// // //   useRef,
// // // } from "react";
// // // import fetchData from "../utils/fetchData";

// // // /**
// // //  * Measures the combined height of the sticky header and bottom footer,
// // //  * then returns `calc(100dvh - {headerH}px - {footerH}px)` so this page
// // //  * never overflows or under-fills the available viewport.
// // //  *
// // //  * Priority order:
// // //  *   1. CSS custom properties --header-h / --footer-h set by the layout root.
// // //  *   2. Direct DOM measurement via the ref callbacks passed back to the caller.
// // //  *   3. Automatic DOM query fallback (header tag + last fixed/sticky child).
// // //  */
// // // function useAvailableHeight() {
// // //   const [height, setHeight] = useState("100dvh");

// // //   useLayoutEffect(() => {
// // //     function measure() {
// // //       // 1. CSS vars (fastest — set these in your layout if you want zero jank)
// // //       const style = getComputedStyle(document.documentElement);
// // //       const cssH = parseFloat(style.getPropertyValue("--header-h"));
// // //       const cssF = parseFloat(style.getPropertyValue("--footer-h"));
// // //       if (!isNaN(cssH) && !isNaN(cssF)) {
// // //         setHeight(`calc(100dvh - ${cssH}px - ${cssF}px)`);
// // //         return;
// // //       }

// // //       // 2. DOM measurement — your header is <header>, your footer is a plain
// // //       //    <div> that is the last child of the layout root. We look for the
// // //       //    last sibling of the page content that sits below it.
// // //       const headerEl = document.querySelector("header");

// // //       // Footer: your component renders a plain div with border-t, no semantic
// // //       // tag. We grab it as the last element-child of <body> (or layout wrapper)
// // //       // that is NOT the header and NOT the main content wrapper.
// // //       const allBodyChildren = Array.from(document.body.children);
// // //       // Walk backwards — the footer is typically the last child
// // //       const footerEl = allBodyChildren
// // //         .slice()
// // //         .reverse()
// // //         .find(
// // //           (el) =>
// // //             el !== headerEl &&
// // //             el.tagName !== "SCRIPT" &&
// // //             el.tagName !== "STYLE" &&
// // //             // Only count it if it's visually at the bottom (short element)
// // //             el.getBoundingClientRect().height < 120,
// // //         );

// // //       const hh = headerEl?.getBoundingClientRect().height ?? 0;
// // //       const fh = footerEl?.getBoundingClientRect().height ?? 0;

// // //       setHeight(`calc(100dvh - ${Math.round(hh)}px - ${Math.round(fh)}px)`);
// // //     }

// // //     measure();

// // //     // Re-measure if header or footer resize (e.g. mobile browser chrome toggle)
// // //     const ro =
// // //       typeof ResizeObserver !== "undefined"
// // //         ? new ResizeObserver(measure)
// // //         : null;

// // //     if (ro) {
// // //       const headerEl = document.querySelector("header");
// // //       if (headerEl) ro.observe(headerEl);
// // //       // Also observe body so any footer change is caught
// // //       ro.observe(document.body);
// // //     }

// // //     return () => ro?.disconnect();
// // //   }, []);

// // //   return height;
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────

// // // const TABS = ["All", "Likes", "Comments", "Follows", "Messages", "Mentions"];

// // // const TAB_TYPE_MAP = {
// // //   Likes: ["like"],
// // //   Comments: ["comment"],
// // //   Follows: ["follow_request", "follow_accepted"],
// // //   Messages: ["message"],
// // //   Mentions: ["mention"],
// // // };

// // // const AVATAR_PALETTE = [
// // //   { bg: "#1a1033", fg: "#9d8fef" },
// // //   { bg: "#0c2820", fg: "#4ec9a0" },
// // //   { bg: "#2a1008", fg: "#e8845a" },
// // //   { bg: "#0b1c30", fg: "#6aade8" },
// // //   { bg: "#271a04", fg: "#e8952a" },
// // //   { bg: "#28091a", fg: "#e87daa" },
// // // ];

// // // function getInitials(name = "") {
// // //   return (
// // //     name
// // //       .trim()
// // //       .split(/\s+/)
// // //       .map((w) => w[0] ?? "")
// // //       .join("")
// // //       .slice(0, 2)
// // //       .toUpperCase() || "?"
// // //   );
// // // }

// // // function getAvatarStyle(id = "") {
// // //   const hash = String(id)
// // //     .split("")
// // //     .reduce((acc, c) => acc + c.charCodeAt(0), 0);
// // //   return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
// // // }

// // // function formatTime(dateStr) {
// // //   const diff = Date.now() - new Date(dateStr).getTime();
// // //   const mins = Math.floor(diff / 60_000);
// // //   if (mins < 1) return "now";
// // //   if (mins < 60) return `${mins}m`;
// // //   const hrs = Math.floor(mins / 60);
// // //   if (hrs < 24) return `${hrs}h`;
// // //   const days = Math.floor(hrs / 24);
// // //   if (days === 1) return "yesterday";
// // //   return `${days}d`;
// // // }

// // // function isYesterday(dateStr) {
// // //   const diff = Math.floor(
// // //     (Date.now() - new Date(dateStr).getTime()) / 86_400_000,
// // //   );
// // //   return diff === 1;
// // // }

// // // function getNotifMessage(type) {
// // //   switch (type) {
// // //     case "follow_request":
// // //       return "sent you a follow request";
// // //     case "follow_accepted":
// // //       return "accepted your follow request";
// // //     case "like":
// // //       return "liked your post";
// // //     case "comment":
// // //       return "commented on your post";
// // //     case "message":
// // //       return "sent you a message";
// // //     case "mention":
// // //       return "mentioned you in a post";
// // //     default:
// // //       return `sent you a ${type}`;
// // //   }
// // // }

// // // function getCategory(type) {
// // //   switch (type) {
// // //     case "follow_request":
// // //     case "follow_accepted":
// // //       return "follows";
// // //     case "like":
// // //       return "likes";
// // //     case "comment":
// // //       return "comments";
// // //     case "message":
// // //       return "messages";
// // //     case "mention":
// // //       return "mentions";
// // //     default:
// // //       return type;
// // //   }
// // // }

// // // function useWindowWidth() {
// // //   const [w, setW] = useState(
// // //     typeof window !== "undefined" ? window.innerWidth : 1200,
// // //   );
// // //   useEffect(() => {
// // //     const handler = () => setW(window.innerWidth);
// // //     window.addEventListener("resize", handler);
// // //     return () => window.removeEventListener("resize", handler);
// // //   }, []);
// // //   return w;
// // // }

// // // function btnStyle(variant, extra = {}) {
// // //   const base = {
// // //     borderRadius: 8,
// // //     fontSize: 12,
// // //     fontWeight: 500,
// // //     cursor: "pointer",
// // //     fontFamily: "inherit",
// // //     transition: "opacity 0.15s",
// // //     ...extra,
// // //   };
// // //   switch (variant) {
// // //     case "primary":
// // //       return { ...base, background: "#4a41a8", color: "#fff", border: "none" };
// // //     case "ghost":
// // //       return {
// // //         ...base,
// // //         background: "transparent",
// // //         color: "#888",
// // //         border: "1px solid #2a2a2a",
// // //       };
// // //     case "danger":
// // //       return {
// // //         ...base,
// // //         background: "transparent",
// // //         color: "#c0392b",
// // //         border: "1px solid #2a1010",
// // //       };
// // //     default:
// // //       return {
// // //         ...base,
// // //         background: "transparent",
// // //         color: "#666",
// // //         border: "1px solid #2a2a2a",
// // //       };
// // //   }
// // // }

// // // function Avatar({ name, senderId, profilePicture, size = 40 }) {
// // //   const { bg, fg } = getAvatarStyle(senderId);
// // //   if (profilePicture) {
// // //     return (
// // //       <img
// // //         src={profilePicture}
// // //         alt={name}
// // //         style={{
// // //           width: size,
// // //           height: size,
// // //           borderRadius: "50%",
// // //           objectFit: "cover",
// // //           flexShrink: 0,
// // //         }}
// // //       />
// // //     );
// // //   }
// // //   return (
// // //     <div
// // //       style={{
// // //         width: size,
// // //         height: size,
// // //         borderRadius: "50%",
// // //         background: bg,
// // //         color: fg,
// // //         flexShrink: 0,
// // //         display: "flex",
// // //         alignItems: "center",
// // //         justifyContent: "center",
// // //         fontSize: size * 0.35,
// // //         fontWeight: 700,
// // //         letterSpacing: "-0.02em",
// // //       }}
// // //     >
// // //       {getInitials(name)}
// // //     </div>
// // //   );
// // // }

// // // function NotificationCard({
// // //   notif,
// // //   selected,
// // //   onSelect,
// // //   onRead,
// // //   onAccept,
// // //   onDecline,
// // //   compact,
// // // }) {
// // //   const isSelected = selected?._id === notif._id;
// // //   const sender = notif.sender ?? {};
// // //   const senderName = sender.username || "Unknown";
// // //   const message = getNotifMessage(notif.type);
// // //   const time = formatTime(notif.createdAt);
// // //   const isPending =
// // //     notif.type === "follow_request" && notif.status === "pending";

// // //   return (
// // //     <div
// // //       onClick={() => {
// // //         onSelect(notif);
// // //         if (!notif.read) onRead(notif._id);
// // //       }}
// // //       style={{
// // //         position: "relative",
// // //         borderRadius: 12,
// // //         padding: compact ? "10px 12px" : "12px 14px",
// // //         display: "flex",
// // //         gap: 11,
// // //         cursor: "pointer",
// // //         background: isSelected ? "#1c1840" : "transparent",
// // //         border: `1px solid ${isSelected ? "#4a41a8" : notif.read ? "#1a1a1a" : "#2e2a5e"}`,
// // //         transition: "background 0.15s, border-color 0.15s",
// // //       }}
// // //       onMouseEnter={(e) => {
// // //         if (!isSelected) e.currentTarget.style.background = "#141414";
// // //       }}
// // //       onMouseLeave={(e) => {
// // //         if (!isSelected) e.currentTarget.style.background = "transparent";
// // //       }}
// // //     >
// // //       <Avatar
// // //         name={senderName}
// // //         senderId={sender._id}
// // //         profilePicture={sender.profilePicture}
// // //         size={compact ? 34 : 38}
// // //       />

// // //       <div style={{ flex: 1, minWidth: 0 }}>
// // //         <div
// // //           style={{
// // //             display: "flex",
// // //             justifyContent: "space-between",
// // //             alignItems: "baseline",
// // //             marginBottom: 2,
// // //           }}
// // //         >
// // //           <span
// // //             style={{
// // //               fontSize: 13,
// // //               fontWeight: 600,
// // //               color: "#e0e0e0",
// // //               overflow: "hidden",
// // //               textOverflow: "ellipsis",
// // //               whiteSpace: "nowrap",
// // //               maxWidth: "68%",
// // //             }}
// // //           >
// // //             {senderName}
// // //           </span>
// // //           <span style={{ fontSize: 11, color: "#404040", flexShrink: 0 }}>
// // //             {time}
// // //           </span>
// // //         </div>

// // //         <p
// // //           style={{
// // //             margin: 0,
// // //             fontSize: 12.5,
// // //             color: "#555",
// // //             lineHeight: 1.45,
// // //             overflow: "hidden",
// // //             textOverflow: "ellipsis",
// // //             whiteSpace: compact ? "nowrap" : "normal",
// // //           }}
// // //         >
// // //           {message}
// // //         </p>

// // //         {isPending && !compact && (
// // //           <div style={{ display: "flex", gap: 6, marginTop: 9 }}>
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 onAccept(notif._id);
// // //               }}
// // //               style={{ ...btnStyle("primary"), flex: 1, padding: "7px 0" }}
// // //             >
// // //               Accept
// // //             </button>
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 onDecline(notif._id);
// // //               }}
// // //               style={{ ...btnStyle("ghost"), flex: 1, padding: "7px 0" }}
// // //             >
// // //               Decline
// // //             </button>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {!notif.read && (
// // //         <div
// // //           style={{
// // //             width: 7,
// // //             height: 7,
// // //             borderRadius: "50%",
// // //             background: "#7c6fe0",
// // //             position: "absolute",
// // //             top: 14,
// // //             right: 14,
// // //             boxShadow: "0 0 6px #7c6fe066",
// // //           }}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // function Chip({ label, dim }) {
// // //   return (
// // //     <span
// // //       style={{
// // //         fontSize: 11,
// // //         padding: "4px 11px",
// // //         borderRadius: 20,
// // //         background: dim ? "#141414" : "#1c1840",
// // //         color: dim ? "#383838" : "#8a80d8",
// // //         border: `1px solid ${dim ? "#1e1e1e" : "#2a2560"}`,
// // //         textTransform: "capitalize",
// // //         letterSpacing: "0.02em",
// // //       }}
// // //     >
// // //       {label}
// // //     </span>
// // //   );
// // // }

// // // function DetailPanel({ notif, onAccept, onDecline, onDelete }) {
// // //   if (!notif) {
// // //     return (
// // //       <div
// // //         style={{
// // //           flex: 1,
// // //           display: "flex",
// // //           flexDirection: "column",
// // //           alignItems: "center",
// // //           justifyContent: "center",
// // //           gap: 12,
// // //         }}
// // //       >
// // //         <div
// // //           style={{
// // //             width: 44,
// // //             height: 44,
// // //             borderRadius: "50%",
// // //             border: "1px solid #1e1e1e",
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "center",
// // //           }}
// // //         >
// // //           <svg
// // //             width="18"
// // //             height="18"
// // //             viewBox="0 0 24 24"
// // //             fill="none"
// // //             stroke="#2a2a2a"
// // //             strokeWidth="1.5"
// // //           >
// // //             <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
// // //             <path d="M13.73 21a2 2 0 0 1-3.46 0" />
// // //           </svg>
// // //         </div>
// // //         <p style={{ fontSize: 12, color: "#2e2e2e", margin: 0 }}>
// // //           Select a notification
// // //         </p>
// // //       </div>
// // //     );
// // //   }

// // //   const sender = notif.sender ?? {};
// // //   const senderName = sender.username || "Unknown";
// // //   const message = getNotifMessage(notif.type);
// // //   const category = getCategory(notif.type);
// // //   const time = formatTime(notif.createdAt);
// // //   const isPending =
// // //     notif.type === "follow_request" && notif.status === "pending";
// // //   const timeLabel =
// // //     time === "now" || time === "yesterday" ? time : `${time} ago`;

// // //   return (
// // //     <div style={{ flex: 1, padding: "36px 40px", overflowY: "auto" }}>
// // //       <div
// // //         style={{
// // //           display: "flex",
// // //           alignItems: "center",
// // //           gap: 16,
// // //           marginBottom: 32,
// // //         }}
// // //       >
// // //         <Avatar
// // //           name={senderName}
// // //           senderId={sender._id}
// // //           profilePicture={sender.profilePicture}
// // //           size={52}
// // //         />
// // //         <div style={{ flex: 1 }}>
// // //           <p
// // //             style={{
// // //               margin: 0,
// // //               fontSize: 17,
// // //               fontWeight: 600,
// // //               color: "#f0f0f0",
// // //             }}
// // //           >
// // //             {senderName}
// // //           </p>
// // //         </div>
// // //         <span style={{ fontSize: 11, color: "#303030" }}>{timeLabel}</span>
// // //       </div>

// // //       <div
// // //         style={{
// // //           background: "#0f0f0f",
// // //           border: "1px solid #1a1a1a",
// // //           borderRadius: 12,
// // //           padding: "18px 20px",
// // //           marginBottom: 24,
// // //         }}
// // //       >
// // //         <p style={{ margin: 0, fontSize: 14, color: "#777", lineHeight: 1.7 }}>
// // //           <span style={{ color: "#ccc", fontWeight: 500 }}>{senderName}</span>{" "}
// // //           {message}.
// // //         </p>
// // //       </div>

// // //       {isPending && (
// // //         <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
// // //           <button
// // //             onClick={() => onAccept(notif._id)}
// // //             style={{
// // //               ...btnStyle("primary"),
// // //               flex: 1,
// // //               padding: "11px 0",
// // //               fontSize: 13,
// // //               borderRadius: 10,
// // //             }}
// // //           >
// // //             Accept Request
// // //           </button>
// // //           <button
// // //             onClick={() => onDecline(notif._id)}
// // //             style={{
// // //               ...btnStyle("ghost"),
// // //               flex: 1,
// // //               padding: "11px 0",
// // //               fontSize: 13,
// // //               borderRadius: 10,
// // //             }}
// // //           >
// // //             Decline
// // //           </button>
// // //         </div>
// // //       )}

// // //       <button
// // //         onClick={() => onDelete(notif._id)}
// // //         style={{
// // //           ...btnStyle("danger"),
// // //           width: "100%",
// // //           padding: "10px 0",
// // //           fontSize: 13,
// // //           borderRadius: 10,
// // //           marginBottom: 28,
// // //         }}
// // //       >
// // //         Delete notification
// // //       </button>

// // //       <div
// // //         style={{
// // //           borderTop: "1px solid #141414",
// // //           paddingTop: 20,
// // //           display: "flex",
// // //           gap: 8,
// // //           flexWrap: "wrap",
// // //         }}
// // //       >
// // //         <Chip label={category} />
// // //         <Chip label={notif.read ? "Read" : "Unread"} dim={notif.read} />
// // //         {notif.status && notif.status !== "pending" && (
// // //           <Chip label={notif.status} />
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function SkeletonCard() {
// // //   return (
// // //     <div
// // //       style={{
// // //         borderRadius: 12,
// // //         padding: "12px 14px",
// // //         display: "flex",
// // //         gap: 11,
// // //         border: "1px solid #161616",
// // //       }}
// // //     >
// // //       <div
// // //         style={{
// // //           width: 38,
// // //           height: 38,
// // //           borderRadius: "50%",
// // //           background: "#181818",
// // //           flexShrink: 0,
// // //         }}
// // //       />
// // //       <div
// // //         style={{
// // //           flex: 1,
// // //           display: "flex",
// // //           flexDirection: "column",
// // //           gap: 7,
// // //           justifyContent: "center",
// // //         }}
// // //       >
// // //         <div
// // //           style={{
// // //             height: 11,
// // //             width: "45%",
// // //             borderRadius: 6,
// // //             background: "#181818",
// // //           }}
// // //         />
// // //         <div
// // //           style={{
// // //             height: 10,
// // //             width: "70%",
// // //             borderRadius: 6,
// // //             background: "#141414",
// // //           }}
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function DateLabel({ text }) {
// // //   return (
// // //     <p
// // //       style={{
// // //         margin: 0,
// // //         fontSize: 10.5,
// // //         color: "#333",
// // //         padding: "8px 2px 4px",
// // //         fontWeight: 600,
// // //         letterSpacing: "0.06em",
// // //         textTransform: "uppercase",
// // //       }}
// // //     >
// // //       {text}
// // //     </p>
// // //   );
// // // }

// // // function NotifList({
// // //   filtered,
// // //   activeTab,
// // //   setActiveTab,
// // //   unreadCount,
// // //   clearCategory,
// // //   selected,
// // //   setSelected,
// // //   markRead,
// // //   handleAccept,
// // //   handleDecline,
// // //   compact,
// // //   loading,
// // // }) {
// // //   const todayItems = filtered.filter((n) => !isYesterday(n.createdAt));
// // //   const yesterdayItems = filtered.filter((n) => isYesterday(n.createdAt));
// // //   const hasAny = filtered.length > 0;

// // //   return (
// // //     <div
// // //       style={{
// // //         display: "flex",
// // //         flexDirection: "column",
// // //         height: "100%",
// // //         overflow: "hidden",
// // //       }}
// // //     >
// // //       <div
// // //         style={{
// // //           padding: compact ? "14px 14px 10px" : "18px 16px 12px",
// // //           borderBottom: "1px solid #181818",
// // //           flexShrink: 0,
// // //         }}
// // //       >
// // //         <div
// // //           style={{
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "space-between",
// // //             marginBottom: 14,
// // //           }}
// // //         >
// // //           <h1
// // //             style={{
// // //               margin: 0,
// // //               fontSize: compact ? 15 : 17,
// // //               fontWeight: 600,
// // //               color: "#e0e0e0",
// // //               letterSpacing: "-0.02em",
// // //             }}
// // //           >
// // //             Notifications
// // //           </h1>
// // //           <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
// // //             {unreadCount > 0 && (
// // //               <span
// // //                 style={{
// // //                   fontSize: 11,
// // //                   background: "#1c1840",
// // //                   color: "#8a80d8",
// // //                   padding: "3px 9px",
// // //                   borderRadius: 20,
// // //                   border: "1px solid #2a2560",
// // //                 }}
// // //               >
// // //                 {unreadCount}
// // //               </span>
// // //             )}
// // //             {hasAny && (
// // //               <button
// // //                 onClick={clearCategory}
// // //                 style={{
// // //                   fontSize: 11,
// // //                   color: "#555",
// // //                   background: "transparent",
// // //                   border: "1px solid #222",
// // //                   borderRadius: 7,
// // //                   padding: "4px 9px",
// // //                   cursor: "pointer",
// // //                   fontFamily: "inherit",
// // //                 }}
// // //                 title={
// // //                   activeTab === "All"
// // //                     ? "Delete all notifications"
// // //                     : `Delete all ${activeTab.toLowerCase()} notifications`
// // //                 }
// // //               >
// // //                 Clear {activeTab === "All" ? "all" : activeTab.toLowerCase()}
// // //               </button>
// // //             )}
// // //           </div>
// // //         </div>

// // //         <div
// // //           style={{
// // //             display: "flex",
// // //             gap: 5,
// // //             overflowX: "auto",
// // //             scrollbarWidth: "none",
// // //           }}
// // //         >
// // //           {TABS.map((tab) => (
// // //             <button
// // //               key={tab}
// // //               onClick={() => setActiveTab(tab)}
// // //               style={{
// // //                 flexShrink: 0,
// // //                 fontSize: 11.5,
// // //                 padding: "4px 11px",
// // //                 borderRadius: 20,
// // //                 cursor: "pointer",
// // //                 border: "1px solid",
// // //                 fontFamily: "inherit",
// // //                 transition: "all 0.15s",
// // //                 ...(activeTab === tab
// // //                   ? {
// // //                       background: "#e0e0e0",
// // //                       color: "#0d0d0d",
// // //                       borderColor: "#e0e0e0",
// // //                       fontWeight: 600,
// // //                     }
// // //                   : {
// // //                       background: "transparent",
// // //                       color: "#444",
// // //                       borderColor: "#1e1e1e",
// // //                     }),
// // //               }}
// // //             >
// // //               {tab}
// // //             </button>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       <div
// // //         style={{
// // //           flex: 1,
// // //           overflowY: "auto",
// // //           padding: "8px 10px",
// // //           display: "flex",
// // //           flexDirection: "column",
// // //           gap: 3,
// // //           scrollbarWidth: "thin",
// // //           scrollbarColor: "#1e1e1e transparent",
// // //         }}
// // //       >
// // //         {loading ? (
// // //           <div
// // //             style={{
// // //               display: "flex",
// // //               flexDirection: "column",
// // //               gap: 6,
// // //               padding: "8px 0",
// // //             }}
// // //           >
// // //             {Array.from({ length: 5 }).map((_, i) => (
// // //               <SkeletonCard key={i} />
// // //             ))}
// // //           </div>
// // //         ) : filtered.length === 0 ? (
// // //           <p
// // //             style={{
// // //               margin: 0,
// // //               textAlign: "center",
// // //               padding: "52px 0",
// // //               color: "#2e2e2e",
// // //               fontSize: 13,
// // //             }}
// // //           >
// // //             Nothing here yet
// // //           </p>
// // //         ) : (
// // //           <>
// // //             {todayItems.length > 0 && (
// // //               <>
// // //                 {activeTab === "All" && <DateLabel text="Today" />}
// // //                 {todayItems.map((n) => (
// // //                   <NotificationCard
// // //                     key={n._id}
// // //                     notif={n}
// // //                     selected={selected}
// // //                     compact={compact}
// // //                     onSelect={setSelected}
// // //                     onRead={markRead}
// // //                     onAccept={handleAccept}
// // //                     onDecline={handleDecline}
// // //                   />
// // //                 ))}
// // //               </>
// // //             )}
// // //             {yesterdayItems.length > 0 && (
// // //               <>
// // //                 {activeTab === "All" && <DateLabel text="Yesterday" />}
// // //                 {yesterdayItems.map((n) => (
// // //                   <NotificationCard
// // //                     key={n._id}
// // //                     notif={n}
// // //                     selected={selected}
// // //                     compact={compact}
// // //                     onSelect={setSelected}
// // //                     onRead={markRead}
// // //                     onAccept={handleAccept}
// // //                     onDecline={handleDecline}
// // //                   />
// // //                 ))}
// // //               </>
// // //             )}
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default function NotificationsPage() {
// // //   const width = useWindowWidth();
// // //   const availableHeight = useAvailableHeight();
// // //   const [notifications, setNotifications] = useState([]);
// // //   const [activeTab, setActiveTab] = useState("All");
// // //   const [selected, setSelected] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   const fetchNotifications = useCallback(async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await fetchData("/api/notifications", {
// // //         credentials: "include",
// // //       });
// // //       if (!res.ok) throw new Error("Failed to fetch notifications");
// // //       setNotifications(await res.json());
// // //     } catch (err) {
// // //       setError(err.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     fetchNotifications();
// // //   }, [fetchNotifications]);

// // //   const isMobile = width < 768;
// // //   const isTablet = width >= 768 && width < 1100;

// // //   const filtered =
// // //     activeTab === "All"
// // //       ? notifications
// // //       : notifications.filter((n) => TAB_TYPE_MAP[activeTab]?.includes(n.type));

// // //   const unreadCount = notifications.filter((n) => !n.read).length;

// // //   const markRead = async (id) => {
// // //     setNotifications((prev) =>
// // //       prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
// // //     );
// // //     try {
// // //       await fetchData(`/api/notifications/${id}/read`, {
// // //         method: "PATCH",
// // //         credentials: "include",
// // //       });
// // //     } catch (err) {
// // //       console.error("Failed to mark as read:", err);
// // //     }
// // //   };

// // //   const clearCategory = async () => {
// // //     const typesToClear = activeTab === "All" ? null : TAB_TYPE_MAP[activeTab];
// // //     const typeParam = typesToClear ? `?types=${typesToClear.join(",")}` : "";
// // //     setNotifications((prev) =>
// // //       typesToClear ? prev.filter((n) => !typesToClear.includes(n.type)) : [],
// // //     );
// // //     setSelected(null);
// // //     try {
// // //       await fetchData(`/api/notifications/read-all${typeParam}`, {
// // //         method: "POST",
// // //         credentials: "include",
// // //       });
// // //       await fetchData(`/api/notifications${typeParam}`, {
// // //         method: "DELETE",
// // //         credentials: "include",
// // //       });
// // //     } catch (err) {
// // //       console.error("Failed to clear notifications:", err);
// // //       fetchNotifications();
// // //     }
// // //   };

// // //   const handleDelete = async (id) => {
// // //     setNotifications((prev) => prev.filter((n) => n._id !== id));
// // //     if (selected?._id === id) setSelected(null);
// // //     try {
// // //       await fetchData(`/api/notifications/${id}`, {
// // //         method: "DELETE",
// // //         credentials: "include",
// // //       });
// // //     } catch (err) {
// // //       console.error("Failed to delete notification:", err);
// // //       fetchNotifications();
// // //     }
// // //   };

// // //   const handleAccept = async (id) => {
// // //     setNotifications((prev) =>
// // //       prev.map((n) => (n._id === id ? { ...n, status: "accepted" } : n)),
// // //     );
// // //     if (selected?._id === id)
// // //       setSelected((s) => ({ ...s, status: "accepted" }));
// // //     try {
// // //       await fetchData(`/api/notifications/${id}/accept`, {
// // //         method: "POST",
// // //         credentials: "include",
// // //       });
// // //     } catch (err) {
// // //       if (err.status === 404) {
// // //         setNotifications((prev) => prev.filter((n) => n._id !== id));
// // //         if (selected?._id === id) setSelected(null);
// // //         return;
// // //       }
// // //       console.error("Accept error:", err);
// // //       fetchNotifications();
// // //     }
// // //   };

// // //   const handleDecline = async (id) => {
// // //     setNotifications((prev) => prev.filter((n) => n._id !== id));
// // //     if (selected?._id === id) setSelected(null);
// // //     try {
// // //       await fetchData(`/api/notifications/${id}/decline`, {
// // //         method: "POST",
// // //         credentials: "include",
// // //       });
// // //     } catch (err) {
// // //       if (err.status === 404) return;
// // //       console.error("Decline error:", err);
// // //       fetchNotifications();
// // //     }
// // //   };

// // //   const pageStyle = {
// // //     fontFamily: "'DM Sans', -apple-system, sans-serif",
// // //     background: "#0a0a0a",
// // //     color: "#e0e0e0",
// // //   };

// // //   const listProps = {
// // //     filtered,
// // //     activeTab,
// // //     setActiveTab,
// // //     unreadCount,
// // //     clearCategory,
// // //     selected,
// // //     setSelected,
// // //     markRead,
// // //     handleAccept,
// // //     handleDecline,
// // //     loading,
// // //   };

// // //   if (error) {
// // //     return (
// // //       <div
// // //         style={{
// // //           ...pageStyle,
// // //           height: availableHeight,
// // //           display: "flex",
// // //           alignItems: "center",
// // //           justifyContent: "center",
// // //           overflow: "hidden",
// // //         }}
// // //       >
// // //         <div style={{ textAlign: "center" }}>
// // //           <p style={{ margin: 0, color: "#c0392b", fontSize: 14 }}>
// // //             Failed to load notifications
// // //           </p>
// // //           <button
// // //             onClick={fetchNotifications}
// // //             style={{
// // //               ...btnStyle("primary"),
// // //               padding: "8px 20px",
// // //               marginTop: 12,
// // //             }}
// // //           >
// // //             Retry
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (isMobile) {
// // //     return (
// // //       <div
// // //         style={{ ...pageStyle, height: availableHeight, overflow: "hidden" }}
// // //       >
// // //         <div
// // //           style={{
// // //             background: "#0d0d0d",
// // //             height: "100%",
// // //             display: "flex",
// // //             flexDirection: "column",
// // //           }}
// // //         >
// // //           <NotifList {...listProps} compact={false} />
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (isTablet) {
// // //     return (
// // //       <div
// // //         style={{
// // //           ...pageStyle,
// // //           height: availableHeight,
// // //           display: "flex",
// // //           overflow: "hidden",
// // //         }}
// // //       >
// // //         <div
// // //           style={{
// // //             width: 320,
// // //             background: "#0d0d0d",
// // //             borderRight: "1px solid #181818",
// // //             flexShrink: 0,
// // //             display: "flex",
// // //             flexDirection: "column",
// // //           }}
// // //         >
// // //           <NotifList {...listProps} compact={true} />
// // //         </div>
// // //         <div
// // //           style={{
// // //             flex: 1,
// // //             background: "#0a0a0a",
// // //             display: "flex",
// // //             flexDirection: "column",
// // //             overflow: "hidden",
// // //           }}
// // //         >
// // //           <DetailPanel
// // //             notif={selected}
// // //             onAccept={handleAccept}
// // //             onDecline={handleDecline}
// // //             onDelete={handleDelete}
// // //           />
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div
// // //       style={{
// // //         ...pageStyle,
// // //         height: availableHeight,
// // //         display: "flex",
// // //         overflow: "hidden",
// // //       }}
// // //     >
// // //       <div
// // //         style={{
// // //           width: 360,
// // //           background: "#0d0d0d",
// // //           borderRight: "1px solid #181818",
// // //           flexShrink: 0,
// // //           display: "flex",
// // //           flexDirection: "column",
// // //         }}
// // //       >
// // //         <NotifList {...listProps} compact={true} />
// // //       </div>
// // //       <div
// // //         style={{
// // //           flex: 1,
// // //           background: "#0a0a0a",
// // //           display: "flex",
// // //           flexDirection: "column",
// // //           overflow: "hidden",
// // //         }}
// // //       >
// // //         <DetailPanel
// // //           notif={selected}
// // //           onAccept={handleAccept}
// // //           onDecline={handleDecline}
// // //           onDelete={handleDelete}
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, {
// //   useState,
// //   useEffect,
// //   useCallback,
// //   useLayoutEffect,
// // } from "react";
// // import fetchData from "../utils/fetchData";

// // function useAvailableHeight() {
// //   const [height, setHeight] = useState("100dvh");
// //   useLayoutEffect(() => {
// //     function measure() {
// //       const style = getComputedStyle(document.documentElement);
// //       const cssH = parseFloat(style.getPropertyValue("--header-h"));
// //       const cssF = parseFloat(style.getPropertyValue("--footer-h"));
// //       if (!isNaN(cssH) && !isNaN(cssF)) {
// //         setHeight(`calc(100dvh - ${cssH}px - ${cssF}px)`);
// //         return;
// //       }
// //       const headerEl = document.querySelector("header");
// //       const allBodyChildren = Array.from(document.body.children);
// //       const footerEl = allBodyChildren
// //         .slice()
// //         .reverse()
// //         .find(
// //           (el) =>
// //             el !== headerEl &&
// //             el.tagName !== "SCRIPT" &&
// //             el.tagName !== "STYLE" &&
// //             el.getBoundingClientRect().height < 120,
// //         );
// //       const hh = headerEl?.getBoundingClientRect().height ?? 0;
// //       const fh = footerEl?.getBoundingClientRect().height ?? 0;
// //       setHeight(`calc(100dvh - ${Math.round(hh)}px - ${Math.round(fh)}px)`);
// //     }
// //     measure();
// //     const ro =
// //       typeof ResizeObserver !== "undefined"
// //         ? new ResizeObserver(measure)
// //         : null;
// //     if (ro) {
// //       const headerEl = document.querySelector("header");
// //       if (headerEl) ro.observe(headerEl);
// //       ro.observe(document.body);
// //     }
// //     return () => ro?.disconnect();
// //   }, []);
// //   return height;
// // }

// // // ─── helpers ─────────────────────────────────────────────────────────────────

// // const AVATAR_PALETTE = [
// //   { bg: "#1a1033", fg: "#9d8fef" },
// //   { bg: "#0c2820", fg: "#4ec9a0" },
// //   { bg: "#2a1008", fg: "#e8845a" },
// //   { bg: "#0b1c30", fg: "#6aade8" },
// //   { bg: "#271a04", fg: "#e8952a" },
// //   { bg: "#28091a", fg: "#e87daa" },
// // ];

// // function getInitials(name = "") {
// //   return (
// //     name
// //       .trim()
// //       .split(/\s+/)
// //       .map((w) => w[0] ?? "")
// //       .join("")
// //       .slice(0, 2)
// //       .toUpperCase() || "?"
// //   );
// // }

// // function getAvatarStyle(id = "") {
// //   const hash = String(id)
// //     .split("")
// //     .reduce((acc, c) => acc + c.charCodeAt(0), 0);
// //   return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
// // }

// // function formatTime(dateStr) {
// //   const diff = Date.now() - new Date(dateStr).getTime();
// //   const mins = Math.floor(diff / 60_000);
// //   if (mins < 1) return "now";
// //   if (mins < 60) return `${mins}m`;
// //   const hrs = Math.floor(mins / 60);
// //   if (hrs < 24) return `${hrs}h`;
// //   const days = Math.floor(hrs / 24);
// //   if (days === 1) return "1d";
// //   if (days < 7) return `${days}d`;
// //   const wks = Math.floor(days / 7);
// //   if (wks < 5) return `${wks}w`;
// //   return `${Math.floor(days / 30)}mo`;
// // }

// // function getAgeGroup(dateStr) {
// //   const diff = Date.now() - new Date(dateStr).getTime();
// //   const days = diff / 86_400_000;
// //   if (days < 1) return "new";
// //   if (days < 7) return "week";
// //   return "month";
// // }

// // function getNotifText(notif) {
// //   const name = notif.sender?.username || "Someone";
// //   switch (notif.type) {
// //     case "follow_request":
// //       return { bold: name, rest: " requested to follow you." };
// //     case "follow_accepted":
// //       return { bold: name, rest: " accepted your follow request." };
// //     case "like":
// //       return { bold: name, rest: " liked your post." };
// //     case "comment":
// //       return {
// //         bold: name,
// //         rest: ` commented: ${notif.preview || "..."}`,
// //       };
// //     case "message":
// //       return {
// //         bold: name,
// //         rest: ` sent you a message: ${notif.preview || "..."}`,
// //       };
// //     case "mention":
// //       return { bold: name, rest: " mentioned you in a post." };
// //     default:
// //       return { bold: name, rest: ` sent you a ${notif.type}.` };
// //   }
// // }

// // // ─── Avatar ──────────────────────────────────────────────────────────────────

// // function Avatar({ name, senderId, profilePicture, size = 44 }) {
// //   const { bg, fg } = getAvatarStyle(senderId);
// //   if (profilePicture) {
// //     return (
// //       <img
// //         src={profilePicture}
// //         alt={name}
// //         style={{
// //           width: size,
// //           height: size,
// //           borderRadius: "50%",
// //           objectFit: "cover",
// //           flexShrink: 0,
// //         }}
// //       />
// //     );
// //   }
// //   return (
// //     <div
// //       style={{
// //         width: size,
// //         height: size,
// //         borderRadius: "50%",
// //         background: bg,
// //         color: fg,
// //         flexShrink: 0,
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         fontSize: size * 0.37,
// //         fontWeight: 700,
// //         letterSpacing: "-0.02em",
// //       }}
// //     >
// //       {getInitials(name)}
// //     </div>
// //   );
// // }

// // // ─── Thumbnail ───────────────────────────────────────────────────────────────

// // function Thumbnail({ url }) {
// //   if (!url) return null;
// //   return (
// //     <img
// //       src={url}
// //       alt=""
// //       style={{
// //         width: 44,
// //         height: 44,
// //         borderRadius: 6,
// //         objectFit: "cover",
// //         flexShrink: 0,
// //       }}
// //     />
// //   );
// // }

// // // ─── Skeleton ────────────────────────────────────────────────────────────────

// // function SkeletonRow() {
// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         alignItems: "center",
// //         gap: 12,
// //         padding: "10px 16px",
// //       }}
// //     >
// //       <div
// //         style={{
// //           width: 44,
// //           height: 44,
// //           borderRadius: "50%",
// //           background: "#1a1a1a",
// //           flexShrink: 0,
// //         }}
// //       />
// //       <div
// //         style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}
// //       >
// //         <div
// //           style={{
// //             height: 11,
// //             width: "55%",
// //             borderRadius: 6,
// //             background: "#1a1a1a",
// //           }}
// //         />
// //         <div
// //           style={{
// //             height: 10,
// //             width: "80%",
// //             borderRadius: 6,
// //             background: "#151515",
// //           }}
// //         />
// //       </div>
// //       <div
// //         style={{
// //           width: 44,
// //           height: 44,
// //           borderRadius: 6,
// //           background: "#1a1a1a",
// //           flexShrink: 0,
// //         }}
// //       />
// //     </div>
// //   );
// // }

// // // ─── Section label ────────────────────────────────────────────────────────────

// // function SectionLabel({ text }) {
// //   return (
// //     <p
// //       style={{
// //         margin: 0,
// //         padding: "14px 16px 6px",
// //         fontSize: 15,
// //         fontWeight: 700,
// //         color: "#f0f0f0",
// //         letterSpacing: "-0.01em",
// //       }}
// //     >
// //       {text}
// //     </p>
// //   );
// // }

// // // ─── Notification row ─────────────────────────────────────────────────────────

// // function NotificationRow({
// //   notif,
// //   onRead,
// //   onAccept,
// //   onDecline,
// //   onDelete,
// //   removing,
// // }) {
// //   const sender = notif.sender ?? {};
// //   const senderName = sender.username || "Unknown";
// //   const { bold, rest } = getNotifText(notif);
// //   const time = formatTime(notif.createdAt);
// //   const isPending =
// //     notif.type === "follow_request" && notif.status === "pending";
// //   const hasThumb = ["like", "comment", "mention"].includes(notif.type);

// //   return (
// //     <div
// //       onClick={() => {
// //         if (!notif.read) onRead(notif._id);
// //       }}
// //       style={{
// //         display: "flex",
// //         alignItems: "center",
// //         gap: 12,
// //         padding: "10px 16px",
// //         background: removing
// //           ? "transparent"
// //           : notif.read
// //             ? "transparent"
// //             : "#11112a",
// //         opacity: removing ? 0 : 1,
// //         maxHeight: removing ? 0 : 200,
// //         overflow: "hidden",
// //         transition: removing
// //           ? "opacity 0.25s ease, max-height 0.3s ease 0.2s"
// //           : "background 0.2s",
// //         cursor: "default",
// //       }}
// //       onMouseEnter={(e) => {
// //         if (!removing) e.currentTarget.style.background = "#111111";
// //       }}
// //       onMouseLeave={(e) => {
// //         if (!removing) {
// //           e.currentTarget.style.background = notif.read
// //             ? "transparent"
// //             : "#11112a";
// //         }
// //       }}
// //     >
// //       {/* Unread dot */}
// //       <div
// //         style={{
// //           width: 8,
// //           flexShrink: 0,
// //           display: "flex",
// //           justifyContent: "center",
// //         }}
// //       >
// //         {!notif.read && (
// //           <div
// //             style={{
// //               width: 8,
// //               height: 8,
// //               borderRadius: "50%",
// //               background: "#3897f0",
// //             }}
// //           />
// //         )}
// //       </div>

// //       {/* Avatar */}
// //       <Avatar
// //         name={senderName}
// //         senderId={sender._id}
// //         profilePicture={sender.profilePicture}
// //         size={44}
// //       />

// //       {/* Text */}
// //       <div style={{ flex: 1, minWidth: 0 }}>
// //         <p
// //           style={{
// //             margin: 0,
// //             fontSize: 14,
// //             color: "#e8e8e8",
// //             lineHeight: 1.45,
// //             overflow: "hidden",
// //             display: "-webkit-box",
// //             WebkitLineClamp: isPending ? 1 : 2,
// //             WebkitBoxOrient: "vertical",
// //           }}
// //         >
// //           <span style={{ fontWeight: 600 }}>{bold}</span>
// //           <span style={{ color: "#a0a0a0" }}>{rest}</span>
// //           {"  "}
// //           <span style={{ color: "#555", fontSize: 13 }}>{time}</span>
// //         </p>

// //         {/* Follow request buttons */}
// //         {isPending && (
// //           <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
// //             <button
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 onAccept(notif._id);
// //               }}
// //               style={{
// //                 padding: "6px 18px",
// //                 borderRadius: 8,
// //                 border: "none",
// //                 background: "#3897f0",
// //                 color: "#fff",
// //                 fontSize: 13,
// //                 fontWeight: 600,
// //                 cursor: "pointer",
// //                 fontFamily: "inherit",
// //               }}
// //             >
// //               Confirm
// //             </button>
// //             <button
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 onDecline(notif._id);
// //               }}
// //               style={{
// //                 padding: "6px 18px",
// //                 borderRadius: 8,
// //                 border: "none",
// //                 background: "#2a2a2a",
// //                 color: "#e8e8e8",
// //                 fontSize: 13,
// //                 fontWeight: 600,
// //                 cursor: "pointer",
// //                 fontFamily: "inherit",
// //               }}
// //             >
// //               Delete
// //             </button>
// //           </div>
// //         )}
// //       </div>

// //       {/* Post thumbnail or delete button */}
// //       {hasThumb && notif.postThumbnail ? (
// //         <Thumbnail url={notif.postThumbnail} />
// //       ) : !isPending ? (
// //         <button
// //           onClick={(e) => {
// //             e.stopPropagation();
// //             onDelete(notif._id);
// //           }}
// //           style={{
// //             background: "transparent",
// //             border: "none",
// //             color: "#444",
// //             cursor: "pointer",
// //             padding: 4,
// //             borderRadius: 4,
// //             fontSize: 18,
// //             lineHeight: 1,
// //             flexShrink: 0,
// //           }}
// //           title="Remove"
// //         >
// //           ×
// //         </button>
// //       ) : null}
// //     </div>
// //   );
// // }

// // // ─── Main page ────────────────────────────────────────────────────────────────

// // export default function NotificationsPage() {
// //   const availableHeight = useAvailableHeight();
// //   const [notifications, setNotifications] = useState([]);
// //   const [removing, setRemoving] = useState(new Set());
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const fetchNotifications = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       const res = await fetchData("/api/notifications", {
// //         credentials: "include",
// //       });
// //       if (!res.ok) throw new Error("Failed to fetch notifications");
// //       setNotifications(await res.json());
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchNotifications();
// //   }, [fetchNotifications]);

// //   // Animate out then remove
// //   const animateRemove = (id) => {
// //     setRemoving((prev) => new Set([...prev, id]));
// //     setTimeout(() => {
// //       setNotifications((prev) => prev.filter((n) => n._id !== id));
// //       setRemoving((prev) => {
// //         const s = new Set(prev);
// //         s.delete(id);
// //         return s;
// //       });
// //     }, 500);
// //   };

// //   const markRead = async (id) => {
// //     setNotifications((prev) =>
// //       prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
// //     );
// //     try {
// //       await fetchData(`/api/notifications/${id}/read`, {
// //         method: "PATCH",
// //         credentials: "include",
// //       });
// //     } catch (err) {
// //       console.error("Failed to mark as read:", err);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     animateRemove(id);
// //     try {
// //       await fetchData(`/api/notifications/${id}`, {
// //         method: "DELETE",
// //         credentials: "include",
// //       });
// //     } catch (err) {
// //       console.error("Failed to delete:", err);
// //       fetchNotifications();
// //     }
// //   };

// //   const handleAccept = async (id) => {
// //     animateRemove(id); // immediately disappears
// //     try {
// //       await fetchData(`/api/notifications/${id}/accept`, {
// //         method: "POST",
// //         credentials: "include",
// //       });
// //     } catch (err) {
// //       if (err.status === 404) return;
// //       console.error("Accept error:", err);
// //       fetchNotifications();
// //     }
// //   };

// //   const handleDecline = async (id) => {
// //     animateRemove(id); // immediately disappears
// //     try {
// //       await fetchData(`/api/notifications/${id}/decline`, {
// //         method: "POST",
// //         credentials: "include",
// //       });
// //     } catch (err) {
// //       if (err.status === 404) return;
// //       console.error("Decline error:", err);
// //       fetchNotifications();
// //     }
// //   };

// //   // Group by age
// //   const newNotifs = notifications.filter(
// //     (n) => getAgeGroup(n.createdAt) === "new",
// //   );
// //   const weekNotifs = notifications.filter(
// //     (n) => getAgeGroup(n.createdAt) === "week",
// //   );
// //   const monthNotifs = notifications.filter(
// //     (n) => getAgeGroup(n.createdAt) === "month",
// //   );

// //   const rowProps = {
// //     onRead: markRead,
// //     onAccept: handleAccept,
// //     onDecline: handleDecline,
// //     onDelete: handleDelete,
// //   };

// //   if (error) {
// //     return (
// //       <div
// //         style={{
// //           fontFamily: "'DM Sans', -apple-system, sans-serif",
// //           background: "#0a0a0a",
// //           color: "#e0e0e0",
// //           height: availableHeight,
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //         }}
// //       >
// //         <div style={{ textAlign: "center" }}>
// //           <p style={{ margin: 0, color: "#c0392b", fontSize: 14 }}>
// //             Failed to load notifications
// //           </p>
// //           <button
// //             onClick={fetchNotifications}
// //             style={{
// //               marginTop: 12,
// //               padding: "8px 20px",
// //               borderRadius: 8,
// //               border: "none",
// //               background: "#3897f0",
// //               color: "#fff",
// //               fontSize: 13,
// //               fontWeight: 600,
// //               cursor: "pointer",
// //               fontFamily: "inherit",
// //             }}
// //           >
// //             Retry
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div
// //       style={{
// //         fontFamily: "'DM Sans', -apple-system, sans-serif",
// //         background: "#0a0a0a",
// //         color: "#e0e0e0",
// //         height: availableHeight,
// //         overflowY: "auto",
// //         scrollbarWidth: "thin",
// //         scrollbarColor: "#1e1e1e transparent",
// //       }}
// //     >
// //       {/* Header */}
// //       <div
// //         style={{
// //           position: "sticky",
// //           top: 0,
// //           zIndex: 10,
// //           background: "#0a0a0a",
// //           borderBottom: "1px solid #181818",
// //           padding: "16px 16px 14px",
// //         }}
// //       >
// //         <h1
// //           style={{
// //             margin: 0,
// //             fontSize: 22,
// //             fontWeight: 700,
// //             color: "#f0f0f0",
// //             letterSpacing: "-0.03em",
// //           }}
// //         >
// //           Notifications
// //         </h1>
// //       </div>

// //       {/* Content */}
// //       {loading ? (
// //         <div>
// //           {Array.from({ length: 7 }).map((_, i) => (
// //             <SkeletonRow key={i} />
// //           ))}
// //         </div>
// //       ) : notifications.length === 0 ? (
// //         <div
// //           style={{
// //             display: "flex",
// //             flexDirection: "column",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             padding: "80px 0",
// //             gap: 12,
// //           }}
// //         >
// //           {/* Bell icon */}
// //           <svg
// //             width="40"
// //             height="40"
// //             viewBox="0 0 24 24"
// //             fill="none"
// //             stroke="#2a2a2a"
// //             strokeWidth="1.5"
// //           >
// //             <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
// //             <path d="M13.73 21a2 2 0 0 1-3.46 0" />
// //           </svg>
// //           <p style={{ margin: 0, color: "#333", fontSize: 14 }}>
// //             No notifications yet
// //           </p>
// //         </div>
// //       ) : (
// //         <>
// //           {newNotifs.length > 0 && (
// //             <>
// //               <SectionLabel text="New" />
// //               {newNotifs.map((n) => (
// //                 <NotificationRow
// //                   key={n._id}
// //                   notif={n}
// //                   removing={removing.has(n._id)}
// //                   {...rowProps}
// //                 />
// //               ))}
// //             </>
// //           )}
// //           {weekNotifs.length > 0 && (
// //             <>
// //               <SectionLabel text="This week" />
// //               {weekNotifs.map((n) => (
// //                 <NotificationRow
// //                   key={n._id}
// //                   notif={n}
// //                   removing={removing.has(n._id)}
// //                   {...rowProps}
// //                 />
// //               ))}
// //             </>
// //           )}
// //           {monthNotifs.length > 0 && (
// //             <>
// //               <SectionLabel text="This month" />
// //               {monthNotifs.map((n) => (
// //                 <NotificationRow
// //                   key={n._id}
// //                   notif={n}
// //                   removing={removing.has(n._id)}
// //                   {...rowProps}
// //                 />
// //               ))}
// //             </>
// //           )}
// //         </>
// //       )}
// //     </div>
// //   );
// // }

// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useLayoutEffect,
// } from "react";
// import fetchData from "../utils/fetchData";

// function useAvailableHeight() {
//   const [height, setHeight] = useState("100dvh");
//   useLayoutEffect(() => {
//     function measure() {
//       const style = getComputedStyle(document.documentElement);
//       const cssH = parseFloat(style.getPropertyValue("--header-h"));
//       const cssF = parseFloat(style.getPropertyValue("--footer-h"));
//       if (!isNaN(cssH) && !isNaN(cssF)) {
//         setHeight(`calc(100dvh - ${cssH}px - ${cssF}px)`);
//         return;
//       }
//       const headerEl = document.querySelector("header");
//       const allBodyChildren = Array.from(document.body.children);
//       const footerEl = allBodyChildren
//         .slice()
//         .reverse()
//         .find(
//           (el) =>
//             el !== headerEl &&
//             el.tagName !== "SCRIPT" &&
//             el.tagName !== "STYLE" &&
//             el.getBoundingClientRect().height < 120,
//         );
//       const hh = headerEl?.getBoundingClientRect().height ?? 0;
//       const fh = footerEl?.getBoundingClientRect().height ?? 0;
//       setHeight(`calc(100dvh - ${Math.round(hh)}px - ${Math.round(fh)}px)`);
//     }
//     measure();
//     const ro =
//       typeof ResizeObserver !== "undefined"
//         ? new ResizeObserver(measure)
//         : null;
//     if (ro) {
//       const headerEl = document.querySelector("header");
//       if (headerEl) ro.observe(headerEl);
//       ro.observe(document.body);
//     }
//     return () => ro?.disconnect();
//   }, []);
//   return height;
// }

// // ─── helpers ─────────────────────────────────────────────────────────────────

// const AVATAR_PALETTE = [
//   { bg: "#1a1033", fg: "#9d8fef" },
//   { bg: "#0c2820", fg: "#4ec9a0" },
//   { bg: "#2a1008", fg: "#e8845a" },
//   { bg: "#0b1c30", fg: "#6aade8" },
//   { bg: "#271a04", fg: "#e8952a" },
//   { bg: "#28091a", fg: "#e87daa" },
// ];

// function getInitials(name = "") {
//   return (
//     name
//       .trim()
//       .split(/\s+/)
//       .map((w) => w[0] ?? "")
//       .join("")
//       .slice(0, 2)
//       .toUpperCase() || "?"
//   );
// }

// function getAvatarStyle(id = "") {
//   const hash = String(id)
//     .split("")
//     .reduce((acc, c) => acc + c.charCodeAt(0), 0);
//   return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
// }

// function formatTime(dateStr) {
//   const diff = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diff / 60_000);
//   if (mins < 1) return "now";
//   if (mins < 60) return `${mins}m`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs}h`;
//   const days = Math.floor(hrs / 24);
//   if (days === 1) return "1d";
//   if (days < 7) return `${days}d`;
//   const wks = Math.floor(days / 7);
//   if (wks < 5) return `${wks}w`;
//   return `${Math.floor(days / 30)}mo`;
// }

// function getAgeGroup(dateStr) {
//   const diff = Date.now() - new Date(dateStr).getTime();
//   const days = diff / 86_400_000;
//   if (days < 1) return "new";
//   if (days < 7) return "week";
//   return "month";
// }

// function getNotifText(notif) {
//   const name = notif.sender?.username || "Someone";
//   switch (notif.type) {
//     case "follow_request":
//       return { bold: name, rest: " requested to follow you." };
//     case "follow_accepted":
//       return { bold: name, rest: " accepted your follow request." };
//     case "like":
//       return { bold: name, rest: " liked your post." };
//     case "comment":
//       return {
//         bold: name,
//         rest: ` commented: ${notif.preview || "..."}`,
//       };
//     case "message":
//       return {
//         bold: name,
//         rest: ` sent you a message: ${notif.preview || "..."}`,
//       };
//     case "mention":
//       return { bold: name, rest: " mentioned you in a post." };
//     default:
//       return { bold: name, rest: ` sent you a ${notif.type}.` };
//   }
// }

// // ─── Avatar ──────────────────────────────────────────────────────────────────

// function Avatar({ name, senderId, profilePicture, size = 44 }) {
//   const { bg, fg } = getAvatarStyle(senderId);
//   if (profilePicture) {
//     return (
//       <img
//         src={profilePicture}
//         alt={name}
//         style={{
//           width: size,
//           height: size,
//           borderRadius: "50%",
//           objectFit: "cover",
//           flexShrink: 0,
//         }}
//       />
//     );
//   }
//   return (
//     <div
//       style={{
//         width: size,
//         height: size,
//         borderRadius: "50%",
//         background: bg,
//         color: fg,
//         flexShrink: 0,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontSize: size * 0.37,
//         fontWeight: 700,
//         letterSpacing: "-0.02em",
//       }}
//     >
//       {getInitials(name)}
//     </div>
//   );
// }

// // ─── Thumbnail ───────────────────────────────────────────────────────────────

// function Thumbnail({ url }) {
//   if (!url) return null;
//   return (
//     <img
//       src={url}
//       alt=""
//       style={{
//         width: 44,
//         height: 44,
//         borderRadius: 6,
//         objectFit: "cover",
//         flexShrink: 0,
//       }}
//     />
//   );
// }

// // ─── Skeleton ────────────────────────────────────────────────────────────────

// function SkeletonRow() {
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 12,
//         padding: "10px 16px",
//       }}
//     >
//       <div
//         style={{
//           width: 44,
//           height: 44,
//           borderRadius: "50%",
//           background: "#1a1a1a",
//           flexShrink: 0,
//         }}
//       />
//       <div
//         style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}
//       >
//         <div
//           style={{
//             height: 11,
//             width: "55%",
//             borderRadius: 6,
//             background: "#1a1a1a",
//           }}
//         />
//         <div
//           style={{
//             height: 10,
//             width: "80%",
//             borderRadius: 6,
//             background: "#151515",
//           }}
//         />
//       </div>
//       <div
//         style={{
//           width: 44,
//           height: 44,
//           borderRadius: 6,
//           background: "#1a1a1a",
//           flexShrink: 0,
//         }}
//       />
//     </div>
//   );
// }

// // ─── Section label ────────────────────────────────────────────────────────────

// function SectionLabel({ text }) {
//   return (
//     <p
//       style={{
//         margin: 0,
//         padding: "14px 16px 6px",
//         fontSize: 15,
//         fontWeight: 700,
//         color: "#f0f0f0",
//         letterSpacing: "-0.01em",
//       }}
//     >
//       {text}
//     </p>
//   );
// }

// // ─── Notification row ─────────────────────────────────────────────────────────

// function NotificationRow({
//   notif,
//   onRead,
//   onAccept,
//   onDecline,
//   onDelete,
//   removing,
// }) {
//   const sender = notif.sender ?? {};
//   const senderName = sender.username || "Unknown";
//   const { bold, rest } = getNotifText(notif);
//   const time = formatTime(notif.createdAt);
//   const isPending =
//     notif.type === "follow_request" && notif.status === "pending";
//   const hasThumb = ["like", "comment", "mention"].includes(notif.type);

//   return (
//     <div
//       onClick={() => {
//         if (!notif.read) onRead(notif._id);
//       }}
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 12,
//         padding: "10px 16px",
//         background: removing
//           ? "transparent"
//           : notif.read
//             ? "transparent"
//             : "#11112a",
//         opacity: removing ? 0 : 1,
//         maxHeight: removing ? 0 : 200,
//         overflow: "hidden",
//         transition: removing
//           ? "opacity 0.25s ease, max-height 0.3s ease 0.2s"
//           : "background 0.2s",
//         cursor: "default",
//       }}
//       onMouseEnter={(e) => {
//         if (!removing) e.currentTarget.style.background = "#111111";
//       }}
//       onMouseLeave={(e) => {
//         if (!removing) {
//           e.currentTarget.style.background = notif.read
//             ? "transparent"
//             : "#11112a";
//         }
//       }}
//     >
//       {/* Unread dot */}
//       <div
//         style={{
//           width: 8,
//           flexShrink: 0,
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         {!notif.read && (
//           <div
//             style={{
//               width: 8,
//               height: 8,
//               borderRadius: "50%",
//               background: "#3897f0",
//             }}
//           />
//         )}
//       </div>

//       {/* Avatar */}
//       <Avatar
//         name={senderName}
//         senderId={sender._id}
//         profilePicture={sender.profilePicture}
//         size={44}
//       />

//       {/* Text */}
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <p
//           style={{
//             margin: 0,
//             fontSize: 14,
//             color: "#e8e8e8",
//             lineHeight: 1.45,
//             overflow: "hidden",
//             display: "-webkit-box",
//             WebkitLineClamp: isPending ? 1 : 2,
//             WebkitBoxOrient: "vertical",
//           }}
//         >
//           <span style={{ fontWeight: 600 }}>{bold}</span>
//           <span style={{ color: "#a0a0a0" }}>{rest}</span>
//           {"  "}
//           <span style={{ color: "#555", fontSize: 13 }}>{time}</span>
//         </p>

//         {/* Follow request buttons */}
//         {isPending && (
//           <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onAccept(notif._id);
//               }}
//               style={{
//                 padding: "6px 18px",
//                 borderRadius: 8,
//                 border: "none",
//                 background: "#3897f0",
//                 color: "#fff",
//                 fontSize: 13,
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 fontFamily: "inherit",
//               }}
//             >
//               Confirm
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onDecline(notif._id);
//               }}
//               style={{
//                 padding: "6px 18px",
//                 borderRadius: 8,
//                 border: "none",
//                 background: "#2a2a2a",
//                 color: "#e8e8e8",
//                 fontSize: 13,
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 fontFamily: "inherit",
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Post thumbnail or delete button */}
//       {hasThumb && notif.postThumbnail ? (
//         <Thumbnail url={notif.postThumbnail} />
//       ) : !isPending ? (
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onDelete(notif._id);
//           }}
//           style={{
//             background: "transparent",
//             border: "none",
//             color: "#444",
//             cursor: "pointer",
//             padding: 4,
//             borderRadius: 4,
//             fontSize: 18,
//             lineHeight: 1,
//             flexShrink: 0,
//           }}
//           title="Remove"
//         >
//           ×
//         </button>
//       ) : null}
//     </div>
//   );
// }

// // ─── Main page ────────────────────────────────────────────────────────────────

// export default function NotificationsPage() {
//   const availableHeight = useAvailableHeight();
//   const [notifications, setNotifications] = useState([]);
//   const [removing, setRemoving] = useState(new Set());
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchNotifications = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetchData("/api/notifications", {
//         credentials: "include",
//       });
//       if (!res.ok) throw new Error("Failed to fetch notifications");
//       setNotifications(await res.json());
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchNotifications();
//   }, [fetchNotifications]);

//   // Mark all as read when the page loads and data is ready
//   useEffect(() => {
//     if (loading || notifications.length === 0) return;
//     const hasUnread = notifications.some((n) => !n.read);
//     if (!hasUnread) return;

//     // Optimistically mark all as read in UI
//     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

//     // Tell the server
//     fetchData("/api/notifications/read-all", {
//       method: "POST",
//       credentials: "include",
//     }).catch((err) => console.error("Failed to mark all as read:", err));
//   }, [loading]); // runs once when loading flips to false

//   // Animate out then remove
//   const animateRemove = (id) => {
//     setRemoving((prev) => new Set([...prev, id]));
//     setTimeout(() => {
//       setNotifications((prev) => prev.filter((n) => n._id !== id));
//       setRemoving((prev) => {
//         const s = new Set(prev);
//         s.delete(id);
//         return s;
//       });
//     }, 500);
//   };

//   const markRead = async (id) => {
//     setNotifications((prev) =>
//       prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
//     );
//     try {
//       await fetchData(`/api/notifications/${id}/read`, {
//         method: "PATCH",
//         credentials: "include",
//       });
//     } catch (err) {
//       console.error("Failed to mark as read:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     animateRemove(id);
//     try {
//       await fetchData(`/api/notifications/${id}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//     } catch (err) {
//       console.error("Failed to delete:", err);
//       fetchNotifications();
//     }
//   };

//   const handleAccept = async (id) => {
//     animateRemove(id);
//     try {
//       await fetchData(`/api/notifications/${id}/accept`, {
//         method: "POST",
//         credentials: "include",
//       });
//     } catch (err) {
//       if (err.status === 404) return;
//       console.error("Accept error:", err);
//       fetchNotifications();
//     }
//   };

//   const handleDecline = async (id) => {
//     animateRemove(id);
//     try {
//       await fetchData(`/api/notifications/${id}/decline`, {
//         method: "POST",
//         credentials: "include",
//       });
//     } catch (err) {
//       if (err.status === 404) return;
//       console.error("Decline error:", err);
//       fetchNotifications();
//     }
//   };

//   // Group by age
//   const newNotifs = notifications.filter(
//     (n) => getAgeGroup(n.createdAt) === "new",
//   );
//   const weekNotifs = notifications.filter(
//     (n) => getAgeGroup(n.createdAt) === "week",
//   );
//   const monthNotifs = notifications.filter(
//     (n) => getAgeGroup(n.createdAt) === "month",
//   );

//   const rowProps = {
//     onRead: markRead,
//     onAccept: handleAccept,
//     onDecline: handleDecline,
//     onDelete: handleDelete,
//   };

//   if (error) {
//     return (
//       <div
//         style={{
//           fontFamily: "'DM Sans', -apple-system, sans-serif",
//           background: "#0a0a0a",
//           color: "#e0e0e0",
//           height: availableHeight,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <div style={{ textAlign: "center" }}>
//           <p style={{ margin: 0, color: "#c0392b", fontSize: 14 }}>
//             Failed to load notifications
//           </p>
//           <button
//             onClick={fetchNotifications}
//             style={{
//               marginTop: 12,
//               padding: "8px 20px",
//               borderRadius: 8,
//               border: "none",
//               background: "#3897f0",
//               color: "#fff",
//               fontSize: 13,
//               fontWeight: 600,
//               cursor: "pointer",
//               fontFamily: "inherit",
//             }}
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         fontFamily: "'DM Sans', -apple-system, sans-serif",
//         background: "#0a0a0a",
//         color: "#e0e0e0",
//         height: availableHeight,
//         overflowY: "auto",
//         scrollbarWidth: "thin",
//         scrollbarColor: "#1e1e1e transparent",
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           background: "#0a0a0a",
//           borderBottom: "1px solid #181818",
//           padding: "16px 16px 14px",
//         }}
//       >
//         <h1
//           style={{
//             margin: 0,
//             fontSize: 22,
//             fontWeight: 700,
//             color: "#f0f0f0",
//             letterSpacing: "-0.03em",
//           }}
//         >
//           Notifications
//         </h1>
//       </div>

//       {/* Content */}
//       {loading ? (
//         <div>
//           {Array.from({ length: 7 }).map((_, i) => (
//             <SkeletonRow key={i} />
//           ))}
//         </div>
//       ) : notifications.length === 0 ? (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: "80px 0",
//             gap: 12,
//           }}
//         >
//           <svg
//             width="40"
//             height="40"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="#2a2a2a"
//             strokeWidth="1.5"
//           >
//             <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
//             <path d="M13.73 21a2 2 0 0 1-3.46 0" />
//           </svg>
//           <p style={{ margin: 0, color: "#333", fontSize: 14 }}>
//             No notifications yet
//           </p>
//         </div>
//       ) : (
//         <>
//           {newNotifs.length > 0 && (
//             <>
//               <SectionLabel text="New" />
//               {newNotifs.map((n) => (
//                 <NotificationRow
//                   key={n._id}
//                   notif={n}
//                   removing={removing.has(n._id)}
//                   {...rowProps}
//                 />
//               ))}
//             </>
//           )}
//           {weekNotifs.length > 0 && (
//             <>
//               <SectionLabel text="This week" />
//               {weekNotifs.map((n) => (
//                 <NotificationRow
//                   key={n._id}
//                   notif={n}
//                   removing={removing.has(n._id)}
//                   {...rowProps}
//                 />
//               ))}
//             </>
//           )}
//           {monthNotifs.length > 0 && (
//             <>
//               <SectionLabel text="This month" />
//               {monthNotifs.map((n) => (
//                 <NotificationRow
//                   key={n._id}
//                   notif={n}
//                   removing={removing.has(n._id)}
//                   {...rowProps}
//                 />
//               ))}
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useLayoutEffect,
// } from "react";
// import fetchData from "../utils/fetchData";

// function useAvailableHeight() {
//   const [height, setHeight] = useState("100dvh");
//   useLayoutEffect(() => {
//     function measure() {
//       const style = getComputedStyle(document.documentElement);
//       const cssH = parseFloat(style.getPropertyValue("--header-h"));
//       const cssF = parseFloat(style.getPropertyValue("--footer-h"));
//       if (!isNaN(cssH) && !isNaN(cssF)) {
//         setHeight(`calc(100dvh - ${cssH}px - ${cssF}px)`);
//         return;
//       }
//       const headerEl = document.querySelector("header");
//       const allBodyChildren = Array.from(document.body.children);
//       const footerEl = allBodyChildren
//         .slice()
//         .reverse()
//         .find(
//           (el) =>
//             el !== headerEl &&
//             el.tagName !== "SCRIPT" &&
//             el.tagName !== "STYLE" &&
//             el.getBoundingClientRect().height < 120,
//         );
//       const hh = headerEl?.getBoundingClientRect().height ?? 0;
//       const fh = footerEl?.getBoundingClientRect().height ?? 0;
//       setHeight(`calc(100dvh - ${Math.round(hh)}px - ${Math.round(fh)}px)`);
//     }
//     measure();
//     const ro =
//       typeof ResizeObserver !== "undefined"
//         ? new ResizeObserver(measure)
//         : null;
//     if (ro) {
//       const headerEl = document.querySelector("header");
//       if (headerEl) ro.observe(headerEl);
//       ro.observe(document.body);
//     }
//     return () => ro?.disconnect();
//   }, []);
//   return height;
// }

// // ─── helpers ─────────────────────────────────────────────────────────────────

// const AVATAR_PALETTE = [
//   { bg: "#1a1033", fg: "#9d8fef" },
//   { bg: "#0c2820", fg: "#4ec9a0" },
//   { bg: "#2a1008", fg: "#e8845a" },
//   { bg: "#0b1c30", fg: "#6aade8" },
//   { bg: "#271a04", fg: "#e8952a" },
//   { bg: "#28091a", fg: "#e87daa" },
// ];

// function getInitials(name = "") {
//   return (
//     name
//       .trim()
//       .split(/\s+/)
//       .map((w) => w[0] ?? "")
//       .join("")
//       .slice(0, 2)
//       .toUpperCase() || "?"
//   );
// }

// function getAvatarStyle(id = "") {
//   const hash = String(id)
//     .split("")
//     .reduce((acc, c) => acc + c.charCodeAt(0), 0);
//   return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
// }

// function formatTime(dateStr) {
//   const diff = Date.now() - new Date(dateStr).getTime();
//   const mins = Math.floor(diff / 60_000);
//   if (mins < 1) return "now";
//   if (mins < 60) return `${mins}m`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs}h`;
//   const days = Math.floor(hrs / 24);
//   if (days === 1) return "1d";
//   if (days < 7) return `${days}d`;
//   const wks = Math.floor(days / 7);
//   if (wks < 5) return `${wks}w`;
//   return `${Math.floor(days / 30)}mo`;
// }

// function getAgeGroup(dateStr) {
//   const diff = Date.now() - new Date(dateStr).getTime();
//   const days = diff / 86_400_000;
//   if (days < 1) return "new";
//   if (days < 7) return "week";
//   return "month";
// }

// function getNotifText(notif) {
//   const name = notif.sender?.username || "Someone";
//   switch (notif.type) {
//     case "follow_request":
//       return { bold: name, rest: " requested to follow you." };
//     case "follow_accepted":
//       return { bold: name, rest: " accepted your follow request." };
//     case "like":
//       return { bold: name, rest: " liked your post." };
//     case "comment":
//       return {
//         bold: name,
//         rest: ` commented: ${notif.preview || "..."}`,
//       };
//     case "message":
//       return {
//         bold: name,
//         rest: ` sent you a message: ${notif.preview || "..."}`,
//       };
//     case "mention":
//       return { bold: name, rest: " mentioned you in a post." };
//     default:
//       return { bold: name, rest: ` sent you a ${notif.type}.` };
//   }
// }

// // ─── Avatar ──────────────────────────────────────────────────────────────────

// function Avatar({ name, senderId, profilePicture, size = 44 }) {
//   const { bg, fg } = getAvatarStyle(senderId);
//   if (profilePicture) {
//     return (
//       <img
//         src={profilePicture}
//         alt={name}
//         style={{
//           width: size,
//           height: size,
//           borderRadius: "50%",
//           objectFit: "cover",
//           flexShrink: 0,
//         }}
//       />
//     );
//   }
//   return (
//     <div
//       style={{
//         width: size,
//         height: size,
//         borderRadius: "50%",
//         background: bg,
//         color: fg,
//         flexShrink: 0,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontSize: size * 0.37,
//         fontWeight: 700,
//         letterSpacing: "-0.02em",
//       }}
//     >
//       {getInitials(name)}
//     </div>
//   );
// }

// // ─── Thumbnail ───────────────────────────────────────────────────────────────

// function Thumbnail({ url }) {
//   if (!url) return null;
//   return (
//     <img
//       src={url}
//       alt=""
//       style={{
//         width: 44,
//         height: 44,
//         borderRadius: 6,
//         objectFit: "cover",
//         flexShrink: 0,
//       }}
//     />
//   );
// }

// // ─── Skeleton ────────────────────────────────────────────────────────────────

// function SkeletonRow() {
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 12,
//         padding: "10px 16px",
//       }}
//     >
//       <div
//         style={{
//           width: 44,
//           height: 44,
//           borderRadius: "50%",
//           background: "#1a1a1a",
//           flexShrink: 0,
//         }}
//       />
//       <div
//         style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}
//       >
//         <div
//           style={{
//             height: 11,
//             width: "55%",
//             borderRadius: 6,
//             background: "#1a1a1a",
//           }}
//         />
//         <div
//           style={{
//             height: 10,
//             width: "80%",
//             borderRadius: 6,
//             background: "#151515",
//           }}
//         />
//       </div>
//       <div
//         style={{
//           width: 44,
//           height: 44,
//           borderRadius: 6,
//           background: "#1a1a1a",
//           flexShrink: 0,
//         }}
//       />
//     </div>
//   );
// }

// // ─── Section label ────────────────────────────────────────────────────────────

// function SectionLabel({ text }) {
//   return (
//     <p
//       style={{
//         margin: 0,
//         padding: "14px 16px 6px",
//         fontSize: 15,
//         fontWeight: 700,
//         color: "#f0f0f0",
//         letterSpacing: "-0.01em",
//       }}
//     >
//       {text}
//     </p>
//   );
// }

// // ─── Notification row ─────────────────────────────────────────────────────────

// function NotificationRow({
//   notif,
//   onRead,
//   onAccept,
//   onDecline,
//   onDelete,
//   removing,
// }) {
//   const sender = notif.sender ?? {};
//   const senderName = sender.username || "Unknown";
//   const { bold, rest } = getNotifText(notif);
//   const time = formatTime(notif.createdAt);
//   const isPending =
//     notif.type === "follow_request" && notif.status === "pending";
//   const hasThumb = ["like", "comment", "mention"].includes(notif.type);

//   return (
//     <div
//       onClick={() => {
//         if (!notif.read) onRead(notif._id);
//       }}
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 12,
//         padding: "10px 16px",
//         background: removing
//           ? "transparent"
//           : notif.read
//             ? "transparent"
//             : "#11112a",
//         opacity: removing ? 0 : 1,
//         maxHeight: removing ? 0 : 200,
//         overflow: "hidden",
//         transition: removing
//           ? "opacity 0.25s ease, max-height 0.3s ease 0.2s"
//           : "background 0.2s",
//         cursor: "default",
//       }}
//       onMouseEnter={(e) => {
//         if (!removing) e.currentTarget.style.background = "#111111";
//       }}
//       onMouseLeave={(e) => {
//         if (!removing) {
//           e.currentTarget.style.background = notif.read
//             ? "transparent"
//             : "#11112a";
//         }
//       }}
//     >
//       {/* Unread dot */}
//       <div
//         style={{
//           width: 8,
//           flexShrink: 0,
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         {!notif.read && (
//           <div
//             style={{
//               width: 8,
//               height: 8,
//               borderRadius: "50%",
//               background: "#3897f0",
//             }}
//           />
//         )}
//       </div>

//       {/* Avatar */}
//       <Avatar
//         name={senderName}
//         senderId={sender._id}
//         profilePicture={sender.profilePicture}
//         size={44}
//       />

//       {/* Text */}
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <p
//           style={{
//             margin: 0,
//             fontSize: 14,
//             color: "#e8e8e8",
//             lineHeight: 1.45,
//             overflow: "hidden",
//             display: "-webkit-box",
//             WebkitLineClamp: isPending ? 1 : 2,
//             WebkitBoxOrient: "vertical",
//           }}
//         >
//           <span style={{ fontWeight: 600 }}>{bold}</span>
//           <span style={{ color: "#a0a0a0" }}>{rest}</span>
//           {"  "}
//           <span style={{ color: "#555", fontSize: 13 }}>{time}</span>
//         </p>

//         {/* Follow request buttons */}
//         {isPending && (
//           <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onAccept(notif._id);
//               }}
//               style={{
//                 padding: "6px 18px",
//                 borderRadius: 8,
//                 border: "none",
//                 background: "#3897f0",
//                 color: "#fff",
//                 fontSize: 13,
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 fontFamily: "inherit",
//               }}
//             >
//               Confirm
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onDecline(notif._id);
//               }}
//               style={{
//                 padding: "6px 18px",
//                 borderRadius: 8,
//                 border: "none",
//                 background: "#2a2a2a",
//                 color: "#e8e8e8",
//                 fontSize: 13,
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 fontFamily: "inherit",
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Post thumbnail or delete button */}
//       {hasThumb && notif.postThumbnail ? (
//         <Thumbnail url={notif.postThumbnail} />
//       ) : !isPending ? (
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onDelete(notif._id);
//           }}
//           style={{
//             background: "transparent",
//             border: "none",
//             color: "#444",
//             cursor: "pointer",
//             padding: 4,
//             borderRadius: 4,
//             fontSize: 18,
//             lineHeight: 1,
//             flexShrink: 0,
//           }}
//           title="Remove"
//         >
//           ×
//         </button>
//       ) : null}
//     </div>
//   );
// }

// // ─── Main page ────────────────────────────────────────────────────────────────

// export default function NotificationsPage() {
//   const availableHeight = useAvailableHeight();
//   const [notifications, setNotifications] = useState([]);
//   const [removing, setRemoving] = useState(new Set());
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchNotifications = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetchData("/api/notifications", {
//         credentials: "include",
//       });
//       if (!res.ok) throw new Error("Failed to fetch notifications");
//       setNotifications(await res.json());
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchNotifications();
//   }, [fetchNotifications]);

//   // Once data loads, mark all unread as read on the server,
//   // then fire a custom event so the Header zeroes its badge.
//   useEffect(() => {
//     if (loading || notifications.length === 0) return;
//     const hasUnread = notifications.some((n) => !n.read);
//     if (!hasUnread) return;

//     // Optimistically mark all as read in UI
//     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

//     // Tell the server, then notify the Header via custom event
//     fetchData("/api/notifications/read-all", {
//       method: "POST",
//       credentials: "include",
//     })
//       .then(() => {
//         window.dispatchEvent(new CustomEvent("notifications:read-all"));
//       })
//       .catch((err) => console.error("Failed to mark all as read:", err));
//   }, [loading]); // runs once when loading flips to false

//   // Animate out then remove
//   const animateRemove = (id) => {
//     setRemoving((prev) => new Set([...prev, id]));
//     setTimeout(() => {
//       setNotifications((prev) => prev.filter((n) => n._id !== id));
//       setRemoving((prev) => {
//         const s = new Set(prev);
//         s.delete(id);
//         return s;
//       });
//     }, 500);
//   };

//   const markRead = async (id) => {
//     setNotifications((prev) =>
//       prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
//     );
//     try {
//       await fetchData(`/api/notifications/${id}/read`, {
//         method: "PATCH",
//         credentials: "include",
//       });
//     } catch (err) {
//       console.error("Failed to mark as read:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     animateRemove(id);
//     try {
//       await fetchData(`/api/notifications/${id}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//     } catch (err) {
//       console.error("Failed to delete:", err);
//       fetchNotifications();
//     }
//   };

//   const handleAccept = async (id) => {
//     animateRemove(id);
//     try {
//       await fetchData(`/api/notifications/${id}/accept`, {
//         method: "POST",
//         credentials: "include",
//       });
//     } catch (err) {
//       if (err.status === 404) return;
//       console.error("Accept error:", err);
//       fetchNotifications();
//     }
//   };

//   const handleDecline = async (id) => {
//     animateRemove(id);
//     try {
//       await fetchData(`/api/notifications/${id}/decline`, {
//         method: "POST",
//         credentials: "include",
//       });
//     } catch (err) {
//       if (err.status === 404) return;
//       console.error("Decline error:", err);
//       fetchNotifications();
//     }
//   };

//   // Group by age
//   const newNotifs = notifications.filter(
//     (n) => getAgeGroup(n.createdAt) === "new",
//   );
//   const weekNotifs = notifications.filter(
//     (n) => getAgeGroup(n.createdAt) === "week",
//   );
//   const monthNotifs = notifications.filter(
//     (n) => getAgeGroup(n.createdAt) === "month",
//   );

//   const rowProps = {
//     onRead: markRead,
//     onAccept: handleAccept,
//     onDecline: handleDecline,
//     onDelete: handleDelete,
//   };

//   if (error) {
//     return (
//       <div
//         style={{
//           fontFamily: "'DM Sans', -apple-system, sans-serif",
//           background: "#0a0a0a",
//           color: "#e0e0e0",
//           height: availableHeight,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <div style={{ textAlign: "center" }}>
//           <p style={{ margin: 0, color: "#c0392b", fontSize: 14 }}>
//             Failed to load notifications
//           </p>
//           <button
//             onClick={fetchNotifications}
//             style={{
//               marginTop: 12,
//               padding: "8px 20px",
//               borderRadius: 8,
//               border: "none",
//               background: "#3897f0",
//               color: "#fff",
//               fontSize: 13,
//               fontWeight: 600,
//               cursor: "pointer",
//               fontFamily: "inherit",
//             }}
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         fontFamily: "'DM Sans', -apple-system, sans-serif",
//         background: "#0a0a0a",
//         color: "#e0e0e0",
//         height: availableHeight,
//         overflowY: "auto",
//         scrollbarWidth: "thin",
//         scrollbarColor: "#1e1e1e transparent",
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           background: "#0a0a0a",
//           borderBottom: "1px solid #181818",
//           padding: "16px 16px 14px",
//         }}
//       >
//         <h1
//           style={{
//             margin: 0,
//             fontSize: 22,
//             fontWeight: 700,
//             color: "#f0f0f0",
//             letterSpacing: "-0.03em",
//           }}
//         >
//           Notifications
//         </h1>
//       </div>

//       {/* Content */}
//       {loading ? (
//         <div>
//           {Array.from({ length: 7 }).map((_, i) => (
//             <SkeletonRow key={i} />
//           ))}
//         </div>
//       ) : notifications.length === 0 ? (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: "80px 0",
//             gap: 12,
//           }}
//         >
//           <svg
//             width="40"
//             height="40"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="#2a2a2a"
//             strokeWidth="1.5"
//           >
//             <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
//             <path d="M13.73 21a2 2 0 0 1-3.46 0" />
//           </svg>
//           <p style={{ margin: 0, color: "#333", fontSize: 14 }}>
//             No notifications yet
//           </p>
//         </div>
//       ) : (
//         <>
//           {newNotifs.length > 0 && (
//             <>
//               <SectionLabel text="New" />
//               {newNotifs.map((n) => (
//                 <NotificationRow
//                   key={n._id}
//                   notif={n}
//                   removing={removing.has(n._id)}
//                   {...rowProps}
//                 />
//               ))}
//             </>
//           )}
//           {weekNotifs.length > 0 && (
//             <>
//               <SectionLabel text="This week" />
//               {weekNotifs.map((n) => (
//                 <NotificationRow
//                   key={n._id}
//                   notif={n}
//                   removing={removing.has(n._id)}
//                   {...rowProps}
//                 />
//               ))}
//             </>
//           )}
//           {monthNotifs.length > 0 && (
//             <>
//               <SectionLabel text="This month" />
//               {monthNotifs.map((n) => (
//                 <NotificationRow
//                   key={n._id}
//                   notif={n}
//                   removing={removing.has(n._id)}
//                   {...rowProps}
//                 />
//               ))}
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import fetchData from "../utils/fetchData";

function useAvailableHeight() {
  const [height, setHeight] = useState("100dvh");
  useLayoutEffect(() => {
    function measure() {
      const style = getComputedStyle(document.documentElement);
      const cssH = parseFloat(style.getPropertyValue("--header-h"));
      const cssF = parseFloat(style.getPropertyValue("--footer-h"));
      if (!isNaN(cssH) && !isNaN(cssF)) {
        setHeight(`calc(100dvh - ${cssH}px - ${cssF}px)`);
        return;
      }
      const headerEl = document.querySelector("header");
      const allBodyChildren = Array.from(document.body.children);
      const footerEl = allBodyChildren
        .slice()
        .reverse()
        .find(
          (el) =>
            el !== headerEl &&
            el.tagName !== "SCRIPT" &&
            el.tagName !== "STYLE" &&
            el.getBoundingClientRect().height < 120,
        );
      const hh = headerEl?.getBoundingClientRect().height ?? 0;
      const fh = footerEl?.getBoundingClientRect().height ?? 0;
      setHeight(`calc(100dvh - ${Math.round(hh)}px - ${Math.round(fh)}px)`);
    }
    measure();
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    if (ro) {
      const headerEl = document.querySelector("header");
      if (headerEl) ro.observe(headerEl);
      ro.observe(document.body);
    }
    return () => ro?.disconnect();
  }, []);
  return height;
}

// ─── helpers ─────────────────────────────────────────────────────────────────

const AVATAR_PALETTE = [
  { bg: "#1a1033", fg: "#9d8fef" },
  { bg: "#0c2820", fg: "#4ec9a0" },
  { bg: "#2a1008", fg: "#e8845a" },
  { bg: "#0b1c30", fg: "#6aade8" },
  { bg: "#271a04", fg: "#e8952a" },
  { bg: "#28091a", fg: "#e87daa" },
];

function getInitials(name = "") {
  return (
    name
      .trim()
      .split(/\s+/)
      .map((w) => w[0] ?? "")
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?"
  );
}

function getAvatarStyle(id = "") {
  const hash = String(id)
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}

function formatTime(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "1d";
  if (days < 7) return `${days}d`;
  const wks = Math.floor(days / 7);
  if (wks < 5) return `${wks}w`;
  return `${Math.floor(days / 30)}mo`;
}

function getAgeGroup(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = diff / 86_400_000;
  if (days < 1) return "new";
  if (days < 7) return "week";
  return "month";
}

function getNotifText(notif) {
  const name = notif.sender?.username || "Someone";
  switch (notif.type) {
    case "follow_request":
      return { bold: name, rest: " requested to follow you." };
    case "follow_accepted":
      return { bold: name, rest: " accepted your follow request." };
    case "like":
      return { bold: name, rest: " liked your post." };
    case "comment":
      return {
        bold: name,
        rest: ` commented: ${notif.preview || "..."}`,
      };
    case "message":
      return {
        bold: name,
        rest: ` sent you a message: ${notif.preview || "..."}`,
      };
    case "mention":
      return { bold: name, rest: " mentioned you in a post." };
    default:
      return { bold: name, rest: ` sent you a ${notif.type}.` };
  }
}

// ─── Avatar ──────────────────────────────────────────────────────────────────

function Avatar({ name, senderId, profilePicture, size = 44 }) {
  const { bg, fg } = getAvatarStyle(senderId);
  if (profilePicture) {
    return (
      <img
        src={profilePicture}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        color: fg,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.37,
        fontWeight: 700,
        letterSpacing: "-0.02em",
      }}
    >
      {getInitials(name)}
    </div>
  );
}

// ─── Thumbnail ───────────────────────────────────────────────────────────────

function Thumbnail({ url }) {
  if (!url) return null;
  return (
    <img
      src={url}
      alt=""
      style={{
        width: 44,
        height: 44,
        borderRadius: 6,
        objectFit: "cover",
        flexShrink: 0,
      }}
    />
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 16px",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#1a1a1a",
          flexShrink: 0,
        }}
      />
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}
      >
        <div
          style={{
            height: 11,
            width: "55%",
            borderRadius: 6,
            background: "#1a1a1a",
          }}
        />
        <div
          style={{
            height: 10,
            width: "80%",
            borderRadius: 6,
            background: "#151515",
          }}
        />
      </div>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 6,
          background: "#1a1a1a",
          flexShrink: 0,
        }}
      />
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ text }) {
  return (
    <p
      style={{
        margin: 0,
        padding: "14px 16px 6px",
        fontSize: 15,
        fontWeight: 700,
        color: "#f0f0f0",
        letterSpacing: "-0.01em",
      }}
    >
      {text}
    </p>
  );
}

// ─── Notification row ─────────────────────────────────────────────────────────

function NotificationRow({
  notif,
  onRead,
  onAccept,
  onDecline,
  onDelete,
  removing,
}) {
  const sender = notif.sender ?? {};
  const senderName = sender.username || "Unknown";
  const { bold, rest } = getNotifText(notif);
  const time = formatTime(notif.createdAt);
  const isPending =
    notif.type === "follow_request" && notif.status === "pending";
  const hasThumb = ["like", "comment", "mention"].includes(notif.type);

  return (
    <div
      onClick={() => {
        if (!notif.read) onRead(notif._id);
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 16px",
        background: removing
          ? "transparent"
          : notif.read
            ? "transparent"
            : "#11112a",
        opacity: removing ? 0 : 1,
        maxHeight: removing ? 0 : 200,
        overflow: "hidden",
        transition: removing
          ? "opacity 0.25s ease, max-height 0.3s ease 0.2s"
          : "background 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        if (!removing) e.currentTarget.style.background = "#111111";
      }}
      onMouseLeave={(e) => {
        if (!removing) {
          e.currentTarget.style.background = notif.read
            ? "transparent"
            : "#11112a";
        }
      }}
    >
      {/* Unread dot */}
      <div
        style={{
          width: 8,
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {!notif.read && (
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#3897f0",
            }}
          />
        )}
      </div>

      {/* Avatar */}
      <Avatar
        name={senderName}
        senderId={sender._id}
        profilePicture={sender.profilePicture}
        size={44}
      />

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "#e8e8e8",
            lineHeight: 1.45,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: isPending ? 1 : 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          <span style={{ fontWeight: 600 }}>{bold}</span>
          <span style={{ color: "#a0a0a0" }}>{rest}</span>
          {"  "}
          <span style={{ color: "#555", fontSize: 13 }}>{time}</span>
        </p>

        {/* Follow request buttons */}
        {isPending && (
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAccept(notif._id);
              }}
              style={{
                padding: "6px 18px",
                borderRadius: 8,
                border: "none",
                background: "#3897f0",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Confirm
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDecline(notif._id);
              }}
              style={{
                padding: "6px 18px",
                borderRadius: 8,
                border: "none",
                background: "#2a2a2a",
                color: "#e8e8e8",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Post thumbnail or delete button */}
      {hasThumb && notif.postThumbnail ? (
        <Thumbnail url={notif.postThumbnail} />
      ) : !isPending ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(notif._id);
          }}
          style={{
            background: "transparent",
            border: "none",
            color: "#444",
            cursor: "pointer",
            padding: 4,
            borderRadius: 4,
            fontSize: 18,
            lineHeight: 1,
            flexShrink: 0,
          }}
          title="Remove"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const availableHeight = useAvailableHeight();
  const [notifications, setNotifications] = useState([]);
  const [removing, setRemoving] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchData("/api/notifications", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch notifications");
      setNotifications(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    if (loading || notifications.length === 0) return;
    const hasUnread = notifications.some((n) => !n.read);
    if (!hasUnread) return;

    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

    fetchData("/api/notifications/read-all", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        window.dispatchEvent(new CustomEvent("notifications:read-all"));
      })
      .catch((err) => console.error("Failed to mark all as read:", err));
  }, [loading]);

  const animateRemove = (id) => {
    setRemoving((prev) => new Set([...prev, id]));
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      setRemoving((prev) => {
        const s = new Set(prev);
        s.delete(id);
        return s;
      });
    }, 500);
  };

  const markRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
    );
    try {
      await fetchData(`/api/notifications/${id}/read`, {
        method: "PATCH",
        credentials: "include",
      });
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleDelete = async (id) => {
    animateRemove(id);
    try {
      await fetchData(`/api/notifications/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
    } catch (err) {
      console.error("Failed to delete:", err);
      fetchNotifications();
    }
  };

  const handleAccept = async (id) => {
    animateRemove(id);
    try {
      await fetchData(`/api/notifications/${id}/accept`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      if (err.status === 404) return;
      console.error("Accept error:", err);
      fetchNotifications();
    }
  };

  const handleDecline = async (id) => {
    animateRemove(id);
    try {
      await fetchData(`/api/notifications/${id}/decline`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      if (err.status === 404) return;
      console.error("Decline error:", err);
      fetchNotifications();
    }
  };

  const newNotifs = notifications.filter(
    (n) => getAgeGroup(n.createdAt) === "new",
  );
  const weekNotifs = notifications.filter(
    (n) => getAgeGroup(n.createdAt) === "week",
  );
  const monthNotifs = notifications.filter(
    (n) => getAgeGroup(n.createdAt) === "month",
  );

  const rowProps = {
    onRead: markRead,
    onAccept: handleAccept,
    onDecline: handleDecline,
    onDelete: handleDelete,
  };

  if (error) {
    return (
      <div
        style={{
          fontFamily: "'DM Sans', -apple-system, sans-serif",
          background: "#0a0a0a",
          color: "#e0e0e0",
          height: availableHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ margin: 0, color: "#c0392b", fontSize: 14 }}>
            Failed to load notifications
          </p>
          <button
            onClick={fetchNotifications}
            style={{
              marginTop: 12,
              padding: "8px 20px",
              borderRadius: 8,
              border: "none",
              background: "#3897f0",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        background: "#0a0a0a",
        color: "#e0e0e0",
        height: availableHeight,
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "#1e1e1e transparent",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#0a0a0a",
          borderBottom: "1px solid #181818",
          padding: "16px 16px 14px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <button
          onClick={() => window.history.back()}
          style={{
            background: "transparent",
            border: "none",
            color: "#f0f0f0",
            cursor: "pointer",
            padding: "4px 6px 4px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          title="Go back"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 700,
            color: "#f0f0f0",
            letterSpacing: "-0.03em",
          }}
        >
          Notifications
        </h1>
      </div>

      {/* Content */}
      {loading ? (
        <div>
          {Array.from({ length: 7 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 0",
            gap: 12,
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2a2a2a"
            strokeWidth="1.5"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <p style={{ margin: 0, color: "#333", fontSize: 14 }}>
            No notifications yet
          </p>
        </div>
      ) : (
        <>
          {newNotifs.length > 0 && (
            <>
              <SectionLabel text="New" />
              {newNotifs.map((n) => (
                <NotificationRow
                  key={n._id}
                  notif={n}
                  removing={removing.has(n._id)}
                  {...rowProps}
                />
              ))}
            </>
          )}
          {weekNotifs.length > 0 && (
            <>
              <SectionLabel text="This week" />
              {weekNotifs.map((n) => (
                <NotificationRow
                  key={n._id}
                  notif={n}
                  removing={removing.has(n._id)}
                  {...rowProps}
                />
              ))}
            </>
          )}
          {monthNotifs.length > 0 && (
            <>
              <SectionLabel text="This month" />
              {monthNotifs.map((n) => (
                <NotificationRow
                  key={n._id}
                  notif={n}
                  removing={removing.has(n._id)}
                  {...rowProps}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}
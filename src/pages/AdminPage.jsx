import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import fetchData from "../utils/fetchData";
import {
  ArrowLeft,
  Flag,
  Trash2,
  UserX,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
} from "lucide-react";

const TABS = ["Pending", "Dismissed"];
const ADMIN_ID = import.meta.env.VITE_ADMIN_USER_ID;

function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("Pending");
  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const isAdmin =
    !authLoading && user && String(user._id ?? user.id) === ADMIN_ID;

  // Auth guard
  useEffect(() => {
    if (authLoading) return;
    if (!isAdmin) navigate("/", { replace: true });
  }, [user, authLoading]);

  // Fetch reports
  const fetchReports = useCallback(async () => {
    setReportsLoading(true);
    try {
      const res = await fetchData(
        `/api/admin/reports?status=${tab.toLowerCase()}`,
        { credentials: "include" },
      );
      const data = await res.json();
      setReports(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setReportsLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    if (!authLoading && isAdmin) fetchReports();
  }, [fetchReports, authLoading, isAdmin]);

  const handleDeletePost = async (postId) => {
    setActionLoading(`delete-${postId}`);
    try {
      await fetchData(`/api/admin/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });
      setReports((prev) => prev.filter((r) => r.post._id !== postId));
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleBanUser = async (userId, postId) => {
    setActionLoading(`ban-${userId}`);
    try {
      await fetchData(`/api/admin/users/${userId}/ban`, {
        method: "POST",
        credentials: "include",
      });
      setReports((prev) => prev.filter((r) => r.post._id !== postId));
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDismiss = async (postId) => {
    setActionLoading(`dismiss-${postId}`);
    try {
      await fetchData(`/api/admin/reports/${postId}/dismiss`, {
        method: "POST",
        credentials: "include",
      });
      setReports((prev) => prev.filter((r) => r.post._id !== postId));
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  if (authLoading) return null;
  if (!isAdmin) return null;

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-2xl mx-auto px-4 pt-8 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/8 transition-all duration-150 active:scale-95"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex items-center gap-2.5">
            <ShieldAlert size={18} className="text-red-400" />
            <h1 className="text-[20px] font-bold text-white tracking-tight">
              Admin Panel
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-150 border
                ${
                  tab === t
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white/40 border-white/10 hover:border-white/25 hover:text-white/70"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        {reportsLoading ? (
          <div className="flex items-center justify-center h-40">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animation: "spin 0.8s linear infinite" }}
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-2">
            <Flag size={28} className="text-white/20" />
            <p className="text-[13px] text-white/30">
              No {tab.toLowerCase()} reports
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((report) => {
              const isExpanded = expanded === report.post._id;
              const isDeleting = actionLoading === `delete-${report.post._id}`;
              const isBanning = actionLoading === `ban-${report.post.user._id}`;
              const isDismissing =
                actionLoading === `dismiss-${report.post._id}`;
              const anyLoading = isDeleting || isBanning || isDismissing;

              return (
                <div
                  key={report.post._id}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden"
                >
                  {/* Post row */}
                  <div className="flex items-center gap-3 p-3">
                    <img
                      src={report.post.imageUrl}
                      alt=""
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-white/80 truncate">
                        @{report.post.user?.username}
                      </p>
                      {report.post.caption && (
                        <p className="text-[12px] text-white/35 truncate mt-0.5">
                          {report.post.caption}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <Flag size={10} className="text-red-400" />
                        <span className="text-[11px] text-red-400 font-medium">
                          {report.reportCount}{" "}
                          {report.reportCount === 1 ? "report" : "reports"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setExpanded(isExpanded ? null : report.post._id)
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/8 text-white/30 hover:text-white/60 hover:bg-white/6 transition-all duration-150 flex-shrink-0"
                    >
                      {isExpanded ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>
                  </div>

                  {/* Expanded: reasons + actions */}
                  {isExpanded && (
                    <div className="border-t border-white/8 px-3 pb-3 pt-2.5">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-white/25 mb-2">
                        Reasons
                      </p>
                      <div className="space-y-1 mb-4">
                        {report.reasons.map(({ reason, count }) => (
                          <div
                            key={reason}
                            className="flex items-center justify-between"
                          >
                            <span className="text-[12.5px] text-white/55">
                              {reason}
                            </span>
                            <span className="text-[12px] font-medium text-white/35">
                              ×{count}
                            </span>
                          </div>
                        ))}
                      </div>

                      {tab === "Pending" && (
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => handleDismiss(report.post._id)}
                            disabled={anyLoading}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-[12px] font-medium text-white/50 hover:text-white hover:border-white/25 hover:bg-white/6 transition-all duration-150 disabled:opacity-40 disabled:cursor-default active:scale-95"
                          >
                            {isDismissing ? <Spinner /> : null}
                            Dismiss
                          </button>
                          <button
                            onClick={() => handleDeletePost(report.post._id)}
                            disabled={anyLoading}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/20 text-[12px] font-medium text-red-400 hover:bg-red-500/8 hover:border-red-500/40 transition-all duration-150 disabled:opacity-40 disabled:cursor-default active:scale-95"
                          >
                            {isDeleting ? (
                              <Spinner color="#f87171" />
                            ) : (
                              <Trash2 size={12} />
                            )}
                            Delete Post
                          </button>
                          <button
                            onClick={() =>
                              handleBanUser(
                                report.post.user._id,
                                report.post._id,
                              )
                            }
                            disabled={anyLoading}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-orange-500/20 text-[12px] font-medium text-orange-400 hover:bg-orange-500/8 hover:border-orange-500/40 transition-all duration-150 disabled:opacity-40 disabled:cursor-default active:scale-95"
                          >
                            {isBanning ? (
                              <Spinner color="#fb923c" />
                            ) : (
                              <UserX size={12} />
                            )}
                            Ban User
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Spinner({ color = "rgba(255,255,255,0.4)" }) {
  return (
    <>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        style={{ animation: "spin 0.8s linear infinite" }}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}

export default AdminPage;

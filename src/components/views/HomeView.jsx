import { useEffect, useState } from "react";
import PostCard from "../PostCard";
import LeftSidebar from "../LeftSidebar";
import RightSidebar from "../RightSidebar";
import fetchData from "../../utils/fetchData";
import SkeletonPost from "../SkeletonPost";

function HomeView({openProfile}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const start = Date.now();

    fetchData("/api/posts", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const elapsed = Date.now() - start;
        const delay = Math.max(900 - elapsed, 0); // minimum skeleton time

        setTimeout(() => {
          setPosts(data);
          setLoading(false);
        }, delay);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="h-screen overflow-y-auto text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT SIDEBAR */}
        <div className="hidden lg:block lg:col-span-3 sticky top-6 h-[calc(100vh-3rem)]">
          <LeftSidebar />
        </div>

        {/* FEED */}
        <div className="lg:col-span-6 space-y-6 transition-opacity duration-500">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonPost key={i} />)
            : posts.map((post) => <PostCard key={post._id} post={post} openProfile={openProfile} />)}

          {/* 🔥 bottom breathing space */}
          {!loading && <div className="h-[20vh] bg-black" />}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="hidden lg:block lg:col-span-3 sticky top-6 h-[calc(100vh-3rem)]">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default HomeView;

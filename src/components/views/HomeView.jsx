import { useEffect, useState } from "react";
import PostCard from "../PostCard";
import LeftSidebar from "../LeftSidebar";
import RightSidebar from "../RightSidebar";

function HomeView() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://service.weblinkup.online/api/posts", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading feed...</div>;
  }

return (
  <div className="h-screen overflow-y-auto text-white">
    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT SIDEBAR */}
      <div className="hidden lg:block lg:col-span-3 sticky top-6 h-[calc(100vh-3rem)]">
        <LeftSidebar />
      </div>

      {/* FEED */}
      <div className="lg:col-span-6 space-y-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
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

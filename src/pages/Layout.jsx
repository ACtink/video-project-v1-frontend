// import Header from "../components/Header.jsx";
// import Footer from "../components/Footer.jsx";
// import { Outlet, useLocation } from "react-router-dom";

// import { WebRTCProvider } from "../context/WebRTC.jsx";
// import { WebSocketProvider } from "../context/WebSocket.jsx";
// import { RTCBridge } from "../context/RTCBridge.jsx";

// import { useAuth } from "../hooks/useAuth";

// function Layout() {
//   const location = useLocation();

//   const { user } = useAuth();

//   const hideHeader = location.pathname === "/video";

//   const hideFooter =
//     location.pathname === "/join" ||
//     location.pathname === "/login" ||
//     (location.pathname === "/" && !user);

//   return (
//     <div className="min-h-screen w-full bg-black text-white flex flex-col">
//       {/* Header */}

//       <WebRTCProvider>
//         <WebSocketProvider>
//           <RTCBridge />
//           {!hideHeader && <Header />}

//           {/* ✅ Animation wrapper added */}
//           <main className="flex-1 overflow-hidden relative">
//             <div
//               key={location.pathname}
//               className="absolute inset-0 animate-page overflow-y-auto"
//             >
//               <Outlet />
//             </div>
//           </main>
//           {!hideFooter && <Footer />}
//         </WebSocketProvider>
//       </WebRTCProvider>

//       {/* Footer */}
//     </div>
//   );
// }

// export default Layout;


import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet, useLocation } from "react-router-dom";

import { WebRTCProvider } from "../context/WebRTC.jsx";
import { WebSocketProvider } from "../context/WebSocket.jsx";
import { RTCBridge } from "../context/RTCBridge.jsx";

import { useAuth } from "../hooks/useAuth";

function Layout() {
  const location = useLocation();
  const { user } = useAuth();

  const hideHeader = location.pathname === "/video";

  const hideFooter =
    location.pathname === "/join" ||
    location.pathname === "/login" ||
    (location.pathname === "/" && !user);

  return (
    <div
      className="w-full bg-black text-white flex flex-col"
      style={{ height: "100dvh" }} // ✅ dvh instead of min-h-screen
    >
      <WebRTCProvider>
        <WebSocketProvider>
          <RTCBridge />

          {!hideHeader && <Header />}

          <main
            className="flex-1 relative"
            style={{ overflowY: "auto", minHeight: 0 }} // ✅ minHeight:0 is important for flex children
          >
            <div
              key={location.pathname}
              className="absolute inset-0 animate-page overflow-y-auto"
            >
              <Outlet />
            </div>
          </main>

          {!hideFooter && <Footer />}
        </WebSocketProvider>
      </WebRTCProvider>
    </div>
  );
}

export default Layout;

function Layout({ header, children, showHeader }) {
  return (
    <div className="h-screen flex overflow-hidden  flex-col">
      {/* Header */}
      <div className="shrink-0"> {showHeader && header}</div>

      {/* Main content */}
      <div className="flex-1 flex flex-col  overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default Layout;

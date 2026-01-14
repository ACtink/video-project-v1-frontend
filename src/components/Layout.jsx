function Layout({ header, children, showHeader }) {
  return (
    <div className="h-screen flex   flex-col overflow-hidden">
      {/* Header */}
      <div className="shrink-0"> {showHeader && header}</div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default Layout;

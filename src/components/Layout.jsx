function Layout({ header, children }) {
  return (
    <div className="h-screen flex   flex-col overflow-hidden">
      {/* Header */}
      <div className="shrink-0">{header}</div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default Layout;

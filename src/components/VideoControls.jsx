function VideoControls({ callState, onStart, onExit, onNext, onClose }) {
  if (callState === "idle") {
    return <button onClick={onStart}>Start</button>;
  }

  if (callState === "searching") {
    return <button onClick={onExit}>Exit</button>;
  }

  if (callState === "connected") {
    return (
      <>
        <button onClick={onNext}>Next</button>
        <button onClick={onClose}>Close</button>
      </>
    );
  }

  return null;
}

export default VideoControls;

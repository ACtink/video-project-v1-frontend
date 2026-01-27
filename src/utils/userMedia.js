export const setupUserMedia = async (localVideoRef, localStreamRef) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  // 👇 RIGHT HERE
  localVideoRef.current.srcObject = stream;
  localVideoRef.current.muted = true; // ← ADD THIS LINE
  localVideoRef.current.playsInline = true;

  await localVideoRef.current.play();

  localStreamRef.current = stream;
  return stream;
};

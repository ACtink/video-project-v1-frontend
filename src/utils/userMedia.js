



export const setupUserMedia = async (localVideoRef,localStreamRef) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    // audio: true,
  });

  localVideoRef.current.srcObject = stream;
  localStreamRef.current = stream;

  return stream;
};

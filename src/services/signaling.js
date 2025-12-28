export function sendSignal(socket, data) {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;
  socket.send(JSON.stringify(data));
}

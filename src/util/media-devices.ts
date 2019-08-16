const handleMediaDevicesUnavailable = () => {
  return Promise.reject({
    error: 'Your browser does not support access to media devices.',
  });
}

export const getAudioStream = () => {
  if (!navigator.mediaDevices) {
    return handleMediaDevicesUnavailable();
  }

  return navigator.mediaDevices.getUserMedia({ audio: true });
}

export const getVideoStream = (options: MediaStreamConstraints) => {
  if (!navigator.mediaDevices) {
    return handleMediaDevicesUnavailable();
  }

  return navigator.mediaDevices.getUserMedia({ audio: options.audio || true, video: true });
}
export const generateSourceUrl = (audioFragments: any[], blobOptions = { 'type' : 'audio/ogg; codecs=opus' }) => {
  /*
   * This prevents the 416 error from happening.
   * This forces the media recorder to create a new Blob when the recording is stopped.
   */
  const audioBlob = new Blob(audioFragments, blobOptions);

  return URL.createObjectURL(audioBlob);
}
export const generateThumbnail = (file: File, seekTime = 2): Promise<Blob | null> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const url = URL.createObjectURL(file);
    video.src = url;
    video.crossOrigin = "anonymous";

    video.onloadedmetadata = () => {
      const safeSeekTime = Math.min(seekTime, video.duration - 0.1);
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.currentTime = safeSeekTime > 0 ? safeSeekTime : 0;
    };

    video.onseeked = () => {
      try {
        context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        canvas.toBlob(
          (blob) => {
            resolve(blob);
            URL.revokeObjectURL(url);
          },
          "image/jpeg",
          0.9
        );
      } catch (err) {
        reject(err);
        URL.revokeObjectURL(url);
      }
    };

    video.onerror = (err) => {
      reject(err);
      URL.revokeObjectURL(url);
    };
  });
};

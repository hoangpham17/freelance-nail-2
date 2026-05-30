const VIDEO_EXTENSION = /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i;

export function isVideoUrl(url: string): boolean {
  try {
    const { pathname } = new URL(url);
    return VIDEO_EXTENSION.test(pathname);
  } catch {
    return VIDEO_EXTENSION.test(url.split("?")[0] ?? url);
  }
}

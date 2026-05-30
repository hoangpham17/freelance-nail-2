import { isVideoUrl } from "./isVideoUrl";

export type GalleryAttachment = {
  id?: string;
  url?: string;
  filename?: string;
  type?: string;
  thumbnails?: {
    full?: { url: string };
    large?: { url: string };
  };
};

export function isVideoAttachment(
  attachment: GalleryAttachment | string,
): boolean {
  if (typeof attachment === "string") {
    return isVideoUrl(attachment);
  }
  if (attachment.type?.startsWith("video/")) return true;
  if (attachment.filename && isVideoUrl(attachment.filename)) return true;
  if (attachment.url && isVideoUrl(attachment.url)) return true;
  return false;
}

export function getGalleryAttachmentUrl(
  attachment: GalleryAttachment | string,
): string | undefined {
  if (typeof attachment === "string") return attachment;
  if (isVideoAttachment(attachment)) return attachment.url;
  return attachment.thumbnails?.full?.url ?? attachment.url;
}

export function hasValidGalleryAttachment(
  attachment: GalleryAttachment | string | undefined | null,
): boolean {
  if (!attachment) return false;
  return !!getGalleryAttachmentUrl(attachment);
}

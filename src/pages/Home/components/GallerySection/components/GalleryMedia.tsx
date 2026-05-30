import React, { useRef } from "react";
import clsx from "clsx";
import { isVideoUrl } from "../utils/isVideoUrl";

type GalleryMediaProps = {
  url: string;
  className?: string;
  alt?: string;
  /** From Airtable attachment type; falls back to URL/filename check */
  isVideo?: boolean;
  /** cover = grid tiles; contain = popup / intrinsic sizing */
  fit?: "cover" | "contain";
  /** hover = autoplay on hover (grid); manual = click to play/pause (popup) */
  videoPlayback?: "hover" | "manual";
};

const GalleryMedia: React.FC<GalleryMediaProps> = ({
  url,
  className,
  alt = "",
  isVideo: isVideoProp,
  fit = "cover",
  videoPlayback = "hover",
}) => {
  const fitClassName =
    fit === "contain" ? "object-contain" : "size-full object-cover";
  const videoRef = useRef<HTMLVideoElement>(null);
  const isManualPlayback = videoPlayback === "manual";

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => {});
  };

  const pauseAndResetVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const isVideo = isVideoProp ?? isVideoUrl(url);

  if (isVideo) {
    return (
      <video
        ref={videoRef}
        src={url}
        muted
        playsInline
        loop
        preload="metadata"
        {...(alt ? { "aria-label": alt } : { "aria-hidden": true })}
        className={clsx(
          fitClassName,
          className,
          isManualPlayback && "cursor-pointer",
        )}
        onClick={
          isManualPlayback
            ? (e) => {
                e.stopPropagation();
                togglePlayback();
              }
            : undefined
        }
        onMouseEnter={!isManualPlayback ? playVideo : undefined}
        onMouseLeave={!isManualPlayback ? pauseAndResetVideo : undefined}
        onFocus={!isManualPlayback ? playVideo : undefined}
        onBlur={!isManualPlayback ? pauseAndResetVideo : undefined}
        onKeyDown={
          isManualPlayback
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  togglePlayback();
                }
              }
            : undefined
        }
        tabIndex={isManualPlayback ? 0 : undefined}
      />
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      className={clsx(fitClassName, className)}
    />
  );
};

export default GalleryMedia;

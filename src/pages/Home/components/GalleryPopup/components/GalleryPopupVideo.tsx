import React, { useRef, useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import "../gallery-popup-video.css";

type OverlayState = "none" | "pause-flash" | "play";

type GalleryPopupVideoProps = {
  url: string;
  alt?: string;
  className?: string;
  isActive: boolean;
};

const VideoControlIcon: React.FC<{ variant: "play" | "pause" }> = ({
  variant,
}) => (
  <span className="flex size-14 md:size-16 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
    {variant === "play" ? (
      <svg
        viewBox="0 0 24 24"
        className="size-7 md:size-8"
        fill="currentColor"
        aria-hidden
      >
        <path d="M8 6v12l12-6-12-6z" />
      </svg>
    ) : (
      <svg
        viewBox="0 0 24 24"
        className="size-7 md:size-8"
        fill="currentColor"
        aria-hidden
      >
        <rect x="6" y="5" width="4" height="14" rx="0.5" />
        <rect x="14" y="5" width="4" height="14" rx="0.5" />
      </svg>
    )}
  </span>
);

const GalleryPopupVideo: React.FC<GalleryPopupVideoProps> = ({
  url,
  alt = "",
  className,
  isActive,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [overlay, setOverlay] = useState<OverlayState>("none");

  const playFromStart = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setOverlay("none");
    void video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isActive) {
      video.pause();
      setOverlay("none");
      return;
    }

    playFromStart();
  }, [isActive, url, playFromStart]);

  const handlePauseIconAnimationEnd = () => {
    setOverlay((current) => (current === "pause-flash" ? "play" : current));
  };

  const handleToggle = (
    e: React.MouseEvent<HTMLVideoElement> | React.KeyboardEvent<HTMLVideoElement>,
  ) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      playFromStart();
      return;
    }

    video.pause();
    setOverlay("pause-flash");
  };

  return (
    <div className="relative flex w-full max-w-full justify-center">
      <video
        ref={videoRef}
        src={url}
        muted
        playsInline
        loop
        preload="metadata"
        aria-label={alt || undefined}
        className={clsx(
          "block max-h-[75vh] max-w-full w-auto cursor-pointer rounded-lg",
          className,
        )}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle(e);
          }
        }}
        tabIndex={0}
      />

      {overlay === "pause-flash" ? (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg"
          aria-hidden
        >
          <span
            className="gallery-popup-video__pause-icon"
            onAnimationEnd={handlePauseIconAnimationEnd}
          >
            <VideoControlIcon variant="pause" />
          </span>
        </div>
      ) : null}

      {overlay === "play" ? (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg"
          aria-hidden
        >
          <VideoControlIcon variant="play" />
        </div>
      ) : null}
    </div>
  );
};

export default GalleryPopupVideo;

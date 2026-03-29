"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export type KaaraniEmotion = "idle" | "talking" | "happy" | "thinking";

const EMOTION_VIDEO: Record<Exclude<KaaraniEmotion, "idle">, string> = {
  talking:  "/avatar/Animated_Tutor_Character_Explaining.mp4",
  happy:    "/avatar/Animated_Tutor_Character_Thumbs_Up.mp4",
  thinking: "/avatar/thinking.mp4",
};

interface KaaraniAvatarProps {
  emotion?: KaaraniEmotion;
  size?: number;
  className?: string;
}

export function KaaraniAvatar({
  emotion = "idle",
  size = 40,
  className = "",
}: KaaraniAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isFluid = className.includes("w-full");
  const isActive = emotion !== "idle";
  const videoSrc = isActive ? EMOTION_VIDEO[emotion] : null;

  // Swap video src when emotion changes and restart playback
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoSrc) return;
    v.src = videoSrc;
    v.load();
    v.play().catch(() => {/* autoplay blocked — video will show first frame */});
  }, [videoSrc]);

  const sharedStyle = isFluid
    ? { flexShrink: 0 }
    : { flexShrink: 0, width: size, height: size };

  const sharedClass = `object-cover rounded-full ${className}`;

  // Idle → static image
  if (!isActive) {
    return (
      <Image
        src="/avatar/Kaarani Tutor.png"
        alt="Kaarani"
        width={isFluid ? 240 : size}
        height={isFluid ? 240 : size}
        className={sharedClass}
        style={sharedStyle}
        priority
      />
    );
  }

  // Talking / happy / thinking → animated video
  return (
    <video
      ref={videoRef}
      src={videoSrc!}
      width={isFluid ? undefined : size}
      height={isFluid ? undefined : size}
      autoPlay
      loop
      muted
      playsInline
      aria-label="Kaarani"
      className={sharedClass}
      style={sharedStyle}
    />
  );
}

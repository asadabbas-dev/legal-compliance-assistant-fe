"use client";

import { useId } from "react";

/**
 * Section dividers: waves and inclined shapes at the bottom of sections.
 * Uses absolute positioning at bottom of parent section for proper alignment.
 * Supports gradientFrom/gradientTo for smooth transitions between sections.
 */
const WAVE_HEIGHT = 56;

export function WaveDivider({ fill, gradientFrom, gradientTo, className = "" }) {
  const id = useId().replace(/:/g, "");
  const useGradient = gradientFrom != null && gradientTo != null;
  const fillColor = fill ?? (useGradient ? undefined : "#0f172a");

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 w-full flex-shrink-0 overflow-hidden ${className}`}
      style={{ height: WAVE_HEIGHT }}
      aria-hidden
    >
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="block h-full w-full">
        {useGradient && (
          <defs>
            <linearGradient id={`wave-grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={gradientFrom} />
              <stop offset="100%" stopColor={gradientTo} />
            </linearGradient>
          </defs>
        )}
        <path
          d="M0 64 C360 0 1080 0 1440 64 L1440 64 L0 64 Z"
          fill={useGradient ? `url(#wave-grad-${id})` : fillColor}
        />
      </svg>
    </div>
  );
}

export function CurveDivider({ fill = "#0f172a", className = "" }) {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 w-full flex-shrink-0 overflow-hidden ${className}`}
      style={{ height: WAVE_HEIGHT }}
      aria-hidden
    >
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="block h-full w-full">
        <path d="M0 64 Q360 8 720 64 T1440 64 L1440 64 L0 64 Z" fill={fill} />
      </svg>
    </div>
  );
}

export function AngledDivider({ fill = "#0f172a", flip = false, className = "" }) {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 w-full flex-shrink-0 overflow-hidden ${className}`}
      style={{ height: WAVE_HEIGHT }}
      aria-hidden
    >
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className={`block h-full w-full ${flip ? "scale-y-[-1]" : ""}`}>
        <path d="M0 64V32l720-32 720 32V64H0z" fill={fill} />
      </svg>
    </div>
  );
}

export function StraightInclinedDivider({ fill, gradientFrom, gradientTo, gradientFromLeft, flip = false, fromLeft = false, className = "" }) {
  const id = useId().replace(/:/g, "");
  const useGradient = gradientFrom != null && gradientTo != null;
  const fillColor = fill ?? (useGradient ? undefined : "#0f172a");
  // fromLeft: diagonal starts at top-left, goes to bottom-right (originates from left)
  const pathD = fromLeft ? "M0 0 L1440 64 L0 64 Z" : "M0 64L1440 0v64H0z";
  // When fromLeft + gradientFromLeft: diagonal gradient matches section (black left, gradientFrom right), then transitions to gradientTo
  const useDiagonalGradient = fromLeft && gradientFromLeft != null && useGradient;

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 w-full flex-shrink-0 overflow-hidden ${className}`}
      style={{ height: WAVE_HEIGHT }}
      aria-hidden
    >
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className={`block h-full w-full ${flip ? "scale-y-[-1]" : ""}`}>
        {useGradient && (
          <defs>
            {useDiagonalGradient ? (
              <linearGradient id={`inclined-grad-${id}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="128">
                <stop offset="0%" stopColor={gradientFromLeft} />
                <stop offset="50%" stopColor={gradientFrom} />
                <stop offset="100%" stopColor={gradientTo} />
              </linearGradient>
            ) : (
              <linearGradient id={`inclined-grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={gradientFrom} />
                <stop offset="100%" stopColor={gradientTo} />
              </linearGradient>
            )}
          </defs>
        )}
        <path
          d={pathD}
          fill={useGradient ? `url(#inclined-grad-${id})` : fillColor}
        />
      </svg>
    </div>
  );
}

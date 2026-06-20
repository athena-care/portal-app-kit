/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/components/video/video.styles.ts
import { css } from "lit";
var video_styles_default = css`
  :host {
    display: block;
    position: relative;
    color: var(--wa-color-text-normal);
    max-width: 100%;

    /* Controls */
    --controls-color: white;
    --controls-background: var(--wa-color-surface-default);

    /* Poster play button (used in color-mix for hover state) */
    --poster-play-button-background: var(--wa-color-surface-default);

    wa-popover::part(body) {
      padding: var(--wa-space-xs);
    }

    wa-drawer::part(dialog) {
      width: 100vw;
    }
  }

  video {
    &:focus {
      outline: none;
    }
  }

  /* Focus ring on the video wrapper when the host element is keyboard-focused */
  :host(:focus-visible) .video-wrapper {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  .controls {
    wa-button::part(label) {
      display: inline-flex;
    }

    wa-button.captions-active {
      background: transparent;
      color: var(--wa-color-text-normal);
    }
  }

  /* State-paired slot visibility */
  :host([playing]) slot[name='play-icon'],
  :host(:not([playing])) slot[name='pause-icon'],
  :host([muted]) slot[name='volume-icon'],
  :host(:not([muted])) slot[name='mute-icon'],
  :host([fullscreen]) slot[name='fullscreen-icon'],
  :host(:not([fullscreen])) slot[name='exit-fullscreen-icon'] {
    display: none;
  }

  /* Base video container */
  .video-container {
    position: relative;
    background-color: var(--wa-color-surface-default);
    display: flex;
    flex-direction: column;
    container-type: inline-size;
    container-name: video-player;
    width: 100%;
  }

  /* Video content wrapper */
  .video-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  /* Video wrapper */
  .video-wrapper {
    position: relative;
    cursor: pointer;
    aspect-ratio: 16 / 9;
    background: #000;
    overflow: hidden;
    touch-action: manipulation;

    video {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
    }

    &[data-mobile] video {
      pointer-events: none;
    }

    &:hover .video-title-overlay,
    &[data-paused='true'] .video-title-overlay {
      opacity: 1;
    }

    &:hover .controls-overlay,
    &[data-paused='true'] .controls-overlay,
    &[data-controls-visible='true'] .controls-overlay {
      opacity: 1;
      pointer-events: auto;
    }

    &:not(:hover):not([data-paused='true']):not([data-controls-visible='true']) .custom-caption-overlay {
      bottom: 2rem;
    }

    &:hover .custom-caption-overlay,
    &[data-paused='true'] .custom-caption-overlay,
    &[data-controls-visible='true'] .custom-caption-overlay {
      bottom: 6rem;
    }
  }

  /* Mobile tap overlay — intercepts taps on iOS where <video> absorbs pointer events */
  .video-tap-overlay {
    position: absolute;
    inset: 0;
    z-index: 6;
    cursor: pointer;
    background: transparent;
  }

  /* Video title overlay */
  .video-title-overlay {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: var(--wa-space-m);
    background: linear-gradient(to bottom, var(--wa-color-overlay-modal) 0%, transparent 100%);
    color: white;
    font-size: var(--wa-font-size-l);
    font-weight: 600;
    z-index: 5;
    opacity: 0;
    transition: opacity var(--wa-transition-normal) var(--wa-transition-easing);
    pointer-events: none;
  }

  /* Poster overlay */
  .poster-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    cursor: pointer;

    &:hover .poster-play-button {
      background: color-mix(in srgb, var(--poster-play-button-background), #000 20%);
      transform: scale(1.1);
    }
  }

  .poster-play-button {
    width: var(--wa-space-4xl);
    height: var(--wa-space-4xl);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--poster-play-button-background);
    border-radius: 50%;
    color: var(--wa-color-text-normal);
    font-size: 3rem;
    transition-property: background, transform;
    transition-duration: var(--wa-transition-normal);
    transition-timing-function: var(--wa-transition-easing);
    z-index: 11;
  }

  /* Controls overlay at bottom */
  .controls-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
    opacity: 0;
    transition: opacity var(--wa-transition-normal) var(--wa-transition-easing);
    pointer-events: none;
    margin: var(--wa-space-2xs);
  }

  /* Mobile controls bar — rendered below the video in document flow */
  .mobile-controls-bar {
    background: var(--controls-background);
    color: var(--controls-color);
    z-index: 0;

    .mobile-timeline {
      padding: 0 var(--wa-space-xs) 0;

      wa-slider {
        touch-action: none;
      }
    }

    .controls {
      padding: 0;
      justify-content: space-between;
      border-radius: 0 0 var(--wa-border-radius-s) var(--wa-border-radius-s);
      box-shadow: none;
      border: none;
      flex-direction: row;
    }
  }

  /* Timeline inline within controls row */
  .timeline {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 var(--wa-space-xs);
    pointer-events: auto;
    min-width: 0;
    width: 100%;

    wa-slider {
      flex: 1;
      min-width: 0;
      touch-action: none;
      --track-size: 0.375rem;
      --thumb-width: 0.875rem;
      --thumb-height: 0.875rem;

      &::part(track) {
        background: var(--wa-color-neutral-fill-normal);
      }

      &::part(indicator) {
        background: var(--wa-form-control-activated-color);
      }

      &::part(thumb) {
        background: var(--wa-form-control-activated-color);

        transition: opacity var(--wa-transition-fast);
      }
    }

    &:hover wa-slider::part(thumb) {
      opacity: 1;
    }
  }
  .mobile-time {
    color: var(--wa-color-text-normal);
    font-size: var(--wa-font-size-2xs);
    flex: none;
  }

  .timeline-thumbnail {
    position: absolute;
    bottom: calc(100% + 10px);
    transform: translateX(-50%);
    border: var(--wa-border-width-m) solid var(--wa-color-surface-default);
    border-radius: var(--wa-border-radius-s);
    pointer-events: none;
    box-shadow: var(--wa-shadow-l);
    background-size: auto;
    background-repeat: no-repeat;

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid var(--wa-color-surface-default);
    }
  }

  /* Desktop controls inner layout */
  .controls-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .controls-row__start {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }

  /* Mobile controls timeline row */
  .mobile-timeline-row {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding: 0.25rem 0.5rem 0;
  }

  /* Mobile controls left/right button groups */
  .controls-group {
    display: flex;
    align-items: center;
  }

  /* Control buttons below timeline */
  .controls {
    display: flex;
    align-items: center;
    gap: var(--wa-space-xs);
    background: var(--controls-background);
    color: var(--controls-color);
    pointer-events: auto;
    border-radius: var(--wa-panel-border-radius);
    justify-content: space-around;
    border: var(--wa-panel-border-width) solid var(--wa-color-surface-border);
    flex-direction: column;
  }

  .time-display {
    font-size: var(--wa-font-size-s);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .spacer {
    flex: 1;
  }

  .speed-label {
    margin-left: var(--wa-space-2xs);
    font-size: var(--wa-font-size-xs);
    text-align: left;
  }

  /* Volume popover */
  .volume-popover {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--wa-space-xs);
    padding: var(--wa-space-xs) var(--wa-space-2xs);

    wa-slider {
      --height: 100px;
      --track-width: 4px;
      --thumb-size: 14px;
      width: 100%;

      &::part(base) {
        width: 100%;
      }

      &::part(thumb) {
        border-radius: 50%;
      }
    }
  }

  .volume-label {
    font-size: var(--wa-font-size-xs);
    color: var(--wa-color-text-normal);
    white-space: nowrap;
  }

  /* Custom captions */
  .custom-caption-overlay {
    position: absolute;
    bottom: 6rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    z-index: 15;
    padding: 0 var(--wa-space-xl);
    transition: bottom var(--wa-transition-normal) var(--wa-transition-easing);
  }

  .custom-caption {
    background-color: rgba(0, 0, 0, 0.9);
    color: white;

    font-weight: 500;
    line-height: 1.4;
    padding: var(--wa-space-xs) var(--wa-space-m);
    border-radius: var(--wa-border-radius-s);
    text-align: center;
    max-width: 80%;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);

    @container video-player (max-width: 480px) {
      font-size: var(--wa-font-size-xs);
    }
  }

  /* Mobile more-menu drawer contents */
  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: var(--wa-space-s);
  }

  /* Visually hidden but accessible to screen readers */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  /* Double-tap seek indicator badge */
  .seek-indicator {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--wa-space-2xs);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    justify-content: center;
    font-size: var(--wa-font-size-xs);
    font-weight: 600;
    pointer-events: none;
    z-index: 25;
    animation: seek-indicator-fade 0.6s var(--wa-transition-easing) forwards;

    wa-icon {
      width: 1.5rem;
      height: 1.5rem;
    }

    &.seek-indicator--backward {
      left: 15%;
    }

    &.seek-indicator--forward {
      right: 15%;
    }
  }

  /*
   * Theme overrides for wa-slider parts inside this shadow root.
   * External theme stylesheets cannot reach components nested in a shadow DOM via
   * element selectors, so we mirror the relevant ::part() rules here using
   * :host-context() to detect the active theme.
   */

  :host-context(.wa-theme-brutalist) {
    wa-slider::part(track),
    wa-slider::part(thumb) {
      border-radius: var(--wa-border-radius-square);
    }
  }

  :host-context(.wa-theme-playful) {
    wa-slider::part(thumb) {
      box-shadow: var(--wa-shadow-s), var(--shadow-lower), var(--shadow-upper);
    }
  }

  :host-context(.wa-theme-active) {
    wa-slider::part(track) {
      box-shadow: inset var(--wa-shadow-s);
    }

    wa-slider::part(thumb) {
      box-shadow: var(--shadow-pop-out);
    }
  }

  :host-context(.wa-theme-glossy) {
    wa-slider::part(thumb) {
      box-shadow: var(--inner-shine), var(--top-highlight), var(--bottom-shadow);
    }
  }

  :host-context(.wa-theme-matter) {
    wa-slider:hover::part(thumb) {
      box-shadow: 0 0 0 0.5em color-mix(in oklab, var(--wa-form-control-activated-color), transparent 85%);
    }
  }

  @keyframes seek-indicator-fade {
    0% {
      opacity: 0;
      transform: translateY(-50%) scale(0.8);
    }
    20% {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export {
  video_styles_default
};

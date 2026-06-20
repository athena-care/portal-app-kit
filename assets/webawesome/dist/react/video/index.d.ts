import Component from '../../components/video/video.js';
/**
 * @summary Videos are used to embed and play video content with custom controls and captions.
 * @documentation https://webawesome.com/docs/components/video
 * @status experimental
 * @since 3.7
 *
 * @dependency wa-dropdown
 * @dependency wa-dropdown-item
 * @dependency wa-popover
 * @dependency wa-slider
 * @dependency wa-button
 * @dependency wa-icon
 *
 * @slot - The default slot. Place `<source>` and `<track>` elements for a single video. Alternatively, use the `src` attribute for a single source.
 * @slot controls-start - Content inserted at the start of the controls bar (before play/pause). Used by `<wa-video-playlist>` to inject the prev button.
 * @slot controls-after-play - Content inserted immediately after the play/pause button. Used by `<wa-video-playlist>` to inject the next button.
 * @slot poster-icon - Icon shown on the poster play button. Defaults to a play-circle icon.
 * @slot play-icon - Icon shown on the play/pause button when paused.
 * @slot pause-icon - Icon shown on the play/pause button when playing.
 * @slot volume-icon - Icon shown on the volume/mute button when audio is active.
 * @slot mute-icon - Icon shown on the volume/mute button when muted or volume is 0.
 * @slot fullscreen-icon - Icon shown on the fullscreen button when not in fullscreen.
 * @slot exit-fullscreen-icon - Icon shown on the fullscreen button when in fullscreen.
 *
 * @event play - Emitted when playback begins.
 * @event pause - Emitted when playback stops.
 * @event timeupdate - Emitted when the time changes.
 * @event volumechange - Emitted when the volume changes.
 * @event error - Emitted when an error occurs while loading/playing.
 * @event ended - Emitted when playback ends.
 * @event loadedmetadata - Emitted when metadata has been loaded.
 *
 * @csspart base - The component's base wrapper.
 * @csspart video - The video element.
 * @csspart controls - The controls container.
 * @csspart controls-overlay - The overlay wrapping timeline and controls bar.
 * @csspart timeline - The timeline/scrubber container.
 * @csspart progress - The progress bar.
 * @csspart thumbnail - The thumbnail preview.
 * @csspart poster-overlay - The poster image overlay.
 * @csspart poster-play-button - The play button on the poster overlay.
 * @csspart video-title-overlay - The title text overlay.
 * @csspart caption-overlay - The custom caption overlay container.
 * @csspart caption - The caption text element.
 * @csspart timeline-track - The timeline slider's track (forwarded from wa-slider).
 * @csspart timeline-indicator - The timeline slider's filled indicator (forwarded from wa-slider).
 * @csspart timeline-thumb - The timeline slider's thumb (forwarded from wa-slider).
 *
 * @cssproperty [--controls-color=white] - The text and icon color used throughout the controls overlay, title overlay, and mobile controls.
 * @cssproperty [--controls-background=var(--wa-color-surface-default)] - The background of the controls bar and mobile controls.
 * @cssproperty [--poster-play-button-background=var(--wa-color-surface-default)] - The background of the play button shown over the poster image. Also used to derive the hover state via color-mix().
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {}>;
export default reactWrapper;

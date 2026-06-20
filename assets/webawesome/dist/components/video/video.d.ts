import WebAwesomeElement from '$webawesome/internal/webawesome-element.js';
import '../button/button.js';
import '../divider/divider.js';
import '../dropdown-item/dropdown-item.js';
import '../dropdown/dropdown.js';
import '../icon/icon.js';
import '../popover/popover.js';
import '../slider/slider.js';
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
export default class WaVideo extends WebAwesomeElement {
    static css: import("lit").CSSResult;
    private readonly localize;
    private videoElement;
    private timelineElement;
    private slotElement;
    private showPoster;
    private playbackRate;
    private controlsVisible;
    private isVolumePopoverOpen;
    private seekIndicator;
    private currentPoster;
    private currentTitle;
    private showCaptions;
    private availableCaptions;
    private currentCaptionIndex;
    private customCaptions;
    private currentCaption;
    private thumbnailData;
    private showThumbnail;
    private thumbnailPosition;
    private currentThumbnail;
    private isMobile;
    private isCompact;
    /**
     * The video's controls preset.
     * - `none` — no controls are shown.
     * - `standard` — shows the timeline, play/pause, volume, captions, and fullscreen.
     * - `full` — all of the above plus playback speed and picture-in-picture.
     */
    controls: 'none' | 'standard' | 'full';
    /** A URL pointing to a WebVTT file for timeline thumbnail previews. */
    thumbnails: string;
    /** The URL of the video source. For multiple formats, use `<source>` elements instead. */
    src: string;
    /** Poster image URL */
    poster: string;
    /** The video's title. */
    title: string;
    /** Indicates whether the video is currently playing. */
    playing: boolean;
    /** When set, the video will be muted. */
    muted: boolean;
    /** The video's volume. */
    volume: number;
    /** The total duration of the video in seconds. */
    duration: number;
    /** The current playback position in seconds. */
    currentTime: number;
    /** Enables autoplay when the component connects. */
    autoplay: boolean;
    /** Loops the video when playback ends. */
    loop: boolean;
    /** Enables autoplay in a muted state. */
    autoplayMuted: boolean;
    /** Automatically resumes playback when the player scrolls back into view after being paused by scrolling out. */
    autoplayOnVisible: boolean;
    /** Controls how the browser preloads the video. Defaults to 'metadata' to minimize data usage. */
    preload: 'auto' | 'metadata' | 'none';
    /** Icon library used for all built-in control icons. Defaults to 'system'. */
    iconLibrary: string;
    private readonly supportsVolumeControl;
    private readonly speedOptions;
    private isScrubbing;
    private volumePopoverCloseTimer?;
    private wasPlayingBeforeScrub;
    private isNativeSeeking;
    private currentTimeSetFromNative;
    private wasPlayingBeforeHidden;
    private resizeObserver;
    private intersectionObserver;
    private coarsePointerQuery;
    private hideControlsTimer;
    private seekIndicatorTimer;
    private lastTapTime;
    private lastTapX;
    private sources;
    private tracks;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected firstUpdated(): void;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    /** Starts playback. */
    play(): void;
    /** Pauses playback. */
    pause(): void;
    /** Toggles between play and pause. */
    togglePlay(): void;
    /** Toggles the muted state. */
    toggleMute(): void;
    /**
     * Seeks to a specific time in the video.
     * @param time - Time in seconds
     */
    seek(time: number): void;
    /**
     * Sets the volume level.
     * @param volume - Volume level between 0 and 1
     */
    setVolume(volume: number): void;
    /**
     * Sets the playback rate (speed).
     * @param rate - Playback rate (0.25, 0.5, 1, 1.25, 1.5, 2)
     */
    setPlaybackRate(rate: number): void;
    /** Enters fullscreen mode. */
    requestFullscreen(): Promise<void>;
    /** Exits fullscreen mode. */
    exitFullscreen(): Promise<void>;
    /** Gets the native video element. */
    getVideoElement(): HTMLVideoElement | null;
    /** Gets the current playback state. */
    getState(): {
        playing: boolean;
        currentTime: number;
        duration: number;
        volume: number;
        muted: boolean;
        playbackRate: number;
    };
    private get isMediaSessionOwner();
    private claimMediaSession;
    private activateMediaSession;
    private releaseMediaSession;
    private setupMediaSession;
    private teardownMediaSession;
    private syncMediaSessionMetadata;
    private syncVideoSources;
    private updateAvailableCaptions;
    private updateCustomCaptions;
    private loadThumbnails;
    private parseThumbnailVTT;
    private parseVTT;
    private loadCustomCaptions;
    private parseVTTTimestamp;
    private getThumbnailForTime;
    private get isFullscreen();
    private formatTime;
    private showControlsTemporarily;
    private clearAllTimeouts;
    private getClientX;
    private toggleFullscreen;
    private togglePictureInPicture;
    private addListeners;
    private removeListeners;
    private handlePlay;
    private handlePause;
    private handleTimeUpdate;
    private handleLoadedMetadata;
    private handleVolumeChange;
    private handleRateChange;
    private handleSeeking;
    private handleSeeked;
    private handleError;
    private handleVideoEnded;
    private handlePosterClick;
    private handleVideoClick;
    private handleDoubleTap;
    private handleSpeedSelect;
    private handleMobileMenuSelect;
    private handleTimelineInput;
    private handleTimelineChange;
    private handleTimelinePointerMove;
    private handleTimelineMouseLeave;
    private handleVolumeButtonEnter;
    private handleVolumeButtonClick;
    private handleVolumePopoverEnter;
    private handleVolumePopoverLeave;
    private handleVolumePopoverHide;
    private handleVolumeSliderInput;
    private handleVolumeSliderChange;
    private handleCaptionSelect;
    private handleSlotChange;
    private handleFullscreenChange;
    private handlePointerTypeChange;
    private handleKeyDown;
    private renderCaptionsDropdown;
    private renderCompactOverflowMenu;
    private renderDesktopControls;
    private renderMobileControls;
    private renderControls;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-video': WaVideo;
    }
}

import WebAwesomeElement from '$webawesome/internal/webawesome-element.js';
import '../button/button.js';
import '../icon/icon.js';
import '../video/video.js';
/**
 * @summary Video playlists wrap multiple `<wa-video>` elements into a playlist with navigation controls.
 * @documentation https://webawesome.com/docs/components/video-playlist
 * @status experimental
 * @since 3.7
 *
 * @dependency wa-video
 * @dependency wa-icon
 *
 * @slot - The default slot. Place `<wa-video>` elements to create a playlist.
 *
 * @event wa-video-change - Emitted when the active video changes.
 *
 * @csspart base - The component's base wrapper.
 * @csspart playlist - The playlist sidebar container.
 * @csspart playlist-item - An individual playlist item button.
 * @csspart playlist-thumbnail - The thumbnail image within a playlist item.
 * @csspart playlist-title - The title text within a playlist item.
 * @csspart playlist-duration - The duration text within a playlist item.
 */
export default class WaVideoPlaylist extends WebAwesomeElement {
    static css: import("lit").CSSResult;
    private readonly localize;
    private defaultSlot;
    private activeIndex;
    private items;
    private metadataHandlers;
    /** The controls preset forwarded to each child `<wa-video>`. */
    controls: 'none' | 'standard' | 'full';
    /** Icon library used for placeholder icons. */
    iconLibrary: string;
    private getVideoElements;
    private syncItems;
    private syncMetadataListeners;
    private syncNavButtons;
    private endedHandler;
    private attachEndedListener;
    /** Plays the next video in the playlist. */
    next(): void;
    /** Plays the previous video in the playlist. */
    previous(): void;
    /** Jumps to the video at the given index. */
    goTo(index: number): void;
    disconnectedCallback(): void;
    private handleSlotChange;
    private handlePlaylistItemClick;
    private formatDuration;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-video-playlist': WaVideoPlaylist;
    }
}

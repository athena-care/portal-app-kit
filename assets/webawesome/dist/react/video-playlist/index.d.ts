import Component from '../../components/video-playlist/video-playlist.js';
import { type EventName } from '@lit/react';
import type { WaVideoChangeEvent } from '../../events/events.js';
export type { WaVideoChangeEvent } from '../../events/events.js';
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
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaVideoChange: EventName<WaVideoChangeEvent>;
}>;
export default reactWrapper;

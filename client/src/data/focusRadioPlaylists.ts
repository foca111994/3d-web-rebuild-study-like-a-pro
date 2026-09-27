export type FocusMoodId =
  | "lofi"
  | "hip-hop"
  | "jazzhop"
  | "deep-focus"
  | "ambient"
  | "calm";

export type FocusTrack = {
  id: string;
  title: string;
  artist: string;
  src: string;
  sourceUrl: string;
  license: "CC0" | "CC BY 4.0";
  licenseUrl: string;
  genre: string;
  duration: string;
  attribution: string;
};

export type FocusPlaylist = {
  id: FocusMoodId;
  name: string;
  tracks: FocusTrack[];
};

// Tracks remain empty until the audio file, source page and exact licence have
// all been verified. Never add a track from a page that only says "free".
export const focusPlaylists: FocusPlaylist[] = [
  { id: "lofi", name: "Lo-Fi", tracks: [] },
  { id: "hip-hop", name: "Hip-Hop", tracks: [] },
  { id: "jazzhop", name: "Jazzhop", tracks: [] },
  { id: "deep-focus", name: "Deep Focus", tracks: [] },
  { id: "ambient", name: "Ambient", tracks: [] },
  { id: "calm", name: "Calm", tracks: [] },
];

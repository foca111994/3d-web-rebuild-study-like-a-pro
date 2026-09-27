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

const CC0_URL = "https://creativecommons.org/publicdomain/zero/1.0/";
const CC_BY_URL = "https://creativecommons.org/licenses/by/4.0/";

function fmaStream(title: string) {
  return `https://freemusicarchive.org/track/${title}/stream/`;
}

export const focusPlaylists: FocusPlaylist[] = [
  {
    id: "lofi",
    name: "Lo-Fi",
    tracks: [
      {
        id: "holiznacc0-shimmer",
        title: "Shimmer (LoFi, Chill)",
        artist: "HoliznaCC0",
        src: fmaStream("Shimmer_LoFi_Chill"),
        sourceUrl: "https://freemusicarchive.org/music/holiznacc0/public-domain-lofi/shimmer-lofi-chill/",
        license: "CC0",
        licenseUrl: CC0_URL,
        genre: "Lo-Fi Hip-Hop",
        duration: "See source",
        attribution: "“Shimmer (LoFi, Chill)” by HoliznaCC0",
      },
      {
        id: "holiznacc0-be-happy",
        title: "Be Happy With Who You Are",
        artist: "HoliznaCC0",
        src: fmaStream("Be_Happy_With_Who_You_Are"),
        sourceUrl: "https://freemusicarchive.org/music/holiznacc0/be-happy-with-who-you-are/",
        license: "CC0",
        licenseUrl: CC0_URL,
        genre: "Lo-Fi Hip-Hop",
        duration: "See source",
        attribution: "“Be Happy With Who You Are” by HoliznaCC0",
      },
    ],
  },
  {
    id: "hip-hop",
    name: "Hip-Hop",
    tracks: [
      {
        id: "holiznacc0-kick-it",
        title: "Kick It (Laid Back HipHop)",
        artist: "HoliznaCC0",
        src: fmaStream("Kick_It"),
        sourceUrl: "https://freemusicarchive.org/music/holiznacc0/kick-it-laid-back-hiphop",
        license: "CC0",
        licenseUrl: CC0_URL,
        genre: "Hip-Hop Instrumental",
        duration: "See source",
        attribution: "“Kick It (Laid Back HipHop)” by HoliznaCC0",
      },
      {
        id: "holiznacc0-sad-beats",
        title: "Sad Beats",
        artist: "HoliznaCC0",
        src: fmaStream("Sad_Beats"),
        sourceUrl: "https://freemusicarchive.org/music/holiznacc0/sad-beats",
        license: "CC0",
        licenseUrl: CC0_URL,
        genre: "Hip-Hop Instrumental",
        duration: "See source",
        attribution: "“Sad Beats” by HoliznaCC0",
      },
    ],
  },
  {
    id: "jazzhop",
    name: "Jazzhop",
    tracks: [
      {
        id: "lucien-kemper-clouds",
        title: "Clouds",
        artist: "Lucien Kemper",
        src: fmaStream("Clouds"),
        sourceUrl: "https://freemusicarchive.org/music/lucien-kemper/single/clouds-1/",
        license: "CC BY 4.0",
        licenseUrl: CC_BY_URL,
        genre: "Jazz Hip-Hop Lo-Fi",
        duration: "See source",
        attribution: "“Clouds” by Lucien Kemper",
      },
      {
        id: "holiznacc0-busted-jazz",
        title: "Busted Jazz",
        artist: "HoliznaCC0",
        src: fmaStream("Busted_Jazz"),
        sourceUrl: "https://freemusicarchive.org/music/holiznacc0/lo-fi-and-chill/busted-jazz/",
        license: "CC0",
        licenseUrl: CC0_URL,
        genre: "Jazz Lo-Fi",
        duration: "See source",
        attribution: "“Busted Jazz” by HoliznaCC0",
      },
    ],
  },
  {
    id: "deep-focus",
    name: "Deep Focus",
    tracks: [
      {
        id: "beat-mekanik-electron",
        title: "Electron",
        artist: "Beat Mekanik",
        src: fmaStream("Electron_Free_Stems"),
        sourceUrl: "https://freemusicarchive.org/music/beat-mekanik/single/electron-free-stems/",
        license: "CC0",
        licenseUrl: CC0_URL,
        genre: "Calm Electronic Instrumental",
        duration: "See source",
        attribution: "“Electron” by Beat Mekanik",
      },
      {
        id: "john-bartmann-riverside",
        title: "Riverside Retreat",
        artist: "John Bartmann",
        src: fmaStream("riverside-retreat-master"),
        sourceUrl: "https://freemusicarchive.org/music/John_Bartmann/100-ambient-atmospheric-soundtracks-straylight-drones-collection/riverside-retreat-master",
        license: "CC0",
        licenseUrl: CC0_URL,
        genre: "Ambient Focus",
        duration: "4:04",
        attribution: "“Riverside Retreat” by John Bartmann",
      },
    ],
  },
  {
    id: "ambient",
    name: "Ambient",
    tracks: [
      {
        id: "dorfi-mystical-song",
        title: "Mystical Song",
        artist: "Dorfi",
        src: fmaStream("Mystical_song"),
        sourceUrl: "https://freemusicarchive.org/music/dorfi/ambient-songs/mystical-song/",
        license: "CC0",
        licenseUrl: CC0_URL,
        genre: "Ambient Instrumental",
        duration: "3:21",
        attribution: "“Mystical Song” by Dorfi",
      },
      {
        id: "techtheist-dark-ambient",
        title: "Dark Ambient Cave Experience",
        artist: "techtheist",
        src: fmaStream("Dark_Ambient_Cave_Experience"),
        sourceUrl: "https://freemusicarchive.org/music/techtheist/fma2021-part-2/dark-ambient-cave-experience/",
        license: "CC0",
        licenseUrl: CC0_URL,
        genre: "Dark Ambient",
        duration: "14:08",
        attribution: "“Dark Ambient Cave Experience” by techtheist",
      },
    ],
  },
  {
    id: "calm",
    name: "Calm",
    tracks: [
      {
        id: "holiznacc0-rain-sleep",
        title: "Rain / Sleep / Meditation",
        artist: "HoliznaCC0",
        src: fmaStream("Rain_Sleep_Meditation"),
        sourceUrl: "https://freemusicarchive.org/music/holiznacc0/space-sleep-meditation/rain-sleep-meditation/",
        license: "CC0",
        licenseUrl: CC0_URL,
        genre: "Rain Ambient",
        duration: "14:35",
        attribution: "“Rain / Sleep / Meditation” by HoliznaCC0",
      },
      {
        id: "monplaisir-fifty-seconds-rain",
        title: "Fifty Seconds of Rain",
        artist: "Monplaisir",
        src: fmaStream("Fifty_seconds_of_rain"),
        sourceUrl: "https://freemusicarchive.org/music/Monplaisir/Fifty_seconds_of_rain",
        license: "CC0",
        licenseUrl: CC0_URL,
        genre: "Rain / Calm",
        duration: "See source",
        attribution: "“Fifty Seconds of Rain” by Monplaisir",
      },
    ],
  },
];

export interface SpotifyAlbumsResponseImage {
    height: number;
    url: string;
}

export interface SpotifyEpisodesResponseImage {
    height: number;
    url: string;
}

export interface SpotifyAlbumsResponseArtist {
    name: string;
}

export interface SpotifyAlbumsResponseItem {
    images: SpotifyAlbumsResponseImage[];
    name: string;
    id: string;
    artists: SpotifyAlbumsResponseArtist[];
}

export interface SpotifyEpisodesResponseItem {
    images: SpotifyEpisodesResponseImage[];
    name: string;
    id: string;
    description: string;
    show: SpotifyShowResponseItem;
}

export interface SpotifyAlbumsResponse {
    albums: {
        total: number;
        items: SpotifyAlbumsResponseItem[];
    };
}

export interface SpotifyArtistsAlbumsResponse {
      total: number;
      items: SpotifyAlbumsResponseItem[];
}

export interface SpotifyShowsEpisodesResponse {
      total: number;
      items: SpotifyEpisodesResponseItem[];
}

export interface SpotifyShowResponseItem {
    id: string;
    name: string;
}

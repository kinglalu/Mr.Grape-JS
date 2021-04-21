module.exports =
    class {
        constructor(player) {
            this._player = player;
            this._songs = [];
            this._position = 0;
        }

        get _repeatMode() {
            return this._player.settings.repeatMode;
        }

        get songs() {
            return this._songs;
        }

        get position() {
            return this._position;
        }

        get currentSong() {
            return this._songs[this._position];
        }

        set songs(songs) {
            this._songs.push(...songs);
        }

        _updateStream() {
            if (!this.currentSong) return this._player.disconnect();
            this._player._stream(this.currentSong);
        }

        shuffle() {
            const pos = this._position + 1;
            const array = this._songs.slice(-(this._songs.length - pos));

            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }

            this._songs = [...this._songs.slice(0, pos), ...array];
        }

        shift() {
            if (this._repeatMode !== 1) this._position += 1;
            if (this._repeatMode === 2 && this._songs.length === this._position) this._position = 0;
            this._updateStream();
        }

        skip(toTrack) {
            this._position = toTrack;
            this._updateStream();
        }

        remove(pos) {
            if (pos === this._position) this.shift();
            return this._songs.splice(pos, 1)[0];
        }

        reset() {
            this._songs = [];
            this._position = 0;
        }
    };
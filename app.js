const searchSongs = async() => {
    const searchText = document.getElementById('search-field').value;
    console.log(searchText);
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
        // load data
        // const response = await fetch(url);
        // const data = await response.json();
        // displaySongs(data.data);
    fetch(url)
        .then(response => response.json())
        .then(data => displaySongs(data.data))
        .catch(error => displayError('Something Went Wrong 😵!! Please Try After Sometime'));
}

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = ' ';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
    <div class="col-md-9">
    <h3 class="lyrics-name">${song.title}</h3>
    <p class="author lead">Album by <span>${song.artist.name}</span></p>
<audio controls>
  <source src="${song.preview}" type="audio/ogg">
</audio>
     </div>
    <div class="col-md-3 text-md-right text-center">
    <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>
        `;
        songContainer.appendChild(songDiv);
    })
}

const getLyric = (artist, title) => {
    const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayLyrics(data.lyrics))
}




// const getLyric = async(artist, title) => {
//     const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`;
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         displayLyrics(data.lyrics);
//     } catch (error) {
//         displayError('sorry');
//     }
// }

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}
const displayError = error => {
    const errorTag = document.getElementById('error-messages');
    errorTag.innerText = error;
}
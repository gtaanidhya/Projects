// alert("hello");

var songs = [
    {
        name: "Shape Of You",
        genre: "pop",
        song_link: "songs/Ed Sheeran - Shape of You (Official Music Video)-yt.savetube.me.mp3",
        poster: "https://i.ytimg.com/vi/JGwWNGJdvx8/sddefault.jpg",
        artist:"Ed Shreen"
    },
    {
        name: "All Of Me",
        genre: "pop",
        song_link:"songs/John Legend - All of Me (Official Video)-yt.savetube.me.mp3",
        poster: "https://i.ytimg.com/vi/450p7goxZqg/sddefault.jpg",
        artist: "Adele"
    },
    {
        name: "Somelike Like You",
        genre: "pop",
        song_link: "songs/Adele - Someone Like You (Official Music Video)-yt.savetube.me.mp3",
        poster: "https://i.ytimg.com/vi/hLQl3WQQoQ0/sddefault.jpg",
        artist: "Adele"
    },
    {
        name: "Wonderwall",
        genre: "rock",
        song_link:"songs/Oasis - Wonderwall (Official Video)-yt.savetube.me.mp3",
        poster: "https://i.ytimg.com/vi/6hzrDeceEKc/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AG-AoAC8AGKAgwIABABGGUgZShlMA8=&rs=AOn4CLAh15nsgOEu5JyEfCL5yGqsPzvqzw",
        artist: "Oasis"
    },
    {
        name: "Sugar",
        genre: "hiphop",
        song_link: "songs/Maroon 5 - Sugar (Official Music Video)-yt.savetube.me.mp3",
        poster: "https://i.ytimg.com/vi/09R8_2nJtjg/maxresdefault.jpg",
        artist:"Maroon"
    },
    {
        name: "Locked Away",
        genre: "hiphop",
        song_link: "songs/R. City - Locked Away ft. Adam Levine-yt.savetube.me.mp3",
        poster: "https://i.ytimg.com/vi/6GUm5g8SG4o/maxresdefault.jpg",
        artist:"R City"
    },
];

var currentSongIndex = 0;
var currentPlaylist = "";
var allPlaylists = [];  
setPoster();
var audioSource = document.getElementById("songAudio");
audioSource.pause();

var prevButton = document.getElementById("previousSong");
var nextButton = document.getElementById("nextSong");
prevButton.addEventListener("click", () => {
    currentSongIndex--;
    if (currentSongIndex == -1) {
        currentSongIndex = songs.length - 1;
    }
    setPoster();
});

nextButton.addEventListener("click", () => {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    setPoster();
});

var addToPlaylist = document.getElementById("addtoPlaylist");
var currentPlaylistSongs = document.getElementById("playlistSongList");
var genreList=document.getElementById("songList")
addToPlaylist.addEventListener("click", () => {
    if (currentPlaylist == "") {
        alert("Select the playlist first");
        return;
    }
    if (allPlaylists[currentPlaylist].indexOf(currentSongIndex) == -1) {
        allPlaylists[currentPlaylist].push(currentSongIndex);
        addSongToPlaylist(currentSongIndex,currentPlaylistSongs)
    }
    else {
        alert("Song already present in the playlist")
    }
    
});

var createPlaylist = document.getElementById("createPlaylistButton");
createPlaylist.addEventListener("click", () => {
    var playlistNameInput = document.getElementById("newPlayListName");
    var playlistName = playlistNameInput.value.trim();
    playlistNameInput.value = "";
    if (playlistName == "") {
        alert("Enter Playlist Name")
        return;
    }
    else {
        if (!allPlaylists[playlistName]) {
            allPlaylists[playlistName] = [];
            var newPlaylistButton = document.createElement("button");

            newPlaylistButton.textContent=playlistName;
            newPlaylistButton.classList.add("darkBlueButton");
            document.getElementById("allPlaylists").appendChild(newPlaylistButton);
            newPlaylistButton.addEventListener("click", () => {
                currentPlaylist = newPlaylistButton.textContent;
                document.getElementById("currentPlaylistName").textContent = currentPlaylist;
                
                currentPlaylistSongs.innerHTML = "";
                for (var i = 0; i < allPlaylists[currentPlaylist].length; i++){
                    addSongToPlaylist(allPlaylists[currentPlaylist][i], currentPlaylistSongs);
                }
                
            });
        }
        else {
            alert("Playlist with same name already present")
            return;
        }
    }

});

var genreSelect = document.getElementById("genre");
for (var i = 0; i < songs.length; i++){
    addSongToPlaylist(i, genreList);
} 
genreSelect.addEventListener("change", function() {
    var selectedValue = genreSelect.value;
    genreList.innerHTML = "";
    switch (selectedValue) {
        case "all":
            for (var i = 0; i < songs.length; i++) {
                addSongToPlaylist(i, genreList);
            }
            break;
        default:
            for(var i = 0; i < songs.length; i++) {
                if(songs[i].genre==selectedValue)
                addSongToPlaylist(i, genreList);
            }
    }
});


function setPoster() {
    var currentsongPoster = document.getElementById("songPoster");
    currentsongPoster.setAttribute("src", songs[currentSongIndex].poster);

    var currentSongName = document.getElementById("song_name");
    currentSongName.innerHTML = songs[currentSongIndex].name;

    var currentSongArtist = document.getElementById("artist");
    currentSongArtist.innerHTML = songs[currentSongIndex].artist;
    var audioSource = document.getElementById("songAudio");
    audioSource.setAttribute("src", songs[currentSongIndex].song_link);
    audioSource.play();
}

function addSongToPlaylist(index,currentPlaylistSongs) {
    var playlistSong = document.createElement("button");
    playlistSong.textContent = songs[index].name;
    playlistSong.classList.add("darkBlueButton");
    playlistSong.classList.add("songButton");
    currentPlaylistSongs.appendChild(playlistSong);
    playlistSong.addEventListener("click",()=> {
        currentSongIndex = index;
        setPoster();
    })
    
}

var theme = "Light";
var toggleButton = document.getElementById("themeToggle");
toggleButton.classList.add("light");

var themeName = document.getElementById("themeName")
themeName.textContent = "Dark";
toggleButton.addEventListener("click", () => {
    var blueSection = document.getElementsByClassName("blueBackground");
    document.getElementById("songPosterSection").style.transition = "all 0.5s"
    var toggleCircle = document.getElementById("toggleCircle");
    toggleCircle.style.transition = "all 0.5s";
    if (theme == "Light") {
        toggleCircle.style.transform="translateX(24px)"
        theme = "Dark";
        themeName.textContent = "Light";
        document.body.style.backgroundColor = "#8b8b8b";
        document.getElementById("songPosterSection").style.backgroundColor = "#8b8b8b";
        for (var i = 0; i < blueSection.length; i++){
            blueSection[i].style.transition= "all 0.5s";
            blueSection[i].style.backgroundColor="#5f5f5f"
        }
        toggleButton.style.backgroundColor = "#5fb2e9";
    }
    else {
        toggleCircle.style.transform="translateX(0px)"
        theme = "Light";
        themeName.textContent = "Dark";
        document.body.style.backgroundColor = "#dbdbdb";
        document.getElementById("songPosterSection").style.backgroundColor = "#0472AA";
        for (var i = 0; i < blueSection.length; i++){
            blueSection[i].style.transition= "all 0.5s";
            blueSection[i].style.backgroundColor = "#6AB7DE"
        }
        toggleButton.style.backgroundColor = "#b8b8b8";
    }
    changeButtonTheme(theme);
});

function changeButtonTheme(theme) {
    var backgroundColor = "";
    var hoverColor = "";
    if (theme == "Dark") {
        backgroundColor = "#8b8b8b"
        hoverColor = "#5f5f5f";
    }
    else {
        backgroundColor = "#0c86c4"
        hoverColor = "#6AB7DE";
    }

    for (let sheet of document.styleSheets) {
        for (rule of sheet.cssRules) {
            if (rule.selectorText == ".darkBlueButton") {
                rule.style.backgroundColor = backgroundColor;
            }
            if (rule.selectorText == ".darkBlueButton:hover") {
                rule.style.backgroundColor = hoverColor;
                return;
            }
        }
    }

}


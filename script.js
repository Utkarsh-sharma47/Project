
console.log("lets start JS")
let currentsong = new Audio();
let songs;
let v = 0.02 ;
//promise function
async function getsong() {
    let a = await fetch("https://utkarsh-sharma47.github.io/Project/index.html");
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = []; // empty array
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs

}

//function to conver time in 00:00 format
function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    // Ensure seconds is a whole number
    seconds = Math.max(0, Math.floor(seconds));

    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Format with leading zeros if needed
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

//functions to play music
const playmusic = (track) => {
    // var audio = new Audio ("/songs/" + track);
    currentsong.src = "/songs/" + track;
    play.src = "images/play.svg";
    currentsong.play()
    document.querySelector(".songnameonplaybar").innerHTML = decodeURI(track.replaceAll(".mp3", ""));
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
    currentsong.volume=0.15;
}
// asyn functoin to handle the promise and make more calls
async function main() {
    // GET the song
    songs = await getsong();

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + ` <li>
                            <div  class="songname">
                                <div><img src="images/music.svg" alt=""></div>
                                <div class="info">
                                    <div class="sname">${song.replaceAll("%20", " ")}</div>
                                    <div><a href="http://">artist</a></div>
                                </div>
                                <div><img class="playl" src="images/pause2.svg" alt=""></div>
                            </div>
                        </li>` ;
    }

    //attach a eventlistener to each song
    Array.from(document.querySelector(".SongList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);// here tyou get name of song
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })
    })


    //attach a event listener to play,pause by their IDs***
    play.addEventListener("click", () => { 
        if (currentsong.paused) {
            currentsong.play();
            play.src = "images/play.svg"
        }
        else {
            currentsong.pause();
            play.src = "images/pause.svg"

        }
    })

    

    // listen for time update event
    currentsong.addEventListener("timeupdate", () => {
        // console.log((currentsong.currentTime), (currentsong.duration));
        document.querySelector(".songtime").innerHTML = `${formatTime(currentsong.currentTime)} / ${formatTime(currentsong.duration)}`;
        // working of seek bar
        document.querySelector(".seekbarpointer").style.left = ((currentsong.currentTime) / (currentsong.duration)) * 100 + "%";
    });



    // add movement to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".seekbarpointer").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100;

    })

    // functioning og menu buttom - pop out the left bar
    document.querySelector(".menu").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0%";
    })
    // functioning og menu buttom - pop out the left bar
    document.querySelector(".menuin").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    })



    //previous button
    previous.addEventListener("click", () => {
        console.log("previous");
        //first find index of current song
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        console.log(songs, index);
        if ((index - 1) >= 0) {
            playmusic(songs[index - 1]);
        }
    })
    //next button
    next.addEventListener("click", () => {
        console.log("next");

        //first find index of current song
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        console.log(songs, index);
        if ((index + 1) < songs.length) {
            playmusic(songs[index + 1]);
        }
    })
    // volume up button
    volup.addEventListener("click", () => {
        currentsong.volume=currentsong.volume+v;
        console.log(currentsong.volume);
    })
    // volume up button
    voldown.addEventListener("click", () => {
        currentsong.volume=currentsong.volume - v;
        console.log(currentsong.volume);
    })
    


}

main();
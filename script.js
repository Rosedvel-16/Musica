document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const volumeControl = document.getElementById('volume-control');
    const lyricsList = document.getElementById('lyrics-list');
    
    // Lyrics with timings (in seconds)
    const lyrics = [
        { time: 30, text: "Can you hear the silence?" },
        { time: 34, text: "Can you see the dark?" },
        { time: 38, text: "Can you fix the broken?" },
        { time: 41, text: "Can you feel, can you feel my heart?" },
        { time: 60, text: "Can you help the hopeless?" },
        { time: 63, text: "Well, I'm begging on my knees" },
        { time: 68, text: "Can you save my bastard soul?" },
        { time: 71, text: "Will you wait for me?" },
        { time: 74, text: "I'm sorry, brothers" },
        { time: 76, text: "So sorry, lover" },
        { time: 78, text: "Forgive me, father" },
        { time: 80, text: "I love you, mother" },
        { time: 82, text: "Can you hear the silence?" },
        { time: 84, text: "Can you see the dark?" },
        { time: 87, text: "Can you fix the broken?" },
        { time: 88, text: "Can you feel my heart?" },
        { time: 95, text: "Can you feel my heart?" },
        { time: 102, text: "Can you feel my heart?" },
        { time: 118, text: "Can you feel my heart?" },
        { time: 135, text: "I'm scared to get close and I hate being alone" },
        { time: 138, text: "I long for that feeling to not feel at all" },
        { time: 142, text: "The higher I get, the lower I'll sink" },
        { time: 146, text: "I can't drown my demons, they know how to swim" },
        { time: 150, text: "I'm scared to get close and I hate being alone" },
        { time: 154, text: "I long for that feeling to not feel at all" },
        { time: 157, text: "The higher I get, the lower I'll sink" },
        { time: 161, text: "I can't drown my demons, they know how to swim" },
        { time: 165, text: "I'm scared to get close and I hate being alone" },
        { time: 168, text: "I long for that feeling to not feel at all" },
        { time: 172, text: "The higher I get, the lower I'll sink" },
        { time: 176, text: "I can't drown my demons, they know how to swim" },
        { time: 197, text: "Can you feel my heart?" },
        { time: 199, text: "Can you hear the silence?" },
        { time: 203, text: "Can you see the dark?" },
        { time: 206, text: "Can you fix the broken?" },
        { time: 210, text: "Can you feel, can you feel my heart?" }
    ];
    
    // Populate lyrics list
    lyrics.forEach(line => {
        const li = document.createElement('li');
        li.textContent = line.text;
        li.dataset.time = line.time;
        lyricsList.appendChild(li);
    });
    
    // Play/Pause button
    playBtn.addEventListener('click', togglePlay);
    
    function togglePlay() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playBtn.textContent = '❚❚';
        } else {
            audioPlayer.pause();
            playBtn.textContent = '▶';
        }
    }
    
    // Update progress bar
    audioPlayer.addEventListener('timeupdate', updateProgress);
    
    function updateProgress() {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        
        // Update progress bar
        if (duration) {
            progressBar.value = (currentTime / duration) * 100;
        }
        
        // Update time display
        currentTimeEl.textContent = formatTime(currentTime);
        
        // Update active lyrics
        updateLyrics(currentTime);
    }
    
    // Format time (seconds to MM:SS)
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Set total time when metadata is loaded
    audioPlayer.addEventListener('loadedmetadata', function() {
        totalTimeEl.textContent = formatTime(audioPlayer.duration);
    });
    
    // Seek when clicking progress bar
    progressBar.addEventListener('click', function(e) {
        const percent = e.offsetX / this.offsetWidth;
        audioPlayer.currentTime = percent * audioPlayer.duration;
    });
    
    // Volume control
    volumeControl.addEventListener('input', function() {
        audioPlayer.volume = this.value;
    });
    
    // Update active lyrics based on current time
    function updateLyrics(currentTime) {
        const lines = document.querySelectorAll('#lyrics-list li');
        let activeLine = null;
        
        // Find the last line that should be active
        for (let i = 0; i < lyrics.length; i++) {
            if (currentTime >= lyrics[i].time) {
                activeLine = i;
            } else {
                break;
            }
        }
        
        // Update all lines
        lines.forEach((line, index) => {
            if (index === activeLine) {
                line.classList.add('active');
            } else {
                line.classList.remove('active');
            }
        });
        
        // Auto-scroll to active line
        if (activeLine !== null && activeLine > 2) {
            const lineElement = lines[activeLine];
            lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    // Initialize volume
    audioPlayer.volume = volumeControl.value;
});
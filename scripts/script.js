new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Tere_Hawaale",
          artist: "Arijit",
          cover: "../img/28.jpeg",
          source: "../mp3/1.mp3",
          url: "https://youtu.be/KUpwupYj_tY?si=8PDC91-KFF1LUEAi",
          favorited: false
        },
        {
          name: "FAASLE ",
          artist: "Aditya_Rikhari",
          cover: "../img/2.jpeg",
          source: "../mp3/2.mp3",
          url: "https://youtu.be/EiiOYwqk3A0?si=YzOi99pgIq07Lr_p",
          favorited: true
        },

        {
          name: "TU HAI KAHAN",
          artist: "_Raffey_-_Usama_-_Ahad_",
          cover: "../img/3.jpeg",
          source: "../mp3/3.mp3",
          url: "https://youtu.be/AX6OrbgS8lI?si=vDFdKmOClpCdZz_Z",
          favorited: false
        },

        {
          name: "BAARISHEIN",
          artist: "Anuv_Jain",
          cover: "../img/4.jpeg",
          source: "../mp3/4.mp3",
          url: "https://youtu.be/PJWemSzExXs?si=tgEVJfmxW6Hpse2E",
          favorited: false
        },
        {
          name: "Call_aundi_",
          artist: "Yo_Yo_Honey_Singh",
          cover: "../img/5.jpeg",
          source: "../mp3/5.mp3",
          url: "https://youtu.be/OIv0FLrbnGE?si=h4J-Bnnv2Pv4hPG-",
          favorited: true
        },
        {
          name: "Teri Yaad",
          artist: "Aditya_Rikhari",
          cover: "../img/6.jpeg",
          source: "../mp3/6.mp3",
          url: "https://youtu.be/R-sh3kfdHQ4?si=vZD9itQazvRY6WRE",
          favorited: false
        },
        {
          name: "Ek_Din_Aap_Yun",
          artist: "Ahmed_Nadeem",
          cover: "../img/7.jpeg",
          source: "../mp3/7.mp3",
          url: "https://youtu.be/-kKKe7hLg4Q?si=2bn5u1v18JqHeGOe",
          favorited: true
        },
        {
          name: "Khwahish",
          artist: "_Sohail_",
          cover: "../img/8.jpeg",
          source: "../mp3/8.mp3",
          url: "https://youtu.be/qD1tGesTr4E?si=ijTehH4u2lLJVp10",
          favorited: false
        },
        {
          name: "Kya_Baat_Aa",
          artist: "_Karan_Aujla_",
          cover: "../img/9.jpeg",
          source: "../mp3/9.mp3",
          url: "https://youtu.be/x-KbnJ9fvJc?si=FM8DaUHAT8qhHiTY",
          favorited: false
        },
        {
          name: "Laare_Choote",
          artist: "_WORMONO___Tejas_",
          cover: "../img/10.jpeg",
          source: "../mp3/10.mp3",
          url: "https://youtu.be/OTYtQKm8O9E?si=vnmxtGgb10VROYUM",
          favorited: false
        },
        {
          name: "_At_My_Worst_",
          artist: "Pink_Sweat$",
          cover: "../img/11.jpeg",
          source: "../mp3/11.mp3",
          url: "https://youtu.be/8CEJoCr_9UI?si=VrPggl5eM2ozQhEe",
          favorited: false
        },
        {
          name: "MERA_BHAI_TU",
          artist: "_SOHAIL___ZEESHAN_",
          cover: "../img/12.jpeg",
          source: "../mp3/12.mp3",
          url: "https://youtu.be/1E5GFFubXV8?si=SRMiNwUkhchaMBk7",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});

window.addEventListener("load", function() {
  var httpRequest
  var data = {}
  function makeRequest() {
    httpRequest = new XMLHttpRequest()
    if (!httpRequest) {
      console.log("Giving up :( Cannot create an XMLHTTP instance")
      return false
    }
    httpRequest.onreadystatechange = getContents
    httpRequest.open("GET", "js/playlist.json")
    httpRequest.send()
  };
  
  function getContents() {
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          data = JSON.parse(httpRequest.response)
        } else {
          console.log("There was a problem with the request.")
        }
      }
    }
    catch (e) {
      console.log("Caught Exception: " + e.description)
    }
  }

  let index = 0;

  const video = document.createElement("video")
  video.autoplay = true

  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")

  function addIndex() {
    if (index < data.length) {
      index += 1
    } else {
      index = 0
    }
  }

  function playVideo() {
    video.src = data[index].url
    video.addEventListener("loadeddata", function () {
      video.play()
      video.width = video.videoWidth
      video.height = video.videoHeight
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      playMe()
    })
    video.addEventListener("ended", function () {
      addIndex()
      closeCurtains()
      playVideo()
    })
  }

  document.getElementById("play").addEventListener("click", function(e) {
    e.preventDefault()
    playVideo()
  })

  document.getElementById("next").addEventListener("click", function (e) {
    e.preventDefault()
    addIndex()
    closeCurtains()
    playVideo()
  })

  function playMe() {
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
    setTimeout(playMe, 20)
  }
  
  video.addEventListener("play", function () {
    openCurtains()
    repositionMe()
    playMe()
  })

  function openCurtains() {
    let curtains = document.getElementsByClassName("curtain")
    for (let i = 0; i < curtains.length; i++) {
      curtains[i].classList.add("open")
    }
    setTimeout(function() {
      let stage = document.getElementsByClassName("stage")
      stage[0].classList.add("open")
      let board = document.getElementsByClassName("board")
      board[0].classList.add("open")
    }, 1500)
  }

  function closeCurtains() {
    let curtains = document.getElementsByClassName("curtain")
    let stage = document.getElementsByClassName("stage")
    stage[0].classList.remove("open")
    let board = document.getElementsByClassName("board")
    board[0].classList.remove("open")
    setTimeout(function () {
      for (let i = 0; i < curtains.length; i++) {
        curtains[i].classList.remove("open")
      }
    }, 1500)
  }

  document.getElementById("stop").addEventListener("click", function (e) {
    e.preventDefault()
    closeCurtains()
    video.pause()
  })

  function repositionMe() {
    canvas.style.left = (window.innerWidth / 2) - (video.videoWidth / 2) + "px"
    canvas.style.top = (window.innerHeight / 2) - (video.videoHeight / 2) + "px"
  }

  window.addEventListener("resize", function() {
    repositionMe()
  })

  makeRequest()
})
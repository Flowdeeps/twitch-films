window.addEventListener("load", function() {

  var data = {}

  function callList(input) {

    let list = ""

    if (input[0]) {
      list = "adverts"
    } else if (input[1]) {
      list = "cartoons"
    } else if (input[2]) {
      list = "movies"
    } else {
      console.log("nope")
      return false
    }

    var httpRequest
    function makeRequest() {
      httpRequest = new XMLHttpRequest()
      if (!httpRequest) {
        console.log("Giving up :( Cannot create an XMLHTTP instance")
        return false
      }
      httpRequest.onreadystatechange = getContents
      httpRequest.open("GET", "js/" + list + ".json")
      httpRequest.send()
    };
    makeRequest()
    
    function getContents() {
      try {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            data = {}
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
  }

  // advert, cartoon, feature
  let playState = [1, 0, 0]

  function advancePlayState() {
    console.log(playState)
    if (playState[0]) {
      playState = []
      playState = [0, 1, 0]
    }
    else if (playState[1]) {
      playState = []
      playState = [0, 0, 1]
    }
    else if (playState[2]) {
      playState = []
      playState = [1, 0, 0]
    }
    else {
      playState = []
      playState = [0, 1, 0]
    }
  }
  
  callList(playState)

  const video = document.createElement("video")
  video.autoplay = true

  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")

  function playVideo() {
    video.src = data[getRand(data.length)].url
    console.log(video.src)
    video.addEventListener("loadeddata", function () {
      video.play()
      video.width = video.videoWidth
      video.height = video.videoHeight
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      playMe()
    })
    video.addEventListener("ended", function () {
      closeCurtains()
      advancePlayState()
      callList(playState)
      playVideo()
    })
  }

  document.getElementById("play").addEventListener("click", function(e) {
    e.preventDefault()
    playVideo()
  })

  document.getElementById("next").addEventListener("click", function (e) {
    e.preventDefault()
    video.pause()
    closeCurtains()
    advancePlayState()
    callList(playState)
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

  function getRand(input) {
    let output = Math.floor(Math.random() * input)
    return output
  }

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

})
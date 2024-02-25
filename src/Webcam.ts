const getMedia = async (constrains: MediaStreamConstraints) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constrains)
    const video = document.querySelector('.video')

    if (video && video instanceof HTMLVideoElement) {
      getDeviceOptions()
      video.srcObject = stream

      video.onloadedmetadata = () => {
        video.play();
      };

    }
  } catch (error) {
    console.log(error)
  }
}

getMedia({
  audio: true,
  video: { frameRate: { ideal: 30, max: 30 } }
})



async function getDeviceOptions() {
  const devices = await navigator.mediaDevices.enumerateDevices()
  const devicesEl = document.querySelector(".select")

  if (devicesEl?.children.length) return

  devices
    .filter(({ kind }) => kind === 'videoinput')
    .forEach((device) => {
      const option = document.createElement('option')
      option.textContent = device.label
      option.value = device.deviceId

      devicesEl?.appendChild(option)
    })

  devicesEl?.addEventListener("change", async (event) => {
    if (event.target instanceof HTMLSelectElement) {
      const id = event.target.value
      getMedia({
        audio: true,
        video: { frameRate: { ideal: 30, max: 30 }, deviceId: id }
      })
    }
  })
}

const btn = document.querySelector(".device")
const devicesEl = document.querySelector(".select")
const audioControl = document.querySelector('.audio-control')


btn?.addEventListener('click', () => {
  devicesEl?.classList.toggle('active')
  btn?.classList.toggle('active')
})

audioControl?.addEventListener("click", () => {
  Array.from(audioControl.children).forEach(item => {
    item.classList.toggle('active')
  })

  const video = document.querySelector('.video')
  if (video && video instanceof HTMLVideoElement) {
    video.muted = !video.muted
  }
})

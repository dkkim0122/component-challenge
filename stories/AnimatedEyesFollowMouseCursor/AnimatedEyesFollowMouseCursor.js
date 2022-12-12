import './AnimatedEyesFollowMouseCursor.css'

export const createAnimatedEyesFollowMouseCursor = () => {
  const article = document.createElement('article')
  article.classList.add('animated-eyes__container')
  
  for(let i = 0; i < 2; i++) {
    const eye = document.createElement('div')
    eye.classList.add('animated-eyes__eye')
    
    const eyeBall = document.createElement('div')
    eyeBall.classList.add('animated-eyes__eye-ball')
    eye.appendChild(eyeBall)
    
    article.appendChild(eye)
  }

  const [leftEye, rightEye] = article.querySelectorAll('.animated-eyes__eye')

  const calculateEyeRotateDegree = (cursorX, cursorY) => {
    const leftEyeX = leftEye.getBoundingClientRect().left + leftEye.clientWidth / 2
    const leftEyeY = leftEye.getBoundingClientRect().top + leftEye.clientHeight / 2
    const rightEyeX = rightEye.getBoundingClientRect().left + rightEye.clientWidth / 2
    const rightEyeY = rightEye.getBoundingClientRect().top + rightEye.clientHeight / 2

    const leftEyeDegree = Math.atan2(cursorX - leftEyeX, cursorY - leftEyeY)
    const rightEyeDegree = Math.atan2(cursorX - rightEyeX, cursorY - rightEyeY)

    leftEye.style.transform = `rotate(${leftEyeDegree}rad)`
    rightEye.style.transform = `rotate(${rightEyeDegree}rad)`
  }

  article.addEventListener('mousemove', (e) => {
    const x = e.clientX
    const y = e.clientY
    calculateEyeRotateDegree(x, y)
  })


  return article
}
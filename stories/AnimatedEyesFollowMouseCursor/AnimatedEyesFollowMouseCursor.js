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

  return article
}
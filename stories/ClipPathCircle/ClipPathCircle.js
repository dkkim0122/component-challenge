import './ClipPathCircle.css'

export const createClipPathCircle = () => {
  const text = 'Clip Path Circle'

  const article = document.createElement('article')
  article.classList.add('clip-path-circle__container')

  const articleText = document.createElement('h2')
  articleText.innerText = text
  articleText.classList.add('clip-path-circle__container-text')
  article.appendChild(articleText)

  const circle = document.createElement('div')
  circle.classList.add('clip-path-circle__circle')
  article.appendChild(circle)

  const circleText = document.createElement('h2')
  circleText.innerText = text
  circleText.classList.add('clip-path-circle__circle-text')
  circle.appendChild(circleText)

  return article
}
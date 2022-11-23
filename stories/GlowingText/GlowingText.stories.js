import './GlowingText.css'

export default {
  title: 'GlowingText',
  parameters: {
    layout: 'fullscreen',
  },
}

const Template = () => {
  const article = document.createElement('article')
  article.classList.add('glowing-text__container')

  const name = 'DOKYUNG'

  for(let i = 0; i < name.length; i++) {
    const span = document.createElement('span')
    span.innerText = name[i]
    span.style.animationDelay = `${i * 0.25}s`
    article.appendChild(span)
  }

  return article
}

export const BasicCss = Template.bind({})
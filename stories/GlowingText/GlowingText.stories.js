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
  for(const char of name) {
    const span = document.createElement('span')
    span.innerText = char
    article.appendChild(span)
  }

  return article
}

export const BasicCss = Template.bind({})
import './HoverEffectCard.css'

export const createHoverEffectCard = () => {
  const container = document.createElement('article')
  container.classList.add('hover-effect-card__container')

  const createCard = (sequence) => {
    const card = document.createElement('div')
    card.classList.add('hover-effect-card__card')

    const cardHeader = document.createElement('h2')
    cardHeader.innerText = `${sequence} Card`
    cardHeader.classList.add('hover-effect-card__header')
    
    const cardContent = document.createElement('div')
    cardContent.classList.add('hover-effect-card__content')
    
    const cardText = document.createElement('p')
    cardText.innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio nisi reprehenderit error culpa amet incidunt architecto numquam ad at dolorem odit maxime vel dolor mollitia sapiente, aperiam, quo quae?'
    cardText.classList.add('hover-effect-card__text')

    const cardButton = document.createElement('a')
    cardButton.innerText = 'Read More'
    cardButton.setAttribute('href', '#')
    cardButton.classList.add('hover-effect-card__button')
    
    cardContent.appendChild(cardHeader)
    cardContent.appendChild(cardText)
    cardContent.appendChild(cardButton)
    card.appendChild(cardContent)
    container.appendChild(card)
  }

  const sequenceOfCard = ['First', 'Second', 'Third']

  sequenceOfCard.forEach(sequence => {
    createCard(sequence)
  })

  return container
}

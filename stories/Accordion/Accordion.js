import './Accordion.css'

export const createAccordion = () => {
  const container = document.createElement('section')
  container.classList.add('accordion__container')

  const accordion = document.createElement('div')
  accordion.classList.add('accordion')

  const accordionHeader = document.createElement('header')
  accordionHeader.classList.add('accordion__header')
  accordionHeader.innerText = 'First Accordion Menu'

  const accordionContent = document.createElement('main')
  accordionContent.classList.add('accordion__content')
  accordionContent.innerHTML = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos voluptates quae nostrum totam quaerat, commodi asperiores ullam. Neque enim beatae, cum, optio, tempora autem est a sint vitae ipsum debitis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos voluptates quae nostrum totam quaerat, commodi asperiores ullam. Neque enim beatae, cum, optio, tempora autem est a sint vitae ipsum debitis!'
  
  container.appendChild(accordion)
  accordion.appendChild(accordionHeader)
  accordion.appendChild(accordionContent)

  const handleClickHeader = () => {
    if (accordionHeader.classList.contains('accordion__header--open')) {
      accordionHeader.classList.remove('accordion__header--open')
      accordionContent.classList.remove('accordion__content--open')
      return
    }

    accordionHeader.classList.add('accordion__header--open')
    accordionContent.classList.add('accordion__content--open')
  }

  accordionHeader.addEventListener('click', handleClickHeader)

  return container
}
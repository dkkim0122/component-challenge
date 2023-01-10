import './Accordion.css'

export const createAccordion = () => {
  const container = document.createElement('section')
  container.classList.add('accordion__container')

  function createAccordionElement(sequence) {
    const accordion = document.createElement('div')
    accordion.classList.add('accordion')
  
    const accordionHeader = document.createElement('header')
    accordionHeader.classList.add('accordion__header')
    accordionHeader.innerText = `${sequence} Accordion Menu`
  
    const accordionContentWrapper = document.createElement('section')
    accordionContentWrapper.classList.add('accordion__content-wrapper')
    accordionContentWrapper.classList.add('accordion__content-wrapper--close')
  
    const accordionContent = document.createElement('main')
    accordionContent.classList.add('accordion__content')
    accordionContent.innerHTML = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos voluptates quae nostrum totam quaerat, commodi asperiores ullam. Neque enim beatae, cum, optio, tempora autem est a sint vitae ipsum debitis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos voluptates quae nostrum totam quaerat, commodi asperiores ullam. Neque enim beatae, cum, optio, tempora autem est a sint vitae ipsum debitis!'
    
    container.appendChild(accordion)
    accordion.appendChild(accordionHeader)
    accordion.appendChild(accordionContentWrapper)
    accordionContentWrapper.appendChild(accordionContent)
  
    const handleClickHeader = (header, contentWrapper) => {
      header.classList.toggle('accordion__header--open')
      contentWrapper.classList.toggle('accordion__content-wrapper--open')
      contentWrapper.classList.toggle('accordion__content-wrapper--close')
    }
  
    accordionHeader.addEventListener('click', () => handleClickHeader(accordionHeader, accordionContentWrapper))
  }

  const sequenceArray = ['First', 'Second', 'Third']
  sequenceArray.forEach(sequence => createAccordionElement(sequence))

  return container
}
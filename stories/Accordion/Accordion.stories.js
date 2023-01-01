import { createAccordion } from './Accordion.js'

export default {
  title: 'Accordion',
  parameters: {
    layout: 'fullscreen',
  }
}

const Template = () => {
  return createAccordion()
}

export const BasicCss = Template.bind({})
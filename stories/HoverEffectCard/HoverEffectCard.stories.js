import { createHoverEffectCard } from './HoverEffectCard.js'

export default {
  title: 'HoverEffectCard',
  parameters: {
    layout: 'fullscreen',
  }
}

const Template = () => {
  return createHoverEffectCard()
}

export const BasicCss = Template.bind({})
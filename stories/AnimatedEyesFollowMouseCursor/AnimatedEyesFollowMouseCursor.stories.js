import { createAnimatedEyesFollowMouseCursor } from './AnimatedEyesFollowMouseCursor.js'

export default {
  title: 'AnimatedEyesFollowMouseCursor',
  parameters: {
    layout: 'fullscreen',
  }
}

const Template = () => {
  return createAnimatedEyesFollowMouseCursor()
}

export const BasicCss = Template.bind({})
import { createClipPathCircle } from "./ClipPathCircle"

export default {
  title: 'ClipPathCircle',
  parameters: {
    layout: 'fullscreen',
  }
}

const Template = () => {
  return createClipPathCircle()
}

export const BasicCss = Template.bind({})
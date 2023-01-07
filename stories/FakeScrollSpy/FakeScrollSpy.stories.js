import { createFakeScrollSpy } from './FakeScrollSpy.js'

export default {
  title: 'Fake Scroll Spy',
  parameters: {
    layout: 'fullscreen',
  }
}

const Template = () => {
  return createFakeScrollSpy()
}

export const BasicCss = Template.bind({})
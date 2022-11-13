// TextButton.stories.js

export default {
  title: 'TextButton',
};

const Template = (args) => {
  const btn = document.createElement('button')
  btn.innerText = args.label

  const mode = args.primary ? 'storybook-button--primary' : 'storybook-button--secondary'
  btn.className = ['storybook-button', 'storybook-button--medium', mode].join(' ')

  return btn
}

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Button'
}

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  primary: false,
};
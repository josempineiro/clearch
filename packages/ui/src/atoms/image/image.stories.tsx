import React from 'react'
import { Image, ImageProps } from './Image'
import { Meta } from '@storybook/react'
import type { StoryFn } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Image> = {
  title: 'Atoms/Image',
  component: Image,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onClick: { action: 'clicked' },
  },
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Image> = (args: ImageProps) => <Image {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  src: 'https://placehold.co/500x400',
  onClick: () => alert('clicking primary'),
}

export const CustomSize = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
CustomSize.args = {
  src: 'https://placehsold.co/100x200',
  onClick: () => alert('clicking primary'),
  width: '100%',
  aspectRatio: 1,
}

export const ImageWithAspectRatio = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ImageWithAspectRatio.args = {
  src: 'https://placehsold.co/100x200',
  onClick: () => alert('clicking primary'),
  width: 100,
  aspectRatio: 1,
}

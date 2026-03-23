import type { Meta, StoryObj } from '@storybook/nextjs'

import { Button, Card, Input, Select } from './ui'

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Save Employee',
    variant: 'primary',
  },
}

export const Danger: Story = {
  args: {
    children: 'Delete Employee',
    variant: 'danger',
  },
}

export const FormExamples: Story = {
  render: () => (
    <Card className="w-[420px] p-4 space-y-3">
      <Input label="Full Name" placeholder="Ada Lovelace" />
      <Input label="Email" placeholder="ada@example.com" type="email" />
      <Select
        label="Department"
        options={[
          { value: '', label: 'Select Department' },
          { value: 'Engineering', label: 'Engineering' },
          { value: 'HR', label: 'HR' },
        ]}
      />
      <Button>Submit</Button>
    </Card>
  ),
}

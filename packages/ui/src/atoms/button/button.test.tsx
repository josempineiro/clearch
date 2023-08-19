import React from 'react';
import { describe, test, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

const onChangeSpy = vi.fn();

describe('Button', () => {
  beforeEach(() => {
    onChangeSpy.mockClear();
  });
  test('renders button with text', () => {
    render(<Button role="button">Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Button');
  });
  test('calls onClick when clicked', () => {
    render(<Button onClick={onChangeSpy} role="button">Button</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onChangeSpy).toHaveBeenCalled();
  });
  test('not calls onClick when disabled', () => {
    render(<Button onClick={onChangeSpy} role="button" disabled>Button</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onChangeSpy).not.toHaveBeenCalled();
  });
});
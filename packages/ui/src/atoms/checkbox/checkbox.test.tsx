import React from 'react';
import { describe, test, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './checkbox';

const onChangeSpy = vi.fn();

describe('Checkbox', () => {
  test('calls onClick with check value when clicked', () => {
    render(<Checkbox value={false} onChange={onChangeSpy} label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox');
    fireEvent.click(checkbox);
    expect(onChangeSpy).toHaveBeenCalledWith(true);
  });
});
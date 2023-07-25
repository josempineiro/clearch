import { useMemo } from 'react'
import { Button, MenuItem, DropdownMenuButton } from '@clearq/ui'
import type { BarProps } from '@clearq/ui'

export interface PokemonSortingOption {
  label: string
  value: string
}

export const usePokemonSortingOptions = (): Array<PokemonSortingOption> => {
  return useMemo(
    () => [
      {
        label: 'Name',
        value: 'name',
      },
      {
        label: 'Number',
        value: 'id',
      },
      {
        label: 'HP',
        value: 'hp',
      },
    ],
    [],
  )
}

export interface PokemonsSortingDropdownMenuButtonProps extends Omit<BarProps, 'children'> {
  activeSortBy?: string
  onSortBy: (value: string) => void
}

export const PokemonsSortingDropdownMenuButton = ({
  onSortBy,
  activeSortBy,
}: PokemonsSortingDropdownMenuButtonProps) => {
  const pokemonSortingOptions = usePokemonSortingOptions()
  const activeSortingOption = pokemonSortingOptions.find(({ value }) => value === activeSortBy)
  return (
    <DropdownMenuButton width="m" offsetX={0} offsetY={16} button={<Button>{activeSortingOption?.label}</Button>}>
      {pokemonSortingOptions.map(({ label, value }) => (
        <MenuItem key={value} label={label} onClick={() => onSortBy(value)} active={value === activeSortBy} />
      ))}
    </DropdownMenuButton>
  )
}

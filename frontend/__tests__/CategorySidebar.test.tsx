import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CategorySidebar } from '@/components/CategorySidebar'
import { usePathname } from 'next/navigation'
import { getCategorySummary } from '@/services/notes'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

jest.mock('@/services/notes', () => ({
  getCategorySummary: jest.fn(),
}))

describe('CategorySidebar', () => {
  it('renders correctly', async () => {
    ;(usePathname as jest.Mock).mockReturnValue('/notes')
    ;(
      getCategorySummary as jest.MockedFunction<typeof getCategorySummary>
    ).mockResolvedValue([
      { category: 'RDM', count: 5 },
      { category: 'SCL', count: 3 },
    ])

    render(<CategorySidebar />)

    expect(screen.getByText('All Categories')).toBeInTheDocument()
    expect(await screen.findByText('Random Thought')).toBeInTheDocument()
    expect(await screen.findByText('School')).toBeInTheDocument()
    expect(await screen.findByText('Drama')).toBeInTheDocument()
    expect(await screen.findByText('Personal')).toBeInTheDocument()
  })

  it('matches snapshot', async () => {
    const { asFragment } = render(<CategorySidebar />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('displays category counts correctly', async () => {
    render(<CategorySidebar />)

    expect(await screen.findByText('5')).toBeInTheDocument()
    expect(await screen.findByText('3')).toBeInTheDocument()
  })
})

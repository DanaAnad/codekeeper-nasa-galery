
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import SearchPage from './componewnts/SearchPage';

jest.mock('axios');

describe('SearchPage', () => {
  test('performs search and displays results', async () => {
    const searchResults = [
      {
        data: [
          {
            nasa_id: '123',
            title: 'Sample Image',
            location: 'Sample Location',
            photographer: 'Sample Photographer'
          }
        ],
        links: [
          {
            href: 'https://sample-image.jpg'
          }
        ]
      }
    ];

    axios.get.mockResolvedValue({ data: { collection: { items: searchResults } } });

    render(<SearchPage />);

    fireEvent.change(screen.getByLabelText('Find:'), { target: { value: 'moon' } });
    fireEvent.change(screen.getByLabelText('Start Year:'), { target: { value: '2010' } });
    fireEvent.change(screen.getByLabelText('End Year:'), { target: { value: '2020' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      expect(screen.getByText('Sample Image')).toBeInTheDocument();
    });

    expect(screen.getByText('Sample Location')).toBeInTheDocument();
    expect(screen.getByText('Sample Photographer')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View Details' })).toHaveAttribute('href', '/show/123');
    expect(screen.getByRole('img', { alt: 'Sample Image' })).toHaveAttribute('src', 'https://sample-image.jpg');

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://images-api.nasa.gov/search', {
      params: {
        q: 'moon',
        media_type: 'image',
        year_start: '2010',
        year_end: '2020'
      }
    });
  });
});
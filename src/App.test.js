import { render, screen } from '@testing-library/react';
import App from './App';
import data from './data.json';


describe('Client APP', () => {

  beforeAll(() => jest.spyOn(window, "fetch"))

  it(`Should show a list of clients from API`, async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data,
    });

    render(<App/>);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:9000/api/clients');
    
    for (let clients of data) {
      expect(await screen.findByText(clients.nombres)).toBeInTheDocument();
    }
  });

  it('Should show an error message when has a network error', async () => {
    window.fetch.mockResolvedValueOnce(new Error("Network error"));
    render(<App/>);
    expect(await screen.findByText("Network error")).toBeInTheDocument();
  });

});


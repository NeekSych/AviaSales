const baseUrl = 'https://aviasales-test-api.kata.academy';

const fetchTickets = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.tickets || res.stop) return { stop: res.stop, tickets: res.tickets, error: false };
      return null;
    })
    .catch(() => ({ stop: false, tickets: [], error: true }));

const setSearchId = () => {
  const sId = sessionStorage.getItem('searchId');
  if (sId) return sId;

  return fetch(`${baseUrl}/search`)
    .then((res) => res.json())
    .then(({ searchId }) => {
      sessionStorage.setItem('searchId', searchId);
      return searchId;
    });
};

const getTickets = async () => {
  const searchId = await setSearchId();

  const url = `${baseUrl}/tickets?searchId=${searchId}`;

  const res = await fetchTickets(url);
  if (res.stop) sessionStorage.removeItem('searchId');

  return res;
};

export default getTickets;

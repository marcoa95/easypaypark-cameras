const { VITE_API_BASE_URL } = import.meta.env;

export const updateCount = (token, value) => new Promise((resolve, reject) => {
  const request = new Request(VITE_API_BASE_URL + '/count/', {
    method: 'PUT',
    body: JSON.stringify({ count: { value } }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

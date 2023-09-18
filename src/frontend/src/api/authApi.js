const { VITE_API_BASE_URL } = import.meta.env;

export const loginUser = (username, password) => new Promise((resolve, reject) => {
  const request = new Request(VITE_API_BASE_URL + '/users/login', {
    method: 'POST',
    body: JSON.stringify({ data: { username, password } }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

export const getMeUser = token => new Promise((resolve, reject) => {
  const request = new Request(VITE_API_BASE_URL + '/users/me', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });

  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

const { VITE_API_BASE_URL } = import.meta.env;

export const getUsers = (token, query) => new Promise((resolve, reject) => {
  const queryParams = new URLSearchParams({
    results: 10,
    ...query
  }).toString();
  const request = new Request(VITE_API_BASE_URL + '/users?' + queryParams, {
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

export const getUser = (token, id) => new Promise((resolve, reject) => {
  const request = new Request(VITE_API_BASE_URL + '/users/' + id, {
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

export const createUser = (token, user) => new Promise((resolve, reject) => {
  const request = new Request(VITE_API_BASE_URL + '/users', {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

export const updateUser = (token, id, user) => new Promise((resolve, reject) => {
  const request = new Request(VITE_API_BASE_URL + '/users/' + id, {
    method: 'PUT',
    body: JSON.stringify({ user }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

export const deelteUser = (token, id) => new Promise((resolve, reject) => {
  const request = new Request(VITE_API_BASE_URL + '/users/' + id, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

export const resetUserPassword = (token, id, password) => new Promise((resolve, reject) => {
  const request = new Request(`${VITE_API_BASE_URL}/users/${id}/reset-password`, {
    method: 'PUT',
    body: JSON.stringify({ data: { password } }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

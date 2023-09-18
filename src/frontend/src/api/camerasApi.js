const { VITE_API_BASE_URL } = import.meta.env;

export const getCameras = (token, query) => new Promise((resolve, reject) => {
  const queryParams = new URLSearchParams({
    results: 10,
    ...query
  }).toString();
  const request = new Request(VITE_API_BASE_URL + '/cameras?' + queryParams, {
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

export const getCamera = (token, id) => new Promise((resolve, reject) => {
  const request = new Request(VITE_API_BASE_URL + '/cameras/' + id, {
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

export const createCamera = (token, camera) => new Promise((resolve, reject) => {
  const request = new Request(VITE_API_BASE_URL + '/cameras', {
    method: 'POST',
    body: JSON.stringify({ camera }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

export const updateCamera = (token, id, camera) => new Promise((resolve, reject) => {
  const request = new Request(VITE_API_BASE_URL + '/cameras/' + id, {
    method: 'PUT',
    body: JSON.stringify({ camera }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

export const deelteCamera = (token, id) => new Promise((resolve, reject) => {
  const request = new Request(VITE_API_BASE_URL + '/cameras/' + id, {
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

const { VITE_API_BASE_URL } = import.meta.env;

export const getRecords = (token, query) => new Promise((resolve, reject) => {
  const queryParams = new URLSearchParams({
    results: 10,
    ...query
  }).toString();
  const request = new Request(VITE_API_BASE_URL + '/records?' + queryParams, {
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

export const getRecord = (token, id) => new Promise((resolve, reject) => {
  const request = new Request(VITE_API_BASE_URL + '/records/' + id, {
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

export const getRecordsReport = (token, query) => new Promise((resolve, reject) => {
  const queryParams = new URLSearchParams({
    results: 10,
    ...query
  }).toString();
  const request = new Request(VITE_API_BASE_URL + '/records/pdf?' + queryParams, {
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

const { VITE_API_BASE_URL } = import.meta.env;

export const updateTicket = (token, qrCode) => new Promise((resolve, reject) => {
  const request = new Request(VITE_API_BASE_URL + '/tickets/' + qrCode, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

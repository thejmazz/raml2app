export const ajax = (url, body, method = 'POST') => {
  return fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(res => res.json())
}

export const get = (url) => fetch(url, { method: 'GET' }).then(res => res.json())

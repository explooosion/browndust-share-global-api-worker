const APIHOST = 'https://browndust-global-api.pmang.cloud/book'
const URL = APIHOST + '/getAllCharacters'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

/**
 * handleRequest sends a POST request with JSON data and
 * and reads in the response body.
 * @param {Request} request the incoming request
 */
async function handleRequest(request) {
  const init = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      ...corsHeaders,
    },
  }
  const response = await fetch(URL, init)
  const results = await gatherResponse(response)
  return new Response(results, init)
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get('content-type')
  if (contentType.includes('application/json')) {
    return JSON.stringify(await response.json())
  } else if (contentType.includes('application/text')) {
    return await response.text()
  } else if (contentType.includes('text/html')) {
    return await response.text()
  } else {
    return await response.text()
  }
}

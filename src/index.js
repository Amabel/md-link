async function handler(event, context) {
  // Access parameters
  const username = event['queryStringParameters']['username']

  // Return format :
  // When Lambda Proxy integration is enabled
  return {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
    body: JSON.stringify(username),
  }
  // When Lambda Proxy integration is disabled
  // return { username }
}

exports.handler = handler

// For debugging
handler({ queryStringParameters: { username: 'amabel' } }, null)

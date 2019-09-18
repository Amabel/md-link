import axios from 'axios'
import { parse } from 'node-html-parser'

async function handler(event, context) {
  const url = (event && event['queryStringParameters'] && event['queryStringParameters']['url']) || undefined
  const html = await fetchHTML(url)
  const title = getTitleFromHtml(html)
  const data = { title, url }

  return {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
    body: JSON.stringify({ data }),
  }
}

async function fetchHTML(url) {
  const res = await axios({
    method: 'get',
    url,
  })
  return res.data
}

function getTitleFromHtml(html) {
  const root = parse(html)
  return root.querySelectorAll('html head title')[0].childNodes[0].rawText
}

exports.handler = handler

// For debugging
handler({ queryStringParameters: { url: 'https://github.com/Amabel' } }, null)

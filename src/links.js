import { load } from 'cheerio';

const url = new URL('https://www.gov.br/pt-br/noticias');

/** @type {RequestInit} */
const options = {
  method: 'GET',
  headers: {
    Accept: 'text/html',
  },
};

async function generateLinks() {
  try {
    const result = await fetch(url, options);
    if (!result.ok) throw new Error('Erro ao executar a requisição');
    const html = await result.text();
    const $ = load(html);
    const links = $('.summary.url[href]').map((index, element) => {
      const link = $(element).attr('href');
      return link;
    }).toArray();

    console.log(links);
  } catch (e) {
    console.error(e);
  }

  return [];
}

generateLinks();
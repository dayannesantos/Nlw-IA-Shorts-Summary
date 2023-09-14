import { server } from './server.js';

const form = document.querySelector('#form');
const input = document.querySelector('#url');
const content = document.querySelector('#content');

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  content.classList.add('placeholder')

  const videoURL = input.value;

  if(!videoURL.includes('shorts')) {
    return content.textContent = 'NÃO É UM SHORT...'
  }

  const [_, params] = videoURL.split('/shorts/')
  const [ videoID ] = params.split('?si')
  
  content.textContent = 'OBTENDO O TEXTO DO ÁUDIO...'
  
  const transcription = await server.get(`/summary/${videoID}`)
  
  content.textContent = 'REALIZANDO O RESUMO...'

  const summary = await server.post('/summary', {
    text: transcription.data.result
  })

  content.textContent = summary.data.result
  content.classList.remove('placeholder')
})
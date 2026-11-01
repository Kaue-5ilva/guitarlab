# GuitarLab

GuitarLab é um site estático de aprendizagem de guitarra, reconstruído para funcionar diretamente no navegador. Não precisa instalar programas, executar arquivos de desktop, configurar backend ou fazer build.

## Publicação

A implantação é feita pelo GitHub Pages por meio do workflow em .github/workflows/deploy.yml.

URL do projeto: https://kaue-5ilva.github.io/guitarlab/

## Estrutura

- index.html: estrutura e conteúdo da página.
- styles.css: identidade visual e layout responsivo.
- app.js: biblioteca de acordes, metrônomo, afinador e progresso da prática.
- .github/workflows/deploy.yml: publicação automática no GitHub Pages.

## Recursos

- Trilhas de aprendizagem organizadas por nível.
- Biblioteca interativa com diagramas de acordes.
- Metrônomo de 40 a 220 BPM, com áudio gerado pela Web Audio API.
- Afinador cromático com acesso opcional ao microfone e estimativa de frequência.
- Checklist diário de prática, com progresso armazenado localmente no navegador.

## Tecnologias e privacidade

HTML5, CSS3 e JavaScript moderno, sem frameworks. O site não possui backend e não envia dados de prática para um servidor. O checklist fica no armazenamento local do navegador. O afinador só solicita acesso ao microfone quando o usuário ativa a ferramenta e requer HTTPS.

## Teste local

Abra index.html em um navegador para usar a biblioteca de acordes e o metrônomo. Para testar o afinador, use localhost ou HTTPS, pois navegadores restringem o microfone em páginas file://.

Projeto pessoal. Consulte o proprietário do repositório antes de reutilizar marca e conteúdo.


Implantação contínua ativa: os pushes para main acionam a publicação no GitHub Pages.

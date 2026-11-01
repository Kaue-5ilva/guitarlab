# GuitarLab

GuitarLab é um site estático de aprendizagem de guitarra, reconstruído para funcionar diretamente no navegador. Não precisa instalar programas, executar arquivos de desktop, configurar backend ou fazer build.

## Publicar no GitHub Pages

Este projeto foi preparado para publicação direta a partir da raiz da branch main:

1. Abra Settings no repositório.
2. Entre em Pages.
3. Em Build and deployment, selecione Deploy from a branch.
4. Escolha a branch main e a pasta /(root).
5. Clique em Save.

Depois que a origem for selecionada, o GitHub Pages publica o conteúdo da raiz do repositório. A URL do projeto será:
https://kaue-5ilva.github.io/guitarlab/

## Estrutura

- index.html: estrutura e conteúdo da página.
- styles.css: identidade visual e layout responsivo.
- app.js: biblioteca de acordes, metrônomo, afinador e progresso da prática.
- .nojekyll: informa ao Pages para servir o site estático sem processamento Jekyll.

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

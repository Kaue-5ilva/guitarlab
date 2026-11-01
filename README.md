# GuitarLab

GuitarLab é um site estático de aprendizagem dedicado à **guitarra elétrica de seis cordas** e ao **violão de seis cordas**. Funciona diretamente no navegador, sem instalação, backend ou etapa de build.

## Instrumentos e afinação

O conteúdo e as ferramentas usam como referência a afinação padrão de seis cordas, da mais grave para a mais aguda:

| Corda | Nota |
|---|---|
| 6ª | E2 — Mi |
| 5ª | A2 — Lá |
| 4ª | D3 — Ré |
| 3ª | G3 — Sol |
| 2ª | B3 — Si |
| 1ª | E4 — Mi |

Os acordes básicos e seus diagramas podem ser estudados tanto na guitarra quanto no violão. As trilhas também abordam diferenças de técnica e de sonoridade entre os instrumentos.

## Recursos

- Trilhas progressivas: fundamentos, acordes, ritmo, escalas e expressão.
- Visão geral da guitarra elétrica e do violão, com foco em seis cordas.
- Biblioteca visual de acordes com indicação de dedos, cordas e casas.
- Metrônomo de 40 a 220 BPM com áudio gerado no próprio navegador.
- Afinador cromático com acesso opcional ao microfone e estimativa de frequência.
- Rotina diária de prática com progresso salvo localmente por dia.

## Tecnologias e privacidade

HTML5, CSS3 e JavaScript moderno, sem frameworks. O site não possui backend e não envia dados de prática para um servidor. O checklist fica no armazenamento local do navegador. O afinador só solicita acesso ao microfone quando o usuário ativa a ferramenta e requer HTTPS ou localhost.

## Publicar no GitHub Pages

O projeto está preparado para publicação direta a partir da raiz da branch `main`:

1. Abra **Settings** no repositório.
2. Entre em **Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch `main` e a pasta `/(root)`.
5. Clique em **Save**.

URL do projeto: https://kaue-5ilva.github.io/guitarlab/

## Estrutura

- `index.html`: estrutura, conteúdo e acessibilidade da página.
- `styles.css`: identidade visual azul, preta e branca, com layout responsivo.
- `app.js`: biblioteca de acordes, metrônomo, afinador e rotina diária.
- `.nojekyll`: publicação estática sem processamento Jekyll.

## Teste local

Abra `index.html` em um navegador para usar a biblioteca de acordes e o metrônomo. Para testar o afinador, use localhost ou HTTPS, pois navegadores restringem o acesso ao microfone em páginas `file://`.

Projeto pessoal. Consulte o proprietário do repositório antes de reutilizar marca e conteúdo.

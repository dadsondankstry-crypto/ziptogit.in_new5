# Files Explorer v4.4 — PWA para GitHub Pages

Este pacote contém a versão 4.4 do Files Explorer adaptada para instalação como aplicativo web (PWA).

## Publicar no GitHub

1. Crie um repositório no GitHub, por exemplo `files-explorer`.
2. Envie **o conteúdo deste diretório** para a raiz do repositório (não envie apenas o ZIP).
3. Vá em **Settings → Pages → Build and deployment**.
4. Em **Source**, escolha **Deploy from a branch**; selecione **main**, pasta **/(root)** e salve.
5. Acesse `https://SEU_USUARIO.github.io/files-explorer/`. O primeiro acesso precisa de internet.
6. No Chrome Android, abra o menu do navegador e escolha **Instalar app** ou **Adicionar à tela inicial** (conforme disponibilidade).

## Arquivos

- `index.html`: aplicativo original v4.4 com metadados PWA e registro de service worker.
- `manifest.webmanifest`: nome, cores, inicialização e ícones.
- `sw.js`: cache offline somente dos arquivos da interface.
- `icons/`: ícones 192 px, 512 px, ícones maskable e ícone Apple.
- `.nojekyll`: evita interferência do Jekyll no GitHub Pages.

## Funcionamento e limitações

- O aplicativo pode abrir **sem internet após a primeira visita online e instalação do cache**.
- **PWA não concede permissões adicionais aos arquivos do celular**. A seleção e edição de pastas reais dependem do suporte do navegador à File System Access API e das permissões dadas pelo usuário. Alguns navegadores Android não oferecem seleção/escrita de pastas via `showDirectoryPicker`.
- Arquivos das pastas do usuário **não são armazenados no cache do service worker**.
- Preferências e rascunhos locais pertencem à origem (endereço) e ao navegador. Migrar de `content://` para GitHub Pages não migra automaticamente esses dados.
- A URL do GitHub Pages usa HTTPS, exigido pelo service worker. Abrir `index.html` diretamente como `file://` ou `content://` **não instala nem ativa a PWA**.
- Para atualizar o app futuramente, substitua `index.html` e altere `CACHE_NAME` no `sw.js` para forçar atualização do cache.

## Cuidados

Teste com arquivos de exemplo antes de renomear, excluir ou mover documentos importantes.

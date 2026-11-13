# Full embedded posts

[ENGLISH](README.md) | **ESPAÑOL**

Mantenido por Criptonautas. Sin afiliación ni respaldo de Discourse (Civilized Discourse Construction Kit, Inc.).

Componente de tema de Discourse. Los temas creados por la función de
[Embedding](https://meta.discourse.org/t/embedding-discourse-comments-via-javascript/31963)
muestran el artículo completo al cargar, en lugar de un extracto más un botón "Mostrar más".
Los artículos largos se pueden plegar a una vista previa, para que la conversación quede cerca.

![Artículo del blog incrustado, completo](docs/screenshots/full-article.png)

## Instalación

Admin → Personalizar → Temas → Componentes → Instalar → Desde un repositorio git, con la URL de este repo.

## Plegar artículos largos

Opcional. Indica etiquetas en `collapse tags` (vacío por defecto, lo que desactiva el
plegado) y el primer post de los temas que lleven alguna se pliega a una vista previa de
`collapsed height` (900 px por defecto) con un botón "Ver más". Los artículos cortos quedan
igual, las respuestas nunca se pliegan y no cambia nada dentro del embed de comentarios del
blog. El plegado es solo visual: el texto completo sigue en la página, así que buscadores y
lectores de pantalla lo leen entero.

![Artículo largo plegado sobre la primera respuesta](docs/screenshots/folded-article.png)

## Notas

El truncado ocurre en la importación: el extracto se convierte en el post y el artículo completo
se guarda en `topic_embeds.embed_content_cache`. El componente lo obtiene por el mismo endpoint
`/posts/:id/expand-embed` que usa el botón, con caché en el servidor, así que tu blog no se
vuelve a rastrear. Si esa petición falla, el botón se deja en su lugar sin mostrar error;
al hacer clic se reintenta y el error se informa como siempre.

Desactivar el ajuste del sitio `embed truncate` solo afecta a las importaciones *futuras*; esos
temas no son expandibles y el componente no hace nada con ellos. Los temas ya importados
conservan el extracto en la base de datos hasta que se reimporten con `TopicEmbed.import` desde
la consola de rails; mientras tanto, este componente es lo que hace que se muestren completos.

## Licencia

MIT. Consulta [LICENSE](LICENSE).

Texto de este README bajo [CC BY-NC-SA 4.0](CC-BY-NC-SA-4.0.txt).

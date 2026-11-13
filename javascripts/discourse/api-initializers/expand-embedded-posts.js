import { ajax } from "discourse/lib/ajax";
import { apiInitializer } from "discourse/lib/api";

// Posts already expanded — setting `cooked` re-runs decorators.
const expanded = new WeakSet();

export default apiInitializer((api) => {
  api.decorateCookedElement(
    (element, helper) => {
      const post = helper.model;
      if (!post?.expandablePost || expanded.has(post)) {
        return;
      }

      expanded.add(post);
      // Same request and markup as core's Post#expand, without its error dialog:
      // this runs on load, so a failure leaves core's button for a manual retry.
      // Keep in step with Post#expand if core changes that markup.
      ajax(`/posts/${post.id}/expand-embed`)
        .then((result) => {
          post.cooked = `<section class="expanded-embed">${result.cooked}</section>`;
        })
        .catch(() => {});
    },
    { onlyStream: true }
  );
});

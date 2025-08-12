import type { DirectiveBinding } from "vue";

type IntersectCallback = (entry: IntersectionObserverEntry) => void;

interface Options {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

interface HTMLElementWithObserver extends HTMLElement {
  __vIntersectObserver?: IntersectionObserver;
}

type Binding = DirectiveBinding<
  IntersectCallback | { callback: IntersectCallback; options?: Options }
>;

const defaultOptions: Options = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
  once: false,
};

function parseBinding(binding: Binding) {
  if (typeof binding.value === "function") {
    return { callback: binding.value, options: { ...defaultOptions } };
  } else if (binding.value && typeof binding.value.callback === "function") {
    const options = {
      ...defaultOptions,
      ...(binding.value.options ?? {}),
    };
    return { callback: binding.value.callback, options };
  } else {
    throw new Error("Директива v-intersect должна принимать либо функцию, либо объект + функция");
  }
}

export default {
  mounted(el: HTMLElementWithObserver, binding: Binding) {
    const { callback, options } = parseBinding(binding);

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry);

          if (options?.once) {
            observer.disconnect();
          }
        }
      });
    }, options);

    observer.observe(el);
    el.__vIntersectObserver = observer;
  },

  unmounted(el: HTMLElementWithObserver) {
    const observer: IntersectionObserver | undefined = el.__vIntersectObserver;
    if (observer) {
      observer.disconnect();
      delete el.__vIntersectObserver;
    }
  },
};

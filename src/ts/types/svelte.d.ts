// Svelte types
declare module '*.svelte' {
  import { SvelteComponentTyped } from 'svelte';
  export default class extends SvelteComponentTyped<object, object, object> {}
}
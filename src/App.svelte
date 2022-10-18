<script lang="ts">
  // eslint-expect-error
  const text: string = 'Hello World';

  console.log(text);
</script>

<main>
	<h1 class="!text-blue-500">Hello World!</h1>
  <p class="font-bold">Includes following libraries:</p>
  <ul>
    <li>Neutralino JS</li>
    <li>Svelte</li>
    <li>TypeScript</li>
    <li>Tailwind CSS</li>
    <li>ESLint</li>
  </ul>
  <br>
  <p>Now build something AWESOME!</p>
</main>

<style lang="scss">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

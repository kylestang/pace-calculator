<script>
  import Github from './Github.svelte';
  import PaceCalculator from './PaceCalculator.svelte';
  import { Heading } from 'flowbite-svelte';
</script>

<div class="h-screen w-full bg-neutral-100">
  <Github />

  <div class="p-4 sm:p-6 flex flex-col items-center w-full">
    <Heading tag="h1" class="w-fit text-primary-700 mb-8">Run Pace Calculator</Heading>
    <PaceCalculator />
  </div>
</div>

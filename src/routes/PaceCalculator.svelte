<script lang="ts">
  import { calculatePace, calculateSpeed, timeToSeconds } from '$lib/common';
  import { Card, Input, Select, NumberInput } from 'flowbite-svelte';

  const distanceSelector = [
    { value: 'km', name: 'km' },
    { value: 'M', name: 'M' }
  ];

  let hours = '00';
  let minutes = '00';
  let seconds = '00';

  let distance = '0';

  let units: 'km' | 'M' = 'km';

  let time = 0;

  $: {
    time = timeToSeconds(Number(hours), Number(minutes), Number(seconds));
    hours = hours.replace(/\D/g, '');
    minutes = minutes.replace(/\D/g, '');
    seconds = seconds.replace(/\D/g, '');
    distance = distance.replace(/\D/g, '');
  }
</script>

<Card color="primary">
  <div class="flex flex-col">
    <div class="mb-4">
      Time
      <div class="flex flex-row items-center">
        <Input
          class="w-10"
          placeholder="HH"
          bind:value={hours}
          on:blur={() => {
            hours = hours.padStart(2, '0');
          }}
        />
        :
        <Input
          class="w-10"
          placeholder="MM"
          bind:value={minutes}
          on:blur={() => {
            minutes = minutes.padStart(2, '0');
          }}
        />
        :
        <Input
          class="w-10"
          placeholder="SS"
          bind:value={seconds}
          on:blur={() => {
            seconds = seconds.padStart(2, '0');
          }}
        />
      </div>
    </div>

    <div class="mb-4">
      Distance
      <div class="flex flex-row gap-4">
        <Input class="w-20" bind:value={distance} />
        <Select class="w-20" items={distanceSelector} placeholder="" bind:value={units} />
      </div>
    </div>

    <div>
      Pace: {calculatePace(time, Number(distance) * 1000)}
    </div>
    <div>
      Speed: {calculateSpeed(time, Number(distance) * 1000)}
    </div>
  </div>
</Card>
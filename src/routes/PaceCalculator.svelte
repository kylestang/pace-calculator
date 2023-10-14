<script lang="ts">
  import { secondsToTime, timeToSeconds } from '$lib/common';
  import { Card, Input, Select } from 'flowbite-svelte';

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

  $: time = timeToSeconds(Number(hours), Number(minutes), Number(seconds));

  function calculatePace(seconds: number, distance: number, units: 'km' | 'M'): string {
    if (seconds === 0 && distance === 0) {
      return 'N/A';
    }
    if (distance == 0) {
      return (seconds / distance).toString();
    }
    let secondsPerDistance = seconds / distance;
    let pace = secondsToTime(secondsPerDistance);
    let suffix = units === 'km' ? '/km' : '/M';
    return pace + ' ' + suffix;
  }

  function calculateSpeed(seconds: number, distance: number, units: 'km' | 'M'): string {
    if (seconds === 0 && distance === 0) {
      return 'N/A';
    }
    if (seconds === 0) {
      return (distance / seconds).toString();
    }
    let speed = (distance / (seconds / 3600)).toFixed(2);
    let suffix = units === 'km' ? 'km/h' : 'MPH';
    return speed + ' ' + suffix;
  }
</script>

<Card color="primary" class="w-full sm:w-min">
  <div class="flex flex-col">
    <div class="mb-4">
      Time
      <div class="flex flex-row items-center">
        <Input
          class="w-10"
          placeholder=""
          bind:value={hours}
          on:blur={() => {
            hours = hours.padStart(2, '0');
          }}
          on:input={() => {
            hours = hours.replace(/\D/g, '');
          }}
          on:focus={() => {
            if (hours === '00') {
              hours = '';
            }
          }}
          inputmode="numeric"
        />
        :
        <Input
          class="w-10"
          placeholder=""
          bind:value={minutes}
          on:blur={() => {
            minutes = minutes.padStart(2, '0');
          }}
          on:input={() => {
            minutes = minutes.replace(/\D/g, '');
          }}
          on:focus={() => {
            if (minutes === '00') {
              minutes = '';
            }
          }}
          inputmode="numeric"
        />
        :
        <Input
          class="w-10"
          placeholder=""
          bind:value={seconds}
          on:blur={() => {
            seconds = seconds.padStart(2, '0');
          }}
          on:input={() => {
            seconds = seconds.replace(/\D/g, '');
          }}
          on:focus={() => {
            if (seconds === '00') {
              seconds = '';
            }
          }}
          inputmode="numeric"
        />
      </div>
    </div>

    <div class="mb-4">
      Distance
      <div class="flex flex-row gap-4">
        <Input
          class="w-20"
          bind:value={distance}
          inputmode="numeric"
          on:input={() => {
            distance = distance.replace(/\D/g, '');
          }}
          on:focus={() => {
            if (distance === '0') {
              distance = '';
            }
          }}
          on:blur={() => {
            if (distance === '') {
              distance = '0';
            }
          }}
        />
        <Select class="w-20" items={distanceSelector} placeholder="" bind:value={units} />
      </div>
    </div>

    <div>
      Pace: {calculatePace(time, Number(distance), units)}
    </div>
    <div>
      Speed: {calculateSpeed(time, Number(distance), units)}
    </div>
  </div>
</Card>

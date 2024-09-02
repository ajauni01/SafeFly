<script>
    export let fromAirport = '';
    export let toAirport = '';
  
    let fromInput = fromAirport;
    let toInput = toAirport;
  
    function handleSubmit() {
      const event = new CustomEvent('updateFlightPath', {
        detail: {
          from: fromInput,
          to: toInput
        }
      });
      dispatchEvent(event);
    }
  </script>
  
  <nav>
    <input
      type="text"
      placeholder="From Airport"
      bind:value={fromInput}
    />
    <input
      type="text"
      placeholder="To Airport"
      bind:value={toInput}
    />
    <button on:click={handleSubmit}>
      Search
    </button>
  </nav>
  
  <style>
    nav {
      display: flex;
      gap: 10px;
      margin: 10px;
    }
  
    input {
      padding: 5px;
      border-radius: 3px;
      border: 1px solid #ccc;
    }
  
    button {
      padding: 5px 10px;
      border-radius: 3px;
      background-color: #007BFF;
      color: white;
      border: none;
      cursor: pointer;
    }
  </style>
  
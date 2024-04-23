function submitButtonHandler(inputs: NodeListOf<HTMLInputElement>, date: Date) {
  let formData = new FormData();
  inputs.forEach(input => {
      formData.append(input.name, input.value);
  });
  formData.append("date", date.toISOString().split('T')[0]);

  const url = "https://example.com/submit";

  fetch(url, {
      method: 'POST',
      body: formData
  }).then(response => {
      if (response.ok) {
          return response.text(); // or response.json() if server responds with JSON
      }
      throw new Error('Failed to send data: ' + response.statusText);
  }).then(data => {
      console.log("Data successfully sent to the server");
      console.log(data); // Optional: Log the server response
  }).catch(error => {
      console.error(error.message);
  });
}

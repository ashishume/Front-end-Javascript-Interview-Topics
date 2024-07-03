document.addEventListener("DOMContentLoaded", () => {
  const generateEventButton = document.getElementById("generateEvent");
  const outputDiv = document.getElementById("output");

  // Parameters
  const windowSize = 5; // Adjust the window size as needed
  const events = [];

  // Function to process the events within the window
  function processEvents(events) {
    // For demonstration, we'll just log the events to the output div
    const eventList = events.map((event) => `<li>${event}</li>`).join("");
    outputDiv.innerHTML = `<ul>${eventList}</ul>`;
  }

  // Function to add a new event to the stream
  function addEvent(event) {
    events.push(event);

    // Maintain the window size
    if (events.length > windowSize) {
      events.shift(); // Remove the oldest event
    }

    // Process the current window of events
    processEvents(events);
  }

  // Event listener for the button
  generateEventButton.addEventListener("click", () => {
    const newEvent = `Event ${new Date().toLocaleTimeString()}`;
    addEvent(newEvent);
  });
});

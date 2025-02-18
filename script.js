let events = [
  { id: 1, name: "Concert - Rock Band", availability: 50 },
  { id: 2, name: "Movie - Blockbuster", availability: 100 },
  { id: 3, name: "Travel - City Tour", availability: 30 },
];

const eventList = document.getElementById("event-list");
const searchBar = document.getElementById("search-bar");
const adminForm = document.getElementById("admin-form");
const newEventName = document.getElementById("new-event-name");
const newEventTickets = document.getElementById("new-event-tickets");
const clearEventsButton = document.getElementById("clear-events");
const themeToggle = document.getElementById("theme-toggle");
const bookingModal = new bootstrap.Modal(document.getElementById("booking-modal"));
const eventNameInput = document.getElementById("event-name");
const ticketQuantityInput = document.getElementById("ticket-quantity");
const confirmBookingButton = document.getElementById("confirm-booking");

let darkMode = false;

function displayEvents(filteredEvents = events) {
  eventList.innerHTML = "";
  filteredEvents.forEach((event) => {
    const eventCard = document.createElement("div");
    eventCard.className = "col-md-4";
    eventCard.innerHTML = `
      <div class="card ${darkMode ? "dark-mode" : ""}">
        <div class="card-body">
          <h5 class="card-title">${event.name}</h5>
          <p class="card-text">Available Tickets: <span id="availability-${event.id}">${event.availability}</span></p>
          <button class="btn btn-primary" onclick="bookTickets(${event.id})">Book Now</button>
        </div>
      </div>
    `;
    eventList.appendChild(eventCard);
  });
}

function bookTickets(eventId) {
  const event = events.find((e) => e.id === eventId);
  eventNameInput.value = event.name;
  ticketQuantityInput.value = 1;
  confirmBookingButton.onclick = () => confirmBooking(eventId);
  bookingModal.show();
}

function confirmBooking(eventId) {
  const quantity = parseInt(ticketQuantityInput.value, 10);
  const event = events.find((e) => e.id === eventId);

  if (quantity > 0 && quantity <= event.availability) {
    event.availability -= quantity;
    document.getElementById(availability-${event.id}).textContent = event.availability;
    alert("Booking confirmed!");
    bookingModal.hide();
  } else {
    alert("Invalid quantity!");
  }
}

searchBar.addEventListener("input", () => {
  const searchTerm = searchBar.value.toLowerCase();
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm)
  );
  displayEvents(filteredEvents);
});

adminForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newEvent = {
    id: Date.now(),
    name: newEventName.value,
    availability: parseInt(newEventTickets.value, 10),
  };
  events.push(newEvent);
  displayEvents();
  adminForm.reset();
});

clearEventsButton.addEventListener("click", () => {
  events = [];
  displayEvents();
});

themeToggle.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = darkMode ? "Dark Mode" : "Light Mode";
  displayEvents();
});

document.addEventListener("DOMContentLoaded", () => displayEvents());

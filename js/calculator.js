document.addEventListener("DOMContentLoaded", function () {
  // Sri Lankan districts array
  const districts = [
    "Katunayake Airport",
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
  ];

  // Get all required DOM elements
  const elements = {
    locationSelect: document.getElementById("locationSelect"),
    destinationSelect: document.getElementById("destinationSelect"),
    searchBtn: document.getElementById("searchBtn"),
    locationInput: document.getElementById("locationInput"),
    distanceInput: document.getElementById("distanceInput"),
    miniPrice: document.getElementById("miniPrice"),
    sedanPrice: document.getElementById("sedanPrice"),
    vanPrice: document.getElementById("vanPrice"),
    hiroofPrice: document.getElementById("hiroofPrice"),
    vehicleSelect: document.getElementById("vehicleSelect"),
    whatsappNo: document.getElementById("whatsappNo"),
    bookingDate: document.getElementById("bookingDate"),
    bookingTime: document.getElementById("bookingTime"),
    bookBtn: document.getElementById("bookBtn"),
  };

  // Check if all elements exist
  for (const [key, element] of Object.entries(elements)) {
    if (!element && key !== "searchBtn" && key !== "bookBtn") {
      console.error(`Element ${key} not found`);
    }
  }

  // Populate dropdowns
  function populateDropdowns() {
    districts.forEach((district) => {
      const option1 = new Option(district, district);
      const option2 = new Option(district, district);
      elements.locationSelect.add(option1);
      elements.destinationSelect.add(option2);
    });
  }

  // Initialize Google Maps service
  const distanceService = new google.maps.DistanceMatrixService();

  // Calculate actual distance
  async function calculateDistance(origin, destination) {
    return new Promise((resolve, reject) => {
      distanceService.getDistanceMatrix(
        {
          origins: [origin + ", Sri Lanka"],
          destinations: [destination + ", Sri Lanka"],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
        },
        (response, status) => {
          if (status !== "OK") {
            reject(new Error(`Error: ${status}`));
            return;
          }

          const result = response.rows[0].elements[0];
          if (result.status === "OK") {
            resolve({
              distance: result.distance.value / 1000, // Convert to km
              duration: result.duration.text,
            });
          } else {
            reject(new Error("Route not available"));
          }
        }
      );
    });
  }

  // Update prices based on distance
  function updatePrices(distance) {
    const rates = {
      mini: 120,
      sedan: 140,
      van: 160,
      hiroof: 180,
    };

    if (elements.miniPrice)
      elements.miniPrice.textContent = `Rs.${Math.round(distance * rates.mini)}/-`;
    if (elements.sedanPrice)
      elements.sedanPrice.textContent = `Rs.${Math.round(distance * rates.sedan)}/-`;
    if (elements.vanPrice)
      elements.vanPrice.textContent = `Rs.${Math.round(distance * rates.van)}/-`;
    if (elements.hiroofPrice)
      elements.hiroofPrice.textContent = `Rs.${Math.round(distance * rates.hiroof)}/-`;
  }

  // Handle search
  async function handleSearch() {
    const origin = elements.locationSelect.value;
    const destination = elements.destinationSelect.value;

    if (!origin || !destination) {
      alert("Please select both location and destination");
      return;
    }

    if (origin === destination) {
      alert("Location and destination cannot be the same");
      return;
    }

    elements.locationInput.value = `${origin} to ${destination}`;
    elements.distanceInput.value = "Calculating...";

    try {
      const { distance } = await calculateDistance(origin, destination);
      elements.distanceInput.value = `${distance.toFixed(1)} km`;
      updatePrices(distance);
    } catch (error) {
      console.error(error);
      elements.distanceInput.value = "Error calculating distance";
    }
  }

  // Handle booking
  function handleBooking() {
    // Collect form data
    const origin = elements.locationSelect.value;
    const destination = elements.destinationSelect.value;
    const vehicle = elements.vehicleSelect.value;
    const whatsappNo = elements.whatsappNo.value.trim();
    const date = elements.bookingDate.value;
    const time = elements.bookingTime.value;
    const distance = elements.distanceInput.value;

    // Basic validation
    if (!origin || !destination || !vehicle || !whatsappNo || !date || !time) {
      alert("Please fill in all booking details.");
      return;
    }

    // Compose booking message
    const message =
      `Booking Request:\n` +
      `From: ${origin}\n` +
      `To: ${destination}\n` +
      `Vehicle: ${vehicle}\n` +
      `Distance: ${distance}\n` +
      `Date: ${date}\n` +
      `Time: ${time}\n` +
      `WhatsApp: ${whatsappNo}`;

    // WhatsApp link (international format, remove leading 0 if present)
    let phone = whatsappNo.replace(/[^\d]/g, "");
    if (phone.startsWith("0")) phone = phone.substring(1);
    if (!phone.startsWith("94")) phone = "0715422624"; // Default to Sri Lanka country code
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp chat
    window.open(waUrl, "_blank");

    // Optionally, for SMS (uncomment if needed):
    // const smsUrl = `sms:${phone}?body=${encodeURIComponent(message)}`;
    // window.open(smsUrl);
  }

  // Initialize the calculator
  function init() {
    populateDropdowns();

    // Event listeners
    if (elements.searchBtn) elements.searchBtn.addEventListener("click", handleSearch);
    if (elements.bookBtn) elements.bookBtn.addEventListener("click", handleBooking);
  }

  init();
});

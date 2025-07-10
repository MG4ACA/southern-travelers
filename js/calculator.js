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
    autoFillBtn: document.getElementById("autoFillBtn"),
  };
  // Auto-fill form fields with sample data
  function autoFillForm() {
    if (elements.locationSelect) elements.locationSelect.value = "Colombo";
    if (elements.destinationSelect) elements.destinationSelect.value = "Kandy";
    if (elements.vehicleSelect) elements.vehicleSelect.value = "sedan";
    if (elements.bookingDate) elements.bookingDate.value = new Date().toISOString().slice(0, 10);
    if (elements.bookingTime) elements.bookingTime.value = "10:00";
    if (elements.whatsappNo) elements.whatsappNo.value = "0771234567";
    if (elements.locationInput) elements.locationInput.value = "Colombo to Kandy";
    if (elements.distanceInput) elements.distanceInput.value = "115 km";
    updatePrices(115);
  }

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

    // Send booking email using EmailJS REST API
    const serviceID = "service_ly8lb0k";
    const templateID = "template_raub3zi";
    const publicKey = "NUQDVaKOkqRf51Fx7"; // Replace with your actual EmailJS public key

    const data = {
      service_id: serviceID,
      template_id: templateID,
      user_id: publicKey,
      template_params: {
        origin: origin,
        destination: destination,
        vehicle: vehicle,
        whatsapp: whatsappNo,
        date: date,
        time: time,
        distance: distance,
      },
    };

    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert(
            "Your booking request has been submitted. Our team will contact you shortly via WhatsApp to confirm your booking."
          );
        } else {
          alert(
            "Sorry, your booking request could not be submitted at this time. Please try again shortly, or contact our customer support at  +94 71 542 2624 via WhatsApp or phone call for assistance."
          );
        }
      })
      .catch(() => {
        alert("Failed to send booking email.");
      });
  }

  // Initialize the calculator
  function init() {
    populateDropdowns();

    // Event listeners
    if (elements.searchBtn) elements.searchBtn.addEventListener("click", handleSearch);
    if (elements.bookBtn) elements.bookBtn.addEventListener("click", handleBooking);
    if (elements.autoFillBtn) elements.autoFillBtn.addEventListener("click", autoFillForm);
  }

  init();
});

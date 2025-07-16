// Package Modal and Carousel System
class PackageModal {
    constructor() {
        this.modal = document.getElementById('packageModal');
        this.modalClose = document.querySelector('.modal-close');
        this.carouselTrack = document.querySelector('.carousel-track');
        this.packageName = document.querySelector('.package-name');
        this.packageDuration = document.querySelector('.package-duration');
        this.dotsContainer = document.querySelector('.dots');
        this.leftArrow = document.querySelector('.nav-arrow.left');
        this.rightArrow = document.querySelector('.nav-arrow.right');
        
        this.currentIndex = 0;
        this.isAnimating = false;
        this.currentPackageData = null;
        
        this.initializeEventListeners();
        this.packageData = this.getPackageData();
    }
    
    getPackageData() {
        return {
            heritage: {
                name: "Ceylon Heritage Explorer",
                duration: "5 Days / 4 Nights",
                highlights: [
                    "Pinnawala Elephant Orphanage - Feed and bathe elephants",
                    "Temple of the Sacred Tooth Relic in Kandy",
                    "Royal Botanical Gardens - Rare orchids and spice garden",
                    "Nuwara Eliya - Little England of Sri Lanka", 
                    "Tea plantation tours and factory visits",
                    "Traditional cultural performances",
                    "Scenic train ride through hill country"
                ],
                images: [
                    { src: "assets/pinnavala.jpg", title: "Pinnawala Elephants", desc: "Experience close encounters with gentle giants", highlights: ["Feed baby elephants", "River bathing with elephants", "Learn about conservation efforts"] },
                    { src: "assets/kandy.jpg", title: "Temple of Tooth", desc: "Sacred Buddhist temple in Kandy", highlights: ["Visit sacred relic chamber", "Evening prayer ceremonies", "Traditional architecture tour"] },
                    { src: "assets/kandy2.jpg", title: "Royal Botanical Gardens", desc: "Stunning collection of tropical plants", highlights: ["Rare orchid collection", "Spice garden exploration", "Giant bamboo groves"] },
                    { src: "assets/kovila2.jpg", title: "Cultural Dance", desc: "Traditional Kandyan dance performances", highlights: ["Fire walking ceremonies", "Traditional drumming", "Colorful costume displays"] },
                    { src: "assets/ella.jpg", title: "Tea Country", desc: "Rolling hills of tea plantations", highlights: ["Tea plucking experience", "Factory processing tour", "High-grown tea tasting"] }
                ]
            },
            ancient: {
                name: "Ancient Kingdoms Discovery", 
                duration: "6 Days / 5 Nights",
                highlights: [
                    "Sigiriya Rock Fortress - Ancient sky palace",
                    "Dambulla Cave Temple - Golden Temple complex",
                    "Minneriya National Park - Elephant gathering safari",
                    "Polonnaruwa - Medieval capital ruins",
                    "Anuradhapura - Ancient capital city",
                    "Village safari and local cuisine experience",
                    "Kandy cultural city tour"
                ],
                images: [
                    { src: "assets/sigiriya.jpg", title: "Sigiriya Rock", desc: "Climb the ancient rock fortress", highlights: ["Ancient frescoes viewing", "Lion's Gate entrance", "Summit palace ruins"] },
                    { src: "assets/sigiriya2.jpg", title: "Lion's Gate", desc: "Magnificent ancient architecture", highlights: ["Archaeological discoveries", "Engineering marvels", "Historical significance"] },
                    { src: "assets/jayasiri_maha_bodiya.jpg", title: "Sacred Temple", desc: "Ancient Buddhist heritage", highlights: ["Buddha statue viewing", "Meditation sessions", "Religious ceremonies"] },
                    { src: "assets/kovila2.jpg", title: "Village Life", desc: "Experience authentic Sri Lankan culture", highlights: ["Traditional cooking", "Bullock cart rides", "Local crafts workshop"] },
                    { src: "assets/kandy.jpg", title: "Kandy City", desc: "Cultural heart of Sri Lanka", highlights: ["Lake walking tours", "Market exploration", "Traditional architecture"] }
                ]
            },
            southern: {
                name: "Southern Coast Adventure",
                duration: "7 Days / 6 Nights", 
                highlights: [
                    "Yala National Park - Leopard and wildlife safari",
                    "Mirissa - Whale and dolphin watching",
                    "Galle Fort - UNESCO World Heritage site",
                    "Unawatuna Beach - Golden sandy paradise",
                    "Stilt fishermen of Weligama",
                    "Turtle hatchery conservation project",
                    "Southern coast scenic drive"
                ],
                images: [
                    { src: "assets/galle.jpg", title: "Galle Fort", desc: "Historic Dutch colonial fortress", highlights: ["Colonial architecture tour", "Rampart sunset walks", "Lighthouse exploration"] },
                    { src: "assets/galle4.jpg", title: "Coastal Beauty", desc: "Pristine southern beaches", highlights: ["Golden sand beaches", "Coconut palm groves", "Beach volleyball games"] },
                    { src: "assets/colombo.jpg", title: "Marine Life", desc: "Whale watching adventures", highlights: ["Blue whale spotting", "Dolphin encounters", "Marine conservation education"] },
                    { src: "assets/pinnavala.jpg", title: "Wildlife Safari", desc: "Yala National Park experiences", highlights: ["Leopard tracking", "Elephant herds", "Bird watching tours"] },
                    { src: "assets/ella.jpg", title: "Beach Paradise", desc: "Relax on golden sand beaches", highlights: ["Surfing lessons", "Beach dining", "Sunset photography"] }
                ]
            },
            complete: {
                name: "Complete Sri Lanka Experience",
                duration: "8 Days / 7 Nights",
                highlights: [
                    "Cultural Triangle - Sigiriya, Dambulla, Polonnaruwa",
                    "Hill Country - Kandy, Nuwara Eliya, Ella",
                    "Wildlife Safari - Yala or Udawalawe National Park", 
                    "Beach relaxation - Southern or Western coast",
                    "Ancient temples and archaeological sites",
                    "Modern Colombo city tour",
                    "Complete island experience in one trip"
                ],
                images: [
                    { src: "assets/sigiriya.jpg", title: "Cultural Triangle", desc: "Ancient kingdoms and heritage", highlights: ["UNESCO World Heritage sites", "Archaeological wonders", "Ancient civilization stories"] },
                    { src: "assets/ella.jpg", title: "Hill Country", desc: "Tea plantations and mountain views", highlights: ["Scenic train journeys", "Cool mountain climate", "Tea estate experiences"] },
                    { src: "assets/galle.jpg", title: "Coastal Paradise", desc: "Beautiful beaches and marine life", highlights: ["Water sports activities", "Marine national parks", "Coastal village visits"] },
                    { src: "assets/colombo.jpg", title: "Modern City", desc: "Contemporary Colombo experiences", highlights: ["Shopping districts", "Modern dining", "Cultural museums"] },
                    { src: "assets/yapahuva.jpg", title: "Ancient Heritage", desc: "Historical sites and culture", highlights: ["Medieval capitals", "Stone carvings", "Historical significance"] }
                ]
            },
            hill: {
                name: "Hill Country Escape",
                duration: "4 Days / 3 Nights",
                highlights: [
                    "Ella Nine Arch Bridge - Iconic railway bridge",
                    "Little Adam's Peak - Scenic hiking trail",
                    "Tea plantation tours and tastings",
                    "Ravana Falls - Spectacular waterfall",
                    "Blue Field Tea Gardens experience",
                    "Scenic train ride from Kandy to Ella",
                    "Mountain village exploration"
                ],
                images: [
                    { src: "assets/ella.jpg", title: "Nine Arch Bridge", desc: "Marvel at engineering masterpiece", highlights: ["Train spotting", "Photography sessions", "Architectural appreciation"] },
                    { src: "assets/kandy2.jpg", title: "Tea Plantations", desc: "Learn tea making process", highlights: ["Hand-picking tea leaves", "Factory processing tour", "Tea tasting sessions"] },
                    { src: "assets/pinnavala.jpg", title: "Mountain Views", desc: "Breathtaking hill country scenery", highlights: ["Sunrise viewpoints", "Valley panoramas", "Nature photography"] },
                    { src: "assets/kovila2.jpg", title: "Local Culture", desc: "Hill country village life", highlights: ["Traditional village tours", "Local cooking classes", "Handicraft workshops"] },
                    { src: "assets/yapahuva.jpg", title: "Nature Trails", desc: "Hiking and nature exploration", highlights: ["Little Adam's Peak hike", "Waterfall visits", "Nature conservation"] }
                ]
            }
        };
    }
    
    initializeEventListeners() {
        // Close modal events
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModal();
            }
        });
        
        // Read more button events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('package-read-more')) {
                e.preventDefault();
                const packageType = e.target.getAttribute('data-package');
                this.openModal(packageType);
            }
        });
        
        // Package card click events (except Book Now button)
        document.addEventListener('click', (e) => {
            const packageCard = e.target.closest('.package-card');
            if (packageCard && !e.target.closest('.btn-primary')) {
                // Find the read more button to get the package type
                const readMoreBtn = packageCard.querySelector('.package-read-more');
                if (readMoreBtn) {
                    const packageType = readMoreBtn.getAttribute('data-package');
                    this.openModal(packageType);
                }
            }
        });
        
        // Package booking events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-primary') && e.target.closest('.package-card')) {
                e.preventDefault();
                const packageCard = e.target.closest('.package-card');
                const readMoreBtn = packageCard.querySelector('.package-read-more');
                if (readMoreBtn) {
                    const packageType = readMoreBtn.getAttribute('data-package');
                    this.handlePackageBooking(packageType);
                }
            }
        });
        
        // Carousel navigation
        this.leftArrow.addEventListener('click', () => this.previousSlide());
        this.rightArrow.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display === 'block') {
                if (e.key === 'ArrowLeft') this.previousSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            }
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        this.carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        }
    }
    
    openModal(packageType) {
        this.currentPackageData = this.packageData[packageType];
        if (!this.currentPackageData) return;
        
        this.populateModalContent();
        this.createCarousel();
        this.createDots();
        this.currentIndex = 0;
        this.updateCarousel(0);
        
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        setTimeout(() => {
            this.modal.style.opacity = '1';
        }, 10);
    }
    
    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.currentPackageData = null;
    }
    
    populateModalContent() {
        this.packageName.textContent = this.currentPackageData.name;
        this.packageDuration.textContent = this.currentPackageData.duration;
    }
    
    createCarousel() {
        this.carouselTrack.innerHTML = '';
        
        this.currentPackageData.images.forEach((image, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('data-index', index);
            
            // Create highlights list for this card
            const highlightsList = image.highlights.map(highlight => 
                `<li>• ${highlight}</li>`
            ).join('');
            
            card.innerHTML = `
                <img src="${image.src}" alt="${image.title}" />
                <div class="card-info">
                    <h3>${image.title}</h3>
                    <p>${image.desc}</p>
                    <ul class="card-highlights">
                        ${highlightsList}
                    </ul>
                </div>
            `;
            
            card.addEventListener('click', () => {
                if (index !== this.currentIndex) {
                    this.updateCarousel(index);
                }
            });
            
            this.carouselTrack.appendChild(card);
        });
    }
    
    createDots() {
        this.dotsContainer.innerHTML = '';
        
        this.currentPackageData.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.setAttribute('data-index', index);
            
            dot.addEventListener('click', () => {
                this.updateCarousel(index);
            });
            
            this.dotsContainer.appendChild(dot);
        });
    }
    
    updateCarousel(newIndex) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        const cards = this.carouselTrack.querySelectorAll('.card');
        const dots = this.dotsContainer.querySelectorAll('.dot');
        
        this.currentIndex = (newIndex + cards.length) % cards.length;
        
        cards.forEach((card, i) => {
            const offset = (i - this.currentIndex + cards.length) % cards.length;
            
            card.classList.remove('center', 'left-1', 'left-2', 'right-1', 'right-2', 'hidden');
            
            if (offset === 0) {
                card.classList.add('center');
            } else if (offset === 1) {
                card.classList.add('right-1');
            } else if (offset === 2) {
                card.classList.add('right-2');
            } else if (offset === cards.length - 1) {
                card.classList.add('left-1');
            } else if (offset === cards.length - 2) {
                card.classList.add('left-2');
            } else {
                card.classList.add('hidden');
            }
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);
    }
    
    nextSlide() {
        this.updateCarousel(this.currentIndex + 1);
    }
    
    previousSlide() {
        this.updateCarousel(this.currentIndex - 1);
    }
    
    async handlePackageBooking(packageType) {
        const packageData = this.packageData[packageType];
        if (!packageData) return;
        
        // Show booking form using SweetAlert2
        const { value: formData } = await Swal.fire({
            title: `Book ${packageData.name}`,
            html: `
                <div style="text-align: left; margin: 20px 0;">
                    <p style="margin-bottom: 15px; font-weight: 600; color: #333;">
                        Package: ${packageData.name} (${packageData.duration})
                    </p>
                    <div style="margin-bottom: 15px;">
                        <label for="customerName" style="display: block; margin-bottom: 5px; font-weight: 500;">Full Name *</label>
                        <input id="customerName" class="swal2-input" placeholder="Enter your full name" style="margin: 0; width: 100%;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="customerEmail" style="display: block; margin-bottom: 5px; font-weight: 500;">Email *</label>
                        <input id="customerEmail" type="email" class="swal2-input" placeholder="Enter your email" style="margin: 0; width: 100%;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="customerPhone" style="display: block; margin-bottom: 5px; font-weight: 500;">WhatsApp Number *</label>
                        <input id="customerPhone" class="swal2-input" placeholder="Enter your WhatsApp number" style="margin: 0; width: 100%;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="travelDate" style="display: block; margin-bottom: 5px; font-weight: 500;">Preferred Travel Date *</label>
                        <input id="travelDate" type="date" class="swal2-input" style="margin: 0; width: 100%;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="groupSize" style="display: block; margin-bottom: 5px; font-weight: 500;">Number of Travelers *</label>
                        <input id="groupSize" type="number" class="swal2-input" placeholder="Number of people" min="1" style="margin: 0; width: 100%;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="specialRequests" style="display: block; margin-bottom: 5px; font-weight: 500;">Special Requests (Optional)</label>
                        <textarea id="specialRequests" class="swal2-textarea" placeholder="Any special requirements or requests..." style="margin: 0; width: 100%; resize: vertical;"></textarea>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Send Booking Request',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#ff9800',
            cancelButtonColor: '#6c757d',
            width: '600px',
            preConfirm: () => {
                const name = document.getElementById('customerName').value.trim();
                const email = document.getElementById('customerEmail').value.trim();
                const phone = document.getElementById('customerPhone').value.trim();
                const date = document.getElementById('travelDate').value;
                const groupSize = document.getElementById('groupSize').value;
                const requests = document.getElementById('specialRequests').value.trim();
                
                // Validation
                if (!name || !email || !phone || !date || !groupSize) {
                    Swal.showValidationMessage('Please fill in all required fields');
                    return false;
                }
                
                if (!/\S+@\S+\.\S+/.test(email)) {
                    Swal.showValidationMessage('Please enter a valid email address');
                    return false;
                }
                
                if (groupSize < 1) {
                    Swal.showValidationMessage('Number of travelers must be at least 1');
                    return false;
                }
                
                return {
                    name,
                    email,
                    phone,
                    date,
                    groupSize: parseInt(groupSize),
                    requests,
                    packageName: packageData.name,
                    packageDuration: packageData.duration
                };
            }
        });
        
        if (formData) {
            this.sendPackageBookingEmail(formData);
        }
    }
    
    async sendPackageBookingEmail(bookingData) {
        // EmailJS configuration
        const serviceID = "service_kfmzim9";
        const templateID = "template_odtncvw"; // You might want to create a specific template for packages
        const publicKey = "vVAjk6x-1Ia3Dnwsb";
        
        const emailData = {
            service_id: serviceID,
            template_id: templateID,
            user_id: publicKey,
            template_params: {
                customer_name: bookingData.name,
                customer_email: bookingData.email,
                whatsapp: bookingData.phone,
                travel_date: bookingData.date,
                group_size: bookingData.groupSize,
                package_name: bookingData.packageName,
                package_duration: bookingData.packageDuration,
                special_requests: bookingData.requests || 'None',
                booking_type: 'Package Booking'
            }
        };
        
        // Show loading
        Swal.fire({
            title: 'Sending booking request...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        
        try {
            const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(emailData),
            });
            
            Swal.close();
            
            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Booking Request Sent!",
                    html: `
                        <p>Thank you for choosing <strong>${bookingData.packageName}</strong>!</p>
                        <p>Your booking request has been submitted successfully.</p>
                        <p>Our team will contact you within 24 hours via WhatsApp (<strong>${bookingData.phone}</strong>) to confirm your booking and provide further details.</p>
                        <br>
                        <p style="font-size: 0.9em; color: #666;">
                            <strong>Booking Reference:</strong> PKG-${Date.now().toString().slice(-6)}
                        </p>
                    `,
                    confirmButtonColor: "#ff9800",
                    confirmButtonText: "Great!"
                });
            } else {
                throw new Error('Failed to send email');
            }
        } catch (error) {
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "Booking Failed",
                text: "Sorry, we couldn't process your booking request at this time. Please try again or contact us directly at +94 71 542 2624.",
                confirmButtonColor: "#ff9800",
            });
        }
    }
}

// Initialize the modal system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PackageModal();
});

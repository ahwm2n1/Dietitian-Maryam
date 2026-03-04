// ================= COMPLETE UPDATED appointment.js =================
// Yeh form data ko localStorage mein save karega aur admin panel mein dikhayega

class AppointmentManager {
    constructor() {
        this.data = {
            profile: {},
            services: [],
            appointments: []
        };
        this.init();
    }

    init() {
        this.loadData();
        this.setupForm();
        this.setupEventListeners();
        this.updateContactInfo();
        this.loadExistingAppointments(); // Load existing appointments for testing
    }

    loadData() {
        console.log('Loading data from admin panel...');
        
        try {
            // Load profile from admin panel
            const storedProfile = localStorage.getItem('admin_profile');
            if (storedProfile) {
                this.data.profile = JSON.parse(storedProfile);
                console.log('Profile loaded:', this.data.profile);
            }
            
            // Load services from admin panel
            const storedServices = localStorage.getItem('admin_services');
            if (storedServices) {
                this.data.services = JSON.parse(storedServices);
                console.log('Services loaded:', this.data.services.length);
            }
            
            // Load existing appointments
            const storedAppointments = localStorage.getItem('admin_appointments');
            if (storedAppointments) {
                this.data.appointments = JSON.parse(storedAppointments);
                console.log('Existing appointments loaded:', this.data.appointments.length);
            }
            
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    loadExistingAppointments() {
        // Yeh sirf testing ke liye hai - console mein appointments dikhata hai
        if (this.data.appointments.length > 0) {
            console.log('=== EXISTING APPOINTMENTS ===');
            this.data.appointments.forEach((app, index) => {
                console.log(`${index + 1}. ${app.name} - ${app.date} - ${app.status}`);
            });
        }
    }

    setupForm() {
        const form = document.getElementById('appointmentForm');
        if (!form) {
            console.error('Appointment form not found!');
            return;
        }

        console.log('Form found, setting up...');

        // Populate service dropdown
        this.populateServiceDropdown(form);

        // Set minimum date for date input
        this.setMinDate(form);

        // Form submission handler
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(e);
        });
    }

    populateServiceDropdown(form) {
        const serviceSelect = form.querySelector('#service, select[name="service"], select[name="goal"]');
        if (!serviceSelect) {
            console.log('Service select not found');
            return;
        }

        // Clear existing options
        serviceSelect.innerHTML = '<option value="">Select a service</option>';

        // Add services from admin panel
        if (this.data.services && this.data.services.length > 0) {
            this.data.services.forEach(service => {
                const option = document.createElement('option');
                option.value = service.id || service.title.toLowerCase().replace(/\s+/g, '-');
                option.textContent = `${service.title} - PKR ${service.price || 'Contact for price'}`;
                serviceSelect.appendChild(option);
            });
            console.log('Services populated:', this.data.services.length);
        } else {
            // Default services if admin panel has none
            const defaultServices = [
                { title: 'Weight Loss Program', price: '5,000' },
                { title: 'PCOS Management', price: '8,000' },
                { title: 'Diabetes Control', price: '7,000' },
                { title: 'General Consultation', price: '3,000' }
            ];
            
            defaultServices.forEach(service => {
                const option = document.createElement('option');
                option.value = service.title.toLowerCase().replace(/\s+/g, '-');
                option.textContent = `${service.title} - PKR ${service.price}`;
                serviceSelect.appendChild(option);
            });
        }
    }

    setMinDate(form) {
        const dateInput = form.querySelector('input[type="date"]');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
            dateInput.value = today; // Set default to today
        }
    }

    handleFormSubmit(e) {
        const form = e.target;
        
        // Get form data
        const formData = {
            id: 'app_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            name: form.name?.value?.trim() || '',
            email: form.email?.value?.trim() || '',
            phone: form.phone?.value?.trim() || '',
            service: form.service?.value || form.goal?.value || '',
            serviceText: this.getServiceText(form.service?.value || form.goal?.value || ''),
            date: form.date?.value || '',
            time: form.time?.value || '',
            message: form.message?.value?.trim() || '',
            status: 'pending',
            submittedAt: new Date().toISOString(),
            source: window.location.href
        };

        console.log('Form data collected:', formData);

        // Validate form
        const validationError = this.validateForm(formData);
        if (validationError) {
            alert(validationError);
            return;
        }

        // Save to localStorage
        const saved = this.saveAppointment(formData);
        
        if (saved) {
            // Show success message
            this.showSuccessMessage(formData);
            
            // Reset form
            form.reset();
            
            // Set date to today again
            this.setMinDate(form);
            
            // Log for debugging
            console.log('Appointment saved successfully! Total appointments:', 
                       JSON.parse(localStorage.getItem('admin_appointments') || '[]').length);
        } else {
            alert('There was an error saving your appointment. Please try again.');
        }
    }

    getServiceText(serviceValue) {
        if (!serviceValue) return 'Not specified';
        
        const serviceSelect = document.querySelector('#service, select[name="service"], select[name="goal"]');
        if (serviceSelect) {
            const selectedOption = Array.from(serviceSelect.options).find(opt => opt.value === serviceValue);
            return selectedOption ? selectedOption.textContent : serviceValue;
        }
        return serviceValue;
    }

    validateForm(data) {
        if (!data.name) return "Please enter your name";
        if (!data.email) return "Please enter your email";
        if (!data.phone) return "Please enter your phone number";
        if (!data.service) return "Please select a service";
        if (!data.date) return "Please select a date";
        if (!data.time) return "Please select a time";

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return "Please enter a valid email address";
        }

        // Pakistani phone number validation
        const phoneRegex = /^(\+92|0|92)[0-9]{10}$/;
        const cleanPhone = data.phone.replace(/\s/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            return "Please enter a valid Pakistani phone number (e.g., 03XXXXXXXXX or +92XXXXXXXXXX)";
        }

        // Date validation
        const selectedDate = new Date(data.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            return "Please select a future date";
        }

        return null; // No error
    }

    saveAppointment(appointmentData) {
        try {
            // Get existing appointments
            let appointments = [];
            const stored = localStorage.getItem('admin_appointments');
            
            if (stored) {
                appointments = JSON.parse(stored);
                console.log('Existing appointments found:', appointments.length);
            } else {
                console.log('No existing appointments, creating new array');
            }
            
            // Add new appointment
            appointments.push(appointmentData);
            
            // Save back to localStorage
            localStorage.setItem('admin_appointments', JSON.stringify(appointments));
            
            // Verify save was successful
            const verify = localStorage.getItem('admin_appointments');
            if (verify) {
                const savedData = JSON.parse(verify);
                console.log('Verified: Total appointments now:', savedData.length);
                
                // Trigger storage event for admin panel (if open)
                window.dispatchEvent(new Event('storage'));
                
                return true;
            }
            
            return false;
            
        } catch (error) {
            console.error('Error saving appointment:', error);
            return false;
        }
    }

    showSuccessMessage(data) {
        // Remove any existing success messages
        const existingMessages = document.querySelectorAll('.success-message');
        existingMessages.forEach(msg => msg.remove());

        // Create success message
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #1e6b4c 0%, #0f4f36 100%);
            color: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease;
            max-width: 350px;
            font-family: 'Poppins', sans-serif;
        `;
        
        messageDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <i class="fas fa-check-circle" style="font-size: 2.5rem; color: #fff;"></i>
                <div>
                    <h3 style="margin: 0; font-size: 1.3rem;">Thank You, ${data.name}!</h3>
                    <p style="margin: 5px 0 0; opacity: 0.9;">Appointment Confirmed</p>
                </div>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                <p style="margin: 5px 0;"><i class="fas fa-calendar" style="margin-right: 10px;"></i> ${data.date}</p>
                <p style="margin: 5px 0;"><i class="fas fa-clock" style="margin-right: 10px;"></i> ${data.time}</p>
                <p style="margin: 5px 0;"><i class="fas fa-tag" style="margin-right: 10px;"></i> ${data.serviceText}</p>
            </div>
            <p style="font-size: 0.9rem; opacity: 0.9; margin: 0;">
                <i class="fas fa-info-circle"></i> We'll contact you within 24 hours
            </p>
            <button onclick="this.parentElement.remove()" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: white; cursor: pointer; font-size: 1.2rem;">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(messageDiv);
        
        // Auto remove after 7 seconds
        setTimeout(() => {
            if (messageDiv.parentElement) {
                messageDiv.remove();
            }
        }, 7000);
    }

    setupEventListeners() {
        // Smooth scroll for navigation
        document.querySelectorAll('header nav a, .footer-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                const target = link.getAttribute('href');
                if (target && target.startsWith("#")) {
                    e.preventDefault();
                    const element = document.querySelector(target);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                }
            });
        });

        // WhatsApp button bounce
        const whatsappBtn = document.querySelector('.whatsapp-btn');
        if (whatsappBtn) {
            setInterval(() => {
                whatsappBtn.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    whatsappBtn.style.transform = 'scale(1)';
                }, 300);
            }, 3000);
        }

        // Why cards hover
        const whyCards = document.querySelectorAll('.why-card');
        whyCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = "translateY(-10px)";
                card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = "translateY(0)";
                card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
            });
        });

        // Phone number formatting
        const phoneInput = document.querySelector('input[name="phone"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);
                e.target.value = value;
            });
        }
    }

    updateContactInfo() {
        // Update WhatsApp number
        if (this.data.profile.whatsapp) {
            const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
            whatsappLinks.forEach(link => {
                const baseUrl = link.href.split('?')[0];
                link.href = `${baseUrl}?text=${encodeURIComponent('Hi Dietitian Maryam, I want to book an appointment')}`;
            });
        }

        // Update phone number
        if (this.data.profile.phone) {
            const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
            phoneLinks.forEach(link => {
                link.href = `tel:${this.data.profile.phone.replace(/\s/g, '')}`;
            });
        }
    }

    // Public method to check saved appointments
    static checkSavedAppointments() {
        const appointments = localStorage.getItem('admin_appointments');
        if (appointments) {
            const data = JSON.parse(appointments);
            console.log('=== ALL SAVED APPOINTMENTS ===');
            console.log('Total:', data.length);
            data.forEach((app, i) => {
                console.log(`${i + 1}. ${app.name} - ${app.date} - ${app.status}`);
            });
            return data;
        } else {
            console.log('No appointments found');
            return [];
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Appointment page loaded, initializing...');
    window.appointmentManager = new AppointmentManager();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .success-message {
        font-family: 'Poppins', sans-serif;
    }
    
    .success-message i {
        filter: drop-shadow(0 2px 5px rgba(0,0,0,0.2));
    }
`;
document.head.appendChild(style);

// Global function to check appointments (for console debugging)
window.checkAppointments = function() {
    return AppointmentManager.checkSavedAppointments();
};

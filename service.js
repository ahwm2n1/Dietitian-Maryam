// ================= Smooth Scroll =================
document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const target = this.getAttribute('href');
        if(target.startsWith("#")) {
            e.preventDefault();
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ================= Contact Form Validation =================
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e){
    e.preventDefault();

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const phone = this.phone.value.trim();
    const message = this.message.value.trim();

    if(name === "" || email === "" || phone === "" || message === "") {
        alert("Please fill all the fields!");
        return;
    }

    alert("Thank you! Your message has been submitted.");
    this.reset();
});

// ================= Service Card Hover Animation =================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = "translateY(-10px)";
        card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
    });
});

// ================= WHATSAPP BUTTON BOUNCE =================
const whatsappBtn = document.querySelector('.whatsapp-btn');

setInterval(() => {
    whatsappBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        whatsappBtn.style.transform = 'scale(1)';
    }, 300);
}, 3000);

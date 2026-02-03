    // ================= Smooth Scroll =================
document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', function(e){
        const target = this.getAttribute('href');
        if(target.startsWith("#")){
            e.preventDefault();
            document.querySelector(target).scrollIntoView({behavior: "smooth"});
        }
    });
});

// ================= Appointment Form Validation =================
const appointmentForm = document.getElementById('appointmentForm');
appointmentForm.addEventListener('submit', function(e){
    e.preventDefault();

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const phone = this.phone.value.trim();
    const goal = this.goal.value;
    const date = this.date.value;
    const time = this.time.value;

    if(!name || !email || !phone || !goal || !date || !time){
        alert("Please fill all required fields!");
        return;
    }

    alert("Thank you! Your appointment request has been submitted.");
    this.reset();
});

// ================= Why Cards Hover Animation =================
const whyCards = document.querySelectorAll('.why-card');
whyCards.forEach(card => {
    card.addEventListener('mouseenter', ()=>{
        card.style.transform = "translateY(-10px)";
        card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
    });
    card.addEventListener('mouseleave', ()=>{
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

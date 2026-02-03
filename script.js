// ================= Smooth Scroll for Header Links =================
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


// ================= HERO TYPING EFFECT =================
const words = ["Maryam Shahrukh", "Nutritionist", "Wellness Expert"];
let i = 0;
let j = 0;
let currentWord = '';
let isDeleting = false;
const speed = 150; // typing speed
const eraseSpeed = 75; // deleting speed
const delayBetweenWords = 2000; // delay after full word

const animatedText = document.getElementById('animated-text');

function type() {
    if(!isDeleting){
        currentWord = words[i].substring(0, j+1);
        animatedText.textContent = currentWord;
        j++;
        if(j === words[i].length){
            isDeleting = true;
            setTimeout(type, delayBetweenWords);
            return;
        }
    } else {
        currentWord = words[i].substring(0, j-1);
        animatedText.textContent = currentWord;
        j--;
        if(j === 0){
            isDeleting = false;
            i = (i+1) % words.length; // move to next word in loop
        }
    }
    setTimeout(type, isDeleting ? eraseSpeed : speed);
}

type();


// ================= Hero Buttons =================
const heroButtons = document.querySelectorAll('.hero-buttons a');
heroButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if(href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        } else {
            // If link is a page, open normally
            window.location.href = href;
        }
    });
});

// ================= Blog Cards Hover Animation =================
const blogCards = document.querySelectorAll('.blog-card');

blogCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = "translateY(-10px)";
        card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
    });
});

// ================= Future Ready: Dynamic Blog Loader =================
// Example: If you want to load blogs dynamically via JS
/*
const blogsContainer = document.querySelector('.blogs-container');
const blogsData = [
    {img: 'images/blog6.jpg', title: 'New Blog', desc: 'Short description...', link: '#'},
];

blogsData.forEach(blog => {
    const blogEl = document.createElement('article');
    blogEl.classList.add('blog-card');
    blogEl.innerHTML = `
        <img src="${blog.img}" alt="${blog.title}">
        <h3>${blog.title}</h3>
        <p>${blog.desc}</p>
        <a href="${blog.link}">Read More</a>
    `;
    blogsContainer.appendChild(blogEl);
});
*/


// ================= WHATSAPP BUTTON BOUNCE =================
const whatsappBtn = document.querySelector('.whatsapp-btn');

setInterval(() => {
    whatsappBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        whatsappBtn.style.transform = 'scale(1)';
    }, 300);
}, 3000);



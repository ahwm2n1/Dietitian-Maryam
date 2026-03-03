// ================= COMPLETE UPDATED script.js =================
// Yeh file aapki website ke liye hai - admin panel se data read karega

class DietitianWebsite {
    constructor() {
        this.data = {
            blog: [],
            certificates: [],
            profile: {
                name: 'Dietitian Maryam',
                title: 'Certified Clinical Nutritionist',
                bio: 'Helping you take control of your health through personalized diet plans designed for weight loss, weight gain, PCOS, diabetes, and overall wellness.',
                image: 'images/dietitian-maryam.png'
            },
            contact: {
                phone: '+92 320 9758905',
                email: 'dnmaryamshahrukh@gmail.com',
                whatsapp: '923209758905'
            }
        };
        this.init();
    }

    init() {
        console.log('Website initializing...');
        this.loadDataFromAdmin();
        this.renderWebsite();
        this.setupEventListeners();
        this.initTypingEffect();
        this.initWhatsAppButton();
    }

    loadDataFromAdmin() {
        console.log('Loading data from admin panel...');
        
        try {
            // Admin panel se data load karein
            const storedBlog = localStorage.getItem('admin_blog');
            const storedProfile = localStorage.getItem('admin_profile');
            const storedServices = localStorage.getItem('admin_services');
            const storedCerts = localStorage.getItem('admin_certificates');
            
            // Blog data load karein
            if (storedBlog) {
                this.data.blog = JSON.parse(storedBlog);
                console.log('Blog data loaded:', this.data.blog.length, 'posts');
            } else {
                console.log('No blog data found, using defaults');
                this.data.blog = this.getDefaultBlog();
            }
            
            // Profile data load karein
            if (storedProfile) {
                const profileData = JSON.parse(storedProfile);
                this.data.profile = {
                    ...this.data.profile,
                    ...profileData
                };
                console.log('Profile data loaded');
            }
            
            // Services data load karein (future use)
            if (storedServices) {
                this.data.services = JSON.parse(storedServices);
            }
            
            // Certificates data load karein
            if (storedCerts) {
                this.data.certificates = JSON.parse(storedCerts);
            }
            
        } catch (error) {
            console.error('Error loading data from admin:', error);
            this.data.blog = this.getDefaultBlog();
        }
    }

    getDefaultBlog() {
        return [
            {
                id: '1',
                title: 'Healthy Eating for Busy People',
                image: 'images/blog1.jpg',
                excerpt: 'Learn how to maintain a balanced diet even with a busy lifestyle.',
                content: 'Complete guide to healthy eating...',
                category: 'Nutrition'
            },
            {
                id: '2',
                title: 'PCOS Diet: What to Eat & Avoid',
                image: 'images/blog2.jpg',
                excerpt: 'A complete guide to managing PCOS through nutrition.',
                content: 'Detailed PCOS diet plan...',
                category: 'PCOS'
            },
            {
                id: '3',
                title: 'Healthy Weight Loss Tips',
                image: 'images/blog3.jpg',
                excerpt: 'Sustainable ways to lose weight without harming your health.',
                content: 'Weight loss strategies...',
                category: 'Weight Loss'
            },
            {
                id: '4',
                title: 'Diet for Diabetes Control',
                image: 'images/blog4.jpg',
                excerpt: 'Foods and habits that help manage blood sugar levels.',
                content: 'Diabetes management guide...',
                category: 'Diabetes'
            },
            {
                id: '5',
                title: 'Building a Healthy Lifestyle',
                image: 'images/blog5.jpg',
                excerpt: 'Simple daily habits that improve overall well-being.',
                content: 'Lifestyle tips...',
                category: 'Wellness'
            }
        ];
    }

    renderWebsite() {
        this.renderBlogSection();
        this.renderEducationSection();
        this.updateProfileSection();
        this.updateContactInfo();
    }

    renderBlogSection() {
        const blogsContainer = document.querySelector('.blogs-container');
        if (!blogsContainer) {
            console.log('Blogs container not found');
            return;
        }

        console.log('Rendering blog posts...');
        
        // Clear existing blog posts
        blogsContainer.innerHTML = '';

        // Agar koi blog nahi hai to message show karein
        if (this.data.blog.length === 0) {
            blogsContainer.innerHTML = '<p class="no-blogs">No blog posts available yet.</p>';
            return;
        }

        // Admin panel se blogs render karein
        this.data.blog.forEach(blog => {
            const blogCard = this.createBlogCard(blog);
            blogsContainer.appendChild(blogCard);
        });

        // Blog card animations add karein
        this.initBlogCards();
    }

    createBlogCard(blog) {
        const article = document.createElement('article');
        article.className = 'blog-card';
        article.setAttribute('data-id', blog.id);
        
        // Image URL handle karein
        const imageUrl = blog.image || 'images/blog-placeholder.jpg';
        
        article.innerHTML = `
            <img src="${imageUrl}" alt="${blog.title || 'Blog post'}" 
                 onerror="this.src='images/blog-placeholder.jpg'">
            <h3>${blog.title || 'Untitled Post'}</h3>
            <p>${blog.excerpt || (blog.content ? blog.content.substring(0, 100) + '...' : 'No description available.')}</p>
            <a href="#" class="read-more" data-id="${blog.id}">Read More</a>
        `;
        
        return article;
    }

    renderEducationSection() {
        const educationContainer = document.querySelector('.education-cards');
        if (!educationContainer) return;

        // Agar certificates hain to unhein bhi show karein
        if (this.data.certificates && this.data.certificates.length > 0) {
            // Extra certificates add karein
            this.data.certificates.forEach(cert => {
                // Check if certificate already exists
                const exists = Array.from(educationContainer.children).some(
                    card => card.querySelector('h3')?.textContent === cert.title
                );
                
                if (!exists) {
                    const certCard = document.createElement('div');
                    certCard.className = 'education-card';
                    certCard.innerHTML = `
                        <h3>${cert.title}</h3>
                        <p>${cert.issuer || 'Professional Certification'}</p>
                    `;
                    educationContainer.appendChild(certCard);
                }
            });
        }
    }

    updateProfileSection() {
        // Profile image update karein
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage && this.data.profile.image) {
            heroImage.src = this.data.profile.image;
            heroImage.alt = this.data.profile.name;
        }

        // Profile name update karein (animated text mein)
        // Animated text alag se handle ho raha hai

        // Profile bio update karein
        const heroParagraph = document.querySelector('.hero-content p');
        if (heroParagraph && this.data.profile.bio) {
            heroParagraph.textContent = this.data.profile.bio;
        }
    }

    updateContactInfo() {
        // Contact info update karein
        const contactSection = document.querySelector('.contact-preview');
        if (!contactSection) return;

        const phonePara = contactSection.querySelector('p:first-child');
        const emailPara = contactSection.querySelector('p:nth-child(2)');
        
        if (phonePara && this.data.contact.phone) {
            phonePara.innerHTML = `📞 Phone / WhatsApp: ${this.data.contact.phone}`;
        }
        
        if (emailPara && this.data.contact.email) {
            emailPara.innerHTML = `📧 Email: ${this.data.contact.email}`;
        }

        // WhatsApp button update karein
        const whatsappBtn = document.querySelector('.whatsapp-btn');
        if (whatsappBtn && this.data.contact.whatsapp) {
            whatsappBtn.href = `https://wa.me/${this.data.contact.whatsapp}`;
        }
    }

    initBlogCards() {
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach(card => {
            // Hover effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = "translateY(-10px)";
                card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = "translateY(0)";
                card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
            });

            // Read more click handler
            const readMoreBtn = card.querySelector('.read-more');
            if (readMoreBtn) {
                readMoreBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const blogId = readMoreBtn.dataset.id;
                    this.openBlogPost(blogId);
                });
            }
        });
    }

    openBlogPost(blogId) {
        const blog = this.data.blog.find(b => b.id === blogId);
        if (blog) {
            // Blog post modal ya new page open karein
            alert(`Blog: ${blog.title}\n\n${blog.content || 'Full content will be displayed here...'}`);
        }
    }

    setupEventListeners() {
        // Smooth scroll for navigation
        document.querySelectorAll('header nav a, .hero-buttons a').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Agar anchor link hai to smooth scroll
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                // Agar page link hai to normal navigation
            });
        });

        // WhatsApp button ko clickable banayein
        const whatsappBtn = document.querySelector('.whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', (e) => {
                // Already has href, so normal behavior
            });
        }
    }

    initTypingEffect() {
        const words = ["Maryam Shahrukh", "Nutritionist", "Wellness Expert", "Clinical Nutritionist"];
        let i = 0;
        let j = 0;
        let currentWord = '';
        let isDeleting = false;
        const speed = 150;
        const eraseSpeed = 75;
        const delayBetweenWords = 2000;

        const animatedText = document.getElementById('animated-text');
        if (!animatedText) return;

        const type = () => {
            if (!isDeleting) {
                currentWord = words[i].substring(0, j + 1);
                animatedText.textContent = currentWord;
                j++;
                
                if (j === words[i].length) {
                    isDeleting = true;
                    setTimeout(type, delayBetweenWords);
                    return;
                }
            } else {
                currentWord = words[i].substring(0, j - 1);
                animatedText.textContent = currentWord;
                j--;
                
                if (j === 0) {
                    isDeleting = false;
                    i = (i + 1) % words.length;
                }
            }
            setTimeout(type, isDeleting ? eraseSpeed : speed);
        };

        type();
    }

    initWhatsAppButton() {
        const whatsappBtn = document.querySelector('.whatsapp-btn');
        if (!whatsappBtn) return;

        // Add WhatsApp icon if not present
        if (!whatsappBtn.querySelector('i')) {
            whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        }

        // Bounce animation
        setInterval(() => {
            whatsappBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                whatsappBtn.style.transform = 'scale(1)';
            }, 300);
        }, 5000);
    }

    // Public method to refresh data
    refreshData() {
        console.log('Refreshing website data...');
        this.loadDataFromAdmin();
        this.renderWebsite();
    }
}

// ================= INITIALIZE WEBSITE =================
document.addEventListener('DOMContentLoaded', () => {
    // Create website instance
    window.dietitianWebsite = new DietitianWebsite();
    
    // Add refresh button for testing (optional)
    addRefreshButton();
});

// ================= HELPER FUNCTION TO CHECK DATA =================
function checkAdminData() {
    const data = {
        blog: localStorage.getItem('admin_blog'),
        profile: localStorage.getItem('admin_profile'),
        certificates: localStorage.getItem('admin_certificates')
    };
    
    console.log('Admin Data in localStorage:', data);
    
    if (data.blog) {
        const blogCount = JSON.parse(data.blog).length;
        alert(`Admin data found: ${blogCount} blog posts`);
    } else {
        alert('No admin data found. Please add data in admin panel first.');
    }
}

// ================= OPTIONAL: REFRESH BUTTON =================
function addRefreshButton() {
    // Yeh button sirf development ke liye hai, production mein hata sakte hain
    const refreshBtn = document.createElement('button');
    refreshBtn.innerHTML = '🔄 Refresh Data';
    refreshBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: #1e6b4c;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 50px;
        cursor: pointer;
        z-index: 999;
        font-size: 14px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        display: none; /* Default hidden */
    `;
    
    refreshBtn.onclick = () => {
        if (window.dietitianWebsite) {
            window.dietitianWebsite.refreshData();
            alert('Website data refreshed!');
        }
    };
    
    document.body.appendChild(refreshBtn);
    
    // Debug mode ke liye (URL mein ?debug add karein)
    if (window.location.search.includes('debug')) {
        refreshBtn.style.display = 'block';
    }
}

// ================= DEBUG FUNCTION =================
window.debugWebsite = function() {
    console.log('=== WEBSITE DEBUG INFO ===');
    console.log('Website instance:', window.dietitianWebsite);
    console.log('Blog data:', window.dietitianWebsite?.data.blog);
    console.log('LocalStorage admin_blog:', localStorage.getItem('admin_blog'));
    console.log('LocalStorage admin_profile:', localStorage.getItem('admin_profile'));
    console.log('==========================');
};



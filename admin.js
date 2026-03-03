// ================= ADMIN PANEL JAVASCRIPT =================
// Complete functionality for Dietitian Maryam Admin Panel

class AdminPanel {
    constructor() {
        this.currentUser = null;
        this.currentTab = 'dashboard';
        this.data = {
            blog: [],
            certificates: [],
            services: [],
            profile: {},
            appointments: []
        };
        this.init();
    }

    // ================= INITIALIZATION =================
    init() {
        this.loadData();
        this.checkAuth();
        this.setupEventListeners();
        this.loadTemplates();
    }

    // ================= DATA MANAGEMENT =================
    loadData() {
        // Load from localStorage or initialize with default data
        this.data.blog = JSON.parse(localStorage.getItem('admin_blog')) || this.getDefaultBlog();
        this.data.certificates = JSON.parse(localStorage.getItem('admin_certificates')) || this.getDefaultCertificates();
        this.data.services = JSON.parse(localStorage.getItem('admin_services')) || this.getDefaultServices();
        this.data.profile = JSON.parse(localStorage.getItem('admin_profile')) || this.getDefaultProfile();
        this.data.appointments = JSON.parse(localStorage.getItem('admin_appointments')) || this.getDefaultAppointments();
        
        this.saveAllData();
    }

    getDefaultBlog() {
        return [
            {
                id: '1',
                title: '5 Ways to Manage PCOS with Desi Food',
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
                content: 'PCOS can be managed effectively with the right diet. Here are 5 Pakistani food based strategies...',
                excerpt: 'Manage PCOS with local desi foods and lifestyle changes',
                category: 'pcos',
                date: '2024-03-15'
            },
            {
                id: '2',
                title: 'Diabetes: Khane Mein Kya Rakhein?',
                image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
                content: 'A complete guide to diabetic-friendly Pakistani meals that won\'t spike your sugar...',
                excerpt: 'Complete guide to diabetic-friendly Pakistani meals',
                category: 'diabetes',
                date: '2024-03-10'
            }
        ];
    }

    getDefaultCertificates() {
        return [
            {
                id: 'c1',
                title: 'MPhil Human Nutrition',
                image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
                issuer: 'University of Punjab',
                date: '2023-01-15',
                expiry: null
            },
            {
                id: 'c2',
                title: 'Clinical Dietetics',
                image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
                issuer: 'King Edward Medical University',
                date: '2022-06-20',
                expiry: null
            },
            {
                id: 'c3',
                title: 'PCOS Specialist Certification',
                image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
                issuer: 'International Nutrition Institute',
                date: '2023-09-10',
                expiry: '2025-09-10'
            }
        ];
    }

    getDefaultServices() {
        return [
            {
                id: 's1',
                icon: 'fa-utensils',
                title: 'Personalized Meal Plans',
                description: 'Custom meal plans based on Pakistani foods, your preferences, and health goals',
                price: '5,000',
                duration: '1 month'
            },
            {
                id: 's2',
                icon: 'fa-female',
                title: 'PCOS Management',
                description: 'Specialized diet plans to manage PCOS symptoms and improve hormonal health',
                price: '8,000',
                duration: '1 month'
            },
            {
                id: 's3',
                icon: 'fa-heartbeat',
                title: 'Diabetes Control',
                description: 'Evidence-based nutrition plans for diabetes management and prevention',
                price: '7,000',
                duration: '1 month'
            }
        ];
    }

    getDefaultProfile() {
        return {
            name: 'Dietitian Maryam',
            title: 'Certified Clinical Nutritionist',
            bio: 'Certified Clinical Nutritionist helping women in Pakistan lose weight without starving, manage PCOS & diabetes through personalized diet plans.',
            email: 'dnmaryamshahrukh@gmail.com',
            phone: '+92 320 9758905',
            whatsapp: '923209758905',
            image: 'https://ui-avatars.com/api/?name=Maryam&background=1e6b4c&color=fff&size=400'
        };
    }

    getDefaultAppointments() {
        return [
            {
                id: 'a1',
                name: 'Sana Khan',
                email: 'sana@example.com',
                phone: '0321-1234567',
                date: '2024-04-15',
                time: '10:00 AM',
                service: 'PCOS Consultation',
                status: 'pending',
                message: 'Need help with irregular periods'
            },
            {
                id: 'a2',
                name: 'Fatima Ali',
                email: 'fatima@example.com',
                phone: '0333-9876543',
                date: '2024-04-16',
                time: '2:00 PM',
                service: 'Weight Loss Program',
                status: 'confirmed',
                message: 'Want to lose 10kg in 2 months'
            }
        ];
    }

    saveAllData() {
        localStorage.setItem('admin_blog', JSON.stringify(this.data.blog));
        localStorage.setItem('admin_certificates', JSON.stringify(this.data.certificates));
        localStorage.setItem('admin_services', JSON.stringify(this.data.services));
        localStorage.setItem('admin_profile', JSON.stringify(this.data.profile));
        localStorage.setItem('admin_appointments', JSON.stringify(this.data.appointments));
    }

    // ================= AUTHENTICATION =================
    checkAuth() {
        const loggedIn = sessionStorage.getItem('admin_logged_in');
        if (loggedIn === 'true') {
            this.currentUser = 'admin';
            this.hideLoginModal();
        } else {
            this.showLoginModal();
        }
    }

    showLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    hideLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.remove('active');
        }
        this.loadContent('dashboard');
    }

    handleLogin(username, password) {
        // Simple static authentication (in production, use proper auth)
        if (username === 'admin' && password === 'admin123') {
            sessionStorage.setItem('admin_logged_in', 'true');
            this.currentUser = 'admin';
            this.hideLoginModal();
            this.showToast('success', 'Login Successful', 'Welcome to Admin Panel');
            return true;
        } else {
            this.showToast('error', 'Login Failed', 'Invalid username or password');
            return false;
        }
    }

    handleLogout() {
        sessionStorage.removeItem('admin_logged_in');
        this.currentUser = null;
        this.showLoginModal();
    }

    // ================= EVENT LISTENERS =================
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                this.handleLogin(username, password);
            });
        }

        // Sidebar navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = item.dataset.tab;
                if (tab) {
                    this.switchTab(tab);
                }
            });
        });

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('collapsed');
            });
        }

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('active');
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });

        // Search functionality
        this.setupSearchListeners();
    }

    setupSearchListeners() {
        const searchInput = document.getElementById('searchBlog');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterBlog(e.target.value);
            });
        }

        const searchAppointments = document.getElementById('searchAppointments');
        if (searchAppointments) {
            searchAppointments.addEventListener('input', (e) => {
                this.filterAppointments(e.target.value);
            });
        }
    }

    // ================= TAB SWITCHING =================
    switchTab(tabId) {
        this.currentTab = tabId;
        
        // Update active nav
        document.querySelectorAll('.nav-item').forEach(item => {
            if (item.dataset.tab === tabId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update page title
        const pageTitle = document.getElementById('pageTitle');
        const titles = {
            dashboard: 'Dashboard',
            blog: 'Blog Manager',
            certificates: 'Certificates Gallery',
            services: 'Services Manager',
            profile: 'Profile Settings',
            appointments: 'Appointments',
            settings: 'Settings'
        };
        if (pageTitle) {
            pageTitle.textContent = titles[tabId] || 'Dashboard';
        }

        // Load content
        this.loadContent(tabId);
    }

    loadContent(tabId) {
        const contentArea = document.getElementById('contentArea');
        if (!contentArea) return;

        const template = document.getElementById(`${tabId}-template`);
        if (!template) return;

        // Clone template content
        const content = template.content.cloneNode(true);
        contentArea.innerHTML = '';
        contentArea.appendChild(content);

        // Load specific data for each tab
        switch(tabId) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'blog':
                this.loadBlogManager();
                break;
            case 'certificates':
                this.loadCertificatesManager();
                break;
            case 'services':
                this.loadServicesManager();
                break;
            case 'profile':
                this.loadProfileManager();
                break;
            case 'appointments':
                this.loadAppointmentsManager();
                break;
            case 'settings':
                this.loadSettingsManager();
                break;
        }

        // Close mobile sidebar after navigation
        if (window.innerWidth <= 768) {
            document.querySelector('.sidebar').classList.remove('active');
        }
    }

    // ================= DASHBOARD =================
    loadDashboard() {
        // Update stats
        document.getElementById('totalBlogs').textContent = this.data.blog.length;
        document.getElementById('totalCertificates').textContent = this.data.certificates.length;
        document.getElementById('totalServices').textContent = this.data.services.length;
        document.getElementById('totalAppointments').textContent = this.data.appointments.length;

        // Load recent appointments
        const recentAppointments = this.data.appointments.slice(0, 5);
        const tbody = document.querySelector('#recentAppointments tbody');
        if (tbody) {
            tbody.innerHTML = recentAppointments.map(app => `
                <tr>
                    <td>${app.name}</td>
                    <td>${app.date}</td>
                    <td><span class="status ${app.status}">${app.status}</span></td>
                </tr>
            `).join('');
        }

        // Load recent blogs
        const recentBlogs = this.data.blog.slice(0, 3);
        const recentBlogsContainer = document.getElementById('recentBlogs');
        if (recentBlogsContainer) {
            recentBlogsContainer.innerHTML = recentBlogs.map(blog => `
                <div class="recent-blog-item">
                    <img src="${blog.image}" alt="${blog.title}">
                    <h4>${blog.title}</h4>
                </div>
            `).join('');
        }

        // Quick actions
        document.querySelectorAll('.quick-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = btn.dataset.tab;
                const action = btn.dataset.action;
                if (tab) {
                    this.switchTab(tab);
                    if (action === 'new') {
                        setTimeout(() => {
                            this.showAddForm(tab);
                        }, 100);
                    }
                }
            });
        });

        // Export button
        const exportBtn = document.getElementById('exportDataBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportAllData();
            });
        }
    }

    // ================= BLOG MANAGER =================
    loadBlogManager() {
        this.renderBlogTable();
        this.renderBlogPreview();
        
        // Add blog button
        document.getElementById('addBlogBtn').addEventListener('click', () => {
            this.showBlogForm();
        });

        // Cancel form button
        document.getElementById('cancelBlogForm').addEventListener('click', () => {
            document.getElementById('blogFormContainer').style.display = 'none';
        });

        // Blog form submit
        document.getElementById('blogForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveBlog();
        });
    }

    renderBlogTable() {
        const tbody = document.getElementById('blogTableBody');
        if (!tbody) return;

        tbody.innerHTML = this.data.blog.map(blog => `
            <tr>
                <td><img src="${blog.image}" alt="${blog.title}" class="blog-thumb"></td>
                <td>${blog.title}</td>
                <td><span class="status ${blog.category}">${blog.category}</span></td>
                <td>${blog.date || 'N/A'}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="adminPanel.editBlog('${blog.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="adminPanel.deleteBlog('${blog.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    renderBlogPreview() {
        const preview = document.getElementById('blogPreview');
        if (!preview) return;

        preview.innerHTML = this.data.blog.slice(0, 3).map(blog => `
            <div class="preview-card">
                <img src="${blog.image}" alt="${blog.title}" style="width:100%; height:150px; object-fit:cover; border-radius:10px;">
                <h4 style="margin:10px 0 5px">${blog.title}</h4>
                <p style="color:#666; font-size:0.9rem">${blog.excerpt || blog.content.substring(0,60)}...</p>
            </div>
        `).join('');
    }

    showBlogForm(blogId = null) {
        const formContainer = document.getElementById('blogFormContainer');
        const formTitle = document.getElementById('blogFormTitle');
        const form = document.getElementById('blogForm');
        
        if (blogId) {
            // Edit mode
            const blog = this.data.blog.find(b => b.id === blogId);
            if (blog) {
                formTitle.textContent = 'Edit Blog Post';
                document.getElementById('blogId').value = blog.id;
                document.getElementById('blogTitle').value = blog.title;
                document.getElementById('blogImage').value = blog.image;
                document.getElementById('blogContent').value = blog.content;
                document.getElementById('blogExcerpt').value = blog.excerpt || '';
                document.getElementById('blogCategory').value = blog.category || 'weight-loss';
                document.getElementById('blogDate').value = blog.date || '';
            }
        } else {
            // Add mode
            formTitle.textContent = 'Add New Blog Post';
            form.reset();
            document.getElementById('blogId').value = '';
            document.getElementById('blogDate').value = new Date().toISOString().split('T')[0];
        }
        
        formContainer.style.display = 'block';
        formContainer.scrollIntoView({ behavior: 'smooth' });
    }

    saveBlog() {
        const blogData = {
            id: document.getElementById('blogId').value || Date.now().toString(),
            title: document.getElementById('blogTitle').value,
            image: document.getElementById('blogImage').value,
            content: document.getElementById('blogContent').value,
            excerpt: document.getElementById('blogExcerpt').value || document.getElementById('blogContent').value.substring(0, 100),
            category: document.getElementById('blogCategory').value,
            date: document.getElementById('blogDate').value || new Date().toISOString().split('T')[0]
        };

        if (document.getElementById('blogId').value) {
            // Update existing
            const index = this.data.blog.findIndex(b => b.id === blogData.id);
            if (index !== -1) {
                this.data.blog[index] = blogData;
                this.showToast('success', 'Blog Updated', 'Blog post has been updated successfully');
            }
        } else {
            // Add new
            this.data.blog.push(blogData);
            this.showToast('success', 'Blog Added', 'New blog post has been added successfully');
        }

        this.saveAllData();
        document.getElementById('blogFormContainer').style.display = 'none';
        this.renderBlogTable();
        this.renderBlogPreview();
        this.loadDashboard(); // Update dashboard stats
    }

    editBlog(id) {
        this.showBlogForm(id);
    }

    deleteBlog(id) {
        this.showDeleteModal(() => {
            this.data.blog = this.data.blog.filter(b => b.id !== id);
            this.saveAllData();
            this.renderBlogTable();
            this.renderBlogPreview();
            this.loadDashboard();
            this.showToast('success', 'Blog Deleted', 'Blog post has been deleted successfully');
        });
    }

    filterBlog(searchTerm) {
        // Implement blog search
    }

    // ================= CERTIFICATES MANAGER =================
    loadCertificatesManager() {
        this.renderCertificatesGrid();
        this.renderCertificatesPreview();
        
        document.getElementById('addCertificateBtn').addEventListener('click', () => {
            this.showCertificateForm();
        });

        document.getElementById('cancelCertificateForm').addEventListener('click', () => {
            document.getElementById('certificateFormContainer').style.display = 'none';
        });

        document.getElementById('certificateForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveCertificate();
        });
    }

    renderCertificatesGrid() {
        const grid = document.getElementById('certificatesGrid');
        if (!grid) return;

        grid.innerHTML = this.data.certificates.map(cert => `
            <div class="certificate-card">
                <div class="certificate-image">
                    <img src="${cert.image}" alt="${cert.title}">
                </div>
                <div class="certificate-info">
                    <h3>${cert.title}</h3>
                    <p>${cert.issuer || ''}</p>
                    <div class="certificate-actions">
                        <button class="btn-outline" onclick="adminPanel.editCertificate('${cert.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn-danger" onclick="adminPanel.deleteCertificate('${cert.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderCertificatesPreview() {
        const preview = document.getElementById('certificatesPreview');
        if (!preview) return;

        preview.innerHTML = this.data.certificates.slice(0, 4).map(cert => `
            <img src="${cert.image}" alt="${cert.title}" title="${cert.title}">
        `).join('');
    }

    showCertificateForm(certId = null) {
        const formContainer = document.getElementById('certificateFormContainer');
        const formTitle = document.getElementById('certificateFormTitle');
        const form = document.getElementById('certificateForm');
        
        if (certId) {
            const cert = this.data.certificates.find(c => c.id === certId);
            if (cert) {
                formTitle.textContent = 'Edit Certificate';
                document.getElementById('certificateId').value = cert.id;
                document.getElementById('certificateTitle').value = cert.title;
                document.getElementById('certificateImage').value = cert.image;
                document.getElementById('certificateIssuer').value = cert.issuer || '';
                document.getElementById('certificateDate').value = cert.date || '';
                document.getElementById('certificateExpiry').value = cert.expiry || '';
            }
        } else {
            formTitle.textContent = 'Add New Certificate';
            form.reset();
            document.getElementById('certificateId').value = '';
        }
        
        formContainer.style.display = 'block';
        formContainer.scrollIntoView({ behavior: 'smooth' });
    }

    saveCertificate() {
        const certData = {
            id: document.getElementById('certificateId').value || Date.now().toString(),
            title: document.getElementById('certificateTitle').value,
            image: document.getElementById('certificateImage').value,
            issuer: document.getElementById('certificateIssuer').value,
            date: document.getElementById('certificateDate').value,
            expiry: document.getElementById('certificateExpiry').value || null
        };

        if (document.getElementById('certificateId').value) {
            const index = this.data.certificates.findIndex(c => c.id === certData.id);
            if (index !== -1) {
                this.data.certificates[index] = certData;
                this.showToast('success', 'Certificate Updated', 'Certificate has been updated successfully');
            }
        } else {
            this.data.certificates.push(certData);
            this.showToast('success', 'Certificate Added', 'New certificate has been added successfully');
        }

        this.saveAllData();
        document.getElementById('certificateFormContainer').style.display = 'none';
        this.renderCertificatesGrid();
        this.renderCertificatesPreview();
        this.loadDashboard();
    }

    editCertificate(id) {
        this.showCertificateForm(id);
    }

    deleteCertificate(id) {
        this.showDeleteModal(() => {
            this.data.certificates = this.data.certificates.filter(c => c.id !== id);
            this.saveAllData();
            this.renderCertificatesGrid();
            this.renderCertificatesPreview();
            this.loadDashboard();
            this.showToast('success', 'Certificate Deleted', 'Certificate has been deleted successfully');
        });
    }

    // ================= SERVICES MANAGER =================
    loadServicesManager() {
        this.renderServicesList();
        this.renderServicesPreview();
        
        document.getElementById('addServiceBtn').addEventListener('click', () => {
            this.showServiceForm();
        });

        document.getElementById('cancelServiceForm').addEventListener('click', () => {
            document.getElementById('serviceFormContainer').style.display = 'none';
        });

        document.getElementById('serviceForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveService();
        });

        // Icon preview update
        document.getElementById('serviceIcon').addEventListener('input', (e) => {
            const iconPreview = document.querySelector('.icon-preview i');
            if (iconPreview) {
                iconPreview.className = `fas ${e.target.value}`;
            }
        });
    }

    renderServicesList() {
        const list = document.getElementById('servicesList');
        if (!list) return;

        list.innerHTML = this.data.services.map(service => `
            <div class="service-card">
                <div class="service-icon">
                    <i class="fas ${service.icon}"></i>
                </div>
                <div class="service-content">
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                    <div class="service-meta">
                        <span><i class="fas fa-tag"></i> PKR ${service.price}</span>
                        <span><i class="fas fa-clock"></i> ${service.duration}</span>
                    </div>
                    <div class="service-actions">
                        <button class="btn-outline" onclick="adminPanel.editService('${service.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn-danger" onclick="adminPanel.deleteService('${service.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderServicesPreview() {
        const preview = document.getElementById('servicesPreview');
        if (!preview) return;

        preview.innerHTML = this.data.services.slice(0, 2).map(service => `
            <div style="display:flex; gap:15px; background:white; padding:15px; border-radius:10px;">
                <i class="fas ${service.icon}" style="font-size:2rem; color:#1e6b4c;"></i>
                <div>
                    <h4 style="margin-bottom:5px;">${service.title}</h4>
                    <p style="color:#666;">${service.description}</p>
                </div>
            </div>
        `).join('');
    }

    showServiceForm(serviceId = null) {
        const formContainer = document.getElementById('serviceFormContainer');
        const formTitle = document.getElementById('serviceFormTitle');
        const form = document.getElementById('serviceForm');
        
        if (serviceId) {
            const service = this.data.services.find(s => s.id === serviceId);
            if (service) {
                formTitle.textContent = 'Edit Service';
                document.getElementById('serviceId').value = service.id;
                document.getElementById('serviceIcon').value = service.icon;
                document.getElementById('serviceTitle').value = service.title;
                document.getElementById('serviceDescription').value = service.description;
                document.getElementById('servicePrice').value = service.price;
                document.getElementById('serviceDuration').value = service.duration;
                
                // Update icon preview
                const iconPreview = document.querySelector('.icon-preview i');
                if (iconPreview) {
                    iconPreview.className = `fas ${service.icon}`;
                }
            }
        } else {
            formTitle.textContent = 'Add New Service';
            form.reset();
            document.getElementById('serviceId').value = '';
            
            // Reset icon preview
            const iconPreview = document.querySelector('.icon-preview i');
            if (iconPreview) {
                iconPreview.className = 'fas fa-utensils';
            }
        }
        
        formContainer.style.display = 'block';
        formContainer.scrollIntoView({ behavior: 'smooth' });
    }

    saveService() {
        const serviceData = {
            id: document.getElementById('serviceId').value || Date.now().toString(),
            icon: document.getElementById('serviceIcon').value,
            title: document.getElementById('serviceTitle').value,
            description: document.getElementById('serviceDescription').value,
            price: document.getElementById('servicePrice').value,
            duration: document.getElementById('serviceDuration').value
        };

        if (document.getElementById('serviceId').value) {
            const index = this.data.services.findIndex(s => s.id === serviceData.id);
            if (index !== -1) {
                this.data.services[index] = serviceData;
                this.showToast('success', 'Service Updated', 'Service has been updated successfully');
            }
        } else {
            this.data.services.push(serviceData);
            this.showToast('success', 'Service Added', 'New service has been added successfully');
        }

        this.saveAllData();
        document.getElementById('serviceFormContainer').style.display = 'none';
        this.renderServicesList();
        this.renderServicesPreview();
        this.loadDashboard();
    }

    editService(id) {
        this.showServiceForm(id);
    }

    deleteService(id) {
        this.showDeleteModal(() => {
            this.data.services = this.data.services.filter(s => s.id !== id);
            this.saveAllData();
            this.renderServicesList();
            this.renderServicesPreview();
            this.loadDashboard();
            this.showToast('success', 'Service Deleted', 'Service has been deleted successfully');
        });
    }

    // ================= PROFILE MANAGER =================
    loadProfileManager() {
        const profile = this.data.profile;
        
        // Populate form fields
        document.getElementById('profileImageUrl').value = profile.image;
        document.getElementById('profileName').value = profile.name;
        document.getElementById('profileTitle').value = profile.title;
        document.getElementById('profileBio').value = profile.bio;
        document.getElementById('profileEmail').value = profile.email;
        document.getElementById('profilePhone').value = profile.phone;
        document.getElementById('profileWhatsApp').value = profile.whatsapp;
        
        // Update preview
        document.getElementById('profileImageDisplay').src = profile.image;
        document.getElementById('previewImage').src = profile.image;
        document.getElementById('previewName').textContent = profile.name;
        document.getElementById('previewTitle').textContent = profile.title;
        document.getElementById('previewBio').textContent = profile.bio;

        // Update image button
        document.getElementById('updateProfileImage').addEventListener('click', () => {
            const newImage = document.getElementById('profileImageUrl').value;
            if (newImage) {
                document.getElementById('profileImageDisplay').src = newImage;
                document.getElementById('previewImage').src = newImage;
            }
        });

        // Save profile button
        document.getElementById('saveProfileBtn').addEventListener('click', () => {
            this.saveProfile();
        });

        // Live preview updates
        document.getElementById('profileName').addEventListener('input', (e) => {
            document.getElementById('previewName').textContent = e.target.value;
        });

        document.getElementById('profileTitle').addEventListener('input', (e) => {
            document.getElementById('previewTitle').textContent = e.target.value;
        });

        document.getElementById('profileBio').addEventListener('input', (e) => {
            document.getElementById('previewBio').textContent = e.target.value;
        });
    }

    saveProfile() {
        this.data.profile = {
            image: document.getElementById('profileImageUrl').value,
            name: document.getElementById('profileName').value,
            title: document.getElementById('profileTitle').value,
            bio: document.getElementById('profileBio').value,
            email: document.getElementById('profileEmail').value,
            phone: document.getElementById('profilePhone').value,
            whatsapp: document.getElementById('profileWhatsApp').value
        };

        this.saveAllData();
        this.showToast('success', 'Profile Updated', 'Profile has been updated successfully');
    }

    // ================= APPOINTMENTS MANAGER =================
    loadAppointmentsManager() {
        this.renderAppointmentsTable();
        
        document.getElementById('refreshAppointments').addEventListener('click', () => {
            this.renderAppointmentsTable();
        });

        document.getElementById('exportAppointmentsBtn').addEventListener('click', () => {
            this.exportAppointments();
        });

        // Filters
        document.getElementById('appointmentStatus').addEventListener('change', () => {
            this.filterAppointments();
        });

        document.getElementById('appointmentDateFilter').addEventListener('change', () => {
            this.filterAppointments();
        });
    }

    renderAppointmentsTable() {
        const tbody = document.getElementById('appointmentsTableBody');
        if (!tbody) return;

        tbody.innerHTML = this.data.appointments.map((app, index) => `
            <tr>
                <td>${app.id}</td>
                <td>${app.name}</td>
                <td>${app.email}</td>
                <td>${app.phone}</td>
                <td>${app.date}</td>
                <td>${app.time}</td>
                <td>${app.service}</td>
                <td><span class="status ${app.status}">${app.status}</span></td>
                <td>
                    <button class="action-btn edit-btn" onclick="adminPanel.updateAppointmentStatus('${app.id}', 'confirmed')">
                        <i class="fas fa-check-circle"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="adminPanel.deleteAppointment('${app.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    updateAppointmentStatus(id, status) {
        const app = this.data.appointments.find(a => a.id === id);
        if (app) {
            app.status = status;
            this.saveAllData();
            this.renderAppointmentsTable();
            this.showToast('success', 'Status Updated', `Appointment marked as ${status}`);
        }
    }

    deleteAppointment(id) {
        this.showDeleteModal(() => {
            this.data.appointments = this.data.appointments.filter(a => a.id !== id);
            this.saveAllData();
            this.renderAppointmentsTable();
            this.loadDashboard();
            this.showToast('success', 'Appointment Deleted', 'Appointment has been deleted successfully');
        });
    }

    filterAppointments() {
        // Implement appointment filtering
    }

    // ================= SETTINGS MANAGER =================
    loadSettingsManager() {
        // Export all data
        document.getElementById('exportAllData').addEventListener('click', () => {
            this.exportAllData();
        });

        // Copy JSON
        document.getElementById('copyJsonBtn').addEventListener('click', () => {
            this.copyJsonToClipboard();
        });

        // Reset data
        document.getElementById('resetDataBtn').addEventListener('click', () => {
            this.resetAllData();
        });

        // Change password
        document.getElementById('changePasswordBtn').addEventListener('click', () => {
            this.changePassword();
        });

        // Save appearance
        document.getElementById('saveAppearanceBtn').addEventListener('click', () => {
            this.saveAppearance();
        });

        // Update export JSON textarea
        this.updateExportJson();
    }

    exportAllData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dietitian_maryam_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showToast('success', 'Export Successful', 'All data has been exported as JSON');
    }

    exportAppointments() {
        const dataStr = JSON.stringify(this.data.appointments, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `appointments_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    updateExportJson() {
        const textarea = document.getElementById('exportJsonData');
        if (textarea) {
            textarea.value = JSON.stringify(this.data, null, 2);
        }
    }

    copyJsonToClipboard() {
        const textarea = document.getElementById('exportJsonData');
        if (textarea) {
            textarea.select();
            document.execCommand('copy');
            this.showToast('success', 'Copied!', 'JSON data copied to clipboard');
        }
    }

    resetAllData() {
        this.showDeleteModal(() => {
            this.data.blog = this.getDefaultBlog();
            this.data.certificates = this.getDefaultCertificates();
            this.data.services = this.getDefaultServices();
            this.data.profile = this.getDefaultProfile();
            this.data.appointments = this.getDefaultAppointments();
            this.saveAllData();
            this.updateExportJson();
            this.showToast('success', 'Reset Complete', 'All data has been reset to default');
            
            // Reload current tab
            this.loadContent(this.currentTab);
        }, 'Reset All Data?', 'This will delete all your current data and restore defaults. This cannot be undone!');
    }

    changePassword() {
        const newPass = document.getElementById('adminPassword').value;
        const confirmPass = document.getElementById('confirmPassword').value;
        
        if (!newPass || !confirmPass) {
            this.showToast('error', 'Error', 'Please fill in both password fields');
            return;
        }
        
        if (newPass !== confirmPass) {
            this.showToast('error', 'Error', 'Passwords do not match');
            return;
        }
        
        // In a real app, this would be sent to server
        this.showToast('success', 'Password Updated', 'Admin password has been changed (demo only)');
        
        // Clear fields
        document.getElementById('adminPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    }

    saveAppearance() {
        const themeColor = document.getElementById('themeColor').value;
        const sidebarPos = document.getElementById('sidebarPosition').value;
        
        // Apply theme color
        document.documentElement.style.setProperty('--primary', themeColor);
        
        // Apply sidebar position
        const sidebar = document.querySelector('.sidebar');
        if (sidebarPos === 'right') {
            document.querySelector('.admin-container').style.flexDirection = 'row-reverse';
        } else {
            document.querySelector('.admin-container').style.flexDirection = 'row';
        }
        
        this.showToast('success', 'Appearance Saved', 'Theme preferences have been updated');
    }

    // ================= UTILITY FUNCTIONS =================
    showToast(type, title, message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-exclamation-triangle'}"></i>
            <div class="toast-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        container.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    }

    showDeleteModal(onConfirm, title = 'Confirm Delete', message = 'Are you sure you want to delete this item? This action cannot be undone.') {
        const modal = document.getElementById('deleteModal');
        const confirmBtn = document.getElementById('confirmDelete');
        const cancelBtn = document.getElementById('cancelDelete');
        
        if (!modal) return;

        modal.classList.add('active');
        
        const handleConfirm = () => {
            onConfirm();
            modal.classList.remove('active');
            cleanup();
        };
        
        const handleCancel = () => {
            modal.classList.remove('active');
            cleanup();
        };
        
        const cleanup = () => {
            confirmBtn.removeEventListener('click', handleConfirm);
            cancelBtn.removeEventListener('click', handleCancel);
        };
        
        confirmBtn.addEventListener('click', handleConfirm);
        cancelBtn.addEventListener('click', handleCancel);
    }

    showAddForm(tab) {
        switch(tab) {
            case 'blog':
                this.showBlogForm();
                break;
            case 'certificates':
                this.showCertificateForm();
                break;
            case 'services':
                this.showServiceForm();
                break;
        }
    }

    loadTemplates() {
        // This ensures templates are ready
    }
}

// ================= INITIALIZE ADMIN PANEL =================
let adminPanel;

document.addEventListener('DOMContentLoaded', () => {
    adminPanel = new AdminPanel();
    
    // Make adminPanel globally accessible for inline onclick handlers
    window.adminPanel = adminPanel;
});

// ================= EXPORT FOR MAIN WEBSITE =================
// Function to get data for main website
function getWebsiteData() {
    return {
        blog: JSON.parse(localStorage.getItem('admin_blog')) || [],
        certificates: JSON.parse(localStorage.getItem('admin_certificates')) || [],
        services: JSON.parse(localStorage.getItem('admin_services')) || [],
        profile: JSON.parse(localStorage.getItem('admin_profile')) || {},
        appointments: JSON.parse(localStorage.getItem('admin_appointments')) || []
    };
}

// Make available globally
window.getWebsiteData = getWebsiteData;

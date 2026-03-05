// Create stars for galaxy background
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starsCount = 500;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = Math.random() * 3;
        const delay = Math.random() * 5;
        
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
    }
}

// GitHub Pages Portfolio with JSON Storage
class PortfolioCMS {
    constructor() {
        this.data = {
            profile: {},
            projects: [],
            services: [],
            blogs: [],
            certifications: [],
            education: [],
            experience: [],
            skills: [],
            reviews: []
        };
        this.categories = [];
        this.filteredProjects = [];
        this.currentCategory = 'all';
        this.basePath = window.location.hostname === 'localhost' ? './data' : './data';
        this.init();
    }

    async init() {
        createStars();
        await this.loadCategories();
        await this.loadAllData();
        this.renderAll();
        this.setupEventListeners();
        this.setupNavigation();
        this.setupCategoryFilter();
    }

    // 🚀 Load categories from JSON
    async loadCategories() {
        try {
            const response = await fetch(`${this.basePath}/categories.json`);
            const data = await response.json();
            this.categories = data.categories || [];
            console.log('✅ Categories loaded:', this.categories);
        } catch (error) {
            console.error('Error loading categories:', error);
            this.categories = [
                "Data Science",
                "Machine Learning", 
                "Analytics",
                "Data Engineering",
                "Visualization/Reporting"
            ];
        }
    }

    // 🚀 PERMANENT STORAGE - Load from JSON files
    async loadAllData() {
        try {
            const urls = [
                `${this.basePath}/config.json`,
                `${this.basePath}/projects.json`, 
                `${this.basePath}/services.json`,
                `${this.basePath}/blogs.json`,
                `${this.basePath}/certifications.json`,
                `${this.basePath}/resume.json`,
                `${this.basePath}/reviews.json`
            ];

            const responses = await Promise.allSettled(urls.map(url => 
                fetch(url).then(r => r.json())
            ));

            // config.json
            if (responses[0].status === 'fulfilled') {
                this.data.profile = responses[0].value.profile || {};
                this.data.education = responses[0].value.education || [];
                this.data.experience = responses[0].value.experience || [];
                this.data.skills = responses[0].value.skills || [];
            }

            // projects.json
            if (responses[1].status === 'fulfilled') {
                this.data.projects = responses[1].value.projects || [];
                this.filteredProjects = [...this.data.projects];
            }

            // services.json
            if (responses[2].status === 'fulfilled') {
                this.data.services = responses[2].value.services || [];
            }

            // blogs.json
            if (responses[3].status === 'fulfilled') {
                this.data.blogs = responses[3].value.blogs || [];
            }

            // certifications.json
            if (responses[4].status === 'fulfilled') {
                this.data.certifications = responses[4].value.certifications || [];
            }

            // resume.json (additional resume data)
            if (responses[5].status === 'fulfilled') {
                this.data.education = responses[5].value.education || this.data.education;
                this.data.experience = responses[5].value.experience || this.data.experience;
                this.data.skills = responses[5].value.skills || this.data.skills;
            }

            // reviews.json
            if (responses[6].status === 'fulfilled') {
                this.data.reviews = responses[6].value.reviews || [];
            }

            console.log('✅ All data loaded from GitHub JSON files');
        } catch (error) {
            console.error('Error loading data:', error);
            await this.createSampleData();
        }
    }

    async createSampleData() {
        console.log('Creating sample data...');
        
        this.data = {
            profile: {
                name: "Nasir Hussain",
                title: "Data Scientist & Analyst",
                profileImage: "",
                coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                introTitle: "Data Scientist & Analyst",
                introDescription: "Transforming complex data into actionable insights.",
                aboutDescription: "With over 5 years of experience in data science and analytics.",
                contactEmail: "nasir.swat.hussain@gmail.com",
                resumeLink: "#"
            },
            projects: [
                {
                    id: 1,
                    title: "Customer Segmentation",
                    description: "Used clustering algorithms to segment customers.",
                    category: "Machine Learning",
                    image: "",
                    icon: "chart-line",
                    technologies: ["Python", "Scikit-learn", "Tableau"],
                    results: "Increased conversion rates by 15%"
                }
            ],
            services: [
                {
                    id: 1,
                    title: "Data Analysis",
                    description: "Comprehensive data analysis to uncover patterns and insights.",
                    icon: "chart-bar"
                }
            ],
            blogs: [
                {
                    id: 1,
                    title: "The Future of AI in Healthcare",
                    description: "Exploring how AI is transforming healthcare industry.",
                    fullContent: "<h3>Complete Blog Article</h3><p>This is where your full blog article would appear.</p>",
                    image: "",
                    icon: "chart-pie",
                    date: "June 10, 2023",
                    category: "Data Science"
                }
            ],
            certifications: [
                {
                    id: 1,
                    title: "AWS Certified Data Analytics",
                    issuer: "Amazon Web Services",
                    date: "January 2023",
                    description: "Specialty certification demonstrating expertise in AWS data services.",
                    image: "",
                    icon: "cloud"
                }
            ],
            education: [
                {
                    id: 1,
                    degree: "MSc Data Science",
                    institution: "Stanford University",
                    period: "2018-2020"
                }
            ],
            experience: [
                {
                    id: 1,
                    position: "Senior Data Scientist",
                    company: "TechCorp Inc.",
                    period: "2020-Present"
                }
            ],
            skills: [
                {
                    id: 1,
                    category: "Programming",
                    items: ["Python", "R", "SQL", "JavaScript"]
                }
            ],
            reviews: [
                {
                    id: 1,
                    name: "Sarah Williams",
                    date: "June 15, 2023",
                    message: "Exceptional insights for our marketing campaign!"
                }
            ]
        };
        
        this.filteredProjects = [...this.data.projects];
    }

    // 🎯 RENDER METHODS
    renderAll() {
        this.renderProfile();
        this.renderCategoryTabs();
        this.renderProjects();
        this.renderServices();
        this.renderBlogs();
        this.renderCertifications();
        this.renderResume();
        this.renderReviews();
    }

    renderProfile() {
        const profile = this.data.profile;
        
        document.getElementById('profileName').textContent = profile.name || 'Your Name';
        document.getElementById('profileTitle').textContent = profile.title || 'Your Title';
        document.getElementById('introTitle').textContent = profile.introTitle || 'Welcome';
        document.getElementById('introDescription').textContent = profile.introDescription || 'Your introduction';
        document.getElementById('aboutDescription').textContent = profile.aboutDescription || 'About you';
        document.getElementById('resumeDownloadLink').href = profile.resumeLink || '#';

        const profileImg = document.getElementById('profileImage');
        if (profile.profileImage) {
            profileImg.innerHTML = `<img src="${profile.profileImage}" alt="${profile.name}">`;
        }

        const homeSection = document.getElementById('homeSection');
        if (profile.coverImage) {
            homeSection.style.setProperty('--cover-image', `url('${profile.coverImage}')`);
        }

        const personalInfo = document.getElementById('personalInfo');
        personalInfo.innerHTML = `
            <div class="info-item">
                <span>Name:</span>
                <span>${profile.name || 'Your Name'}</span>
            </div>
            <div class="info-item">
                <span>Email:</span>
                <span>${profile.contactEmail || 'your.email@example.com'}</span>
            </div>
            <div class="info-item">
                <span>Location:</span>
                <span>Swat, Pakistan</span>
            </div>
            <div class="info-item">
                <span>Degree:</span>
                <span>BS-Software Engineering<br>Gold Medalist</span>
            </div>
        `;
    }

    renderCategoryTabs() {
        const tabsContainer = document.getElementById('categoryTabs');
        if (!tabsContainer) return;

        // Update total count
        const totalCount = this.data.projects.length;
        document.getElementById('totalCount').textContent = totalCount;

        // Create All tab
        let tabsHTML = `
            <button class="tab-btn active" data-category="all">
                <i class="fas fa-globe"></i> All Projects
                <span class="project-count" id="allCount">${totalCount}</span>
            </button>
        `;

        // Create category tabs
        this.categories.forEach(category => {
            const count = this.data.projects.filter(p => p.category === category).length;
            const categoryId = category.toLowerCase().replace(/\s+/g, '-');
            
            tabsHTML += `
                <button class="tab-btn" data-category="${category}">
                    <i class="fas fa-${this.getCategoryIcon(category)}"></i> ${category}
                    <span class="project-count" id="${categoryId}Count">${count}</span>
                </button>
            `;
        });

        tabsContainer.innerHTML = tabsHTML;
    }

    getCategoryIcon(category) {
        const iconMap = {
            'Data Science': 'chart-line',
            'Machine Learning': 'robot',
            'Analytics': 'chart-bar',
            'Data Engineering': 'database',
            'Visualization/Reporting': 'tv',
            'Web Development': 'code',
            'Desktop Applications': 'desktop',
            'Consulting': 'handshake'
        };
        return iconMap[category] || 'folder';
    }

    renderProjects() {
        this.filteredProjects = [...this.data.projects];
        this.renderFilteredProjects();
    }

    renderFilteredProjects() {
        const grid = document.getElementById('projectsGrid');
        const showingCount = document.getElementById('showingCount');
        
        if (!grid || !showingCount) return;

        showingCount.textContent = this.filteredProjects.length;

        if (this.filteredProjects.length === 0) {
            grid.innerHTML = `
                <div class="no-projects">
                    <i class="fas fa-search"></i>
                    <h3>No projects found</h3>
                    <p>Try selecting a different category</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.filteredProjects.map(project => `
            <div class="project-card" data-category="${project.category}">
                <div class="project-img">
                    ${project.image ? 
                        `<img src="${project.image}" alt="${project.title}">` :
                        `<i class="fas fa-${project.icon || 'project-diagram'}"></i>`
                    }
                    <span class="category-badge">${project.category}</span>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <button class="btn open-project" data-project="${project.id}">View Details</button>
                </div>
            </div>
        `).join('');

        this.setupProjectModal();
    }

    setupCategoryFilter() {
        const tabsContainer = document.getElementById('categoryTabs');
        if (!tabsContainer) return;

        tabsContainer.addEventListener('click', (e) => {
            const tabBtn = e.target.closest('.tab-btn');
            if (!tabBtn) return;

            const category = tabBtn.getAttribute('data-category');
            this.filterProjectsByCategory(category);
            
            // Update active tab
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            tabBtn.classList.add('active');
        });
    }

    filterProjectsByCategory(category) {
        this.currentCategory = category;
        
        if (category === 'all') {
            this.filteredProjects = [...this.data.projects];
        } else {
            this.filteredProjects = this.data.projects.filter(
                project => project.category === category
            );
        }
        
        this.renderFilteredProjects();
    }

    renderCertifications() {
        const grid = document.getElementById('certificationsGrid');
        if (!grid) return;

        grid.innerHTML = this.data.certifications.length === 0 ?
            '<div class="loading">No certifications yet.</div>' :
            this.data.certifications.map(cert => `
                <div class="certification-card">
                    <div class="certification-img">
                        ${cert.image ?
                            `<img src="${cert.image}" alt="${cert.title}">` :
                            `<i class="fas fa-${cert.icon || 'certificate'}"></i>`
                        }
                    </div>
                    <div class="certification-content">
                        <h3>${cert.title}</h3>
                        <p><strong>Issuer:</strong> ${cert.issuer}</p>
                        <p><strong>Date:</strong> ${cert.date}</p>
                        <button class="btn" onclick="window.open('${cert.link || '#'}', '_blank'); return false;">View Certificate</button>
                    </div>
                </div>
            `).join('');
    }

    renderServices() {
        const grid = document.getElementById('servicesGrid');
        if (!grid) return;

        grid.innerHTML = this.data.services.length === 0 ?
            '<div class="loading">No services yet.</div>' :
            this.data.services.map(service => `
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-${service.icon}"></i>
                    </div>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                </div>
            `).join('');
    }

    renderBlogs() {
        const grid = document.getElementById('blogsGrid');
        if (!grid) return;

        grid.innerHTML = this.data.blogs.length === 0 ?
            '<div class="loading">No blogs yet.</div>' :
            this.data.blogs.map(blog => `
                <div class="blog-card">
                    <div class="blog-img">
                        ${blog.image ?
                            `<img src="${blog.image}" alt="${blog.title}">` :
                            `<i class="fas fa-${blog.icon || 'blog'}"></i>`
                        }
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span><i class="far fa-calendar"></i> ${blog.date}</span>
                            <span><i class="fas fa-tag"></i> ${blog.category}</span>
                        </div>
                        <h3>${blog.title}</h3>
                        <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">${blog.description}</p>
                        <div class="blog-actions">
                            <button class="btn read-more-btn" data-blog-id="${blog.id}">
                                <i class="fas fa-book-open"></i> Read Full Article
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');

        this.setupBlogButtons();
    }

    setupBlogButtons() {
        document.querySelectorAll('.read-more-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const blogId = parseInt(button.getAttribute('data-blog-id'));
                const blog = this.data.blogs.find(b => b.id === blogId);
                
                if (blog) {
                    this.showBlogDetail(blog);
                }
            });
        });
    }

    showBlogDetail(blog) {
        let blogModal = document.getElementById('blogDetailModal');
        
        if (!blogModal) {
            blogModal = document.createElement('div');
            blogModal.id = 'blogDetailModal';
            blogModal.className = 'modal';
            blogModal.innerHTML = `
                <div class="modal-content" style="max-width: 900px; padding: 3rem;">
                    <button class="close-modal" id="closeBlogDetailModal" style="background: none; border: none; font-size: 1.8rem; color: var(--text-muted); position: absolute; top: 20px; right: 20px; cursor: pointer;">&times;</button>
                    <div id="blogDetailContent" style="margin-top: 1rem;"></div>
                </div>
            `;
            document.body.appendChild(blogModal);
            
            document.getElementById('closeBlogDetailModal').addEventListener('click', () => {
                blogModal.style.display = 'none';
            });
            
            window.addEventListener('click', (e) => {
                if (e.target === blogModal) {
                    blogModal.style.display = 'none';
                }
            });
        }
        
        document.getElementById('blogDetailContent').innerHTML = `
            <div class="blog-detail-header" style="text-align: center; margin-bottom: 2.5rem;">
                <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--galaxy-purple);">${blog.title}</h2>
                <div class="blog-meta" style="display: flex; justify-content: center; gap: 2rem; color: var(--text-muted); font-size: 0.95rem;">
                    <span><i class="far fa-calendar"></i> ${blog.date}</span>
                    <span><i class="fas fa-tag"></i> ${blog.category}</span>
                </div>
            </div>
            
            <div class="blog-detail-image" style="margin: 2.5rem 0;">
                ${blog.image ?
                    `<img src="${blog.image}" alt="${blog.title}" style="width: 100%; max-height: 450px; object-fit: cover; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">` :
                    `<div style="background: linear-gradient(45deg, var(--galaxy-purple), var(--galaxy-blue)); height: 350px; border-radius: 15px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(138, 43, 226, 0.3);">
                        <i class="fas fa-${blog.icon}" style="font-size: 5rem; color: white;"></i>
                    </div>`
                }
            </div>
            
            <div class="blog-detail-content" style="font-size: 1.1rem; line-height: 1.8;">
                <div style="background: var(--card-bg); padding: 2.5rem; border-radius: 15px; border-left: 5px solid var(--galaxy-purple); margin-bottom: 2rem;">
                    <h3 style="color: var(--galaxy-purple); margin-bottom: 1.5rem; font-size: 1.5rem;">Article Summary</h3>
                    <p style="color: var(--text-color); font-size: 1.15rem; line-height: 1.7;">${blog.description}</p>
                </div>
                
                <div style="background: var(--darker-bg); padding: 2.5rem; border-radius: 15px; margin-top: 2rem;">
                    <h3 style="color: var(--galaxy-purple); margin-bottom: 1.5rem; font-size: 1.5rem;">Full Article</h3>
                    <div style="color: var(--text-color); line-height: 1.8; font-size: 1.1rem;">
                        ${blog.fullContent || 
                            `<p>This is where your full blog article would appear. To add full content, update your <code>blogs.json</code> file.</p>`
                        }
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border-color); text-align: center;">
                <button class="btn" onclick="document.getElementById('blogDetailModal').style.display='none'" style="background: var(--card-bg); border: 1px solid var(--border-color);">
                    <i class="fas fa-arrow-left"></i> Back to All Blogs
                </button>
            </div>
        `;
        
        blogModal.style.display = 'block';
    }

    renderResume() {
        this.renderEducation();
        this.renderExperience();
        this.renderSkills();
    }

    renderEducation() {
        const section = document.getElementById('educationSection');
        if (!section) return;

        section.innerHTML = '<h3>Education</h3>' + (
            this.data.education.length === 0 ?
            '<div class="loading">No education entries yet.</div>' :
            this.data.education.map(edu => `
                <div class="info-item">
                    <span>${edu.degree}</span>
                    <span>${edu.institution}, ${edu.period}</span>
                </div>
            `).join('')
        );
    }

    renderExperience() {
        const section = document.getElementById('experienceSection');
        if (!section) return;

        section.innerHTML = '<h3>Experience</h3>' + (
            this.data.experience.length === 0 ?
            '<div class="loading">No experience entries yet.</div>' :
            this.data.experience.map(exp => `
                <div class="info-item">
                    <span>${exp.position}</span>
                    <span>${exp.company}, ${exp.period}</span>
                </div>
            `).join('')
        );
    }

    renderSkills() {
        const section = document.getElementById('skillsSection');
        if (!section) return;

        section.innerHTML = '<h3>Skills</h3>' + (
            this.data.skills.length === 0 ?
            '<div class="loading">No skills yet.</div>' :
            this.data.skills.map(skill => `
                <div class="info-item">
                    <span>${skill.category}:</span>
                    <span>${skill.items.join(', ')}</span>
                </div>
            `).join('')
        );
    }

    renderReviews() {
        const list = document.getElementById('reviewsList');
        if (!list) return;

        list.innerHTML = this.data.reviews.length === 0 ?
            '<div class="loading">No reviews yet. Be the first to leave one!</div>' :
            this.data.reviews.map(review => `
                <div class="review-item">
                    <div class="review-header">
                        <span class="reviewer-name">${review.name}</span>
                        <span class="review-date">${review.date}</span>
                    </div>
                    <p>${review.message}</p>
                </div>
            `).join('');
    }

    // 🔄 NAVIGATION
    setupNavigation() {
        const initialHash = window.location.hash.substring(1);
        if (initialHash) {
            this.navigateToSection(initialHash);
        } else {
            this.navigateToSection('home');
        }

        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            this.navigateToSection(hash);
        });
    }

    navigateToSection(sectionId) {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');
        
        navLinks.forEach(item => item.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        const targetSection = document.getElementById(sectionId);
        const targetLink = document.querySelector(`[data-section="${sectionId}"]`);
        
        if (targetSection && targetLink) {
            targetLink.classList.add('active');
            targetSection.classList.add('active');
            
            if (window.innerWidth <= 992) {
                document.getElementById('sidebar').classList.remove('active');
            }
            
            window.scrollTo(0, 0);
        }
    }

    // 🎪 EVENT LISTENERS
    setupEventListeners() {
        // Navigation
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('.nav-link');
            if (navLink) {
                e.preventDefault();
                const sectionId = navLink.getAttribute('data-section');
                window.location.hash = sectionId;
            }
        });

        // Mobile menu
        document.getElementById('menuToggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('active');
        });

        // Review form
        document.getElementById('reviewForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reviewerName').value;
            const message = document.getElementById('reviewMessage').value;
            if (name && message) {
                this.addReview({ name, message });
                e.target.reset();
                alert('Thank you for your review!');
            }
        });

        // Setup project modal functionality
        this.setupProjectModal();

        // Contact form
        this.setupContactForm();
    }

    setupProjectModal() {
        // Event delegation for project buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('open-project') || e.target.closest('.open-project')) {
                const button = e.target.classList.contains('open-project') ? e.target : e.target.closest('.open-project');
                const projectId = parseInt(button.getAttribute('data-project'));
                const project = this.data.projects.find(p => p.id === projectId);
                
                if (project) {
                    this.showProjectDetails(project);
                }
            }
        });

        // Close modal
        const closeModalBtn = document.getElementById('closeProjectModal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                document.getElementById('projectModal').style.display = 'none';
            });
        }

        // Close when clicking outside
        const projectModal = document.getElementById('projectModal');
        if (projectModal) {
            window.addEventListener('click', (e) => {
                if (e.target === projectModal) {
                    projectModal.style.display = 'none';
                }
            });
        }
    }

    showProjectDetails(project) {
        const modal = document.getElementById('projectModal');
        if (!modal) return;

        document.getElementById('modalProjectTitle').textContent = project.title;
        document.getElementById('modalProjectContent').innerHTML = `
            <div class="project-img" style="margin-bottom: 2rem;">
                ${project.image ? 
                    `<img src="${project.image}" alt="${project.title}">` :
                    `<i class="fas fa-${project.icon || 'project-diagram'}" style="font-size: 5rem;"></i>`
                }
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="color: var(--galaxy-purple); margin-bottom: 1rem;">Project Description</h3>
                <p style="font-size: 1.1rem; line-height: 1.7; color: var(--text-color);">${project.description}</p>
            </div>
            
            ${project.technologies && project.technologies.length > 0 ? `
            <div style="margin-bottom: 2rem;">
                <h3 style="color: var(--galaxy-purple); margin-bottom: 1rem;">Technologies Used</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${project.technologies.map(tech => `
                        <span style="background: var(--darker-bg); padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--border-color); color: var(--text-muted);">
                            ${tech}
                        </span>
                    `).join('')}
                </div>
            </div>` : ''}
            
            ${project.results ? `
            <div style="margin-bottom: 2rem;">
                <h3 style="color: var(--galaxy-purple); margin-bottom: 1rem;">Results & Achievements</h3>
                <p style="font-size: 1.1rem; line-height: 1.7; color: var(--text-color);">${project.results}</p>
            </div>` : ''}
            
            ${project.link ? `
            <div style="text-align: center; margin-top: 2rem;">
                <a href="${project.link}" target="_blank" class="btn">
                    <i class="fas fa-external-link-alt"></i> View Live Project
                </a>
            </div>` : ''}
        `;
        modal.style.display = 'block';
    }

    addReview(reviewData) {
        const newReview = {
            id: this.data.reviews.length > 0 ? Math.max(...this.data.reviews.map(r => r.id)) + 1 : 1,
            ...reviewData,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        };
        this.data.reviews.unshift(newReview);
        this.renderReviews();
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');
        
        if (!submitBtn || !successMessage) return;

        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        if (!btnText || !btnLoader) return;

        // Check for success parameter in URL
        this.checkForSuccessMessage(contactForm, successMessage);
        
        // Form submission handler
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(contactForm);
                
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    const nextInput = contactForm.querySelector('input[name="_next"]');
                    if (nextInput && nextInput.value) {
                        window.location.href = nextInput.value;
                    } else {
                        contactForm.style.display = 'none';
                        successMessage.style.display = 'block';
                        contactForm.reset();
                        
                        btnText.style.display = 'inline-block';
                        btnLoader.style.display = 'none';
                        submitBtn.disabled = false;
                    }
                } else {
                    throw new Error('Form submission failed');
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                
                alert('Sorry, there was an error sending your message. Please email me directly at nasir.swat.hussain@gmail.com');
                
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
        
        // Form validation feedback
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '' && this.hasAttribute('required')) {
                    this.classList.add('invalid');
                } else {
                    this.classList.remove('invalid');
                }
            });
            
            input.addEventListener('input', function() {
                this.classList.remove('invalid');
            });
        });
    }

    checkForSuccessMessage(contactForm, successMessage) {
        const urlParams = new URLSearchParams(window.location.search);
        const hash = window.location.hash;
        
        if (hash === '#contact' && urlParams.get('success') === 'true') {
            if (contactForm && successMessage) {
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
            }
            
            const newUrl = window.location.pathname + '#contact';
            window.history.replaceState({}, document.title, newUrl);
            
            if (successMessage) {
                setTimeout(() => {
                    successMessage.style.display = 'none';
                    if (contactForm) contactForm.style.display = 'block';
                }, 10000);
            }
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    window.portfolioCMS = new PortfolioCMS();
});
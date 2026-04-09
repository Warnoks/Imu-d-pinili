document.addEventListener("DOMContentLoaded", () => {
    // 1. Core Page Navigation (Home, Rooms Available, etc.)
    loadPage('home'); // Load default page

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const pageId = this.dataset.page;
            if (pageId) {
                // If it's a dropdown section, handle sub-pages implicitly, but update active class correctly.
                if(this.classList.contains('sub-link') && this.closest('.dropdown')) {
                     setActiveLink(this.closest('.dropdown').querySelector('.nav-link')); // set the parent dropdown active
                } else {
                     setActiveLink(this);
                }
                loadPage(pageId);
            }
        });
    });

    // Function to update the main content area from templates
    function loadPage(pageId) {
        const mainContent = document.getElementById("main-content");
        const template = document.getElementById(`page-${pageId}`);

        if (template) {
            // Clone the template content (to reuse it)
            const content = template.cloneNode(true);
            content.style.display = "block"; // Make the template visible

            // Check if the current page template demands dark background mode
            if(pageId !== 'login' && pageId !== 'signup' && pageId !== 'forgot-password' ) {
                 document.body.classList.add('homepage');
            } else {
                 document.body.classList.remove('homepage');
            }

            mainContent.innerHTML = ''; // Clear existing content
            mainContent.appendChild(content);

            // Re-bind any tab listeners for the new content
            initializeTabSystems();
        } else {
            console.error(`Page template for 'page-${pageId}' not found.`);
        }
    }

    // Function to handle highlighting of the active link
    function setActiveLink(activeLink) {
        navLinks.forEach(link => link.classList.remove("active"));
        activeLink.classList.add("active");
    }

    // 2. Tab Navigation within Reservation and Guest Service Pages
    function initializeTabSystems() {
        // Find tab systems inside the *newly loaded* main content area
        const allTabsContianers = document.querySelectorAll('#main-content .tabs');

        allTabsContianers.forEach(tabContainer => {
            const tabLinks = tabContainer.querySelectorAll('.tab-link');
            const tabContentArea = tabContainer.nextElementSibling; // content div immediately follows tabs div

            tabLinks.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Update tab active class
                    tabLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');

                    // Update content active class
                    const tabId = this.dataset.tab;
                    const allContents = tabContentArea.querySelectorAll('.tab-content');
                    allContents.forEach(content => content.classList.remove('active'));
                    document.getElementById(tabId).classList.add('active');
                });
            });
        });
    }

});
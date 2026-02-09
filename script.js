document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with delay (using CSS transition)
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;

        // Interactive states
        const target = e.target;
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.borderColor = 'transparent';
            cursorOutline.style.backgroundColor = 'rgba(45, 90, 39, 0.2)';
        } else {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.borderColor = 'var(--primary-green)';
            cursorOutline.style.backgroundColor = 'transparent';
        }
    });

    // --- Parallax Effect ---
    const heroBg = document.querySelector('.hero-bg');
    const heroContent = document.querySelector('.hero-card');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollY * 0.5}px)`;
            heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
            heroContent.style.opacity = 1 - (scrollY / 700);
        }
    });

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: Unobserve after animating once
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .zoom-in');
    animatedElements.forEach(el => scrollObserver.observe(el));


    // --- Navigation Background ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (closeMenu) closeMenu.addEventListener('click', toggleMenu);

    // Close on link click
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- Horizontal Scroll Drag (Simple Version) ---
    const slider = document.querySelector('.zones-track');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        // visual feedback
        slider.style.cursor = 'grabbing';
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
        slider.style.cursor = 'grab';
    });

    // --- Amenities Modal Logic ---
    const amenitiesData = {
        north: {
            title: "North Zone",
            subtitle: "Nature, Eco & Landscape",
            items: [
                "Butterfly Garden", "Treehouse Café", "Orchid Trails", "Botanical Walking Trail",
                "Forest-view Sunrise Decks", "Native Bamboo Grove", "Bonzai Courtyard", "Forest Hammocks",
                "Tree Bark Meditation Deck", "Garden Theatre", "Nature-Led Art Pods", "Terraced Lotus Ponds",
                "Wildflower Spiral Garden", "Rainwater Sculpture Court", "Miyawaki Dense Forest", "Aromatic Healing Garden",
                "Nature Knowledge Kiosk", "Seasonal Fruit Orchard Trail", "Mud Painting & Pottery Studio", "Koi Fish Pond",
                "Natural Stone Seating Alcove", "Herbal Pathways", "Birdwatching Decks", "Pebble Reflexology Paths",
                "Mandala Garden Trail", "Tree Canopy Walk", "Community Orchard Farming Zone", "Soil Restoration Pits",
                "Butterfly Breeding Deck", "Outdoor Plant Nursery"
            ]
        },
        south: {
            title: "South Zone",
            subtitle: "Sports & Fitness",
            items: [
                "Cricket Pitch", "Basketball Half-Court", "Outdoor Gym Zone", "CrossFit Rigs",
                "Cycling Tracks", "Climbing Wall", "Volleyball Court", "Horse Riding Trail",
                "Rock Balancing Zone", "Badminton Lawn", "Football Field", "Skating Ramp",
                "Obstacle Course", "Archery Arena", "Jogging Track", "Slackline Strip",
                "Workout Pavilion", "Trampoline Pit", "Sand Pit Workout Zone", "Tyre Flip Station",
                "Outdoor Boxing Ring", "Functional Fitness Lawn", "Open Sparring Zone", "Wall Bar & Pull-up Frames",
                "Stepper Hills for Cardio", "Sunset Yoga Platform"
            ]
        },
        east: {
            title: "East Zone",
            subtitle: "Family & Community",
            items: [
                "Kids’ Trampoline Garden", "Mini Mural Painting Walls", "Family Picnic Deck", "Outdoor Screening Wall",
                "Weekend Farmer’s Market", "Hammock Gardens", "Shaded Chat Zones", "Board Game Courtyard",
                "Community Party Lawn", "Wall Painting Activity Zone", "Kite Flying Hill", "Stargazing Benches",
                "Weekend Flea Market Deck", "Clay Toy Painting Station", "Handloom Corner", "Elderly Storytelling Pavilion",
                "Bonfire Sitout", "Ground Chai Thela Deck", "Community Cooking Deck", "Mela Ground (Carnival Deck)",
                "Community Photo Wall", "Celebration Pathway", "Diya Painting Station", "Rangoli Activity Zone",
                "Potluck Party Deck", "Family Treasure Hunt Trail", "Outdoor Tambola Court", "Open Mic Performance Lawn"
            ]
        },
        west: {
            title: "West Zone",
            subtitle: "Wellness & Tranquility",
            items: [
                "Bamboo Massage Pavilion", "Shaded Nap Pods", "Aroma Garden Walks", "Reflexology Stone Trail",
                "Healing Mud Therapy Pit", "Lotus Meditation Deck", "Forest Scent Wall", "Organic Juice Bar",
                "Silent Reading Nooks", "Herbal Tea Garden", "Wellness Water Wall", "Whispering Bamboo Grove",
                "Wellness Lounge Deck", "Art Therapy Zone", "Outdoor Candle Therapy Trail", "Forest Breathing Pavilion",
                "Yoga & Mindfulness Deck", "Sunset Pranayama Pod", "Nature Sound Therapy Trail", "Outdoor Spa Zone",
                "Wellness Herb Picking Trail", "Mindful Journaling Station", "Chakra Healing Circles", "Rain Meditation Corner",
                "Healing Energy Stones Trail", "Therapy Lantern Walk"
            ]
        },
        central: {
            title: "Central Zone",
            subtitle: "Signature Experiences",
            items: [
                "Glow Garden Trail", "Forest Treetop Café", "Outdoor Library Pavilion", "Zen Water Maze",
                "Floating Bridge Walk", "Sunrise-to-Sunset Ritual Deck", "Outdoor Clay Oven Bistro", "Fruit Picking Orchard",
                "Canopy Canter Deck", "Full Moon Viewing Deck", "Pebble Mosaic Mandala Plaza", "Nature Lab for Kids",
                "Elevated Forest Skywalk", "Hammock Theatre", "Moonlight Forest Deck", "Star Mapping Circle",
                "Forest Music Trail", "Rain-Song Installation", "Forest Canopy Amphitheatre", "Maze of Mindfulness",
                "Signature Forest Spa", "Rooted Art Installations", "Water Mirror Meditation Trail", "Cloud Gazing Plaza",
                "Forest Inspired Sculpture Garden", "Nature-Print Craft Wall", "Tree Bark Café", "Fragrance Fountain Path"
            ]
        }
    };

    const modal = document.getElementById('amenities-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalList = document.getElementById('modal-list');
    const closeModalBtn = document.querySelector('.close-modal');

    // Open Modal
    document.querySelectorAll('.btn-zone-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const zoneKey = btn.getAttribute('data-zone');
            const data = amenitiesData[zoneKey];

            if (data) {
                // Header hidden via CSS as per user request
                modalList.innerHTML = data.items.map(item => `
                    <li>
                        <i class="fas fa-gem"></i>
                        <span>${item}</span>
                    </li>
                `).join('');

                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close Modal
    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    // Close on clicking outside container
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

});

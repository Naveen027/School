document.addEventListener('DOMContentLoaded', () => {
    // Slideshow
    let slides = document.querySelectorAll(".slide");
    let index = 0;

    function showNextSlide() {
        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
    }

    setInterval(showNextSlide, 2000); // every 2 seconds

    // Modal for course cards
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("closeModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");

    const courseData = {
        'Pre-Primary (LKG & UKG)': "Our pre-primary program uses interactive and play-based learning to develop cognitive and motor skills. Children engage in storytelling, art, and games to learn naturally and joyfully.",
        'Primary (1st to 5th)': "In these formative years, students are guided through a well-structured syllabus including Math, EVS, English, and regional languages. Activities and assessments ensure overall growth.",
        'Middle School (6th to 8th)': "Students are introduced to science experiments, computer fundamentals, and project-based learning. Emphasis on communication, leadership, and self-discipline is nurtured.",
        'High School (9th & 10th)': "Our high school program prepares students for board exams through rigorous academics, career guidance, and extracurricular focus. Subject specialists ensure excellence in core areas."
    };

    document.querySelectorAll('.course-card button').forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.parentElement.querySelector('h3').innerText;
            modalTitle.innerText = title;
            modalDesc.innerText = courseData[title] || "More details coming soon.";
            modal.style.display = "flex";
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                }
            });
        });
    });
});

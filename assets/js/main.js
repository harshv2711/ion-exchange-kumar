// Grab all number elements
const countersSection = document.querySelector(".counter-card-wrapper");
const counters = document.querySelectorAll(".number");

// Store original target values & reset to 0 initially
counters.forEach(counter => {
    const target = counter.innerText.replace(/,/g, "");
    counter.dataset.target = target;
    counter.innerText = "0";
});

function animateCounter(counter) {
    const target = parseInt(counter.dataset.target, 10);
    let current = 0;
    const speed = 100; // lower = faster
    const step = Math.max(1, Math.floor(target / speed));

    // Mark as animating
    counter.dataset.animating = "true";

    const update = () => {
        if (counter.dataset.animating !== "true") return; // stop if reset

        current += step;

        if (current < target) {
            counter.innerText = current.toLocaleString("en-IN");
            requestAnimationFrame(update);
        } else {
            counter.innerText = target.toLocaleString("en-IN");
            counter.dataset.animating = "false";
        }
    };

    update();
}

// IntersectionObserver to trigger on every scroll into view
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            const sectionInView = entry.isIntersecting;

            if (sectionInView) {
                // Start animation when section enters viewport
                counters.forEach(counter => {
                    // reset to 0 before each new animation
                    counter.innerText = "0";
                    animateCounter(counter);
                });
            } else {
                // When section goes out of view, reset so it can replay next time
                counters.forEach(counter => {
                    counter.dataset.animating = "false";
                    counter.innerText = "0";
                });
            }
        });
    },
    {
        threshold: 0.3 // 30% of section visible to trigger
    }
);

// Observe the whole counter wrapper
if (countersSection) {
    observer.observe(countersSection);
}


// ISO Badge Scroll Animation
const isoItems = document.querySelectorAll(".iso-section-list li");

const observerISO = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isoItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add("show");
                    }, index * 150); // stagger animation
                });
            } else {
                // Remove animation when leaving viewport
                isoItems.forEach(item => item.classList.remove("show"));
            }
        });
    },
    { threshold: 0.3 }
);

// Observe the whole ISO section
observerISO.observe(document.querySelector(".iso-section"));
// Observe the whole ISO section end

// Grab all the number elements
const counterElements = document.querySelectorAll('.counter-number');

// Function to animate the counter
function animateCounterElement(counterElement) {
    const targetValue = parseFloat(counterElement.dataset.value); // Target value from data-value
    let currentValue = 0;
    const animationDuration = 2000; // 2 seconds animation duration
    const startTime = performance.now();

    function updateCounter(now) {
        const progress = Math.min((now - startTime) / animationDuration, 1); // Eased progress
        const easedProgress = progress * (2 - progress); // Ease-out for smooth finish

        currentValue = targetValue * easedProgress;

        // Set the number with suffix
        counterElement.textContent = currentValue % 1 === 0 
            ? Math.round(currentValue) + counterElement.nextElementSibling.textContent
            : currentValue.toFixed(1) + counterElement.nextElementSibling.textContent;

        if (progress < 1) {
            requestAnimationFrame(updateCounter); // Keep updating
        } else {
            counterElement.textContent = targetValue + counterElement.nextElementSibling.textContent; // Set final value
        }
    }

    requestAnimationFrame(updateCounter); // Start animation
}

// IntersectionObserver to trigger when section is in view
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Reset the counters before animating
            counterElements.forEach(counterElement => {
                counterElement.classList.remove('show'); // Hide the counter before starting animation
                counterElement.textContent = '0'; // Reset counter to 0
                animateCounterElement(counterElement); // Start counter animation
            });
        }
    });
}, { threshold: 0.3 }); // Trigger when 30% of the section is visible

// Start observing the section
const waterImpactSection = document.querySelector('.water-impact-dashboard-section');
sectionObserver.observe(waterImpactSection);


// Grab all the social media items
const socialIcons = document.querySelectorAll('.social-media-item');

// Function to trigger animation
function triggerSocialIconAnimation() {
    socialIcons.forEach(icon => {
        icon.classList.remove('show'); // Remove the 'show' class to reset the animation
        icon.offsetHeight; // Trigger a reflow to reset the CSS animation
        icon.classList.add('show'); // Add 'show' class again to trigger animation
    });
}

// Intersection Observer to trigger animation when icons come into view
const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            triggerSocialIconAnimation(); // Trigger animation every time the section comes into view
        }
    });
}, { threshold: 0.3 }); // Trigger when 30% of the section is visible

// Start observing the social media list container
const socialListContainer = document.querySelector('.social-media-list');
visibilityObserver.observe(socialListContainer);



function animateSustainabilitySection() {
    // Grab all the solution cards
    const solutionCards = document.querySelectorAll('.sustainability-solutions-card');

    // Function to trigger animation for each card
    function triggerSolutionCardAnimation() {
        solutionCards.forEach(card => {
            card.classList.remove('show'); // Reset animation by removing the 'show' class
            void card.offsetWidth; // Trigger reflow to reset the animation
            card.classList.add('show'); // Add 'show' class to trigger animation
        });
    }

    // Grab the CTA button
    const ctaButton = document.querySelector('.cta');

    // Function to animate the CTA button
    function triggerCTAAnimation() {
        ctaButton.classList.remove('show'); // Reset animation by removing the 'show' class
        void ctaButton.offsetWidth; // Trigger reflow to reset the animation
        ctaButton.classList.add('show'); // Add 'show' class to trigger CTA animation
    }

    // Intersection Observer to trigger animations when the section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerSolutionCardAnimation(); // Trigger animation for solution cards
                triggerCTAAnimation(); // Trigger animation for the CTA button
            }
        });
    }, { threshold: 0.3 }); // Trigger when 30% of the section is visible

    // Start observing the sustainability section
    const sustainabilitySection = document.querySelector('.sustainability-solutions-section');
    observer.observe(sustainabilitySection);
}

animateSustainabilitySection(); // Call the function to trigger the animations

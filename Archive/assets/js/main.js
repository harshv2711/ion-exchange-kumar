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

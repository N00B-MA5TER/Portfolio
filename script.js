// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Navbar scroll state =====
const navbar = document.getElementById("navbar");
const progressBar = document.getElementById("progressBar");

function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 20);

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

// ===== Scroll spy =====
const sections = document.querySelectorAll("main .section, .hero");
const navAnchors = document.querySelectorAll(".nav-link");

const spyObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navAnchors.forEach((a) => {
                    a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
                });
            }
        });
    },
    { rootMargin: "-45% 0px -45% 0px" }
);

sections.forEach((s) => spyObserver.observe(s));

// ===== Reveal on scroll =====
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ===== Hero role rotator =====
const roles = [
    "Full-Stack Developer",
    "ML / Computer Vision Engineer",
    "Problem Solver",
    "B.Tech CSE Student",
    "BATMAN",
];
const roleEl = document.getElementById("roleText");
const roleIcon = document.getElementById("roleIcon");
const BATMAN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="currentColor" d="M32,10.927c-17.944,0-32,9.444-32,21.5s14.056,21.5,32,21.5s32-9.444,32-21.5C64,20.572,49.645,10.927,32,10.927z M52.517,40.264c-1.569,1.433-3.62,3.516-6.034,4.558c3.983-6.251-3.742-9.376-7.242-2.604c-1.327-5.47-5.913-1.693-7.241,5.209c-1.328-6.902-5.914-10.679-7.241-5.209c-3.5-6.772-11.224-3.647-7.241,2.604c-2.414-1.042-4.466-3.125-6.034-4.688c-2.173-2.214-3.5-4.819-3.621-7.293c0.121-5.47,5.914-10.679,14.483-12.763c-6.035,8.596,3.741,14.716,5.431,7.033l0.724-7.684l1.69,1.953h3.62l1.69-1.953l0.724,7.684c1.69,7.553,11.466,1.563,5.431-7.033c8.569,2.214,14.362,7.423,14.483,12.893C56.017,35.446,54.69,38.05,52.517,40.264z"></path></svg>`;

let roleIndex = 0;
let charIndex = roles[0].length;
let deleting = false;

function updateRole(role, index) {
    roleEl.textContent = role.slice(0, index);

    const fullyTyped = index === role.length && role.length > 0;
    if (role === "BATMAN" && fullyTyped) {
        if (!roleIcon.dataset.loaded) {
            roleIcon.innerHTML = BATMAN_SVG;
            roleIcon.dataset.loaded = "true";
        }
        roleIcon.classList.add("visible");
    } else {
        roleIcon.classList.remove("visible");
    }
}

function typeLoop() {
    const current = roles[roleIndex];

    if (!deleting) {
        charIndex++;
        if (charIndex > current.length) {
            charIndex = current.length;
            deleting = true;
            updateRole(current, charIndex);
            setTimeout(typeLoop, 1800);
            return;
        }
    } else {
        charIndex--;
        if (charIndex < 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            charIndex = 0;
        }
    }

    updateRole(roles[roleIndex], charIndex);
    setTimeout(typeLoop, deleting ? 45 : 75);
}

setTimeout(typeLoop, 1800);

// ===== Copy email =====
const copyBtn = document.getElementById("copyEmailBtn");
const copyText = document.getElementById("copyEmailText");

if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
        const email = copyBtn.dataset.email;
        try {
            await navigator.clipboard.writeText(email);
            copyText.textContent = "Copied!";
        } catch {
            copyText.textContent = email;
        }
        setTimeout(() => {
            copyText.textContent = "Copy Email";
        }, 2000);
    });
}

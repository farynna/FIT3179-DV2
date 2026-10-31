/* Chart configurations */
const charts = [
    { id: "chart1", file: "charts/01_num_greenspaces_symbol_map.json" },
    { id: "chart2", file: "charts/02_accessibility_symbol_map.json" },
    { id: "chart3", file: "charts/03_participation_by_sex_dumbbell.json" },
    { id: "chart4", file: "charts/04_participation_by_type_lollipop.json" },
    { id: "chart5", file: "charts/05_participation_by_reason_bar.json" },
    { id: "chart6", file: "charts/06_parks_dot_map.json" },
    { id: "chart7", file: "charts/07_greenspace_mental_health_heatmap.json"},
    { id: "chart8", file: "charts/08_urban_eco_slope.json"},
    { id: "chart9", file: "charts/09_tree_change_choropleth.json"},
    { id: "chart10", file: "charts/10_veg_change_diverging_bar.json"},
];

/* Embed and centre charts */
charts.forEach(({ id, file }) => {
    vegaEmbed(`#${id}`, file, {
        actions: false
    })
    .then(() => {
        const embed = document.querySelector(`#${id} .vega-embed`);

        if (embed) {
            embed.style.marginInline = "auto";
        }
    })
    .catch(console.error);
});

/* Scroll animations */
document.documentElement.classList.add("js");

const targets = document.querySelectorAll(
    "header h1, header p, section h2, section h3, section h4, section p, [id^='chart'], footer"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px"
    }
);

/* Stagger elements that share a parent */
const counts = new Map();

targets.forEach((el) => {
    const i = counts.get(el.parentElement) || 0;
    counts.set(el.parentElement, i + 1);

    el.style.transitionDelay = `${Math.min(i, 4) * 100}ms`;
    el.classList.add("reveal");
    observer.observe(el);
});
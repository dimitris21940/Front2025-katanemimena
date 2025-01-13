const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404: "/pages/404.html",
    "/": "/pages/index.html",
    "/about": "/pages/about.html",
    "/lorem": "/pages/lorem.html",
    "/signup": "/pages/signup.html",
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;

    // Dynamically load specific JavaScript for each route
    loadScriptForRoute(path);
};

const loadScriptForRoute = (path) => {
    const scriptTag = document.getElementById("route-script");

    // Remove any existing route-specific script
    if (scriptTag) {
        scriptTag.remove();
    }

    // Load route-specific script
    let scriptSrc = "";
    if (path === "/signup") {
        scriptSrc = "/js/signup.js";
    }

    if (scriptSrc) {
        const script = document.createElement("script");
        script.src = scriptSrc;
        script.id = "route-script";
        document.body.appendChild(script);
    }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();

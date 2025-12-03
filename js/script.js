(function () {

    document.querySelectorAll("script[src*='MathJax']").forEach(s => s.remove());

    if (!document.getElementById("MathJax-script")) {
        const script = document.createElement("script");
        script.id = "MathJax-script";
        script.async = true;
        script.src = "https://cdn.jsdelivr.net/npm/mathjax@4.0.0/tex-mml-chtml.js";

        const head = document.head;
        const title = head.querySelector("title");

        if (title) head.insertBefore(script, title);
        else head.prepend(script);
    }
})();

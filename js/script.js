/* =====================================================
   BIRTHDAY WEBSITE - MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   SURPRISE POPUP
===================================================== */

function openSurprise() {

    const popup = document.getElementById("popup");

    if (popup) {
        popup.classList.add("show");
    }

    createHearts(25);
}


function closeSurprise() {

    const popup = document.getElementById("popup");

    if (popup) {
        popup.classList.remove("show");
    }
}


/* =====================================================
   MEMORY DATA
===================================================== */

const memories = [

    {
        image: "images/memories1.jpg",
        caption: "Silly Moments ❤️"
    },

    {
        image: "images/memories2.jpg",
        caption: "Fun Days ❤️"
    },

    {
        image: "images/memories3.jpg",
        caption: "Travel Vibes ❤️"
    },

    {
        image: "images/memories4.jpg",
        caption: "My Smile ❤️"
    },

    {
        image: "images/memories5.jpg",
        caption: "Beautiful Days ❤️"
    }

];


let currentMemory = 0;


/* =====================================================
   MEMORY CAROUSEL
===================================================== */

function updateMemory() {

    const cards =
        document.querySelectorAll(".memory-card");


    /*
        If the page does not have
        memory cards, use the old
        single-image system.
    */

    if (cards.length === 0) {

        const image =
            document.getElementById("memoryImage");

        const caption =
            document.getElementById("memoryCaption");


        if (image) {

            image.src =
                memories[currentMemory].image;

        }


        if (caption) {

            caption.innerText =
                memories[currentMemory].caption;

        }

    }


    /*
        New 5-card carousel
    */

    else {

        cards.forEach((card, index) => {

            const memoryIndex =
                (currentMemory + index) %
                memories.length;


            const image =
                card.querySelector("img");


            const caption =
                card.querySelector(".caption");


            if (image) {

                image.src =
                    memories[memoryIndex].image;

                image.alt =
                    memories[memoryIndex].caption;

            }


            if (caption) {

                caption.innerText =
                    memories[memoryIndex].caption;

            }

        });

    }


    /* =================================================
       UPDATE DOTS
    ================================================= */

    const dots =
        document.querySelectorAll(".dot");


    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentMemory
        );

    });

}


/* =====================================================
   NEXT MEMORY
===================================================== */

function nextMemory() {

    currentMemory++;

    if (
        currentMemory >=
        memories.length
    ) {

        currentMemory = 0;

    }

    updateMemory();

}


/* =====================================================
   PREVIOUS MEMORY
===================================================== */

function previousMemory() {

    currentMemory--;

    if (currentMemory < 0) {

        currentMemory =
            memories.length - 1;

    }

    updateMemory();

}


/* =====================================================
   ARROW BUTTONS
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const nextBtn =
            document.getElementById("nextBtn");

        const prevBtn =
            document.getElementById("prevBtn");


        if (nextBtn) {

            nextBtn.addEventListener(
                "click",
                nextMemory
            );

        }


        if (prevBtn) {

            prevBtn.addEventListener(
                "click",
                previousMemory
            );

        }


        /*
            Load the first set of
            memory images immediately.
        */

        updateMemory();

    }
);


/* =====================================================
   BLOW CANDLES
===================================================== */

function blowCandles() {

    const flames =
        document.querySelectorAll(".flame");


    flames.forEach(flame => {

        flame.style.display = "none";

    });


    /*
        Create lots of hearts
        after blowing candles.
    */

    createHearts(60);


    setTimeout(() => {

        alert(
            "🎉 Wish granted! Happy Birthday My Love! ❤️"
        );

    }, 500);

}


/* =====================================================
   FLOATING HEART
===================================================== */

function createHeart() {

    const container =
        document.getElementById("hearts");


    const heart =
        document.createElement("div");


    heart.className =
        "heart";


    heart.innerHTML =
        "♥";


    /*
        Random horizontal position
    */

    heart.style.left =
        Math.random() * 100 + "vw";


    /*
        Random size
    */

    heart.style.fontSize =
        (16 + Math.random() * 22) + "px";


    /*
        Random animation speed
    */

    heart.style.animationDuration =
        (5 + Math.random() * 4) + "s";


    /*
        Random delay
    */

    heart.style.animationDelay =
        (Math.random() * 0.5) + "s";


    /*
        Put heart inside the
        floating-hearts container
        if it exists.
    */

    if (container) {

        container.appendChild(heart);

    }

    else {

        document.body.appendChild(heart);

    }


    /*
        Remove after animation
    */

    setTimeout(() => {

        heart.remove();

    }, 10000);

}


/* =====================================================
   CREATE MULTIPLE HEARTS
===================================================== */

function createHearts(amount) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        setTimeout(
            createHeart,
            i * 100
        );

    }

}


/* =====================================================
   AUTOMATIC FLOATING HEARTS
===================================================== */

setInterval(() => {

    createHeart();

}, 700);


/* =====================================================
   INITIAL HEARTS
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
            Create a few hearts immediately
            when the page opens.
        */

        createHearts(8);

    }
);


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "ArrowRight") {

            nextMemory();

        }


        if (event.key === "ArrowLeft") {

            previousMemory();

        }

    }
);
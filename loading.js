/* =========================================================
   MYSPACE - LOADING SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const slider = document.getElementById("slider");
    const button = document.getElementById("sliderButton");

    let dragging = false;
    let startX = 0;
    let currentX = 0;

    const getMaxX = () => {
        return slider.offsetWidth - button.offsetWidth - 10;
    };


    /* =====================================================
       START DRAG
    ===================================================== */

    function startDrag(event) {

        dragging = true;

        slider.classList.add("dragging");

        startX = getClientX(event) - button.offsetLeft;

        button.style.transition = "none";

        event.preventDefault();
    }


    /* =====================================================
       DRAG
    ===================================================== */

    function moveDrag(event) {

        if (!dragging) return;

        const clientX = getClientX(event);

        currentX = clientX - startX;

        const maxX = getMaxX();

        currentX = Math.max(0, Math.min(currentX, maxX));

        button.style.left = `${currentX}px`;
    }


    /* =====================================================
       END DRAG
    ===================================================== */

    function endDrag() {

        if (!dragging) return;

        dragging = false;

        slider.classList.remove("dragging");

        button.style.transition =
            "left 0.25s cubic-bezier(.22,1,.36,1), transform 0.2s";


        const maxX = getMaxX();

        /*
         * ต้องเลื่อนถึงประมาณ 80%
         * จึงถือว่าสำเร็จ
         */

        if (currentX >= maxX * 0.8) {

            button.style.left = `${maxX}px`;

            slider.classList.add("success");

            setTimeout(() => {

                window.location.href = "home.html";

            }, 450);

        } else {

            button.style.left = "5px";

        }

    }


    /* =====================================================
       GET MOUSE / TOUCH POSITION
    ===================================================== */

    function getClientX(event) {

        if (event.touches && event.touches.length) {
            return event.touches[0].clientX;
        }

        if (event.changedTouches && event.changedTouches.length) {
            return event.changedTouches[0].clientX;
        }

        return event.clientX;
    }


    /* =====================================================
       MOUSE
    ===================================================== */

    button.addEventListener("mousedown", startDrag);

    document.addEventListener("mousemove", moveDrag);

    document.addEventListener("mouseup", endDrag);


    /* =====================================================
       TOUCH
    ===================================================== */

    button.addEventListener("touchstart", startDrag, {
        passive: false
    });

    document.addEventListener("touchmove", moveDrag, {
        passive: false
    });

    document.addEventListener("touchend", endDrag);


});
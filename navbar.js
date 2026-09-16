// =========================================================
// MYSPACE - NAVBAR
// components/navbar.js
// =========================================================


document.addEventListener('DOMContentLoaded', function () {

    const navbarContainer = document.getElementById('navbar');

    // -----------------------------------------------------
    // ตรวจสอบว่ามีพื้นที่สำหรับ Navbar หรือไม่
    // -----------------------------------------------------

    if (!navbarContainer) {
        console.warn('Navbar container #navbar not found.');
        return;
    }


    // -----------------------------------------------------
    // โหลด navbar.html
    // -----------------------------------------------------

    fetch('components/navbar.html')
        .then(function (response) {

            if (!response.ok) {
                throw new Error(
                    'Cannot load components/navbar.html'
                );
            }

            return response.text();
        })

        .then(function (html) {

            navbarContainer.innerHTML = html;

            initNavbar();
        })

        .catch(function (error) {

            console.error(
                'Navbar loading error:',
                error
            );

            navbarContainer.innerHTML = '';
        });

});


// =========================================================
// INITIALIZE NAVBAR
// =========================================================

function initNavbar() {

    const navButtons =
        document.querySelectorAll(
            '#bottom-nav .nav-btn'
        );


    // -----------------------------------------------------
    // ถ้าไม่มีปุ่ม Navbar
    // -----------------------------------------------------

    if (!navButtons.length) {
        console.warn('Navbar buttons not found.');
        return;
    }


    // -----------------------------------------------------
    // Event ของแต่ละปุ่ม
    // -----------------------------------------------------

    navButtons.forEach(function (button) {

        button.addEventListener('click', function () {

            const page = this.dataset.page;

            if (!page) {
                return;
            }


            // -------------------------------------------------
            // เรียก showPage() จาก script หลัก
            // -------------------------------------------------

            if (typeof window.showPage === 'function') {

                window.showPage(
                    page,
                    this
                );

            } else {

                console.warn(
                    'showPage() is not available.'
                );

            }

        });

    });

}
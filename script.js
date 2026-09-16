/* =========================================================
   MY SPACE
   MAIN APPLICATION JAVASCRIPT
========================================================= */


/* =========================================================
   DATA
========================================================= */

let data = {
    budgets: [],
    passwords: [],
    reminders: [],
    notes: [],
    bills: []
};


/* =========================================================
   DEFAULT BILLS
========================================================= */

const DEFAULT_BILLS = [
    {
        name: 'ค่าเช่าบ้าน',
        amount: 0,
        due: 1,
        cat: 'housing',
        note: '',
        paid: false
    },
    {
        name: 'ค่างวดรถ',
        amount: 0,
        due: 5,
        cat: 'vehicle',
        note: '',
        paid: false
    },
    {
        name: 'ค่าอินเตอร์เน็ต',
        amount: 0,
        due: 10,
        cat: 'utility',
        note: '',
        paid: false
    },
    {
        name: 'ค่าผ่อนเกม',
        amount: 0,
        due: 15,
        cat: 'entertainment',
        note: '',
        paid: false
    },
    {
        name: 'ค่าการศึกษา',
        amount: 0,
        due: 10,
        cat: 'education',
        note: '',
        paid: false
    },
    {
        name: 'ค่างวดทอง',
        amount: 0,
        due: 5,
        cat: 'investment',
        note: '',
        paid: false
    },
    {
        name: 'ค่าน้ำมัน',
        amount: 0,
        due: 0,
        cat: 'vehicle',
        note: 'เติมสม่ำเสมอ',
        paid: false
    },
    {
        name: 'ค่ากินรายเดือน',
        amount: 0,
        due: 0,
        cat: 'food',
        note: '',
        paid: false
    },
    {
        name: 'บัญชีร้านอาหาร',
        amount: 0,
        due: 30,
        cat: 'business',
        note: '',
        paid: false
    }
];


/* =========================================================
   LOAD LOCAL STORAGE
========================================================= */

try {

    const stored = localStorage.getItem('myspace-data');

    if (stored) {

        const parsed = JSON.parse(stored);

        data = {
            ...data,
            ...parsed
        };
    }

} catch (error) {

    console.error('ไม่สามารถโหลดข้อมูลได้', error);

}


/* =========================================================
   DEFAULT BILL INITIALIZATION
========================================================= */

if (!data.bills || !data.bills.length) {

    data.bills = DEFAULT_BILLS.map((bill, index) => ({
        ...bill,
        id: Date.now() + index
    }));

}


/* =========================================================
   CAR INITIALIZATION
========================================================= */

if (!data.car) {
    data.car = {};
}


/*
   FIX CAR DATA

   1. brand
   2. model
   3. trim
   4. year
   5. color
   6. plate
   7. province
   8. vin
   9. engineNumber
   10. engine
   11. fuel
   12. gear
   13. drive
   14. seats
   15. tank
   16. tire
*/


/* =========================================================
   SAVE
========================================================= */

function save() {

    try {

        localStorage.setItem(
            'myspace-data',
            JSON.stringify(data)
        );

    } catch (error) {

        console.error('ไม่สามารถบันทึกข้อมูลได้', error);

    }

}


/* =========================================================
   DATE
========================================================= */

const now = new Date();

const thD = [
    'อาทิตย์',
    'จันทร์',
    'อังคาร',
    'พุธ',
    'พฤหัส',
    'ศุกร์',
    'เสาร์'
];

const thM = [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ต.ค.',
    'พ.ย.',
    'ธ.ค.'
];


const todayDate = document.getElementById('today-date');

if (todayDate) {

    todayDate.textContent =
        `วัน${thD[now.getDay()]} ${now.getDate()} ${thM[now.getMonth()]}`;

}


/* =========================================================
   PAGE TITLES
========================================================= */

const PT = {

    overview: 'ภาพรวม',
    bills: 'กำหนดการจ่าย',
    passwords: 'รหัสผ่าน',
    reminders: 'เตือนความจำ',
    more: 'เพิ่มเติม',
    car: 'รถยนต์ของฉัน'

};


/* =========================================================
   SHOW PAGE
========================================================= */

function showPage(id, navEl) {

    document
        .querySelectorAll('.page')
        .forEach(page => {
            page.classList.remove('active');
        });


    document
        .querySelectorAll('.nav-btn')
        .forEach(nav => {
            nav.classList.remove('active');
        });


    const page = document.getElementById(`page-${id}`);

    if (page) {
        page.classList.add('active');
    }


    if (navEl) {

        navEl.classList.add('active');

    } else {

        const nav = document.querySelector(
            `.nav-btn[data-page="${id}"]`
        );

        if (nav) {
            nav.classList.add('active');
        }

    }


    const title = document.getElementById('page-title');

    if (title) {
        title.textContent = PT[id] || id;
    }


    const fab = document.getElementById('fab-btn');

    if (fab) {

        fab.style.display =
            id === 'car'
                ? 'none'
                : '';

    }


    if (id === 'overview') {
        renderOverview();
    }

    if (id === 'bills') {
        renderBills();
    }

    if (id === 'passwords') {
        renderPasswords();
    }

    if (id === 'reminders') {
        renderReminders();
    }

    if (id === 'more') {

        renderBudget();
        renderNotes();
        renderMoreCarPreview();

    }

    if (id === 'car') {
        renderCarPage();
    }

}


/* =========================================================
   OPEN CAR PAGE
========================================================= */

function openCarPage() {

    document
        .querySelectorAll('.page')
        .forEach(page => {
            page.classList.remove('active');
        });


    const carPage = document.getElementById('page-car');

    if (carPage) {
        carPage.classList.add('active');
    }


    const title = document.getElementById('page-title');

    if (title) {
        title.textContent = 'รถยนต์ของฉัน';
    }


    const fab = document.getElementById('fab-btn');

    if (fab) {
        fab.style.display = 'none';
    }


    renderCarPage();

}


/* =========================================================
   MORE TABS
========================================================= */

function switchMoreTab(btn, tabId) {

    document
        .querySelectorAll('#page-more .tab')
        .forEach(tab => {
            tab.classList.remove('active');
        });


    if (btn) {
        btn.classList.add('active');
    }


    [
        'tab-m-budget',
        'tab-m-summary'
    ].forEach(id => {

        const el = document.getElementById(id);

        if (el) {
            el.style.display = 'none';
        }

    });


    const selected = document.getElementById(tabId);

    if (selected) {
        selected.style.display = 'block';
    }


    if (tabId === 'tab-m-summary') {
        renderBudgetSummary();
    }

}


/* =========================================================
   MODALS
========================================================= */

function openAddModal() {

    const modal = document.getElementById('modal-add');

    if (modal) {
        modal.classList.add('open');
    }

}


function openBudgetModal() {

    const modal = document.getElementById('modal-budget');

    if (modal) {
        modal.classList.add('open');
    }

}


function openPassModal() {

    const modal = document.getElementById('modal-pass');

    if (modal) {
        modal.classList.add('open');
    }

}


function openReminderModal() {

    const modal = document.getElementById('modal-reminder');

    if (modal) {
        modal.classList.add('open');
    }

}


function openNoteModal() {

    const modal = document.getElementById('modal-note');

    if (modal) {
        modal.classList.add('open');
    }

}


function closeModal(id) {

    const modal = document.getElementById(id);

    if (modal) {
        modal.classList.remove('open');
    }

}


/* =========================================================
   BILL MODAL
========================================================= */

function openBillModal(id) {

    const editId = document.getElementById('bill-edit-id');
    const title = document.getElementById('bill-modal-title');

    if (editId) {
        editId.value = id || '';
    }


    if (id) {

        const bill = data.bills.find(
            item => item.id == id
        );

        if (!bill) return;


        if (title) {
            title.textContent = 'แก้ไขรายการ';
        }


        const name = document.getElementById('bill-name');
        const amount = document.getElementById('bill-amount');
        const due = document.getElementById('bill-due');
        const cat = document.getElementById('bill-cat');
        const note = document.getElementById('bill-note');


        if (name) name.value = bill.name || '';
        if (amount) amount.value = bill.amount || '';
        if (due) due.value = bill.due || '';
        if (cat) cat.value = bill.cat || 'other';
        if (note) note.value = bill.note || '';


    } else {

        if (title) {
            title.textContent = 'เพิ่มบิล';
        }


        [
            'bill-name',
            'bill-amount',
            'bill-due',
            'bill-note'
        ].forEach(id => {

            const el = document.getElementById(id);

            if (el) {
                el.value = '';
            }

        });


        const cat = document.getElementById('bill-cat');

        if (cat) {
            cat.value = 'other';
        }

    }


    const modal = document.getElementById('modal-bill');

    if (modal) {
        modal.classList.add('open');
    }

}


/* =========================================================
   CLOSE MODAL BY BACKDROP
========================================================= */

document
    .querySelectorAll('.modal-overlay')
    .forEach(modal => {

        modal.addEventListener('click', event => {

            if (event.target === modal) {
                modal.classList.remove('open');
            }

        });

    });


/* =========================================================
   NOTE COLORS
========================================================= */

document
    .querySelectorAll('.color-pick')
    .forEach(color => {

        color.addEventListener('click', () => {

            document
                .querySelectorAll('.color-pick')
                .forEach(item => {
                    item.style.border =
                        '2px solid transparent';
                });


            color.style.border =
                '2px solid var(--text)';


            const colorInput =
                document.getElementById('n-color');

            if (colorInput) {
                colorInput.value =
                    color.dataset.c;
            }

        });

    });


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const toast =
        document.getElementById('toast');

    if (!toast) return;


    toast.textContent = message;

    toast.classList.add('show');


    setTimeout(() => {

        toast.classList.remove('show');

    }, 2000);

}


/* =========================================================
   SVG ICONS
========================================================= */

const CI = {

    housing:
        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>`,

    vehicle:
        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-4h10l2 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
            <circle cx="7.5" cy="17.5" r="2.5"/>
            <circle cx="16.5" cy="17.5" r="2.5"/>
        </svg>`,

    utility:
        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
        </svg>`,

    entertainment:
        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="6" width="20" height="12" rx="2"/>
            <path d="M6 12h4M8 10v4M15 11h.01M17 13h.01"/>
        </svg>`,

    education:
        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>`,

    investment:
        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
            <polyline points="16,7 22,7 22,13"/>
        </svg>`,

    food:
        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
            <line x1="6" y1="1" x2="6" y2="4"/>
            <line x1="10" y1="1" x2="10" y2="4"/>
            <line x1="14" y1="1" x2="14" y2="4"/>
        </svg>`,

    business:
        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <path d="M9 22V12h6v10"/>
        </svg>`,

    other:
        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        </svg>`

};


const CL = {

    housing: 'ที่อยู่อาศัย',
    vehicle: 'ยานพาหนะ',
    utility: 'สาธารณูปโภค',
    entertainment: 'บันเทิง',
    education: 'การศึกษา',
    investment: 'ลงทุน/ออม',
    food: 'อาหาร',
    business: 'ธุรกิจ',
    other: 'อื่นๆ'

};


const DEL =
    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6l-1 14H6L5 6"/>
        <path d="M10 11v6M14 11v6"/>
        <path d="M9 6V4h6v2"/>
    </svg>`;


const EDIT =
    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>`;


const CHK =
    `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <polyline points="20,6 9,17 4,12"/>
    </svg>`;


/* =========================================================
   BILLS
========================================================= */

function saveBill() {

    const editId =
        document.getElementById('bill-edit-id')?.value;

    const name =
        document.getElementById('bill-name')?.value.trim();

    const amount =
        parseFloat(
            document.getElementById('bill-amount')?.value
        ) || 0;

    const due =
        parseInt(
            document.getElementById('bill-due')?.value
        ) || 0;

    const cat =
        document.getElementById('bill-cat')?.value;

    const note =
        document.getElementById('bill-note')?.value.trim();


    if (!name) {

        alert('กรุณาใส่ชื่อรายการ');

        return;
    }


    if (editId) {

        const bill =
            data.bills.find(
                item => item.id == editId
            );

        if (bill) {

            bill.name = name;
            bill.amount = amount;
            bill.due = due;
            bill.cat = cat;
            bill.note = note;

        }

    } else {

        data.bills.push({

            id: Date.now(),
            name,
            amount,
            due,
            cat,
            note,
            paid: false

        });

    }


    save();

    closeModal('modal-bill');

    renderBills();
    renderOverview();
    updateBillsBadge();

    showToast('บันทึกแล้ว');

}


function toggleBillPaid(id) {

    const bill =
        data.bills.find(
            item => item.id === id
        );


    if (!bill) return;


    bill.paid = !bill.paid;

    save();

    renderBills();
    renderOverview();
    updateBillsBadge();

}


function deleteBill(id) {

    data.bills =
        data.bills.filter(
            item => item.id !== id
        );


    save();

    renderBills();
    renderOverview();
    updateBillsBadge();

}


/* =========================================================
   RENDER BILLS
========================================================= */

function renderBills() {

    const container =
        document.getElementById(
            'bills-list-container'
        );

    if (!container) return;


    const totalAmount =
        data.bills.reduce(
            (sum, bill) =>
                sum + Number(bill.amount || 0),
            0
        );


    const paidAmount =
        data.bills
            .filter(bill => bill.paid)
            .reduce(
                (sum, bill) =>
                    sum + Number(bill.amount || 0),
                0
            );


    const unpaidAmount =
        totalAmount - paidAmount;


    const paidCount =
        data.bills.filter(
            bill => bill.paid
        ).length;


    const paidPercent =
        totalAmount
            ? Math.round(
                paidAmount /
                totalAmount *
                100
            )
            : 0;


    const update = (id, value) => {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent = value;
        }

    };


    update(
        'bill-total-amount',
        '฿' + totalAmount.toLocaleString()
    );


    update(
        'bill-paid-amount',
        '฿' + paidAmount.toLocaleString()
    );


    update(
        'bill-unpaid-amount',
        '฿' + unpaidAmount.toLocaleString()
    );


    update(
        'bill-paid-count',
        paidCount + ' รายการ'
    );


    update(
        'bill-unpaid-count',
        (data.bills.length - paidCount) +
        ' รายการ'
    );


    const progress =
        document.getElementById(
            'bill-paid-bar'
        );

    if (progress) {
        progress.style.width =
            paidPercent + '%';
    }


    if (!data.bills.length) {

        container.innerHTML = `
            <div class="list-card">
                <div class="empty">
                    <div class="empty-text">
                        ยังไม่มีบิล
                    </div>
                </div>
            </div>
        `;

        return;
    }


    const today =
        new Date().getDate();


    const groups = {};


    data.bills.forEach(bill => {

        if (!groups[bill.cat]) {
            groups[bill.cat] = [];
        }

        groups[bill.cat].push(bill);

    });


    container.innerHTML =
        Object.entries(groups)
            .map(([cat, bills]) => {

                const categoryTotal =
                    bills.reduce(
                        (sum, bill) =>
                            sum +
                            Number(bill.amount || 0),
                        0
                    );


                const rows =
                    bills.map(bill => {

                        const overdue =
                            bill.due > 0 &&
                            today > bill.due &&
                            !bill.paid;


                        const soon =
                            bill.due > 0 &&
                            today >= bill.due - 3 &&
                            today <= bill.due &&
                            !bill.paid;


                        let badge = '';


                        if (bill.paid) {

                            badge =
                                `<span class="tag tag-light">จ่ายแล้ว</span>`;

                        } else if (overdue) {

                            badge =
                                `<span class="tag tag-dark">เลยกำหนด</span>`;

                        } else if (soon) {

                            badge =
                                `<span class="tag tag-mid">ใกล้ครบ</span>`;

                        } else if (bill.due > 0) {

                            badge =
                                `<span class="tag tag-light">
                                    วันที่ ${bill.due}
                                </span>`;

                        }


                        return `
                            <div class="list-item">

                                <button
                                    class="check-btn ${bill.paid ? 'done' : ''}"
                                    onclick="toggleBillPaid(${bill.id})"
                                >
                                    ${bill.paid ? CHK : ''}
                                </button>

                                <div class="item-info">

                                    <div
                                        class="item-name"
                                        style="${bill.paid
                                            ? 'text-decoration:line-through;color:var(--text-muted);'
                                            : ''
                                        }"
                                    >
                                        ${bill.name}
                                    </div>

                                    ${
                                        bill.note
                                            ? `<div class="item-sub">
                                                ${bill.note}
                                               </div>`
                                            : ''
                                    }

                                </div>

                                ${badge}

                                <div
                                    class="item-right"
                                    style="margin-left:4px;"
                                >
                                    <div class="item-amount">
                                        ฿${Number(
                                            bill.amount || 0
                                        ).toLocaleString()}
                                    </div>
                                </div>

                                <button
                                    class="icon-btn"
                                    onclick="openBillModal(${bill.id})"
                                >
                                    ${EDIT}
                                </button>

                                <button
                                    class="icon-btn"
                                    onclick="deleteBill(${bill.id})"
                                >
                                    ${DEL}
                                </button>

                            </div>
                        `;

                    }).join('');


                return `
                    <div
                        class="list-card"
                        style="margin-bottom:12px;"
                    >

                        <div
                            style="
                                display:flex;
                                align-items:center;
                                justify-content:space-between;
                                padding:10px 14px 6px;
                                border-bottom:1px solid var(--border);
                            "
                        >

                            <div
                                style="
                                    display:flex;
                                    align-items:center;
                                    gap:6px;
                                    font-size:11px;
                                    font-weight:600;
                                    color:var(--text-muted);
                                "
                            >
                                ${CI[cat] || ''}
                                ${CL[cat] || cat}
                            </div>

                            <div
                                style="
                                    font-family:'DM Mono',monospace;
                                    font-size:11px;
                                    color:var(--text-muted);
                                "
                            >
                                ฿${categoryTotal.toLocaleString()}
                            </div>

                        </div>

                        ${rows}

                    </div>
                `;

            })
            .join('');

}


function updateBillsBadge() {

    const badge =
        document.getElementById(
            'bills-badge'
        );

    if (!badge) return;


    const unpaid =
        data.bills.filter(
            bill => !bill.paid
        ).length;


    if (unpaid > 0) {

        badge.textContent = unpaid;
        badge.style.display = 'flex';

    } else {

        badge.style.display = 'none';

    }

}


function resetAllBills() {

    if (
        !confirm(
            'รีเซ็ตสถานะทั้งหมด?'
        )
    ) {
        return;
    }


    data.bills.forEach(
        bill => {
            bill.paid = false;
        }
    );


    save();

    renderBills();
    renderOverview();
    updateBillsBadge();

    showToast('รีเซ็ตแล้ว');

}


/* =========================================================
   BUDGET
========================================================= */

function saveBudget() {

    const name =
        document.getElementById('b-name')
            ?.value.trim();

    const spent =
        parseFloat(
            document.getElementById('b-spent')
                ?.value
        ) || 0;

    const limit =
        parseFloat(
            document.getElementById('b-limit')
                ?.value
        ) || 0;


    if (!name) {

        alert('กรุณาใส่ชื่อหมวด');

        return;
    }


    data.budgets.push({

        id: Date.now(),
        name,
        spent,
        limit

    });


    save();

    closeModal('modal-budget');


    [
        'b-name',
        'b-spent',
        'b-limit'
    ].forEach(id => {

        const el =
            document.getElementById(id);

        if (el) {
            el.value = '';
        }

    });


    renderBudget();
    renderOverview();

    showToast('เพิ่มแล้ว');

}


function deleteBudget(id) {

    data.budgets =
        data.budgets.filter(
            budget =>
                budget.id !== id
        );


    save();

    renderBudget();
    renderOverview();

}


function renderBudget() {

    const container =
        document.getElementById(
            'budget-list-container'
        );

    if (!container) return;


    if (!data.budgets.length) {

        container.innerHTML = `
            <div class="empty">
                <div class="empty-text">
                    ยังไม่มีหมวด
                </div>
            </div>
        `;

        return;
    }


    container.innerHTML =
        data.budgets
            .map(budget => {

                const percent =
                    budget.limit
                        ? Math.min(
                            100,
                            Math.round(
                                budget.spent /
                                budget.limit *
                                100
                            )
                        )
                        : 0;


                const over =
                    budget.limit &&
                    budget.spent >
                    budget.limit;


                return `
                    <div class="list-item">

                        <div class="item-info">

                            <div class="item-name">
                                ${budget.name}
                            </div>

                            ${
                                budget.limit
                                    ? `
                                        <div class="progress-bar">
                                            <div
                                                class="progress-fill"
                                                style="
                                                    width:${percent}%;
                                                    background:${
                                                        over
                                                            ? 'var(--danger)'
                                                            : 'var(--text)'
                                                    };
                                                "
                                            ></div>
                                        </div>
                                      `
                                    : ''
                            }

                            <div class="item-sub">

                                ${percent}%

                                ${
                                    budget.limit
                                        ? ` ของ ฿${Number(
                                            budget.limit
                                        ).toLocaleString()}`
                                        : ''
                                }

                                ${
                                    over
                                        ? ' (เกินงบ!)'
                                        : ''
                                }

                            </div>

                        </div>


                        <div class="item-right">

                            <div
                                class="item-amount"
                                style="
                                    color:${
                                        over
                                            ? 'var(--danger)'
                                            : 'var(--text)'
                                    };
                                "
                            >
                                ฿${Number(
                                    budget.spent || 0
                                ).toLocaleString()}
                            </div>

                            ${
                                budget.limit
                                    ? `
                                        <div class="item-sub">
                                            / ฿${Number(
                                                budget.limit
                                            ).toLocaleString()}
                                        </div>
                                      `
                                    : ''
                            }

                        </div>


                        <button
                            class="icon-btn"
                            onclick="deleteBudget(${budget.id})"
                        >
                            ${DEL}
                        </button>

                    </div>
                `;

            })
            .join('');

}


function renderBudgetSummary() {

    const container =
        document.getElementById(
            'budget-summary-content'
        );

    if (
        !container ||
        !data.budgets.length
    ) {
        return;
    }


    const total =
        data.budgets.reduce(
            (sum, budget) =>
                sum +
                Number(budget.spent || 0),
            0
        );


    const totalLimit =
        data.budgets.reduce(
            (sum, budget) =>
                sum +
                Number(budget.limit || 0),
            0
        );


    container.innerHTML = `

        <div style="margin-bottom:16px;">

            <div
                style="
                    font-size:28px;
                    font-weight:700;
                    letter-spacing:-1px;
                "
            >
                ฿${total.toLocaleString()}
            </div>

            <div
                style="
                    font-size:12px;
                    color:var(--text-muted);
                "
            >
                ${
                    totalLimit
                        ? `จาก ฿${totalLimit.toLocaleString()}`
                        : 'รวมทั้งหมด'
                }
            </div>

        </div>

        ${
            data.budgets
                .map(budget => {

                    const percent =
                        total
                            ? Math.round(
                                budget.spent /
                                total *
                                100
                            )
                            : 0;


                    return `
                        <div
                            style="
                                display:flex;
                                align-items:center;
                                gap:10px;
                                margin-bottom:10px;
                            "
                        >

                            <div
                                style="
                                    width:8px;
                                    height:8px;
                                    border-radius:50%;
                                    background:var(--text);
                                    flex-shrink:0;
                                "
                            ></div>

                            <span
                                style="
                                    flex:1;
                                    font-size:13px;
                                "
                            >
                                ${budget.name}
                            </span>

                            <span
                                style="
                                    font-family:'DM Mono',monospace;
                                    font-size:12px;
                                "
                            >
                                ฿${Number(
                                    budget.spent || 0
                                ).toLocaleString()}
                            </span>

                            <span
                                style="
                                    font-size:11px;
                                    color:var(--text-muted);
                                    width:30px;
                                    text-align:right;
                                "
                            >
                                ${percent}%
                            </span>

                        </div>
                    `;

                })
                .join('')
        }

    `;

}


/* =========================================================
   PASSWORDS
========================================================= */

function savePassword() {

    const name =
        document.getElementById('p-name')
            ?.value.trim();

    const user =
        document.getElementById('p-user')
            ?.value.trim();

    const pass =
        document.getElementById('p-pass')
            ?.value;

    const note =
        document.getElementById('p-note')
            ?.value.trim();


    if (!name || !pass) {

        alert(
            'กรุณาใส่ชื่อและรหัสผ่าน'
        );

        return;
    }


    data.passwords.push({

        id: Date.now(),
        name,
        user,
        pass,
        note

    });


    save();

    closeModal('modal-pass');


    [
        'p-name',
        'p-user',
        'p-pass',
        'p-note'
    ].forEach(id => {

        const el =
            document.getElementById(id);

        if (el) {
            el.value = '';
        }

    });


    renderPasswords();
    renderOverview();

    showToast('บันทึกแล้ว');

}


function deletePassword(id) {

    data.passwords =
        data.passwords.filter(
            password =>
                password.id !== id
        );


    save();

    renderPasswords();
    renderOverview();

}


function toggleShowPass(id) {

    const element =
        document.querySelector(
            `[data-pass-id="${id}"]`
        );


    const password =
        data.passwords.find(
            item => item.id === id
        );


    if (
        !element ||
        !password
    ) {
        return;
    }


    element.textContent =
        element.textContent === '••••••••'
            ? password.pass
            : '••••••••';

}


function copyPass(id) {

    const password =
        data.passwords.find(
            item => item.id === id
        );


    if (!password) return;


    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(password.pass)
            .then(() => {
                showToast('คัดลอกแล้ว');
            })
            .catch(() => {
                alert('ไม่สามารถคัดลอกได้');
            });

    }

}


function renderPasswords() {

    const container =
        document.getElementById(
            'password-list-container'
        );

    if (!container) return;


    if (!data.passwords.length) {

        container.innerHTML = `
            <div class="empty">
                <div class="empty-text">
                    ยังไม่มีรหัสที่บันทึก
                </div>
            </div>
        `;

        return;
    }


    container.innerHTML =
        data.passwords
            .map(password => {

                return `
                    <div class="list-item">

                        <div
                            class="item-icon"
                            style="
                                font-size:15px;
                                font-weight:700;
                            "
                        >
                            ${password.name[0].toUpperCase()}
                        </div>


                        <div class="item-info">

                            <div class="item-name">
                                ${password.name}
                            </div>

                            <div class="item-sub">
                                ${
                                    password.user ||
                                    password.note ||
                                    '—'
                                }
                            </div>

                            <div
                                class="pass-value"
                                data-pass-id="${password.id}"
                            >
                                ••••••••
                            </div>

                        </div>


                        <div class="item-action">

                            <button
                                class="icon-btn"
                                onclick="toggleShowPass(${password.id})"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="3"
                                    />
                                </svg>
                            </button>


                            <button
                                class="icon-btn"
                                onclick="copyPass(${password.id})"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <rect
                                        x="9"
                                        y="9"
                                        width="13"
                                        height="13"
                                        rx="2"
                                    />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                </svg>
                            </button>


                            <button
                                class="icon-btn"
                                onclick="deletePassword(${password.id})"
                            >
                                ${DEL}
                            </button>

                        </div>

                    </div>
                `;

            })
            .join('');

}


/* =========================================================
   REMINDERS
========================================================= */

function saveReminder() {

    const title =
        document.getElementById('r-title')
            ?.value.trim();

    const date =
        document.getElementById('r-date')
            ?.value;

    const priority =
        document.getElementById('r-priority')
            ?.value;


    if (!title) {

        alert('กรุณาใส่รายการ');

        return;
    }


    data.reminders.push({

        id: Date.now(),
        title,
        date,
        priority,
        done: false

    });


    save();

    closeModal('modal-reminder');


    const titleInput =
        document.getElementById('r-title');

    if (titleInput) {
        titleInput.value = '';
    }


    renderReminders();
    renderOverview();

    showToast('เพิ่มแล้ว');

}


function toggleReminder(id) {

    const reminder =
        data.reminders.find(
            item => item.id === id
        );


    if (!reminder) return;


    reminder.done =
        !reminder.done;


    save();

    renderReminders();
    renderOverview();

}


function deleteReminder(id) {

    data.reminders =
        data.reminders.filter(
            reminder =>
                reminder.id !== id
        );


    save();

    renderReminders();
    renderOverview();

}


function renderReminders() {

    const container =
        document.getElementById(
            'reminder-list-container'
        );

    if (!container) return;


    if (!data.reminders.length) {

        container.innerHTML = `
            <div class="empty">
                <div class="empty-text">
                    ยังไม่มีรายการ
                </div>
            </div>
        `;

        return;
    }


    const sorted =
        [...data.reminders].sort(
            (a, b) =>
                (a.done - b.done) ||
                (a.priority === 'high'
                    ? -1
                    : 1)
        );


    const tagClass = {

        high: 'tag-dark',
        med: 'tag-mid',
        low: 'tag-light'

    };


    const tagText = {

        high: 'ด่วน',
        med: 'กลาง',
        low: 'ทั่วไป'

    };


    container.innerHTML =
        sorted
            .map(reminder => {

                return `
                    <div class="list-item">

                        <button
                            class="check-btn ${
                                reminder.done
                                    ? 'done'
                                    : ''
                            }"
                            onclick="toggleReminder(${reminder.id})"
                        >
                            ${
                                reminder.done
                                    ? CHK
                                    : ''
                            }
                        </button>


                        <div class="item-info">

                            <div
                                class="item-name"
                                style="${
                                    reminder.done
                                        ? 'text-decoration:line-through;color:var(--text-muted);'
                                        : ''
                                }"
                            >
                                ${reminder.title}
                            </div>


                            ${
                                reminder.date
                                    ? `
                                        <div class="item-sub">
                                            ${reminder.date}
                                        </div>
                                      `
                                    : ''
                            }

                        </div>


                        <span
                            class="tag ${
                                tagClass[
                                    reminder.priority
                                ]
                            }"
                        >
                            ${
                                tagText[
                                    reminder.priority
                                ]
                            }
                        </span>


                        <button
                            class="icon-btn"
                            onclick="deleteReminder(${reminder.id})"
                        >
                            ${DEL}
                        </button>

                    </div>
                `;

            })
            .join('');

}


/* =========================================================
   NOTES
========================================================= */

function saveNote() {

    const title =
        document.getElementById('n-title')
            ?.value.trim();

    const body =
        document.getElementById('n-body')
            ?.value.trim();

    const color =
        document.getElementById('n-color')
            ?.value;


    if (!title) {

        alert('กรุณาใส่หัวข้อ');

        return;
    }


    data.notes.push({

        id: Date.now(),
        title,
        body,
        color,
        date:
            new Date()
                .toLocaleDateString('th-TH')

    });


    save();

    closeModal('modal-note');


    const titleInput =
        document.getElementById('n-title');

    const bodyInput =
        document.getElementById('n-body');


    if (titleInput) {
        titleInput.value = '';
    }

    if (bodyInput) {
        bodyInput.value = '';
    }


    renderNotes();

    showToast('บันทึกแล้ว');

}


function deleteNote(id) {

    data.notes =
        data.notes.filter(
            note =>
                note.id !== id
        );


    save();

    renderNotes();

}


function renderNotes() {

    const container =
        document.getElementById(
            'notes-container'
        );

    if (!container) return;


    if (!data.notes.length) {

        container.innerHTML = `
            <div
                class="empty"
                style="grid-column:1/-1;"
            >
                <div class="empty-text">
                    ยังไม่มีโน้ต
                </div>
            </div>
        `;

        return;
    }


    container.innerHTML =
        data.notes
            .map(note => {

                return `
                    <div
                        class="note-card"
                        style="
                            background:${note.color};
                            border:1px solid ${
                                note.color === '#F0EFEB'
                                    ? 'var(--border)'
                                    : 'transparent'
                            };
                        "
                    >

                        <div
                            style="
                                display:flex;
                                justify-content:space-between;
                                align-items:flex-start;
                            "
                        >

                            <div class="note-title">
                                ${note.title}
                            </div>


                            <button
                                onclick="deleteNote(${note.id})"
                                style="
                                    background:none;
                                    border:none;
                                    cursor:pointer;
                                    font-size:16px;
                                    color:var(--text-muted);
                                    padding:0 0 0 4px;
                                "
                            >
                                ×
                            </button>

                        </div>


                        <div class="note-body">
                            ${note.body || ''}
                        </div>


                        <div class="note-date">
                            ${note.date}
                        </div>

                    </div>
                `;

            })
            .join('');

}


/* =========================================================
   OVERVIEW
========================================================= */

function renderOverview() {

    const totalSpent =
        data.budgets.reduce(
            (sum, budget) =>
                sum +
                Number(budget.spent || 0),
            0
        );


    const totalLimit =
        data.budgets.reduce(
            (sum, budget) =>
                sum +
                Number(budget.limit || 0),
            0
        );


    const update = (id, value) => {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent = value;
        }

    };


    update(
        'ov-spent',
        totalSpent.toLocaleString()
    );


    update(
        'ov-total',
        totalLimit.toLocaleString()
    );


    update(
        'ov-passwords',
        data.passwords.length
    );


    update(
        'ov-todos',
        data.reminders.filter(
            reminder => !reminder.done
        ).length
    );


    const unpaidBills =
        data.bills.filter(
            bill => !bill.paid
        );


    update(
        'ov-bills-count',
        unpaidBills.length
    );


    const billList =
        document.getElementById(
            'ov-bills-list'
        );


    if (billList) {

        if (!unpaidBills.length) {

            billList.innerHTML = `
                <div class="list-item">

                    <div class="item-info">

                        <div
                            class="item-name"
                            style="color:var(--text-muted);"
                        >
                            จ่ายครบทุกบิลแล้ว
                        </div>

                    </div>

                </div>
            `;

        } else {

            const today =
                new Date().getDate();


            billList.innerHTML =
                unpaidBills
                    .slice(0, 4)
                    .map(bill => {

                        return `
                            <div class="list-item">

                                <div class="item-icon">
                                    ${
                                        CI[bill.cat] ||
                                        CI.other
                                    }
                                </div>


                                <div class="item-info">

                                    <div class="item-name">
                                        ${bill.name}
                                    </div>


                                    <div class="item-sub">

                                        ${
                                            bill.due > 0
                                                ? (
                                                    today >
                                                    bill.due
                                                        ? `เลยวันที่ ${bill.due}`
                                                        : `วันที่ ${bill.due}`
                                                  )
                                                : ''
                                        }

                                    </div>

                                </div>


                                <div class="item-right">

                                    <div class="item-amount">
                                        ฿${Number(
                                            bill.amount || 0
                                        ).toLocaleString()}
                                    </div>

                                </div>

                            </div>
                        `;

                    })
                    .join('');

        }

    }


    const reminderList =
        document.getElementById(
            'ov-reminder-list'
        );


    if (reminderList) {

        const pending =
            data.reminders
                .filter(
                    reminder =>
                        !reminder.done
                )
                .slice(0, 3);


        const tagClass = {

            high: 'tag-dark',
            med: 'tag-mid',
            low: 'tag-light'

        };


        const tagText = {

            high: 'ด่วน',
            med: 'กลาง',
            low: 'ทั่วไป'

        };


        if (!pending.length) {

            reminderList.innerHTML = `
                <div class="list-item">

                    <div class="item-info">

                        <div
                            class="item-name"
                            style="color:var(--text-muted);"
                        >
                            ไม่มีรายการค้าง
                        </div>

                    </div>

                </div>
            `;

        } else {

            reminderList.innerHTML =
                pending
                    .map(reminder => {

                        return `
                            <div class="list-item">

                                <button
                                    class="check-btn"
                                    onclick="toggleReminder(${reminder.id})"
                                ></button>


                                <div class="item-info">

                                    <div class="item-name">
                                        ${reminder.title}
                                    </div>


                                    ${
                                        reminder.date
                                            ? `
                                                <div class="item-sub">
                                                    ${reminder.date}
                                                </div>
                                              `
                                            : ''
                                    }

                                </div>


                                <span
                                    class="tag ${
                                        tagClass[
                                            reminder.priority
                                        ]
                                    }"
                                >
                                    ${
                                        tagText[
                                            reminder.priority
                                        ]
                                    }
                                </span>

                            </div>
                        `;

                    })
                    .join('');

        }

    }

}


/* =========================================================
   =========================================================
   CAR SECTION
   =========================================================
========================================================= */


/* =========================================================
   CAR FIX FIELD DEFINITIONS
========================================================= */

const CAR_FIX_FIELDS = [

    {
        key: 'brand',
        id: 'car-fix-brand',
        label: 'ยี่ห้อรถ',
        placeholder: 'เช่น Toyota',
        type: 'text'
    },

    {
        key: 'model',
        id: 'car-fix-model',
        label: 'รุ่นรถ',
        placeholder: 'เช่น Yaris Ativ',
        type: 'text'
    },

    {
        key: 'trim',
        id: 'car-fix-trim',
        label: 'รุ่นย่อย / Trim',
        placeholder: 'เช่น Sport, Premium',
        type: 'text'
    },

    {
        key: 'year',
        id: 'car-fix-year',
        label: 'ปีรถ',
        placeholder: 'เช่น 2022',
        type: 'number'
    },

    {
        key: 'color',
        id: 'car-fix-color',
        label: 'สีรถ',
        placeholder: 'เช่น ขาว',
        type: 'text'
    },

    {
        key: 'plate',
        id: 'car-fix-plate',
        label: 'ทะเบียนรถ',
        placeholder: 'เช่น กข 1234',
        type: 'text'
    },

    {
        key: 'province',
        id: 'car-fix-province',
        label: 'จังหวัดทะเบียน',
        placeholder: 'เช่น พิษณุโลก',
        type: 'text'
    },

    {
        key: 'vin',
        id: 'car-fix-vin',
        label: 'เลขตัวถัง (VIN)',
        placeholder: 'กรอกเลข VIN',
        type: 'text'
    },

    {
        key: 'engineNumber',
        id: 'car-fix-engine-number',
        label: 'เลขเครื่องยนต์',
        placeholder: 'กรอกเลขเครื่องยนต์',
        type: 'text'
    },

    {
        key: 'engine',
        id: 'car-fix-engine',
        label: 'ขนาดเครื่องยนต์',
        placeholder: 'เช่น 1.5L / 1,500 cc',
        type: 'text'
    },

    {
        key: 'fuel',
        id: 'car-fix-fuel',
        label: 'ประเภทเชื้อเพลิง',
        placeholder: 'เลือกประเภทเชื้อเพลิง',
        type: 'select',
        options: [
            ['', 'เลือกประเภท'],
            ['เบนซิน', 'เบนซิน'],
            ['ดีเซล', 'ดีเซล'],
            ['Hybrid', 'Hybrid'],
            ['EV', 'EV']
        ]
    },

    {
        key: 'gear',
        id: 'car-fix-gear',
        label: 'ระบบเกียร์',
        placeholder: 'เลือกเกียร์',
        type: 'select',
        options: [
            ['', 'เลือกระบบเกียร์'],
            ['AT', 'AT'],
            ['CVT', 'CVT'],
            ['MT', 'MT'],
            ['DCT', 'DCT']
        ]
    },

    {
        key: 'drive',
        id: 'car-fix-drive',
        label: 'ระบบขับเคลื่อน',
        placeholder: 'เลือกระบบขับเคลื่อน',
        type: 'select',
        options: [
            ['', 'เลือกระบบขับเคลื่อน'],
            ['2WD', '2WD'],
            ['4WD', '4WD'],
            ['AWD', 'AWD']
        ]
    },

    {
        key: 'seats',
        id: 'car-fix-seats',
        label: 'จำนวนที่นั่ง',
        placeholder: 'เช่น 5',
        type: 'number'
    },

    {
        key: 'tank',
        id: 'car-fix-tank',
        label: 'ความจุถังน้ำมัน',
        placeholder: 'เช่น 42 L',
        type: 'text'
    },

    {
        key: 'tire',
        id: 'car-fix-tire',
        label: 'ขนาดยาง',
        placeholder: 'เช่น 195/55 R16',
        type: 'text'
    }

];


/* =========================================================
   CREATE FIX FORM INSIDE CAR MODAL
========================================================= */

function ensureCarFixForm() {

    const modal =
        document.getElementById(
            'modal-car'
        );


    if (!modal) return;


    if (
        document.getElementById(
            'car-fix-form'
        )
    ) {
        return;
    }


    const modalBody =
        modal.querySelector('.modal');


    if (!modalBody) return;


    const existingFooter =
        modalBody.querySelector(
            '.modal-footer'
        );


    const section =
        document.createElement('div');


    section.id =
        'car-fix-form';


    section.className =
        'car-fix-form';


    section.innerHTML = `

        <div
            style="
                margin:6px 0 14px;
                padding-top:10px;
                border-top:1px solid var(--border);
            "
        >

            <div
                style="
                    font-size:13px;
                    font-weight:600;
                    margin-bottom:4px;
                "
            >
                ข้อมูลรถพื้นฐาน
            </div>

            <div
                style="
                    font-size:11px;
                    color:var(--text-muted);
                "
            >
                ข้อมูล FIX ของรถยนต์
            </div>

        </div>

    `;


    CAR_FIX_FIELDS.forEach(field => {

        const group =
            document.createElement('div');


        group.className =
            'form-group car-fix-group';


        const label =
            document.createElement('label');


        label.className =
            'form-label';


        label.textContent =
            field.label;


        group.appendChild(label);


        let input;


        if (field.type === 'select') {

            input =
                document.createElement('select');


            input.className =
                'form-input';


            field.options.forEach(option => {

                const opt =
                    document.createElement('option');


                opt.value =
                    option[0];

                opt.textContent =
                    option[1];


                input.appendChild(opt);

            });

        } else {

            input =
                document.createElement('input');


            input.className =
                'form-input';


            input.type =
                field.type;


            input.placeholder =
                field.placeholder;


            if (
                field.type === 'number'
            ) {

                input.min = '0';

            }

        }


        input.id =
            field.id;


        group.appendChild(input);


        section.appendChild(group);

    });


    if (existingFooter) {

        modalBody.insertBefore(
            section,
            existingFooter
        );

    } else {

        modalBody.appendChild(
            section
        );

    }

}


/* =========================================================
   OPEN CAR EDIT MODAL
========================================================= */

function openCarEditModal() {

    ensureCarFixForm();


    const car =
        data.car || {};


    /* =========================================
       OLD CAR DATA
    ========================================= */

    const setValue = (
        id,
        value
    ) => {

        const element =
            document.getElementById(id);

        if (element) {
            element.value =
                value ?? '';
        }

    };


    setValue(
        'ce-model',
        car.model || ''
    );


    setValue(
        'ce-plate',
        car.plate || ''
    );


    setValue(
        'ce-price',
        car.price || ''
    );


    setValue(
        'ce-tax-renew',
        car.taxRenew || ''
    );


    setValue(
        'ce-tax-expire',
        car.taxExpire || ''
    );


    setValue(
        'ce-ins-type',
        car.insType || ''
    );


    setValue(
        'ce-ins-year',
        car.insYear || ''
    );


    setValue(
        'ce-ins-expire',
        car.insExpire || ''
    );


    setValue(
        'ce-license-expire',
        car.licenseExpire || ''
    );


    /* =========================================
       FIX CAR DATA
    ========================================= */

    CAR_FIX_FIELDS.forEach(field => {

        const element =
            document.getElementById(
                field.id
            );


        if (!element) return;


        element.value =
            car[field.key] ?? '';

    });


    const modal =
        document.getElementById(
            'modal-car'
        );


    if (modal) {
        modal.classList.add('open');
    }

}


/* =========================================================
   SAVE CAR DATA
========================================================= */

function saveCarData() {

    if (!data.car) {
        data.car = {};
    }


    /* =========================================
       OLD CAR DATA
    ========================================= */

    const getValue = id => {

        const element =
            document.getElementById(id);

        return element
            ? element.value.trim()
            : '';

    };


    data.car.model =
        getValue('ce-model');


    data.car.plate =
        getValue('ce-plate');


    data.car.price =
        parseFloat(
            document.getElementById(
                'ce-price'
            )?.value
        ) || 0;


    data.car.taxRenew =
        document.getElementById(
            'ce-tax-renew'
        )?.value || '';


    data.car.taxExpire =
        document.getElementById(
            'ce-tax-expire'
        )?.value || '';


    data.car.insType =
        document.getElementById(
            'ce-ins-type'
        )?.value || '';


    data.car.insYear =
        document.getElementById(
            'ce-ins-year'
        )?.value || '';


    data.car.insExpire =
        document.getElementById(
            'ce-ins-expire'
        )?.value || '';


    data.car.licenseExpire =
        document.getElementById(
            'ce-license-expire'
        )?.value || '';


    /* =========================================
       FIX CAR DATA
    ========================================= */

    CAR_FIX_FIELDS.forEach(field => {

        const element =
            document.getElementById(
                field.id
            );


        if (!element) return;


        let value =
            element.value.trim();


        if (
            field.type === 'number'
        ) {

            value =
                value === ''
                    ? ''
                    : Number(value);

        }


        data.car[field.key] =
            value;

    });


    /* =========================================
       BACKWARD COMPATIBILITY
       
       model / plate จาก FIX
       จะถูกใช้กับระบบเดิมด้วย
    ========================================= */

    if (
        data.car.model === '' &&
        data.car.model !== undefined
    ) {

        data.car.model =
            data.car.model;

    }


    if (
        data.car.plate === '' &&
        data.car.plate !== undefined
    ) {

        data.car.plate =
            data.car.plate;

    }


    save();


    closeModal('modal-car');


    renderCarPage();
    renderMoreCarPreview();


    showToast(
        'บันทึกข้อมูลรถแล้ว'
    );

}


/* =========================================================
   OPEN CAR INFORMATION MODAL
========================================================= */

function openCarInfoModal() {

    const car =
        data.car || {};


    const setText = (
        id,
        value
    ) => {

        const element =
            document.getElementById(id);

        if (element) {

            element.textContent =
                value === undefined ||
                value === null ||
                value === ''
                    ? '—'
                    : value;

        }

    };


    setText(
        'ci-brand',
        car.brand
    );


    setText(
        'ci-model',
        car.model
    );


    setText(
        'ci-trim',
        car.trim
    );


    setText(
        'ci-year',
        car.year
    );


    setText(
        'ci-color',
        car.color
    );


    setText(
        'ci-plate',
        car.plate
    );


    setText(
        'ci-province',
        car.province
    );


    setText(
        'ci-vin',
        car.vin
    );


    setText(
        'ci-engine-number',
        car.engineNumber
    );


    setText(
        'ci-engine',
        car.engine
    );


    setText(
        'ci-fuel',
        car.fuel
    );


    setText(
        'ci-gear',
        car.gear
    );


    setText(
        'ci-drive',
        car.drive
    );


    setText(
        'ci-seats',
        car.seats
            ? `${car.seats} ที่นั่ง`
            : ''
    );


    setText(
        'ci-tank',
        car.tank
    );


    setText(
        'ci-tire',
        car.tire
    );


    const modal =
        document.getElementById(
            'modal-car-info'
        );


    if (modal) {
        modal.classList.add('open');
    }

}


/* =========================================================
   CAR IMAGE
========================================================= */

function handleCarImage(event) {

    const file =
        event.target.files?.[0];


    if (!file) return;


    const reader =
        new FileReader();


    reader.onload = e => {

        if (!data.car) {
            data.car = {};
        }


        data.car.image =
            e.target.result;


        save();

        renderCarPage();

    };


    reader.readAsDataURL(file);

}


/* =========================================================
   LICENSE IMAGE
========================================================= */

function handleLicenseImage(event) {

    const file =
        event.target.files?.[0];


    if (!file) return;


    const reader =
        new FileReader();


    reader.onload = e => {

        if (!data.car) {
            data.car = {};
        }


        data.car.licenseImage =
            e.target.result;


        save();

        renderCarPage();

    };


    reader.readAsDataURL(file);

}


/* =========================================================
   CAR MEMO
========================================================= */

function saveCarMemo() {

    if (!data.car) {
        data.car = {};
    }


    const memo =
        document.getElementById(
            'car-memo'
        );


    if (memo) {

        data.car.memo =
            memo.value;

    }


    save();

}


/* =========================================================
   DATE HELPERS
========================================================= */

function daysUntil(dateString) {

    if (!dateString) {
        return null;
    }


    const target =
        new Date(dateString);


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    return Math.ceil(
        (
            target -
            today
        ) /
        864e5
    );

}


function fmtDate(dateString) {

    if (!dateString) {
        return '—';
    }


    const date =
        new Date(dateString);


    if (Number.isNaN(date.getTime())) {
        return '—';
    }


    return `
        ${date.getDate()}
        ${thM[date.getMonth()]}
        ${date.getFullYear() + 543}
    `.replace(/\s+/g, ' ').trim();

}


function docStatus(dateString) {

    const days =
        daysUntil(dateString);


    if (days === null) {

        return {
            text: '—'
        };

    }


    if (days < 0) {

        return {

            text:
                `! หมดอายุแล้ว (${Math.abs(days)} วัน)`,

            color:
                'var(--danger)'

        };

    }


    if (days <= 30) {

        return {

            text:
                `○ เหลือ ${days} วัน`,

            color:
                'var(--warning)'

        };

    }


    return {

        text:
            `● เหลือ ${days} วัน`,

        color:
            'var(--text-muted)'

    };

}


/* =========================================================
   RENDER CAR PAGE
========================================================= */

function renderCarPage() {

    const car =
        data.car || {};


    /* =========================================
       CAR PHOTO
    ========================================= */

    const preview =
        document.getElementById(
            'car-img-preview'
        );


    const placeholder =
        document.getElementById(
            'car-img-placeholder'
        );


    if (
        car.image &&
        preview &&
        placeholder
    ) {

        preview.src =
            car.image;

        preview.style.display =
            'block';

        placeholder.style.display =
            'none';

    } else if (
        preview &&
        placeholder
    ) {

        preview.style.display =
            'none';

        placeholder.style.display =
            'flex';

    }


    /* =========================================
       BASIC CAR INFO
    ========================================= */

    const setText = (
        id,
        value
    ) => {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent =
                value;
        }

    };


    const displayModel =
        car.model ||
        (
            car.brand &&
            car.model
                ? `${car.brand} ${car.model}`
                : ''
        ) ||
        'ยังไม่ได้ตั้งค่า';


    setText(
        'car-model-text',
        displayModel
    );


    setText(
        'car-plate-text',
        car.plate ||
        'ทะเบียนรถ'
    );


    setText(
        'car-plate-badge',
        car.plate ||
        '—'
    );


    /* =========================================
       PRICE
    ========================================= */

    setText(
        'car-price-val',
        car.price
            ? '฿' +
              Number(
                  car.price
              ).toLocaleString()
            : '฿0'
    );


    /* =========================================
       TAX
    ========================================= */

    const taxStatus =
        docStatus(
            car.taxExpire
        );


    setText(
        'car-tax-renew',
        'วันต่อ: ' +
        fmtDate(
            car.taxRenew
        )
    );


    setText(
        'car-tax-expire',
        fmtDate(
            car.taxExpire
        )
    );


    const taxStatusElement =
        document.getElementById(
            'car-tax-status'
        );


    if (taxStatusElement) {

        taxStatusElement.textContent =
            taxStatus.text;

        taxStatusElement.style.color =
            taxStatus.color || '';

    }


    /* =========================================
       INSURANCE
    ========================================= */

    const insuranceStatus =
        docStatus(
            car.insExpire
        );


    setText(
        'car-ins-type',
        car.insType
            ? car.insType +
              (
                  car.insYear
                      ? ' ปี ' +
                        car.insYear
                      : ''
              )
            : '—'
    );


    setText(
        'car-ins-expire',
        fmtDate(
            car.insExpire
        )
    );


    const insuranceStatusElement =
        document.getElementById(
            'car-ins-status'
        );


    if (insuranceStatusElement) {

        insuranceStatusElement.textContent =
            insuranceStatus.text;

        insuranceStatusElement.style.color =
            insuranceStatus.color || '';

    }


    /* =========================================
       LICENSE
    ========================================= */

    const licenseStatus =
        docStatus(
            car.licenseExpire
        );


    setText(
        'car-license-expire',
        fmtDate(
            car.licenseExpire
        )
    );


    const licenseStatusElement =
        document.getElementById(
            'car-license-status'
        );


    if (licenseStatusElement) {

        licenseStatusElement.textContent =
            licenseStatus.text;

        licenseStatusElement.style.color =
            licenseStatus.color || '';

    }


    /* =========================================
       LICENSE IMAGE
    ========================================= */

    const licenseWrap =
        document.getElementById(
            'car-license-img-wrap'
        );


    const licenseImage =
        document.getElementById(
            'car-license-img'
        );


    if (
        car.licenseImage &&
        licenseWrap &&
        licenseImage
    ) {

        licenseImage.src =
            car.licenseImage;

        licenseWrap.style.display =
            'block';

    } else if (licenseWrap) {

        licenseWrap.style.display =
            'none';

    }


    /* =========================================
       CAR MEMO
    ========================================= */

    const memo =
        document.getElementById(
            'car-memo'
        );


    if (
        memo &&
        car.memo !== undefined
    ) {

        memo.value =
            car.memo;

    }

}


/* =========================================================
   MORE CAR PREVIEW
========================================================= */

function renderMoreCarPreview() {

    const car =
        data.car || {};


    const model =
        document.getElementById(
            'more-car-model'
        );


    const plate =
        document.getElementById(
            'more-car-plate'
        );


    if (model) {

        model.textContent =
            car.model ||
            (
                car.brand
                    ? car.brand
                    : 'ยังไม่ได้ตั้งค่ารถ'
            );

    }


    if (plate) {

        plate.textContent =
            car.plate
                ? 'ทะเบียน: ' +
                  car.plate
                : 'แตะเพื่อดูข้อมูล';

    }

}


/* =========================================================
   INITIALIZE
========================================================= */

renderOverview();

renderBills();

updateBillsBadge();

renderPasswords();

renderReminders();

renderBudget();

renderNotes();

renderMoreCarPreview();

save();
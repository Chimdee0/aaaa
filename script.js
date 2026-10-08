// ========================================
// FIREBASE REALTIME DATABASE
// ========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";


const firebaseConfig = {

    apiKey: "AIzaSyB_hCDM6jt0hHP-I_PQiFs3Es0lkHLUwD0",

    authDomain: "aagii-f5b5a.firebaseapp.com",

    databaseURL:
        "https://aagii-f5b5a-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "aagii-f5b5a",

    storageBucket:
        "aagii-f5b5a.firebasestorage.app",

    messagingSenderId: "27138583563",

    appId:
        "1:27138583563:web:e87dfc3853d57a62e26b0e",

    measurementId: "G-KYV7TJKX00"
};


// Initialize Firebase

const app =
    initializeApp(firebaseConfig);

const db =
    getDatabase(app);

const circusSong = new Audio("circus.mp3");
circusSong.volume = 0.8;

// ========================================
// SAVE RESPONSE
// ========================================

async function saveResponse(data) {

    try {

        const responseRef =
            push(ref(db, "responses"));

        await set(responseRef, {

            ...data,

            timestamp:
                new Date().toISOString()

        });

        console.log("✅ Response saved!", data);

    } catch (error) {

        console.error(
            "❌ Firebase error:",
            error
        );

    }

}

// ========================================
// YES / NO BUTTONS
// ========================================


const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const limitedYesBtn =
    document.getElementById("limitedYesBtn");
const message = document.getElementById("message");

let noCount = 0;

const messages = [
    "Itgeltee bnuu? 👀",
    "Neeree gj vv? Dahiad 1 bodood vz",
    "Hariult chn ene gej vv? 😭",
    "Okay... Svvleesee 2 dahi bolomj.",
    "Zaza, shiidweriig chn hundelj bnaa, Amjilt!😂"
];


// ========================================
// NO BUTTON
// ========================================

noBtn.addEventListener("click", function() {

    noCount++;
    noBtn.style.position = "fixed";
    saveResponse({
        action: "NO",
        noClicks: noCount
    });

    if (noCount < messages.length) {

        message.textContent =
            messages[noCount - 1];

        // Make NO smaller
        const noScale =
            Math.max(0.3, 1 - noCount * 0.18);

        // Get button size
        const buttonWidth = noBtn.offsetWidth;
        const buttonHeight = noBtn.offsetHeight;

        // Keep button inside the screen
        const maxX =
            window.innerWidth - buttonWidth - 20;

        const maxY =
            window.innerHeight - buttonHeight - 20;

        // Random position anywhere on screen
        const randomX =
            Math.random() * maxX + 10;

        const randomY =
            Math.random() * maxY + 10;
        noBtn.style.position = "absolute";

        noBtn.style.left =
            randomX + "px";

        noBtn.style.top =
            randomY + "px";

        noBtn.style.transform =
            `rotate(${Math.random() * 20 - 10}deg)
             scale(${noScale})`;

        // Make YES bigger
        const yesScale =
            1 + noCount * 0.4;

        yesBtn.style.transform =
            `scale(${yesScale})`;

    } else {

        message.textContent =
            messages[messages.length - 1];

        noBtn.style.transform =
            "scale(0.3)";

        yesBtn.style.transform =
            "scale(2.25)";

    }

});


// ========================================
// SCREEN TRANSITION
// ========================================

function transitionScreen(callback) {

    const card = document.querySelector(".card");

    card.classList.add("transition-out");

    setTimeout(function() {

        callback();

        card.classList.remove("transition-out");
        card.classList.add("transition-in");

        setTimeout(function() {
            card.classList.remove("transition-in");
        }, 450);

    }, 350);
}


// ========================================
// YES BUTTON
// ========================================

// ========================================
// YES BUTTON
// ========================================

yesBtn.addEventListener("click", function() {

    // 🎪 PLAY MUSIC IMMEDIATELY
    circusSong.currentTime = 0;
    circusSong.play();

    // Save YES
    saveResponse({
        action: "YES",
        noClicks: noCount
    });

    // First fade out the current screen
    transitionScreen(function() {

        // ========================================
        // 8 SECOND DANCING SCREEN
        // ========================================

        document.getElementById("emoji").textContent = "🕺😭";

        document.getElementById("title").textContent =
            "Chimdee yg odoo:";

        document.getElementById("question").innerHTML = `
            <img
                src="giphy.gif"
                alt="Dancing"
                style="
                    width: 220px;
                    max-width: 80%;
                    border-radius: 15px;
                    display: block;
                    margin: 15px auto;
                "
            >
            <div id="countdown"
                style="
                    font-size: 32px;
                    font-weight: bold;
                    margin-top: 10px;
                ">
                8
            </div>
        `;

        document.getElementById("buttons").innerHTML = "";

        message.textContent = "";

        // ========================================
        // COUNTDOWN
        // ========================================

        let seconds = 8;

        const countdown =
            document.getElementById("countdown");

        const timer = setInterval(function() {

            seconds--;

            if (seconds > 0) {

                countdown.textContent = seconds;

            } else {

                clearInterval(timer);

                // ========================================
                // YAAAY SCREEN
                // ========================================

                transitionScreen(function() {

                    document.getElementById("emoji").textContent =
                        "🎉";

                    document.getElementById("title").textContent =
                        "YAAAY!";

                    document.getElementById("question").textContent =
                        "Okay, Юу хйимээр байна? 😎";

                    document.getElementById("buttons").innerHTML = `

                        <div class="activity-grid">

                            <button class="activity"
                                    data-activity="Coffee">
                                ☕
                                <span>Coffee</span>
                            </button>

                            <button class="activity"
                                    data-activity="Pizza">
                                🍕
                                <span>Pizza</span>
                            </button>

                            <button class="activity"
                                    data-activity="Burger">
                                🍔
                                <span>Burger</span>
                            </button>

                            <button class="activity"
                                    data-activity="Хүлэгүүдийг үзье">
                                🏀
                                <span>Хүлэгүүдийг үзэх</span>
                            </button>

                            <button class="activity"
                                    data-activity="Ууланд алхалт">
                                🏔️
                                <span>Ууланд гарах</span>
                            </button>

                            <button class="activity"
                                    data-activity="КИНО">
                                🎬
                                <span>Кино (ер нь дэмий)</span>
                            </button>

                        </div>

                    `;

                    message.textContent = "";

                    addActivityListeners();

                });

            }

        }, 1000);

    });

});
// ========================================
// 2 HOUR YES BUTTON
// ========================================

limitedYesBtn.addEventListener("click", function() {

    yesBtn.click();

});

// ========================================
// ACTIVITY BUTTONS
// ========================================

function addActivityListeners() {

    const activities =
        document.querySelectorAll(".activity");

    activities.forEach(function(button) {

        button.addEventListener("click", function() {

            const activity =
                button.dataset.activity;
            saveResponse({
                    action: "ACTIVITY",
                    activity: activity,
                    noClicks: noCount
            });

            transitionScreen(function() {

                document.getElementById("emoji").textContent =
                    "😎";

                document.getElementById("title").textContent =
                    "Niiice сонголт 😎";

                document.getElementById("question").innerHTML =
                    `Тэгхээр... <strong>${activity}</strong>?<br><br>
                     Хэзээ?`;

                document.getElementById("buttons").innerHTML = `
                    <button id="nextBtn">
                        өдөрөө сонгоё →
                    </button>
                `;

                message.textContent = "";

                document.getElementById("nextBtn")
                    .addEventListener("click", function() {

                        showCalendar(activity);

                    });

            });

        });

    });

}


// ========================================
// CALENDAR SCREEN
// ========================================

function showCalendar(activity) {

    transitionScreen(function() {

        document.getElementById("emoji").textContent =
            "📅";

        document.getElementById("title").textContent =
            "";

        document.getElementById("question").textContent =
            `amraltiin uduruur chn ch ymuu! ${activity}?`;

        document.getElementById("buttons").innerHTML = `

            <div class="calendar">

                <div class="calendar-header">

                    <button id="prevMonth">‹</button>

                    <strong id="monthYear"></strong>

                    <button id="nextMonth">›</button>

                </div>

                <div class="weekdays">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                </div>

                <div id="calendarDays"
                     class="calendar-days">
                </div>

            </div>

            <button id="confirmDate" disabled>
                CONFIRM DATE →
            </button>

        `;

        message.textContent = "";

        createCalendar(activity);

    });

}


// ========================================
// CALENDAR LOGIC
// ========================================

let calendarDate = new Date();
let selectedDate = null;

function createCalendar(activity) {

    const calendarDays =
        document.getElementById("calendarDays");

    const monthYear =
        document.getElementById("monthYear");

    const confirmBtn =
        document.getElementById("confirmDate");

    const year =
        calendarDate.getFullYear();

    const month =
        calendarDate.getMonth();

    const firstDay =
        new Date(year, month, 1).getDay();

    const daysInMonth =
        new Date(year, month + 1, 0).getDate();

    monthYear.textContent =
        calendarDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
        });

    calendarDays.innerHTML = "";

    // ========================================
    // MY UNAVAILABLE DATES
    // ========================================

    const unavailableDates = {
        "2026-10-12": "Бүтэн ажилтай",
        "2026-10-13": "Дүүтэйгээ Shopping хийнэ",
        "2026-10-19": "Тайлан тавих өдөр",
        "2026-10-20": "Хүлэгүүдтэй бэлтгэлтэй",
        "2026-10-26": "Дүүгийн шалгалтанд бэлдэлцэх",
        "2026-10-27": "Бясалгалын анги эхлүүлэх"
    };

    // ========================================
    // EMPTY SPACES
    // ========================================

    for (let i = 0; i < firstDay; i++) {

        const empty =
            document.createElement("div");

        calendarDays.appendChild(empty);

    }

    // ========================================
    // DAYS
    // ========================================

    for (let day = 1; day <= daysInMonth; day++) {

        const button =
            document.createElement("button");

        button.textContent = day;

        const date =
            new Date(year, month, day);

        const today =
            new Date();

        today.setHours(0, 0, 0, 0);

        // Create YYYY-MM-DD
        const dateKey =
            date.getFullYear() + "-" +
            String(date.getMonth() + 1).padStart(2, "0") + "-" +
            String(date.getDate()).padStart(2, "0");

        // ========================================
        // PAST DATE
        // ========================================

        if (date < today) {

            button.disabled = true;
            button.classList.add("past");

        }

        // ========================================
        // MY UNAVAILABLE DATE
        // ========================================

        if (unavailableDates[dateKey]) {

            button.disabled = true;
            button.classList.add("unavailable");

        }

        // ========================================
        // AVAILABLE DATE
        // ========================================

        if (
            date >= today &&
            !unavailableDates[dateKey]
        ) {

            button.addEventListener("click", function() {

                document
                    .querySelectorAll(".calendar-days button")
                    .forEach(function(btn) {
                        btn.classList.remove("selected");
                    });

                button.classList.add("selected");

                selectedDate = date;

                confirmBtn.disabled = false;

            });

        }

        calendarDays.appendChild(button);

    }

    // ========================================
    // MY SCHEDULE
    // ========================================

    const scheduleContainer =
        document.createElement("div");

    scheduleContainer.style.marginTop = "18px";
    scheduleContainer.style.textAlign = "left";
    scheduleContainer.style.fontSize = "14px";

    scheduleContainer.innerHTML = `
        <div style="
            font-weight: bold;
            margin-bottom: 8px;
        ">
            📋 My schedule
        </div>

        <div>🔒 Oct 12 — Бүтэн ажилтай</div>
        <div>🔒 Oct 13 — Дүүтэйгээ Shopping хийнэ</div>
        <div>🔒 Oct 19 — Мэдээ уншина</div>
        <div>🔒 Oct 20 — Хүлэгүүдтэй бэлтгэлтэй</div>
        <div>🔒 Oct 26 — Ном зохиол бичнээ</div>
        <div>🔒 Oct 27 — Бясалгалын анги эхлүүлэх</div>
    `;

    document
        .querySelector(".calendar")
        .appendChild(scheduleContainer);


    // ========================================
    // PREVIOUS MONTH
    // ========================================

    document.getElementById("prevMonth")
        .addEventListener("click", function() {

            calendarDate.setMonth(
                calendarDate.getMonth() - 1
            );

            createCalendar(activity);

        });


    // ========================================
    // NEXT MONTH
    // ========================================

    document.getElementById("nextMonth")
        .addEventListener("click", function() {

            calendarDate.setMonth(
                calendarDate.getMonth() + 1
            );

            createCalendar(activity);

        });


    // ========================================
    // CONFIRM
    // ========================================

    confirmBtn.addEventListener("click", function() {

        if (!selectedDate) return;

        const formattedDate =
            selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric"
            });

        saveResponse({
            action: "DATE",
            activity: activity,
            date: formattedDate,
            noClicks: noCount
        });

        transitionScreen(function() {

            document.getElementById("emoji").textContent =
                "🎉";

            document.getElementById("title").textContent =
                "YAAAYYY!";

            document.getElementById("question").innerHTML =
                `Manaihiig songoson uilchluulsend bayarlalaa!<br><br>
                 ${activity} on <strong>${formattedDate}</strong> 😎`;

            document.getElementById("buttons").innerHTML = "";

            message.textContent =
                "naana n chat bicheed uulzii 👀";

        });

    });

}

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

// ========================================
// NO BUTTON
// ========================================

// ========================================
// NO BUTTON
// ========================================

noBtn.addEventListener("click", function() {

    noCount++;
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

yesBtn.addEventListener("click", function() {
    saveResponse({
        action: "YES",
        noClicks: noCount
    });

    transitionScreen(function() {

        document.getElementById("emoji").textContent = "🎉";

        document.getElementById("title").textContent =
            "YAAAY!";

        document.getElementById("question").textContent =
            "Okay, Юу хйимээр байна? 😎";

        document.getElementById("buttons").innerHTML = `

            <div class="activity-grid">

                <button class="activity" data-activity="Coffee">
                    ☕
                    <span>Coffee</span>
                </button>

                <button class="activity" data-activity="Pizza">
                    🍕
                    <span>Pizza</span>
                </button>

                <button class="activity" data-activity="Burger">
                    🍔
                    <span>Burger</span>
                </button>

                <button class="activity" data-activity="Basketball">
                    🏀
                    <span>Хүлэгүүдийг үзэх</span>
                </button>

                <button class="activity" data-activity="Hiking">
                    🥾
                    <span>Ууланд гарах</span>
                </button>

                <button class="activity" data-activity="Movie">
                    🎬
                    <span>Кино (ер нь дэмий)</span>
                </button>

            </div>

        `;

        message.textContent = "";

        addActivityListeners();

    });

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


    // Empty spaces

    for (let i = 0; i < firstDay; i++) {

        const empty =
            document.createElement("div");

        calendarDays.appendChild(empty);

    }


    // Days

    for (let day = 1; day <= daysInMonth; day++) {

        const button =
            document.createElement("button");

        button.textContent = day;

        const date =
            new Date(year, month, day);

        const today =
            new Date();

        today.setHours(0, 0, 0, 0);

        if (date < today) {

            button.disabled = true;
            button.classList.add("past");

        }

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

        calendarDays.appendChild(button);

    }


    // Previous month

    document.getElementById("prevMonth")
        .addEventListener("click", function() {

            calendarDate.setMonth(
                calendarDate.getMonth() - 1
            );

            createCalendar(activity);

        });


    // Next month

    document.getElementById("nextMonth")
        .addEventListener("click", function() {

            calendarDate.setMonth(
                calendarDate.getMonth() + 1
            );

            createCalendar(activity);

        });


    // Confirm

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

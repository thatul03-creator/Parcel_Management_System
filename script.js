
// Sample Parcel Records
const parcelData = {

    // Registration Number 1
    "12613885": [
        {
            id: "P18737",
            from: "Delhi",
            date: "4 November 2026",
            payment: "Online",
            status: "Pending"
        },
        {
            id: "P193845",
            from: "Chandigarh",
            date: "2 November 2026",
            payment: "Cash on Delivery",
            status: "Pending"
        },
        {
            id: "P25575",
            from: "Amritsar",
            date: "6 November 2026",
            payment: "Online",
            status: "Pending"
        },
        {
            id: "P1004",
            from: "Ludhiana",
            date: "1 November 2026",
            payment: "Online",
            status: "Pending"
        },
        {
            id: "P1005",
            from: "Jalandhar",
            date: "7 November 2026",
            payment: "Online",
            status: "Pending"
        },
        {
            id: "P1006",
            from: "Patiala",
            date: "9 November 2026",
            payment: "Cash on Delivery",
            status: "Pending"
        }
    ],

    // Registration Number 2
    "12612956": [
        {
            id: "P2001",
            from: "Delhi",
            date: "4 November 2026",
            payment: "Online",
            status: "Pending"
        },
        {
            id: "P2002",
            from: "Jalandhar",
            date: "5 November 2026",
            payment: "Cash on Delivery",
            status: "Pending"
        },
        {
            id: "P2003",
            from: "Amritsar",
            date: "2 November 2026",
            payment: "Online",
            status: "Pending"
        },
        {
            id: "p2323",
            from: "Delhi",
            date: "3 November 2026",
            payment: "Online",
            status: "Pending"
        },
        {
            id: "P2005",
            from: "Ludhiana",
            date: "6 November 2026",
            payment: "Cash on Delivery",
            status: "Pending"
        },
        {
            id: "P2006",
            from: "Patiala",
            date: "9 November 2026",
            payment: "Online",
            status: "Pending"
        }
    ],

    // Registration Number 3
    "12609149": [
        {
            id: "P3001",
            from: "Chandigarh",
            date: "3 November 2026",
            payment: "Online",
            status: "Pending"
        },
        {
            id: "P3002",
            from: "Ludhiana",
            date: "6 November 2026",
            payment: "Online",
            status: "Pending"
        },
        {
            id: "P3003",
            from: "Delhi",
            date: "8 November 2026",
            payment: "Cash on Delivery",
            status: "Pending"
        },
        {
            id: "P3004",
            from: "Patiala",
            date: "9 November 2026",
            payment: "Online",
            status: "Pending"
        },
        {
            id: "P3005",
            from: "Ludhiana",
            date: "6 November 2026",
            payment: "Cash on Delivery",
            status: "Pending"
        }
    ],

    // Registration Number 4
    "12615908": [
        {
            id: "P4001",
            from: "Amritsar",
            date: "4 November 2026",
            payment: "Online",
            status: "Pending"
        },
        {
            id: "P4002",
            from: "Jalandhar",
            date: "2 November 2026",
            payment: "Cash on Delivery",
            status: "Pending"
        },
        {
            id: "P4003",
            from: "Delhi",
            date: "7 November 2026",
            payment: "Online",
            status: "Pending"
        }
    ]

};


// Get HTML Elements
const registrationInput = document.getElementById("registrationNumber");
const parcelList = document.getElementById("parcelList");
const message = document.getElementById("message");
const regDisplay = document.getElementById("regDisplay");
const totalParcels = document.getElementById("totalParcels");
const deliveredParcels = document.getElementById("deliveredParcels");
const viewParcelsButton = document.getElementById("viewParcelsButton");


// View Parcels Button
viewParcelsButton.addEventListener("click", showParcels);


// Press Enter to Search
registrationInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        showParcels();
    }
});


// Mark as Delivered Button
parcelList.addEventListener("click", function(event) {

    const button = event.target.closest(".delivered-button");

    if (button) {
        const registration = button.dataset.registration;
        const index = Number(button.dataset.index);

        markDelivered(registration, index);
    }

});


// Show Parcels Function
function showParcels() {

    const registration = registrationInput.value.trim();

    if (registration === "") {

        showMessage("Please enter your registration number.", "error");
        resetDashboard();
        return;

    }

    if (Object.prototype.hasOwnProperty.call(parcelData, registration)) {

        const count = parcelData[registration].length;

        regDisplay.textContent = registration;

        showMessage(
            count + " parcels found for registration number " + registration + ".",
            "success"
        );

        displayParcels(registration);

    } else {

        showMessage(
            "No parcel record found for this registration number.",
            "error"
        );

        resetDashboard();

    }

}


// Show Message Function
function showMessage(messageText, type) {

    message.innerHTML = "";

    const messageBox = document.createElement("div");

    messageBox.className = "message message-" + type;
    messageBox.textContent = messageText;

    message.appendChild(messageBox);

}


// Reset Dashboard Function
function resetDashboard() {

    parcelList.innerHTML = "";

    regDisplay.textContent = "---";
    totalParcels.textContent = "0";
    deliveredParcels.textContent = "0";

}


// Display Parcels Function
function displayParcels(registration) {

    const parcels = parcelData[registration];

    let delivered = 0;

    parcelList.innerHTML = "";

    parcels.forEach(function(parcel, index) {

        if (parcel.status === "Delivered") {
            delivered++;
        }

        const statusClass =
            parcel.status === "Delivered" ? "delivered" : "pending";

        const parcelElement = document.createElement("article");

        parcelElement.className = "parcel";

        parcelElement.innerHTML = `

            <div class="parcel-top">

                <h3>Parcel ${parcel.id}</h3>

                <span class="status ${statusClass}">
                    ${parcel.status}
                </span>

            </div>

            <div class="parcel-info">

                <p><b>From:</b> ${parcel.from}</p>

                <p><b>Expected Delivery:</b> ${parcel.date}</p>

                <p class="payment">
                    Payment: ${parcel.payment}
                </p>

            </div>

        `;

        if (parcel.status === "Pending") {

            const deliveredButton = document.createElement("button");

            deliveredButton.type = "button";
            deliveredButton.className = "delivered-button";
            deliveredButton.textContent = "Mark as Delivered";

            deliveredButton.dataset.registration = registration;
            deliveredButton.dataset.index = index;

            parcelElement.appendChild(deliveredButton);

        } else {

            const deliveredNote = document.createElement("p");

            deliveredNote.className = "delivered-note";
            deliveredNote.textContent = "Parcel Delivered";

            parcelElement.appendChild(deliveredNote);

        }

        parcelList.appendChild(parcelElement);

    });

    totalParcels.textContent = parcels.length;
    deliveredParcels.textContent = delivered;

}


// Mark Delivered Function
function markDelivered(registration, index) {

    const parcels = parcelData[registration];

    if (!parcels || !parcels[index]) {
        return;
    }

    parcels[index].status = "Delivered";

    displayParcels(registration);

    showMessage(
        "Parcel " + parcels[index].id + " marked as delivered.",
        "success"
    );

}

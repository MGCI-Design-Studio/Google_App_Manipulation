// Requires:
// util.js
// properties_manip.js

function findTicketsFromSpread(scriptProperties, panel) {
    const non_tickets = ss_info.getRange(2, 1, 1, 1).getValue().split("::");

    let sheets = spread.getSheets();
    let section_tickets = [];
    sheets.forEach((sheet) => {
        if (!non_tickets.includes(sheet.getName())) {
            // If the ticket is of the right ticketing system
            if (sheet.getRange(1, 1, 1, 1).getValue().includes(panel)) {
                section_tickets.push(sheet.getName());
            }
        }
    });
    console.log("Found Tickets are: " + section_tickets);
    saveValue(scriptProperties, home_sheet + "_tickets", section_tickets)
        .then(r => console.log("Tickets Uploaded"));

    return section_tickets;
}

function findAllTickets(scriptProperties, panels) {
    let panel_item_names = ss_info.getRange(3, 1, 1, 1).getValue().split("::");
    const non_tickets = ss_info.getRange(2, 1, 1, 1).getValue().split("::");
    let sheets = spread.getSheets();

    for (let i = 0; i < panel_item_names.length; i++) {
        let section_tickets = [];
        sheets.forEach((sheet) => {
            if (!non_tickets.includes(sheet.getName())) {
                // If the ticket is of the right ticketing system
                if (sheet.getRange(1, 1, 1, 1).getValue().includes(panel_item_names[i])) {
                    section_tickets.push(sheet.getName());
                }
            }
        });
        console.log("Found Tickets are: " + section_tickets);
        saveValue(scriptProperties, panels[i] + "_tickets", section_tickets)
            .then(r => console.log("Tickets Uploaded"));
    }
}

function findTickets(scriptProperties, ticket) {
    let tickets;
    try {
        let tickets_data = unpackProperties(scriptProperties.getProperty(home_sheet + "_tickets"));
        if (tickets_data === null) {
            tickets = findTicketsFromSpread(scriptProperties, ticket);
        } else {
            tickets = tickets_data;
        }
    } catch (err) {
        console.log(err);
        tickets = findTicketsFromSpread(scriptProperties, ticket);
    }

    return tickets;
}
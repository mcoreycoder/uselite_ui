//SOS select GOV on Sales Order form
// selector #main > div:nth-child(21) > div > table > tbody
// then map by document.getElementById("Lines__temp___ClassId")
// then run .selectedIndex = "7" on each in the collection
function gov () {
    let options = document.getElementById("Lines__temp___ClassId")//.selectedIndex = "7"
    return options
}

// gov()
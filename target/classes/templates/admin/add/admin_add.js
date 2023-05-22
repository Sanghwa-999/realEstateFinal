function checkError(hasError, error_str){
    let error_count = 0
    hasError = false

    if(!checkString(document.getElementById("new_title").value) || document.getElementById("new_title").value === ""){
        error_str += "Title, "
        error_count += 1
    }

    if(!checkString(document.getElementById("new_address").value) || document.getElementById("new_address").value === ""){
        error_str += "Address, "
        error_count += 1
    }

    if(!checkNum(document.getElementById("new_area").value) || parseInt(document.getElementById("new_area").value) <= 0){
        error_str += "Area, "
        error_count += 1
    }

    if(!checkNum(document.getElementById("new_price").value) || parseInt(document.getElementById("new_price").value) <= 0){
        error_str += "Price, "
        error_count += 1
    }

    if(!checkString(document.getElementById("new_district").value) || (parseInt(document.getElementById("new_district").value) < 1 || parseInt(document.getElementById("new_district").value) > 12)){
        error_str += "District, "
        error_count += 1
    }

    if(!checkNum(document.getElementById("new_floors").value) || parseInt(document.getElementById("new_floors").value) < 0){
        error_str += "Floors, "
        error_count += 1
    }

    if(!checkNum(document.getElementById("new_cnumber").value)){
        error_str += "Contact number, "
        error_count += 1
    }

    if(!checkString(document.getElementById("new_cname").value) || document.getElementById("new_cname").value === ""){
        error_str += "Contact name, "
        error_count += 1
    }

    if(!checkString(document.getElementById("new_features").value) || document.getElementById("new_features").value === ""){
        error_str += "Features, "
        error_count += 1
    }

    if(!checkString(document.getElementById("new_type").value) || document.getElementById("new_type").value === ""){
        error_str += "Type, "
        error_count += 1
    }

    if(error_count !== 0){
        error_str.slice(0, -2)
        hasError = true
    }


}

function checkNum(variable){
    return typeof variable === 'number';

}

function checkString(variable){
    return typeof variable === 'string';

}

function submitData() {
    let error = false
    let error_str = "Error input: "

    checkError(error, error_str)

    if(error){
        document.getElementById("error").innerHTML = error_str
        return
    }

    let url = "http://localhost:8080/api/v1/real_estate"
    const new_title = document.getElementById("new_title").value
    const new_address = document.getElementById("new_address").value
    const new_area = document.getElementById("new_area").value
    const new_price = document.getElementById("new_price").value
    const new_district = document.getElementById("new_district").value
    const new_floors = document.getElementById("new_floors").value
    const new_cnumber = document.getElementById("new_cnumber").value
    const new_cname = document.getElementById("new_cname").value
    const new_features = document.getElementById("new_features").value
    const new_type = document.getElementById("new_type").value

    const data = {
        title: new_title,
        address: new_address,
        area: new_area,
        price: new_price,
        district: new_district,
        floors: new_floors,
        contact_number: new_cnumber,
        contact_name: new_cname,
        features: new_features,
        house_type: new_type,
    }

    fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    alert("Add successfully!")
    // window.location.href = `../list/adminList.html`
}
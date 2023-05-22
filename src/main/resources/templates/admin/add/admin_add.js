function checkError(){
    let hasError = false
    let error_str = "Error input: "
    let error_count = 0

    if(checkEmpty(document.getElementById("new_title").value)){
        error_str += "Title (cannot be empty), "
        error_count += 1
    }

    if(checkEmpty(document.getElementById("new_address").value)){
        error_str += "Address (cannot be empty), "
        error_count += 1
    }

    if(checkNumber(document.getElementById("new_area").value)){
        if(parseInt(document.getElementById("new_area").value) < 1){
            error_str += "Area (has to be >1), "
            error_count += 1
        }
    }
    else{
        error_str += "Area (has to be >1), "
        error_count += 1
    }

    if(checkNumber(document.getElementById("new_price").value)){
        if(parseInt(document.getElementById("new_price").value) < 1){
            error_str += "Price (has to be >1), "
            error_count += 1
        }
    }
    else{
        error_str += "Price (has to be a number), "
        error_count += 1
    }

    if(checkNumber(document.getElementById("new_district").value)){
        if(parseInt(document.getElementById("new_district").value) < 1 || parseInt(document.getElementById("new_district").value) > 12){
            error_str += "District (has to be between 1-12), "
            error_count += 1
        }
    }
    else{
        error_str += "District (has to be a number), "
        error_count += 1
    }

    if(checkNumber(document.getElementById("new_floors").value)){
        if(parseInt(document.getElementById("new_floors").value) < 0){
            error_str += "Floors (has to be larger than 0), "
            error_count += 1
        }
    }
    else{
        error_str += "Floors (has to be a number), "
        error_count += 1
    }

    if(checkNumber(document.getElementById("new_cnumber").value)){
        if(parseInt(document.getElementById("new_cnumber").value) < 100000000 || parseInt(document.getElementById("new_cnumber").value) > 999999999){
            error_str += "Contact number (has to be 10 digit), "
            error_count += 1
        }
    }
    else{
        error_str += "Contact number (not a number), "
        error_count += 1
    }

    if(checkEmpty(document.getElementById("new_cname").value)){
        error_str += "Contact name (cannot be empty), "
        error_count += 1
    }

    if(checkEmpty(document.getElementById("new_features").value) || !checkRegEx(document.getElementById("new_features").value)){
        error_str += "Features (has to follow \"# beds, # bathrooms\" format), "
        error_count += 1
    }

    if(checkEmpty(document.getElementById("new_type").value) || !checkType(document.getElementById("new_type").value)){
        error_str += "Type (has to be \"House, Apartment, Villa, Land\"), "
        error_count += 1
    }

    if(error_count !== 0){
        error_str = error_str.slice(0, -2)
        hasError = true
    }

    return {hasError, error_str}
}

function checkEmpty(variable){
    return variable === "";
}

function checkRegEx(string){
    let regex = /[0-9]+\sbed,\s[0-9]+\sbathroom/i;
    return regex.test(string);
}

function checkType(string){
    let types = {'1': 'Apartment', '2': 'House', '3': 'Land', '4' : 'Villa'}

    for(let i = 1; i <= 4; i++){
        if(string === types[i]){
            return true
        }
    }
    return false
}

function checkNumber(variable){
    return !isNaN(parseInt(variable));
}

function submitData() {
    let error_check = checkError()

    let error = error_check.hasError
    let error_str = error_check.error_str

    if(error){
        document.getElementById("error").innerHTML = error_str
    }
    else{
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
        window.location.href = `../list/adminList.html`
    }
}
const params = new URLSearchParams(window.location.search);
const estateId = params.get('id');

fetch('http://localhost:8080/api/v1/real_estate/'+estateId)
    .then(response => response.json())
    .then(json => {
        document.getElementById("input_title").innerHTML += "<input id=\"new_title\" placeholder=\""+ json.title + "\">";
        document.getElementById("input_address").innerHTML += "<input id=\"new_address\" placeholder=\""+ json.address + "\">";
        document.getElementById("input_area").innerHTML += "<input id=\"new_area\" placeholder=\""+ json.area + "\">";
        document.getElementById("input_price").innerHTML += "<input id=\"new_price\" placeholder=\""+ json.price + "\">";
        document.getElementById("input_district").innerHTML += "<input id=\"new_district\" placeholder=\""+ json.district + "\">";
        document.getElementById("input_floors").innerHTML += "<input id=\"new_floors\" placeholder=\""+ json.floors + "\">";
        document.getElementById("input_cnumber").innerHTML += "<input id=\"new_cnumber\" placeholder=\""+ json.contact_number + "\">";
        document.getElementById("input_cname").innerHTML += "<input id=\"new_cname\" placeholder=\""+ json.contact_name + "\">";
        document.getElementById("input_features").innerHTML += "<input id=\"new_features\" placeholder=\""+ json.features + "\">";
        document.getElementById("input_type").innerHTML += "<input id=\"new_type\" placeholder=\""+ json.type + "\">";
    })

function checkNull(ele_id){
    if(document.getElementById(ele_id).value !== "") {
        return document.getElementById(ele_id).value;
    }
}

function saveData() {
    const new_title = checkNull("new_title")
    const new_address = checkNull("new_address")
    const new_area = checkNull("new_area")
    const new_price = checkNull("new_price")
    const new_district = checkNull("new_district")
    const new_floors = checkNull("new_floors")
    const new_cnumber = checkNull("new_cnumber")
    const new_cname = checkNull("new_cname")
    const new_features = checkNull("new_features")
    const new_type = checkNull("new_type")

    let url = "http://localhost:8080/api/v1/real_estate/" + estateId + "?"

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

    for (const key in data) {
        if (data[key] !== undefined) {
            url += key + "=" + data[key] + "&"
        }
    }

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    alert("Edit successfully!")
    window.location.href = `../list/adminList.html`
}
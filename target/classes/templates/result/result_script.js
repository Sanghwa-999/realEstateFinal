const params = new URLSearchParams(window.location.search);
const houseType = params.get('houseType');
const region = params.get('region');
const areaSize = params.get('areaSize');
const homePrice = params.get('homePrice');

// Extract the numeric part from the region value
const regionNumber = region.match(/\d+/);
const district = regionNumber ? parseInt(regionNumber[0]) : null;

// Define the area size ranges
const areaSizeRanges = {
  '1-50': [1, 50],
  '50-150': [50, 150],
  'over-150': [150, Infinity]
};

// Get the area size range based on the areaSize parameter in the URL
let areaSizeRange = null;
if (areaSize) {
  for (let range in areaSizeRanges) {
    const [min, max] = areaSizeRanges[range];
    if (areaSize.includes(`${min}m² - ${max}m²`)) {
      areaSizeRange = [min, max];
      break;
    } else if (areaSize === 'More than 150m²') {
      areaSizeRange = areaSizeRanges['over-150'];
      break;
    }
  }
}

// Define the house type ranges
const houseTypeRanges = {
  Apartment: 'Apartment',
  Land: 'Land',
  Villa: 'Villa',
  House: 'House'
};

// Get the house type range based on the houseType parameter in the URL
let houseTypeRange = null;
if (houseType) {
  houseTypeRange = houseTypeRanges[houseType];
}

// Fetch data from the API
fetch('http://localhost:8080/api/v1/real_estate')
  .then(response => response.json())
  .then(data => {
    let filteredData = data;
    let smallestPrice, biggestPrice, averagePrice;

    if (houseType !== "Type of Accommodation" || region !== "Location in HCMC" || areaSize !== "House Area") {
      // Filter data based on the district
      filteredData = data.filter(item => 
        item.district === district &&
        (!areaSizeRange || (item.area > areaSizeRange[0] && item.area <= areaSizeRange[1])) &&
        (!houseTypeRange || item.house_type.toLowerCase() === houseTypeRange.toLowerCase())
      );

      // Calculate the smallest and biggest prices
      const prices = filteredData
        .map(item => item.price)
        .filter(price => typeof price === 'number' && !isNaN(price));

      const { sum, count } = prices.reduce(
        ({ sum, count }, currentValue) => {
          return {
            sum: sum + currentValue,
            count: count + 1
          };
        },
        { sum: 0, count: 0 }
      );

      averagePrice = Math.ceil(sum / count);
      smallestPrice = Math.min(...prices);
      biggestPrice = Math.max(...prices);
    } else {
      // Calculate the total smallest and biggest prices
      const prices = data
        .map(item => item.price)
        .filter(price => typeof price === 'number' && !isNaN(price));

      const { sum, count } = prices.reduce(
        ({ sum, count }, currentValue) => {
          return {
            sum: sum + currentValue,
            count: count + 1
          };
        },
        { sum: 0, count: 0 }
      );

      averagePrice = Math.ceil(sum / count);
      smallestPrice = Math.min(...prices);
      biggestPrice = Math.max(...prices);
    }

    // Update the HTML elements
    document.getElementById('smallestPrice').textContent = smallestPrice;
    document.getElementById('biggestPrice').textContent = biggestPrice;
    document.getElementById('customRange1').min = smallestPrice;
    document.getElementById('customRange1').max = biggestPrice;

    const slider = document.getElementById("customRange1");
    slider.min = smallestPrice;
    slider.max = biggestPrice;
    slider.value = averagePrice;
    slider.disabled = true;

    const allRanges = document.querySelectorAll(".sliderContainer");
    allRanges.forEach(wrap => {
      const range = wrap.querySelector(".form-range");
      const bubble1 = wrap.querySelector(".bubble1");
      const bubble2 = wrap.querySelector(".bubble2");

      range.addEventListener("input", () => {
        setBubble(range, bubble1);
        setBubble2(range, bubble2);
      });
      setBubble(range, bubble1);
      setBubble2(range, bubble2);
    });

    const text = document.getElementById('resultSentence');
    text.textContent = null;
    setResultSentence(parseInt(homePrice), parseInt(smallestPrice), parseInt(biggestPrice), parseInt(averagePrice), text);

    // integer handling required
    function setResultSentence(input, min, max, average, text) {
        const minReasonable = average*0.8;
        const maxReasonable = average*1.2;

        console.log(minReasonable);
        console.log(maxReasonable);

        let finalText = '';
        finalText += 'Given price is ' + Math.ceil(input) + ' billions. ';
        finalText += 'Normally, reasonable price range is set with a 20% difference from the average value.';
        finalText += ' And the reasonable price range for the selected options is from ';
        finalText += Math.ceil(minReasonable) + ' billions to ' + Math.ceil(maxReasonable) + ' billions. ';

        console.log(input);
        if(!isNaN(input)) {
            if(input <= min) {
                finalText += 'The entered price is same or smaller than minimum price (Min: ' + Math.ceil(min) + ' billions)';
            } else if(input > min && input < minReasonable) {
                const difference = Math.ceil(Math.ceil(minReasonable-input)/input*100);
                finalText += 'The entered price is cheaper than reasonable price. ';
                finalText += 'The given price is ' + difference + '% smaller than reasonable price range.';
            } else if(input >= minReasonable && input <= maxReasonable) {
                finalText += 'The entered price is reasonable as it is within the range of reasonable price.';
            } else if(input > maxReasonable && input < max) {
                const difference = Math.ceil(Math.ceil(input-maxReasonable)/maxReasonable*100);
                finalText += 'The entered price is  more expensive than reasonable price. ';
                finalText += 'The given price is ' + difference + '% larger  than reasonable price range.';
            } else if(input >= max) {
                finalText += 'The entered price is same or bigger than maximum price (Max: ' + Math.ceil(max) + ' billions)';
            }
        } else {
            console.log('input empty');
            finalText = '';
        }
        text.textContent = finalText;
    }

    function setBubble(range, bubble) {
      const val = range.value;
      const min = range.min ? range.min : 0;
      const max = range.max ? range.max : 100;
      const newVal = Number(((val - min) * 100) / (max - min));
      bubble.innerHTML = '<div>Average</div>' + val;

      // Sorta magic numbers based on size of the native UI thumb
      bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
    }

    function setBubble2(range, bubble) {
      const val = parseFloat(homePrice);
      const min = range.min ? parseFloat(range.min) : 0;
      const max = range.max ? parseFloat(range.max) : 100;

      if (!isNaN(val) && val >= min && val <= max) {
        const newVal = Number(((val - min) * 100) / (max - min));
        bubble.innerHTML = '<div>Input</div>' + val;
        bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
        bubble.style.display = 'block'; // Show the bubble
      } else {
        bubble.style.display = 'none'; // Hide the bubble
      }
    }


  })
  .catch(error => {
    console.error('Error:', error);
  });





fetch('http://localhost:8080/api/v1/real_estate')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.row-cols-1.row-cols-sm-2.row-cols-md-3.g-3');

    // Clear existing items in the container
    container.innerHTML = '';

    let count = 0;
    const filteredData = data.filter(item => 
      item.district === district &&
      (!areaSizeRange || (item.area > areaSizeRange[0] && item.area <= areaSizeRange[1])) &&
      (!houseTypeRange || item.house_type.toLowerCase() === houseTypeRange.toLowerCase())
    );

    // Check if there are any filtered items
    if (filteredData.length === 0) {
      // Show items with item.id equal to 1 to 3
      const maxItems = data.filter(item => item.id >= 1 && item.id <= 3);
      maxItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'col';
        div.innerHTML = `
        <div class="card shadow-sm" data-item-id="${item.id}">
          <img src="../images/${item.id}/${item.id}_1.jpeg" alt="" class="bd-placeholder-img card-img-top" width="100%" height="225">
          <div class="card-body">
            <p class="card-text">${item.title}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <small>District: ${item.district}</small>
              </div>
              <small class="text-body-secondary">Price: ${item.price}</small>
            </div>
          </div>
        </div>
      `;
        container.appendChild(div);
      });

      // Add click event to each item
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        card.addEventListener('click', () => {
          const itemId = card.dataset.itemId;
          // Redirect to detail.html with the item ID in the URL
          window.location.href = `../detail/detail.html?id=${itemId}`;
        });
      });
    } else {
      // Show the filtered items
      const maxItems = filteredData.slice(0, 3);
      maxItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'col';
        div.innerHTML = `
        <div class="card shadow-sm" data-item-id="${item.id}">
          <img src="../images/${item.id}/${item.id}_1.jpeg" alt="" class="bd-placeholder-img card-img-top" width="100%" height="225">
          <div class="card-body">
            <p class="card-text">${item.title}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <small>District: ${item.district}</small>
              </div>
              <small class="text-body-secondary">Price: ${item.price}</small>
            </div>
          </div>
        </div>
      `;
        container.appendChild(div);

      });

      // Add click event to each item
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        card.addEventListener('click', () => {
          const itemId = card.dataset.itemId;
          // Redirect to detail.html with the item ID in the URL
          window.location.href = `../detail/detail.html?id=${itemId}`;
        });
      });
    }
  })
  .catch(error => console.log(error));

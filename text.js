document.addEventListener('DOMContentLoaded', () => {
    const loadCarsBtn = document.getElementById('loadCarsBtn');
    const carList = document.getElementById('carList');
    let cars = [];  // Added 'let' for proper scoping

    loadCarsBtn.addEventListener('click', () => {
        fetch('https://2446895-lab6.azurewebsites.net/cars')
            .then(response => response.json())
            .then(data => {
                cars = data;
                carList.innerHTML = '';
                data.forEach((car, index) => {
                    const carCard = document.createElement('div');
                    carCard.classList.add('car-card');
                    carCard.innerHTML = `
                        <h2>${car.make} ${car.model}</h2>
                        <p><strong>Year:</strong> ${car.year}</p>
                        <p><strong>Price:</strong> R${car.price}</p>
                        <button class="btn btn-remove" data-index="${index}">Remove</button>
                    `;
                    carList.appendChild(carCard);
                });
            })
            .catch(error => {
                console.error('Error fetching car data:', error);
            });
    });
});

const carForm = document.getElementById('carForm');  // Ensure this is defined

carForm.addEventListener('submit', event => {
    event.preventDefault();
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const price = document.getElementById('price').value;
    addCar({ make, model, year, price });
    carForm.reset();
});

function addCar(newCar) {
    fetch('https://2446895-lab6.azurewebsites.net/cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            loadCarsBtn.click();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function to remove a car
function removeCar(index) {
    const carId = cars[index].id; // Ensure your cars have an 'id' property
    fetch(`https://2446895-lab6.azurewebsites.net/cars/${carId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            loadCarsBtn.click();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Event delegation for remove buttons
carList.addEventListener('click', event => {
    if (event.target.classList.contains('btn-remove')) {
        const index = event.target.dataset.index;
        removeCar(index);
    }
});

// Additional checks and functionalities can be added as needed

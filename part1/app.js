let favNumber = 3
let baseURL = 'http://numbersapi.com'

//1)

axios
    .get(`${baseURL}/${favNumber}?json`)
    .then(resp => {
        console.log(`Fact about the number ${favNumber}: ${resp.data.text}`);
    })
    .catch(err => {
        console.log(`Oops, there was a problem :( ${err}`);
    })


//2)
let favNumbers = [1, 3, 5]

axios
    .get(`${baseURL}/${favNumbers}?json`)
    .then(resp => {
        for (num of favNumbers) {
            console.log(`Fact about the number ${num}: ${resp.data[num]}`);
        }

    })
    .catch(err => {
        console.log(`Oops, there was a problem :( ${err}`);
    })



//3)
let container = document.getElementById('container');
let fourNumberFactPromises = [];

for (let i = 1; i < 5; i++) {
    fourNumberFactPromises.push(
        axios.get(`${baseURL}/${favNumber}?json`)
    );
}

Promise.all(fourNumberFactPromises)
    .then(factArr => (
        factArr.forEach(resp => {
            const p = document.createElement('p')
            p.textContent = `Fact about the number ${favNumber}: ${resp.data.text}`
            container.appendChild(p)
        })
    ))
    .catch(err => console.log(err));


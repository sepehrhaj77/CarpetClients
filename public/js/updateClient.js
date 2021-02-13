const baseUrl = 'https://carpet-clients.herokuapp.com'
//const baseUrl = 'http://localhost:3000'

//retrieve client name from variable passed through route, stored in hidden html
const clientName = document.getElementById('name-holder').innerText

//connect 'Submit' button to sendUpdateRequest()
const submitButton = document.getElementById('submit-button')
submitButton.addEventListener('click', sendUpdateRequest)

//get client from database
async function fetchClient(){
    try{
        const res = await fetch(`${baseUrl}/api/${clientName}`)
        const client = await res.json();
        return client;
    } catch(err){
        console.error(err)
    }
}

//fill in existing values
async function displayClient(){
    try
    {
        const client = await fetchClient()
        const clientName = client.name
        const jobAddress = client.jobAddress
        const mailAddress = client.mailAddress
        const phoneNumber = client.phoneNumber
        const material = client.materialInstalled
        const installDate = client.lastInstallDate

        //fill in existing client information as values for fields
        document.getElementById('name-input').setAttribute('value', clientName)
        document.getElementById('job-input').setAttribute('value', jobAddress)
        document.getElementById('mail-input').setAttribute('value', mailAddress)
        document.getElementById('phone-input').setAttribute('value', phoneNumber)
        document.getElementById('material-input').setAttribute('value', material)
        document.getElementById('install-input').setAttribute('value', installDate)

        
    } catch(err){
        console.error(err)
    }
}

function sendUpdateRequest(){
    const data = {
        name: document.getElementById('name-input').value,
        mailAddress: document.getElementById('mail-input').value,
        jobAddress: document.getElementById('job-input').value,
        phoneNumber: document.getElementById('phone-input').value,
        materialInstalled: document.getElementById('material-input').value,
        lastInstallDate: document.getElementById('install-input').value
    }
    console.log(data)
    
        const putMethod = {
            method: 'PUT', // Method itself
            headers: {
             'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            body: JSON.stringify(data) // We send data in JSON format
        }

        //make the HTTP put request
        fetch(`${baseUrl}/api/${clientName}`, putMethod)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
    
}

displayClient()
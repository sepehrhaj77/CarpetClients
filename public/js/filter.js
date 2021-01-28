

//Connect Find Client button to function sortClients() which retrieves all clients from the database and then filters based on the given criteria
const filterButton = document.getElementById('find-client-button')
filterButton.addEventListener('click', sortClients)

async function fetchClient(){
    try{
        const res = await fetch('http://localhost:3000/api');
        const clients = await res.json();
        return clients;
    } catch(err){
        console.error(err)
    }
    
}
async function sortClients(){
    const clients = await fetchClient();
    const parentDiv = document.getElementById('client-cards')
    while (parentDiv.firstChild != null){
        parentDiv.removeChild(parentDiv.firstChild)
    }

    //go through all clients in the database and show all who have an install date within the date range
    clients.forEach(client => {
        const firstDate = document.getElementById("search-date-one").value
        const secondDate = document.getElementById("search-date-two").value
        const clientDate = moment(client.lastInstallDate)
        
        const diffLow = clientDate.diff(firstDate, 'months')
        const diffHigh = clientDate.diff(secondDate, 'months')
        if(diffLow > 0 && diffHigh < 0){
            //create list of information to display about single client
            const clientDiv = document.createElement('div')
            const informationList = document.createElement('ul')
            const clientName = document.createElement('li')
            const clientAddress = document.createElement('li')
            const clientTelNumber = document.createElement('li')
            const clientMaterial = document.createElement('li')

            clientName.innerText = client.name
            clientAddress.innerText = client.mailAddress
            clientTelNumber.innerText = client.phoneNumber
            clientMaterial.innerText = client.materialInstalled

            informationList.style = "list-style-type:none"
            informationList.appendChild(clientName)
            informationList.appendChild(clientAddress)
            informationList.appendChild(clientTelNumber)
            informationList.appendChild(clientMaterial)
            
            //styling the card holding all the information of one client
            clientDiv.appendChild(informationList)
            clientDiv.style.border = '1px solid black'
            clientDiv.style.width = '200px'
            clientDiv.style.height = '100px'
            parentDiv.appendChild(clientDiv)
        }
    });
    
    
}


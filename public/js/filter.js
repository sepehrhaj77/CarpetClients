const baseUrl = 'https://carpet-clients.herokuapp.com'
//const baseUrl = 'http://localhost:3000'

//connect 'Show All Clients' button to function showAllClients()
const showAllButton = document.getElementById('show-all-button')
showAllButton.addEventListener('click', showAllClients)

//Connect 'Filter Clients' button to function sortClients() which retrieves all clients from the database and then filters based on the given criteria
const filterButton = document.getElementById('filter-clients-button')
filterButton.addEventListener('click', sortClients)


//Helper function to retrieve all clients
async function fetchClients(){
    try{
        const res = await fetch(`${baseUrl}/api`);
        const clients = await res.json();
        return clients;
    } catch(err){
        console.error(err)
    }
    
}
//Helper function to add html for given client so it can display on the page
function displayClient(client){
    //containing div for all client cards
    const parentDiv = document.getElementById('client-cards')

    //create list of information to display about single client
    const clientDiv = document.createElement('div')
    clientDiv.classList.add('client-card')
    const informationList = document.createElement('ul')
    const clientName = document.createElement('li')
    const clientAddress = document.createElement('li')
    const clientTelNumber = document.createElement('li')
    const clientMaterial = document.createElement('li')
    const clientInstallDate = document.createElement('li')
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-button')
    const updateButton = document.createElement('button')
    updateButton.classList.add('update-button')
    updateButton.addEventListener('click', updateClient)

    clientName.innerText = client.name
    clientAddress.innerText = client.mailAddress
    clientTelNumber.innerText = client.phoneNumber
    clientMaterial.innerText = client.materialInstalled
    clientInstallDate.innerText = client.lastInstallDate
    deleteButton.innerText = 'Delete'
    updateButton.innerText = 'Update'

    informationList.style = "list-style-type:none"
    informationList.appendChild(clientName)
    informationList.appendChild(clientAddress)
    informationList.appendChild(clientTelNumber)
    informationList.appendChild(clientMaterial)
    informationList.appendChild(clientInstallDate)
    
    clientDiv.appendChild(informationList)
    clientDiv.appendChild(deleteButton)
    clientDiv.appendChild(updateButton)
    parentDiv.appendChild(clientDiv)
    
}


async function sortClients(){
    try{
        //store all clients from database in a variable
        const clients = await fetchClients();

        //clear out any existing cards on screen
        const parentDiv = document.getElementById('client-cards')
        while (parentDiv.firstChild != null){
            parentDiv.removeChild(parentDiv.firstChild)
        }

        //go through all clients in the database and show all who have an install date within the date range
        clients.forEach(client => {
            const firstDate = document.getElementById("search-date-one").value
            const secondDate = document.getElementById("search-date-two").value
            const clientDate = moment(client.lastInstallDate)
            
            const diffLow = clientDate.diff(firstDate, 'days')
            const diffHigh = clientDate.diff(secondDate, 'days')
            if(diffLow >= 0 && diffHigh <= 0){
                displayClient(client)
            }
        });

        //Connect all 'Delete' buttons to function deleteSelf() which deletes the client from the database and removes it from the screen
        const deleteButtons = document.getElementsByClassName('delete-button')
        Array.from(deleteButtons).forEach(button => {
            button.addEventListener('click', deleteSelf)
        })
    
    } catch(err){
        console.error(err)
    }
}

async function showAllClients(){
    try{
        //clear out any existing cards on screen
        const parentDiv = document.getElementById('client-cards')
        while (parentDiv.firstChild != null){
            parentDiv.removeChild(parentDiv.firstChild)
        }
        
        const clients = await fetchClients();
        clients.forEach(client => {
            displayClient(client)
        })

        //Connect all 'Delete' buttons to function deleteSelf() which deletes the client from the database and removes it from the screen
        const deleteButtons = document.getElementsByClassName('delete-button')
        Array.from(deleteButtons).forEach(button => {
            button.addEventListener('click', deleteSelf)
        })
    } catch(err){
        console.error(err)
    }
}

//delete client from database. Linked to delete button in each client card displayed on screen
async function deleteSelf(event){
    const deleteButton = event.target; //get the button so we can access the elements of the client card
    try{
        //grab the name of the client
        const clientName = deleteButton.parentElement.firstChild.firstChild.innerText
        const res = await fetch(`${baseUrl}/api/${clientName}`, {
            method: 'DELETE'
        });

        deleteButton.parentElement.remove()
        return await res.json()
    } catch(err){
        console.error(err)
    }
}

//gather name of client before redirecting to client update page
function updateClient(event){
    const updateButton = event.target //get the button so we can access the name of the client
    const clientName = updateButton.parentElement.firstChild.firstChild.innerText
    window.location = baseUrl+'/update_client/'+clientName
}
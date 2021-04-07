const form = document.querySelector('#jobForm');
const textField = document.querySelector('#jobText');
const jobSection = document.querySelector('.job-post-section');
const btnSubmit = document.getElementById('btnSubmit');
form.addEventListener('submit',listJobs);


function listJobs(event){
    event.preventDefault();

    let baseUrl = 'http://api.lmiforall.org.uk/api/v1/soc/search?q=';
    let url = baseUrl +textField.value;
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then((data) => {
            console.log(data);
            data.forEach((item) =>{
                let divItem = document.createElement('div');
                divItem.className = 'job-box';
                let itemTitle = document.createElement('h2');
                itemTitle.innerText = item.add_titles[0];
                let itemDescirption = document.createElement('p');
                itemDescirption.innerText = item.description;

                let itemSoc = document.createElement('em');
                itemSoc.innerText = `Soc: ${item.soc}`;

                divItem.appendChild(itemTitle);
                divItem.appendChild(itemDescirption);
                divItem.appendChild(itemSoc);
                jobSection.appendChild(divItem);


            })

    })
    .catch(error => console.error(error));
    

}
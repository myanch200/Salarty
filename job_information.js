const form = document.querySelector('#jobForm');
const textField = document.querySelector('#jobText');
const jobSection = document.querySelector('.job-post-section');
const btnSubmit = document.getElementById('btnSubmit');
btnSubmit.addEventListener('click',listJobs);

function listJobs(event){
    event.preventDefault();
    jobSection.innerHTML = '';
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
                let qualifications = document.createElement('p');
                qualifications.innerText = item.qualifications;
             

                let itemSoc = document.createElement('em');
                itemSoc.innerText = `Soc: ${item.soc}`;

                let itemDetail = document.createElement('button')
                itemDetail.className = 'item-detail-btn';
                itemDetail.innerText = 'Details';

                divItem.appendChild(itemTitle);
                divItem.appendChild(itemDescirption);
                divItem.appendChild(itemSoc);

                divItem.appendChild(qualifications)

                divItem.appendChild(itemDetail);

                jobSection.appendChild(divItem);


            })

    })
    .catch(error => console.error(error));
    

}
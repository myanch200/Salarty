const form = document.querySelector('#jobForm');
const textField = document.querySelector('#jobText');
const jobSection = document.querySelector('.job-post-section');
const btnSubmit = document.getElementById('btnSubmit');
const modalSection = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');

modalSection.style.display = 'none';

btnSubmit.addEventListener('click',listJobs);
/**
 * The idea to add event listener to document 
 * and check if the target element is one of the buttons 
 * rendered comes from this stackoverflow question 
 * https://stackoverflow.com/questions/30601620/adding-an-event-listener-to-an-element-that-doesnt-exist-yet-in-vanilla-javascr
 * the answer is posted from Satpal
 */
document.addEventListener('click',showModal);

function showModal(e){
    let element = e.target
    if(element.tagName.toLowerCase() ==='button' && element.classList.contains('item-detail-btn')){
            modalSection.style.display = 'block';
           
            
            let socUrl ='http://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc='
            let searchUrl =socUrl+element.getAttribute('data-soc');
            fetch(searchUrl).
            then(response => response.json())
            .then(data => {
                console.log(data);
                let series =  data.series;
                let mostRecent = 1800;
                let currentSerie = null;
                series.forEach((serie)=>{
                   if(serie.year >= mostRecent){
                       mostRecent = serie.year
                       currentSerie = serie;
                   }
                })
               
                let weeklySalary = currentSerie.estpay;
                let yearly = weeklySalary*52;
                let infoP = document.createElement('p');
                infoP.innerText = `Weekly: ${weeklySalary} - Yearly: ${yearly}`;
                let closeBtn = document.createElement('span');
                closeBtn.innerHTML ='&times;';
                closeBtn.className ='close';
                closeBtn.addEventListener("click",function(){
                    modalSection.style.display = 'none';
        
                    });
                modalContent.innerHTML = '';
                modalContent.appendChild(closeBtn);
                modalContent.appendChild(infoP);
                
            })




    } 
}


///

function listJobs(event){
    event.preventDefault();
    jobSection.innerHTML = '';
    let baseUrl = 'https://api.lmiforall.org.uk/api/v1/soc/search?q=';
    let url = baseUrl +textField.value;
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then((data) => {

            console.log(data);
            data.forEach((item) =>{
                let itemContainer = document.createElement('div');
                itemContainer.className = 'item-container';

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
                itemDetail.setAttribute('data-soc',item.soc);
                itemDetail.setAttribute('data-toggle','modal');
                itemDetail.id
                
                divItem.appendChild(itemTitle);
                divItem.appendChild(itemDescirption);
                divItem.appendChild(itemSoc);

                divItem.appendChild(qualifications)

                divItem.appendChild(itemDetail);
                itemContainer.appendChild(divItem);

                jobSection.appendChild(itemContainer);
                
            })

    })
    .catch(error => console.error(error));
    

}


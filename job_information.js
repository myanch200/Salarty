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


function hideAllDivItems(){
    document.querySelectorAll('.job-box').forEach(div => {
        div.style.display = 'none';
    })
  
  

}
/* 
    function that receives the element 
    and the soc number that will help with 
    the fetch
    It will then change the div display toand add the 
    salary infromation

*/
function setEstSalary(element, soc){
    hideAllDivItems();
    let weeklySalary = 0;
    let yearly = 0;
    let currentSerie = null;

    let socUrl ='https://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc='
            let searchUrl =socUrl+soc;
            fetch(searchUrl).
            then(response => response.json())
            .then(data => {
                
                let series =  data.series;
                let mostRecent = 1800;
                series.forEach((serie)=>{
                   if(serie.year >= mostRecent){
                       mostRecent = serie.year
                       currentSerie = serie;
                   }
                });
                weeklySalary = currentSerie.estpay;
                yearly = weeklySalary*52;
                let pSalary = document.createElement('p');
                pSalary.innerText = `Weekly: £${weeklySalary} - Yearly: £${yearly}`;
                pSalary.className = 'salary-paragraph';
               let divItem = element.previousElementSibling;

               // Removing old paraph with salary (if any)
               document.querySelectorAll('.salary-paragraph').forEach(paragraph =>{
                   if(divItem.contains(paragraph)){
                       divItem.removeChild(paragraph);
                   }
               })
               divItem.appendChild(pSalary);
               divItem.style.display = 'block';
               
           
                
                
            });
           
         
}

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
                
                itemContainer.appendChild(itemTitle);
                divItem.appendChild(itemDescirption);
                divItem.appendChild(itemSoc);

                divItem.appendChild(qualifications)
           

                
                itemContainer.appendChild(divItem);
                divItem.style.display = 'none';
                itemContainer.appendChild(itemDetail)
                jobSection.appendChild(itemContainer);
              
                
            })

    })
    .catch(error => console.error(error));

    document.addEventListener('click', function(e){
        if(e.target.tagName.toLowerCase() ==='button' && e.target.classList.contains('item-detail-btn')){
            let element = e.target;
            setEstSalary(element, element.getAttribute('data-soc'));
            
           
        }
    })
    

}


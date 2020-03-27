// variables
const form1 = document.getElementById('request-quote');
const html = new htmlUI();

// event listners
eventListners();

function eventListners()
{
     document.addEventListener('DOMContentLoaded' , function(){
        
        html.displayYears();
       });

      form1.addEventListener('submit', function(e){
         e.preventDefault();

         const make = document.getElementById('make').value;
         const year = document.getElementById('year').value;
         const level = document.querySelector('input[name="level"]:checked').value;
         
         if(make === '' || year === '' || level === '')
         {
           html.displayError('All fields are mandatory');
         }else
         {
          const Checkresult = document.querySelector('#result div');
            
           if(Checkresult != null)
             {
                 Checkresult.remove();
             }
            
            const insurance = new Insurance(make,year,level); 
            const price = insurance.Calquotation(insurance);
                
            html.showResult(price,insurance);
         }
         
      }); 

}
// objects

function htmlUI () {}

htmlUI.prototype.displayYears = function(){

const max = new Date().getFullYear();
const min =  max-20;

const select = document.getElementById('year');

for(let i=max;i>=min;i--)
 {
  const options = document.createElement('option');
  options.value = i;
  options.textContent = i;     

  select.appendChild(options);
 }
  
}


htmlUI.prototype.displayError = function(message)
{

const div =  document.createElement('div');
div.classList = 'error';

div.innerHTML = `
       <p>${message}</p>
`;

form1.insertBefore(div , document.querySelector('.form-group'));

setTimeout(function(){
    document.querySelector('.error').remove();
},3000);

}

htmlUI.prototype.showResult = function(price,insurance)
{

const result = document.getElementById('result');
const div = document.createElement('div');    
let make = insurance.make;

// So to return redable value
switch(make)
{
 case '1':
       make = 'American';
       break;

 case '2':
        make = 'Asian';
        break;
        
  case '3':
        make = 'European';
        break;      
}

div.innerHTML = `
           
    <p class="header">Summary</p>   
    <p>Class : ${make}</p>
    <p>Year : ${insurance.year}</p>
    <p>Protection : ${insurance.level}</p>
    <p class="total">Total : ${price}</p>
  `;

  const spinner = document.querySelector('#loading img');

   spinner.style.display = 'block';

   setTimeout(() => {
       spinner.style.display = 'none';
       result.appendChild(div);
   },3000);

}

//Another object

function Insurance(make,year,level)
{
  this.make = make;
  this.year = year;
  this.level = level;
}



Insurance.prototype.Calquotation = function(insurance)
{
//select make
let price;
const base = 2000;

const make =  insurance.make;

switch(make)
{

  case '1': 
       price = base * 1.15;
       break;
 
  case '2':
       price = base * 1.05;
       break;

  case '3':
       price = base * 1.35;
       break; 
}

//select year

const year = insurance.year;

const difference = this.Checkdiff(year);

price = price - ((difference*3)*price)/100;


//select level

const level = insurance.level;

price = this.calculation(price,level);

return price;

}


Insurance.prototype.Checkdiff = function(year)
  {
  return (new Date().getFullYear() - year);    
  }

Insurance.prototype.calculation = function(price,level)
{

if(level=='basic')
 {
  price = price * 1.30;
 }
else{
    price = price * 1.50;
}  

return price;
}
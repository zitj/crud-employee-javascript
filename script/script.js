console.log('We are connected!');

const formContainer = document.querySelector('.form-container');
const dataContainer = document.querySelector('.data-container');
const inputs = formContainer.querySelectorAll('input');

const storeDataButton = formContainer.querySelector('button');
const table = dataContainer.querySelector('table');

const nameInput = inputs[0];
const emailInput = inputs[1];
const mobileInput = inputs[2];

console.log(storeDataButton);

class Employee{
    constructor(id,name,email,mobile)
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
    }
    
    showData()
    {
        Employee.renderHtml(this.id,this.name,this.email,this.mobile);
        return this;
    }
    
    storeEmployee()
    {
        const allData = JSON.parse(localStorage.getItem('employees')) ?? [];
        allData.push({id:this.id,name:this.name,email:this.email,mobile:this.mobile});
        localStorage.setItem('employees',JSON.stringify(allData));
    }

    static showAllEmployees()
    {
        if(localStorage.getItem('employees')){
            JSON.parse(localStorage.getItem('employees')).forEach((item)=>{
                Employee.renderHtml(item.id,item.name,item.email,item.mobile)
        })
    }
    }
    static renderHtml(id,name,email,mobile)
    {
        const trEl = document.createElement('tr');
                trEl.innerHTML = `
                    <tr>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${mobile}</td>
                    <td>
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>
                    </tr>
                `
                table.appendChild(trEl);
            
    }
}

Employee.showAllEmployees();

storeDataButton.addEventListener('click', (e)=>{
    e.preventDefault();
    let id = Math.floor(Math.random() * 1000000);
    const newEmp = new Employee(id,nameInput.value, emailInput.value, mobileInput.value);
    newEmp.showData().storeEmployee();
    nameInput.value = '';
    emailInput.value = '';
    mobileInput.value = '';
});
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
   
        const trEl = document.createElement('tr');
        trEl.innerHTML = `
            <tr>
            <td>${this.name}</td>
            <td>${this.email}</td>
            <td>${this.mobile}</td>
            <td>
                <button>Edit</button>
                <button>Delete</button>
            </td>
            </tr>
        `
        table.appendChild(trEl);
    }
}

storeDataButton.addEventListener('click', (e)=>{
    e.preventDefault();
    let id = Math.floor(Math.random() * 1000000);
    const newEmp = new Employee(id,nameInput.value, emailInput.value, mobileInput.value);
    newEmp.showData();
    nameInput.value = '';
    emailInput.value = '';
    mobileInput.value = '';
});
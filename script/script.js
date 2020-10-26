console.log('We are connected!');

const formContainer = document.querySelector('.form-container');
const dataContainer = document.querySelector('.data-container');
const inputs = formContainer.querySelectorAll('input');

const storeDataButton = document.getElementById('submit');
const table = dataContainer.querySelector('table');

const nameInput = inputs[0];
const emailInput = inputs[1];
const mobileInput = inputs[2];

const controlIdEdit = document.getElementById('controlIdEdit');
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
    //update element
    updateEmployee(id)
    {
        const newItem = {id:id,name:this.name,email:this.email,mobile:this.mobile};
        const UpdatedData = JSON.parse(localStorage.getItem('employees')).map((item)=>{
            if(item.id == id){
                return newItem;
            }
            return item;
        })

        localStorage.setItem('employees', JSON.stringify(UpdatedData));
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
                        <button class="edit" data-id="${id}">Edit</button>
                        <button class="delete" data-id="${id}">Delete</button>
                    </td>
                    </tr>
                `
                table.appendChild(trEl);
            
    }
}

Employee.showAllEmployees();

storeDataButton.addEventListener('click', (e)=>{
    
    e.preventDefault();
    
    if(nameInput.value == '' || emailInput.value == '' || mobileInput.value == ''){
        return;
    }
    if(!controlIdEdit.value){
        let id = Math.floor(Math.random() * 1000000);
        const newEmp = new Employee(id,nameInput.value, emailInput.value, mobileInput.value);
        newEmp.showData().storeEmployee();
    }
    else
    {
        const id = controlIdEdit.value;
        const newEmp = new Employee(id,nameInput.value, emailInput.value, mobileInput.value);
        newEmp.updateEmployee(id);
        storeDataButton.value = 'Update data';
        table.innerHTML = '';
        Employee.showAllEmployees();
    }
    nameInput.value = '';
    emailInput.value = '';
    mobileInput.value = '';
});

dataContainer.addEventListener('click', (e)=>{
    if(e.target.classList.contains('delete'))
    {

        //remove from locals
        const id = +e.target.getAttribute("data-id");
        const emps = JSON.parse(localStorage.getItem('employees'));
        const newData = emps.filter(item => item.id != id);
        localStorage.setItem('employees', JSON.stringify(newData));
        
        // remove from html
        e.target.parentElement.parentElement.remove();

    }
  
    if(e.target.classList.contains('edit'))
    {

        const id = +e.target.getAttribute("data-id");
        const item = JSON.parse(localStorage.getItem('employees')).find(item => item.id == id);
        nameInput.value = item.name;
        emailInput.value = item.email;
        mobileInput.value = item.mobile;
        controlIdEdit.value = id;
        storeDataButton.value = 'Update data';
        console.log(item);
    }
});
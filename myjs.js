var ul=document.getElementById('list-of-users');
ul.addEventListener('click',deleteUsers);
ul.addEventListener('click',editUsers);
document.addEventListener('DOMContentLoaded',loadItems);
let EditListId;
function deleteUsers(e)
{
    if(e.target.classList.contains('delete-users'))
    {
        //console.log(e.target.parentElement.innerHTML.split('-')[0]);
        let li=e.target.parentElement;
        let deleteListId=e.target.id.substring(7,e.target.id.length);
        
        console.log(deleteListId, li, e.target)

        axios.delete(`https://crudcrud.com/api/ad165a367ab84efbb185a273f70aae44/UserData/${deleteListId}`)
        .then((response)=>console.log(response))
        .catch((err)=>console.log(err))

        ul.removeChild(li);
        //ul.removeChild(e.target.parentElement);
        //localStorage.removeItem(e.target.parentElement.innerHTML.split('-')[0]);
    }
}
let update=document.getElementById('update-bt');
update.addEventListener('click', editAppointment)

function editAppointment(e)
{
    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let number=document.getElementById('Phone').value;
    let date=document.getElementById("tfc").value;
    let Time=document.getElementById('time').value;
    let updated_data={
        'name': name,
        'email': email,
        'number': number,
        'Date': date,
        'Time': Time
    };
    console.log(EditListId)
    axios.put(`https://crudcrud.com/api/ad165a367ab84efbb185a273f70aae44/UserData/${EditListId}`,updated_data)
    .then(res=>{

    console.log(res);
    var li=createNewLi(updated_data)
    //console.log(res.data);
    ul.append(li);
    update.style.display='none';

    let sub=document.getElementById('getacall');
    sub.style.display='block';
    document.forms['user-data'].reset();
})

}
function editUsers(e)
{
    if(e.target.classList.contains('edit-users'))
    {
        //console.log(e.target.parentElement.innerHTML.split('-')[0]);
        ul.removeChild(e.target.parentElement);
        
        /**let item=JSON.parse(localStorage.getItem(e.target.parentElement.innerHTML.split('-')[0]));
        document.forms['user-data']['name'].value=item.name;
        document.forms['user-data']['email'].value=item.email;
        document.forms['user-data']['Phone'].value=item.number;
        document.forms['user-data']['tfc'].value=item.Date;
        document.forms['user-data']['time'].value=item.Time;
        localStorage.removeItem(e.target.parentElement.innerHTML.split('-')[0]);**/

        EditListId=e.target.id.substring(8,e.target.id.length);

        axios.get(`https://crudcrud.com/api/ad165a367ab84efbb185a273f70aae44/UserData/${EditListId}`)
        .then(res=>{

            
            update.style.display='block';
        document.forms['user-data']['name'].value=res.data.name;
        document.forms['user-data']['email'].value=res.data.email;
        document.forms['user-data']['Phone'].value=res.data.number;
        document.forms['user-data']['tfc'].value=res.data.Date;
        document.forms['user-data']['time'].value=res.data.Time;})

        let sub=document.getElementById('getacall');
        sub.style.display='none';

    }
}
function loadItems()
{ 
    axios.get("https://crudcrud.com/api/ad165a367ab84efbb185a273f70aae44/UserData")
    .then((res)=>{
                    console.log(res)
                    for(var i=0;i<res.data.length;i++)
                    {
                        var li=createNewLi(res.data[i])
                        console.log(res.data[i]);
                        ul.append(li);
                    }
    })
    .catch((err)=>console.log(err))
    
    /**for(x in localStorage){
        if(x=='length')
            break;
        var value = localStorage.getItem(x);
        console.log(value);
        value = JSON.parse(value);
        var li = createNewLi(value);
        //itemList.appendChild(li);
       
        //console.log(li);
        ul.append(li);
        //bt.onclick=deleteUsers();
      //new_div.append(value.name);
    }**/
}
function createNewLi(value)
{
    var li=document.createElement('li');
    li.className='user_records';
    li.appendChild(document.createTextNode(value.name+'-'));  
    li.appendChild(document.createTextNode(value.email+'-')); 
    li.appendChild(document.createTextNode(value.number+'-'));
    li.appendChild(document.createTextNode(value.Date+'-'));
    li.appendChild(document.createTextNode(value.Time));
    var bt=document.createElement('button');
    bt.className='delete-users';
    bt.id=`deluser${value._id}`;
    bt.setAttribute('value','Delete');
    bt.appendChild(document.createTextNode('delete'));
    li.appendChild(bt);
    var edit=document.createElement('button');
    edit.className='edit-users';
    edit.id=`editUser${value._id}`;
    edit.setAttribute('value','Edit');
    edit.appendChild(document.createTextNode('Edit'));
    li.appendChild(edit);


    return li;
}

function print(e)
{
    e.preventDefault();
    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let number=document.getElementById('Phone').value;
    let date=document.getElementById("tfc").value;
    //let time=document.getElementById("time").value;
    //let d=date.getDate();
    //let m=date.getMonth()+1;
    //let y=date.getFullYear();
    console.log(date);
    let Time=document.getElementById('time').value;
   
    //let user_records=new Array();
    //let get_user_records=JSON.parse(localStorage.getItem('users'))?JSON.parse(localStorage.getItem('users')):[]


    let user_records={
        'name': name,
        'email': email,
        'number': number,
        'Date': date,
        'Time': Time
    };

    //localStorage.setItem(user_records.name,JSON.stringify(user_records));

    let result;
    axios.post("https://crudcrud.com/api/ad165a367ab84efbb185a273f70aae44/UserData",user_records)
    .then((res)=>{result=res.data
        console.log(result)
     

        var li = createNewLi(result);
           
        ul.append(li);
    })
    .catch((err)=>console.log(err));


    
    //console.log(user_records);
    //document.write("Name: "+name);
    //document.write("<br>");
    //document.write("Email Id: "+email);
    //document.write("<br>");
    //document.write("Phone NO.: "+number);
    //document.write("<br>");
    //document.write("Date:"+d+"-"+m+"-"+y);
    //document.write("<br>");
    //document.write("Time: "+time);


    //localStorage.setItem('Name',name);
    //localStorage.setItem('Email',email);
    //localStorage.setItem('Mobile',number);
    //localStorage.setItem('Date',`${d}-${m}-${y}`);
    //localStorage.setItem('Date',m);
    //localStorage.setItem('Date',y);
    //localStorage.setItem('Time',time);

    //let myObj_serialized=JSON.stringify(myObj);

    //console.log(myObj_serialized);

    //localStorage.setItem('formData',JSON.stringify(formData));

    //localStorage.setItem('myObj', myObj);
    //console.log(localStorage);

    //display();
    
    //localStorage.removeItem(user_records[0]);
    //console.log(localStorage.getItem('myObj'));
    document.forms['user-data'].reset();
}



    


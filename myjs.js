var ul=document.getElementById('list-of-users');
ul.addEventListener('click',deleteUsers);
ul.addEventListener('click',editUsers);
document.addEventListener('DOMContentLoaded',loadItems);
function deleteUsers(e)
{
    if(e.target.classList.contains('delete-users'))
    {
        //console.log(e.target.parentElement.innerHTML.split('-')[0]);
        ul.removeChild(e.target.parentElement);
        localStorage.removeItem(e.target.parentElement.innerHTML.split('-')[0]);
    }
}
function editUsers(e)
{
    if(e.target.classList.contains('edit-users'))
    {
        //console.log(e.target.parentElement.innerHTML.split('-')[0]);
        ul.removeChild(e.target.parentElement);
        let item=JSON.parse(localStorage.getItem(e.target.parentElement.innerHTML.split('-')[0]));
        document.forms['user-data']['name'].value=item.name;
        document.forms['user-data']['email'].value=item.email;
        document.forms['user-data']['Phone'].value=item.number;
        document.forms['user-data']['tfc'].value=item.Date;
        document.forms['user-data']['time'].value=item.Time;
        localStorage.removeItem(e.target.parentElement.innerHTML.split('-')[0]);

    }
}
function loadItems()
{ 
    axios.get("https://crudcrud.com/api/efc535336243410f8c29bca7b7da7e6f/UserData")
    .then((res)=>{
                    console.log(res)
                    for(var i=0;i<res.data.length;i++)
                    {
                        var li=createNewLi(res.data[i])
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
    bt.id='delUser';
    bt.setAttribute('value','Delete');
    bt.appendChild(document.createTextNode('delete'));
    li.appendChild(bt);
    var edit=document.createElement('button');
    edit.className='edit-users';
    edit.id='editUser';
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
    axios.post("https://crudcrud.com/api/efc535336243410f8c29bca7b7da7e6f/UserData",user_records)
    .then((res)=>console.log(res.data))
    .catch((err)=>console.log(err)); 

    var li = createNewLi(user_records);
       
    ul.append(li);

    
    console.log(user_records);
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



    


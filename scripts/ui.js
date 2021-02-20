//render chat templates to the dom
//clear the list of chats when the room changes

class ChatUI{
    constructor(list){
        this.list = list;
    }
    clear(){
        this.list.innerHTML = '';
    }
    render(data){
        //const when = dateFns.distanceInWordsToNow(
           // data.created_at.toDate(),
            //{ addSuffix: true }
        //const when = data.created_at.toDate();
        
        let when;
        if(data.created_at.toDate().getHours() < 12){
            when = data.created_at.toDate().getHours() + " : " + data.created_at.toDate().getMinutes() + " am";
        }else if(data.created_at.toDate().getHours() > 12){
            when = (data.created_at.toDate().getHours()-12) + " : " + data.created_at.toDate().getMinutes() + " pm";
        }else{
            when = data.created_at.toDate().getHours() + " : " + data.created_at.toDate().getMinutes() + " pm";
        }
        
        let bool = data.username == localStorage.getItem('username') ? 1 : 0;
        let className = "";
        let clas = "";
        if(bool){
            className = "blue";
            clas = "right";
        }else{
            className = "grey";
        }
        const html = `
            <li class="list-group-item ${className}">
                <div class="username ${clas}">${data.username}:<br></div>
                <div class="message ${clas}">${data.message}</div>
                <div class="time ${clas}">${when}</div>
            </li>
        `;
        
        this.list.innerHTML += html;
        
    }
}

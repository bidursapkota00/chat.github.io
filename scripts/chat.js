class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message){
        //format a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //save the chat document
        const response = await this.chats.add(chat);
        return response;
    }
    getChats(callback){
        this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    //update the ui
                    callback(change.doc.data());
                }
            });
            scroll();
        });
    }
    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
    }
    updateRoom(room){
        this.room = room;
        // console.log('room updated');
        if(this.unsub){
            this.unsub();
        }   
    }
}

// setTimeout(() => {
//     chatroom.updateRoom('general');
//     chatroom.updateName('bimal');
//     chatroom.getChats(data => {
//         console.log(data);
//     });
//     chatroom.addChat('hello');
// }, 3000);

// chatroom.addChat('hello')
//  .then(() => console.log('chat aded'))
//  .catch(err => console.log(err));
const login = document.querySelector('.login');

login.addEventListener('click', e => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log('success login');
            if(result.additionalUserInfo.isNewUser){
                localStorage.setItem('username', result.additionalUserInfo.profile.given_name);
            }
            if(!localStorage.getItem('username') || localStorage.getItem('username') !== result.additionalUserInfo.profile.given_name){
                localStorage.setItem('username', result.additionalUserInfo.profile.given_name);  
            }
            //window.location.href = "index.html";
            window.location.replace("index.html");
        }).catch((error) => {
            console.log(error);
            console.log('failed login');
        });
});

'use strict'

const signinBtn = document.getElementById('signin-btn')
const form = document.querySelector('form')
const email = document.getElementById('email')
const password = document.getElementById('password')
const signinTab = document.querySelector('.form-theme')

signinBtn.addEventListener('click', ()=> {
    if (email.value !== '' || password.value !== '') {
    const signinData = {
        email: email.value,
        password: password.value,
    }
    email.value = ''
    password.value = ''
    
    const myHeaders = new Headers()
    myHeaders.append('Authorization', 'token927382637')
    return fetch("http://localhost:7000/api/v1/auth/signin", {
        method: 'POST',
        headers: {
            'content-Type' : 'application/json',
            'Authoization': myHeaders
        },
        body: JSON.stringify(signinData)
    })
    .then(res => {
        if (!res.ok) {
            signinTab.textContent = 'login details do not match'
            signinTab.classList.add('danger')
            setTimeout(() => {
                window.location.reload()
            }, 3000);                
            return;
        }


        return res.json();
    }).then((data) => {
        localStorage.setItem('token',JSON.stringify(data.token))
        signinTab.textContent = 'login successful'
        signinTab.classList.add('success')
        setTimeout(() => {
            window.location.replace('http://127.0.0.1:5501/makeAnOrder.html')
        }, 1000);  
    })
} else {
    signinTab.classList.add('danger')
    setTimeout(() => {
        window.location.reload()
    }, 3000);
}
})

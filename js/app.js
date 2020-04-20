'use strict'

const signupBtn = document.getElementById('signup-btn')
const form = document.querySelector('form')
const firstName = document.getElementById('f-name')
const lastName = document.getElementById('l-name')
const email = document.getElementById('email')
const userName = document.getElementById('username')
const password = document.getElementById('password')

signupBtn.addEventListener('click', ()=> {
    const signupData = {
        firstName: firstName.value,
        lastName: lastName.value,
        userName: userName.value,
        email: email.value,
        password: password.value,
    }
    
    fetch("http://localhost:7000/api/v1/auth/signup", {
        method: 'POST',
        headers: {
            'content-Type' : 'application/json'
        },
        body: JSON.stringify(signupData)
    })
    .then(res => {
        console.log(res)
    })
    .catch(err=> {
        console.log(err)
    })
})
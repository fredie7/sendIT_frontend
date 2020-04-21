'use strict'

const signupBtn = document.getElementById('signup-btn')
const form = document.querySelector('form')
const firstName = document.getElementById('f-name')
const lastName = document.getElementById('l-name')
const email = document.getElementById('email')
const userName = document.getElementById('username')
const password = document.getElementById('password')
const signupTab = document.querySelector('.form-theme')

signupBtn.addEventListener('click', ()=> {
    if (lastName.value !== '' || email.value !== '' || userName.value !== '' || password.value !== '') {
    const signupData = {
        name: `${firstName.value} ${lastName.value}`,
        userName: userName.value,
        email: email.value,
        password: password.value,
    }
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    userName.value = ''
    password.value = ''
    
    fetch("http://localhost:7000/api/v1/auth/signup", {
        method: 'POST',
        headers: {
            'content-Type' : 'application/json'
        },
        body: JSON.stringify(signupData)
    })
    .then(res => {
        if (!res.ok) {
            //handle failure case
                signupTab.textContent = 'user already exists'
                signupTab.classList.add('danger')
                setTimeout(() => {
                    window.location.reload()
                }, 3000);                
                // throw new Error('something went wrong with your fetch')
                return;
            }
            // console.log(res.json())
            signupTab.textContent = 'signup successful'
            signupTab.classList.add('success')
            setTimeout(() => {
                window.location.reload()
            }, 3000);                
        // handle success case
    })
    } else {
        signupTab.textContent = 'please, fill in all fields'
        // signupTab.style.color = 'red'
        signupTab.classList.add('danger')
        setTimeout(() => {
            window.location.reload()
        }, 3000);
}
})

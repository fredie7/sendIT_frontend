'use strict'

const state = {
    signupBtn : document.getElementById('signup-btn'),
    form : document.querySelector('form'),
    firstName : document.getElementById('f-name'),
    lastName : document.getElementById('l-name'),
    email : document.getElementById('email'),
    userName : document.getElementById('username'),
    password : document.getElementById('password'),
    signupTab : document.querySelector('.form-theme'),
}

class fetchData {
    render() {
        state.signupBtn.addEventListener('click', ()=> {
            if (state.lastName.value !== '' || state.email.value !== '' || state.userName.value !== '' || state.password.value !== '') {
            const signupData = {
                name: `${state.firstName.value} ${state.lastName.value}`,
                userName: state.userName.value,
                email: state.email.value,
                password: state.password.value,
            }
            state.firstName.value = ''
            state.lastName.value = ''
            state.email.value = ''
            state.userName.value = ''
            state.password.value = ''
            
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
                        state.signupTab.textContent = 'user already exists'
                        state.signupTab.classList.add('danger')
                        setTimeout(() => {
                            window.location.reload()
                        }, 3000);                
                        // throw new Error('something went wrong with your fetch')
                        return;
                    }
                    // console.log(res.json())
                    state.signupTab.textContent = 'signup successful'
                    state.signupTab.classList.add('success')
                    setTimeout(() => {
                        window.location.reload()
                    }, 3000);                
                // handle success case
            })
            } else {
                state.signupTab.textContent = 'please, fill in all fields'
                // state.signupTab.style.color = 'red'
                state.signupTab.classList.add('danger')
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
        }
        })
    }
}

class sendData {
    render() {
        const pageDisplay = new fetchData().render()
        return pageDisplay
    }
}

const root = new sendData()
root.render()
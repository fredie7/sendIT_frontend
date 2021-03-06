'use strict'

const state = {
    signinBtn : document.getElementById('signin-btn'),
    form : document.querySelector('form'),
    email : document.getElementById('email'),
    password : document.getElementById('password'),
    signinTab : document.querySelector('.form-theme'),
}

class fetchData {
    render() {
        state.signinBtn.addEventListener('click', ()=> {
            if (state.email.value !== '' || state.password.value !== '') {
            const signinData = {
                email: state.email.value,
                password: state.password.value,
            }
            state.email.value = ''
            state.password.value = ''
            
            return fetch("http://localhost:7000/api/v1/auth/signin", {
                method: 'POST',
                headers: {
                    'content-Type' : 'application/json',
                },
                body: JSON.stringify(signinData)
            })
            .then(res => {
                if (!res.ok) {
                    state.signinTab.textContent = 'login details do not match'
                    state.signinTab.classList.add('danger')
                    setTimeout(() => {
                        window.location.reload()
                    }, 3000);                
                    return;
                }
        
        
                return res.json();
            }).then((data) => {
                localStorage.setItem('token',JSON.stringify(data.token))
                state.signinTab.textContent = 'login successful'
                state.signinTab.classList.add('success')
                setTimeout(() => {
                    window.location.replace('http://127.0.0.1:5501/makeAnOrder.html')
                }, 1000);  
            })
        } else {
            state.signinTab.classList.add('danger')
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
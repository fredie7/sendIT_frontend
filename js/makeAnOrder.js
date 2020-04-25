'use strict'

const state = {
    pickupLocation : document.querySelector('.pickUpLocation'),
    deliveryLocation : document.querySelector('.deliveryLocation'),
    presentLocation : document.querySelector('.presentLocation'),
    receiverPhone : document.querySelector('.receiverPhone'),
    receiverEmail : document.querySelector('.receiverEmail'),
    parcelDesc : document.querySelector('.parcelDesc'),
    parcelWeight : document.querySelector('.weight'),
    orderBtn : document.querySelector('.btn-order'),
    newOrderTab : document.querySelector('.newOrder-theme'),
    notification : document.querySelector('.notify'),
    form: document.querySelector('form'),
}

class fetchData {
    render() {
        state.form.addEventListener('submit', (e)=> {
            e.preventDefault()
            if (state.pickupLocation.value !== '' || state.deliveryLocation.value !== '' || state.presentLocation.value !== ''
                || state.receiverPhone.value !== '' || state.receiverEmail.value !== '' || state.parcelDesc.value !== '' || state.parcelWeight.value !== '') {
            const orderData = {
                pickupLocation: state.pickupLocation.value,
                deliveryLocation: state.deliveryLocation.value,
                presentLocation: state.presentLocation.value,
                receiverPhone: state.receiverPhone.value,
                receiverEmail: state.receiverEmail.value,
                description: state.parcelDesc.value,
                weight: state.parcelWeight.value
            }
            state.pickupLocation.value = '';
            state.deliveryLocation.value = '';
            state.presentLocation.value = '';
            state.receiverPhone.value = '';
            state.receiverEmail.value = '';
            state.parcelDesc.value = '';
            state.parcelWeight.value = '';
            const token = JSON.parse(localStorage.getItem('token'))
            fetch("http://localhost:7000/api/v1/parcels", {
                method: 'POST',
                headers: {
                    'content-Type' : 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(orderData)
            })
            .then(res => {
                if (!res.ok) {
                    state.notification.textContent = 'something went wrong'
                    state.notification.classList.add('danger')
                    setTimeout(() => {
                        window.location.reload()
                    }, 3000);                
                    return;
                }
                state.newOrderTab.textContent = 'order created'
                state.newOrderTab.classList.add('success')
                setTimeout(() => {
                    window.location.replace('http://127.0.0.1:5501/seeYourOrders.html')
                }, 1000);                
                return res.json()
            })
        } else {
                state.notification.textContent = 'please, fill in required fields'
                state.notification.classList.add('danger')
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
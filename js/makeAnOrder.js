'use strict'

const pickupLocation = document.querySelector('.pickUpLocation')
const deliveryLocation = document.querySelector('.deliveryLocation')
const presentLocation = document.querySelector('.presentLocation')
const receiverPhone = document.querySelector('.receiverPhone')
const receiverEmail = document.querySelector('.receiverEmail')
const parcelDesc = document.querySelector('.parcelDesc')
const parcelWeight = document.querySelector('.weight')
const orderBtn = document.querySelector('.btn-order')
const newOrderTab = document.querySelector('.newOrder-theme')
const notification = document.querySelector('.notify')

orderBtn.addEventListener('click', ()=> {
    if (pickupLocation.value !== '' || deliveryLocation.value !== '' || presentLocation.value !== ''
        || receiverPhone.value !== '' || receiverEmail.value !== '' || parcelDesc.value !== '' || parcelWeight.value !== '') {
    const orderData = {
        pickupLocation: pickupLocation.value,
        deliveryLocation: deliveryLocation.value,
        presentLocation: presentLocation.value,
        receiverPhone: receiverPhone.value,
        receiverEmail: receiverEmail.value,
        description: parcelDesc.value,
        weight: parcelWeight.value
    }
    pickupLocation.value = '';
    deliveryLocation.value = '';
    presentLocation.value = '';
    receiverPhone.value = '';
    receiverEmail.value = '';
    parcelDesc.value = '';
    parcelWeight.value = '';
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
            notification.textContent = 'something went wrong'
            notification.classList.add('danger')
            setTimeout(() => {
                window.location.reload()
            }, 3000);                
            return;
        }
        newOrderTab.textContent = 'order created'
        newOrderTab.classList.add('success')
        setTimeout(() => {
            window.location.href('http://127.0.0.1:5501/seeYourOrders.html')
        }, 1000);                
        return res.json()
    })
} else {
        notification.textContent = 'please, fill in required fields'
        notification.classList.add('danger')
        setTimeout(() => {
            window.location.reload()
        }, 3000);
}
})

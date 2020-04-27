'use strict'

const state = {
    pending : document.querySelector('.pend'),
    delivered : document.querySelector('.deliver'),
    cancelled : document.querySelector('.cancel'),
    items : document.querySelector('.items'),
    token : JSON.parse(localStorage.getItem('token')),
    id : JSON.parse(localStorage.getItem('id')),
    userName: document.querySelector('.username'),
    userEmail: document.querySelector('.useremail'),
    username: document.querySelector('.usernames')
}

class fetchUserData {
    render() {   
        fetch(`http://localhost:7000/api/v1/users/${state.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': state.token
            },
        })
        .then(res=> res.json())
        .then(data=> {
            console.log(data)
            state.userName.textContent = data.name;
            state.userEmail.textContent = data.email;
            state.username.textContent = data.name.split(" ").splice(0,1);
        })
    }
}

class fetchData {
    render() {
        fetch('http://localhost:7000/api/v1/parcels', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': state.token
    },
})
.then(res=> {
    return res.json()
})
.then(data=> {
    const orderData = data
    let clientOrder = ''
    let totalPending = 0
    let totalDelivered = 0
    let totalCancelled = 0
  orderData.forEach(order=> {
    console.log(order)
    // console.log(order.createdBy)
    // console.log(state.id)
    if (order.createdBy === state.id) {
        switch (order.status) {
            case 'pending':
                totalPending += 1
                break;
            case 'delivered':
                totalDelivered += 1
                break;
            case 'cancelled':
                totalCancelled += 1
            default:
                break;
        }
    }
    
    if (order.createdBy === state.id) {
        const orderHtml = `
            <div class="itemz">
                <div class="item-desc">
                    <p id="desc">${order.description}</p>
                </div>
                <div class="item-details">
                    <p>Order <span id="status">${order.status}</span></p>
                    <p>Created on <span id="created">${order.createdAt}</span></p>
                </div>
                <button class="view-order">View Order</button>
            </div>
        `
        clientOrder += orderHtml
    }
        
  })
        state.items.innerHTML = clientOrder;  
        console.log(totalPending, totalDelivered)
        state.pending.textContent = totalPending
        state.delivered.textContent = totalDelivered
        state.cancelled.textContent = totalCancelled
        })
    }
}

class sendData {
    render() {
        const pageDisplay = new fetchData().render()
        const userDisplay = new fetchUserData().render()
        return {
            pageDisplay,
            userDisplay
        }
    }
}

const root = new sendData()
root.render()
'use strict'

const state = {
    pending : document.querySelector('.pend'),
    delivered : document.querySelector('.deliver'),
    cancelled : document.querySelector('.cancel'),
    container : document.querySelector('.container'),
    items : document.querySelector('.items'),
    token : JSON.parse(localStorage.getItem('token')),
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
  })
  state.items.innerHTML = clientOrder;  
  console.log(totalPending, totalDelivered)
  state.pending.textContent = totalPending
  state.delivered.textContent = totalDelivered
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
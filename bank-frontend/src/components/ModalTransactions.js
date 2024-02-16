import React from 'react'
import './styles/ModalTransaction.css'
export default function ModalTransactions(props) {
    const category = props.data.data[0].category
    console.log(props.data.data)
  return (
    <div>
    <div className="modal">
        <div className='modal-content'>
            <h1>Category Transactions</h1>
            <h2> Category: {category} </h2>
            {props.data.data
                .map(trans => (
                    <div key={trans._id}>
                        <p>Vendor: {trans.vendor}</p><p>Amount: {trans.amount < 0 ? `-$${Math.abs(trans.amount)}` : `$${trans.amount}`}</p><hr></hr>
                    </div>
                ))}
        </div>
    </div>
</div>
  )
}

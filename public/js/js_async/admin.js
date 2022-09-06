const deleteTransaction = (btn) => {
    const transaction_id = btn.parentNode.querySelector('[name = transaction_id').value
    const wallet_id = btn.parentNode.querySelector('[name = wallet_id').value
    const amount = btn.parentNode.querySelector('[name = amount').value
    const csrf = btn.parentNode.querySelector('[name = _csrf').value

    fetch('/incomeDetails/' + transaction_id,{
        method: 'DELETE',
        headers: {
            'csrf-token': csrf,
            'wallet_id': wallet_id,
            'amount': amount
        }
    })
    .then(result => {
        console.log(result)
        return result.json()
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))
}

const deleteWallet = (btn) => {
    const wallet_id = btn.parentNode.querySelector('[name = wallet_id').value
    const csrf = btn.parentNode.querySelector('[name = _csrf').value

    const walletElement = btn.closest('tr')

    fetch('/deleteWallet/' + wallet_id,{
        method: 'DELETE',
        headers: {
            'csrf-token': csrf,
        }
    })
    .then(result => {
        return result.json()
    })
    .then(data => {
        // console.log(data)
        walletElement.parentNode.removeChild(walletElement)
    })
    .catch(err => console.log(err))
}

async function deleteElement(url, id, goToUrl) {
    try {
        const response = await fetch(url, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })

        if (response.ok) {
            console.log(' deleted successfully')
            window.location.href = goToUrl
        } else {
            console.error('Failed ')
        }
    } catch (error) {
        console.error('Error:', error)
    }
}
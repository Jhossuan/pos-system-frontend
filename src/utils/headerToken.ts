export const getHeaderToken = () => {
    return { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
}
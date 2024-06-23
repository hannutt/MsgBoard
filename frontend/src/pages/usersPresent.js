const UsersPresent=()=>{
   
    var users = localStorage.getItem("present")
    return (
        <div className="users">
            <p>Logged in users: {users}</p>
        </div>
    )
}
export default UsersPresent;
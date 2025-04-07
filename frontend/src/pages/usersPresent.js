const UsersPresent=()=>{
   
    var users = localStorage.getItem("present")
    return (
        <div className="title">
            <p><b>Logged in user:</b> {users}</p>
        </div>
    )
}
export default UsersPresent;
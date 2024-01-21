import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import API_URL from "../constant";

function MyProfile() {

    const [User, setUser] = useState({})
    useEffect(() => {
        let url = API_URL + '/my-profile/' + localStorage.getItem('UserId')
        axios.get(url)
            .then((res) => {
                // console.log(res.data)
                if (res.data.user) {
                    setUser(res.data.user)
                }
            })
            .catch((err) => {
                alert('Sever Err')
            })
    }, [])



    return (
        <div>
            <Header />
            <div className="m-3 p-3" >
                <h3 className="text-center mt-2"> USER PROFILE </h3>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td> USERNAME </td>
                            <td> EMAIL ID </td>
                            <td> MOBILE </td>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>  {User.username} </td>
                            {/*<td>  {user.email} </td>
                            <td>  {user.mobile} </td> */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default MyProfile;
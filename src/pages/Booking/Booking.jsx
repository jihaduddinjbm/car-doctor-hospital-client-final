import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import BookingRow from "./BookingRow";
import axios from "axios";


const Booking = () => {
    const {user} = useContext(AuthContext);
    const [booking, setBooking] = useState([]);

    const url = `http://localhost:5000/booking?email=${user?.email}`;
    useEffect( () => {
        axios.post(url,  { withCredentials: true })
        .then(res => {
            console.log('success got booking', res.data)
        })
        // fetch(url, { withCredentials: 'include'})
        // .then(res => res.json())
        // .then(data => setBooking(data))
    } ,[url]) 

    const handleDelete = id => {
        const proceed = confirm('Are you sure you want to delete');
        if(proceed){
           fetch(`http://localhost:5000/booking/${id}`, {
            method: 'DELETE'
           })
           .then(res => res.json())
           .then(data => {
            console.log(data); 
            if(data.deletedCount > 0){
                alert('deleted successfully');
                const remaining = booking.filter(booking =>booking._id !==id);
                setBooking(remaining);
            }
           })
        }
    }
    
    const handleBookingConfirm = id => {
        fetch(`http://localhost:5000/booking/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({status: 'confirm'})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                // update state
                const remaining = booking.filter(booking => booking._id !==id);
                const updated = booking.find(booking => booking._id === id);
                updated.status= 'confirm'
                const newBooking = [updated, ...remaining];
                setBooking(newBooking);   
            }
        })
    }

    return (
        <div>
            <h2 className="text-3xl text-orange-500 text-center">Booking: {booking.length}</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
         
        </th>
        <th>img</th>
        <th>email</th>
        <th>data</th>
        <th>price</th>
        <th>status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        booking.map(booking => <BookingRow
             key={booking._id}
             booking={booking}
             handleDelete={handleDelete}
             handleBookingConfirm={handleBookingConfirm}
             ></BookingRow>)
     }
     
    </tbody>
  </table>
</div>

        </div>
    );
};

export default Booking;
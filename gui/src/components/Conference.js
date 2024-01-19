import "./Conference.css";

function Conference(props) {
  const { item } = props; // object destructuring for accessing the data sent by the "UserList" parent component

  //pass data to RegularUser/PowerUser component through props (named "item" in this case)
  return (
    <div className="conference">
        <div className='regular-user'>
      <div className='username'>
        {item.nume}
      </div>
      <div className='fullName'>
        {item.descriere}
      </div>
    </div>
    </div>
  );
}

export default Conference;

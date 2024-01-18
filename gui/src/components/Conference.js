import "./Conference.css";

function User(props) {
  const { item } = props; // object destructuring for accessing the data sent by the "UserList" parent component

  //pass data to RegularUser/PowerUser component through props (named "item" in this case)
  return (
    <div className="conference">
        <div className='regular-user'>
      <div className='username'>
        {item.username}
      </div>
      <div className='fullName'>
        {item.password}
      </div>
      Regular user
    </div>
    </div>
  );
}

export default User;

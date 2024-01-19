import "./Article.css";

function User(props) {
  const { item } = props; // object destructuring for accessing the data sent by the "UserList" parent component
  //pass data to RegularUser/PowerUser component through props (named "item" in this case)
  return (
    <div className="article">
        <div className='regular-user'>
      <div className='username'>
        {item.title}
      </div>
      <div className='fullName'>
        {item.body}
      </div>
    </div>
    </div>
  );
}

export default User;
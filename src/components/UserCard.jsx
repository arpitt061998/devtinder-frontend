const UserCard = ( {user} ) => {
  const {firstName, lastName, photoUrl, about, gender, age} = user;
  return (
    <div className="card bg-base-100 w-96 shadow-sm mb-4">
      <figure>
        <img
          src={photoUrl}
          alt={firstName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <p>{age}</p>
        <p>{gender}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-secondary">Ignore</button>
          <button className="btn btn-pink">Interested</button>
        </div>
      </div>
    </div>
  )
}

export default UserCard;

import "./styles/Transaction.css";

export default function Transaction(props) {
  const dateString = props.tran.date instanceof Date 
  ? props.tran.date.toLocaleDateString() // Using Date object's toLocaleDateString() method
  : new Date(props.tran.date).toLocaleDateString();
  return (
    <>
      <tr>
        <td>{props.tran.vendor}</td>
        <td>{props.tran.category}</td>
        <td style={{color: props.tran.amount<0 ? "red" : "green"}}>{props.tran.amount} $</td>
        <td>{dateString}</td>
        <td>
          <button  onClick={() => props.DeleteTransaction(props.tran._id)}style={{ background: "red" }}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}

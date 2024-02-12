import "./styles/Transaction.css";

export default function Transaction(props) {
  return (
    <>
      <tr>
        <td>{props.tran.vendor}</td>
        <td>{props.tran.category}</td>
        <td>{props.tran.amount} $</td>
        <td>
          <button  onClick={() => props.DeleteTransaction(props.tran._id)}style={{ background: "red" }}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}

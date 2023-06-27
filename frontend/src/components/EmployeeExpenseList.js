import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import {
  Button,
  Image,
  Card,
  Row,
  Col,
  Modal,
  Steps,
  Pagination,
  ConfigProvider,
  Empty,
} from "antd";
import { useDeleteExpenseMutation } from "../slices/expensesApiSlice";
import { useState, useEffect } from "react";

function ExpenseList(props) {
  function formatDate(date) {
    return dayjs(date).format("DD/MM/YYYY");
  }

  const [deleteExpenese, { isLoading }] = useDeleteExpenseMutation();

  async function handleDelete(expense_id) {
    if (!window.confirm("Are you sure to delete the Expense?")) return;
    try {
      const res = await deleteExpenese(expense_id);
      props.refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const [selected, setSelected] = useState(null);
  const [openModal, setopenModal] = useState(false);
  const [page, setPage] = useState(1);
  let pageSize = 0;
  const [photos, setPhotos] = useState([]);
  const [photoUi, setPhotoUi] = useState("");
  const statusMappings = {
    EmployeeRequested: 1,
    HRApproved: 2,
    DirectorApproved: 3,
    FinanceDepartmentApproved: 4,
    Approved: "process",
    Rejected: "error",
    InProcess: "process",
  };

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [window.innerWidth]);

  if(windowSize<600){
    pageSize = 3
  }
  else{pageSize = 6}
  let indexOfFirstPage, indexOfLastPage, currentData;
  indexOfLastPage = page * pageSize;
  indexOfFirstPage = indexOfLastPage - pageSize;
  currentData = props.data.expenses.slice(indexOfFirstPage, indexOfLastPage);
  console.log(pageSize);

  return (
    <>
      {/*
    <Table hover bordered striped responsive>
      <thead>
        <tr style={{ textAlign: 'center' }}>
          //<th>#</th>
          <th>Employee Name</th>
          <th>Employee Id</th>
          <th>Project Name</th>
          <th>Project Id</th>
          <th>Bill Proof</th>
          <th>Current Level</th>
          <th>Status</th>
          <th>Amount</th>
          <th>Description</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.data.expenses.map((expense) => (
          <tr key={expense._id} style={{ textAlign: 'center' }}>
            <td>{expense.empName}</td>
            <td>{expense.empId}</td>
            <td>{expense.projName}</td>
            <td>{expense.projId}</td>
            <td>{expense.billProof}</td>
            <td>{expense.currentStatus}</td>
            <td>
              <span style={{ color: '#0000FF' }}>{expense.status}</span>
            </td>
            <td>{expense.amount}</td>
            <td>{expense.description}</td>
            <td>{formatDate(expense.date)}</td>
            <td align="center">
              <RiDeleteBin2Fill
                color="#FF0000"
                size={'1.5em'}
                onClick={() => handleDelete(expense._id)}
                style={{ cursor: 'pointer' }}
              />
            </td>
          </tr>
        ))}
        <tr style={{ all: 'initial' }}>
          <td style={{ borderStyle: 'none' }}></td>
        </tr>
        <tr style={{ all: 'initial' }}>
          <td style={{ all: 'initial' }}>
            <Paginate pages={props.data.pages} page={props.data.page} />
          </td>
        </tr>
      </tbody>
    </Table>
    */}

      {currentData.length === 0 && (
        <ConfigProvider
          theme={{
            token: {
              colorText: "#dce0e6",
              fontSize: "21px",
            },
          }}
        >
          <Empty description="No claims"></Empty>
        </ConfigProvider>
      )}
      {windowSize > 600 ? (
        <Row gutter={[24, 16]}>
          {currentData.map((row) => {
            return (
              <Col span={8} key={row._id}>
                <Card
                  className="cards"
                  headStyle={{
                    textAlign: "center",
                    background: "#3c4c5d",
                    color: "white",
                  }}
                  style={{
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                  }}
                  title={row.description}
                  extra={
                    <DeleteOutlined
                      style={{
                        cursor: "pointer",
                        fontSize: "23px",
                        color: "white",
                      }}
                      onClick={() => {
                        handleDelete(row._id);
                      }}
                    />
                  }
                >
                  <div>
                    <h6>
                      Project Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      <span>{row.projName}</span>
                    </h6>
                    <h6>
                      Amount (Rs):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      <span>{row.amount}</span>
                    </h6>
                    <h6>
                      Date of Expense:&nbsp; <span>{formatDate(row.date)}</span>
                    </h6>
                    <p style={{ textAlign: "right" }}>
                      <Button
                        className="check-status-btn"
                        size="small"
                        style={{
                          background: "none",
                          cursor: "pointer",
                          border: "1px solid",
                        }}
                        onClick={() => {
                          setSelected(row);
                          setopenModal(true);
                          setPhotoUi(row._id);
                        }}
                      >
                        Check Status
                      </Button>
                    </p>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Row gutter={[16,16]}>
          {currentData.map((row,_id) => {
            return (
              <Card
                key={_id}
                className="cards-mobile"
                headStyle={{
                  textAlign: "center",
                  background: "#3c4c5d",
                  color: "white",
                }}
                style={{
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                }}
                title={row.description}
                extra={
                  <DeleteOutlined
                    style={{
                      cursor: "pointer",
                      fontSize: "23px",
                      color: "white",
                    }}
                    onClick={() => {
                      handleDelete(row._id);
                    }}
                  />
                }
              >
                <div>
                  <h6>
                    Project Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                    <span>{row.projName}</span>
                  </h6>
                  <h6>
                    Amount (Rs):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                    <span>{row.amount}</span>
                  </h6>
                  <h6>
                    Date of Expense:&nbsp; <span>{formatDate(row.date)}</span>
                  </h6>
                  <p style={{ textAlign: "right" }}>
                    <Button
                      className="check-status-btn"
                      size="small"
                      style={{
                        background: "none",
                        cursor: "pointer",
                        border: "1px solid",
                      }}
                      onClick={() => {
                        setSelected(row);
                        setopenModal(true);
                        setPhotoUi(row._id);
                      }}
                    >
                      Check Status
                    </Button>
                  </p>
                </div>
              </Card>
            );
          })}
        </Row>
      )}

      {currentData.length !== 0 && (
        <ConfigProvider
          theme={{
            token: {
              colorTextDisabled: "rgba(0, 0, 0, 0.88)",
            },
          }}
        >
          <Pagination
            className="pagination"
            simple
            responsive
            total={props.data.expenses.length}
            current={page}
            pageSize={pageSize}
            showQuickJumper
            onChange={(page) => {
              setPage(page);
            }}
          />
        </ConfigProvider>
      )}

      {openModal && (windowSize>600)?(
        <Modal
          open={openModal}
          onCancel={() => {
            setopenModal(false);
            setSelected(null);
          }}
          centered
          width={750}
          bodyStyle={{ padding: "20px" }}
          footer={null}
        >
          <h2>{selected.description}</h2>
          <div className="claim-card-modal">
            <div className="modal-details">
              <p>
                Project Name<h4>{selected.projName}</h4>
              </p>
              <p>
                Amount (Rs)<h4>{selected.amount}</h4>
              </p>
              <p>
                Date of Expense<h4>{formatDate(selected.date)}</h4>
              </p>
            </div>

            <div className="modal-details-1">
              <div className="modal-status">
                <h5>Status</h5>

                <Steps
                  status={statusMappings[selected.status]}
                  size="small"
                  direction="vertical"
                  current={statusMappings[selected.currentStatus]}
                  items={[
                    {
                      title: "Claim Submitted",
                    },
                    {
                      title: "HR Approval",
                    },
                    {
                      title: "Director Approval",
                    },
                    {
                      title: "Reimbursement",
                    },
                  ]}
                />
              </div>

              <div className="modal-proof">
                <h5>Proof</h5>
                {photos.map(({ photo, _id }) => {
                  let fname = selected.billProof.slice(
                    selected.billProof.indexOf(":") + 2,
                    selected.billProof.indexOf("lastModified") - 3
                  );

                  if (
                    photo.slice(8) === fname ||
                    photo.slice(9) === fname ||
                    photo.slice(10) === fname
                  ) {
                    return (
                      <Image
                        key={_id}
                        src={`http://localhost:4000/${photo}`}
                        alt="proof"
                        width={400}
                        height={170}
                      />
                    );
                  }
                })}
              </div>
            </div>

            {selected.reason && (
              <div className="rejection-reason">
                <h5>Reason for Rejection</h5>
                <p>{selected.reason}</p>
              </div>
            )}
          </div>
        </Modal>
      ): openModal &&
      (
        <Modal
          open={openModal}
          onCancel={() => {
            setopenModal(false);
            setSelected(null);
          }}
          centered
          bodyStyle={{ padding: "10px" }}
          footer={null}
        >
          <h3>{selected.description}</h3>
          <div className="claim-card-modal-mobile">

            <div className="modal-details-1-mobile">
              <div className="modal-status-mobile">
                <h6>Status</h6>

                <Steps
                  status={statusMappings[selected.status]}
                  size="small"
                  direction="vertical"
                  current={statusMappings[selected.currentStatus]}
                  items={[
                    {
                      title: "Claim Submitted",
                    },
                    {
                      title: "HR Approval",
                    },
                    {
                      title: "Director Approval",
                    },
                    {
                      title: "Reimbursement",
                    },
                  ]}
                />
              </div>

              <div className="modal-proof-mobile">
                <h6>Proof</h6>
                {photos.map(({ photo, _id }) => {
                  let fname = selected.billProof.slice(
                    selected.billProof.indexOf(":") + 2,
                    selected.billProof.indexOf("lastModified") - 3
                  );

                  if (
                    photo.slice(8) === fname ||
                    photo.slice(9) === fname ||
                    photo.slice(10) === fname
                  ) {
                    return (
                      <Image
                        key={_id}
                        src={`http://localhost:4000/${photo}`}
                        alt="proof"
                        width={200}
                        height={200}
                      />
                    );
                  }
                })}
              </div>
            </div>

            {selected.reason && (
              <div className="rejection-reason-mobile">
                <h5>Reason for Rejection</h5>
                <p>{selected.reason}</p>
              </div>
            )}
          </div>
        </Modal>
      )
    }
    </>
  );
}

export default ExpenseList;

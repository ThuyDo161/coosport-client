import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableData from "../../../components/TableData/TableData";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  billInterface,
  cancelOrder,
  getOrder,
} from "../../../redux/reducer/user.slice";
import numberWithCommas, {
  messageConfirm,
  messageError,
  messageSave,
} from "../../../utils/GlobalFunction";
import { Column } from "react-table";
import Helmet from "../../../components/Helmet/Helmet";
import { Button } from "@mantine/core";

const Order = ({ userID }: { userID: string }) => {
  const order = useAppSelector((state) => state.user.order);
  const [detail, setDetail] = useState<billInterface | undefined>(undefined);
  const dispatch = useAppDispatch();
  const bills = order.map((item) => {
    let newStatus;
    switch (item.status) {
      case "0":
        newStatus = (
          <span className="badge badge-warning" data-tag="0">
            Đang chờ
          </span>
        );
        break;
      case "1":
        newStatus = (
          <span className="badge badge-primary" data-tag="1">
            Đang giao
          </span>
        );
        break;
      case "2":
        newStatus = (
          <span className="badge badge-success" data-tag="2">
            Đã giao
          </span>
        );
        break;
      default:
        newStatus = <span className="badge badge-danger">Lỗi</span>;
        break;
    }
    const newTotal = numberWithCommas(item.totalprice!);
    return {
      ...item,
      status: newStatus,
      totalprice: newTotal,
    };
  });
  const columns: Column<any>[] = [
    {
      accessor: "bill_id",
      Header: "ID",
    },
    {
      Header: "Ngày đặt",
      accessor: "bill_date",
    },
    {
      Header: "Tổng tiền",
      accessor: "totalprice",
    },
    {
      Header: "Trạng thái",
      accessor: "status",
    },
    {
      Header: "Thao tác",
      Cell: ({ row }: any) => (
        <>
          {detail && detail.bill_id === row.values.bill_id ? (
            <Button
              size="sm"
              color="red"
              variant="subtle"
              onClick={() => {
                View();
              }}
            >
              Đóng
            </Button>
          ) : (
            <Button
              size="sm"
              color="cyan"
              title="Xem thông tin đơn hàng"
              variant="subtle"
              onClick={() => {
                View(row.values.bill_id);
              }}
            >
              Xem
            </Button>
          )}

          {"    "}
          {row.values.status.props["data-tag"] === "0" ||
          row.values.status.props["data-tag"] === "1" ? (
            <Button
              size="sm"
              color="red"
              title="Hủy bỏ đơn hàng"
              variant="subtle"
              onClick={() => {
                handleDelete(row.values.bill_id);
              }}
            >
              Hủy
            </Button>
          ) : (
            ""
          )}
        </>
      ),
    },
  ];

  const columnsDetail: Column<any>[] = [
    {
      accessor: "id",
      Header: "ID",
    },
    {
      Header: "Tên mặt hàng",
      accessor: "item_name",
    },
    {
      Header: "Giá",
      accessor: "item_price",
    },
    {
      Header: "Số lượng",
      accessor: "quantity",
    },
  ];

  const View = (id?: string) => {
    setDetail(order.find((item) => item.bill_id === id));
  };
  const handleDelete = (id: string) => {
    const data = {
      bill_id: id,
      cancelOder: true,
    };
    messageConfirm(`Bạn có thật sự muốn hủy hóa đơn ${id}?`)
      .then((result) => {
        if (result.isConfirmed) {
          return dispatch(cancelOrder(data)).unwrap();
        } else {
          return Promise.reject();
        }
      })
      .then((res: any) => {
        if (res.code) {
          messageSave(res.message);
          return dispatch(getOrder(userID));
        } else {
          messageError(res.message);
        }
      });
  };
  useEffect(() => {
    dispatch(getOrder(userID));
  }, []);
  return (
    <div className="user__history">
      <Helmet title={"Thông tin người dùng"}>
        <div className="user__history-heading">
          LỊCH SỬ MUA HÀNG
          <p>Quản lý lịch sử mua sắm của bạn</p>
        </div>
        <hr />
        {order.length > 0 ? (
          <TableData columnInput={columns} dataInput={bills} />
        ) : (
          <h3>
            Chưa có đơn hàng nào, hãy
            <Link to="/catalog"> mua sắm </Link>
            ngay nào
          </h3>
        )}
        {detail && (
          <>
            <div className="user__history-heading" style={{ marginTop: 50 }}>
              CHI TIẾT ĐƠN HÀNG
            </div>
            <hr />
            <TableData columnInput={columnsDetail} dataInput={detail.items} />
            <div
              className="user__history-heading"
              style={{ textAlign: "right", marginTop: 20, fontSize: "1.5rem" }}
            >
              Tổng tiền đơn hàng: {numberWithCommas(detail.totalprice!)} VNĐ
            </div>
          </>
        )}
      </Helmet>
    </div>
  );
};

export default Order;

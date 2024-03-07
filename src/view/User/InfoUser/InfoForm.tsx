import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Helmet from "../../../components/Helmet/Helmet";
import { useAppDispatch } from "../../../redux/hook";
import { getUser, updateAPI } from "../../../redux/reducer/user.slice";
import { messageError, messageSave } from "../../../utils/GlobalFunction";

type InfoUserType = {
  nameUser?: string;
  addressUser?: string;
  telephoneUser?: string;
};

const InfoForm = ({ nameUser, addressUser, telephoneUser }: InfoUserType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: nameUser || "",
      address: addressUser || "",
      tel: telephoneUser || "",
    },

    validate: {
      name: (value: string) => (!value ? "Bạn phải nhập tên của mình!" : null),
      address: (value: string, values) =>
        !value ? "Địa chỉ là bắt buộc!" : null,
      tel: (value: string, values) =>
        !value ? "Số điện thoại là bắt buộc!" : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    dispatch(updateAPI(values))
      .unwrap()
      .then((res) => {
        if (res.code === 200) {
          messageSave(res.message);
          dispatch(getUser())
          navigate("/", { replace: true });
        } else messageError(res.error);
      });
  };
  return (
    <form className="user__form" onSubmit={form.onSubmit(handleSubmit)}>
      <Helmet title={"Thông tin người dùng"}>
        <div className="user__form-heading">
          HỒ SƠ CỦA TÔI
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>
        <hr />
        <div className="m-4">
          <TextInput
            label="Họ tên"
            placeholder="Họ tên (*)"
            size="md"
            className="form__input"
            {...form.getInputProps("name")}
            required
          />
        </div>
        <div className="m-4">
          <TextInput
            type="tel"
            placeholder="Điện thoại (*)"
            label="Điện thoại"
            size="md"
            className="form__input"
            {...form.getInputProps("tel")}
            required
          />
        </div>
        <div className="m-4">
          <TextInput
            placeholder="Địa chỉ (*)"
            label="Địa chỉ"
            size="md"
            className="form__input"
            {...form.getInputProps("address")}
            required
          />
        </div>
        <div className="m-4">
          <Button type="submit" className="form__submit-button">
            Cập nhật
          </Button>
        </div>
      </Helmet>
    </form>
  );
};

export default InfoForm;

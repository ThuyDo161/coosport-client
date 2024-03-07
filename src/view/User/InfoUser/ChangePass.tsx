import { PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import md5 from "md5";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Helmet from "../../../components/Helmet/Helmet";
import { useAppDispatch } from "../../../redux/hook";
import { changePassAPI, logOutAccount } from "../../../redux/reducer/user.slice";
import { messageError, messageSave } from "../../../utils/GlobalFunction";

type InfoUserType = {
  Password: string;
};

const ChangePass = ({ Password }: InfoUserType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      passOld: "",
      passNew: "",
      passConfirm: "",
    },

    validate: {
      passOld: (value: string) =>
        !value
          ? "Vui lòng nhập lại mật khẩu cũ"
          : md5(value) !== Password
          ? "Mật khẩu cũ không chính xác"
          : null,
      passNew: (value: string, values) =>
        !value
          ? "Vui lòng nhập mật khẩu mới"
          : value.length < 6
          ? "Mật khẩu tối thiểu phải có 6 kí tự!"
          : value === values.passOld
          ? "Mật khẩu mới phải khác mật khẩu cũ!"
          : null,
      passConfirm: (value: string, values) =>
        !value
          ? "Vui lòng nhập lại mật khẩu mới"
          : value === values.passNew
          ? null
          : "Xác nhận mật khẩu phải giống mật khẩu mới",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const payload = {
      passNew: values.passNew,
    };

    dispatch(changePassAPI(payload))
      .unwrap()
      .then((res) => {
        if (res.code === 200) {
          messageSave(res.message);
          dispatch(logOutAccount());
          navigate("/login", { replace: true });
        } else messageError(res.error);
      });
  };

  return (
    <form className="user__form" onSubmit={form.onSubmit(handleSubmit)}>
      <Helmet title={"Thay đổi mật khẩu"}>
        <div className="user__form-heading">
          ĐỔI MẬT KHẨU
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>
        <hr />
        <div className="m-4">
          <PasswordInput
            label="Mật khẩu cũ"
            size="md"
            className="form__input"
            {...form.getInputProps("passOld")}
            required
          />
        </div>
        <div className="m-4">
          <PasswordInput
            label="Mật khẩu mới"
            size="md"
            className="form__input"
            {...form.getInputProps("passNew")}
            required
          />
        </div>
        <div className="m-4">
          <PasswordInput
            label="Xác nhận mật khẩu"
            size="md"
            className="form__input"
            {...form.getInputProps("passConfirm")}
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

export default ChangePass;

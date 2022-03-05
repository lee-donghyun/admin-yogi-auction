import { Form, Input, Button, Row, Col, message } from "antd";
import { FC } from "react";
import { useSetRecoilState } from "recoil";
import auth from "../../services/api/auth";
import { authState } from "../../services/store";

const SignIn: FC = () => {
  const setIsAuthorized = useSetRecoilState(authState);
  const onFinish = (form: { id: string; password: string }) => {
    const res = auth.user(form.id, form.password);
    if (res) {
      setIsAuthorized(true);
      message.success(`${res.name}으로 로그인 되었습니다.`);
    } else {
      message.error("아이디 또는 비밀번호를 확인해주세요.");
    }
  };
  return (
    <>
      <Row justify="center">
        <Col span={8}>
          <Form name="sign_in" layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="아이디"
              name="id"
              rules={[{ required: true, message: "아이디를 입력해주세요." }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="비밀번호"
              name="password"
              rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                로그인
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SignIn;

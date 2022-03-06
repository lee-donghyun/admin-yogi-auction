import { Row, Col, message } from "antd";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { getRequestedItems } from "../../../services/api/firebase";
import { ItemTable, SearchForm } from "./components";
import { initialValues } from "./helper";

const Register: FC = () => {
  const [payload, setPayload] = useState(initialValues);
  const { data, error, mutate } = useSWR(payload, getRequestedItems);

  useEffect(() => {
    if (error) {
      message.error("데이터 로딩에 실패했습니다.");
      console.error(error);
    }
  }, [error]);

  return (
    <>
      <Row>
        <Col span={24}>
          <SearchForm setPayload={setPayload} data={data} error={error} />
        </Col>
      </Row>
      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <ItemTable data={data} error={error} mutate={mutate} />
        </Col>
      </Row>
    </>
  );
};

export default Register;

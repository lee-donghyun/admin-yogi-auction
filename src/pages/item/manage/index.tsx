import { Row, Col, Table, message } from "antd";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { getItems } from "../../../services/api/firebase";
import { SearchForm, columns } from "./components";

const initialValues = {
  search: { type: "name" },
};

const Manage: FC = () => {
  const [payload, setPayload] = useState(initialValues);
  const { data, error } = useSWR(payload, getItems);

  useEffect(() => {
    if (error) {
      message.error("데이터 로딩에 실패했습니다.");
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
          <Table
            sticky={{ offsetHeader: 64 }}
            rowSelection={{ type: "checkbox" }}
            rowKey={(row) => row.id}
            dataSource={data}
            columns={columns}
            loading={!data && !error}
          />
        </Col>
      </Row>
    </>
  );
};

export default Manage;

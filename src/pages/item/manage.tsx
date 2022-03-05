import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  Table,
  Image,
  Popover,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { FC, useState } from "react";
import useSWR from "swr";
import { getItems } from "../../services/api/firebase";

const Manage: FC = () => {
  const [form] = Form.useForm();
  const [payload, setPayload] = useState();
  const { data } = useSWR(payload, getItems);

  return (
    <>
      <Row>
        <Col span={24}>
          <Form
            form={form}
            name="search_items"
            style={{
              padding: "24px",
              background: "#fbfbfb",
              border: "1px solid #d9d9d9",
              borderRadius: "2px",
            }}
            onFinish={(form) => setPayload(form)}
            initialValues={{
              search: { type: "name" },
            }}
          >
            <Row>
              <Col span={24}>
                <Form.Item label="상품 검색">
                  <Input.Group compact>
                    <Form.Item name={["search", "type"]} noStyle>
                      <Select style={{ width: "100px" }}>
                        <Select.Option value="name">이름</Select.Option>
                        <Select.Option value="id">코드</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name={["search", "query"]} noStyle>
                      <Input style={{ width: "50%", maxWidth: "500px" }} />
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col
                span={24}
                style={{ display: "flex", justifyContent: "center", gap: 8 }}
              >
                <Button onClick={() => form.resetFields()}>초기화</Button>
                <Button type="primary" htmlType="submit" loading={!data}>
                  검색
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Table
            rowSelection={{ type: "checkbox" }}
            rowKey={(row) => row.id}
            dataSource={data}
            columns={columns}
            loading={!data}
          />
        </Col>
      </Row>
    </>
  );
};

export default Manage;

const itemOptionsRenderer = (options: Item.Option[]) => (
  <Popover
    placement="bottom"
    content={
      <div>
        {options.map((option: Item.Option) => (
          <p key={option.name}>
            {option.name} - {option.options.length}개
          </p>
        ))}
      </div>
    }
  >
    <Button>
      {options.reduce((acc, option) => acc + option.options.length, 0)}개
    </Button>
  </Popover>
);

const columns: ColumnsType<Item.Item> = [
  {
    title: "이름",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "코드",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "사진",
    dataIndex: "images",
    key: "images",
    render: ([src]) => (
      <Image
        src={src}
        style={{ width: 100, height: 100, objectFit: "contain" }}
      />
    ),
  },
  {
    title: "판매 입찰",
    dataIndex: "asks",
    key: "asks",
    render: itemOptionsRenderer,
  },
  {
    title: "구매 입찰",
    dataIndex: "bids",
    key: "bids",
    render: itemOptionsRenderer,
  },
  {
    title: "조회수",
    dataIndex: "view",
    key: "view",
  },
];

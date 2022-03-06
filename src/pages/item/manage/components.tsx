import { Form, Row, Col, Input, Select, Button, Popover, Image } from "antd";
import { ColumnsType } from "antd/lib/table";
import { FC } from "react";
import { initialValues } from "../register/helper";

export const SearchForm: FC<{
  setPayload: any;
  data?: Item.Item[];
  error: any;
}> = ({ setPayload, data, error }) => {
  const [form] = Form.useForm();
  return (
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
      initialValues={initialValues}
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
          <Button type="primary" htmlType="submit" loading={!data && !error}>
            검색
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

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

export const columns: ColumnsType<Item.Item> = [
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

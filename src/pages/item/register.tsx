import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  Table,
  Image,
  Modal,
  message,
  Space,
  Tag,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { FC, useEffect, useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import {
  acceptRegisterItem,
  getRequestedItems,
} from "../../services/api/firebase";

const initialValues = {
  search: { type: "name" },
  sort: "releasedAt",
};

enum ModalState {
  ACCEPT,
  NONE,
}

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

const SearchForm: FC<{
  setPayload: any;
  data?: Item.Requested[];
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
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label="정렬" name="sort">
            <Select>
              <Select.Option value="releasedAt">오래된 순</Select.Option>
              <Select.Option value="releasedAt,desc">최신 순</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="상태 필터" name="state">
            <Select allowClear placeholder="전체">
              <Select.Option value="REQUESTED">승인 대기</Select.Option>
              <Select.Option value="ACCEPTED">승인</Select.Option>
              <Select.Option value="REJECTED">반려</Select.Option>
            </Select>
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

const ItemTable: FC<{
  data?: Item.Requested[];
  error?: any;
  mutate: KeyedMutator<Item.Requested[]>;
}> = ({ error, data, mutate }) => {
  const [modal, setModal] = useState<ModalState>(ModalState.NONE);
  const [form] = Form.useForm();
  const [target, setTarget] = useState<Item.Requested | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onCancel = () => {
    setModal(ModalState.NONE);
    form.resetFields();
    setTarget(null);
  };
  const onFinish = async (form: any) => {
    if (form.options.length == 0) {
      message.warn("하나 이상의 옵션 명을 입력해주세요.");
      return;
    }
    try {
      setIsLoading(true);
      if (target) {
        await acceptRegisterItem(target, form.options);
        await mutate();
        onCancel();
        message.success("상품을 승인했습니다.");
      } else {
        throw new Error("");
      }
    } catch (error) {
      message.error("상품 승인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const columns: ColumnsType<Item.Requested> = [
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
      title: "설명",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "요청일",
      dataIndex: "releasedAt",
      key: "releasedAt",
    },
    {
      title: "등록",
      key: "register",
      render: (_, target) => (
        <Space direction="vertical">
          {target.state !== "ACCEPTED" && (
            <Button
              onClick={() => {
                setModal(ModalState.ACCEPT);
                setTarget(target);
              }}
            >
              승인
            </Button>
          )}
          {target.state !== "REJECTED" && <Button danger>반려</Button>}
        </Space>
      ),
    },
    {
      title: "상태",
      key: "state",
      dataIndex: "state",
      render: (state) => (
        <>
          {state == "ACCEPTED" && <Tag color="success">승인</Tag>}
          {state == "REJECTED" && <Tag color="error">반려</Tag>}
          {state == "REQUESTED" && <Tag>승인 대기</Tag>}
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        sticky={{ offsetHeader: 64 }}
        rowSelection={{ type: "checkbox" }}
        rowKey={(row) => row.id}
        dataSource={data}
        columns={columns}
        loading={!data && !error}
      />
      <Modal
        title="상품 승인"
        visible={modal === ModalState.ACCEPT}
        onOk={form.submit}
        confirmLoading={isLoading}
        onCancel={onCancel}
        cancelText="닫기"
        okText="승인"
      >
        <p>해당 상품의 모든 옵션을 입력하세요.</p>
        <Form
          onFinish={onFinish}
          name="item_option"
          form={form}
          initialValues={{ options: [""] }}
        >
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Form.Item
                    {...field}
                    key={field.key}
                    rules={[{ required: true, message: "필수 값입니다." }]}
                  >
                    <Space>
                      <Input placeholder="옵션 명" />
                      {fields.length > 1 && (
                        <Button onClick={() => remove(field.name)} danger>
                          제거
                        </Button>
                      )}
                    </Space>
                  </Form.Item>
                ))}
                <Button onClick={() => add()}>추가</Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};

export default Register;

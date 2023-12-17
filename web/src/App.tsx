import {
	Input,
	Form,
	Button,
	Row,
	Col,
	Drawer,
	notification,
	Typography,
	message,
} from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import * as jsondiff from "jsondiffpatch";
import "jsondiffpatch/dist/formatters-styles/html.css";
import "./App.scss";

const { TextArea } = Input;

interface FormStore {
	before: string;
	after: string;
}

interface ResultStore {
	open: boolean;
	html: string;
}

function App() {
	const [form] = Form.useForm<FormStore>();
	const keyComposeRef = useRef<string>();
	const [result, setResult] = useState<Partial<ResultStore>>({
		open: false,
	});
	const onFinished = useCallback(async () => {
		const values = await form
			.validateFields()
			.catch((errInfo: { errorFields: { errors: string[] }[] }) => {
				const errMessages = errInfo.errorFields.map((field) => field.errors[0]);
				notification.error({
					message: "数据录入提示：",
					description: errMessages.map((msg) => <div key={msg}>{msg}</div>),
				});
				return null;
			});
		if (!values) return;
		try {
			const before = JSON.parse(values.before);
			const after = JSON.parse(values.after);
			const delta = jsondiff.diff(before, after);
      //  正则验证，是否为{、[ 开头或者 }、]结尾
			if (!delta) {
				notification.success({
					message: "数据对比操作：",
					description: "两份数据的对比结果一致",
				});
				return;
			}
			const htmlSrt = jsondiff.formatters.html.format(delta, before);
			jsondiff.formatters.html.hideUnchanged();
			setResult({ open: true, html: htmlSrt });
		} catch (error) {
			if (!error) {
				message.warning("未知错误");
				return;
			}
      const err = error as Error;
			notification.error({
				message: "数据对比操作：",
				description: err?.message
			});
		}
	}, [form]);
	useEffect(() => {
		const keydownHandle = (ev: KeyboardEvent) => {
			if (!ev || !ev.key) {
				keyComposeRef.current = void 0;
				return;
			}
			const key = ev.key.toLocaleLowerCase();
			if (!["control", "enter"].includes(key)) {
				return;
			}
			keyComposeRef.current = `${keyComposeRef.current || ""}${key}`;
			if (["controlenter", "entercontrol"].includes(keyComposeRef.current!)) {
				keyComposeRef.current = void 0;
				onFinished();
			}
		};
		const keyupHandle = () => {
			keyComposeRef.current = void 0;
		};
		window.addEventListener("keydown", keydownHandle);
		window.addEventListener("keyup", keyupHandle);
		return () => {
			window.removeEventListener("keydown", keydownHandle);
			window.removeEventListener("keyup", keyupHandle);
		};
	}, [onFinished]);
	return (
		<div>
			<Form form={form} layout='vertical'>
				<Form.Item
					extra={
						<Typography>
							<Typography.Title level={3}>JSON-DIFF 说明：</Typography.Title>
							<Typography.Paragraph>
								<ul>
									<li>请确保原JSON数据和对比的JSON数据格式正确</li>
									<li>
										<Typography.Text keyboard>Control + Enter</Typography.Text>
										键可以唤起对比结果
									</li>
								</ul>
							</Typography.Paragraph>
						</Typography>
					}
				>
					<Row gutter={[16, 16]}>
						<Col span={12} className='relative'>
							<Form.Item
								name='before'
								required
								className='flex-1'
								label='原始数据'
								rules={[{ required: true, message: "请输入原始数据" }]}
							>
								<TextArea
									className='h-70vh!'
									placeholder="JSON 格式的数据，例如：{a: 1, b: 'test'}"
								/>
							</Form.Item>
							<Button type='primary' className='control' onClick={onFinished}>
								对比
							</Button>
						</Col>
						<Col span={12}>
							<Form.Item
								name='after'
								required
								className='flex-1'
								label='对比数据'
								rules={[{ required: true, message: "请输入对比数据" }]}
							>
								<TextArea
									className='h-70vh!'
									placeholder='输入需要对比的JSON数据'
								/>
							</Form.Item>
						</Col>
					</Row>
				</Form.Item>
			</Form>
			<Drawer
				open={result.open}
				width={1200}
				title='数据对比结果'
				maskClosable={false}
				onClose={() => setResult({})}
			>
				<div dangerouslySetInnerHTML={{ __html: result.html! }}></div>
			</Drawer>
		</div>
	);
}

export default App;

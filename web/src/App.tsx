import {
	Input,
	Form,
	Button,
	Row,
	Col,
	Drawer,
	notification,
	Alert,
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

const beforeJSON = `{
  "data": {
      "banners": [
          {
              "imageUrl": "//q01.yinge.cc/resource/2023/09/30/c081eb09-2aa6-40fe-9f47-3bc8f7d37e45.jpg"
          }
      ],
      "productId": 10076,
      "productName": "淘麦VIP纪念票·亚克力实体票根",
      "productDesc": "",
      "addressFirst": true,
      "productType": 4,
      "customizeType": 7,
      "flowType": 15,
      "recommendType": 0,
      "unit": null,
      "shortName": "票根",
      "marketingTags": null,
      "skus": [
          {
              "skuId": 890524,
              "productId": 10076,
              "skuName": "6x12cm-透明款",
              "imageUrl": "//q01.yinge.cc/resource/2023/10/13/1a5f8efc-cccd-419a-abc5-3f40b2478fc8.jpg",
              "unitPrice": 1990,
              "originalPrice": 1990,
              "labelValues": null,
              "attrValues": [
                  {
                      "attrId": "25604",
                      "valId": "41784",
                      "valName": "6x12cm"
                  },
                  {
                      "attrId": "25615",
                      "valId": "42082",
                      "valName": "透明款"
                  }
              ],
              "config": {
                  "useCollectionPage": false,
                  "cutTypes": null,
                  "subType": ""
              }
          }
      ],
      "praiseRate": 100,
      "detailImages": [
          "//q01.yinge.cc/resource/2023/09/30/70e4f572-b3c3-4f19-b649-5130dd1b3f70.jpg",
          "//q01.yinge.cc/resource/2023/09/30/96c2bf9c-ba22-44d6-a4e3-8fe891405aa2.jpg",
          "//q01.yinge.cc/resource/2023/09/30/13d8ba3d-a529-444c-a19d-7b217a9741b4.png",
          "//q01.yinge.cc/resource/2023/09/30/bdce2dba-328e-42ea-ba50-4b551efd36c9.png",
          "//q01.yinge.cc/resource/2023/09/30/82246b82-506b-430a-8a11-cd8be660f296.png"
      ],
      "button": {
          "text": "立即购买"
      },
      "coupons": null,
      "useCollectionPage": false,
      "shelfId": 91140,
      "labels": null,
      "specialDeliveryTips": "",
      "metas": {
          "title": null,
          "keywords": null,
          "description": null
      },
      "specificationText": "规格",
      "discountInfo": [],
      "deliveryTimeoutTips": null,
      "attrList": [
          {
              "attrId": "25604",
              "attrName": "尺寸",
              "type": "attr"
          },
          {
              "attrId": "25615",
              "attrName": "亚克力",
              "type": "attr"
          },
          {
              "attrId": "24100",
              "attrName": "板式",
              "type": "attr"
          }
      ],
      "playAhead": false,
      "customType": "430",
      "showSelectSkuPage": false,
      "showSelectSkuPageV2": false,
      "quantityMin": 0,
      "quantityMax": 0,
      "quantityMultiple": 0,
      "status": 1,
      "designs": [],
      "designImages": [],
      "defaultPostId": 0,
      "processType": 0,
      "crowdfunding": null,
      "hasOwnFreePostageRule": true,
      "notice": false,
      "tips": {
          "tips": "现在下单，预计3个工作日内陆续发货",
          "level": 1
      },
      "interceptNotice": null,
      "customProcessType": 1,
      "channelExtraType": 1,
      "payFirst": false,
      "originalPrice": 1990,
      "unitPrice": 1990,
      "isPrivatePrice": false,
      "discounts": {
          "hasDiscount": 0,
          "discountType": "",
          "tags": [],
          "endTime": "",
          "discountValue": 0
      },
      "isDetailGrouped": false,
      "returnRemind": "首次下单立返现金，最高10元",
      "commonTips": {
          "postage": "全场满19.9包邮"
      },
      "video": [],
      "abtest": 1,
      "noPicture": 0,
      "abtestGroup": [
          "play_2",
          "auto_recommend_2",
          "upgrade_style_3",
          "match_style_1"
      ]
  },
  "code": 1
}`;
const afterJSON = `{
  "data": {
      "banners": [
          {
              "imageUrl": "//q01.yinge.cc/resource/2023/09/30/c081eb09-2aa6-40fe-9f47-3bc8f7d37e45.jpg"
          },
          {
              "imageUrl": "//q01.yinge.cc/resource/2023/11/11/0efb93ea-dd1d-476d-9da4-e57625cd4cb5.jpg"
          },
          {
              "imageUrl": "//q01.yinge.cc/resource/2023/11/29/31c094e0-ef18-4055-81f2-791af53cf85f.jpg"
          }
      ],
      "productId": 10802,
      "productName": "淘麦VIP纪念票实体演出票票根",
      "productDesc": "",
      "addressFirst": true,
      "productType": 4,
      "customizeType": 7,
      "flowType": 15,
      "recommendType": 0,
      "unit": null,
      "shortName": "票根",
      "marketingTags": null,
      "skus": [
          {
              "skuId": 897514,
              "productId": 10802,
              "skuName": "演出票亚克力票根",
              "imageUrl": "//q01.yinge.cc/resource/2023/10/25/7dd8923e-eab8-4fb9-8885-f242df769be0.jpg",
              "unitPrice": 1990,
              "originalPrice": 1990,
              "labelValues": null,
              "attrValues": [
                  {
                      "attrId": "25752",
                      "valId": "45164",
                      "valName": "演出票亚克力票根"
                  }
              ],
              "config": {
                  "useCollectionPage": false,
                  "cutTypes": null,
                  "subType": ""
              }
          },
          {
              "skuId": 897516,
              "productId": 10802,
              "skuName": "演出票纸质票根",
              "imageUrl": "//q01.yinge.cc/resource/2023/10/25/95c5605f-8143-44fa-af2c-816fc5f2caaf.jpg",
              "unitPrice": 1990,
              "originalPrice": 1990,
              "labelValues": null,
              "attrValues": [
                  {
                      "attrId": "25752",
                      "valId": "45166",
                      "valName": "演出票纸质票根"
                  }
              ],
              "config": {
                  "useCollectionPage": false,
                  "cutTypes": null,
                  "subType": ""
              }
          }
      ],
      "praiseRate": 100,
      "detailImages": [
          "//q01.yinge.cc/resource/2023/09/30/70e4f572-b3c3-4f19-b649-5130dd1b3f70.jpg",
          "//q01.yinge.cc/resource/2023/09/30/96c2bf9c-ba22-44d6-a4e3-8fe891405aa2.jpg",
          "//q01.yinge.cc/resource/2023/09/30/bdce2dba-328e-42ea-ba50-4b551efd36c9.png",
          "//q01.yinge.cc/resource/2023/10/25/c7dda4ab-68f8-4a06-bb6c-1c5f5a86b5a8.jpg",
          "//q01.yinge.cc/resource/2023/10/25/e0e13677-2d6e-4609-8cdb-89f21b82e5f5.jpg",
          "//q01.yinge.cc/resource/2023/10/25/9babca82-4326-4d40-a9a4-5de332be127b.jpg",
          "//q01.yinge.cc/resource/2023/11/29/e0c1e10d-f9ec-4c03-9b63-820cbc41bf57.jpg",
          "//q01.yinge.cc/resource/2023/11/29/90efe44c-de00-4676-9204-3f0f6a76fdbc.jpg",
          "//q01.yinge.cc/resource/2023/11/29/29d51313-b285-46d3-ba83-fa0816fe42dd.jpg"
      ],
      "button": {
          "text": "立即购买"
      },
      "coupons": null,
      "useCollectionPage": false,
      "shelfId": 91256,
      "labels": null,
      "specialDeliveryTips": "",
      "metas": {
          "title": null,
          "keywords": null,
          "description": null
      },
      "specificationText": "规格",
      "discountInfo": [],
      "deliveryTimeoutTips": null,
      "attrList": [
          {
              "attrId": "25613",
              "attrName": "尺寸",
              "type": "attr"
          },
          {
              "attrId": "25604",
              "attrName": "尺寸",
              "type": "attr"
          },
          {
              "attrId": "25615",
              "attrName": "亚克力",
              "type": "attr"
          },
          {
              "attrId": "24100",
              "attrName": "板式",
              "type": "attr"
          }
      ],
      "playAhead": false,
      "customType": "654",
      "showSelectSkuPage": false,
      "showSelectSkuPageV2": false,
      "quantityMin": 0,
      "quantityMax": 0,
      "quantityMultiple": 0,
      "status": 1,
      "designs": [],
      "designImages": [],
      "defaultPostId": 0,
      "processType": 0,
      "crowdfunding": null,
      "hasOwnFreePostageRule": true,
      "notice": false,
      "tips": {
          "tips": "现在下单，预计3个工作日内陆续发货",
          "level": 1
      },
      "interceptNotice": null,
      "customProcessType": 1,
      "channelExtraType": 1,
      "payFirst": false,
      "originalPrice": 1990,
      "unitPrice": 1990,
      "isPrivatePrice": false,
      "discounts": {
          "hasDiscount": 0,
          "discountType": "",
          "tags": [],
          "endTime": "",
          "discountValue": 0
      },
      "isDetailGrouped": false,
      "returnRemind": "首次下单立返现金，最高10元",
      "commonTips": {
          "postage": "全场满19.9包邮"
      },
      "video": [],
      "abtest": 1,
      "noPicture": 0,
      "abtestGroup": [
          "play_2",
          "auto_recommend_2",
          "upgrade_style_3",
          "match_style_1"
      ]
  },
  "code": 0
}`;

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

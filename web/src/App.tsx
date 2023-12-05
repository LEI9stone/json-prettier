import { Input, Form, Button, Row, Col, Drawer } from "antd";
import { useCallback, useState } from "react";
import * as jsondiff from "jsondiffpatch";
import "./App.scss";
import { isArray, isObject } from "lodash";

const { TextArea } = Input;

interface FormStore {
	before: string;
	after: string;
}

interface ResultStore {
	open: boolean;
	data: Record<string, unknown>;
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

const DATA = {
	data: {
		banners: {
			"1": [
				{
					imageUrl:
						"//q01.yinge.cc/resource/2023/11/11/0efb93ea-dd1d-476d-9da4-e57625cd4cb5.jpg",
				},
			],
			"2": [
				{
					imageUrl:
						"//q01.yinge.cc/resource/2023/11/29/31c094e0-ef18-4055-81f2-791af53cf85f.jpg",
				},
			],
			_t: "a",
		},
		productId: [10076, 10802],
		productName: [
			"淘麦VIP纪念票·亚克力实体票根",
			"淘麦VIP纪念票实体演出票票根",
		],
		skus: {
			"0": {
				skuId: [890524, 897514],
				productId: [10076, 10802],
				skuName: ["6x12cm-透明款", "演出票亚克力票根"],
				imageUrl: [
					"@@ -29,47 +29,47 @@\n /10/\n-13/1a5f8efc-cccd-419a-abc5-3f40b2478fc8\n+25/7dd8923e-eab8-4fb9-8885-f242df769be0\n .jpg\n",
					0,
					2,
				],
				attrValues: {
					"0": {
						attrId: ["25604", "25752"],
						valId: ["41784", "45164"],
						valName: ["6x12cm", "演出票亚克力票根"],
					},
					_t: "a",
					_1: [
						{
							attrId: "25615",
							valId: "42082",
							valName: "透明款",
						},
						0,
						0,
					],
				},
			},
			"1": [
				{
					skuId: 897516,
					productId: 10802,
					skuName: "演出票纸质票根",
					imageUrl:
						"//q01.yinge.cc/resource/2023/10/25/95c5605f-8143-44fa-af2c-816fc5f2caaf.jpg",
					unitPrice: 1990,
					originalPrice: 1990,
					labelValues: null,
					attrValues: [
						{
							attrId: "25752",
							valId: "45166",
							valName: "演出票纸质票根",
						},
					],
					config: {
						useCollectionPage: false,
						cutTypes: null,
						subType: "",
					},
				},
			],
			_t: "a",
		},
		detailImages: {
			"3": [
				"//q01.yinge.cc/resource/2023/10/25/c7dda4ab-68f8-4a06-bb6c-1c5f5a86b5a8.jpg",
			],
			"4": [
				"//q01.yinge.cc/resource/2023/10/25/e0e13677-2d6e-4609-8cdb-89f21b82e5f5.jpg",
			],
			"5": [
				"//q01.yinge.cc/resource/2023/10/25/9babca82-4326-4d40-a9a4-5de332be127b.jpg",
			],
			"6": [
				"//q01.yinge.cc/resource/2023/11/29/e0c1e10d-f9ec-4c03-9b63-820cbc41bf57.jpg",
			],
			"7": [
				"//q01.yinge.cc/resource/2023/11/29/90efe44c-de00-4676-9204-3f0f6a76fdbc.jpg",
			],
			"8": [
				"//q01.yinge.cc/resource/2023/11/29/29d51313-b285-46d3-ba83-fa0816fe42dd.jpg",
			],
			_t: "a",
			_2: [
				"//q01.yinge.cc/resource/2023/09/30/13d8ba3d-a529-444c-a19d-7b217a9741b4.png",
				0,
				0,
			],
			_4: [
				"//q01.yinge.cc/resource/2023/09/30/82246b82-506b-430a-8a11-cd8be660f296.png",
				0,
				0,
			],
		},
		shelfId: [91140, 91256],
		attrList: {
			"0": {
				attrId: ["25604", "25613"],
			},
			"1": {
				attrId: 
        ["25615", "25604"],
				attrName: ["亚克力", "尺寸"],
			},
			"2": {
				attrId: ["24100", "25615"],
				attrName: ["板式", "亚克力"],
			},
			"3": [
				{
					attrId: "24100",
					attrName: "板式",
					type: "attr",
				},
			],
			_t: "a",
		},
		customType: ["430", "654"],
	},
	code: [1, 0],
};

function JsonViewer({ data }: { data: Record<string, unknown> }) {
	if (isArray(data)) {
		return <div className="pl-5px">
      <div className="pl-5px">[</div>
      <div className="pl-5px">{data.map((item) => <JsonViewer data={item} />)}</div>
      <div className="pl-5px">]</div>
    </div>;
	}
	if (isObject(data)) {
		return <div className="pl-5px">
      <div className="pl-5px">{`{`}</div>
      <div className="pl-5px">{Object.keys(data).map((key) => <>
      <div className="pl-5px">{key}:</div>
      <div className="pl-5px"><JsonViewer data={data[key] as Record<string, unknown>} /></div>
      </>)}</div>
      <div className="pl-5px">{`}`}</div>
    </div>;
	}
	return <span className="pl-5px">{data}</span>;
}

function App() {
	const [form] = Form.useForm<FormStore>();
	const [result, setResult] = useState<Partial<ResultStore>>({
		data: DATA,
		open: true,
	});
	const onFinished = useCallback(async () => {
		const values = await form.validateFields().catch(() => null);
		if (!values) return;
		const before = JSON.parse(values.before);
		const after = JSON.parse(values.after);
		const delta = jsondiff.diff(before, after);
		if (!delta) return;
		setResult({ open: true, data: delta });
		console.log("delta", delta);
	}, [form]);
	return (
		<div>
			<Form
				form={form}
				layout='vertical'
				initialValues={{ before: beforeJSON, after: afterJSON }}
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
							<TextArea className='h-96vh!' />
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
							<TextArea className='h-96vh!' />
						</Form.Item>
					</Col>
				</Row>
			</Form>
			<Drawer open={result.open} width={1200} title='数据对比结果'>
        <JsonViewer data={result.data} />
      </Drawer>
		</div>
	);
}

export default App;

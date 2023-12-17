
import { Form, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import * as jsondiff from "jsondiffpatch";
import { format } from "./formatter/console";
import React, { useState } from "react";

type Values = {
  before: string;
  after: string;
};

export default function Command() {
  const [md, setMD] = useState();
  function handleSubmit(values: Values) {
    try {
      const before = JSON.parse(values.before);
      const after = JSON.parse(values.after);
      const delta = jsondiff.diff(before, after);
      //  正则验证，是否为{、[ 开头或者 }、]结尾
      if (!delta) {
        showToast({ title: "操作提示", message: "两份数据的对比结果一致", style: Toast.Style.Success });
        return;
      }
      setMD(format(delta))
    } catch (error) {
      if (!error) {
        console.log("未知错误");
        showToast({ title: "操作提示", message: "未知错误", style: Toast.Style.Failure });
        return;
      }
      const err = error as Error;
      showToast({ title: "操作提示", message: err?.message, style: Toast.Style.Failure });
    }
  }
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextArea id="before" title="before JSON" placeholder="请输入JSON 信息" />
      <Form.TextArea id="after" title="after JSON" placeholder="请输入JSON 信息" />
      {md ? <Form.Description text={md}  /> : null}
    </Form>
  );
}
